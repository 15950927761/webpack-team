<template>
    <div class="goods-list">

        <!-- 第一种跳转方式 -->
        <!-- <router-link class="goods-item" v-for="item in goodslist" :key="item.id" tag="div" :to="'/home/goodsinfo/' + item.id">
            <img :src="item.img_url">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <div class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </div>
                <div class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </div>
            </div>
        </router-link> -->

        <!-- 第二种跳转方式 -->
        <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <div class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </div>
                <div class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </div>
            </div>
        </div>

        <mt-button type="danger" size="large" @click="getMore">加载更多>></mt-button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            pageindex:1,
            goodslist:[]
        }
    },
    created(){
        this.getGoodsList();
    },
    methods:{
        getGoodsList(){
            this.$http.get('api/getgoods?pageindex=' + this.pageindex).then(result=>{
                if(result.body.status==0){
                    // this.goodslist = result.body.message
                    // console.log(this.goodslist)
                   this.goodslist = this.goodslist.concat(result.body.message);
                }
            })
        },
        getMore(){
            this.pageindex++;
            this.getGoodsList();
        },
        goDetail(id){
            //使用 js形式进行路由导航
            // console.log(this);
            //一定要区分this.$route和this.$router这两个对象
            //其中，this.$route是路由参数对象，所有路由中的参数，params,query都属于它
            //this.$router是一个路由导航对象，用它可以方便的使用js代码，实现路由的前进，后退，跳转到新的url地址
           
            //1.最简单的
            // this.$router.push('/home/goodsinfo/' + id)

            //2.传递对象
            // this.$router.push({path:'/home/goodsinfo/' + id});

            // 3.命名的路由
            this.$router.push({name:'goodsinfo',params:{ id }});
        }
    }
}
</script>

<style lang="scss" scoped>
    .goods-list{
        display:flex;
        padding:5px;
        flex-wrap:wrap;
        justify-content: space-between;
        .goods-item{
            width:49%;
            border:1px solid #eee;
            box-shadow:0 0 8px #ccc;
            margin-bottom:8px;
            padding:1px;
            img{
                width:100%;
                height:150px;
            }
            .title{
                font-size:13px;
                padding:0 4px;
                line-height:18px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                height:36px;
            }
            .info{    
                background:#f1f1f1;
                padding:5px 4px;
                color:#777;
                .price{
                    font-size:13px;
                    margin-bottom:5px;
                    .now{
                        color:#f00;
                        font-size:16px;
                        margin-right:8px;
                    }
                    .old{
                        text-decoration:line-through;
                    }
                }
                .sell{
                    display:flex;
                    justify-content:space-between;
                    font-size:13px;
                }
            }
        }
    }
</style>