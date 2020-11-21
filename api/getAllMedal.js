const config=require('../config/config.json')

module.exports=function getAllMedal(vm){
	uni.request({
		url:`${config.serverAddress}${config.route}/getAllMedal`,
		method:'GET',
		success({data}){
			console.log(data)
			if(data.status){
				vm.allMedalList=[...data.medalRes]
				vm.medalList=[...data.medalRes]
				vm.classList.length=1;
				data.classListRes.forEach((item)=>{
					vm.classList.push(item.name)
				})
			}else{
				console.log(data.msg)
			}
		},
		fail(err){
			console.log(err)
		}
	})
}