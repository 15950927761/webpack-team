import Vue from 'vue'
//导入vue-router的包
import VueRouter from 'vue-router'
//手动安装vuerouter
Vue.use(VueRouter)

import 'bootstrap/dist/css/bootstrap.css'

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI);

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI);


// // //按需导入我们的Mint-UI组件
// import { Button } from 'mint-ui'
// // //使用Vue.component注册组件
// // Vue.component('mybtn',Button)
// Vue.component(Button.name,Button)

//导入mui
import './lib/mui/css/mui.min.css'

import app from './App.vue'


var vm = new Vue({
    el:'#app',
    render:c=>c(app)
})