<template>
	<view class="container">
		
		<view class="header flex align-center">
			<text>查看主题: </text>
			<xflSelect 
				class="list" 
				:list="classList" 
				placeholder="" 
				@change="selectChange"
				:clearable="false"
				:initValue="classList[0]"
			>
			</xflSelect>
		</view>
		
		<view class="medals">
			<view class="warp" v-for="(item,index) in showMedalList" :key="index">
				<view class="medal flex align-center" @click="toMedal(item)">
					<image :src="item.url" mode="aspectFit"></image>
					<view class="name">
						{{item.name}}
					</view>
					<scroll-view :scroll-y="true" class="content">
						{{item.content}}
					</scroll-view>
				</view>
			</view>
		</view>
		
		<uni-pagination 
			title="分页" 
			:show-icon="true" 
			:total="totalPage"
			:pageSize="4"
			:current="currentPage"
			@change="page"
		></uni-pagination>
		<message ref="msg"></message>
	</view>
</template>

<script>
	import xflSelect from '../../components/xfl-select/xfl-select.vue'
	
	export default{
		data(){
			return{
				currentPage:1,
				classList:['————'],
				medalList:[],
				allMedalList:[],
				token:''
			}
		},
		methods:{
			//下拉列表该改变
			selectChange(e){
				let newVal=e.newVal;
				if(newVal==='————'){
					this.medalList=[...this.allMedalList]
					return;
				}
				//清除原来的一类勋章
				this.medalList=[];
				this.allMedalList.forEach((item)=>{
					if(item.className===newVal){
						this.medalList.push(item)
					}
				})
				//页数切换到第一页
				this.currentPage=1
			},
			//换页
			page({current}){
				this.currentPage=current
			},
			//查看勋章详情
			toMedal({id}){
				if(!this.token){
					this.$refs.msg.show({
						type:'error',
						msg:"登录后查看!",
					})
					return;
				}
				uni.navigateTo({
					url:'medalDetail?id='+id
				})
			}
		},
		computed:{
			//展示的四个勋章
			showMedalList(){
				let result=[],index=this.currentPage*4-4;
				for(let i=0;i<4;i++){
					if(index<this.medalList.length){
						result.push(this.medalList[index++]);
					}
				}
				return result
			},
			totalPage(){
				return this.medalList.length
			}
		},
		components:{
			xflSelect
		},
		onShow() {
			this.token=uni.getStorageSync('token')
			//api获取所有勋章
			this.api.getAllMedal(this)
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		.header{
			width: 100%;
			padding: 30rpx;
			text{
				margin-right: 30rpx;
				font-size: 40rpx;
			}
			.list{
				width: 180rpx;
				/deep/ .show-box{
					.list-container{
						.popper__arrow{
							transform: translateX(50%);
						}
					}
				}
			}
		}
		.medals{
			width: 100%;
			margin-bottom: 50rpx;
			.warp{
				width: 50%;
				display: inline-block;
				height: 360rpx;
				padding: 50rpx;
				animation-name: zoomIn;
				animation-duration: .25s;
				.medal{
					flex-direction: column;
					border: 1rpx #41559A solid;
					border-radius: 10px;
					height: 310rpx;
					padding-top: 30rpx;
					image{
						height: 150rpx;
						width: 150rpx;
					}
					.name{
						font-size: 40rpx;
					}
					.content{
						font-size: 30rpx;
						height: 60rpx;
						width: 80%;
						word-wrap: break-word;
					}
				}
			}
		}
	}
</style>
