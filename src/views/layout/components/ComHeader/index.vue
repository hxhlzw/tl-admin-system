<template>
  <div class="-page">
    <div class="meus-icon" @click="store.toggAsideWidth()">
      <el-icon v-if="isMenuStatus"><Fold /></el-icon>
      <el-icon v-else><Expand /></el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMenuStore } from '../../../../stores/menu'
const store = useMenuStore()

const isMenuStatus = computed(() => {
  return store.AsideWidth == '260px' ? false : true
})
</script>

<style lang="scss" scoped>
.meus-icon {
  cursor: pointer;
}
</style>
