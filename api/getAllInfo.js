const config=require('../config/config.json')

module.exports=function getAllInfo(data,vm){
	uni.request({
		url:`${config.serverAddress}${config.route}/getAllInfo`,
		method:'POST',
		data,
		dataType:'json',
		success({data}) {
			console.log(data)
			if(data.status){
				vm.userData=data.res
			}else{
				console.log(data.msg)
			}
		},
		fail(err) {
			console.log(err)
		}
	})
}