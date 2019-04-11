$(document).bind("plusready",function(){
	//定义接口
	var teamUrl = mainUrl + "user/myteam";
	
	//获取用户权限
	var getUserPor = mainUrl + "user/uinfo";
	
	//保存用户权限
	var userPor = "0";
	
	requestToken(getUserPor,"get",{},function(data){
		if(data.code == 1){
			var levelText = data.data.level;
			if(levelText == 2){
				userPor = "1";
			}
		}else{
			toast(data.msg);
		}
	});
	
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
			$(".teamMainList").append('<li data-userName="'+ArrayData[i].username+'"><span class="tapNum1">'+ArrayData[i].nickname+'</span><span class="tapNum1">'+ArrayData[i].level+'</span><span class="tapNum1">'+ArrayData[i].usernames+'</span><span style="text-align:right;"><a class="teamContBut" data-phone="'+ArrayData[i].username+'">转账</a></span></li>');
		}
		
		//为整个li绑定事件
		$(".teamMainList>li").bind("tap",function(e){
			var DomObj = e.target;
			var className = DomObj.className;
			if(className == "tapNum1"){
				if(userPor == "0"){
					return;
				}else if(userPor == "1"){
					var dataAjax = $(DomObj).parent().attr("data-userName");
					//前往页面
					goView("../game/gameHbRecod.html","gameHbRecod",{spaceValue:"true",userName:dataAjax});
				}
			}else if(className == "teamContBut"){
				//获取电话号码
				var PhoneValue = $(DomObj).attr("data-phone");
				//前往赠送页面
				goView("../asset/gifts.html","gifts",{spaceValue:"true",viewData:PhoneValue});
			}
		});
		
	}
});
