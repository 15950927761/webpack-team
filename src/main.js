import Vue from 'vue'

//导入路由的包
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)
var car = JSON.parse(localStorage.getItem('car') || '[]')
var store = new Vuex.Store({
   state:{//this.$store.state
      car: car //购物车中商品的数据，用一个数组存储起来，在car数组中存储一些商品的对象，可以暂时将商品对象
      //设计成这个样子{id:商品Id,conut:商品数量 ,price:商品价格,selected:false}
   },
   mutations:{//this.$store.commit('方法名','按需传递唯一的参数')
      addToCar(state,goodsinfo){
         var flag = false;
         state.car.some(item=>{
            if(item.id == goodsinfo.id){
               item.count += parseInt(goodsinfo.count);
               flag = true;
               return true;
            }
         })
         if(!flag){
            state.car.push(goodsinfo);
         }

         //当更新car之后，需要存储到localStorage中去
         localStorage.setItem('car',JSON.stringify(state.car))
      },
      updateGoodsInfo(state,goodsinfo){
         state.car.some(item=>{
            if(item.id == goodsinfo.id){
               item.count = parseInt(goodsinfo.count);
               return true;
            }
         })
         localStorage.setItem('car',JSON.stringify(state.car));
      },
      removeFromCar(state,id){
         state.car.some((item,i)=>{
            if(item.id == id){
               state.car.splice(i,1);
               return true;
            }
         })
         localStorage.setItem('car',JSON.stringify(state.car));
      },
      updateGoodsSelected(state,info){
         state.car.some(item=>{
            if(item.id == info.id){
               item.selected = info.selected
            }
         })
         localStorage.setItem('car',JSON.stringify(state.car))
      }
   },
   getters:{//this.$store.getters
      getAllCount(state){
         var c = 0;
         state.car.forEach(item=>{
            c += item.count
         })
         return c;
      },
      getGoodsCount(state){
         var o = {}
         state.car.forEach(item=>{
            o[item.id] = item.count
         })
         return o;
      },
      getGoodsSelected(state){
         var o = {}
         state.car.forEach(item=>{
            o[item.id] = item.selected
         })
         return o;
      },
      getGoodsCountAndAmount(state){
         var o = {
            count: 0,
            amount: 0
         }
         state.car.forEach(item=>{
            if(item.selected){
               o.count += item.count
               o.amount += item.price * item.count
            }
         })
         return o
      }
   }
})


//导入moment时间插件
import moment from 'moment'

//定义全局过滤器
Vue.filter('dateFormat',function(dataStr,pattern ="YYYY-MM-DD HH:mm:ss"){
   return moment(dataStr).format(pattern);
})

//导入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = 'http://www.liulongbin.top:3005'
Vue.http.options.emulateJSON = true


//导入MUI样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//按需导入Mint-UI中的组件
// import { Header,Swipe,SwipeItem,Button,Lazyload } from 'mint-ui'
// Vue.component(Header.name,Header)
// Vue.component(Swipe.name,Swipe)
// Vue.component(SwipeItem.name,SwipeItem)
// Vue.component(Button.name,Button)
// Vue.use(Lazyload)

import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

//安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)



//导入路由模块
import router from './router.js'

//导入app组件
import app from './App.vue'

var vm = new Vue({
    el:'#app',
    render: c => c(app),
    router,
    store
})