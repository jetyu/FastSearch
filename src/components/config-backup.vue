<template>
  <div class="as-config-backup">
    <form-item label="配置备份">
      <as-button type="text" :disabled="busy" title="导出全部已保存配置为 JSON 备份" @click="exportFile">导出</as-button>
      <as-button type="text" :disabled="busy" title="从整份 JSON 备份恢复配置" @click="fileInput.click()">导入</as-button>
      <input ref="fileInput" type="file" accept=".json,application/json" hidden aria-label="整份配置备份文件" @change="importFile">
    </form-item>
    <p v-if="message" class="as-backup-message" :class="{ failed }" role="status">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import formItem from './form-item.vue'
import asButton from './button.vue'
import defaultSites from '../config/sites'
import defaultToolbar from '../config/toolbar'
import { getStorage, setStorage, delStorage } from '../util/storage'
import { version } from '../util/index'
import { normalizeBackup, readBackup, restoreBackup } from '../util/config-backup.mjs'

const busy = ref(false)
const message = ref('')
const failed = ref(false)
const fileInput = ref(null)
const read = name => getStorage(name, undefined)
function showError (err) { failed.value = true; message.value = err.message || String(err) }
async function exportFile () {
  if (busy.value) return
  busy.value = true
  failed.value = false
  message.value = ''
  try {
    const backup = await readBackup({ read, defaultSites, defaultToolbar, scriptVersion: version })
    const url = URL.createObjectURL(new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = `all-search-backup-${backup.exportedAt.slice(0, 10)}.json`
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    message.value = '已导出完整备份：菜单、划词工具栏、设置和图标。'
  } catch (err) { showError(err) } finally { busy.value = false }
}
async function importFile (event) {
  const file = event.target.files[0]
  if (!file || busy.value) return
  busy.value = true
  failed.value = false
  message.value = ''
  try {
    const backup = normalizeBackup(JSON.parse(await file.text()))
    if (!window.confirm(`将恢复 ${backup.sites.length} 个分类、${backup.toolbar.length} 个划词入口及全部设置和图标，覆盖当前配置并刷新页面。确认导入整份备份？`)) return
    await restoreBackup(backup, { read, write: setStorage, remove: delStorage })
    message.value = '整份配置已恢复，正在刷新页面。'
    window.location.reload()
  } catch (err) { showError(err) } finally {
    busy.value = false
    event.target.value = ''
  }
}
</script>

<style scoped>
.as-config-backup .as-button + .as-button { margin-left: 12px; }
.as-config-backup .as-button:disabled { opacity: .45; cursor: default; }
.as-config-backup input[hidden] { display: none; }
#all-search .as-backup-message { margin: 0 0 10px; font-size: 12px; color: #606266; line-height: 1.5; overflow-wrap: anywhere; }
#all-search .as-backup-message.failed { color: #c45656; }
</style>
