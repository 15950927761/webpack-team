<template>
    <div class="goods-list">
        <div class="goods-item">
            <img src="http://img.mp.itc.cn/upload/20170717/80e80d2f47c3412d8e0ee5ca2767497e_th.jpg">
            <h1 class="title">荣耀10青春版 2400万AI自拍 珍珠屏</h1>
            <div class="info">
                <div class="price">
                    <span class="now">￥2199</span>
                    <span class="old">￥2399</span>
                </div>
                <div class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </div>
            </div>
        </div>
        <div class="goods-item">
            <img src="http://img.mp.itc.cn/upload/20170717/80e80d2f47c3412d8e0ee5ca2767497e_th.jpg">
            <h1 class="title">荣耀10青春版 2400万AI自拍 珍珠屏</h1>
            <div class="info">
                <div class="price">
                    <span class="now">￥2199</span>
                    <span class="old">￥2399</span>
                </div>
                <div class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </div>
            </div>
        </div>
        <div class="goods-item">
            <img src="http://img.mp.itc.cn/upload/20170717/80e80d2f47c3412d8e0ee5ca2767497e_th.jpg">
            <h1 class="title">荣耀10青春版 2400万AI自拍 珍珠屏荣耀10青春版 2400万AI自拍 珍珠屏</h1>
            <div class="info">
                <div class="price">
                    <span class="now">￥2199</span>
                    <span class="old">￥2399</span>
                </div>
                <div class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{

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