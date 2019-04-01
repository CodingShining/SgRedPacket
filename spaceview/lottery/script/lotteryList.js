$(document).bind("plusready",function(){
	//定义接口
	var lotteryLisDataUrl = mainUrl + "game/fc3dLogs";
	
	//发起请求
	requestToken(lotteryLisDataUrl,"get",{},function(data){
		if(data.code == 1){
			var list = data.data.list;
			if(list.length){
				for(var i=0;i<list.length;i++){
					$(".lotteryListUl").append('<li><span>'+list[i].time+'</span><span style="text-align:center">'+list[i].title+'</span><span>'+list[i].number+'</span></li>');
				}
			}else{
				$(".lotteryListUl").html('<div class="ListNotData">没有数据！</div>');
			}
		}else{
			toast(data.msg);
		}
	});
});
