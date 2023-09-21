<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="store.AsideWidth">
        <!-- 菜单组件 -->
        <ComAside />
      </el-aside>
      <el-container>
        <el-header>
          <!-- 头部组件 -->
          <ComHeader />
        </el-header>
        <el-main>
          12213
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import ComAside from './components/ComAside/index.vue'
import ComHeader from './components/ComHeader/index.vue'
import { ref } from 'vue'
import { useMenuStore } from '@/stores/menu'
const store = useMenuStore()
</script>

<style lang="scss" scoped>
.common-layout {
  height: 100vh;
  background-color: #f0f1f4;
  .el-aside {
    height: 100vh;
    background-color: green;
  }
  .el-header {
    background-color: #fefcfe;
    display: flex;
    align-items: center;
  }
}
</style>
