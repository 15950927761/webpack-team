<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要评论的内容(最多吐槽120字)" maxlength="120" v-model="message"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    第{{i+1}}楼&nbsp;用户：{{item.user_name}}&nbsp;发表时间：{{item.add_time | dateFormat}}
                </div>
                <div class="cmt-body">
                    {{(item.content === 'undefined' || item.content === '')?'此用户没有评论信息':item.content}}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
    data(){
        return {
            pageIndex:1,
            comments:[],
            message:''
        }
    },
    created(){
        this.getComments();
    },
    methods:{
        getComments(){
            this.$http.get('api/getcomments/' + this.id +'?pageindex=' + this.pageIndex).then(result=>{
                if(result.body.status === 0){
                    // console.log(result);
                    // this.comments = result.body.message;
                    this.comments = this.comments.concat(result.body.message)
                    console.log(this.comments);
                }else{
                    Toast('获取评论信息失败')
                }
            })
        },
        getMore(){
            this.pageIndex++;
            this.getComments();
        },
        postComment(){
            if(this.message.trim()===''){
               return Toast('评论内容不能为空');
            }
            this.$http.post('api/postcomment/' + this.$route.params.id,{
                content:this.message.trim()
                })
                .then(result=>{
                    if(result.body.status === 0){
                        var cmt = { user_name:'匿名用户',add_time:Date.now(),content:this.message.trim() }
                        this.comments.unshift(cmt);
                        this.message = ''
                    }
            })
        }
    },
    props:["id"]
}
</script>

<style lang="scss" scoped>
.cmt-container{
    h3{
        font-size:18px;
    }
    textarea{
        font-size:14px;
        height:85px;
        margin:0;
    }
    .cmt-list{
        margin:8px 0;
        .cmt-item{
            font-size:13px;
            .cmt-title{
                background:#f1f1f1;
                line-height:35px;
                text-indent:5px;
             }
            .cmt-body{
                line-height:35px;
                text-indent:2em;
            }
        }
    }
}
</style>