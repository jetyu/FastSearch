import { cloneData, normalizeSites, normalizeUrls } from './site-data.mjs'

export const settingDefaults = Object.freeze({
  openInNewTab: false,
  theme: 'auto',
  showToolbar: 1,
  mode: 'horizontal',
  align: 'flex-start',
  switchShow: 1,
  scrollHide: 'none',
  favicon: 1,
  primaryColor: '#1890ff',
  bgColor: '#ffffff',
  primaryTextColor: '#606266'
})
const choices = {
  openInNewTab: [true, false], showToolbar: [1, 2], switchShow: [1, 2], favicon: [1, 2],
  theme: ['auto', 'dark', 'light'],
  mode: ['horizontal', 'vertical'], align: ['flex-start', 'center', 'flex-end'],
  scrollHide: ['none', 'top', 'bottom', 'all']
}
const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value)
const imageSource = value => typeof value === 'string' && (!value || /^(https?:\/\/|data:image\/)/i.test(value))
const settingNames = Object.keys(settingDefaults)
const storageNames = ['sites', 'toolbar', ...settingNames, 'iconCache']

export function normalizeBackup (raw) {
  if (!isObject(raw) || raw.format !== 'all-search-backup' || raw.schemaVersion !== 1) {
    throw Error('请选择全搜的整份 JSON 配置备份。单独的网址数组可以粘贴到“编辑”Tab 中。')
  }
  if (!isObject(raw.settings)) throw Error('备份缺少完整的设置数据')
  const settings = {}
  for (const name of settingNames) {
    // Theme was added after schemaVersion 1 backups already existed. Treat an
    // omitted theme as automatic so those backups remain importable.
    const value = name === 'theme' && raw.settings[name] === undefined ? settingDefaults.theme : raw.settings[name]
    if (choices[name] ? !choices[name].includes(value) : typeof value !== 'string' || !/^(|#[a-f\d]{3}|#[a-f\d]{6})$/i.test(value)) {
      throw Error(`备份中的设置“${name}”缺失或格式不正确`)
    }
    settings[name] = value
  }
  if (!isObject(raw.iconCache) || Object.values(raw.iconCache).some(value => !imageSource(value))) throw Error('备份中的图标数据格式不正确')
  return {
    format: 'all-search-backup', schemaVersion: 1,
    scriptVersion: typeof raw.scriptVersion === 'string' ? raw.scriptVersion : '',
    exportedAt: typeof raw.exportedAt === 'string' ? raw.exportedAt : '',
    sites: normalizeSites(raw.sites), toolbar: normalizeUrls(raw.toolbar), settings,
    iconCache: cloneData(raw.iconCache)
  }
}

export async function readBackup ({ read, defaultSites, defaultToolbar, scriptVersion }) {
  const values = await Promise.all(storageNames.map(name => read(name)))
  const stored = Object.fromEntries(storageNames.map((name, index) => [name, values[index]]))
  return normalizeBackup({
    format: 'all-search-backup', schemaVersion: 1, scriptVersion,
    exportedAt: new Date().toISOString(),
    sites: stored.sites === undefined ? defaultSites : stored.sites,
    toolbar: stored.toolbar === undefined ? defaultToolbar : stored.toolbar,
    settings: Object.fromEntries(settingNames.map(name => [name, stored[name] === undefined ? settingDefaults[name] : stored[name]])),
    iconCache: stored.iconCache === undefined ? {} : stored.iconCache
  })
}

// Validate the whole file before writing; restore prior values if any write fails.
export async function restoreBackup (raw, { read, write, remove }) {
  const backup = normalizeBackup(raw)
  const next = { sites: backup.sites, toolbar: backup.toolbar, ...backup.settings, iconCache: backup.iconCache }
  const oldValues = await Promise.all(storageNames.map(name => read(name)))
  const previous = Object.fromEntries(storageNames.map((name, index) => [name, oldValues[index] === undefined ? undefined : cloneData(oldValues[index])]))
  const attempted = []
  try {
    for (const name of storageNames) {
      attempted.push(name)
      await write(name, cloneData(next[name]))
    }
  } catch (err) {
    const failures = []
    for (const name of attempted.reverse()) {
      try {
        if (JSON.stringify(await read(name)) === JSON.stringify(previous[name])) continue
        if (previous[name] === undefined) await remove(name)
        else await write(name, previous[name])
      } catch { failures.push(name) }
    }
    if (failures.length) throw Error(`导入失败，部分配置未能恢复（${failures.join('、')}）。请保留备份并重试。`)
    throw Error(`导入失败，原配置已保留：${err.message || String(err)}`)
  }
  return backup
}
