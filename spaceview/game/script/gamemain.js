window.addEventListener("load",function(){
	document.addEventListener("plusready",function(){
		setTimeout(function(){
			plus.nativeUI.showWaiting();
		},1000);
		
		
		//定义请求
		var TimeUrl = mainUrl + "game/initialization";
		var lotterRequest =  mainUrl + "game/inFc3D";
		
		//保存时间
		var GameTimeDown = 0; 
		
		//判断是否开启倒计时
		var timeToggle = "0";

		 window.setInterval(function(){
		 	if(timeToggle == "0"){
		 		$("#gameTimeH_1").text("0");
		 		$("#gameTimeH_2").text("0");
		 		$("#gameTimeM_1").text("0");
		 		$("#gameTimeM_2").text("0");
		 		$("#gameTimeS_1").text("0");
		 		$("#gameTimeS_2").text("0");
		 	}else if(timeToggle == "1"){
		 		timer(GameTimeDown);
    			GameTimeDown--;
		 	}
	 		 
    	},1000);
			 
		
		//定义小键盘自增量和记住密码变量
		var safkeyUp = 0;
		var safkeyPw = "";
		
		//定义抽奖自增量与保存数组
		var lotteryUp = 0;
		var lotteryArray = "";
		
		//获取用户id
		var gameeUserLocal = getUserInfo();
		
		//定义判断选中inupt值
		var inpToggle = "";
		//判断使用哪个接口
		var UrlToggle = "";
		
		webSoketCont();
		
		//游戏说明添加事件
		$("#gameexplain").bind("tap",function(){
			//前往说明页面
			goView("gameexplain.html","gameexplain",{spaceValue:"true"});
		});
		
		//为游戏榜单添加事件
		$(".gameRanking").bind("tap",function(){
			goView("gameRanking.html","gameRanking",{spaceValue:"true"});
		});
		
		//为投入记录绑定事件
		$("#usergameData1").bind("tap",function(){
			goView("../usercenter/invested.html","invested",{spaceValue:"true"});
		});
		
		//为分红记录绑定事件
		$("#gameFinaBut2").bind("tap",function(){
			goView("recordcomm.html","recordcomm",{spaceValue:"true",toggle:"true"});
		});
		
		//为佣金绑定事件
		$("#gameFinaBut3").bind("tap",function(){
			goView("recordcomm.html","recordcomm",{spaceValue:"true"});
		});
		
		//为预约按钮绑定事件
		$("#gameYuyue").bind("tap",function(){
			//获取自定义属性
			var togg = $(this).attr("data-toggle");
			if(togg == "0"){
				toast("游戏已结束！等待下一轮");
				return;
			}
			//发起请求
			requestToken(mainUrl+"user/getbalance","get",{},function(data){
				if(!data.data.paypassword){
					toast("您还未设置交易密码！请设置交易密码");
					goView("../usercenter/forgetPwd.html","forgetPwd",{spaceValue:"true",viewType:"1"});
					return;
				}
				if(data.code == 1){
					$("#gameBaln1").text(data.data.yxb);
					$(".syyxb").text(data.data.yxb);
					$(".syptb").text(data.data.ptb);
				}else{
					toast(data.msg);
					return;
				}
			});
			$("#gameContMain1").show();
		});
		
		//为投入绑定事件
		$("#gameTouru").bind("tap",function(){
			//获取自定义属性
			var togg = $(this).attr("data-toggle");
			if(togg == "0"){
				toast("游戏已结束！等待下一轮。");
				return;
			}
			//发起请求
			requestToken(mainUrl+"user/getbalance","get",{},function(data){
				if(!data.data.paypassword){
					toast("您还未设置交易密码！请设置交易密码");
					goView("../usercenter/forgetPwd.html","forgetPwd",{spaceValue:"true",viewType:"1"});
					return;
				}
				if(data.code == 1){
					$("#gameBaln2").text(data.data.yxb);
					$(".syyxb").text(data.data.yxb);
					$(".syptb").text(data.data.ptb);
				}else{
					toast(data.msg);
					return;
				}
			});
			$("#gameContMain2").show();
			
		});
		
		
		//为预约增加添加事件
		$("#gamePusUp1").bind("tap",function(){
			//获取input值
			var values = $("#gameTouruInput1").val();
			values = toNumberFun(values)+10;
			$("#gameTouruInput1").val(values);
		});
		
		//为投入增加添加事件
		$("#gamePusUp2").bind("tap",function(){
			//获取input值
			var values = $("#gameTouruInput2").val();
			values = toNumberFun(values)+10;
			$("#gameTouruInput2").val(values);
		});
		
		//为预约减少添加事件
		$("#gamePusDown1").bind("tap",function(){
			//获取input值
			var values = $("#gameTouruInput1").val();
			if(values == "0" || !values){
				return;
			}
			values = toNumberFun(values)-10;
			$("#gameTouruInput1").val(values);
		});
		
		//为投入减少添加事件
		$("#gamePusDown2").bind("tap",function(){
			//获取input值
			var values = $("#gameTouruInput2").val();
			if(values == "0" || !values){
				return;
			}
			values = toNumberFun(values)-10;
			$("#gameTouruInput2").val(values);
		});
		
		//为确定投入按钮绑定事件
		$("#gameTouRuBut").bind("tap",function(){
			//获取输入框中的值
			var touRuValue = $("#gameTouruInput2").val();
			
			//判断
			if(!touRuValue){
				toast("请输入投入值！");
				return;
			}
			
			inpToggle = "1";
			UrlToggle = "1";
			
			//显示小键盘
			$(".safetyKey").css({bottom:"0px"});
			 
		});
		
		//为确定预约按钮绑定事件
		$("#gameYuyueBut").bind("tap",function(){
			//获取输入框中的值
			var touRuValue = $("#gameTouruInput1").val();
			
			//判断
			if(!touRuValue){
				toast("请输入投入值！");
				return;
			}
			
			inpToggle = "0";
			UrlToggle = "0";
			
			//显示小键盘
			$(".safetyKey").css({bottom:"0px"});
			 
		});
		
		//为前往充值绑定事件
		$(".gameGotoRechar").bind("tap",function(){
			GotoRechage();
		});
		
		//为小键盘取消按钮绑定事件
		$(".safetClean").bind("tap",function(){
			$(".safetyKey").css({bottom:"-450px"});
			gameClearInput();
		});
		
		//为小键盘上的按钮绑定事件
		$(".safetKeyItem").bind("tap",function(){
			if(safkeyUp == 6){
				return;
			}
			//获取字符
			var strCont = $(this).text();
			safkeyUp +=1;
			$(".mm").eq(safkeyUp-1).addClass("selectRadius");
			safkeyPw += strCont;
		});
		
		//为小键盘上你的删除按钮绑定事件
		$(".safetKeyDelete").bind("tap",function(){
			if(safkeyUp == 0){
				return;
			}
			//获取删除索引
			safkeyUp -= 1;
			$(".mm").eq(safkeyUp).removeClass("selectRadius");
			//删除密码
			var length = safkeyPw.length-1;
			safkeyPw = safkeyPw.substr(0,length);
		});
		
		//为确定按钮绑定事件
		$(".safetyKeyBut").bind("tap",function(){
			if(safkeyUp < 6){
				toast("请输入正确的支付密码！");
				return;
			}
			
			var inpuntValue = "";
			
			if(inpToggle == "0"){
				inpuntValue = $("#gameTouruInput1").val();
			}else if(inpToggle == "1"){
				inpuntValue = $("#gameTouruInput2").val();
			}
			
			//发起请求
			requestToken(mainUrl+"game/betting","get",{money:inpuntValue,paypwd:safkeyPw},function(data){
				if(data.code == 1){
					toast(data.msg);
					if(data.data.fc3d == 1){
						console.log("sss");
						$("#lotteryPerNumb").text(data.data.qishu);
						$(".lotteryMainBox").show();
					}
					gameClearInput();
				}else{
					toast(data.msg);
					gameClearInput();
				}
			});
		});
		
		//为抽奖数字按钮绑定事件
		$(".lotteryControlBox>span>i").bind("tap",function(){
			if(lotteryUp==3){
				return;
			}
			lotteryArray += $(this).text();
			$("#lotterTextBox").text(lotteryArray);
			lotteryUp +=1;
			
		});
		
		//为清空按钮绑定事件
		$("#lotterBut1").bind("tap",function(){
			lotteryUp = 0;
			lotteryArray ="";
			$("#lotterTextBox").text("");
		});
		
		//为抽奖确定按钮绑定事件
		$("#lotterBut2").bind("tap",function(){
			var lotteryValue = "";
			var lotteryValue_2 = null;
 			if(lotteryUp !=3){
 				toast("请选择三位抽奖号码！");
 				return;
 			}
 			
 			lotteryValue_2 = lotteryArray.split("");
			for(var g=0;g<lotteryValue_2.length;g++){
				lotteryValue += lotteryValue_2[g];
				lotteryValue += ",";
			}
			
			lotteryValue = lotteryValue.substr(0,lotteryValue.length-1);
			
			//发起请求
			requestToken(lotterRequest,"get",{str:lotteryValue},function(data){
				if(data.code == 1){
					toast(data.msg);
					$(".lotteryMainBox").hide();
				}else{
					toast(data.msg);
				}
			});

		});
		
		//为关闭抽奖绑定事件
		$(".lotteryClear").bind("tap",function(){
			lotteryUp = 0;
			lotteryArray = "";
			$("#lotterTextBox").text("");
			$(".lotteryMainBox").hide();
		});
		
		//为栏目中的取消按钮绑定事件
		$(".gameButclear").bind("tap",function(){
			$("#gameTouruInput1").val("");
			$("#gameTouruInput2").val("");
			$("#gameContMain1").hide();
			$("#gameContMain2").hide();
		});
		
		//为返回按钮绑定事件
		$("#kingGameBack").bind("tap",function(){
			plus.webview.currentWebview().hide();
		});
		
		//封装websoket
		function webSoketCont(){
			//获取游戏状态
			var ws = new WebSocket("ws://webst.kinsey.vip:2346");
			ws.onopen = function() {
			   ws.send(gameeUserLocal.id);
			};
			ws.onmessage = function(e) {
				plus.nativeUI.closeWaiting();
		 
			    var statObj = JSON.parse(e.data);
			    
			    if(statObj.title){	
			    	 //渲染标题
					$("#gameTitle").text(statObj.title);
			    }
			     
				if(statObj.bonus){
					//渲染奖金奖金
					$("#gameBalanZs").text(statObj.bonus);
				}
				 
				if(statObj.jc){
					//渲染3D奖池
					$("#game3dTitleCon").text(statObj.jc);
				}
				
				//渲染投入
				if(statObj.total_bet){
					$("#usergameData1").text(statObj.total_bet);
				}
				
				if(statObj.total_point){
					$("#usergameData2").text(statObj.total_point);
				}
				
				if(statObj.yu_proft){
					$("#usergameData4").text(statObj.yu_proft);
				}
				
			    GameTimeDown = statObj.overtime;
			    
			    if(statObj.yuyue ==1){
			    	$("#gameYuyue").attr({"data-toggle":"1"});
			    	$("#gameTouru").attr({"data-toggle":"0"});
			    	$(".gametitle").text("等待游戏开始...");
			    	$("#gameTouru").hide();
			    	$("#gameEnd").hide();
			    	$(".gameMesOutBox").hide();
			    	timeToggle="0";
			    }else if(statObj.yuyue == 0){
			    	$("#gameTouru").attr({"data-toggle":"1"});
			    	$("#gameYuyue").attr({"data-toggle":"0"});
			    	$(".gametitle").text("游戏结束倒计时");
			    	$("#gameTouru").show();
			    	$("#gameYuyue").hide();
			    	$("#gameEnd").hide();
			    	$(".gameMesOutBox").show();
			    	timeToggle = "1"
			    }else if(statObj.yuyue == 2){
			    	$("#gameYuyue").attr({"data-toggle":"0"});
			    	$("#gameTouru").attr({"data-toggle":"0"});
			    	$("#gameTouru").hide();
			    	$("#gameYuyue").hide();
			    	$(".gameMesOutBox").hide();
			    	timeToggle = "0";
			    }
			   
			   //判断是否进入游戏
			   if(statObj.flag == 0){
			   		$(".gametitle").text("游戏已结束");
			   		$("#gameYuyue").attr({"data-toggle":"0"});
			   		$("#gameTouru").attr({"data-toggle":"0"});
			   }
			   
			   var newList = statObj.list;
			   var outList = statObj.out;

			   if(newList){
			   		$("#gameNewMan").html("");
			   		for(var i=0;i<newList.length;i++){
			   			$("#gameNewMan").append(newList[i]+"&nbsp;&nbsp;&nbsp;&nbsp;");
			   		}
			   }
			   
			   if(outList){
			   		$("#gameOutMan").html("");
			   		for(var i=0;i<outList.length;i++){
			   			$("#gameOutMan").append(outList[i]+"&nbsp;&nbsp;&nbsp;&nbsp;");
			   		}
			    }
			};
			
			//当连接关闭时需要做的操作
			ws.onclose = function(){
				//关闭原始
				ws.close();
				webSoketCont();
			}
			
			ws.onerror = function(){
				plus.nativeUI.closeWaiting();
				plus.nativeUI.showWaiting("游戏连接失败,正在重新连接...");
			}
			
		}
		
		
		//游戏倒计时
		function timer(intDiff){
		  var day=0,
		     hour=0,
		     minute=0,
		     second=0;//时间默认值        
		  if(intDiff > 0){
		    day = Math.floor(intDiff / (60 * 60 * 24));
		    hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
		    minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
		    second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
		  }
		  if (hour <= 9) hour = '0' + hour;
		  if (minute <= 9) minute = '0' + minute;
		  if (second <= 9) second = '0' + second;
			hour += "";
			minute+="";
			second+="";
			$("#gameTimeH_1").text(hour.substr(0,1));
			$("#gameTimeH_2").text(hour.substr(1,1));
			$("#gameTimeM_1").text(minute.substr(0,1));
			$("#gameTimeM_2").text(minute.substr(1,1));
			$("#gameTimeS_1").text(second.substr(0,1));
			$("#gameTimeS_2").text(second.substr(1,1));
		}
		
		//定义前往充值页面
		function GotoRechage(){
			goView("../asset/recharge.html","recharge",{spaceValue:"true"});
		}
		
		//定义清除函数 
		function gameClearInput(){
			plus.nativeUI.showWaiting();
			$("#gameTouruInput1").val("");
			$("#gameTouruInput2").val("");
			$("#gameContMain1").hide();
			$("#gameContMain2").hide();
			$(".safetyKey").css({bottom:"-450px"}); 
			safkeyUp = 0;
		    safkeyPw = "";
	    	
	    	inpToggle = "";
			UrlToggle = "";
		    
		    //刷新页面
		    plus.webview.getWebviewById("asset").reload(true);
		    for(var i=0;i<6;i++){
		    	$(".mm").eq([i]).removeClass("selectRadius");
		    }
			setTimeout(function(){
				plus.nativeUI.closeWaiting();
			},1500);
		}
	});
});