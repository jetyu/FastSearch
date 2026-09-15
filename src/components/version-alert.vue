<template>
  <el-alert
    class="version-alert"
    v-show="data.notInstall"
    title="错误"
    description="检测到您 未安装 或者 未启用 All Search Plus"
    type="error"
    show-icon
    :closable="false"/>
</template>

<script>
import { reactive } from 'vue'
import store from '../util/store'

export default {
  name: 'version-alert',
  setup () {
    const data = reactive({
      notInstall: false,
      notLatest: false
    })

    setTimeout(() => {
      if (!store.tmVersion) {
        data.notInstall = true
      }
    }, 2000)

    return {
      data
    }
  }
}
</script>

<style>
  .version-alert {
    margin-bottom: 20px;
  }
</style>
