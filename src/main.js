import Vue from 'vue'

//导入路由的包
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//导入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)

//导入MUI样式
import './lib/mui/css/mui.min.css'

import './lib/mui/css/icons-extra.css'

//按需导入Mint-UI中的组件
import { Header,Swipe,SwipeItem } from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Swipe.name,Swipe)
Vue.component(SwipeItem.name,SwipeItem)


//导入路由模块
import router from './router.js'

//导入app组件
import app from './App.vue'

var vm = new Vue({
    el:'#app',
    render: c => c(app),
    router
})