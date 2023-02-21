<template>
    <template v-for="route in filteredRoutes" :key="route.path">
        <el-sub-menu v-if="route.children" :index="route.path" :disabled="route.meta.disable" :popper-offset="2">
            <template #title>
                <el-icon>
                    <component :is="route.meta.icon"></component>
                </el-icon>
                <span>{{ route.meta.title }}</span>
            </template>

            <AsideItem :routes="route.children" />
        </el-sub-menu>

        <el-menu-item v-else :index="route.path" :disabled="route.meta.disable" @click="toPage(route)">
            <el-icon>
                <component :is="route.meta.icon"></component>
            </el-icon>
            <span>{{ route.meta.title }}</span>
        </el-menu-item>
    </template>

</template>

<script lang='ts' setup>
import AsideItem from './index.vue'
import { computed } from 'vue'
import { useRouter, RouteRecordRaw } from 'vue-router'

const router = useRouter()
const { routes } = defineProps({
  routes: Object
})

// 过滤掉没有route.meta和route.meta.title的路由，因为如果没有说明这个路由不是aside中需要展示的，如404页面
const filteredRoutes = computed(() => {
  return routes!.filter((route: RouteRecordRaw) => {
    return route.meta?.title
  })
})

const toPage = (route: RouteRecordRaw) => {
  router.push({
    name: route.name
  })
}
</script>

<style scoped lang='scss'>

</style>
