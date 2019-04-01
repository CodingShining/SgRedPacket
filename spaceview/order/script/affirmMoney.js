$(document).bind("plusready",function(){
	//接受页面传递值
	var pidValue = plus.webview.currentWebview().idValue1;
	var idValue = plus.webview.currentWebview().idValue2;
	var toggleValue = plus.webview.currentWebview().toggle;
	
	if(toggleValue == "1"){
		
		$("#affirmBut1").hide();
		$("#affirmBut2").show();
		
	}else if(toggleValue == "2"){
		
		$("#affirmBut1").hide();
		$("#affirmBut2").hide();
		
	}else if(toggleValue == "3"){
		
		$("#affirmBut1").show();
		$("#affirmBut2").hide();
		
	}else if(toggleValue == "4"){
		
		$("#affirmBut1").hide();
		$("#affirmBut2").hide();
	}
	
	//定义订单详情的数据接口
	var getAffirmDataUrl = mainUrl + "trade/orderDetail";
	
	//定义订单确认收款接口
	var affirmMoneyUrl = mainUrl + "trade/completing";
	
	//定义撤销广告接口
	var affirmDeleteUrl = mainUrl + "trade/back";
	
	//保存id值
	var thisIDValue = 0;
	var thisSidValue = 0;
	
	//发起请求：
	requestToken(getAffirmDataUrl,"get",{id:idValue,pid:pidValue},function(data){
		if(data.code == 1){
			var statValue = "";
			var payType = "";
			
			thisIDValue = data.data.id;
			thisSidValue = data.data.sid;
			
			switch(data.data.status){
				case 0:
					statValue ="等待付款";
				break;
				case 1:
					statValue = "已完成";
				break;
				case 2:
					statValue = "等待收款";
				break;
				case -1:
					statValue = "已撤销";
				break;
			}
			
			switch(data.data.pay_type){
				case 1:
					payType = "微信支付";
				break;
				case 2:
					payType = "支付宝";
				break;
				case 3:
					payType = "银行卡";
				break;
			}
			
			$("#affData1").text(data.data.sNo);
			$("#affData2").text(statValue);
			$("#affData3").text(data.data.username);
			$("#affData4").text(payType);
			$("#affData5").text(data.data.price);
			$("#affData6").text(data.data.num);
			$("#affData7").text(data.data.total_money);
			
			if(data.data.img){
				var imgObj = document.createElement("img");
				imgObj.setAttribute("src",ImgUrl+data.data.img);
				$(".affirmImg").append(imgObj);
			}
			
		}else{
			toast(data.msg);
		}
	});
	
	//为确认收款按钮绑定事件
	$("#affirmBut1").bind("tap",function(){
		requestToken(affirmMoneyUrl,"get",{id:thisIDValue,sid:thisSidValue},function(data){
			if(data.code == 1){
				toast(data.msg);
				resLoadParent();
				reloadView("orderList");
				BackView();
			}else{
				toast(data.msg);
			}
		});
	});
	
	//为撤销广告订单绑定事件
	$("#affirmBut2").bind("tap",function(){
		requestToken(affirmDeleteUrl,"get",{id:thisIDValue,sid:thisSidValue},function(data){
			if(data.code == 1){
				toast(data.msg);
				resLoadParent();
				reloadView("orderList");
				BackView();
			}else{
				toast(data.msg);
			}
		});
	});
	
});
