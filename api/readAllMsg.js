const config=require('../config/config.json')

module.exports=function readAllMsg(data,vm){
	let tmp=data;
	uni.request({
		url:`${config.serverAddress}${config.route}/readAllMsg`,
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
				//刷新数据
				let data2={
					userId:tmp.userId,
					token:tmp.token
				}
				vm.api.getAllMsg(data2,vm);
			}else{
				vm.$refs.tip.show({
					type:'error',
					msg:data.msg
				})
			}
		},
		fail(err) {
			console.log(err)
		}
	})
}