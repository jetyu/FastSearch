<template>
  <div
    class="as-setting"
    :class="mode">
    <div
      class="as-setting-btn"
      @click="hide">
      收起
    </div>
    <div
      class="as-setting-btn"
      @click="open">
      设置
    </div>
  </div>
  <teleport to="#all-search">
    <transition name="overlay" appear>
      <overlay
        v-show="visible"
        @click="onMaskClick">
        <transition name="drawer" appear>
          <div
            v-show="visible"
            :aria-hidden="!visible"
            aria-modal="true"
            role="dialog"
            class="as-side-bar"
            @click.stop>
            <header class="header">
              FastSearch
            </header>
            <section>
              <form-item
                label-width="100"
                label="新标签页打开">
                <as-radio
                  :label="true"
                  v-model="openInNewTab">开启
                </as-radio>
                <as-radio
                  :label="false"
                  v-model="openInNewTab">关闭
                </as-radio>
              </form-item>
              <form-item
                label-width="84"
                label="划词工具栏">
                <as-radio
                  :label="1"
                  v-model="toolbarVisible">显示
                </as-radio>
                <as-radio
                  :label="2"
                  v-model="toolbarVisible">隐藏
                </as-radio>
              </form-item>
              <form-item
                class="as-theme-setting"
                label-width="64"
                label="外观">
                <as-radio
                  label="auto"
                  v-model="theme">自动
                </as-radio>
                <as-radio
                  label="dark"
                  v-model="theme">深色
                </as-radio>
                <as-radio
                  label="light"
                  v-model="theme">浅色
                </as-radio>
              </form-item>
              <form-item label="方向">
                <as-radio
                  label="horizontal"
                  v-model="mode">横向
                </as-radio>
                <as-radio
                  label="vertical"
                  v-model="mode">竖向
                </as-radio>
              </form-item>
              <form-item label="对齐">
                <as-radio
                  v-for="[key, value] in alignList"
                  :key="key"
                  :label="key"
                  v-model="align">
                  {{ value }}
                </as-radio>
              </form-item>
              <form-item label="滚动隐藏">
                <as-radio
                  v-for="[key, value] in options"
                  :key="key"
                  :label="key"
                  v-model="scrollHide"
                  @change="changeScrollHide">
                  {{ value }}
                </as-radio>
              </form-item>
              <form-item label="图标">
                <as-radio
                  :label="1"
                  v-model="favicon">显示
                </as-radio>
                <as-radio
                  :label="2"
                  v-model="favicon">隐藏
                </as-radio>
              </form-item>
              <form-item label="主题色">
                <color
                  name="primaryColor"
                  v-model="primaryColor"/>
              </form-item>
              <form-item label="文字色">
                <color
                  name="primaryTextColor"
                  v-model="primaryTextColor"/>
              </form-item>
              <form-item label="图标缓存">
                <as-button
                  type="text"
                  @click="clearIconCache">
                  清除
                </as-button>
              </form-item>
              <form-item label="网址管理">
                <as-button
                  type="text"
                  @click="manage('sites')">
                  打开
                </as-button>
              </form-item>
              <config-backup/>
            </section>
            <footer>
              <a class="link"
                 title="github"
                 href="https://github.com/jetyu/all-search_plus/issues"
                 target="_blank">
                反馈
              </a>
            </footer>
          </div>
        </transition>
      </overlay>
    </transition>
  </teleport>
</template>

<script>
import { ref } from 'vue'
import useMode from '../components/useMode'
import useAlign from './useAlign'
import useSwitchShow from '../components/useSwitchShow'
import useColor from './useColor'
import useFavicon from './useFavicon'
import useToolbar from './useToolbar'
import useOpenInNewTab from './useOpenInNewTab'
import useTheme from './useTheme'
import useSiteManager from './useSiteManager'
import overlay from '../components/overlay'
import radio from '../components/radio'
import formItem from '../components/form-item'
import color from '../components/color'
import button from '../components/button'
import configBackup from './config-backup.vue'

export default {
  name: 'side-bar',
  components: {
    overlay,
    asRadio: radio,
    formItem,
    color,
    asButton: button,
    configBackup
  },
  setup () {
    const visible = ref(false)
    const open = () => {
      visible.value = true
    }
    const onMaskClick = () => {
      visible.value = false
    }

    const { value: mode } = useMode()
    const { list: alignList, value: align } = useAlign()
    const { primaryColor, primaryTextColor } = useColor()
    const { show, options, scrollHide } = useSwitchShow()
    const { favicon, clearIconCache } = useFavicon()
    const { visible: toolbarVisible } = useToolbar()
    const { openInNewTab } = useOpenInNewTab()
    const { theme } = useTheme()
    const { openManager } = useSiteManager()
    function manage (tab) {
      visible.value = false
      openManager(tab)
    }

    const hide = () => {
      show.value = 2
    }

    function changeScrollHide (e) {
      if (e.target.value === 'none') {
        show.value = 1
      } else {
        show.value = 2
      }
    }

    return {
      mode,
      visible,
      open,
      onMaskClick,
      alignList,
      align,
      favicon,
      toolbarVisible,
      openInNewTab,
      theme,
      primaryColor,
      primaryTextColor,
      show,
      options,
      scrollHide,
      clearIconCache,
      manage,
      hide,
      changeScrollHide
    }
  }
}

</script>

<style lang="scss">
@import "../assets/common.scss";

.as-setting {
  position: relative;

  &.horizontal {
    box-shadow: -4px 0 10px 0 rgb(0 0 0 / 12%);
    display: flex;
  }
}


.as-setting-btn {
  line-height: $height;
  padding: 0 14px;
  position: relative;
  margin: 0;
  white-space: nowrap;
  cursor: pointer;
  font-size: 14px;
  color: var(--as-primary-text-color);
  text-align: center;

  &:hover {
    color: var(--as-primary-color);
    background-color: var(--as-secondary-background-color);
  }
}

.as-side-bar {
  width: 20vw;
  min-width: 300px;
  right: 0;
  height: 100%;
  top: 0;
  bottom: 0;
  position: absolute;
  box-sizing: border-box;
  background: var(--as-panel-background);
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 10px -5px rgba(0, 0, 0, .2), 0 16px 24px 2px rgba(0, 0, 0, .14), 0 6px 30px 5px rgba(0, 0, 0, .12);
  overflow: hidden;

  > header {
    font-size: 16px;
    align-items: center;
    color: var(--as-primary-text-color);
    display: flex;
    padding: 32px 24px;
  }

  > section {
    overflow-y: auto;
    min-height: 0;
    padding: 10px 24px;
    margin: 0 12px;
    height: 100%;
    flex: 1;
    border-radius: 4px;
    border: 1px solid var(--as-border-color);
    background: var(--as-translucent-surface-color);
  }

  > footer {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 16px;
    padding: 10px 24px 30px;

    .link {
      cursor: pointer;
      color: var(--as-primary-text-color);
      background: none;
      border: 0;
      padding: 0;
      font-size: 14px;
      text-decoration: none;

      &:visited {
        color: var(--as-primary-text-color);
      }
    }

  }
}

.as-theme-setting .as-radio + .as-radio {
  margin-left: 6px;
}

.overlay-enter-active, .overlay-leave-active {
  transition: opacity .3s;
}

.overlay-enter-from, .overlay-leave-to {
  opacity: 0;
}

.overlay-enter-active .as-side-bar {
  animation: rtl-drawer-animation .3s linear reverse
}

.overlay-leave-active .as-side-bar {
  animation: rtl-drawer-animation .3s linear
}

@keyframes rtl-drawer-animation {
  0% {
    transform: translate(0)
  }

  to {
    transform: translate(100%)
  }
}

</style>
