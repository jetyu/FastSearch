import test from 'node:test'
import assert from 'node:assert/strict'
import { cloneData, normalizeSites, normalizeUrls, createListRepository } from '../src/util/site-data.mjs'

const defaults = [{ name: 'search', nameZh: '搜索', list: [{ nameZh: '搜索引擎', url: 'https://example.com/?q=%s', selectors: '#q', query: ['q'] }] }]
function fixture (stored) {
  const changes = []
  const config = { defaults, normalize: normalizeSites, read: async () => stored, write: async value => { stored = value }, onChange: value => changes.push(value) }
  return { config, changes, set: value => { stored = value }, get: () => stored }
}

test('old JSON imports retain advanced fields and default to visible without mutation', () => {
  const value = normalizeSites(defaults)
  assert.equal(value[0].data.visible, true)
  assert.equal(value[0].list[0].data.visible, true)
  assert.equal(value[0].list[0].selectors, '#q')
  assert.deepEqual(value[0].list[0].query, ['q'])
  assert.equal(defaults[0].data, undefined)
})
test('invalid shapes, duplicate categories and non-web URLs cannot be saved', () => {
  for (const value of [null, {}, [null], [...defaults, ...defaults], [{ name: 'x', nameZh: 'X', list: {} }]]) assert.throws(() => normalizeSites(value))
  for (const url of ['javascript:alert(1)', 'invalid', 'https://name:secret@example.com/']) assert.throws(() => normalizeUrls([{ nameZh: '测试', url }]))
})
test('an intentionally empty menu remains empty on reload', async () => {
  const f = fixture(undefined)
  const repository = createListRepository(f.config)
  assert.equal((await repository.reload()).length, 1)
  await repository.save([])
  assert.deepEqual(await repository.reload(), [])
})
test('runtime updates wait for asynchronous writes and failures preserve previous data', async () => {
  const f = fixture(defaults)
  let finish
  f.config.write = value => new Promise(resolve => { finish = () => { f.set(value); resolve() } })
  const repository = createListRepository(f.config)
  await repository.reload()
  const saving = repository.save([])
  await new Promise(resolve => setImmediate(resolve))
  assert.equal(repository.snapshot().length, 1)
  finish()
  await saving
  assert.deepEqual(repository.snapshot(), [])
  f.config.write = async () => { throw Error('write failed') }
  const broken = createListRepository(f.config)
  await broken.reload()
  await assert.rejects(broken.save(defaults), /write failed/)
  assert.deepEqual(broken.snapshot(), [])
})
test('stale configuration cannot overwrite another page and drafts are independent', async () => {
  const f = fixture(cloneData(defaults))
  const repository = createListRepository(f.config)
  const draft = await repository.reload()
  draft[0].nameZh = 'draft'
  assert.equal(repository.snapshot()[0].nameZh, '搜索')
  f.set([])
  await assert.rejects(repository.save(draft), /其他页面修改/)
  assert.deepEqual(f.get(), [])
})
test('corrupt saved configuration is reported instead of silently overwritten', async () => {
  const f = fixture({ bad: true })
  const repository = createListRepository(f.config)
  await assert.rejects(repository.reload(), /分类数组/)
  await assert.rejects(repository.save([]), /分类数组/)
  assert.deepEqual(f.get(), { bad: true })
})
