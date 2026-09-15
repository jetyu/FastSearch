export const cloneData = value => JSON.parse(JSON.stringify(value))
const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value)
const visibility = value => ({ ...(isObject(value) ? value : {}), visible: value?.visible !== false })
function text (value, label) {
  if (typeof value !== 'string' || !value.trim()) throw Error(`${label}不能为空`)
  return value.trim()
}
export function normalizeUrls (list) {
  if (!Array.isArray(list)) throw Error('网址列表必须是数组')
  return list.map((raw, index) => {
    if (!isObject(raw)) throw Error(`第 ${index + 1} 个网址必须是对象`)
    const item = cloneData(raw)
    const nameZh = text(item.nameZh, `第 ${index + 1} 个网址名称`)
    const url = text(item.url, `“${nameZh}”的地址`)
    let parsed
    try { parsed = new URL(url) } catch { throw Error(`“${nameZh}”的网址格式不正确`) }
    if (!['http:', 'https:'].includes(parsed.protocol) || parsed.username || parsed.password) throw Error(`“${nameZh}”请使用不包含账号密码的 http 或 https 网址`)
    if (item.icon && (typeof item.icon !== 'string' || !/^(https?:\/\/|data:image\/)/i.test(item.icon))) throw Error(`“${nameZh}”的图标应为图片链接或 data:image 数据`)
    return { ...item, nameZh, url, data: visibility(item.data) }
  })
}
export function normalizeSites (list) {
  if (!Array.isArray(list)) throw Error('根节点必须是分类数组')
  const names = new Set()
  return list.map((raw, index) => {
    if (!isObject(raw)) throw Error(`第 ${index + 1} 个分类必须是对象`)
    const item = cloneData(raw)
    const name = text(item.name, `第 ${index + 1} 个分类标识`)
    const nameZh = text(item.nameZh, `第 ${index + 1} 个分类名称`)
    if (names.has(name)) throw Error(`分类标识“${name}”重复`)
    names.add(name)
    return { ...item, name, nameZh, list: normalizeUrls(item.list), data: visibility(item.data) }
  })
}

export function createListRepository ({ defaults, normalize, read, write, remove, onChange }) {
  let value = normalize(defaults)
  let storedJson
  let loaded = false
  let loading = null
  let saving = false
  const snapshot = () => cloneData(value)
  function publish (next, stored) {
    value = next
    storedJson = JSON.stringify(stored)
    loaded = true
    onChange(snapshot())
    return snapshot()
  }
  function reload () {
    if (saving) return Promise.reject(Error('正在处理配置，请稍后重试'))
    if (loading) return loading
    loading = (async () => {
      const stored = await read()
      return publish(normalize(stored === undefined ? defaults : stored), stored)
    })().finally(() => { loading = null })
    return loading
  }
  async function persist (next, stored, commit) {
    if (saving) throw Error('正在处理配置，请稍后重试')
    if (loading) await loading
    if (!loaded) await reload()
    if (saving) throw Error('正在处理配置，请稍后重试')
    saving = true
    try {
      if (JSON.stringify(await read()) !== storedJson) throw Error('配置已在其他页面修改，本次操作已取消。请保留需要的草稿内容，关闭并重新打开网址管理后重试。')
      await commit()
      return publish(next, stored)
    } finally { saving = false }
  }
  async function save (draft) {
    const next = normalize(draft)
    return persist(next, next, () => write(cloneData(next)))
  }
  async function clear () {
    return persist(normalize(defaults), undefined, remove)
  }
  return { reload, save, clear, snapshot }
}
