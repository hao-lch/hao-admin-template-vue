<template>
    <div class="aside-container" :style="{ width: isCollapse ? '62px' : '220px' }">

        <div @click="toHome" v-if="settings.showLogo">
            <SvgIcon :name="svgProps.name" :color="svgProps.color" />
        </div>

        <el-scrollbar class="scrollbar">
            <el-menu active-text-color="#E6A23C" background-color="#424243" text-color="#E5EAF3" :collapse="isCollapse"
                class="menu">

                <AsideItem :routes="PageRoutes" />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script lang='ts' setup>
import AsideItem from './AsideItem/index.vue'
import { ref, reactive, watch, inject, Ref } from 'vue'
import emitter from '../../utils/emitter'
import PageRoutes from '../../router/pagesRoutes'
import { useRouter } from 'vue-router'
import settings from '../../settings'

const router = useRouter()

const isCollapse = ref(false)
const svgProps = reactive({
  name: 'lang',
  color: '#E6A23C'
})
emitter.on('changeCollapse', () => {
  isCollapse.value = !isCollapse.value
  // 折叠或者展开边栏，logo也进行相应的变化
  svgProps.name = !isCollapse.value ? 'lang' : 'short'
  svgProps.color = !isCollapse.value ? '#E6A23C' : '#409EFF'
})

const toHome = () => {
  router.push({
    name: 'home'
  })
}

const pageWidth = inject('page-width') as Ref<number>
watch(pageWidth, () => {
  if (!isCollapse.value) {
    // 如果是打开状态才会检测窗口大小
    if (pageWidth.value < 1000) {
      emitter.emit('changeCollapse')
    }
  }
}, { immediate: true })
</script>

<style scoped lang='scss'>
@import '../../style/variables.scss';

.aside-container {
    transition: all 0.8s ease;
    height: 100%;
    width: auto;
    display: flex;
    flex-direction: column;

    .icon-lang,
    .icon-short {
        width: 100%;
        background-color: $logoBgColor;
        height: $logoHeight;
    }

    .scrollbar {
        .menu {
            height: 100%;
            border: 0px;
        }
    }
}
</style>
