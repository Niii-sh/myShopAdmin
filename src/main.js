import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

//global css
import './assets/styles/index.scss';
import  axios from "axios";
import request from "@/utils/request";

//引入全局字体
import '@/assets/styles/font.css'

Vue.config.productionTip = false
//vue实例原型绑定 axios 则全局可以直接使用 无需再分别绑定
Vue.prototype.$request = request  //显示绑定
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
