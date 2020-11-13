const config=require('../config/config.json')

module.exports=function setAvatar(data,vm){
	uni.chooseImage({
		count:1,
		success({tempFilePaths}) {
			//成功选择本地文件
			console.log(tempFilePaths)
			if(tempFilePaths.length){
				//上传本地文件
				uni.uploadFile({
					url:`${config.serverAddress}${config.route}/setAvatar`,
					filePath:tempFilePaths[0],
					formData:data,
					name:'file',
					success(){
						//上传提示
						vm.$refs.tip.show({
							type:'warning',
							msg:'上传成功后切换页面时会自动变更头像，请耐心等待',
							direction:'center',
							time:5000
						})
					},
					fail(err){
						console.log(err)
					}
				})
			}
		},
		fail(err){
			console.log(err)
		}
	})
}