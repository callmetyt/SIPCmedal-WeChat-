<template>
	<view class="container">
		<view class="main flex">
			
			<image src="../../static/logo_s.png" mode="aspectFit" class="header"></image>
			
			<view class="author">
				{{msgInfo.author}}:
			</view>
			
			<view class="content">
				{{msgInfo.content}}
			</view>
			
			<view class="extra">
				<view class="text">
					附件:
				</view>
				<image :src="msgInfo.extraUrl" mode="aspectFit"></image>
			</view>
			
			<view class="action flex justify-around align-center">
				<button class="cu-btn bg-gradual-blue" @click="toBack(true)">删除</button>
				<button class="cu-btn bg-gradual-blue" @click="toBack(false)">确认</button>
			</view>
			
			<message ref="tip"></message>
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				msgId:'',
				token:"",
				userId:'',
				msgInfo:{
					author:'',
					content:'',
					extraUrl:''
				}
			}
		},
		onLoad(option){
			this.msgId=option._id
			this.token=uni.getStorageSync('token')
			this.userId=uni.getStorageSync('userId')
			let data={
				userId:this.userId,
				token:this.token,
				msgId:this.msgId
			}
			this.api.getDetailMsg(data,this)
		},
		methods:{
			toBack(flag){
				if(flag){
					let data={
						userId:this.userId,
						token:this.token,
						msgId:this.msgId
					}
					this.api.deleteMsg(data,this,false);
				}
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		background-color: #9BAAD1;
		height: 100vh;
		padding: 40rpx;
		.main{
			background-color: #fff;
			padding: 30rpx;
			flex-direction: column;
			.header{
				height: 150rpx;
				width: 150rpx;
				margin: 0 auto;
			}
			.author{
				font-size: 50rpx;
				font-weight: bold;
				margin: 30rpx 0;
			}
			.content{
				padding: 0 40rpx;
				font-size: 40rpx;
			}
			.extra{
				margin-top: 40rpx;
				.text{
					font-size: 50rpx;
					font-weight: bold;
				}
				image{
					margin: 30rpx 0 30rpx 40rpx;
					width: 150rpx;
					height: 150rpx;
					border: 1rpx solid #000;
				}
			}
			.action{
				.cu-btn{
					font-size: 40rpx;
				}
			}
		}
	}
</style>
