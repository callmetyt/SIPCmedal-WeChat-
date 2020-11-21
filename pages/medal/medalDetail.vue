<template>
	<view class="container flex align-center">
		<button open-type="share" class="share">
			<image src="../../static/转发.png" mode="aspectFit"></image>
		</button>
		<image :src="medal.url" mode="aspectFit"></image>
		<view class="name">
			{{medal.name}}
		</view>
		<view class="content">
			{{medal.content}}
		</view>
		<view class="takeDate">
			{{getDate}}
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				token:'',
				userId:'',
				userName:'',
				medal:{
					url:'',
					content:'',
					name:'',
					date:''
				}
			}
		},
		onLoad(option) {
			this.token=uni.getStorageSync('token')
			this.userId=uni.getStorageSync('userId')
			let data={
				token:this.token,
				medalId:option._id,
				userId:this.userId
			}
			this.api.getMedalInfo(data,this)
		},
		onShareAppMessage(from,target,webViewUrl) {
			return{
				title:'test',
				path:'/pages/medal/medalDetail',
				success(){
					console.log('yes')
				},
				fail(err){
					console.log(err)
				}
			}
		},
		computed:{
			getDate(){
				if(!this.medal.date){
					return '尚未获得此勋章'
				}else{
					let date=new Date(this.medal.date)
					return `${this.userName}于${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日获得`
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		flex-direction: column;
		margin-top: 100rpx;
		.share{
			position: absolute;
			right: 20rpx;
			top: 20rpx;
			height: 100rpx;
			width: 100rpx;
			padding: 0;
			image{
				height: 100rpx;
				width: 100rpx;
				margin: 0;
			}
		}
		image{
			height: 500rpx;
			width: 500rpx;
			margin-bottom: 100rpx;
			animation-name: fadeIn;
			animation-duration: 1s;
		}
		.name{
			font-size: 70rpx;
			font-weight: bold;
			margin-bottom: 100rpx;
			padding: 0 100rpx;
		}
		.content{
			font-size: 50rpx;
			margin-bottom: 100rpx;
			padding: 0 100rpx;
		}
		.takeDate{
			font-size: 40rpx;
		}
	}
</style>
