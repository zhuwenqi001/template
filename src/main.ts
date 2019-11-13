import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'

import './permission' // permission control

import '@/styles/index.scss' // 自定义样式

import Global from './config/global' // 全局变量
Object.defineProperty(Vue.prototype, 'GLOBAL', { value: Global })

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
