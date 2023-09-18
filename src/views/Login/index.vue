<template>
  <div class="login-page">
    <div class="login-panel">
      <div class="login-logo">
        <img src="../../assets/logo.svg" alt="" />
      </div>
      <div class="login-split-line"></div>
      <div class="logion-form-panel">
        <div class="tabs">
          <div
            class="tabs-item"
            :class="{ active: Tabindex === index }"
            v-for="(item, index) in tabList"
            :key="index"
            @click="changeTab(index)"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="tabs-content">
          <component :is="tabList[Tabindex].componentName"></component>
        </div>
      </div>
    </div>
    <div class="login-footer">版权所有: 通用管理系统</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { ComponentMap } from './types/login-type'

import AccountForm from './components/AccountForm.vue'
import PhoneCodeForm from './components/PhoneCodeForm.vue'
import QcodeForm from './components/QcodeForm.vue'

const bgColor = 'linear-gradient(0deg, #2196f3, #00bcd4, #00bcd4, #03a9f4)'
const loginPanelWidth = '800px'
const loginPanelHeight = '400px'

const tabList = ref<ComponentMap[]>([
  { name: '免密登录', componentName: PhoneCodeForm },
  { name: '账号登录', componentName: AccountForm },
  { name: '扫码登录', componentName: QcodeForm }
])

const Tabindex = ref(0)
const changeTab = (index: number) => {
  Tabindex.value = index
}
</script>

<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: v-bind(bgColor);

  .login-panel {
    width: v-bind(loginPanelWidth);
    height: v-bind(loginPanelHeight);
    background-color: #fff;
    border-radius: 3px;
    display: flex;
    margin: 0 auto;
    margin-top: calc((100vh - v-bind(loginPanelHeight)) / 2);

    .login-logo {
      width: 40%;
      text-align: center;

      img {
        width: 60%;
        margin-top: calc((v-bind(loginPanelHeight) - 166px) / 2);
      }
    }

    .login-split-line {
      width: 1px;
      margin: 0 20px;
      background-color: #f8f8f8;
      height: v-bind(loginPanelHeight);
    }

    .logion-form-panel {
      flex: 1;

      .tabs {
        display: flex;
        height: 45px;
        line-height: 45px;
        text-align: center;
        margin-top: 30px;

        .tabs-item {
          flex: 1;
          cursor: pointer;

          // 滑过字体变红
          .active,
          &:hover {
            color: red;
          }
        }
      }
    }
  }

  .login-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    color: #ffff;
    width: 100%;
    height: 60px;
    font-size: 15px;
    text-align: center;
  }
}

.active {
  color: red;
}
</style>
