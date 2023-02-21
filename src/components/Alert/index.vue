<template>
    <el-alert :title="alertSettings.title" :type="handledType" show-icon class="alert" :closable="false" v-show="isShow" />
</template>

<script lang='ts' setup>
import { computed, ref, reactive } from 'vue'
import emitter from '../../utils/emitter'

const isShow = ref(false)
// let { title, type, time } = defineProps({
//     title: {
//         default: "success",
//         type: String
//     },
//     type: {
//         default: "success",
//         type: String
//     },
//     time: {
//         default: 1000,
//         type: Number
//     }
// })

interface Settings {
    title?: string,
    type?: string,
    time?: number,
}
const alertSettings = reactive({
  title: 'success',
  type: 'success',
  time: 1000
})

const typeArr = ['success', 'error', 'warning', 'info']
const handledType = computed(() => {
  if (typeArr.includes(alertSettings.type)) {
    return alertSettings.type
  } else {
    return 'info'
  }
})

emitter.on('alertShow', (settings?: unknown) => {
  if (settings) {
    if ((settings as Settings).title) alertSettings.title = ((settings as Settings).title) as string
    if ((settings as Settings).type) alertSettings.type = ((settings as Settings).type) as string
    if ((settings as Settings).time) alertSettings.time = ((settings as Settings).time) as number
  }

  isShow.value = true
  setTimeout(() => {
    isShow.value = false
  }, alertSettings.time)
})

</script>

<style scoped lang='scss'>
.alert {
    position: fixed;
    top: 30px;
    left: 50%;
    width: auto;
    height: 30px;
    transform: translateX(-50%);
    white-space: nowrap;
    transition: all .8s;
}

:deep(.el-alert__title) {
    width: 140px;
    display: inline-block;
    text-align: center;
    overflow: hidden;
}
</style>
