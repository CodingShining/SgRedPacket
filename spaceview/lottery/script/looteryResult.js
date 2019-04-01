$(document).bind("plusready",function(){
	//定义接口
	var looteryResultUrl = mainUrl + "game/fc3dkjLogs";
	
	//发起请求
	requestToken(looteryResultUrl,"get",{},function(data){
		if(data.code == 1){
			var newlist = data.data.newkj;
			var newlistValue = newlist[0].number;
			$("#newlotteryRn").text(newlist[0].title);
			$("#newlotteryRm").text(newlist[0].moneys);
			newlistValue = newlistValue.split("-");
			for(var i=0;i<newlistValue.length;i++){
				$("#newlotteryRv>i").eq(i).text(newlistValue[i]);
			}
			
			var oldlist = data.data.list;
			if(oldlist.length){
				 for(var j=0;j<oldlist.length;j++){
				 	$(".lotterResultUl").append('<li><span>'+oldlist[j].time+oldlist[j].title+'</span><span style="text-align:center;color:#f6ab10">'+oldlist[j].number+'</span><span>'+oldlist[j].moneys+'</span></li>');
				 }
			}else{
				$(".lotterResultUl").html('<div class="ListNotData">没有数据！</div>');
			}
		}else{
			toast(data.msg);
		}
	});
});
