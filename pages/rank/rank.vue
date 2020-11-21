<template>
	<view class="container">
		<!-- 冠军栏 -->
		<view class="champion flex justify-around align-center">
			<view class="left">
				<image src="../../static/冠军.png" mode="aspectFit"></image>
			</view>
			<view class="main" @click="toMedalWall(list[0].userId)">
				<view class="text">{{list[0].userName}}</view>
				<image :src="list[0].avatar" mode="aspectFit" class="userImage"></image>
			</view>
		</view>
		
		<!-- 我的排名 -->
		<view class="mine flex justify-between align-center" @click="toMedalWall(userId)">
			<view class="Mleft flex align-center">
				<text>{{userData.rankNum}}</text>
				<image :src="userData.avatar?userData.avatar:'../../static/User%20Secret.png'" mode="aspectFit"></image>
				<text>{{userData.userName}}</text>
			</view>
			<view class="Mright flex align-center justify-between">
				<text>勋章数</text>
				<text>{{userData.medalNum}}</text>
			</view>
		</view>
		
		<!-- 排名 -->
		<view class="rankList">
			<view 
				class="rankItem flex justify-between align-center" 
				v-for="(item,index) in list" 
				:key="index"
				@click="toMedalWall(item.userId)"
				>
				<view class="Mleft flex align-center">
					<text>{{index+1}}</text>
					<image :src="item.avatar?item.avatar:'../../static/User%20Secret.png'" mode="aspectFit"></image>
					<text>{{item.userName}}</text>
				</view>
				<view class="Mright flex align-center justify-between">
					<text>勋章数</text>
					<text>{{item.medalNum}}</text>
				</view>
			</view>
		</view>
		
		<message ref="msg"></message>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:[],
				userId:'',
				token:'',
				userData:{
					userName:'',
					rankNum:'',
					medalNum:'',
					avatar:''
				}
			}
		},
		methods:{
			toMedalWall(userId){
				if(!this.token){
					this.$refs.msg.show({
						type:'error',
						msg:'登录后查看!'
					})
					return;
				}else{
					uni.navigateTo({
						url:'../hasMedal?userId='+userId
					})
				}
			}
		},
		onShow() {
			this.userId=uni.getStorageSync('userId')
			this.token=uni.getStorageSync('token')
			this.api.getRank(this)
		}
	}
</script>

<style lang="scss" scoped>
	.champion{
		padding: 50rpx;
		background-color: #9BAAD1;
		.left{
			.text{
				text-align: center;
				font-size: 50rpx;
				letter-spacing: 10rpx;
				font-weight: bold;
			}
			image{
				margin-top: 30rpx;
				height: 180rpx;
				width: 180rpx;
			}
		}
		.main{
			animation-name: mine;
			animation-duration: 1.5s;
			.userImage{
				height: 200rpx;
				width: 200rpx;
				border: 1rpx solid rgba(255,255,255,0.5);
				border-radius: 50%;
			}
			.text{
				letter-spacing: 10rpx;
				font-size: 50rpx;
				text-align: center;
				font-weight: bold;
			}
			@keyframes mine{
				0%{
					transform: translateX(-130%);
				}
				100%{
					transform: translateX(0);
				}
			}
		}
	}
	.mine{
		padding: 20rpx;
		border-bottom: 50rpx solid #9BAAD1;
		font-size: 35rpx;
		letter-spacing: 3rpx;
		.Mleft{
			image{
				margin: 0 30rpx;
				height: 80rpx;
				width: 80rpx;
				border-radius: 50%;
				border: 1rpx solid rgba(0,0,0,0.7);
			}
		}
		.Mright{
			text{
				width: 140rpx;
			}
		}
	}
	.rankList{
		border-bottom: 1rpx solid rgba(0,0,0,0.7);
		.rankItem{
			letter-spacing: 3rpx;
			font-size: 35rpx;
			border-top: 1rpx solid rgba(0,0,0,0.7);
			padding: 20rpx;
			.Mleft{
				image{
					margin: 0 30rpx;
					height: 80rpx;
					width: 80rpx;
					border-radius: 50%;
					border: 1rpx solid rgba(0,0,0,0.7);
				}
			}
			.Mright{
				text{
					width: 140rpx;
				}
			}
		}
		:nth-child(2n){
			animation-name: fadeInLeft;
			animation-duration: .35s;
		}
		:nth-child(2n+1){
			animation-name: fadeInRight;
			animation-duration: .35s;
		}
	}
</style>
