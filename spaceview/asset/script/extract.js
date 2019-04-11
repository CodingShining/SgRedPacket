window.addEventListener("load",function(){
	document.addEventListener("plusready",function(){
		
		//定义数据接口
		var getExtractData = mainUrl + "user/getbalance";
		
		//定义提币接口
		var extractUrl = mainUrl + "user/withdraw";
		
		//保存数据
		var balanceData = "";
		var seveChargeData = "";
		var minNum = "";
		
		//获取页面自定义属性
		var MoneyType = plus.webview.currentWebview().viewType;
		
		if(MoneyType == "1"){
			$(".extractUnit").text("EOS");
		}else if(MoneyType == "2"){
			$(".extractUnit").text("XRP");
		}
		
		getExtractViewData();
		
		//定义小键盘自增量和记住密码变量
		var safkeyUp = 0;
		var safkeyPw = "";

		//为记录绑定事件
		$("#extractRecord").bind("tap",function(){
			goView("tibiRecord.html","tibiRecord",{spaceValue:"true",viewType:MoneyType});
		});
		
		//为数量输入框绑定事件
		$("#extractInput3").bind("change",function(){
			var userNum = $("#extractInput3").val();
			var severMoney = toNumberFun(userNum) * toNumberFun(seveChargeData);
			var actualMoney = toNumberFun(userNum) - toNumberFun(severMoney);
			$("#extractInput4").val(severMoney);
			$("#MoveEos").text(actualMoney);
		});
		
		//为确定按钮绑定事件
		$(".extractConBut").bind("tap",function(){
			//获取各项数据
			var input1 = $("#extractInput1").val();
			var input2 = $("#extractInput2").val();
			var input3 = $("#extractInput3").val();
			
			//判断
			if(!input1){
				toast("请输入正确的提币地址！");
				return;
			}else if(!input2){
				toast("请输入正确的TAG标签！");
				return;
			}else if(!input3){
				toast("请输入正确的提币数量！");
				return;
			}else if(toNumberFun(input3) < toNumberFun(minNum)){
				toast("最少提币数量为："+minNum);
				return;
			}
			
			$(".safetyKey").css({bottom:"0px"});
		});
		
		//判断是否有扫描值传递过来
		if(localStorage.getItem("scanValue")){
			var dataValue = localStorage.getItem("scanValue");
			$("#extractInput1").val(dataValue);
		}
		
		//为扫描按钮绑定事件
		$("#scanBut").bind("tap",function(){
			//前往扫描页面
			goView("../scanview/scanview.html","scanview",{spaceValue:"true"});
		});
		
		//为提币返回按钮绑定事件
		$("#extractBack").bind("tap",function(){
			var thisView = plus.webview.currentWebview();
			//清楚本地扫描值
			localStorage.removeItem("scanValue");
			//关闭页面
			plus.webview.close(thisView);
		});
		
		//为小键盘取消按钮绑定事件
		$(".safetClean").bind("tap",function(){
			$(".safetyKey").css({bottom:"-450px"});
			location.reload();
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
			//发起请求
			requestToken(extractUrl,"get",{address:$("#extractInput1").val(),label:$("#extractInput2").val(),num:$("#extractInput3").val(),type:MoneyType,password:safkeyPw},function(data){
				console.log(JSON.stringify(data));
				if(data.code == 1){
					toast(data.msg);
					reloadView("asset");
					BackView();
				}else{
					toast(data.msg);
					plus.webview.currentWebview().reload();
				}
			});
		});
		
		//定义获取页面数据函数
		function getExtractViewData(){
			requestToken(getExtractData,"get",{},function(data){
				if(data.code == 1){
					if(MoneyType == "1"){
						balanceData = data.data.eos;
					}else{
						balanceData = data.data.xrp;
					}
					seveChargeData = data.data.withdraw_site;
					minNum = data.data.min_withdraw;
					$("#extractBalan").text(balanceData);
				}else{
					toast(data.msg);
				}
			});
		}
	});
});