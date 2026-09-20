import { reactive, ref } from 'vue'
import { GM_xmlhttpRequest } from '$'
import { delStorage, getStorage, setStorage } from '../util/storage'

const maxIconBytes = 256 * 1024
const legacyIcons = reactive({})
const fetchedIcons = reactive({})
const pending = new Map()
export const iconCacheVersion = ref(0)

let generation = 0
let writes = Promise.resolve()
let clearing = Promise.resolve()

const ready = Promise.all([
  getStorage('iconCache', {})
    .then((value) => Object.assign(legacyIcons, value))
    .catch(() => {}),
  getStorage('fetchedIconCache', {})
    .then((value) => Object.assign(fetchedIcons, value))
    .catch(() => {})
])

function clearObject(object) {
  for (const key of Object.keys(object)) delete object[key]
}

function imageType(blob, url) {
  if (blob.type.startsWith('image/')) return blob.type
  if (/\.ico(?:[?#]|$)/i.test(url) && (!blob.type || blob.type === 'application/octet-stream')) {
    return 'image/x-icon'
  }
  return ''
}

function blobToDataUrl(blob, type) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(new Blob([blob], { type }))
  })
}

function validateImage(src) {
  return new Promise((resolve) => {
    const image = new Image()
    image.onload = () => resolve(true)
    image.onerror = () => resolve(false)
    image.src = src
  })
}

function fetchImage(url) {
  return new Promise((resolve) => {
    try {
      GM_xmlhttpRequest({
        method: 'GET',
        url,
        responseType: 'blob',
        anonymous: true,
        timeout: 10000,
        onload: async (response) => {
          const blob = response.response
          const type = blob instanceof Blob ? imageType(blob, url) : ''
          if (response.status < 200 || response.status >= 300 || !type || blob.size > maxIconBytes) {
            resolve(null)
            return
          }
          try {
            const dataUrl = await blobToDataUrl(blob, type)
            resolve((await validateImage(dataUrl)) ? dataUrl : null)
          } catch {
            resolve(null)
          }
        },
        onerror: () => resolve(null),
        ontimeout: () => resolve(null),
        onabort: () => resolve(null)
      })
    } catch {
      resolve(null)
    }
  })
}

export async function getLegacyIcon(hostname) {
  await ready
  await clearing.catch(() => {})
  return legacyIcons[hostname] || ''
}

export async function getIconSource(url) {
  await ready
  await clearing.catch(() => {})
  if (!/^https?:\/\//i.test(url)) return url
  if (fetchedIcons[url]) return fetchedIcons[url]
  if (typeof GM_xmlhttpRequest !== 'function') return url
  if (pending.has(url)) return pending.get(url)

  const currentGeneration = generation
  const request = (async () => {
    const dataUrl = await fetchImage(url)
    if (currentGeneration !== generation) return ''
    if (!dataUrl) return url
    fetchedIcons[url] = dataUrl
    writes = writes
      .catch(() => {})
      .then(async () => {
        if (currentGeneration !== generation) return
        const stored = await getStorage('fetchedIconCache', {}).catch(() => ({}))
        if (currentGeneration !== generation) return
        const merged = { ...stored, ...fetchedIcons }
        await setStorage('fetchedIconCache', merged)
        if (currentGeneration === generation) Object.assign(fetchedIcons, merged)
      })
    await writes.catch(() => {})
    return dataUrl
  })()
  pending.set(url, request)
  try {
    return await request
  } finally {
    if (pending.get(url) === request) pending.delete(url)
  }
}

export async function clearStoredIcons() {
  generation++
  pending.clear()
  clearing = (async () => {
    await ready
    await writes.catch(() => {})
    await Promise.all([delStorage('iconCache'), delStorage('fetchedIconCache')])
    clearObject(legacyIcons)
    clearObject(fetchedIcons)
    iconCacheVersion.value++
  })()
  return clearing
}
