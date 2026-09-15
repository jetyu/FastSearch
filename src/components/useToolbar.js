import { computed } from 'vue'
import useConfig from './useConfig'
import useStoredList from './useStoredList'
import defaults from '../config/toolbar'
import { normalizeUrls } from '../util/site-data.mjs'

const store = useStoredList('toolbar', defaults, normalizeUrls)
const visible = useConfig({ name: 'showToolbar', defaultVal: 1, reg: /[1|2]/ })
export default function useToolbar (type) {
  return {
    visible,
    error: store.error,
    list: computed(() => type === 'tm' ? store.list.value.filter(item => item.data.visible) : store.list.value),
    reloadToolbar: store.reload,
    saveToolbar: store.save
  }
}
