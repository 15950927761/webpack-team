<template>
  <div>
    <mt-button type="danger" icon="more" @click="show">default</mt-button>
    <!-- <mybtn>123456</mybtn>
    <mybtn type="primary">primary</mybtn> -->
    <button type="button" class="mui-btn mui-btn-royal">
					紫色
		</button>
  </div>
</template>

<script>
 //导入Toast组件
  import { Toast } from 'mint-ui';

  export default{
    data(){
      return {
        toastInstance:null
      }
    },
    created(){
      this.getList();
    },
    methods:{
      getList(){
        this.show();
        setTimeout(()=>{
          this.toastInstance.close();
        },2000)
      },
      show(){
        this.toastInstance = Toast({
          message:'弹窗信息',
          position:'top',
          duration:-1,//如为-1则弹出之后不消失
          iconClass:'glyphicon glyphicon-heart',
          className:'mytoast'//自定义Toast样式
        })
      }
    }
  }
</script>

<style>
  .mint-toast-icon{color:red;}
</style>