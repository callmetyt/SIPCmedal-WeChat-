const config=require('../config/config.json')

module.exports=function getMedalInfo(data,vm){
	uni.request({
		url:`${config.serverAddress}${config.route}/getMedalInfo`,
		data,
		dataType:'json',
		method:'POST',
		success({data}) {
			console.log(data)
			if(data.status){
				vm.medal=data.res
				vm.userName=data.userName
			}else{
				console.log(data.msg)
			}
		},
		fail(err){
			console.log(err)
		}
	})
}