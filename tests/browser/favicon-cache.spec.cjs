const { test, expect } = require('@playwright/test')
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '../..')
const scripts = [
  'node_modules/vue/dist/vue.global.prod.js',
  'node_modules/@popperjs/core/dist/umd/popper-lite.min.js',
  'node_modules/jsoneditor/dist/jsoneditor.min.js',
  'output/index.user.js'
].map((file) => fs.readFileSync(path.join(root, file), 'utf8'))

test('fetched menu icons survive reload and clear on request', async ({ page }) => {
  const remoteIcon = 'https://icons.example.test/shared.svg'
  const outsideRequests = []
  page.on('request', (request) => {
    if (request.url() === remoteIcon) outsideRequests.push(request.url())
  })
  await page.route('**/*', (route) =>
    route.request().resourceType() === 'document'
      ? route.fulfill({ contentType: 'text/html', body: '<!doctype html><html><body></body></html>' })
      : route.abort()
  )
  await page.addInitScript(
    ({ scripts, remoteIcon }) => {
      if (!localStorage.getItem('__fastSearch__sites')) {
        localStorage.setItem(
          '__fastSearch__sites',
          JSON.stringify([
            {
              name: 'search',
              nameZh: '搜索',
              list: [
                { nameZh: '搜索一', url: 'https://www.baidu.com/s?wd=%s', icon: remoteIcon },
                { nameZh: '搜索二', url: 'https://www.baidu.com/other?q=%s', icon: remoteIcon }
              ]
            }
          ])
        )
      }
      window.GM_getValue = (key) => {
        const value = localStorage.getItem(key)
        return value === null ? undefined : JSON.parse(value)
      }
      window.GM_setValue = async (key, value) => localStorage.setItem(key, JSON.stringify(value))
      window.GM_deleteValue = async (key) => localStorage.removeItem(key)
      window.GM_registerMenuCommand = () => {}
      window.iconRequests = []
      window.GM_xmlhttpRequest = (details) => {
        window.iconRequests.push({ url: details.url, anonymous: details.anonymous })
        const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><circle cx="8" cy="8" r="7"/></svg>'
        queueMicrotask(() => details.onload({ status: 200, response: new Blob([svg], { type: 'image/svg+xml' }) }))
        return { abort() {} }
      }
      window.confirm = () => true
      document.addEventListener('DOMContentLoaded', () =>
        scripts.forEach((content) => {
          const element = document.createElement('script')
          element.textContent = content
          document.head.append(element)
        })
      )
    },
    { scripts, remoteIcon }
  )

  await page.goto('https://www.baidu.com/s?wd=test')
  await expect(page.locator('#fast-search')).toBeAttached()
  await page.locator('.as-menu-item').first().hover()
  const images = page.locator('.as-subMenu .as-url-icon img')
  await expect(images).toHaveCount(2)
  await expect(images.first()).toHaveAttribute('src', /^data:image\/svg\+xml;base64,/)
  expect((await page.evaluate(() => window.iconRequests)).filter((request) => request.url === remoteIcon)).toEqual([
    { url: remoteIcon, anonymous: true }
  ])
  expect(outsideRequests).toEqual([])
  expect(Object.keys(await page.evaluate(() => window.GM_getValue('__fastSearch__fetchedIconCache')))).toContain(
    remoteIcon
  )

  await page.reload()
  await page.locator('.as-menu-item').first().hover()
  await expect(images.first()).toHaveAttribute('src', /^data:image\/svg\+xml;base64,/)
  expect((await page.evaluate(() => window.iconRequests)).filter((request) => request.url === remoteIcon)).toEqual([])
  expect(outsideRequests).toEqual([])

  await page.locator('.as-setting-btn').getByText('设置', { exact: true }).click()
  await page.locator('.as-side-bar').getByText('清除', { exact: true }).click()
  await expect
    .poll(() => page.evaluate((url) => window.iconRequests.filter((request) => request.url === url).length, remoteIcon))
    .toBe(1)
  expect((await page.evaluate(() => window.GM_getValue('__fastSearch__fetchedIconCache')))[remoteIcon]).toMatch(
    /^data:image\/svg\+xml;base64,/
  )
})
