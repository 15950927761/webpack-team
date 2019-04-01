import Vue from 'vue'

//导入MUI样式
import './lib/mui/css/mui.min.css'

//按需导入Mint-UI中的组件
import { Header } from 'mint-ui'
Vue.component(Header.name,Header)
//导入app组件
import app from './App.vue'

var vm = new Vue({
    el:'#app',
    render: c => c(app)
})