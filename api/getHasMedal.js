const config=require('../config/config.json')

module.exports=function getHasMedal(data,vm){
	uni.request({
		url:`${config.serverAddress}${config.route}/getHasMedal`,
		data,
		dataType:'json',
		method:'POST',
		success({data}) {
			console.log(data)
			if(data.status){
				let res=data.res;
				vm.userName=res.userName;
				vm.medalNum=res.medalNum;
				vm.rankNum=res.rankNum;
				vm.avatar=res.avatar;
				vm.medalList=res.medals;
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