$(document).bind("plusready",function(){
	
	//获取兑换类型
	var ConversType = plus.webview.currentWebview().viewType;
	
	//定义数据接口
	var converDataUrl = mainUrl + "user/getbalance";
	
	//定义闪兑接口
	var converMainUrl = mainUrl + "user/exchange";
	
	//定义最小兑换值
	var converMinNumber = "";
	
	//定义接口Type值
	var AjaxType = "";
	
	//定义接口curr值
	var AjaxCurr = "";
	
	//保存汇率
	var AjaxRate1 = "";
	var AjaxRate2 = "";
	var AjaxRate3 = "";
	
	//保存
	

	
	//定义小键盘自增量和记住密码变量
	var safkeyUp = 0;
	var safkeyPw = "";
	
	//发起请求获取数据
	requestToken(converDataUrl,"get",{},function(data){
		if(data.code == 1){
			if(ConversType == "1"){
				$("#converBalan").text(data.data.ptb);
			}else if(ConversType == "2"){
				$("#converBalan").text(data.data.eos);
			}else if(ConversType == "3"){
				$("#converBalan").text(data.data.xrp);
			}
			converMinNumber = data.data.min_exchange;
			AjaxRate1 = data.data.ptb_price;
			AjaxRate2 = data.data.eos_price;
			AjaxRate3 = data.data.xrp_price;
			if(ConversType == "1"){
				$(".conversionUnti").text("SGB");
				$(".conversionUpIcon").attr({src:"../../view/asset/img/PTBicon.png"});
				AjaxType = "1";
			}else if(ConversType == "2"){
				$(".conversionUnti").text("EOS");
				$(".conversionUpIcon").attr({src:"../../view/asset/img/EOSicon.png"});
				AjaxType = "2";
				$(".conversionSelect").hide();
				$("#convSelect1").attr({src:"../../view/asset/img/PTBicon.png"});
				$("#convSelect2").text("SGB");
				$(".conversionSelect").hide();
				$(".conversMoneyUp2").show();
				$(".conversionUnti1").text("SGB");
				var XrpAndPtb = toNumberFun(AjaxRate2) / toNumberFun(AjaxRate1);
				XrpAndPtb = XrpAndPtb.toFixed(6);
				$("#converRtae").text(XrpAndPtb);
				AjaxCurr = "1";
				$(".conversionUnti1").text("SGB");
			}else if(ConversType == "3"){
				$(".conversionUnti").text("XRP");
				$(".conversionUpIcon").attr({src:"../../view/asset/img/XRPicon.png"});
				AjaxType = "2";
				$(".conversionSelect").hide();
				$("#convSelect1").attr({src:"../../view/asset/img/PTBicon.png"});
				$("#convSelect2").text("SGB");
				$(".conversionSelect").hide();
				$(".conversMoneyUp2").show();
				$(".conversionUnti1").text("SGB");
				var XrpAndPtb = toNumberFun(AjaxRate3) / toNumberFun(AjaxRate1);
				XrpAndPtb = XrpAndPtb.toFixed(6);
				$("#converRtae").text(XrpAndPtb);
				AjaxCurr = "2";
				$(".conversionUnti1").text("SGB");
			}
		}else{
			toast(data.msg);
		}
		
	});
	
	//为选择按钮绑定事件
	$(".selectBut").bind("tap",function(){
		if(ConversType == "1"){
			plus.nativeUI.actionSheet({title:"需要兑换的币种",cancel:"取消",buttons:[{title:"EOS"},{title:"XRP"}]},function(e){
				if(e.index == 1){
					$("#convSelect1").attr({src:"../../view/asset/img/EOSicon.png"});
					$("#convSelect2").text("EOS");
					$(".conversionSelect").hide();
					$(".conversMoneyUp2").show();
					$(".conversionUnti1").text("EOS");
					var ptbAndEosAct = toNumberFun(AjaxRate1) / toNumberFun(AjaxRate2);
					ptbAndEosAct = ptbAndEosAct.toFixed(6);
					$("#converRtae").text(ptbAndEosAct);
					AjaxCurr = "1";
				}else if(e.index == 2){
					$("#convSelect1").attr({src:"../../view/asset/img/XRPicon.png"});
					$("#convSelect2").text("XRP");
					$(".conversionSelect").hide();
					$(".conversMoneyUp2").show();
					$(".conversionUnti1").text("XRP");
					var ptbAndXrpAct = toNumberFun(AjaxRate1) / toNumberFun(AjaxRate3);
					ptbAndXrpAct = ptbAndXrpAct.toFixed(6);
					$("#converRtae").text(ptbAndXrpAct);
					AjaxCurr = "2";
				}
			});
		}else if(ConversType == "2"){
			plus.nativeUI.actionSheet({title:"需要兑换的币种",cancel:"取消",buttons:[{title:"SGB"}]},function(e){
				if(e.index == 1){
					$("#convSelect1").attr({src:"../../view/asset/img/PTBicon.png"});
					$("#convSelect2").text("SGB");
					$(".conversionSelect").hide();
					$(".conversMoneyUp2").show();
					var EosAndPtb = toNumberFun(AjaxRate2) / toNumberFun(AjaxRate1);
					EosAndPtb = EosAndPtb.toFixed(6);
					$("#converRtae").text(EosAndPtb);
					AjaxCurr = "1";
					$(".conversionUnti1").text("SGB");
				}
			});
		}else if(ConversType == "3"){
			plus.nativeUI.actionSheet({title:"需要兑换的币种",cancel:"取消",buttons:[{title:"SGB"}]},function(e){
				if(e.index == 1){
					$("#convSelect1").attr({src:"../../view/asset/img/PTBicon.png"});
					$("#convSelect2").text("SGB");
					$(".conversionSelect").hide();
					$(".conversMoneyUp2").show();
					$(".conversionUnti1").text("SGB");
					var XrpAndPtb = toNumberFun(AjaxRate3) / toNumberFun(AjaxRate1);
					XrpAndPtb = XrpAndPtb.toFixed(6);
					$("#converRtae").text(XrpAndPtb);
					AjaxCurr = "2";
					$(".conversionUnti1").text("SGB");
				}	
			});
		}
	});
	
	
	//为记录绑定事件
	$("#converRecord").bind("tap",function(){
		goView("conversionList.html","conversionList",{spaceValue:"true",viewType:ConversType});
	});
	
	//为input绑定事件
	$("#conveInput1").bind("change",function(){
		if(!AjaxCurr){
			toast("请选择兑换币种！");
			plus.webview.currentWebview().reload();
			return;
		}
		var Value1 = $("#converRtae").text();
		var Value2 = $("#conveInput1").val();
		var Value3 = toNumberFun(Value1) * toNumberFun(Value2);
		Value3 = Value3.toFixed(6);
		$("#conveInput2").val(Value3);
	});
	
	//为确定按钮绑定事件
	$("#conversionBut").bind("tap",function(){
		
		//获取数据
		var conversionInput1 = $("#conveInput1").val();
		
		//判断用户是否输入了值
		if(!conversionInput1){
			toast("请输入闪兑的数量！");
			return;
		}else if(toNumberFun(conversionInput1) < toNumberFun(converMinNumber)){
			toast("兑换数量不能小于:"+converMinNumber);
			return;
		}
		
		//显示小键盘
		$(".safetyKey").css({bottom:"0px"});
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
		requestToken(converMainUrl,"get",{num:$("#conveInput1").val(),password:safkeyPw,curr:AjaxCurr,type:AjaxType},function(data){
			if(data.code == 1){
				toast("兑换成功！");
				resLoadParent();
				window.location.reload();
			}else{
				toast(data.msg);
				window.location.reload();
			}
		});
	});
	
	
});
