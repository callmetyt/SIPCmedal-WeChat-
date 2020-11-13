<template>
	<view class="container">
		<!-- 冠军栏 -->
		<view class="champion flex justify-around align-center">
			<image src="../../static/冠军.png" mode="aspectFit"></image>
			<view class="champion_main" @click="toMedalWall(list[0].userId)">
				<view class="text">
					冠军
				</view>
				<image :src="list[0].avatar" mode="aspectFit" class="userImage"></image>
				<view class="text">{{list[0].userName}}</view>
			</view>
			<image src="../../static/冠军.png" mode="aspectFit"></image>
		</view>
		
		<!-- 我的排名 -->
		<view class="mine flex justify-between align-center" @click="toMedalWall(userId)">
			<view class="Mleft flex align-center">
				<text>{{userData.rankNum}}</text>
				<image :src="userData.avatar" mode="aspectFit"></image>
				<text>{{userData.userName}}</text>
			</view>
			<view class="Mright flex align-center">
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
					<image :src="item.avatar" mode="aspectFit"></image>
					<text>{{item.userName}}</text>
				</view>
				<view class="Mright flex align-center">
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
		padding: 0 50rpx 50rpx 50rpx;
		border-bottom: 1rpx solid #000;
		background-color: #9BAAD1;
		image{
			height: 150rpx;
			width: 150rpx;
		}
		.userImage{
			height: 200rpx;
			width: 200rpx;
			border: 1rpx solid #000;
			border-radius: 50%;
		}
		.text{
			font-size: 50rpx;
			text-align: center;
		}
	}
	.mine{
		padding: 20rpx;
		border-bottom: 50rpx solid #9BAAD1;
		font-size: 40rpx;
		.Mleft{
			image{
				margin: 0 30rpx;
				height: 80rpx;
				width: 80rpx;
				border-radius: 50%;
				border: 1rpx solid #000;
			}
		}
		.Mright{
			text{
				margin-right: 30rpx;
			}
		}
	}
	.rankList{
		border-bottom: 1rpx solid #000;
		.rankItem{
			font-size: 40rpx;
			border-top: 1rpx solid #000;
			padding: 20rpx;
			.Mleft{
				image{
					margin: 0 30rpx;
					height: 80rpx;
					width: 80rpx;
					border-radius: 50%;
					border: 1rpx solid #000;
				}
			}
			.Mright{
				text{
					margin-right: 30rpx;
				}
			}
		}
		:nth-child(2n){
			animation-name: fadeInLeft;
			animation-duration: .5s;
		}
		:nth-child(2n+1){
			animation-name: fadeInRight;
			animation-duration: .5s;
		}
	}
</style>
