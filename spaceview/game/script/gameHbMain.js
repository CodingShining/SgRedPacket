$(document).bind("plusready",function(){
	
	//获取房间ID
	var roomIdValue = plus.webview.currentWebview().roomIdValue;
	
	//获取房间名称
	var roomTitleName = plus.webview.currentWebview().roomTitle;
	
	//获取房间人数
	var roomPerson = plus.webview.currentWebview().roomNum;
	
	//获取房间发包开关
	var toggleVar = plus.webview.currentWebview().toggle;
	
	$("#gameRoomNum").text(roomTitleName);
	
	$("#gameRoomPerson").text(roomPerson);
	
	//获取用户id
	var userIDName = getUserInfo();
	
	var userID = userIDName.id;

	//旋转值
	var ImgDegValue = 0;
	
	//定时器
	var OutTime = null;
	
	var SendTime = null;
	
	//保存红包ID
	var HbIdName = "";
	
	//保存红包状态
	var returnValue = "";
	
	//调用设置高度函数
 	setDomHeight();
 	
 	//定义绑定用户接口
 	var bindUserUrl = mainUrl + "Hbgame/bind";
 	
 	//定义红包状态接口
 	var getHbStus = mainUrl + "hbgame/hbstatus";
 	
 	//定义打开红包接口
 	var openHbUrl = mainUrl + "hbgame/getpacket";
 	
 	//定义获取用户余额接口
 	var userBalanceUrl = mainUrl + "user/getbalance";
 	
 	
 	//定义全局websoket全局变量
 	var ws = null;
 	
 	//获取用户余额数据
 	requestToken(userBalanceUrl,"get",{},function(data){
 		if(data.code == 1){
 			$("#userBalean").text(data.data.ptb);
 		}else{
 			
 		}
 	});
 	
 	//调用推送
 	webSket();
 	
 	//为返回按钮绑定事件
 	$("#gameHbBack").bind("tap",function(){
 		ws.close();
 	});
 	
 	//为红包列表中的红包绑定事件
 	$(".gameHbMainItem").bind("tap",function(){
 		$(".haveHb").show();
 	});
 	
 	//为关闭红包绑定事件
 	$("#cleatHb1>img").bind("tap",function(){
 		$(".haveHb").hide();
 	});
 	
 	//为关闭红包绑定事件
 	$("#cleatHb2>img").bind("tap",function(){
 		$(".notHb").hide(); 
 	});
 	
 	//为关闭红包绑定事件
 	$("#cleatHb3>img").bind("tap",function(){
 		$(".overHb").hide();
 	});
 	
 	//查看结果
 	$(".HbResultBur>span").bind("tap",function(){
 		$(".notHb").hide();
 		$(".overHb").hide();
 		//前往结果
 		goView("gameHbResult.html","gameHbResult",{spaceValue:"true",hbId:HbIdName});
 	});
 	
 	//为发红包绑定事件
 	$(".gameHbBottomItem2>a").bind("tap",function(){
 		if(toggleVar){
 			toast("福利房间不允许发包");
 			return;
 		}
 		goView("gameHbGive.html","gameHbGive",{spaceValue:"true",roomId:roomIdValue});
 	});
 	
 	//为客服绑定事件
 	$(".gameHbMainServer").bind("tap",function(){
   		goView("../else/serverUser.html","serverUser",{spaceValue:"true"});
 	});
 	
 		//为点击开红包绑定事件
 	$(".gameFloatCont1_Item4>img").bind("tap",function(){
 		if(OutTime){
 			return;
 		}
 		var thisObj  = $(this);
 		OutTime = setInterval(function(){
 			ImgDegValue = ImgDegValue+4;
 			thisObj.css({transform:"rotateY("+ImgDegValue+"deg);"});
 			if(ImgDegValue > 360){ 
 				clearInterval(OutTime);
 				OutTime = null;
 				ImgDegValue = 0; 
 			}
 		},1);
 		
 		//发起请求
 		window.setTimeout(function(){
 			requestToken(openHbUrl,"get",{id:HbIdName},function(data){
	 			if(data.code == 1){
	 				payAudio();
	 				$(".haveHb").hide();
	 				opHbValue(HbIdName);
	 			}else{
	 				toast(data.msg);
	 				$(".haveHb").hide();
	 			}
 			});
 		},800);
 	});
 	
	//封装函数设置元素高度
	function setDomHeight(){
		//获取高度
		var heig1 = $(window).height();  //页面总高度
		var heig2 = $(".spaceHeadBox").height(); //标题高度
		var heig3 = $(".gameHbMainNotice").height();  //公告高度
		var heig4 = $(".gameHbMainBottom").height();  //底部高度
		var heightPu = heig1-heig2-heig3-heig4;
		//设置主体高度
		$(".gameHbMainBody").css({height:heightPu+"px"});	
	}
	
	
	//定义推送函数
	function webSket(){
		clearInterval(SendTime);
		//获取游戏状态
		ws = new WebSocket("ws://47.92.174.226:2346");
		
		ws.onopen = function() {
			SendTime = window.setInterval(function(){
				ws.send(100);
			},50000);
		};
		
		ws.onmessage = function(e){
			var DataValue = e.data;
			DataValue = JSON.parse(DataValue);
			if(DataValue.code == 9002){
				var userId = DataValue.data.client_id;
				requestToken(bindUserUrl,"get",{room_id:roomIdValue,client_id:userId},function(data){
					if(data.code != 1){
						toast(data.msg);
						BackView();
					}else if(data.code == 1){
						$("#gameHbMark").text(data.data);
					}
				});
			}else if(DataValue.code == 9000){
				var HbValue = DataValue.data;
				var HbId = HbValue.uid;
				
				//调用声音
				payHbAudio();
				
				//其他用户红包
				$(".gameHbBodyUl").append('<li><div class="gameUserHead gameItemLeft"><img src="'+ImgUrl+HbValue.headimg+'"/></div><div data-userOdd="'+HbValue.odds+'" data-userMark="'+HbValue.mark+'" data-userNum="'+HbValue.number+'" data-money="'+HbValue.money+'" data-userName="'+HbValue.nickname+'" data-userIm="'+HbValue.headimg+'" data-idName="'+HbValue.id+'" class="gameHbMainItem gameItemLeft gameHbBG1Left"><div class="gameHbCont1"><div><img src="img/hbitemIcon.png"></div><div><span><i>'+HbValue.money+'</i>/<i>'+HbValue.number+'</i>个</span><span>游戏红包</span></div></div><div class="gameHbCont2"><span>雷号：<i>'+HbValue.mark+'</i></span><span>赔率：<i>'+HbValue.odds+'</i>倍</span></div></div><div class="userNick">'+HbValue.nickname+'</div></li>');
				//滚动滚轴到最低端
				MoveScroll();
				
				//为红包列表中的红包绑定事件
			 	$(".gameHbMainItem").bind("tap",function(){
			 		//保存Dom对象
			 		var thisObj = $(this);
			 		//获取红包ID
			 		var hbId = $(this).attr("data-idName");  //获取红包ID
			 		HbIdName = $(this).attr("data-idName");  //获取红包ID
			 		
			 		//获取用户信息
			 		var userHeadImg = $(this).attr("data-userIm");  //获取头像
			 		var userName = $(this).attr("data-userName");  //获取昵称
			 		
			 		//获取红包信息
			 		var HbMsgMoney = $(this).attr("data-money");  //获取红包金额
			 		var HbMsgNumber = $(this).attr("data-userNum");  //获取红包数量
			 		var HbMsgMark = $(this).attr("data-userMark");  //获取红包雷号
			 		var HbMsgOds = $(this).attr("data-userOdd");  //获取红包倍数
			 		
			 		$(".gameUserMes1").attr({src:ImgUrl+userHeadImg}); //设置红包头像
			 		$(".gameUserMes2").text(userName);  //设置用户名称
			 		$(".gameUserMes3").text(HbMsgNumber);  //设置红包个数
			 		$(".gameUserMes4").text(HbMsgOds); //设置红包倍数
			 		
			 		requestToken(getHbStus,"get",{id:hbId},function(data){
			 			 if(data.code == 1){
			 			 	var stustValue = data.data.status;
			 			 	if(stustValue == 0){
			 			 		thisObj.removeClass("gameHbBG1Left").addClass("gameHbBG2Left");
			 			 		thisObj.find(".gameHbCont1>div>img").attr({src:"img/hbitemIcon2.png"});
			 			 	}else if(stustValue == 1){
			 			 		thisObj.removeClass("gameHbBG1Left").addClass("gameHbBG2Left");
			 			 		thisObj.find(".gameHbCont1>div>img").attr({src:"img/hbitemIcon2.png"});
			 			 	}else if(stustValue == 2){
			 			 		thisObj.find(".gameHbCont1>div>img").attr({src:"img/hbitemIcon2.png"});
			 			 		thisObj.removeClass("gameHbBG1Left").addClass("gameHbBG2Left");
			 			 	}
			 			 }else{
			 			 	toast(data.msg);
			 			 }
					});
			 		
			 		opHbValue(hbId);
			 		 
			 	});
				 
			}else if(DataValue.code == 9001){
				var Person = DataValue.data;
				$("#gameRoomPerson").text(Person);
				resLoadParent();
			}
		};
		
		ws.onclose = function(){
			BackView();
		}
	}
	
	//封装函数打开红包后的结果
	function opHbValue(idValue){
		requestToken(getHbStus,"get",{id:idValue},function(data){
			if(data.code == 1){
				var stustValue = data.data.status;
				if(stustValue == 0){
					//抢红包
					$(".haveHb").show();
					returnValue = "1";
				}else if(stustValue == 1){
					var MoneyValue = data.data.hblist.money;
					$("#getHbMoney").text(MoneyValue);
					//看结果
					$(".notHb").show();
					returnValue = "0";
				}else if(stustValue == 2){
					//收起太差
					$(".overHb").show();
					returnValue = "0";
				}
			}else{
				toast(data.msg);
			}
		});
	}
	
	//控制声音
	function payAudio(){
		//获取声音控件
		var Aido = document.getElementById("audioObj");
		Aido.play();
	}
	
	function payHbAudio(){
		//获取声音控件
		var Aido1 = document.getElementById("audioObj1");
		Aido1.play();
	}
	
	//控制滚轴
	function MoveScroll(){
		//获取最后一个元素的高度
	 	for(var i=0;i<$(".gameHbBodyUl>li").length;i++){
	 		if(i == $(".gameHbBodyUl>li").length-1){
	 			var Value = $(".gameHbBodyUl>li").eq(i).offset().top;
	 			scrollHeight = Value;
	 		}else{
	 			continue;
	 		}
	 	}
	 	var UlObj = document.getElementsByClassName("gameHbBodyUl")[0];
	 	UlObj.scrollIntoView(false);
	}
	
});
