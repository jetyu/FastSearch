import useConfig from './useConfig'
import { clearStoredIcons } from './iconCache'

const favicon = useConfig({
  name: 'favicon',
  defaultVal: 1,
  reg: /[1|2]/
})

async function clearIconCache () {
  if (window.confirm('确认要清除图标的缓存吗')) {
    try {
      await clearStoredIcons()
      console.log('清除成功')
    } catch (error) {
      console.error('清除图标缓存失败', error)
    }
  }
}

export default function useFavicon () {
  return {
    favicon,
    clearIconCache
  }
}


