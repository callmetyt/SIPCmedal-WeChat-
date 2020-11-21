<template>
	<view class="container">
		
		<!-- 消息列表 -->
		<scroll-view class="msgList" :scroll-y="true">
			<view class="msg" v-for="(item,index) in list" :key="index" @click="toDetail(item._id)">
				<view class="warp flex justify-between align-center">
					<view class="left flex justify-around align-center">
						<image :src="item.isRead?'../../static/信封-开.png':'../../static/信封.png'" mode="aspectFit"></image>
						<view>{{item.title}}</view>
					</view>
					<view class="right">
						<view v-if="!item.isRead" class="dot"></view>
					</view>
				</view>
				<view class="time">{{showTime(item.createDate)}}</view>
			</view>
		</scroll-view>
		
		<!-- 底部按钮 -->
		<view class="action flex justify-around align-center">
			<button class="cu-btn bg-gradual-blue" @click="deleteAllRead">删除已读</button>
			<button class="cu-btn bg-gradual-blue" @click="readAllMsg">一键已读</button>
		</view>
		
		<message ref="tip"></message>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:[],
				userId:'',
				token:''
			}
		},
		methods:{
			showTime(t){
				let time=new Date(t)
				return `${time.getFullYear()}/${time.getMonth()+1}/${time.getDate()}`
			},
			toDetail(_id){
				uni.navigateTo({
					url:'detail?_id='+_id
				})
			},
			deleteAllRead(){
				let msgId=[];
				this.list.forEach((item)=>{
					if(item.isRead){
						msgId.push(item._id)
					}
				})
				let data={
					userId:this.userId,
					token:this.token,
					msgId
				}
				this.api.deleteMsg(data,this,true)
			},
			readAllMsg(){
				let msgId=[];
				this.list.forEach((item)=>{
					if(!item.isRead){
						msgId.push(item._id)
					}
				})
				let data={
					userId:this.userId,
					token:this.token,
					msgId
				}
				this.api.readAllMsg(data,this)
			}
		},
		onShow() {
			this.userId=uni.getStorageSync('userId');
			this.token=uni.getStorageSync('token');
			let data={
				userId:this.userId,
				token:this.token
			}
			this.api.getAllMsg(data,this)
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		background-color: #9BAAD1;
		padding: 0 40rpx;
		height: 100vh;
		display: flow-root;
		.msgList{
			border-bottom: 2rpx solid #000;
			padding-bottom: 10rpx;
			height: 80vh;
			.msg{
				background-color: #fff;
				padding: 30rpx;
				margin-top: 50rpx;
				animation-name: fadeInUp;
				animation-duration: .5s;
				.warp{
					.left{
						font-size: 50rpx;
						font-weight: bold;
						image{
							height: 70rpx;
							width: 70rpx;
							margin-right: 20rpx;
						}
					}
					.right{
						.dot{
							border-radius: 50%;
							border: 20rpx solid #ED1C24;
						}
					}
				}
				.time{
					margin-top: 20rpx;
					font-size:40rpx;
					text-align: right;
				}
			}
		}
		.action{
			position: absolute;
			bottom: 30rpx;
			margin-left: -40rpx;
			width: 100%;
			.cu-btn{
				font-size: 40rpx;
			}
		}
	}
</style>
