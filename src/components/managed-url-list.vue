<template>
  <draggable v-model="rows" handle=".sm-drag" :animation="150" :force-fallback="true" :disabled="disabled" class="sm-url-list">
    <div v-for="(item, index) in rows" :key="keyFor(item)" class="sm-url-item" :class="{ 'sm-is-hidden': !item.data.visible }">
      <div class="sm-url-line">
        <button type="button" class="sm-icon-button sm-drag" aria-label="拖动排序" title="拖动排序，也可使用上下方向键" @keydown.up.prevent="move(index, -1)" @keydown.down.prevent="move(index, 1)"><DCaret/></button>
        <input v-model="item.nameZh" class="sm-name-input" aria-label="网址名称" placeholder="网址名称">
        <input v-model="item.url" class="sm-url-input" aria-label="搜索网址" placeholder="https://example.com/search?q=%s" spellcheck="false">
        <div class="sm-row-tools">
          <button type="button" class="sm-icon-button" :aria-expanded="iconItem === item" aria-label="编辑图标" title="编辑图标" @click="iconItem = iconItem === item ? null : item"><Picture/></button>
          <select v-if="personalCategories.length" aria-label="添加到常用分类" title="复制到常用分类" :value="''" @change="copyTo(item, $event)">
            <option value="" disabled>＋</option>
            <option v-for="category in personalCategories" :key="category.name" :value="category.name">{{ category.nameZh }}</option>
          </select>
          <button type="button" class="sm-icon-button" :class="item.data.visible ? 'sm-plain-primary' : 'sm-plain-muted'" :aria-pressed="item.data.visible" aria-label="显示网址" :title="item.data.visible ? '隐藏网址' : '显示网址'" @click="item.data.visible = !item.data.visible"><View v-if="item.data.visible"/><Hide v-else/></button>
          <button type="button" class="sm-icon-button sm-plain-danger" aria-label="删除网址" title="删除网址" @click="remove(index)"><Delete/></button>
        </div>
      </div>
      <div v-if="iconItem === item" class="sm-icon-editor">
        <img v-if="item.icon" :src="item.icon" alt="图标预览">
        <label>图标地址<input v-model="item.icon" aria-label="图标地址" placeholder="图片链接或 data:image；留空自动获取"></label>
        <label class="sm-upload">上传图片<input type="file" accept="image/*" @change="uploadIcon(item, $event)"></label>
        <button type="button" @click="item.icon = ''">清除图标</button>
      </div>
    </div>
  </draggable>
  <div class="sm-add-url"><button type="button" :disabled="disabled" @click="add">添加网址</button></div>
</template>

<script setup>
/* global defineProps, defineEmits */
import { computed, ref } from 'vue'
import { VueDraggableNext as draggable } from 'vue-draggable-next'
import { DCaret, View, Hide, Delete, Picture } from '@element-plus/icons-vue'
import { cloneData } from '../util/site-data.mjs'

const props = defineProps({
  modelValue: { type: Array, required: true },
  personalCategories: { type: Array, default: () => [] },
  disabled: Boolean
})
const emit = defineEmits(['update:modelValue', 'copy', 'error'])
const rows = computed({ get: () => props.modelValue, set: value => emit('update:modelValue', value) })
const iconItem = ref(null)
const keys = new WeakMap()
let nextKey = 0
function keyFor (item) {
  if (!keys.has(item)) keys.set(item, ++nextKey)
  return keys.get(item)
}
function add () {
  rows.value = [...rows.value, { nameZh: '新网址', url: 'https://www.baidu.com/s?wd=%s&ie=utf-8', data: { visible: true } }]
}
function remove (index) {
  if (window.confirm(`删除网址“${rows.value[index].nameZh}”？保存后生效。`)) rows.value = rows.value.filter((_, i) => i !== index)
}
function move (index, offset) {
  const target = index + offset
  if (target < 0 || target >= rows.value.length) return
  const next = [...rows.value]
  next.splice(target, 0, next.splice(index, 1)[0])
  rows.value = next
}
function copyTo (item, event) {
  emit('copy', { item: cloneData(item), name: event.target.value })
  event.target.value = ''
}
async function uploadIcon (item, event) {
  const file = event.target.files[0]
  if (!file) return
  try {
    if (!file.type.startsWith('image/')) throw Error('请选择图片文件')
    item.icon = await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = () => reject(Error('图片读取失败'))
      reader.readAsDataURL(file)
    })
  } catch (err) { emit('error', err) }
  event.target.value = ''
}
</script>
