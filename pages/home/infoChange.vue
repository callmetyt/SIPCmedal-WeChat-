<template>
	<view class="container">
		<!-- 不可修改的信息 -->
		<view class="base">
			<image :src="userData.avatar" mode="aspectFit"></image>
			<view class="text">
				<button class="cu-btn bg-gradual-purple" @click="setAvatar">更换头像</button>
				<text>学号: {{userId}}</text>
				<text>姓名: {{userData.userName}}</text>
				<text>班级: {{userData.class}}</text>
			</view>
		</view>
		
		<!-- 可修改的信息 -->
		<view class="change">
			<view class="header">基本信息(可修改):</view>
			<view class="cu-form-group">
				<view class="title">电话:</view>
				<input placeholder="请输入电话" name="input" v-model="userData.phone"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">邮箱:</view>
				<input placeholder="请输入邮箱" name="input" v-model="userData.mail"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">QQ:</view>
				<input placeholder="请输入QQ" name="input" v-model="userData.qq"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">微信:</view>
				<input placeholder="请输入微信" name="input" v-model="userData.weChat"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">github:</view>
				<input placeholder="请输入github账号" name="input" v-model="userData.github"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">博客:</view>
				<input placeholder="请输入博客" name="input" v-model="userData.blog"></input>
			</view>
			<view class="action flex justify-around">
				<button class="cu-btn round bg-blue" @click="cancel">取消修改</button>
				<button class="cu-btn round bg-blue" @click="changeInfo">确认修改</button>
			</view>
		</view>
		<message ref="tip"></message>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				userData:{
					phone:'',
					mail:'',
					qq:'',
					weChat:'',
					github:'',
					blog:'',
					userName:'',
					class:'',
					avatar:''
				},
				token:'',
				userId:''
			}
		},
		methods:{
			changeInfo(){
				let data=this.userData;
				data.token=this.token;
				data.userId=this.userId;
				this.api.setBaseInfo(data,this)
			},
			cancel(){
				uni.navigateBack({
					delta:1
				})
			},
			setAvatar(){
				let tmp=this.userData.avatar;
				let data={
					token:this.token,
					userId:this.userId,
					oldAvatar:tmp.substr(tmp.lastIndexOf('/')+1)
				}
				this.api.setAvatar(data,this)
			}
		},
		onShow() {
			this.token=uni.getStorageSync('token')
			this.userId=uni.getStorageSync('userId')
			let data={
				token:this.token,
				userId:this.userId
			}
			this.api.getAllInfo(data,this)
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		.base{
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			border-bottom: 1rpx solid #000;
			background-color: #9BAAD1;
			image{
				height: 200rpx;
				width: 200rpx;
				border-radius: 50%;
				border: 1rpx solid #000;
				margin: 20rpx 0 0 0;
			}
			.text{
				:first-child{
					margin: 10rpx auto 50rpx auto;
					width: max-content;
					font-size: 40rpx;
				}
				font-size: 40rpx;
				margin-bottom: 30rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				text-align: center;
			}
		}
		.change{
			.header{
				font-size: 40rpx;
				margin: 20rpx;
			}
			.cu-form-group{
				min-height: 0;
				padding: 10rpx 20rpx;
			}
			.action{
				margin-top: 30rpx;
			}
		}
	}
</style>
