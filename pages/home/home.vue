<template>
	<view class="container">
		<view class="base">
			<image :src="avatar?avatar:'../../static/User%20Secret.png'" mode="aspectFit" class="avatar"></image>
			<view class="warp">
				<view class="nickName">{{userName}}</view>
				<view class="changeInfo">
					<button class="cu-btn flex align-center" @click="toOther('infoChange')">
						<image src="../../static/write.png" mode="aspectFit"></image>
						<text>修改个人信息</text>
					</button>
				</view>
			</view>
		</view>
		<!-- 登录前 -->
		<view class="notLogin" v-if="token==''">
			您并非学生创新实践中心科技协会成员，请
			<text class="link" @click="toOther('login')">登录</text>
			后查看~
		</view>
		<!-- 登录后 -->
		<view class="body" v-else>
			
			<view class="info flex justify-around">
				<view class="medal">
					<view class="warp flex align-center" @click="toOther('hasMedal')">
						<image src="../../static/tabbar/medaled.png" mode="aspectFit"></image>
						<text>{{medalNum}}</text>
					</view>
					<text>勋章数</text>
				</view>
				<view class="rank">
					<view class="warp flex align-center" @click="toOther('rank')">
						<image src="../../static/tabbar/ranked.png" mode="aspectFit"></image>
						<text>{{rankNum}}</text>
					</view>
					<text>排名</text>
				</view>
			</view>
			
			<view class="msg flex justify-between align-center" @click="toOther('msg')">
				<view class="left flex align-center">
					<image src="../../static/信封.png" mode="aspectFit"></image>
					<text>消息中心</text>
				</view>
				<text class="cuIcon-right"></text>
			</view>
			
			<view class="haveMedal flex justify-between align-center" @click="toOther('hasMedal')">
				<view class="left flex align-center">
					<image src="../../static/tabbar/medaled.png" mode="aspectFit"></image>
					<text>我的已有勋章</text>
				</view>
				<text class="cuIcon-right"></text>
			</view>
			
		</view>
		<!-- 模态框 -->
		<Modal ref="modal" title="消息通知" :content="modalMsg" confirm-text="确认" :show-cancel="false" @confirm="modalConfirm"></Modal>
		
	</view>
</template>

<script>
	import Modal from '../../components/wyb-modal/wyb-modal.vue'
	
	export default{
		data(){
			return{
					token:'',
					userId:'',
					userName:'',
					medalNum:'',
					rankNum:'',
					avatar:'',
					modalMsg:''
			}
		},
		methods:{
			toOther(name){
				if(name!='login'&&this.token==''){
					this.modalMsg='请先登录！'
					this.$refs.modal.showModal()
				}else{
					let path;
					switch(name){
						case 'msg':
							path='../msg/msg';
							break;
						case 'login':
							path='../login/login';
							break;
						case 'infoChange':
							path='infoChange';
							break;
						case 'rank':
							path='../rank/rank';
							break;
						case 'hasMedal':
							path='../hasMedal';
							break;
					}
					if(name==='rank'){
						uni.switchTab({
							url:path
						})
					}else if(name=='hasMedal'){
						uni.navigateTo({
							url:'../hasMedal?userId='+this.userId
						})
					}else{
						uni.navigateTo({
							url:path
						})
					}
				}
			},
			modalConfirm(){
				this.$refs.modal.hideModal()
				this.toOther('login')
			}
		},
		onShow() {
			this.token=uni.getStorageSync('token')
			this.userId=uni.getStorageSync('userId')
			if(this.token!=''&&this.userId!=''){
				let data={
					token:this.token,
					userId:this.userId
				}
				this.api.getBaseInfo(data,this)
			}
		},
		components:{
			Modal
		}
	}
</script>

<style lang="scss" scoped>
	.base{
		display: flex;
		justify-content: center;
		background-color: #9BAAD1;
		padding: 50rpx 0;
		.avatar{
			width: 200rpx;
			height: 200rpx;
			border-radius: 50%;
			border: 1rpx solid #000;
		}
		.warp{
			margin-left: 50rpx;
			.nickName{
				text-align: center;
				font-size: 50rpx;
				font-weight: bold;
				letter-spacing: 3rpx;
				margin-top: 20rpx;
			}
			.changeInfo{
				display: flex;
				margin-top: 60rpx;
				button{
					font-size: 35rpx;
					color: #000;
					image{
						width: 40rpx;
						height: 40rpx;
					}
				}
			}
		}
	}
	.notLogin{
		padding: 50rpx;
		font-size: 50rpx;
		letter-spacing: 5rpx;
		.link{
			color: #007AFF;
		}
	}
	.body{
		.info{
			border-top: 1rpx solid rgba(0,0,0,0.7);
			border-bottom: 1rpx solid rgba(0,0,0,0.7);
			padding: 30rpx 0;
			.warp{
				image{
					height: 80rpx;
					width: 80rpx;
				}
				text{
					margin-left: 30rpx;
					font-size: 80rpx;
					color: #007AFF;
				}
			}
			text{
				margin-top: 15rpx;
				letter-spacing: 3rpx;
				display: block;
				font-size: 40rpx;
				text-align: center;
			}
		}
		.msg,.haveMedal{
			border-bottom: 1rpx solid rgba(0,0,0,0.7);
			padding: 30rpx;
			font-size: 40rpx;
			letter-spacing: 5rpx;
			image{
				margin-right: 30rpx;
				height: 70rpx;
				width: 70rpx;
			}
		}
	}
</style>
