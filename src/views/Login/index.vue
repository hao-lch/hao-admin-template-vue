<template>
  <div class="login-container">
    <el-form ref="ruleFormRef" label-position="right" label-width="100px" class="login-form" status-icon :rules="rules"
      :model="userInfo">
      <h3>请输入用户名和密码：</h3>
      <el-form-item label="UserName" class="form-item" prop="username">
        <el-input type="text" v-model.trim="userInfo.username" />
      </el-form-item>
      <el-form-item label="Password" class="form-item" prop="password">
        <el-input show-password type="password" v-model="userInfo.password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button :loading="false" type="primary" class="form-item-button"
          @click="submitForm(ruleFormRef)">提交</el-button>
        <el-button class="form-item-button" @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { validateUsername, validatePassword } from '../../utils/validate'
import emitter from '../../utils/emitter'
import useUser from '../../store/user'
import { useRouter } from 'vue-router'

const user = useUser()
const ruleFormRef = ref<FormInstance>()

const router = useRouter()

const userInfo = reactive({
  username: 'admin',
  password: '111'
})

const rules = reactive({
  password: [{ validator: validatePassword, trigger: 'blur' }],
  username: [{ validator: validateUsername, trigger: 'blur' }]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const isLogined = await user.login(userInfo)

      if (isLogined) {
        router.replace({
          name: 'pages'
        })
        emitter.emit('alertShow', {
          title: 'login successful',
          type: 'success'
        })
      } else {
        emitter.emit('alertShow', {
          title: 'password error',
          type: 'error'
        })
      }
    } else {
      emitter.emit('alertShow', {
        title: 'validate failed',
        type: 'error'
      })
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>

<style scoped lang='scss'>
@import '../../style/variables.scss';

.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 600px;
  min-height: 600px;

  background: linear-gradient(to bottom right, rgb(114, 135, 254), rgb(130, 88, 186));

  .login-form {
    width: 500px;
    height: 200px;
    border: 1px solid #4e4b4b;
    border-radius: 5%;
    box-shadow: 2px 2px #4e4b4b;
    transition: all .5s;
    padding: 15px;

    &:hover {
      box-shadow: 5px 5px #4e4b4b;

      h3,
      .form-item :deep(.el-form-item__label) {
        color: $fontColor;
      }
    }

    h3 {
      transition: all .5s;
      color: #303030;
    }

    .form-item :deep(.el-form-item__label) {
      transition: all .5s;
      color: #303030;
      font-weight: 700;
    }

    .form-item-button {
      width: 48%;
    }
  }
}
</style>
