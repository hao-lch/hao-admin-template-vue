<template>
  <svg :class="svgClass" aria-hidden="true" :style="{color: color}">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script lang="ts">
export default {
  name: 'SvgIcon'
}
</script>
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#fff'
  }
})
const iconName = computed(() => `#icon-${props.name}`)
const svgClass = computed(() => {
  if (props.name) {
    return `svg-icon icon-${props.name}`
  } else {
    return 'svg-icon'
  }
})
</script>

<style scoped>
.svg-icon {
  width: 2em;
  height: 2em;
  overflow: hidden;
  fill: currentColor !important;
}
</style>
