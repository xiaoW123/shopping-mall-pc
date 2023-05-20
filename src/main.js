import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 样式
import 'normalize.css' // 重置样式的库
import '@/assets/style/common.less' // 自己项目的重置样式
// 插件
import ui from './components/Library'

createApp(App).use(store).use(router).use(ui).mount('#app')
