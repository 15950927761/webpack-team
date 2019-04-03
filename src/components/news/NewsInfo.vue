<template>
    <div class="newsinfo-container">
        <h3 class="title">{{newsinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{newsinfo.add_time | dateFormat('YYYY-MM-DD')}}</span>
            <span>点击:{{newsinfo.click}}</span>
        </p>
        <hr>
        <div class="content" v-html="newsinfo.content"></div>
        <!-- 评论区域子组件 -->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
//导入comment.vue组件 
import comment from '../subcomponents/comment.vue'
export default {
    data(){
        return {
            id: this.$route.params.id,
            newsinfo:[]
        }
    },
    created(){
        // console.log(this.$route);
        this.getNewsInfo();

    },
    methods:{
        getNewsInfo(){
            this.$http.get('api/getnew/' + this.id).then(result=>{
                // console.log(result);
                if(result.body.status === 0){
                    this.newsinfo = result.body.message[0]
                }else{
                    Toast('新闻信息获取失败');
                }
            })
        }
    },
    components:{
        'comment-box':comment
    }
}
</script>

<style lang="scss">
.newsinfo-container{
    padding:0 4px;
    .title{
        font-size:16px;
        text-align:center;
        margin:15px 0;
        color:red;
    }
    .subtitle{
        font-size:13px;
        color:blue;
        display:flex;
        justify-content:space-between;
    }
    .content{
        img{
            width:100%;
        }
    }
}
</style>