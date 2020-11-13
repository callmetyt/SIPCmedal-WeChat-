const config=require('../config/config.json')

module.exports=function getAllMsg(data,vm){
	uni.request({
		url:`${config.serverAddress}${config.route}/getAllMsg`,
		data,
		dataType:'json',
		method:'POST',
		success({data}) {
			console.log(data)
			if(data.status){
				vm.list=[]
				data.res.forEach((item,index)=>{
					setTimeout(()=>{
						vm.list.push(item)
					},(index+1)*250)
				})
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