<template>
  <template
    v-if="!disabled">
    <div
      v-show="visible"
      style="opacity: 0"
      class="as-container"
      :class="classList">
      <logo :mode="mode"/>
      <as-menu :mode="mode"/>
      <side-bar/>
    </div>
    <hoverBtn v-show="visible"/>
  </template>
  <template v-if="toolbarVisible === 1">
    <selection-bar
      @openDialog="openDialog"/>
  </template>
  <search-dialog
    :keyword="keyword"
    v-model:visible="dialogVisible"/>
  <iconfont/>
  <site-manager v-if="managerVisible"/>
</template>

<script>
import { computed, watch, unref, ref, toRefs, toValue, watchEffect, onMounted, onBeforeUnmount } from 'vue'
import { initSpecialStyle } from '../util/addSpecialStyle'
import { addCustomStyle, changeBodyStyle, protectStyle } from '../util/initStyle'
import { site } from '../config/siteInfo'
import { useFullScreen } from '../util/fullScreen'
import useMode from '../components/useMode'
import useSwitchShow from '../components/useSwitchShow'
import logo from '../components/logo'
import asMenu from '../components/menu'
import sideBar from '../components/side-bar'
import hoverBtn from '../components/hover-btn'
import iconfont from '../components/iconfont'
import selectionBar from '../components/selection-bar'
import searchDialog from '../components/search-dialog'
import useToolbar from '../components/useToolbar'
import useTheme from '../components/useTheme'
import siteManager from '../components/site-manager.vue'
import useSiteManager from '../components/useSiteManager'
import { getKeyword } from '../util/getKeyword'
import { OPEN_SEARCH_EVENT } from '../platform/messages'

export default {
  name: 'all-search',
  components: {
    logo,
    asMenu,
    sideBar,
    hoverBtn,
    iconfont,
    selectionBar,
    searchDialog,
    siteManager
  },
  setup() {
    const { isFullScreen } = useFullScreen()
    const { value: mode } = useMode()
    const { show } = useSwitchShow()
    const { visible: toolbarVisible } = useToolbar('tm')
    useTheme()
    const { managerVisible } = useSiteManager()

    const classList = computed(() => ([
      `as-${toValue(mode)}`,
      toValue(show) === 1 ? 'as-show' : 'as-hide'
    ]))

    const visible = computed(() => {
      return !site.invisible && !unref(isFullScreen)
    })

    watchEffect(() => {
      const remove = site.invisible || site.disabled || toValue(show) === 2
      changeBodyStyle(toValue(mode), remove)
    })

    let isInit = false

    function init(site) {
      if (isInit || site.disabled) {
        return
      }
      protectStyle()
      initSpecialStyle()
      addCustomStyle(toValue(mode), site)
      isInit = true
    }

    watch(site, newSite => {
      init(newSite)
    }, {
      immediate: true
    })

    const dialogVisible = ref(false)
    const keyword = ref('')

    function openDialog(text) {
      keyword.value = text
      dialogVisible.value = true
    }

    function openExtensionDialog () {
      const selectedText = window.getSelection()?.toString().trim()
      const pageKeyword = selectedText ? '' : getKeyword()
      let text = selectedText || ''
      if (!text && pageKeyword) {
        try { text = decodeURIComponent(pageKeyword) } catch { text = pageKeyword }
      }
      openDialog(text)
    }

    onMounted(() => document.addEventListener(OPEN_SEARCH_EVENT, openExtensionDialog))
    onBeforeUnmount(() => document.removeEventListener(OPEN_SEARCH_EVENT, openExtensionDialog))

    const { disabled } = toRefs(site)

    return {
      disabled,
      mode,
      classList,
      visible,
      dialogVisible,
      openDialog,
      keyword,
      toolbarVisible,
      managerVisible
    }
  }
}
</script>

<style lang="scss">
@import "../assets/common.scss";

.body-horizontal {
  height: $height;
  width: 100%;
}

.body-horizontal + body {
  //margin-top: $height !important;
  //position: relative !important;

  [data-as-margin-top] {
    margin-top: $height !important;
  }

  [data-as-transform] {
    transform: translateY($height);
  }

  [data-as-border-top] {
    border-top: rgba(0, 0, 0, 0) $height solid;
    box-sizing: content-box;
  }

  [data-as-has-set] {
    transition-duration: 0s;
  }
}

.body-vertical {
  height: 100%;
  width: $verticalWidth;
  position: fixed;
  z-index: 999999;
}

.body-vertical + body {
  margin-left: $verticalWidth !important;
}

body, #all-search {
  --as-horizontal-height: $height;
  --as-primary-color: #1890ff;
  --as-bg-color: #ffffff;
  --as-surface-color: #ffffff;
  --as-translucent-surface-color: rgba(255, 255, 255, .67);
  --as-panel-background: #ffffff radial-gradient(#eff4f9 75%, #f3f3f3 100%) no-repeat fixed;
  --as-primary-text-color: #606266;
  --as-heading-color: #303133;
  --as-muted-text-color: #909399;
  --as-secondary-background-color: #f5f7fa;
  --as-border-color: #e8e8e8;
  --as-control-border-color: #dcdfe6;
  --as-hover-background-color: #ecf5ff;
  --as-primary-soft-border-color: #a0cfff;
  --as-danger-soft-background-color: #fef0f0;
  --as-danger-soft-border-color: #fab6b6;
  --as-muted-background-color: #f4f4f5;
  --as-dialog-background-color: rgba(243, 243, 243, .85);
  --as-overlay-color: rgba(0, 0, 0, .5);
  --as-shadow-color: rgba(0, 0, 0, .16);
}

#all-search {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
}

#all-search[data-as-theme="dark"] {
  --as-bg-color: #17191e;
  --as-surface-color: #20242b;
  --as-translucent-surface-color: rgba(32, 36, 43, .88);
  --as-panel-background: radial-gradient(circle at top, #252a32 0, #17191e 72%) no-repeat fixed;
  --as-primary-text-color: #e5e7eb;
  --as-heading-color: #f3f4f6;
  --as-muted-text-color: #9ca3af;
  --as-secondary-background-color: #2b3038;
  --as-border-color: #3a404a;
  --as-control-border-color: #4b5260;
  --as-hover-background-color: #26384d;
  --as-primary-soft-border-color: #326899;
  --as-danger-soft-background-color: #482b30;
  --as-danger-soft-border-color: #82464d;
  --as-muted-background-color: #30353e;
  --as-dialog-background-color: rgba(27, 31, 38, .94);
  --as-overlay-color: rgba(0, 0, 0, .68);
  --as-shadow-color: rgba(0, 0, 0, .55);
}

.as-horizontal {
  height: $height;
  width: 100%;
  top: 0;
  border-bottom: 1px var(--as-border-color) solid;
  flex-direction: row;
  transition: transform 0.1s;

  &.as-hide {
    transform: translateY(-100%);
  }

  &.as-show {
    transform: translateY(0);
  }
}

.as-vertical {
  height: 100%;
  width: $verticalWidth;
  top: 0;
  left: 0;
  border-right: 1px var(--as-border-color) solid;
  flex-direction: column;
  transition: transform 0.1s;

  &.as-hide {
    transform: translateX(-100%);
  }

  &.as-show {
    transform: translateX(0);
  }
}

.as-container {
  opacity: 1 !important;
  position: fixed;
  display: flex;
  background-color: var(--as-bg-color);
  z-index: $mainZIndex;
}
</style>
