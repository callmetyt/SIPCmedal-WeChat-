const config=require('../config/config.json')

module.exports=function setBaseInfo(data,vm){
	uni.request({
		url:`${config.serverAddress}${config.route}/setBaseInfo`,
		data,
		dataType:'json',
		method:'POST',
		success({data}) {
			console.log(data)
			if(data.status){
				vm.$refs.tip.show({
					type:'success',
					msg:data.msg
				})
			}else{
				vm.$refs.tip.show({
					type:'success',
					msg:data.msg
				})
			}
		},
		fail(err) {
			console.log(err)
		}
	})
}