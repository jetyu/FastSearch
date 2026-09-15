import { ref } from 'vue'

const managerVisible = ref(false)
const managerTab = ref('sites')
export default function useSiteManager () {
  function openManager (tab = 'sites') {
    if (managerVisible.value) return
    managerTab.value = tab
    managerVisible.value = true
  }
  return { managerVisible, managerTab, openManager }
}
