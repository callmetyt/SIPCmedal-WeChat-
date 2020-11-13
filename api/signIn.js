const config=require('../config/config.json')

module.exports=function signIn(data,vm){
	uni.request({
		url:`${config.serverAddress}${config.route}/signIn`,
		data,
		method:'POST',
		dataType:'json',
		fail(){
			console.log('request send fail')
		},
		success({data}) {
			console.log(data)
			if(data.status){
				uni.setStorageSync('token',data.token)
				uni.setStorageSync('userId',data.userId)
				uni.switchTab({
					url:'/pages/home/home',
					fail(err) {
						console.log(err)
					}
				})
			}else{
				vm.$refs.tip.show({
					type:'error',
					msg:data.msg
				})
			}
		}
	})
}