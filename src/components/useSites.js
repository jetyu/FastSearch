import { computed } from 'vue'
import defaults from '../config/sites'
import { normalizeSites } from '../util/site-data.mjs'
import useStoredList from './useStoredList'

const store = useStoredList('sites', defaults, normalizeSites)
async function resetSites () {
  if (!window.confirm('确认要重置所有网址吗？')) return
  try { await store.save(defaults) } catch (err) { window.alert(err.message || String(err)) }
}
export default function useSites (type) {
  return {
    sites: computed(() => type === 'tm'
      ? store.list.value.filter(item => item.data.visible).map(item => ({
        ...item, show: false, list: item.list.filter(child => child.data.visible)
      })).filter(item => item.list.length)
      : store.list.value),
    error: store.error,
    reloadSites: store.reload,
    saveSites: store.save,
    clearSites: store.clear,
    resetSites
  }
}
