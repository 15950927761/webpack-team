<template>
    <div class="photoinfo-container">
        <h3 class="photoinfo-title">{{photoinfo.title}}</h3>
        <p class="sub-title">
            <span>发表时间：{{photoinfo.add_time | dateFormat("YYYY-MM-DD")}}</span>
            <span>点击:{{photoinfo.click}}次</span>
        </p>
        <hr>

        <!-- 缩略图区域 -->
        <div class="pic">
            <vue-preview :slides="list"></vue-preview>
        </div>
        <!-- <img class="preview-img" v-for="(item,index) in list" :key="item.src" :src="item.src" height="100" @click="$preview.open(index,list)" > -->
        <!-- 图片内容区域 -->
        <div class="content" v-html="photoinfo.content"></div>

        <!-- 评论子组件  -->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
import comment from '../subcomponents/comment.vue'

export default {
    data(){
        return{
            id:this.$route.params.id,
            photoinfo:[],
            list:[]
        }
    },
    created(){
        this.getPhotoInfo();
        this.getThumbs();
    },
    methods:{
        getPhotoInfo(){
            this.$http.get('api/getimageInfo/' + this.id).then(result=>{
                if(result.body.status === 0){
                    console.log(result);
                    this.photoinfo = result.body.message[0];
                }
            })
        },
        getThumbs(){
            this.$http.get('api/getthumimages/' + this.id).then(result=>{
                if(result.body.status === 0){
                    //循环每个图片数据，补全图片的宽和高
                    result.body.message.forEach(item=>{
                        item.w = 600;
                        item.h = 400;
                        item.msrc = item.src;
                    })
                    this.list = result.body.message
                    // console.log(this.list);
                }
            })
        }
    },
    components:{
        "cmt-box":comment
    }
}
</script>

<style lang="scss">
    .photoinfo-container{
        padding:3px;
        .photoinfo-title{
            color:blue;
            font-size:13px;
            text-align:center;
            margin:10px 0;
        }
        .sub-title{
            display:flex;
            justify-content: space-between;
            font-size:12px;
        }
        .content{
            line-height:24px;
            font-size:13px;
            color:#646464;
        } 
        .my-gallery{
           display:flex;
           justify-content: flex-start;
           flex-wrap:wrap;
           figure{
               margin:0 1.15%;
               width:31%;
               img{
                width:100%;
                box-shadow:0 0 8px #ccc;
            }
           }
           
        }
    }
</style>