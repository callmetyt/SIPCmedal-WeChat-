const config=require('../config/config.json')

module.exports=function getRank(vm){
	uni.request({
		url:`${config.serverAddress}${config.route}/getRank`,
		method:'GET',
		dataType:'json',
		success({data}) {
			console.log(data)
			if(data.status){
				vm.list=[];
				//生成排名数据，找到用户自己的数据
				data.res.forEach((item,index,array)=>{
					array[index].rankNum=index+1;
					if(item.userId===vm.userId){
						vm.userData.userName=item.userName;
						vm.userData.medalNum=item.medalNum;
						vm.userData.rankNum=index+1;
						vm.userData.avatar=item.avatar
					}
					//延迟插入 动画效果
					setTimeout(()=>{
						vm.list.push(item)
					},(index+1)*500)
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