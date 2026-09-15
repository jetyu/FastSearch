import { GM_getValue, GM_setValue, GM_deleteValue } from '$'
import { getName, parseJson, version } from './index'
import store from './store'

async function getStorageFn (name, fallback) {
  if (!GM_getValue) throw Error('没有找到 GM_getValue')
  const item = await GM_getValue(getName(name))
  if (item === undefined) {
    if (arguments.length > 1) return fallback
    throw Error('没有已保存的配置：' + name)
  }
  return parseJson(item)
}

async function setStorageFn (name, value) {
  if (value === undefined) throw Error('缺少要保存的配置')
  if (!GM_setValue) throw Error('没有找到 GM_setValue')
  await GM_setValue(getName(name), value)
  return value
}

async function delStorageFn (name) {
  if (!GM_deleteValue) throw Error('没有找到 GM_deleteValue')
  await GM_deleteValue(getName(name))
  return true
}

export let getStorage = getStorageFn
export let setStorage = setStorageFn
export let delStorage = delStorageFn

const scriptLoaded = getName('script-loaded')
const pageLoaded = getName('page-loaded')

export function initTmMethods () {
  const emit = function () {
    document.dispatchEvent(new CustomEvent(scriptLoaded, {
      detail: {
        version,
        getStorage: getStorageFn,
        setStorage: setStorageFn,
        delStorage: delStorageFn
      }
    }))
  }
  document.addEventListener(pageLoaded, emit)
  emit()
}

export function getTmMethods () {
  document.addEventListener(scriptLoaded, (event) => {
    store.tmVersion = event.detail.version
    getStorage = event.detail.getStorage
    setStorage = event.detail.setStorage
    delStorage = event.detail.delStorage
  })
  document.dispatchEvent(new Event(pageLoaded))
}
