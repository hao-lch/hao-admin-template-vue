<template>
    <div class="container">
        <div class="box">
            <div class="font">404</div>
            <div class="description">页面找不到啦，3秒之后跳转到首页！</div>
            <el-button type="primary" @click="toHome">现在就去</el-button>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const timer = setTimeout(() => {
  toHome()
}, 3000)

const toHome = () => {
  if (route.name === 'error') {
    router.push({
      name: 'home'
    })
  }
  clearTimeout(timer)
}
</script>

<style scoped lang='scss'>
@import '../../style/variables.scss';

.container {
    width: 100%;
    height: 100%;
    background-color: #E5EAF3;
    display: flex;
    justify-content: center;
    align-items: center;

    .box {
        width: 450px;
        height: 300px;
        background-color: #424243;
        box-shadow: 0 0 10px 10px #909399;
        border-radius: 10px;
        opacity: .9;
        transition: all 1s;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-direction: column;

        &:hover {
            box-shadow: 0 10px 10px 15px #909399;
            opacity: .8;
        }

        .font {
            color: #409EFF;
            font-size: xx-large;
            font-weight: 800;
        }

        .description {
            color: #409EFF;
            font-size: x-large;
            font-weight: 500;
        }
    }
}
</style>
