const config=require('../config/config.json')

module.exports=function getBaseInfo(data,vm){
	uni.request({
		url:`${config.serverAddress}${config.route}/getBaseInfo`,
		data,
		method:'POST',
		dataType:'json',
		success({data}) {
			console.log(data)
			if(data.status){
				vm.userName=data.res.userName;
				vm.medalNum=data.res.medalNum;
				vm.rankNum=data.res.rankNum;
				vm.avatar=data.res.avatar
			}else{
				uni.clearStorageSync('token')
				vm.modalMsg=data.msg
				vm.$refs.modal.showModal()
			}
		},
		fail(err) {
			console.log(err)
		}
	})
}