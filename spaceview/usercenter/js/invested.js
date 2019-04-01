$(document).bind("plusready",function(){
	
	//定义数据接口
	var investedDataUrl = mainUrl + "game/records";
	
	//发起请求
	requestToken(investedDataUrl,"get",{},function(data){
		if(data.code == 1){
			$("#investedData1").text(data.data.total_bet);  //总收入
			$("#investedData2").text(data.data.total_point);  //总分红
			var listVlaue = data.data.list;
			if(listVlaue.length){
				for(var i=0;i<listVlaue.length;i++){
					$("#investedListBox").append('<tr><td><span>'+listVlaue[i].time+'</span></td><td>'+listVlaue[i].title+'</td><td>'+listVlaue[i].moneys+'</td><td>+'+listVlaue[i].fh+'</td></tr>');
				}
			}else{
				$("#investedListBox").htm('<div class="ListNotData">没有数据！</div>');
			}
		}else{
			toast(data.msg);
		}
	});
});
