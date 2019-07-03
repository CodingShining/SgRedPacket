$(document).bind("plusready",function(){
	//定义接口地址
	var orderListData = mainUrl + "trade/orders";
	
	//保存请求类型
	var getType = 0;
	
	getOrderList(getType);
	
	//为菜单绑定事件
	$(".orderListNav>span").bind("tap",function(){
		for(var i=0;i<3;i++){
			$(".orderListNav>span").eq(i).removeClass("oderNavSelect");
		}
		$(this).addClass("oderNavSelect");
		
		//获取自定义属性
		var thisValue = $(this).attr("data-type");
		switch(thisValue){
			case "1":
				getType = 0;
				getOrderList(getType);
			break;
			case "2":
				getType = 1;
				getOrderList(getType);
			break;
			case "3":
				getType = -1;
				getOrderList(getType);
			break;
		}
	});
	
	//定义请求函数
	function getOrderList(typeValue){
		$(".orderListContBox").html("");
		//发起请求
		requestToken(orderListData,"get",{type:typeValue},function(data){
			if(data.code == 1){
				 var list = data.data;
				 if(list.length){
				 	for(var i=0;i<list.length;i++){
				 		var type = list[i].trade_type;
				 		var stateText = "";
				 		var typeTexe = "";
				 		if(list[i].status == 0){
				 			stateText = "进行中";
				 			stateValue = "1"
				 		}else if(list[i].status == 1){
				 			stateText = "已完成";
				 			stateValue = "2"
				 		}else if(list[i].status == -1){
				 			stateText = "已撤销";
				 			stateValue = "3";
				 		}
				 		switch(type){
				 			case 1:
				 				$(".orderListContBox").append('<div class="orderListItem_1"><div class="orderItemHead"><span>编号：<i>'+list[i].sNo+'</i></span><span><a data-idValue="'+list[i].id+'" class="orderItemBut_1">详情</a></span></div><div class="orderItemNumber_1"><div class="orderNumbItem_1"><span class="numbColor_1"><i>'+list[i].total_money+'</i>/<i>'+list[i].trade_num+'</i></span><span class="numbColor_1"><i>'+list[i].num+'</i>/<i>'+list[i].overnum+'</i></span></div><div class="orderNumbItem_1 numberBorder"><span>总额(CNY)/交易(笔)</span><span>数量/剩余</span></div></div><div class="orderMessage"><span>类型：</span><span style="color:#f6ab10">买入</span></div><div class="orderMessage"><span>状态：</span><span style="color:#e04546">'+stateText+'</span></div><div class="orderMessage"><span>日期：</span><span>'+list[i].time+'</span></div>');
				 			break;
				 			case 2:
				 				$(".orderListContBox").append('<div class="orderListItem_1"><div class="orderItemHead"><span>编号：<i>'+list[i].sNo+'</i></span><span><a data-statusValue="'+stateValue+'" data-idValue="'+list[i].id+'" class="orderItemBut_2">详情</a></span></div><div class="orderItemNumber_1"><div class="orderNumbItem_1"><span class="numbColor_1">'+list[i].total_money+'</span><span class="numbColor_1">'+list[i].num+'</span></div><div class="orderNumbItem_1 numberBorder"><span>总额(CNY)</span><span>数量</span></div></div><div class="orderMessage"><span>类型：</span><span style="color:#f6ab10">出售</span></div><div class="orderMessage"><span>状态：</span><span style="color:#e04546">'+stateText+'</span></div><div class="orderMessage"><span>日期：</span><span>'+list[i].time+'</span></div></div>');
				 			break;
				 		}
				 	}
				 	
				 	$(".orderItemBut_1").bind("tap",function(){
				 		//获取id值
				 		var idValue = $(this).attr("data-idValue");
				 		//前往页面
				 		goView("outCont.html","outCont",{spaceValue:"true",IdValue:idValue});
				 	});
				 	
				 	$(".orderItemBut_2").bind("tap",function(){
				 		//获取id值
				 		var idValue = $(this).attr("data-idValue");
				 		//获取状态值
				 		var statsValue = $(this).attr("data-statusValue");
				 		//前往页面
				 		goView("payCont.html","payCont",{spaceValue:"true",IdValue:idValue,TypeValue:"1",status:statsValue});
				 	});
				 }else{
				 	$(".orderListContBox").html('<div class="ListNotData">暂无数据!</div>');
				 }
			}else{
				toast(data.msg);
			}
		});
	}
});
