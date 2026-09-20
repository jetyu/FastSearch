<template>
  <div v-if="favicon === 1" class="as-img-icon">
    <img
      v-if="img"
      :src="img"
      alt=""
      loading="lazy"
      decoding="async"
      referrerpolicy="no-referrer"
      @error="handleError"
    />
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import parseUrl from '../util/parseUrl'
import useFavicon from './useFavicon'
import { getIconSource, getLegacyIcon, iconCacheVersion } from './iconCache'

export default {
  name: 'favicon',
  props: {
    url: { type: String, default: '' },
    icon: { type: String, default: '' }
  },
  setup(props) {
    const img = ref('')
    const { favicon } = useFavicon()
    let candidates = []
    let index = 0
    let run = 0

    async function showNext(currentRun) {
      const source = candidates[index++]
      if (!source) {
        if (currentRun === run) img.value = ''
        return
      }
      const resolved = source.startsWith('data:image/') ? source : await getIconSource(source)
      if (currentRun === run) img.value = resolved
    }

    function handleError(event) {
      if (event.currentTarget.getAttribute('src') === img.value) showNext(run)
    }

    watch(
      [() => props.icon, () => props.url, favicon, iconCacheVersion],
      async () => {
        const currentRun = ++run
        img.value = ''
        if (favicon.value !== 1) return
        const { hostname, origin } = parseUrl(props.url)
        const legacyIcon = hostname ? await getLegacyIcon(hostname) : ''
        if (currentRun !== run) return
        candidates = [...new Set([props.icon, legacyIcon, origin ? origin + '/favicon.ico' : ''].filter(Boolean))]
        index = 0
        showNext(currentRun)
      },
      { immediate: true }
    )

    return { img, favicon, handleError }
  }
}
</script>

<style lang="scss">
.as-img-icon {
  border: none;
  position: relative;
  font-size: 0;

  img {
    width: 100%;
    height: 100%;
    border: none;
    vertical-align: top;
  }
}
</style>
