import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import insts from '@/plugins'
//UnoCSS 配置
import 'uno.css'
// 引入全局样式
import '@/styles/index.scss'
import 'virtual:svg-icons-register'

createApp(App).use(insts).mount('#app')
