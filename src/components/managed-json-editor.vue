<template><div ref="container" class="sm-json-editor" aria-label="网址 JSON 编辑器"></div></template>

<script setup>
/* global defineProps, defineEmits */
import { onMounted, onUnmounted, ref, watch } from 'vue'
import JSONEditor from 'jsoneditor'
import editorStyles from 'jsoneditor/dist/jsoneditor.css?raw'
import editorIcons from 'jsoneditor/dist/img/jsoneditor-icons.svg?raw'
import { normalizeSites } from '../util/site-data.mjs'

const props = defineProps({ modelValue: { type: String, required: true } })
const emit = defineEmits(['update:modelValue', 'error'])
const container = ref(null)
let instance
let setting = false
onMounted(() => {
  // Keep the editor's icon sprite inside the userscript instead of requesting it
  // from whichever website hosts the dialog.
  if (!document.getElementById('fast-search-jsoneditor-style')) {
    const style = document.createElement('style')
    style.id = 'fast-search-jsoneditor-style'
    style.textContent = editorStyles.replaceAll('./img/jsoneditor-icons.svg', `data:image/svg+xml,${encodeURIComponent(editorIcons)}`)
    document.head.append(style)
  }
  instance = new JSONEditor(container.value, {
    mode: 'code', modes: ['code', 'tree', 'preview'], language: 'zh-CN',
    onChange () {
      if (!setting) emit('update:modelValue', instance.getText())
    },
    onValidate (value) {
      try { normalizeSites(value); return [] } catch (err) { return [{ path: [], message: err.message }] }
    },
    onError: err => emit('error', err)
  })
  instance.setText(props.modelValue)
})
watch(() => props.modelValue, value => {
  if (!instance || instance.getText() === value) return
  setting = true
  try { instance.setText(value) } catch (err) { emit('error', err) } finally { setting = false }
})
onUnmounted(() => { instance?.destroy() })
</script>
