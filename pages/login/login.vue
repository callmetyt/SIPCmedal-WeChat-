<template>
	<view class="container">
		<view class="Hwarp flex justify-center">
			<image class="header" src="../../static/logo_s.png" mode="aspectFit"></image>
		</view>
		<view class="warp">
			<text>学号：</text>
			<input type="text" v-model="userId" />
		</view>
		<view class="warp">
			<text>密码：</text>
			<input type="password" v-model="password" />
		</view>
		<view class="action">
			<button type="default" class="cu-btn bg-gradual-blue" size="mini" @click="toHome">取消</button>
			<button type="default" class="cu-btn bg-gradual-blue" size="mini" @click="signIn">确认</button>
		</view>
		<image class="footer" src="../../static/logo.png" mode="aspectFit"></image>
		<message ref="tip"></message>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId:'',
				password:'',
				token:''
			}
		},
		methods: {
			toHome(){
				uni.switchTab({
					url:'../home/home',
					fail(err) {
						console.log(err)
					}
				})
			},
			signIn(){
				let data={
					userId:this.userId,
					password:this.password
				}
				this.api.signIn(data,this)
			}
		}
	}
</script>
<style lang="scss" scoped>
		.Hwarp{
			.header{
				height: 250rpx;
				width: 250rpx;
				margin-top: 150rpx;
			}
		}
		.warp{
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 30rpx;
			text{
				color: #2F4B7E;
				font-size: 50rpx;
			}
			input{
				border: 5rpx solid #2F4B7E;
				letter-spacing: 3rpx;
				border-radius: 20rpx;
				padding-left: 20rpx;
			}
		}
		.action{
			margin: 100rpx auto 0 auto;
			display: flex;
			justify-content: space-around;
			width: 80%;
			.cu-btn{
				color: #fff;
			}
		}
		.footer{
			height: 200rpx;
			position: absolute;
			bottom: 0;
		}
</style>
