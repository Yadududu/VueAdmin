import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
Vue.use(Element)

import axios from "./axios";
// import axios from 'axios'
Vue.prototype.$axios = axios 

import global from './globalFun'

require("./mock.js") //引入mock数据，关闭则注释该行

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')