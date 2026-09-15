import { ref } from 'vue'
import { getStorage, setStorage, delStorage } from '../util/storage'
import { cloneData, createListRepository } from '../util/site-data.mjs'

export default function useStoredList (name, defaults, normalize) {
  const list = ref(cloneData(defaults))
  const error = ref('')
  const repository = createListRepository({
    defaults, normalize,
    read: () => getStorage(name, undefined),
    write: value => setStorage(name, value),
    remove: () => delStorage(name),
    onChange: value => { list.value = value; error.value = '' }
  })
  async function reload () {
    try { return await repository.reload() } catch (err) {
      error.value = err.message || String(err)
      throw err
    }
  }
  reload().catch(() => {})
  return { list, error, reload, save: repository.save, clear: repository.clear }
}
