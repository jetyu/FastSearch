import test from 'node:test'
import assert from 'node:assert/strict'
import { cloneData, normalizeSites, normalizeUrls, createListRepository } from '../src/util/site-data.mjs'

const defaults = [{ name: 'search', nameZh: '搜索', list: [{ nameZh: '搜索引擎', url: 'https://example.com/?q=%s', selectors: '#q', query: ['q'] }] }]
function fixture (stored) {
  const changes = []
  const config = { defaults, normalize: normalizeSites, read: async () => stored, write: async value => { stored = value }, remove: async () => { stored = undefined }, onChange: value => changes.push(value) }
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

test('clearing waits for deletion, removes the saved override and allows subsequent saves', async () => {
  const f = fixture([])
  let finish
  f.config.remove = () => new Promise(resolve => { finish = () => { f.set(undefined); resolve() } })
  const repository = createListRepository(f.config)
  await repository.reload()
  const clearing = repository.clear()
  await new Promise(resolve => setImmediate(resolve))
  assert.deepEqual(repository.snapshot(), [])
  await assert.rejects(repository.save([]), /正在处理/)
  finish()
  assert.deepEqual(await clearing, normalizeSites(defaults))
  assert.equal(f.get(), undefined)
  assert.deepEqual(await repository.reload(), normalizeSites(defaults))
  await repository.save([])
  assert.deepEqual(f.get(), [])
})

test('failed deletion or a stale page cannot clear saved data or publish defaults', async () => {
  const f = fixture([])
  let removals = 0
  f.config.remove = async () => { removals++; throw Error('delete failed') }
  const repository = createListRepository(f.config)
  await repository.reload()
  await assert.rejects(repository.clear(), /delete failed/)
  assert.deepEqual(f.get(), [])
  assert.deepEqual(repository.snapshot(), [])
  assert.equal(f.changes.length, 1)
  f.set(defaults)
  await assert.rejects(repository.clear(), /其他页面修改/)
  assert.equal(removals, 1)
  assert.deepEqual(f.get(), defaults)
})
