import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useMenuStore = defineStore('menu', () => {
  const AsideWidth = ref('260px')
  const toggAsideWidth = () => {
    AsideWidth.value = AsideWidth.value === '260px' ? '60px' : '260px'
  }

  return { AsideWidth, toggAsideWidth }
})
