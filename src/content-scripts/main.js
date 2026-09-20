import { createApp } from 'vue'
import { GM_registerMenuCommand } from '$'
import index from './index'
import useSiteManager from '../components/useSiteManager'
import { OPEN_SEARCH_EVENT, OPEN_SEARCH_MESSAGE } from '../platform/messages'
import {
  createAsRoot,
  getAsRoot
} from '../util/index'

import {
  initTmMethods
} from '../util/storage'

initTmMethods()

if (globalThis.chrome?.runtime?.onMessage) {
  globalThis.chrome.runtime.onMessage.addListener(message => {
    if (message?.type === OPEN_SEARCH_MESSAGE) {
      document.dispatchEvent(new CustomEvent(OPEN_SEARCH_EVENT))
    }
  })
}

const el = getAsRoot()
if (!el) {
  const app = createApp(index)
  const el = createAsRoot()
  const mountEL = document.documentElement.insertBefore(el, document.body)
  app.mount(mountEL)
  if (GM_registerMenuCommand) {
    const { openManager } = useSiteManager()
    GM_registerMenuCommand('Fast Search：网址管理', () => openManager('sites'))
  }
}
