$(document).bind("plusready",function(){
	//定义接口
	var teamUrl = mainUrl + "user/myteam";
	
	//发起请求：
	requestToken(teamUrl,"get",{},function(data){
		plus.nativeUI.showWaiting();
		if(data.code == 1){
			//渲染用户上级
			$("#teamParent").text(data.data.parent);
			//渲染直推用户
			$("#teamZtCn").text(data.data.zt_cn);
			//渲染团队总人数
			$("#teamZdCn").text(data.data.td_cn);
			//渲染团队列表
			ApplyTeamList(data.data.td_list);
			plus.nativeUI.closeWaiting();
		}else{
			toast(data.msg);
			plus.nativeUI.closeWaiting();
		}
	});
	
	function ApplyTeamList(ArrayData){
		for(var i=0;i<ArrayData.length;i++){
			//定义图标类型
			var IconType = "";
			switch(ArrayData[i].level){
				case "游客":
					IconType = "imgs/level_00.png";
				break;
				case "会员":
					IconType = "imgs/level_01.png";
				break;
				case "青铜":
					IconType = "imgs/level_02.png";
				break;
				case "白银":
					IconType = "imgs/level_03.png";
				break;
				case "黄金":
					IconType = "imgs/level_04.png";
				break;
				case "铂金":
					IconType = "imgs/level_05.png";
				break;
				case "钻石":
					IconType = "imgs/level_06.png";
				break;
			}
			$("#teamListMain").append('<tr><td>'+ArrayData[i].username+'</td><td><img src="'+IconType+'" width="20px" alt=""><span>'+ArrayData[i].level+'</span></td><td><span>'+SwitchTime(ArrayData[i].jointime)+'</span></td></tr>');
		}
	}
});
