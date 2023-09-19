<template>
  <div class="code-page">
    <div class="code-box">
      <img :class="{ 'end-img': endTime <= 0 }" :src="qcodeSrc" alt="" />
      <div class="end-box" v-if="endTime <= 0" @click="loadQcode">
        当前二维码已失效,点击重新加载
      </div>
    </div>
    <div class="tip-info">使用微信或移动端扫码登录</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
const qcodeSrc = ref('')
const endTime = ref(0)
let timer: number
// 加载二维码
const loadQcode = () => {
  qcodeSrc.value = new URL('../../../assets/qcode.png', import.meta.url).href

  endTime.value = 5
  timer = setInterval(() => {
    endTime.value--

    // 每隔一秒,检测用户是否扫码

    if (endTime.value <= 0) {
      timer && clearInterval(timer)
      timer = 0
    }
  }, 1000)
}
loadQcode()

onUnmounted(() => {
  timer && clearInterval(timer)
})
</script>

<style lang="scss" scoped>
.code-page {
  .code-box {
    position: relative;
    width: 55%;
    height: 55%;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .end-box {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: #00000055;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      color: red;
      cursor: pointer;
    }
    .end-img {
      filter: brightness(10%);
    }
  }
  .tip-info {
    line-height: 50px;
    font-size: 14px;
    text-align: center;
    color: var(--el-text-color-placeholder);
  }
}
</style>
