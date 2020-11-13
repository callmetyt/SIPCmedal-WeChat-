const config=require('../config/config.json')

module.exports=function getDetailMsg(data,vm){
	uni.request({
		url:`${config.serverAddress}${config.route}/getDetailMsg`,
		data,
		dataType:'json',
		method:'POST',
		success({data}) {
			console.log(data)
			if(data.status){
				vm.msgInfo=data.res
			}else{
				console.log(data.msg)
			}
		},
		fail(err) {
			console.log(err)
		}
	})
}