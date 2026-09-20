import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { test } from 'node:test'

test('Chrome manifest defines the Fast Search MV3 entries and packaged icons', async () => {
  const manifest = JSON.parse(await readFile(new URL('../src/manifest.json', import.meta.url), 'utf8'))
  assert.equal(manifest.name, 'Fast Search')
  assert.equal(manifest.manifest_version, 3)
  assert.equal(manifest.background.service_worker, 'background/index.js')
  assert.equal(manifest.background.type, 'module')
  assert.equal(manifest.content_scripts[0].js[0], 'content-scripts/main.js')
  assert.equal(manifest.commands['open-fast-search'].suggested_key.default, 'Ctrl+Shift+K')
  for (const path of Object.values(manifest.icons)) {
    const icon = await readFile(new URL(`../src/${path}`, import.meta.url))
    assert.equal(icon.subarray(1, 4).toString(), 'PNG')
  }
})

test('Chrome storage adapter preserves values and defaults', async () => {
  const values = new Map()
  globalThis.chrome = {
    storage: {
      local: {
        async get (name) { return values.has(name) ? { [name]: values.get(name) } : {} },
        async set (items) { for (const [name, value] of Object.entries(items)) values.set(name, value) },
        async remove (name) { values.delete(name) }
      }
    }
  }
  try {
    const storage = await import(`../src/platform/chrome.mjs?test=${Date.now()}`)
    assert.equal(await storage.GM_getValue('missing', 'fallback'), 'fallback')
    await storage.GM_setValue('sites', [{ name: 'search' }])
    assert.deepEqual(await storage.GM_getValue('sites'), [{ name: 'search' }])
    await storage.GM_deleteValue('sites')
    assert.equal(await storage.GM_getValue('sites'), undefined)
  } finally {
    delete globalThis.chrome
  }
})
