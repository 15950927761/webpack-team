<template>
    <div class="shopcar-container">
        <!-- 商品列表区域 -->
        <div class="goods-list">
            <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selected(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path" >
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">{{item.sell_price}}￥</span>
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
                            </p>
                        </div>
					</div>
				</div>
			</div>
        </div>

        <!-- 结算区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计(不含运费):</p>
                        <p>已勾选商品<span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span>件，总价<span class="red">{{$store.getters.getGoodsCountAndAmount.amount}}</span>元</p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>

        <p>{{$store.getters.getGoodsSelected}}</p>

    </div>
</template>

<script>
import numbox from '../subcomponents/shopcar_numbox.vue'
export default {
    data(){
        return {
            goodslist: []
        }
    },
    created(){
        this.getGoodsList();
    },
    methods:{
        getGoodsList(){
            //获取store中的所有商品的id，
            var idArr = [];
            this.$store.state.car.forEach(item=>idArr.push(item.id));
            if(idArr.length <=0 ){//如果购物车中没有商品，直接返回，不需要请求数据接口，否则会报错
                return;
            }
            //获取购物车列表
            this.$http.get('api/goods/getshopcarlist/' + idArr.join(',')).then(result=>{
                // console.log(result);
                if(result.body.status === 0){
                    this.goodslist = result.body.message;
                }
            })
        },
        remove(id,index){
            //点击删除，把商品从store中根据传递的id删除，同时，把当前组件中的goodslist中，对应要删除的那个商品
            this.goodslist.splice(index,1);
            this.$store.commit('removeFromCar',id);
        },
        selected(id,val){
            this.$store.commit('updateGoodsSelected',{ id,selected:val })
        }
    },
    components:{
        numbox
    }
}
</script>

<style lang="scss" scoped>
    .shopcar-container{
        background:#eee;
        overflow:hidden;

        .goods-list{
            img{
                width:60px;
                height:60px;
            }
            .info{
                .price{
                    color:#f00;
                }
                p{
                    display:flex;
                    justify-content: space-between;
                }
            }
            .mui-card-content-inner{
                display:flex;
                align-items:center;
                justify-content: space-between;
                h1{
                    font-size:12px;
                    margin-bottom:10px;
                }
            }
        }
        .jiesuan{
            display:flex;
            justify-content: space-between;
            align-items:center;
            .red{
                color:#f00;
                font-weight:bold;
                font-size:16px;
            }
        }
    }
</style>