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
			$(".teamMainList").append('<li><span>'+ArrayData[i].usernames+'</span><span style="text-align:center">'+ArrayData[i].level+'</span><span>'+ArrayData[i].nickname+'</span><span>'+SwitchYeat(ArrayData[i].jointime)+'</span><span style="text-align:right;"><a class="teamContBut" data-phone="'+ArrayData[i].username+'">赠送</a></span></li>');
		}
		
		//为操作按钮绑定事件
		$(".teamContBut").bind("tap",function(){
			//获取电话号码
			var PhoneValue = $(this).attr("data-phone");
			//前往赠送页面
			goView("../asset/gifts.html","gifts",{spaceValue:"true",viewData:PhoneValue});
		});
	}
});
