<template>
  <div class="from-page">
    <el-form
      ref="ruleFormRef"
      :model="accountForm"
      status-icon
      :rules="accountFormRules"
      label-width="0"
      class="demo-ruleForm"
    >
      <el-form-item prop="username">
        <el-input
          size="large"
          v-model="accountForm.username"
          placeholder="请输入用户名"
          autocomplete="off"
          prefix-icon="UserFilled"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          size="large"
          v-model="accountForm.password"
          placeholder="请输入密码"
          autocomplete="off"
          prefix-icon="Picture"
        />
      </el-form-item>
      <el-form-item prop="imgcode">
        <div class="login-line">
          <div class="lin flex-item">
            <el-input
              size="large"
              prefix-icon="PictureRounded"
              v-model="accountForm.imgcode"
              placeholder="请输入图片验证码"
            />
          </div>
          <div class="code-btn">
            <img @click="getImgCode" :src="imgCodeSrc" alt="" />
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="accountForm.saveUserName">记住用户名</el-checkbox>
        <el-checkbox v-model="accountForm.saveUserPass">记住密码</el-checkbox>
        <router-link to="/ResetPwd" class="a">忘记密码?</router-link>
      </el-form-item>
      <el-form-item>
        <el-button size="large" round class="but" color="#e93525" @click="submitForm(ruleFormRef)"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useGetImgCode } from '../composable'
const { imgCodeSrc, getImgCode } = useGetImgCode()
import { reactive, ref, onMounted } from 'vue'
import type { FormInstance } from 'element-plus'
import { accountFormRules } from '../rules'
import utils from '@/utils/utils'
import { accountLogin } from '@/api/user'
import { useUserStore } from '@/stores/user'
import router from '../../../router/index'
const store = useUserStore()
const ruleFormRef = ref<FormInstance>()

const accountForm = reactive({
  username: '',
  password: '',
  imgcode: '',
  saveUserName: false,
  saveUserPass: false
})

// 图片验证码
// const imgCodeSrc = ref(new URL('../../../assets/code.png', import.meta.url).href)

// 点击切换图片验证码
// const getImageCode = () => {}

// 提交表单的方法
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (!valid) {
      for (const key in fields) {
        utils.showError(fields[key][0].message!)
      }
      return
    }
    // 1.点击登录按钮，判断是否保存用户名，如果保存用户名，则将用户名和保存的状态存储到本地
    useSaveL()
    console.log('error submit!')

    // 2.调用登录接口
    const res = await accountLogin({
      username: accountForm.username,
      password: accountForm.password,
      imgcode: accountForm.imgcode
    })
    if (res.code === 888) {
      // 存储到pinia
      store.setToken(res.token!)
      store.setUser(res.data!)

      // 跳转到主页
      router.push('/')
    } else {
      console.log(res.message)
    }
  })
}

const useSaveL = () => {
  if (accountForm.saveUserName) {
    utils.saveData('username', accountForm.username)
    utils.saveData('saveUserName', accountForm.saveUserName)
  } else {
    utils.removeData('username')
    utils.removeData('saveUserName')
  }

  if (accountForm.saveUserPass) {
    utils.saveData('password', accountForm.password)
    utils.saveData('saveUserPass', accountForm.saveUserPass)
  } else {
    utils.removeData('password')
    utils.removeData('saveUserPass')
  }
}
const getLocalUser = () => {
  const saveUserName = utils.getData('saveUserName')
  const saveUserPass = utils.getData('saveUserPass')

  if (saveUserName) {
    accountForm.username = utils.getData('username')
  }
  if (saveUserPass) {
    accountForm.password = utils.getData('password')
  }
}
onMounted(() => {
  getLocalUser()
})
</script>

<style lang="scss" scoped>
.a {
  margin-left: 40px;
}
.but {
  width: 100%;
}
.from-page {
  margin-right: 40px;
  margin-left: 40px;
  margin-top: 10px;
}
.login-line {
  display: flex;
  width: 100%;
  .code-btn {
    width: 100px;
    margin-left: 10px;

    :deep(.el-button),
    :deep(img) {
      width: 100px;
    }

    &:deep(.el-button) {
      font-size: 12px;
    }

    img {
      height: 40px;
      cursor: pointer;
    }
  }
}
.lin {
  flex: 1;
}
.login-btn {
  width: 100%;
}
</style>
