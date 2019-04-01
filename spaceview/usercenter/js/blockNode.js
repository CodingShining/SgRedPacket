$(document).bind("plusready",function(){
	//定义接口
	var blockUrl = mainUrl + "game/qkjd";
	
	//发起请求获取数据
	requestToken(blockUrl,"get",{},function(data){
		if(data.code == 1){
			$("#investedData1").text(data.data.total_point);
			var list = data.data.list;
			if(list.length){
				for(var i=0;i<list.length;i++){
					$("#investedListBox").append('<tr><td><span>'+list[i].time+'</span></td><td>'+list[i].title+'</td><td>'+list[i].moneys+'</td><td>'+list[i].fromuser+'</td></tr>');
				}
			}else{
				toast("暂无数据");
			}
		}else{
			toast(data.msg);
		}
	});
	
});
