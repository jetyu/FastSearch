<template>
  <a
    v-if="!isMobile"
    class="as-title"
    href="https://github.com/jetyu/all-search_plus"
    target="_blank"
    :class="`as-title-${mode}`">
    <p class="as-title-inner">
      All Search Plus
    </p>
  </a>
</template>

<script>
import { isMobile } from '../util/index'

export default {
  name: 'logo',
  props: {
    mode: {
      type: String,
      default: 'horizontal',
      validator: val => ['horizontal', 'vertical'].indexOf(val) > -1
    }
  },
  setup () {
    return {
      isMobile: isMobile()
    }
  }
}
</script>

<style lang="scss">
@import "../assets/common";

@media screen and (max-width: 750px) {
  .as-title-horizontal {
    display: none;
  }
}

.as-title-horizontal {
  min-width: 90px;
  margin: 0 10px;
  white-space: nowrap;
}

.as-title-vertical {
  width: 100%;

  .as-title-inner {
    height: auto;
    line-height: 1.4;
    padding: 6px 0;
  }
}

.as-title {
  text-decoration: none !important;
  padding: 0;
  margin: 0;
  color: var(--as-primary-color);
}

.as-title-inner {
  padding: 0;
  font-size: 17px;
  height: $height;
  line-height: $height;
  font-weight: 600;
  color: var(--as-primary-color);
  margin: 0 auto;
  text-align: center;
  cursor: pointer;
}
</style>
