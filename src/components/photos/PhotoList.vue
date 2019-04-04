<template>
    <div>
        <!-- 顶部滑动条区域 -->
        <div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a :class="['mui-control-item', item.id==0?'mui-active':'']" v-for="item in category" :key="item.id"  @click="getPhotoListByCateId(item.id)">
							{{item.title}}
						</a>
					</div>
				</div>
			</div>
            <!-- 顶部滑动条结束 -->

            <ul class="photo-list">
                <router-link v-for="item in list" :key="item.id" tag="li" :to="'/home/photoinfo/' + item.id">
                    <img v-lazy="item.img_url">
                    <div class="info">
                        <h1 class="info-title">{{item.title}}</h1>
                        <div class="info-body">{{item.zhaiyao}}</div>
                    </div>
                </router-link>
            </ul>
    </div>
</template>

<script>
// 导入MUI js组件
import mui from '../../lib/mui/js/mui.min.js'
export default {
    data(){
        return {
            category:[],
            list:[]
        }
    },
    created(){
        this.getAllCategory();
        this.getPhotoListByCateId(0)
    },
    mounted(){
        //初始化滑动控件
        mui('.mui-scroll-wrapper').scroll({
	        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    methods:{
        getAllCategory(){
            this.$http.get('api/getimgcategory').then(result=>{
                if(result.body.status === 0){
                    result.body.message.unshift({ title:'全部',id:0 })
                    this.category = result.body.message
                }
                // console.log(result);
            })
        },
        getPhotoListByCateId(cateId){
            //根据分类id,获取图片列表
            this.$http.get('api/getimages/' + cateId).then(result=>{
                if(result.body.status === 0){
                    // console.log(result);
                    this.list = result.body.message
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    *{
        touch-action: pan-y;
    }
    .photo-list{
        list-style:none;
        margin:0;
        padding:10px;
        padding-bottom:0;
        li{
            background:#ccc;
            text-align:center;
            margin-bottom:10px;
            box-shadow:0 0 6px #999;
            position:relative;
            img{
                // display:block;
                vertical-align:middle;
            }
            img[lazy="loading"]{
            width:40px;
            height:300px;
            margin:auto;
            }

            .info{
                color:white;
                text-align:left;
                position:absolute;
                bottom:0;
                max-height:80px;
                background:rgba(0,0,0,0.4);
                width:100%;
                padding:5px 8px;
                .info-title{
                    font-size:14px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
                .info-body{
                    font-size:13px;
                    line-height:24px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }
            }
        }
    }
</style>