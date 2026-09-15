const { test, expect } = require('@playwright/test')
const fs = require('node:fs')
const path = require('node:path')
const root = path.resolve(__dirname, '../..')
const scripts = ['node_modules/vue/dist/vue.global.prod.js', 'node_modules/@popperjs/core/dist/umd/popper-lite.min.js', 'output/index.user.js'].map(file => fs.readFileSync(path.join(root, file), 'utf8'))
const legacy = [
  { name: 'search', nameZh: '搜索', list: [
    { nameZh: '百度', url: 'https://www.baidu.com/s?wd=%s', query: ['wd'] },
    { nameZh: '必应', url: 'https://www.bing.com/search?q=%s' },
    { nameZh: '谷歌', url: 'https://www.google.com/search?q=%s' }
  ] },
  { name: 'social', nameZh: '社交', list: [{ nameZh: 'SOV2EX', url: 'https://www.sov2ex.com/?q=%s' }] },
  { name: 'personal', nameZh: '常用', list: [] }
]
async function boot (page, options = {}) {
  await page.route('**/*', route => route.request().resourceType() === 'document'
    ? route.fulfill({ contentType: 'text/html; charset=utf-8', body: '<!doctype html><html><head><meta charset="utf-8"></head><body><input id="kw" value="测试"><p>用于划词搜索的文字</p></body></html>' })
    : route.abort())
  await page.addInitScript(({ scripts, legacy, options }) => {
    if (!localStorage.getItem('seeded')) {
      localStorage.setItem('seeded', 'true')
      if (!options.fresh) localStorage.setItem('__allSearch__sites', JSON.stringify(legacy))
      localStorage.setItem('__allSearch__iconCache', '{}')
    }
    window.GM_getValue = key => localStorage.getItem(key) === null ? undefined : JSON.parse(localStorage.getItem(key))
    window.GM_setValue = async (key, value) => {
      if (window.failWrite && ['__allSearch__sites', '__allSearch__toolbar'].includes(key)) throw Error('模拟写入失败')
      if (window.failOnceKey === key) { window.failOnceKey = ''; throw Error('模拟备份恢复失败') }
      localStorage.setItem(key, JSON.stringify(value))
    }
    window.GM_deleteValue = key => localStorage.removeItem(key)
    window.testCommands = {}
    window.GM_registerMenuCommand = (name, fn) => { window.testCommands[name] = fn }
    document.addEventListener('DOMContentLoaded', () => scripts.forEach(content => {
      const element = document.createElement('script')
      element.textContent = content
      document.head.append(element)
    }))
  }, { scripts, legacy, options })
  await page.goto('https://www.baidu.com/s?wd=test')
  await expect(page.locator('#all-search')).toBeAttached()
}
async function openManager (page, tab = '配置') {
  await page.locator('.as-setting-btn').getByText('设置', { exact: true }).click()
  await page.locator('.as-side-bar').getByRole('button', { name: '打开', exact: true }).click()
  const dialog = page.getByRole('dialog', { name: /网址管理/ })
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('status')).toContainText('配置已加载')
  if (tab !== '配置') await dialog.getByRole('tab', { name: tab, exact: true }).click()
  return dialog
}
async function stored (page, name = 'sites') { return page.evaluate(name => window.GM_getValue('__allSearch__' + name), name) }
async function editJson (page, text) {
  const editor = page.locator('.ace_text-input')
  await editor.focus()
  await page.keyboard.press('ControlOrMeta+A')
  await page.keyboard.insertText(text)
}

test('one dialog contains three tabs; compact rows, category edits and saved menu update', async ({ page }, testInfo) => {
  await boot(page)
  const dialog = await openManager(page)
  await expect(dialog.getByRole('tab')).toHaveText(['配置', '编辑', '划词工具栏'])
  await expect(dialog.getByRole('tab', { name: '配置', exact: true })).toHaveAttribute('aria-selected', 'true')
  const first = dialog.getByLabel('网址名称', { exact: true }).first()
  const second = dialog.getByLabel('搜索网址', { exact: true }).first()
  const a = await first.boundingBox(); const b = await second.boundingBox()
  expect(Math.abs(a.y - b.y)).toBeLessThan(2)
  await dialog.getByLabel('分类名称', { exact: true }).fill('常用搜索')
  await first.fill('百度测试')
  await expect(page.locator('.as-menu-item-title', { hasText: '常用搜索' })).toHaveCount(0)
  await dialog.getByRole('button', { name: '保存', exact: true }).click()
  await expect(dialog.getByRole('status')).toContainText('保存成功')
  await expect(page.locator('.as-menu-item-title', { hasText: '常用搜索' })).toHaveCount(1)
  expect((await stored(page))[0].list[0].nameZh).toBe('百度测试')
  await page.screenshot({ path: testInfo.outputPath('sites-desktop.png') })
  await page.reload()
  await expect(page.locator('.as-menu-item-title', { hasText: '常用搜索' })).toHaveCount(1)
})

test('configuration and JSON tabs share drafts; code, tree and preview modes render', async ({ page }, testInfo) => {
  await boot(page)
  const dialog = await openManager(page)
  await dialog.getByLabel('分类名称', { exact: true }).fill('图形草稿')
  await dialog.getByRole('tab', { name: '编辑', exact: true }).click()
  await expect(dialog.locator('.ace_content')).toContainText('图形草稿')
  await expect(dialog.locator('.jsoneditor-format')).toHaveCSS('background-image', /data:image\/svg\+xml/)
  const imported = [{ name: 'my', nameZh: 'JSON 草稿', list: [{ nameZh: '测试', url: 'https://test.example.com/?q=%s', selectors: '#search' }] }]
  await editJson(page, JSON.stringify(imported, null, 2))
  await dialog.getByRole('tab', { name: '配置', exact: true }).click()
  await expect(dialog.getByLabel('分类名称', { exact: true })).toHaveValue('JSON 草稿')
  await dialog.getByRole('tab', { name: '编辑', exact: true }).click()
  await dialog.locator('button.jsoneditor-modes').click()
  await dialog.locator('.jsoneditor-type-modes').filter({ hasText: '树' }).click()
  await expect(dialog.locator('.jsoneditor-tree').first()).toBeVisible()
  await dialog.locator('button.jsoneditor-modes').click()
  await dialog.locator('.jsoneditor-type-modes').filter({ hasText: '预览' }).click()
  await expect(dialog.locator('.jsoneditor-preview')).toBeVisible()
  await dialog.locator('button.jsoneditor-modes').click()
  await dialog.locator('.jsoneditor-type-modes').filter({ hasText: '代码' }).click()
  await page.screenshot({ path: testInfo.outputPath('edit-desktop.png') })
  await dialog.getByRole('button', { name: '保存', exact: true }).click()
  await expect(dialog.getByRole('status')).toContainText('保存成功')
  expect((await stored(page))[0].list[0].selectors).toBe('#search')
})

test('invalid JSON, invalid URLs and async write failures retain previous settings', async ({ page }) => {
  await boot(page)
  const dialog = await openManager(page, '编辑')
  await editJson(page, '{bad')
  await dialog.getByRole('button', { name: '保存', exact: true }).click()
  await expect(dialog.locator('.sm-error')).toBeVisible()
  expect(await stored(page)).toEqual(legacy)
  await dialog.getByRole('tab', { name: '配置', exact: true }).click()
  await expect(dialog.getByRole('tab', { name: '编辑', exact: true })).toHaveAttribute('aria-selected', 'true')
  await editJson(page, JSON.stringify(legacy))
  await dialog.getByRole('tab', { name: '配置', exact: true }).click()
  await dialog.getByLabel('搜索网址', { exact: true }).first().fill('javascript:alert(1)')
  await dialog.getByRole('button', { name: '保存', exact: true }).click()
  await expect(dialog.getByRole('status')).toContainText('http 或 https')
  await dialog.getByLabel('搜索网址', { exact: true }).first().fill('https://new.example.com/?q=%s')
  await page.evaluate(() => { window.failWrite = true })
  await dialog.getByRole('button', { name: '保存', exact: true }).click()
  await expect(dialog.getByRole('status')).toContainText('模拟写入失败')
  expect(await stored(page)).toEqual(legacy)
})

test('drag sorting, category controls and copying a URL to a personal category', async ({ page }) => {
  await boot(page)
  const dialog = await openManager(page)
  const rows = dialog.locator('.sm-url-item')
  const handle = await rows.nth(0).getByRole('button', { name: '拖动排序' }).boundingBox()
  const target = await rows.nth(2).boundingBox()
  await page.mouse.move(handle.x + handle.width / 2, handle.y + handle.height / 2)
  await page.mouse.down()
  await page.mouse.move(handle.x + handle.width / 2, handle.y + handle.height / 2 + 10, { steps: 5 })
  await expect(dialog.locator('.sortable-chosen:not(.sortable-fallback)')).toHaveCount(1)
  await page.mouse.move(target.x + 80, target.y + target.height - 5, { steps: 20 })
  await expect(dialog.locator('.sortable-ghost')).toHaveCount(1)
  await expect(dialog.locator('.sm-url-list > .sm-url-item:not(.sortable-fallback) .sm-name-input').last()).toHaveValue('百度')
  await page.mouse.up()
  await expect(dialog.getByLabel('网址名称', { exact: true }).last()).toHaveValue('百度')
  await rows.first().getByLabel('添加到常用分类', { exact: true }).selectOption('personal')
  await dialog.getByRole('button', { name: '常用', exact: true }).click()
  await expect(dialog.getByLabel('网址名称', { exact: true })).toHaveValue('必应')
  await dialog.getByRole('button', { name: '分类左移', exact: true }).click()
  await dialog.getByRole('button', { name: '显示分类', exact: true }).click()
  await dialog.getByRole('button', { name: '保存', exact: true }).click()
  await expect(dialog.getByRole('status')).toContainText('保存成功')
  const value = await stored(page)
  expect(value[0].list.map(item => item.nameZh)).toEqual(['必应', '谷歌', '百度'])
  expect(value[1].name).toBe('personal')
  expect(value[1].data.visible).toBe(false)
})

test('toolbar tab has independent drafts and storage; close protects unsaved menu changes', async ({ page }, testInfo) => {
  await boot(page)
  const dialog = await openManager(page, '划词工具栏')
  await expect(dialog.getByRole('tab', { name: '划词工具栏' })).toHaveAttribute('aria-selected', 'true')
  await dialog.getByLabel('网址名称', { exact: true }).first().fill('划词测试')
  await dialog.getByRole('tab', { name: '配置', exact: true }).click()
  await dialog.getByLabel('分类名称', { exact: true }).fill('菜单草稿')
  await dialog.getByRole('tab', { name: '划词工具栏', exact: true }).click()
  await expect(dialog.getByLabel('网址名称', { exact: true }).first()).toHaveValue('划词测试')
  await dialog.getByRole('button', { name: '保存', exact: true }).click()
  await expect(dialog.getByRole('status')).toContainText('保存成功')
  expect((await stored(page, 'toolbar'))[0].nameZh).toBe('划词测试')
  expect(await stored(page)).toEqual(legacy)
  await page.screenshot({ path: testInfo.outputPath('toolbar-desktop.png') })
  page.once('dialog', prompt => prompt.dismiss())
  await dialog.getByRole('button', { name: '关闭网址管理' }).click()
  await expect(dialog).toBeVisible()
  page.once('dialog', prompt => prompt.accept())
  await dialog.getByRole('button', { name: '关闭网址管理' }).click()
  await expect(dialog).toHaveCount(0)
})

test('empty lists saved from the JSON editor remain empty and can be managed again', async ({ page }) => {
  await boot(page)
  page.on('dialog', prompt => prompt.accept())
  const dialog = await openManager(page, '编辑')
  await editJson(page, '[]')
  expect(await stored(page)).toEqual(legacy)
  await dialog.getByRole('button', { name: '保存', exact: true }).click()
  await expect(dialog.getByRole('status')).toContainText('保存成功')
  await expect(page.locator('.as-menu-item-title')).toHaveCount(0)
  await page.reload()
  await expect(page.locator('.as-menu-item-title')).toHaveCount(0)
  await page.evaluate(() => window.testCommands['全搜：网址管理']())
  await expect(page.getByRole('dialog', { name: /网址管理/ })).toBeVisible()
})

test('mobile dialog keeps controls in bounds and traps focus', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await boot(page, { fresh: true })
  const dialog = await openManager(page)
  const bounds = await dialog.boundingBox()
  expect(bounds.x).toBeGreaterThanOrEqual(0)
  expect(bounds.x + bounds.width).toBeLessThanOrEqual(390)
  expect(await dialog.locator('.sm-body').evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true)
  await dialog.getByRole('button', { name: '关闭网址管理', exact: true }).focus()
  await page.keyboard.press('Shift+Tab')
  await expect(dialog.getByRole('button', { name: '取消', exact: true })).toBeFocused()
  await page.screenshot({ path: testInfo.outputPath('sites-mobile.png') })
})

test('cancel discards the active draft, including invalid JSON, while retaining the other scope', async ({ page }) => {
  await boot(page)
  const dialog = await openManager(page)
  await dialog.getByLabel('分类名称', { exact: true }).fill('菜单草稿')
  await dialog.getByRole('tab', { name: '划词工具栏', exact: true }).click()
  await dialog.getByLabel('网址名称', { exact: true }).first().fill('划词草稿')
  await dialog.getByRole('button', { name: '取消', exact: true }).click()
  await expect(dialog.getByLabel('网址名称', { exact: true }).first()).toHaveValue('百度')
  await dialog.getByRole('tab', { name: '配置', exact: true }).click()
  await expect(dialog.getByLabel('分类名称', { exact: true })).toHaveValue('菜单草稿')
  await dialog.getByRole('tab', { name: '编辑', exact: true }).click()
  await editJson(page, '{bad json')
  await dialog.getByRole('button', { name: '取消', exact: true }).click()
  await dialog.getByRole('tab', { name: '配置', exact: true }).click()
  await expect(dialog.getByLabel('分类名称', { exact: true })).toHaveValue('搜索')
  expect(await stored(page)).toEqual(legacy)
  await dialog.getByLabel('分类名称', { exact: true }).fill('保存后的分类')
  await dialog.getByRole('button', { name: '保存', exact: true }).click()
  await expect(dialog.getByRole('status')).toContainText('保存成功')
  await dialog.getByLabel('分类名称', { exact: true }).fill('下一次草稿')
  await dialog.getByRole('button', { name: '取消', exact: true }).click()
  await expect(dialog.getByLabel('分类名称', { exact: true })).toHaveValue('保存后的分类')
})

async function exportBackup (page) {
  const pending = page.waitForEvent('download')
  await page.locator('.as-config-backup').getByRole('button', { name: '导出', exact: true }).click()
  const download = await pending
  return JSON.parse(fs.readFileSync(await download.path(), 'utf8'))
}

test('global JSON backup round-trips saved menu, toolbar, settings and icons', async ({ page }) => {
  await boot(page)
  await page.evaluate(() => {
    window.GM_setValue('__allSearch__openInNewTab', true)
    window.GM_setValue('__allSearch__primaryColor', '#123456')
    window.GM_setValue('__allSearch__iconCache', { 'example.com': 'data:image/png;base64,aA==' })
  })
  await page.locator('.as-setting-btn').getByText('设置', { exact: true }).click()
  const backup = await exportBackup(page)
  expect(backup.format).toBe('all-search-backup')
  expect(backup.sites[0].list[0].nameZh).toBe('百度')
  expect(backup.toolbar[0].nameZh).toBe('百度')
  expect(backup.settings.openInNewTab).toBe(true)
  expect(backup.settings.primaryColor).toBe('#123456')
  expect(backup.iconCache['example.com']).toBe('data:image/png;base64,aA==')
  backup.sites[0].nameZh = '从备份恢复'
  backup.toolbar[0].nameZh = '恢复的划词入口'
  backup.settings.mode = 'vertical'
  page.once('dialog', prompt => prompt.accept())
  await Promise.all([
    page.waitForEvent('load'),
    page.locator('.as-config-backup input[type="file"]').setInputFiles({ name: 'backup.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(backup)) })
  ])
  await expect(page.locator('.as-menu-item-title', { hasText: '从备份恢复' })).toBeAttached()
  await expect(page.locator('.as-container')).toHaveClass(/as-vertical/)
  expect((await stored(page, 'toolbar'))[0].nameZh).toBe('恢复的划词入口')
  expect(await stored(page, 'openInNewTab')).toBe(true)
  await page.locator('.as-setting-btn').getByText('设置', { exact: true }).click()
  const restored = await exportBackup(page)
  expect(restored.sites).toEqual(backup.sites)
  expect(restored.toolbar).toEqual(backup.toolbar)
  expect(restored.settings).toEqual(backup.settings)
  expect(restored.iconCache).toEqual(backup.iconCache)
})

test('global restore rejects partial files and rolls back after a write failure', async ({ page }) => {
  await boot(page)
  await page.locator('.as-setting-btn').getByText('设置', { exact: true }).click()
  const backup = await exportBackup(page)
  const input = page.locator('.as-config-backup input[type="file"]')
  await input.setInputFiles({ name: 'partial.json', mimeType: 'application/json', buffer: Buffer.from('[]') })
  await expect(page.locator('.as-config-backup [role="status"]')).toContainText('整份 JSON')
  expect(await stored(page)).toEqual(legacy)
  backup.sites = []
  await page.evaluate(() => { window.failOnceKey = '__allSearch__toolbar' })
  page.once('dialog', prompt => prompt.accept())
  await input.setInputFiles({ name: 'backup.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(backup)) })
  await expect(page.locator('.as-config-backup [role="status"]')).toContainText('原配置已保留')
  expect(await stored(page)).toEqual(legacy)
  expect(await stored(page, 'toolbar')).toBeUndefined()
  await expect(page.locator('.as-menu-item-title').first()).toHaveText('搜索')
})
