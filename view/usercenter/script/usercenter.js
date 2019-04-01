window.addEventListener("load",function(){
	document.addEventListener("plusready",function(){
		//获取当前页面
		var thisView = plus.webview.currentWebview();
		
		//开启下拉刷新
		thisView.setPullToRefresh({support:true,style:'circle',offset:'45px'}, getUserInfo);
		
		//定义请求地址
		var getUserLeve = mainUrl + "user/uinfo";
		
		getUserInfo();
		
		//渲染头像
		if(localStorage.getItem("kingHeadImg")){
			var userImgUrl = localStorage.getItem("kingHeadImg");
			userImgUrl = ImgUrl + userImgUrl
			$("#userCenterImg").attr({src:userImgUrl});
		}else{
			$("#userCenterImg").attr({src:"img/headimg.png"});
		}
		
		//为用户头部绑定事件
		$(".usercenterHeadBox").bind("tap",function(){
			goView("../../spaceview/usercenter/basicInfo.html","basicInfo",{spaceValue:"true"});
		});
		
		//为分红绑定事件
		$("#bonus").bind("tap",function(){
			goView("../../spaceview/usercenter/invested.html","invested",{spaceValue:"true"});
		});
		
		$("#adver").bind("tap",function(){
			goView("../../spaceview/order/orderList.html","orderList",{spaceValue:"true"});
		});
		
		//为区块节点绑定事件
		$("#blockNode").bind("tap",function(){
			goView("../../spaceview/usercenter/blockNode.html","blockNode",{spaceValue:"true"});
		});
		
		//为订单绑定事件
		$("#order").bind("tap",function(){
			goView("../../spaceview/asset/detail.html","detail",{spaceValue:"true",viewType:"0"});
		});
		
		//为团队绑定事件
		$("#team").bind("tap",function(){
			goView("../../spaceview/usercenter/team.html","team",{spaceValue:"true"});
		});
		
		//为安全设置绑定事件
		$("#safetyCenter").bind("tap",function(){
			goView("../../spaceview/usercenter/safeSet.html","safeSet",{spaceValue:"true"});
		});
		
		//为邀请好友绑定事件
		$("#invite").bind("tap",function(){
			goView("../../spaceview/usercenter/invitation.html","invitation",{spaceValue:"true"});
		});
		
		//为关于我们绑定事件
		$("#about").bind("tap",function(){
			goView("../../spaceview/usercenter/aboutUs.html","aboutUs",{spaceValue:"true"});
		});
		
		//为抽奖记录绑定事件
		$("#lotteryList").bind("tap",function(){
			goView("../../spaceview/lottery/lotteryList.html","lotteryList",{spaceValue:"true"});
		});
		
		//为抽奖结果绑定事件
		$("#lotteryResult").bind("tap",function(){
			goView("../../spaceview/lottery/lotteryResult.html","lotteryResult",{spaceValue:"true"});
		});
		
		//为我的红包绑定事件
		$("#hbRecod").bind("tap",function(){
			goView("../../spaceview/game/gameHbRecod.html","gameHbRecod",{spaceValue:"true"});
		});
		
		
		//封装请求
		function getUserInfo(){
			//发起请求获取leve
			requestToken(getUserLeve,"get",{},function(data){
				if(data.code == 1){
					//渲染用户名称
					$("#userCenterName").text(data.data.nickname);
					//渲染电话号码
					$("#userCenterId").text(data.data.mobile);
					//渲染等级名称
					$("#userCenterLevelText").text(data.data.level);
					//渲染等级图标
					switch(data.data.level){
						case "游客":
							$("#userCenterLevelImg").attr({src:"img/level_00.png"});
						break;
						case "会员":
							$("#userCenterLevelImg").attr({src:"img/level_01.png"});
						break;
						case "青铜":
							$("#userCenterLevelImg").attr({src:"img/level_02.png"});
						break;
						case "白银":
							$("#userCenterLevelImg").attr({src:"img/level_03.png"});
						break;
						case "黄金":
							$("#userCenterLevelImg").attr({src:"img/level_04.png"});
						break;
						case "铂金":
							$("#userCenterLevelImg").attr({src:"img/level_05.png"});
						break;
						case "钻石":
							$("#userCenterLevelImg").attr({src:"img/level_06.png"});
						break;
					}
					//判断是否为股东
					if(data.data.super == "股东"){
						$("#blockNode").show();
					}else{
						$("#blockNode").hide();
					}
					
					thisView.endPullToRefresh();
					
				}else{
					toast(data.msg);
					thisView.endPullToRefresh();
				}
			});
		}
	});
});