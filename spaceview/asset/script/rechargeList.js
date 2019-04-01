$(document).bind("plusready",function(){
	//定义请求地址
	var rechargeListUrl = mainUrl + "user/getrecharge";
	
	//发起请求
	requestToken(rechargeListUrl,"get",{},function(data){
		if(data.code == 1){
			var recharList = data.data;
			if(recharList.length){
				for(var i=0;i<recharList.length;i++){
					$("#rechargeListUl").append('<li class="rechargeItem" data-contId="'+recharList[i].id+'"><h1>充值</h1><div class="detailListTitle"><span>数量</span><span>状态</span><span>时间</span></div><div class="detailListValue"><span>'+recharList[i].amount+'</span><span>已完成</span><span>'+SwitchTime(recharList[i].createtime)+'</span></div></li>');
				}
				//为所有的充值记录添加事件
				$(".rechargeItem").bind("tap",function(){
					//获取自定义属性
					var liDomId = $(this).attr("data-contId");
					goView("rechargeContent.html","rechargeContent",{spaceValue:"true",contid:liDomId});
				});
			}else{
				$("#rechargeListUl").append('<div class="ListNotData">没有数据！</div>');
			}
		}else{
			toast(data.msg);
		}
	});
});
