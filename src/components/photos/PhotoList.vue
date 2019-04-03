<template>
    <div>
        <!-- 顶部滑动条区域 -->
        <div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<router-link :class="['mui-control-item', item.id==0?'mui-active':'']" to="/item1mobile" v-for="item in category" :key="item.id">
							{{item.title}}
						</router-link>
					</div>
				</div>
			</div>
            <!-- 顶部滑动条结束 -->
    </div>
</template>

<script>
// 导入MUI js组件
import mui from '../../lib/mui/js/mui.min.js'
export default {
    data(){
        return {
            category:[]
        }
    },
    created(){
        this.getAllCategory();
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
                console.log(result);
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    *{
        touch-action: pan-y;
    }
</style>