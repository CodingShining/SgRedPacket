$(document).bind("plusready",function(){
	//获取页面传递值
	var viewData = plus.webview.currentWebview().adId;
	
	//定义请求数据地址
	var outListDataUrl = mainUrl + "trade/orderList";
	
	//发起请求渲染列表
	requestToken(outListDataUrl,"get",{id:viewData},function(data){
		if(data.code == 1){
			var list = data.data;
			if(list.length){
				 for(var i=0;i<list.length;i++){
				 	var statusValue = "";
				 	var statusColor = "";
				 	var toggle = "";
				 	switch(list[i].status){
				 		case 0:
				 			statusValue = "等待付款";
				 			toggle = "1";
				 			statusColor = "stateColor_1";
				 		break;
				 		case 1:
				 			statusValue = "已完成";
				 			toggle = "2";
				 			statusColor = "stateColor_3";
				 		break;
				 		case 2:
				 			statusValue = "等待收款";
				 			toggle = "3"
				 			statusColor = "stateColor_2";
				 		break;
				 		case -1:
				 			statusValue = "已撤销";
				 			toggle = "4";
				 			statusColor = "stateColor_4";
				 		break;
				 	}
				 	$(".spaceContentBox").append('<div data-toggle="'+toggle+'" data-Value1="'+list[i].pid+'" data-Value2="'+list[i].id+'" class="outListItem"><div class="outListHead"><span>编号：<i>'+list[i].sNo+'</i></span><span><a class="'+statusColor+'">'+statusValue+'</a></span></div><div class="outNumberBox"><div class="outListNumb"><span style="color:#f6ab10;">'+list[i].total_money+'</span><span style="color:#f6ab10;">'+list[i].num+'</span></div><div class="outListNumb"><span style="color:#9798a8;">总额(CNY)</span><span style="color:#9798a8;">数量</span></div></div><div class="outListMes"><div class="outListMesItem"><span>类型：</span><span>买入</span></div><div class="outListMesItem"><span>日期：</span><span>'+list[i].time+'</span></div></div></div>');
				 }
				 //为各个Item添加事件
				 $(".outListItem").bind("tap",function(){
				 	//获取自定义属性
				 	var value1 = $(this).attr("data-Value1");
				 	var value2 = $(this).attr("data-Value2");
				 	var toggleValue = $(this).attr("data-toggle");
				 	//前往页面
				 	goView("affirmMoney.html","affirmMoney",{spaceValue:"true",idValue1:value1,idValue2:value2,toggle:toggleValue});
				 });
			}else{
				$(".spaceContentBox").html('<div class="ListNotData">暂无交易！</div>');
			}
		}else{
			toast(data.msg);
		}
	});
	
});
