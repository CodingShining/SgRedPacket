$(document).bind("plusready",function(){
	//接收页面传递参数
	var thisData = plus.webview.currentWebview().IdValue;
	
	
	//定义数据接口
	var outContData = mainUrl + "trade/detail";
	
	//保存广告ID纸
	var adbIdValue = -1;
	
	//发起请求渲染数据
	requestToken(outContData,"get",{id:thisData},function(data){
		if(data.code == 1){
			var payType = "";
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
			$("#outContData1").text(data.data.total_money);  //总额
			$("#outContData2").text(data.data.trade_num);  //交易笔数
			$("#outContData3").text(data.data.num);  //交易数量
			$("#outContData4").text(data.data.overnum);  //剩余数量
			$("#outContData5").text(payType);  //支付方式
			$("#outContData6").text(data.data.account);  //收款账号
			$("#outContData7").text(data.data.remarks);  //备注
			$("#outContData8").text(data.data.real_name);  //收款姓名
			$("#outContData9").text(data.data.mobile);  //联系电话
			$("#outContData10").text(data.data.price);  //单价
			$("#outContData11").text(data.data.num); //数量
			adbIdValue = data.data.id; 
		}else{
			toast(data.msg);
		}
	});
	
	//为复制按钮绑定事件
	$(".outContCpy").bind("tap",function(){
		//获取值
		var textValue = $("#outContData6").text(); 
		copyText(textValue);
	});
	
	//为撤销广告绑定事件
	$("#outContBut1").bind("tap",function(){
		var urlValue = mainUrl + "trade/back";
		//发起请求
		requestToken(urlValue,"get",{id:thisData},function(data){
			if(data.code == 1){
				toast(data.msg);
				window.location.reload();
			}else{
				toast(data.msg);
			}
		});
	});
	
	//为广告交易列表按钮绑定事件
	$("#outContBut2").bind("tap",function(){
		//判断id是否有值
		if(adbIdValue < 0){
			toast("请获取完整的广告信息！");
			return;
		}
		goView("outList.html","outList",{spaceValue:"true",adId:adbIdValue});
	});
	
});
