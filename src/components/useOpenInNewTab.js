import useConfig from './useConfig'

const openInNewTab = useConfig({
  name: 'openInNewTab',
  defaultVal: true
})

export default function useOpenInNewTab () {
  return {
    openInNewTab
  }
}
