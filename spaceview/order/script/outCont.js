$(document).bind("plusready",function(){
	
	//接收页面传递参数
	var thisData = plus.webview.currentWebview().IdValue;
	
	
	//定义数据接口
	var outContData = mainUrl + "trade/detail";
	
	//定义撤销接口
	var outClanerUrl = mainUrl + "trade/back";
	
	//发起请求渲染数据
	requestToken(outContData,"get",{id:thisData},function(data){
		 var dataValue = data.data;
		 
		 if(dataValue.backshow == 0){
		 	$("#outContBut1").hide();
		 }
 
		 $("#outContData1").text(dataValue.total_money);
		 $("#outContData2").text(dataValue.trade_num);
		 $("#outContData3").text(dataValue.num);
		 $("#outContData4").text(dataValue.overnum);
	});
	
	//为撤销广告绑定事件
	$("#outContBut1").bind("tap",function(){
		requestToken(outClanerUrl,"get",{id:thisData},function(data){
			if(data.code == 1){
				toast(data.msg);
				resLoadParent();
				BackView();
			}else{
				toast(data.msg);
			}
		});
	});
	
	//为广告交易列表按钮绑定事件
	$("#outContBut2").bind("tap",function(){
		goView("outList.html","outList",{spaceValue:"true",adId:thisData});
	});
	
});
