<template>
  <div class="from-page">
    <el-form
      ref="ruleFormRef"
      :model="loginForm"
      status-icon
      :rules="phoneCodeFormRules"
      label-width="0"
      class="demo-ruleForm"
    >
      <el-form-item prop="phone">
        <el-input
          size="large"
          v-model="loginForm.phone"
          placeholder="请输入手机号"
          autocomplete="off"
          prefix-icon="UserFilled"
        />
      </el-form-item>
      <el-form-item prop="smscode">
        <div class="login-line">
          <div class="lin">
            <el-input
              size="large"
              v-model="loginForm.smscode"
              placeholder="请输入短信验证码"
              autocomplete="off"
              prefix-icon="Picture"
            />
          </div>
          <div class="code-btn">
            <el-button type="primary" size="large" :disabled="disabled" @click="getSmsCode">{{
              title
            }}</el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item prop="imgcode">
        <div class="login-line">
          <div class="lin flex-item">
            <el-input
              size="large"
              prefix-icon="PictureRounded"
              v-model="loginForm.imgcode"
              placeholder="请输入图片验证码"
            />
          </div>
          <div class="code-btn">
            <img @click="getImgCode" :src="imgCodeSrc" alt="" />
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="loginForm.savePhone">记住用户名</el-checkbox>
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
import { phoneCodeFormRules } from '../rules'
import utils from '@/utils/utils'
const ruleFormRef = ref<FormInstance>()

const loginForm = reactive({
  phone: '',
  smscode: '',
  imgcode: '',
  savePhone: false
})
// 图片验证码
// const imgCodeSrc = ref(new URL('../../../assets/code.png', import.meta.url).href)

// 点击切换图片验证码
// const getImageCode = () => {}

// 提交表单的方法
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      // 1.点击登录按钮，判断是否保存用户名，如果保存用户名，则将用户名和保存的状态存储到本地
      console.log(loginForm.savePhone)
      console.log('submit!')
      savelocalUser()
    } else {
      console.log('error submit!')
    }
  })
}

// 短信验证码
const title = ref('获取验证码')
let timer: number
const currenTime = ref(0)
const disabled = ref(false)
const getSmsCode = () => {
  // 调用以验证码接口

  if (!loginForm.savePhone) {
    utils.showError('请输入手机号')
    return
  }
  disabled.value = true
  clearInterval(timer)
  currenTime.value = 60
  title.value = currenTime.value + '秒后重新获取'
  timer = setInterval(() => {
    currenTime.value--
    title.value = currenTime.value + '秒后重新获取'
    if (currenTime.value <= 0) {
      disabled.value = false
      title.value = '获取验证码'
      clearInterval(timer)
      timer = 0
    }
  }, 1000)
}

// 记住用户功能
const savelocalUser = () => {
  if (loginForm.savePhone) {
    console.log('123')
    // 1.将用户名存到本地
    utils.saveData('phone', loginForm.phone)
    // 2.将保存的状态存到本地
    utils.saveData('savePhone', loginForm.savePhone)
  } else {
    utils.removeData('phone')
    utils.removeData('savePhone')
  }
}
const getLocalUser = () => {
  const savePhone = utils.getData('savePhone')
  if (savePhone) {
    loginForm.phone = utils.getData('phone')
  }
}
onMounted(() => {
  getLocalUser()
})
</script>

<style lang="scss" scoped>
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
