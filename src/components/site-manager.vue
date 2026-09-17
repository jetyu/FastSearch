<template>
  <teleport to="#all-search">
    <div class="sm-overlay" @click.self="close">
      <section ref="panel" class="sm-dialog" role="dialog" aria-modal="true" aria-labelledby="sm-title" tabindex="-1" @keydown="keydown">
        <header class="sm-header">
          <h2 id="sm-title">网址管理 <span>All Search Plus {{ version }}</span></h2>
          <button type="button" class="sm-icon-button sm-close" aria-label="关闭网址管理" :disabled="busy" @click="close"><Close/></button>
        </header>
        <nav class="sm-tabs" role="tablist" aria-label="网址管理页面">
          <button v-for="item in tabs" :id="`sm-tab-${item.name}`" :key="item.name" type="button" role="tab" :aria-selected="tab === item.name" :aria-controls="`sm-page-${item.name}`" :tabindex="tab === item.name ? 0 : -1" :disabled="busy" @click="switchTab(item.name)" @keydown.left.prevent="stepTab(-1)" @keydown.right.prevent="stepTab(1)">{{ item.label }}</button>
        </nav>
        <div :id="`sm-page-${tab}`" class="sm-body" :class="{ 'sm-body-json': tab === 'edit' }" role="tabpanel" :aria-labelledby="`sm-tab-${tab}`">
          <p v-if="!loaded" class="sm-help">{{ busy ? '正在读取配置…' : '配置读取失败，请关闭后重新打开重试。' }}</p>
          <fieldset :disabled="busy || !loaded" :inert="busy || !loaded ? '' : null">
            <template v-if="tab === 'sites'">
              <div class="sm-category-tabs" aria-label="网址分类">
                <div class="sm-category-group">
                  <button v-for="category in menuDraft" :key="category.name" type="button" :aria-pressed="activeName === category.name" @click="activeName = category.name">{{ category.nameZh || '未命名' }}</button>
                </div>
                <button type="button" class="sm-icon-button sm-add-category" aria-label="添加分类" title="添加分类" @click="addCategory"><Plus/></button>
              </div>
              <template v-if="activeCategory">
                <div class="sm-category-row">
                  <input v-model="activeCategory.nameZh" aria-label="分类名称" placeholder="分类名称">
                  <div class="sm-row-tools">
                    <div class="sm-button-group">
                      <button type="button" class="sm-icon-button" aria-label="分类左移" title="分类左移" :disabled="activeIndex === 0" @click="moveCategory(-1)"><ArrowLeft/></button>
                      <button type="button" class="sm-icon-button" aria-label="分类右移" title="分类右移" :disabled="activeIndex === menuDraft.length - 1" @click="moveCategory(1)"><ArrowRight/></button>
                    </div>
                    <button type="button" class="sm-icon-button" :class="activeCategory.data.visible ? 'sm-plain-primary' : 'sm-plain-muted'" :aria-pressed="activeCategory.data.visible" aria-label="显示分类" :title="activeCategory.data.visible ? '隐藏分类' : '显示分类'" @click="activeCategory.data.visible = !activeCategory.data.visible"><View v-if="activeCategory.data.visible"/><Hide v-else/></button>
                    <button type="button" class="sm-icon-button sm-plain-danger" aria-label="删除分类" title="删除分类" @click="deleteCategory"><Delete/></button>
                  </div>
                </div>
                <managed-url-list :key="activeName" v-model="activeCategory.list" :disabled="busy || !loaded" :personal-categories="personalCategories" @copy="copyUrl" @error="showError"/>
              </template>
              <p v-else class="sm-empty">暂无分类，点击右上角 ＋ 添加分类。</p>
              <p class="sm-help">拖动网址左侧手柄调整顺序，地址中的 %s 代表搜索关键词。</p>
            </template>
            <template v-else-if="tab === 'edit' && loaded">
              <div class="sm-editor-actions">
                <span class="sm-help">清除后恢复内置网址，确认后立即生效。</span>
                <button type="button" class="sm-plain-danger" :disabled="busy" @click="clearMenuConfig">清除网址管理配置</button>
              </div>
              <managed-json-editor v-model="jsonText" @error="showError"/>
            </template>
            <template v-else-if="tab === 'toolbar'">
              <managed-url-list v-model="toolbarDraft" :disabled="busy || !loaded" @error="showError"/>
              <p class="sm-help">拖动调整划词搜索入口的顺序，点击眼睛图标显示或隐藏。</p>
            </template>
          </fieldset>
        </div>
        <footer class="sm-footer">
          <div class="sm-feedback" role="status" aria-live="polite" :class="{ 'sm-error': failed }">
            <span v-if="message">{{ message }}</span>
            <span class="sm-help">{{ activeDirty ? '有未保存的修改' : '配置已加载' }}{{ tab === 'toolbar' ? ' · 划词工具栏' : ' · 搜索菜单' }}{{ !activeDirty && dirty ? ' · 其他 Tab 尚未保存' : '' }}</span>
          </div>
          <div class="sm-footer-actions">
            <button type="button" :disabled="busy" @click="cancel">取消</button>
            <button type="button" class="sm-success" :disabled="busy || !loaded || !activeDirty" @click="save">{{ busy ? '处理中…' : '保存' }}</button>
          </div>
        </footer>
      </section>
    </div>
  </teleport>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { Close, Plus, ArrowLeft, ArrowRight, View, Hide, Delete } from '@element-plus/icons-vue'
import useSites from './useSites'
import useToolbar from './useToolbar'
import useSiteManager from './useSiteManager'
import managedUrlList from './managed-url-list.vue'
import managedJsonEditor from './managed-json-editor.vue'
import { cloneData, normalizeSites } from '../util/site-data.mjs'
import { version } from '../util/index'

const { reloadSites, saveSites, clearSites } = useSites()
const { reloadToolbar, saveToolbar } = useToolbar()
const { managerVisible, managerTab } = useSiteManager()
const tabs = [{ name: 'sites', label: '配置' }, { name: 'edit', label: '编辑' }, { name: 'toolbar', label: '划词工具栏' }]
const tab = ref(managerTab.value)
const panel = ref(null)
const previousFocus = document.activeElement
const menuDraft = ref([])
const toolbarDraft = ref([])
const menuOriginal = ref('[]')
const toolbarOriginal = ref('[]')
const jsonText = ref('[]')
const activeName = ref('')
const busy = ref(false)
const menuLoaded = ref(false)
const toolbarLoaded = ref(false)
const message = ref('')
const failed = ref(false)
const activeIndex = computed(() => menuDraft.value.findIndex(item => item.name === activeName.value))
const activeCategory = computed(() => menuDraft.value[activeIndex.value])
const personalCategories = computed(() => menuDraft.value.filter(item => item.name.startsWith('personal') && item.name !== activeName.value))
const loaded = computed(() => tab.value === 'toolbar' ? toolbarLoaded.value : menuLoaded.value)
const menuDirty = computed(() => menuLoaded.value && (JSON.stringify(menuDraft.value) !== menuOriginal.value || (tab.value === 'edit' && jsonText.value !== JSON.stringify(menuDraft.value, null, 2))))
const toolbarDirty = computed(() => toolbarLoaded.value && JSON.stringify(toolbarDraft.value) !== toolbarOriginal.value)
const dirty = computed(() => menuDirty.value || toolbarDirty.value)
const activeDirty = computed(() => tab.value === 'toolbar' ? toolbarDirty.value : menuDirty.value)

function showError (err) { failed.value = true; message.value = err.message || String(err) }
function info (text) { failed.value = false; message.value = text }
function selectCategory () {
  if (!menuDraft.value.some(item => item.name === activeName.value)) activeName.value = menuDraft.value[0]?.name || ''
}
function syncMenu (value) {
  menuDraft.value = cloneData(value)
  menuOriginal.value = JSON.stringify(value)
  jsonText.value = JSON.stringify(value, null, 2)
  selectCategory()
  menuLoaded.value = true
}
function syncToolbar (value) {
  toolbarDraft.value = cloneData(value)
  toolbarOriginal.value = JSON.stringify(value)
  toolbarLoaded.value = true
}
async function load () {
  busy.value = true
  menuLoaded.value = toolbarLoaded.value = false
  info('')
  const results = await Promise.allSettled([reloadSites(), reloadToolbar()])
  if (results[0].status === 'fulfilled') syncMenu(results[0].value)
  if (results[1].status === 'fulfilled') syncToolbar(results[1].value)
  const errors = results.filter(item => item.status === 'rejected').map(item => item.reason.message || String(item.reason))
  if (errors.length) showError(Error(errors.join('；')))
  busy.value = false
}
function discard () { return !dirty.value || window.confirm('有未保存的修改，确定放弃吗？') }
function switchTab (name) {
  if (busy.value || name === tab.value) return
  if (tab.value === 'edit' && menuLoaded.value) {
    try { menuDraft.value = normalizeSites(JSON.parse(jsonText.value)); selectCategory() } catch (err) { showError(err); return }
  }
  if (name === 'edit') jsonText.value = JSON.stringify(menuDraft.value, null, 2)
  tab.value = name
  info('')
}
async function stepTab (offset) {
  const index = tabs.findIndex(item => item.name === tab.value)
  switchTab(tabs[(index + offset + tabs.length) % tabs.length].name)
  await nextTick()
  panel.value.querySelector(`[id="sm-tab-${tab.value}"]`).focus()
}
async function save () {
  if (busy.value || !loaded.value) return
  busy.value = true
  info('')
  try {
    if (tab.value === 'toolbar') syncToolbar(await saveToolbar(toolbarDraft.value))
    else syncMenu(await saveSites(tab.value === 'edit' ? JSON.parse(jsonText.value) : menuDraft.value))
    info('保存成功，当前页面已生效；其他已打开页面请刷新。')
  } catch (err) { showError(err) } finally { busy.value = false }
}
function cancel () {
  if (busy.value) return
  if (!loaded.value) { close(); return }
  if (tab.value === 'toolbar') syncToolbar(JSON.parse(toolbarOriginal.value))
  else syncMenu(JSON.parse(menuOriginal.value))
  info('已取消当前修改，恢复为上次保存的内容。')
}
async function clearMenuConfig () {
  if (busy.value || !menuLoaded.value) return
  if (!window.confirm('将清除已保存的网址管理配置及当前菜单草稿，并恢复内置网址。确认后立即生效，确定清除吗？')) return
  busy.value = true
  info('')
  try {
    syncMenu(await clearSites())
    info('网址管理配置已清除，已恢复内置网址；其他已打开页面请刷新。')
  } catch (err) { showError(err) } finally { busy.value = false }
}
function addCategory () {
  let name
  do { name = `personal-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` } while (menuDraft.value.some(item => item.name === name))
  menuDraft.value.push({ name, nameZh: '新分类', list: [], data: { visible: true } })
  activeName.value = name
}
function moveCategory (offset) {
  const index = activeIndex.value
  const target = index + offset
  if (target >= 0 && target < menuDraft.value.length) menuDraft.value.splice(target, 0, menuDraft.value.splice(index, 1)[0])
}
function deleteCategory () {
  if (!window.confirm(`删除分类“${activeCategory.value.nameZh}”及其中的 ${activeCategory.value.list.length} 个网址？保存后生效。`)) return
  menuDraft.value.splice(activeIndex.value, 1)
  selectCategory()
}
function copyUrl ({ item, name }) {
  const target = menuDraft.value.find(category => category.name === name)
  if (target) { target.list.push(item); info(`已添加到“${target.nameZh}”，点击保存后生效。`) }
}
function close () { if (!busy.value && discard()) managerVisible.value = false }
function keydown (event) {
  if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close() }
  if (event.key !== 'Tab') return
  const items = [...panel.value.querySelectorAll('button, input, textarea, select, [tabindex="0"]')].filter(item => !item.matches(':disabled') && item.tabIndex >= 0 && item.getClientRects().length)
  const first = items[0]
  const last = items[items.length - 1]
  if (!first) { event.preventDefault(); return }
  if (event.shiftKey && (document.activeElement === first || document.activeElement === panel.value)) { event.preventDefault(); last.focus() }
  else if (!event.shiftKey && (document.activeElement === last || document.activeElement === panel.value)) { event.preventDefault(); first.focus() }
}
onMounted(() => { panel.value.focus(); load() })
onUnmounted(() => { if (previousFocus?.isConnected) previousFocus.focus() })
</script>

<style lang="scss">
#all-search .sm-overlay {
  position: fixed; inset: 0; z-index: 1000002; display: flex; align-items: center; justify-content: center;
  padding: 24px; background: var(--as-overlay-color); color: var(--as-primary-text-color); font-size: 14px; text-align: left;
  *, *::before, *::after { box-sizing: border-box; }
  .sm-dialog { display: flex; flex-direction: column; width: 1080px; max-width: 100%; height: min(760px, 88vh); background: var(--as-surface-color); border-radius: 4px; box-shadow: 0 12px 32px var(--as-shadow-color); overflow: hidden; }
  .sm-header { display: flex; align-items: center; justify-content: space-between; padding: 18px 24px 12px; flex-shrink: 0; }
  h2 { margin: 0; font-size: 18px; font-weight: 500; line-height: 26px; color: var(--as-heading-color); span { font-size: 12px; color: var(--as-muted-text-color); margin-left: 12px; } }
  button:where(:not(.jsoneditor *)) { appearance: none; display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 8px 15px; min-height: 32px; font: inherit; line-height: 1; white-space: nowrap; border: 1px solid var(--as-control-border-color); border-radius: 4px; color: var(--as-primary-text-color); background: var(--as-surface-color); cursor: pointer; }
  button:where(:not(.jsoneditor *)):hover:not(:disabled) { border-color: var(--as-primary-soft-border-color); color: var(--as-primary-color); background: var(--as-hover-background-color); }
  button:where(:not(.jsoneditor *)):disabled { opacity: .45; cursor: default; }
  button:where(:not(.jsoneditor *)):focus-visible, input:where(:not(.jsoneditor *)):focus-visible, select:where(:not(.jsoneditor *)):focus-visible { outline: 2px solid var(--as-primary-color); outline-offset: 2px; }
  .sm-icon-button { width: 34px; min-width: 34px; height: 32px; padding: 7px; svg { width: 16px; height: 16px; fill: currentColor; } }
  .sm-close { border: 0; background: transparent; color: var(--as-muted-text-color); }
  .sm-primary { color: white; background: var(--as-primary-color); border-color: var(--as-primary-color); }
  .sm-success { color: white; background: #67c23a; border-color: #67c23a; }
  .sm-primary:hover:not(:disabled) { color: white; background: #79bbff; }
  .sm-success:hover:not(:disabled) { color: white; background: #95d475; border-color: #95d475; }
  .sm-plain-primary { color: var(--as-primary-color); background: var(--as-hover-background-color); border-color: var(--as-primary-soft-border-color); }
  .sm-plain-danger { color: #f56c6c; background: var(--as-danger-soft-background-color); border-color: var(--as-danger-soft-border-color); }
  .sm-plain-danger:hover:not(:disabled) { color: white; background: #f56c6c; border-color: #f56c6c; }
  .sm-plain-muted { color: var(--as-muted-text-color); background: var(--as-muted-background-color); border-color: var(--as-control-border-color); }
  .sm-tabs { display: flex; gap: 26px; margin: 0 24px; border-bottom: 2px solid var(--as-border-color); flex-shrink: 0; }
  .sm-tabs button { position: relative; border: 0; border-radius: 0; height: 44px; padding: 0 4px; background: transparent; font-weight: 500; }
  .sm-tabs button[aria-selected="true"] { color: var(--as-primary-color); &::after { content: ''; position: absolute; height: 2px; bottom: -2px; left: 0; right: 0; background: var(--as-primary-color); } }
  .sm-body { min-height: 0; flex: 1; overflow: auto; padding: 24px; background: var(--as-secondary-background-color); overscroll-behavior: contain; }
  fieldset { margin: 0; padding: 0; border: 0; min-width: 0; }
  input:where(:not([type="file"], .jsoneditor *)), select:where(:not(.jsoneditor *)) { height: 32px; font: inherit; color: var(--as-primary-text-color); background: var(--as-surface-color); border: 1px solid var(--as-control-border-color); border-radius: 4px; padding: 0 11px; min-width: 0; box-shadow: none; }
  input:where(:not([type="file"], .jsoneditor *)) { width: 100%; }
  input::placeholder { color: var(--as-muted-text-color); }
  .sm-category-tabs { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 20px; }
  .sm-category-group { flex: 1; display: flex; flex-wrap: wrap; gap: 0; }
  .sm-category-group button { border-radius: 0; margin-left: -1px; height: 40px; padding: 12px 19px; }
  .sm-category-group button:first-child { margin-left: 0; border-radius: 4px 0 0 4px; }
  .sm-category-group button:last-child { border-radius: 0 4px 4px 0; }
  .sm-category-group button[aria-pressed="true"] { color: white; border-color: var(--as-primary-color); background: var(--as-primary-color); z-index: 1; }
  .sm-add-category { margin-top: 4px; }
  .sm-category-row { display: flex; gap: 20px; align-items: center; padding: 12px 20px; background: var(--as-surface-color); border-bottom: 1px solid var(--as-border-color); }
  .sm-category-row > input { flex: 1; }
  .sm-row-tools { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
  .sm-button-group { display: flex; button { border-radius: 0; } button:first-child { border-radius: 4px 0 0 4px; } button:last-child { margin-left: -1px; border-radius: 0 4px 4px 0; } }
  .sm-url-item { background: var(--as-surface-color); border-bottom: 1px solid var(--as-border-color); }
  .sm-url-item:hover { background: var(--as-secondary-background-color); }
  .sm-url-line { display: flex; align-items: center; gap: 10px; padding: 12px 20px 12px 10px; }
  .sm-name-input { flex: 1; }
  .sm-url-input { flex: 3; }
  .sm-drag { border: 0; background: transparent; color: var(--as-muted-text-color); cursor: grab; touch-action: none; }
  .sm-drag:active { cursor: grabbing; }
  .sm-row-tools select { width: 48px; padding: 0 5px; }
  .sm-is-hidden .sm-name-input, .sm-is-hidden .sm-url-input { color: var(--as-muted-text-color); }
  .sm-add-url { padding: 12px 20px; background: var(--as-surface-color); }
  .sm-help { display: block; color: var(--as-muted-text-color); font-size: 12px; line-height: 1.6; }
  p.sm-help { margin: 14px 0 0; }
  .sm-empty { padding: 35px; text-align: center; color: var(--as-muted-text-color); }
  .sm-icon-editor { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; padding: 0 20px 14px 54px; }
  .sm-icon-editor > label:first-of-type { flex: 1; min-width: 160px; }
  .sm-icon-editor label { font-size: 12px; line-height: 1.8; }
  .sm-icon-editor img { width: 32px; height: 32px; object-fit: contain; }
  .sm-upload input { display: block; max-width: 190px; font-size: 12px; }
  .sm-footer { padding: 14px 24px; background: var(--as-surface-color); box-shadow: 0 -2px 8px var(--as-shadow-color); flex-shrink: 0; }
  .sm-feedback { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 4px 14px; line-height: 1.5; margin-bottom: 10px; min-height: 18px; font-size: 13px; }
  .sm-error { color: #f56c6c; }
  .sm-footer-actions { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 10px; }
  .sm-body-json { display: flex; padding: 16px 24px; fieldset { width: 100%; display: flex; flex-direction: column; min-height: 0; } }
  .sm-editor-actions { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
  .sm-json-editor { flex: 1; width: 100%; min-height: 280px; text-align: left; }
  @media (max-width: 700px) {
    padding: 8px;
    .sm-dialog { height: calc(100dvh - 16px); }
    .sm-header { padding: 12px 16px 6px; }
    .sm-tabs { margin: 0 16px; }
    .sm-body { padding: 14px 12px; }
    .sm-category-group button { height: 34px; padding: 8px 12px; }
    .sm-category-tabs { gap: 8px; margin-bottom: 12px; }
    .sm-category-row { gap: 8px; padding: 12px 10px; }
    .sm-row-tools { gap: 6px; }
    .sm-category-row .sm-row-tools { flex-wrap: wrap; }
    .sm-url-line { display: grid; grid-template-columns: 28px minmax(0, 1fr); gap: 8px; padding: 12px 10px; }
    .sm-drag { grid-row: 1 / 3; width: 28px; min-width: 28px; }
    .sm-name-input, .sm-url-input, .sm-url-line .sm-row-tools { grid-column: 2; }
    .sm-url-line .sm-row-tools { justify-content: flex-end; }
    .sm-icon-editor { padding-left: 46px; }
    .sm-footer { padding: 10px 12px; }
    .sm-footer-actions { gap: 8px; }
    .sm-footer-actions button { padding: 7px 10px; }
    .sm-json-editor { min-height: 220px; }
  }
}

#all-search[data-as-theme="dark"] .sm-overlay {
  .jsoneditor { background: var(--as-surface-color); border-color: var(--as-primary-color); }
  div.jsoneditor-tree, textarea.jsoneditor-text, pre.jsoneditor-preview { background: var(--as-surface-color); color: var(--as-primary-text-color); }
  div.jsoneditor-field, div.jsoneditor-value, div.jsoneditor-readonly, div.jsoneditor td, div.jsoneditor th, pre.jsoneditor-preview { color: var(--as-primary-text-color); }
  div.jsoneditor-value.jsoneditor-string { color: #8fca8f; }
  div.jsoneditor-value.jsoneditor-number { color: #ff8a78; }
  div.jsoneditor-value.jsoneditor-boolean { color: #f5b85c; }
  div.jsoneditor-value.jsoneditor-null { color: #78a9ff; }
  tr.jsoneditor-highlight, tr.jsoneditor-selected { background-color: var(--as-secondary-background-color); }
  .ace-jsoneditor { background-color: var(--as-surface-color); color: var(--as-primary-text-color); }
  .ace-jsoneditor .ace_gutter { background: var(--as-bg-color); color: var(--as-muted-text-color); }
  .ace-jsoneditor .ace_marker-layer .ace_active-line, .ace-jsoneditor .ace_gutter-active-line { background: var(--as-secondary-background-color); }
  .ace-jsoneditor .ace_marker-layer .ace_selection { background: #31547a; }
  .ace-jsoneditor .ace_cursor { color: var(--as-primary-text-color); }
  .ace-jsoneditor .ace_string { color: #8fca8f; }
  .ace-jsoneditor .ace_constant.ace_numeric { color: #ff8a78; }
  .ace-jsoneditor .ace_variable { color: #7dcfff; }
}
</style>
