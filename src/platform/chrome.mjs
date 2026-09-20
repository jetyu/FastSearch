const storageArea = globalThis.chrome?.storage?.local

function requireStorage () {
  if (!storageArea) throw Error('Chrome 扩展存储不可用')
  return storageArea
}

export async function GM_getValue (name, defaultValue) {
  const values = await requireStorage().get(name)
  return Object.prototype.hasOwnProperty.call(values, name) ? values[name] : defaultValue
}

export async function GM_setValue (name, value) {
  await requireStorage().set({ [name]: value })
}

export async function GM_deleteValue (name) {
  await requireStorage().remove(name)
}

// These APIs only exist in userscript managers. The shared code feature-detects
// them, so the Chrome build can safely expose an unavailable value.
export const GM_getResourceText = undefined
export const GM_registerMenuCommand = undefined
export const GM_xmlhttpRequest = undefined
