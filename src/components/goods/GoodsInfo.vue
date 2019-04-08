<template>
    <div class="goodsinfo-container">
        <!-- 购物车小球 -->
        <transition 
        @before-enter="beforeEnter" 
        @enter="enter" 
        @after-enter="afterEnter">
            <div class="ball" v-show="ballflag" ref="ball"></div>
        </transition>
        <!-- 商品轮播图区域 -->
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
					</div>
				</div>
			</div>

        <!-- 商品购买区域 -->
        <div class="mui-card">
				<div class="mui-card-header">{{goodsinfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <p class="price">
                            市场价：<del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{goodsinfo.sell_price}}</span>
                        </p>
                        <p>购买数量:<numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>
                        <p>
                            <mt-button type="primary" size="small">立即购买</mt-button>
                            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                        </p>
                    </div>
				</div>
			</div>

        <!-- 商品参数区域 -->
        <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号：{{goodsinfo.goods_no}}</p>
                        <p>库存情况：{{goodsinfo.stock_quantity}}</p>
                        <p>上架时间：{{goodsinfo.add_time | dateFormat}}</p>
                    </div>
				</div>
				<div class="mui-card-footer">
                    <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                    <mt-button type="danger" size="large" @click="goComment(id)">商品评论</mt-button>
                </div>
			</div>

    </div>
</template>

<script>
import swiper from '../subcomponents/swiper.vue'
import numbox from '../subcomponents/goodsinfo_numbox.vue'

export default {
    data(){
        return{
            id:this.$route.params.id,
            lunbotu:[],
            goodsinfo:{},
            ballflag:false,
            selectedCount:1
        }
    },
    created(){
        this.getLunbotu();
        this.getGoodsInfo();
        console.log(this);
    },
    methods:{
        getLunbotu(){
            this.$http.get('api/getthumimages/' + this.id).then(result=>{
                if(result.body.status === 0){
                    // console.log(result);
                    result.body.message.forEach(item=>{
                        item.img = item.src;
                    })
                    this.lunbotu = result.body.message;
                }
            })
        },
        getGoodsInfo(){
            this.$http.get('api/goods/getinfo/' + this.id).then(result=>{
                if(result.body.status === 0){
                    this.goodsinfo = result.body.message[0];
                    // console.log(this.goodsinfo);
                }
            })
        },
        goDesc(id){
            this.$router.push({ name:'goodsdesc',params:{ id } })
        },
        goComment(id){
            this.$router.push({ name:'goodscomment',params:{ id } })
        },
        addToShopCar(){
            this.ballflag = !this.ballflag
        },
        beforeEnter(el){
            el.style.transform = "translate(0,0)";
        },
        enter(el,done){
            el.offsetWidth;

            //小球动画优化思路：解决动画不准确，如何获取徽标和小球的位置
            //domObject.getBoundingClientRect();

            // 1.获取小球在页面中的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect();

            // 2.获取徽标在页面中的位置
            const badgePosition = document.getElementById('badge').getBoundingClientRect();

            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;

            el.style.transform = `translate(${xDist}px,${yDist}px)`;
            el.style.transition = "all 1s cubic-bezier(.4,-0.3,1,.68)";
            done();
        },
        afterEnter(el){
            this.ballflag = !this.ballflag;
        },
        getSelectedCount(count){
            this.selectedCount = count;
            // console.log(this.selectedCount);
        }
    },
    components:{
        swiper,
        numbox
    }

}
</script>

<style lang="scss" scoped>
    .goodsinfo-container{
        background:#f1f1f1;
        overflow:hidden;

        .ball{
            width:15px;
            height:15px;
            background:red;
            position:absolute;
            z-index:9999;
            border-radius:50%;
            top:357px;
            left:140px;
        }

        .now_price{
            color:red;
        }

        .mui-card-footer{
            display:block;

            button{
                margin:10px 0;
            }
        }
    }
</style>