import { createApp } from 'vue'
import { GM_registerMenuCommand } from '$'
import index from './index'
import useSiteManager from '../components/useSiteManager'
import {
  createAsRoot,
  getAsRoot
} from '../util/index'

import {
  initTmMethods
} from '../util/storage'

initTmMethods()
const el = getAsRoot()
if (!el) {
  const app = createApp(index)
  const el = createAsRoot()
  const mountEL = document.documentElement.insertBefore(el, document.body)
  app.mount(mountEL)
  if (GM_registerMenuCommand) {
    const { openManager } = useSiteManager()
    GM_registerMenuCommand('全搜：网址管理', () => openManager('sites'))
  }
}
