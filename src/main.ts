import { createApp } from 'vue'
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'

// 引入全局注册
import { globalRegister } from './global'

// 引入mockjs
import './mock'
// 引入element-plus主题
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)

app.use(createPinia().use(persist))
app.use(router)

app.use(globalRegister)

app.mount('#app')
