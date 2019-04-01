$(document).bind("plusready",function(){
	//定义请求
	var tanKingUrl = mainUrl + "user/getrankinglist";
	
	//发起请求
	requestToken(tanKingUrl,"get",{},function(data){
		if(data.code == 1){
			var list = data.data.data;
			if(list.length){
				for(var i=0;i<list.length;i++){
					if(i == 0){
						$(".gameRankingUl").append('<li><span style="width:20%" class="number_1">1</span><span style="width:50% text-align:center">'+list[i].nickname+'</span><span style="width:30%">'+SwitchDay(list[i].createtime)+'</span></li>');
						continue;
					}else if(i == 1){
						$(".gameRankingUl").append('<li><span style="width:20%" class="number_2">2</span><span style="width:50% text-align:center">'+list[i].nickname+'</span><span style="width:30%">'+SwitchDay(list[i].createtime)+'</span></li>');
						continue;
					}else if(i == 2){
						$(".gameRankingUl").append('<li><span style="width:20%" class="number_3">3</span><span style="width:50% text-align:center">'+list[i].nickname+'</span><span style="width:30%">'+SwitchDay(list[i].createtime)+'</span></li>');
						continue;
					}
					$(".gameRankingUl").append('<li><span style="width:20%">'+(i+1)+'</span><span style="width:50% text-align:center">'+list[i].nickname+'</span><span style="width:30%">'+SwitchDay(list[i].createtime)+'</span></li>');
				}
			}else{
				$(".gameRankingUl").html('<div class="ListNotData">没有数据</div>');
			}
		}else{
			toast(data.msg);
		}
	});
});
