<script setup lang="ts">
import Aside from '../../components/Aside/index.vue'
import Header from '../../components/Header/index.vue'
import Main from '../../components/Main/index.vue'
import { ref, provide } from 'vue'
import throttle from '../../utils/throttle'

// 页面大小变化监听
const pageWidth = ref(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)
const widthChangeFunc = throttle(() => {
  pageWidth.value = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
}, 200)
window.addEventListener('resize', widthChangeFunc as EventListenerOrEventListenerObject)
provide('page-width', pageWidth)
</script>

<template>
    <el-container class="root-container">

        <el-aside class="aside">
            <Aside />
        </el-aside>

        <el-container class="container">
            <el-header class="header">
                <Header />
            </el-header>

            <el-main class="main">
                <Main />
            </el-main>
        </el-container>

    </el-container>
</template>

<style scoped lang="scss">
@import '../../style/variables.scss';

.root-container {
    width: 100%;
    height: 100%;

    .aside {
        background-color: $asideBgColor;
        width: auto;
    }

    .container {

        .header {
            height: $headerHeight;
            background-color: $headerBgColor;
        }

        .main {
            padding: 0;
            overflow: hidden;
        }
    }
}
</style>
