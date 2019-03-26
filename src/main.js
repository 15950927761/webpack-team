import Vue from 'vue'
//导入vue-router的包
import VueRouter from 'vue-router'
//手动安装vuerouter
Vue.use(VueRouter)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

import app from './App.vue'


var vm = new Vue({
    el:'#app',
    render:c=>c(app)
})