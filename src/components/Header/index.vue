<template>
  <div class="header-container">
    <div class="aside-controller" @click="changeCollapse">
      <Menu class="icon" />
    </div>

    <el-breadcrumb separator="/" class="bread-crumb" v-if="route.meta && route.meta.title && isBreadcrumbShow">
      <el-breadcrumb-item v-for="matchItem in route.matched" :key="matchItem.path" class="bread-crumb-item"
        @click="toPage(matchItem)">
        {{ matchItem.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="fill-space"></div>

    <el-dropdown v-show="isUserInfoShow">
      <div class="user-info">
        <el-avatar shape="square" class="avatar" :src="userInfo.avatarSrc" />
        <span class="user-name">{{ userInfo.userName }}</span>
        <el-icon>
          <arrow-down />
        </el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="toUserInfo">Individual Center</el-dropdown-item>
          <el-dropdown-item divided @click="Logout">Log out</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang='ts' setup>
import { ref, reactive, inject, watch, Ref } from 'vue'
import { Menu, ArrowDown } from '@element-plus/icons-vue'
import emitter from '../../utils/emitter'
import { useRouter, useRoute, RouteRecordRaw } from 'vue-router'
import useStore from '../../store/user'

const router = useRouter()
const route = useRoute()
const userStore = useStore()

const changeCollapse = () => {
  emitter.emit('changeCollapse')
}

const toPage = (matchItem: RouteRecordRaw) => {
  if (matchItem.components) {
    router.push({
      name: matchItem.name
    })
  }
}

// 头像的图片地址
const userInfo = reactive({
  avatarSrc: 'img/avatarDefault.png',
  userName: 'username'
})

const toUserInfo = () => {
  router.push({
    name: 'userInfo'
  })
}

const Logout = async () => {
  const isLogout = await userStore.logout()

  if (isLogout) {
    router.replace({
      name: 'login'
    })

    emitter.emit('alertShow', {
      title: 'Logout successful'
    })
  } else {
    emitter.emit('alertShow', {
      title: 'Logout error',
      type: 'error'
    })
  }
}

// 动态展示面包屑和userInfo
const isBreadcrumbShow = ref(true)
const isUserInfoShow = ref(true)
const pageWidth = inject('page-width') as Ref<number>
watch(pageWidth, () => {
  isBreadcrumbShow.value = !(pageWidth.value < 1000)
  isUserInfoShow.value = !(pageWidth.value < 500)
}, { immediate: true })
</script>

<style scoped lang='scss'>
@import '../../style/variables.scss';

.header-container {
  display: flex;
  align-items: center;
  height: 100%;

  .aside-controller {
    display: flex;
    width: $asideControllerLength * 1.4;
    height: $asideControllerLength * 1.4;
    justify-content: center;
    align-items: center;
    border-radius: 10%;
    transition: all .8s;
    cursor: pointer;

    &:hover {
      background-color: $asideBgColor;
    }

    .icon {
      color: $asideControllerIconColor;
      width: $asideControllerLength;
      height: $asideControllerLength;
    }
  }

  .bread-crumb {
    margin-left: 20px;

    .bread-crumb-item :deep(.el-breadcrumb__inner) {
      color: $fontColor;
      cursor: pointer;
      transition: all .4s;

      &:hover {
        color: $fontActiveColor;
      }
    }

  }

  .fill-space {
    flex: 1;
  }

  .user-info {
    width: $avatarLength * 5;
    height: $avatarLength * 1.2;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 5px;
    transition: all .8s;
    cursor: pointer;

    &:hover {
      background-color: $asideBgColor;
    }

    .avatar {
      width: $avatarLength;
      height: $avatarLength;
    }

    .user-name {
      display: inline-block;
      width: $avatarLength * 3;
      height: $avatarLength;
      overflow: hidden;

      text-align: center;
      line-height: $avatarLength;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: $fontColor;
      font-size: 16px;
      font-weight: 200;
    }
  }
}
</style>
