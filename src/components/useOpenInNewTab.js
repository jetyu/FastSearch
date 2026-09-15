import useConfig from './useConfig'

const openInNewTab = useConfig({
  name: 'openInNewTab',
  defaultVal: false
})

export default function useOpenInNewTab () {
  return {
    openInNewTab
  }
}
