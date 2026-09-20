import test from 'node:test'
import assert from 'node:assert/strict'
import { cloneData } from '../src/util/site-data.mjs'
import { settingDefaults, normalizeBackup, readBackup, restoreBackup } from '../src/util/config-backup.mjs'

const sites = [{ name: 'custom', nameZh: '自定义', list: [{ nameZh: '搜索', url: 'https://example.com/?q=%s', selectors: '#q' }] }]
const toolbar = [{ nameZh: '划词', url: 'https://toolbar.example.com/?q=%s' }]
function fixture (initial = {}) {
  const values = new Map(Object.entries(cloneData(initial)))
  const io = {
    read: async name => values.get(name),
    write: async (name, value) => { values.set(name, cloneData(value)) },
    remove: async name => { values.delete(name) }
  }
  return { values, io }
}
async function backup (read = async () => undefined) {
  return readBackup({ read, defaultSites: sites, defaultToolbar: toolbar, scriptVersion: 'test' })
}

test('backup contains complete defaults and the saved menu, toolbar, settings and icons', async () => {
  const f = fixture({ sites, toolbar: [], openInNewTab: true, primaryColor: '', iconCache: { 'example.com': 'data:image/png;base64,aA==' } })
  const data = await backup(f.io.read)
  assert.equal(data.format, 'fast-search-backup')
  assert.deepEqual(Object.keys(data.settings), Object.keys(settingDefaults))
  assert.equal(data.settings.openInNewTab, true)
  assert.equal(data.settings.theme, 'auto')
  assert.equal(data.settings.primaryColor, '')
  assert.equal(data.settings.mode, 'horizontal')
  assert.deepEqual(data.toolbar, [])
  assert.equal(data.sites[0].list[0].selectors, '#q')
  assert.equal(data.iconCache['example.com'], 'data:image/png;base64,aA==')
  assert.deepEqual(f.values.get('sites'), sites)
})

test('partial lists, unsupported versions and invalid settings are rejected before any write', async () => {
  const data = await backup()
  for (const value of [[], { ...data, schemaVersion: 9 }, { ...data, toolbar: undefined }, { ...data, settings: {} }, { ...data, settings: { ...data.settings, mode: 'unknown' } }]) assert.throws(() => normalizeBackup(value))
  let writes = 0
  await assert.rejects(restoreBackup([], { read: async () => undefined, write: async () => { writes++ }, remove: async () => {} }), /整份/)
  assert.equal(writes, 0)
})

test('schema version 1 backups without a theme remain importable', async () => {
  const data = await backup()
  delete data.settings.theme
  assert.equal(normalizeBackup(data).settings.theme, 'auto')
  data.settings.theme = 'sepia'
  assert.throws(() => normalizeBackup(data), /theme/)
})

test('full backup restores all settings and intentionally empty lists', async () => {
  const data = await backup()
  data.sites = []
  data.settings.mode = 'vertical'
  data.settings.openInNewTab = true
  const f = fixture({ sites, toolbar: [], mode: 'horizontal', openInNewTab: false })
  await restoreBackup(data, f.io)
  assert.deepEqual(f.values.get('sites'), [])
  assert.deepEqual(f.values.get('toolbar'), data.toolbar)
  for (const [name, value] of Object.entries(data.settings)) assert.equal(f.values.get(name), value)
  assert.deepEqual(f.values.get('iconCache'), {})
})

test('a failure after partial writes restores existing values and removes newly created keys', async () => {
  const data = await backup()
  const before = { sites: [], toolbar: [], openInNewTab: true }
  const f = fixture(before)
  const write = f.io.write
  f.io.write = async (name, value) => {
    if (name === 'align') throw Error('storage full')
    await write(name, value)
  }
  await assert.rejects(restoreBackup(data, f.io), /原配置已保留/)
  assert.deepEqual(Object.fromEntries(f.values), before)
})

test('read failures abort restore without changing storage', async () => {
  const data = await backup()
  let writes = 0
  await assert.rejects(restoreBackup(data, { read: async () => { throw Error('read failed') }, write: async () => { writes++ }, remove: async () => {} }), /read failed/)
  assert.equal(writes, 0)
})

test('rollback failures are reported instead of claiming the previous configuration was preserved', async () => {
  const data = await backup()
  const f = fixture({ sites: [] })
  const write = f.io.write
  f.io.write = async (name, value) => {
    if (name === 'toolbar' || (name === 'sites' && !value.length)) throw Error('write failed')
    await write(name, value)
  }
  await assert.rejects(restoreBackup(data, f.io), /部分配置未能恢复/)
})

test('legacy backup format remains importable', async () => {
  const data = await backup()
  data.format = ['all', 'search', 'backup'].join('-')
  assert.equal(normalizeBackup(data).format, 'fast-search-backup')
})
