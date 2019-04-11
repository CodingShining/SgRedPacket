$(document).bind("plusready",function(){
	//获取页面传递值
	var thisValue1 = plus.webview.currentWebview().IdValue;
	
	//发起请求获取订单信息
	var payMesageUrl = mainUrl + "trade/detail"; 
	
	//定义撤销接口
	var clanerUrl = mainUrl + "trade/back";
	
	//定义提交接口
	var paySubmintUrl = mainUrl + "trade/completing";
	
	//定义获取图片接口
	var getPayImgUrl = mainUrl + "obs/img";
	
	//发起请求
	requestToken(payMesageUrl,"get",{id:thisValue1},function(data){
		var dataValue = data.data;
		var payTypeName = "";
		var statusText = "";
		
		
		
		$(".payImgBox>img").attr({src:ImgUrl+dataValue.img});
		
		switch(dataValue.pay_type){
			case 1:
				payTypeName = "微信支付";
			break;
			case 2:
				payTypeName = "支付宝";
			break;
			case 3:
				payTypeName = "银行卡";
			break;
		}
		
		switch(dataValue.status){
			case 0:
				statusText="等待汇款";
				$("#payContRep").show();
			break;
			case 1:
				statusText = "交易完成";
				getPayImgFun();
				$(".payImgBox").show();
			break;
			case 2:
				statusText = "确认收款";
				getPayImgFun();
				$(".payImgBox").show();
				$("#payContSubmit").show();
			break;
			case -1:
				statusText = "已撤销";
			break;
		}
		$("#orderStatus").text(statusText);
		$("#orderAdata1").text(dataValue.buyusername);
		$("#orderAdata2").text(dataValue.buyremarks);
		$("#orderAdata3").text(dataValue.buyrealname);
		$("#orderAdata4").text(dataValue.buymobile);
		$("#orderAdata5").text(dataValue.price);
		$("#orderBdata1").text(dataValue.sellrealname);
		$("#orderBdata2").text(dataValue.sellmobile);
		$("#orderBdata3").text(payTypeName);
		$("#orderBdata4").text(dataValue.account);
		$("#orderBdata5").text(dataValue.sellnum);
	});
	
	//为提交按钮绑定事件
	$("#payContSubmit").bind("tap",function(){
	 	requestToken(paySubmintUrl,"get",{id:thisValue1},function(data){
	 		if(data.code == 1){
	 			toast(data.msg);
	 			resLoadParent();
	 			BackView();
	 		}else{
	 			toast(data.msg)
	 		}
	 	});
	});

	
	//为撤销按钮绑定事件
	$("#payContRep").bind("tap",function(){
		requestToken(clanerUrl,"get",{id:thisValue1},function(data){
			if(data.code == 1){
				toast(data.msg);
				resLoadParent();
				BackView();
			}else{
				toast(data.msg);
			}
		});
	});
	
	//封装函数
	function getPayImgFun(){
		requestToken(getPayImgUrl,"get",{id:thisValue1},function(data){
			if(data.code == 1){
				$(".payImgBox>img").attr({src:data.msg});
			}else{
				toast(data.msg);
			}
		});
	}
		
});
