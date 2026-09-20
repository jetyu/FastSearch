<template>
  <a
    v-if="!isMobile"
    class="as-title"
    href="https://github.com/jetyu/FastSearch"
    target="_blank"
    aria-label="Fast Search"
    title="Fast Search"
    :class="`as-title-${mode}`"
  >
    <img class="as-title-icon" :src="iconUrl" alt="" aria-hidden="true" />
  </a>
</template>

<script>
import { isMobile } from '../util/index'
import iconUrl from '../assets/fast-search-32.png?inline'

export default {
  name: 'logo',
  props: {
    mode: {
      type: String,
      default: 'horizontal',
      validator: (val) => ['horizontal', 'vertical'].indexOf(val) > -1
    }
  },
  setup() {
    return {
      isMobile: isMobile(),
      iconUrl
    }
  }
}
</script>

<style lang="scss">
@import '../assets/common';

@media screen and (max-width: 750px) {
  .as-title-horizontal {
    display: none;
  }
}

.as-title-horizontal {
  width: 32px;
  min-width: 32px;
  height: $height;
  margin: 0 4px;
}

.as-title-vertical {
  width: 100%;
  padding: 8px 0;
}

.as-title {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none !important;
  box-sizing: border-box;
}

.as-title-icon {
  display: block;
  width: 22px;
  height: 22px;
  border-radius: 5px;
  cursor: pointer;
}

.as-title-vertical .as-title-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
}
</style>
