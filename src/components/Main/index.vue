<template>
    <el-scrollbar class="scroll-bar">
        <div class="main-container">
            <router-view v-if="routeShouldShow"/>
        </div>
    </el-scrollbar>
</template>

<script lang='ts' setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const routeShouldShow = computed(() => {
  if (route.meta && route.meta.hidden) return false

  return true
})

</script>

<style scoped lang='scss'>
.scroll-bar {
    padding: 12px;
    background-color: #E5EAF3;

    .main-container {
        width: 100%;
        height: 900px;
        background-color: #fff;
        border-radius: 10px;
    }
}
</style>
