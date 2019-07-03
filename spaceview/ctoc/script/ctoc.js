$(document).bind("plusready",function(){
	
	//设定购买接口
	var ctocUrl = mainUrl +"trade/index";
	
	getCtocData();
	
	//获取页面对象
	var ctocView = plus.webview.currentWebview();
	
	//开启页面下拉刷新
	ctocView.setPullToRefresh({support:true,style:'circle',offset:'45px'},getCtocData);
	
	//为交易指南绑定事件
	$(".trading").bind("tap",function(){
		goView("../bulletin/tradingText.html","tradingText",{spaceValue:"true"});
	});
	
	//为发布广告绑定事件
	$("#issueBut").bind("tap",function(){
		goView("issue.html","issue",{spaceValue:"true"});
	});
	
	//为我的订单绑定事件
	$("#MyissueBut").bind("tap",function(){
		goView("../order/orderList.html","orderList",{spaceValue:"true"});
	});
	
	//定义获取卖单数据列表
	function getCtocData(){
		$(".ctocUl").html("");
		//发起请求
		requestToken(ctocUrl,"get",{},function(data){
			if(data.code == 1){
				$("#price").text(data.data.price);
				var list = data.data.list;
				if(list.length){
					for(var i=0;i<list.length;i++){
						$(".ctocUl").append('<li><span style="width:20%">'+list[i].username+'</span><span style="width:35%">'+list[i].totalnum+'</i></span><span style="width:25%;">'+list[i].sellnum+'</span><span style="width:20%;text-align:right"><a class="ctocCxBut" data-idValue="'+list[i].id+'">卖给他</a></span></li>');
					}
					//为所有的购买按钮绑定事件
					$(".ctocCxBut").bind("tap",function(){
						//获取id值
						var idVaule = $(this).attr("data-idValue");
						//前往页面
						goView("ctocin.html","ctocin",{spaceValue:"true",ctocId:idVaule});
					});
				}else{
					$(".ctocUl").html('<div class="ListNotData">没有记录</div>'); 
				}
				
				ctocView.endPullToRefresh();
			}else{
				ctocView.endPullToRefresh();
				toast(data.msg);
			}
		});
		
		getUpDataMes();
	}
	
	//下拉刷新需要执行的函数
	function getUpDataMes(){
		//发起请求
		var urlValue = mainUrl + "trade/orderTips";
		//发起请求
		requestToken(urlValue,"get",{},function(data){
			if(data.code == 1){
				if(data.data == 1){
					$(".ctocUpdata").show();
				}else if(data.data == 0){
					$(".ctocUpdata").hide();
				}
				ctocView.endPullToRefresh();
			}else{
				toast(data.msg);
				ctocView.endPullToRefresh();
			}
		});
	}
});
