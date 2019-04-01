$(document).bind("plusready",function(){
	//获取页面数据
	var giftsContId = plus.webview.currentWebview().contid;
	
	//定义请求接口
	var giftsContUrl = mainUrl + "user/getrecorddetail";
	
	//发起请求
	requestToken(giftsContUrl,"get",{id:giftsContId},function(data){
		if(data.code == 1){
			//渲染数据
			$("#giftsContAmount").text(data.data.amount);
			$("#giftsContMan").text(data.data.fromuser);
			$("#giftsContTime").text(SwitchTime(data.data.createtime));
		}else{
			toast(data.msg);
		}
	});
});
