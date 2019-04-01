$(document).bind("plusready",function(){
	//获取页面数据
	var recharContId = plus.webview.currentWebview().contid;
	
	//定义请求接口
	var rechargeContUrl = mainUrl + "user/getrechargedetail";
	
	//发起请求
	requestToken(rechargeContUrl,"get",{id:recharContId},function(data){
		if(data.code == 1){
			//渲染数据
			$("#rechargeContAmount").text(data.data.amount);
			$("#rechargeContAddress").text(data.data.address);
			$("#rechargeContTixid").text(data.data.trade_id);
			$("#rechargeContTime").text(SwitchTime(data.data.createtime));
			if(data.data.currency_id == 1){
				$("#rechargeTypeMod").text("EOS");
			}else if(data.data.currency_id == 2){
				$("#rechargeTypeMod").text("XRP");
			}
			if(data.data.type == 1){
				$("#rechargeState").text("已完成");
			}else if(data.data.type == 0){
				$("#rechargeState").text("未到账");
			}
		}else{
			toast(data.msg);
		}
	});
});
