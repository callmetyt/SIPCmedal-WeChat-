<template>
	<view class="container">
		
		<!-- 头部基本信息 -->
		<view class="info flex justify-around align-center">
			<view class="medalNum flex">
				<image src="../static/tabbar/medaled.png" mode="aspectFit"></image>
				<view class="num">{{medalNum}}</view>
				<view>勋章数</view>
			</view>
			<view class="baseInfo flex justify-center align-center">
				<image :src="avatar" mode="aspectFit"></image>
				<view>{{userName}}</view>
			</view>
			<view class="rankNum flex" @click="toRank">
				<image src="../static/tabbar/ranked.png" mode="aspectFit"></image>
				<view class="num">{{rankNum}}</view>
				<view>排名</view>
			</view>
		</view>
		
		<!-- 勋章列表 -->
		<view class="medals flex">
			<view class="warp" v-for="(item,index) in showList" :key="index">
				<view class="medal flex" @click="toMedal(item.id)">
					<image :src="item.url" mode="aspectFit"></image>
					<view>{{item.name}}</view>
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
		
		<button type="default" v-if="isOther" @click="toMine">返回我的勋章墙</button>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				medalList:[],
				userName:'',
				medalNum:'',
				rankNum:'',
				avatar:'',
				token:'',
				userId:'',
				currentPage:1
			}
		},
		methods:{
			page({current}){
				this.currentPage=current
			},
			toRank(){
				uni.switchTab({
					url:'rank/rank'
				})
			},
			toMedal(id){
				if(!id){
					return;
				}
				uni.navigateTo({
					url:'medal/medalDetail?id='+id
				})
			},
			toMine(){
				uni.switchTab({
					url:'home/home'
				})
			}
		},
		computed:{
			totalPage(){
				return this.medalList.length
			},
			showList(){
				let result=[],index=this.currentPage*4-4;
				for(let i=0;i<4;i++){
					if(index<this.medalList.length){
						result.push(this.medalList[index++]);
					}
				}
				return result
			},
			isOther(){
				return this.userId!=uni.getStorageSync('userId')
			}
		},
		onLoad(options) {
			this.userId=options.userId;
			this.token=uni.getStorageSync('token')
			let data={
				userId:this.userId,
				token:this.token
			}
			this.api.getHasMedal(data,this)
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		.info{
			border-bottom: 1rpx solid #000;
			padding: 30rpx 0;
			.medalNum{
				flex-direction: column;
				image{
					height: 80rpx;
					width: 80rpx;
					margin: 0 auto;
				}
				view{
					text-align: center;
					font-size: 50rpx;
				}
				.num{
					margin-top: 20rpx;
					font-size: 80rpx;
				}
			}
			.baseInfo{
				flex-direction: column;
				image{
					height: 150rpx;
					width: 150rpx;
					border: 1rpx solid #000;
					border-radius: 50%;
				}
				view{
					text-align: center;
					font-size: 50rpx;
				}
			}
			.rankNum{
				flex-direction: column;
				image{
					height: 80rpx;
					width: 80rpx;
					margin: 0 auto;
				}
				view{
					text-align: center;
					font-size: 50rpx;
				}
				.num{
					margin-top: 20rpx;
					font-size: 80rpx;
				}
			}
		}
		.medals{
			flex-wrap: wrap;
			.warp{
				width: 50%;
				padding: 30rpx;
				.medal{
					flex-direction: column;
					align-items: center;
					border: 1rpx #41559A solid;
					border-radius: 10px;
					padding: 30rpx;
					height: 270rpx;
					image{
						height: 150rpx;
						width: 150rpx;
					}
					view{
						font-size: 40rpx;
						margin-top: 20rpx;
						text-align: center;
					}
				}
			}
		}
	}
</style>
