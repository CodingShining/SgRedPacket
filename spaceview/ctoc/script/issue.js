$(document).bind("plusready",function(){
	
	//定义获取出售价格
	var getCnyMoney = mainUrl + "trade/buyview"; 
	
	//定义请求接口
	var requestUrl = mainUrl + "trade/buy";
	
	//定义收款方式
	var payType = 1;
	
	//定义小键盘自增量和记住密码变量
	var safkeyUp = 0;
	var safkeyPw = "";
	
	//获取页面父级
	var parentView = plus.webview.currentWebview().opener();
	
	
	//发起请求渲染数据
	requestToken(getCnyMoney,"get",{},function(data){
		if(data.code == 1){
			$("#issueMoney").text(data.data.balance);
			$("#issueInput1").val(data.data.price);
		}else{
			toast(data.msg);
		}
	});
	
	//为数量输入框绑定事件
	$("#issueInput2").bind("change",function(){
		var value1 = $("#issueInput1").val();
		var value2 = $("#issueInput2").val();
		var value3 = value1 * value2;
		value3 = value3.toFixed(6);
		$("#ConversText").text(value3);
	});
	
	//为立即发布按钮绑定事件
	$(".issueBut>a").bind("tap",function(){
		var value1 = $("#issueInput2").val();
		var value2 = $("#issueInput4").val();
		var value3 = $("#issueInput5").val();
		var value4 = $("#issueInput6").val();
		
		if(!value1){
			toast("请输入购买数量！");
			return;
		}else if(!value3){
			toast("请输入联系人姓名！");
			return;
		}else if(!value4){
			toast("请输入联系电话！");
			return;
		}
		
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
		
		var AjaxObj = {
			money:$("#issueInput2").val(),
			remarks:$("#issueInput4").val(),
			realname:$("#issueInput5").val(),
			mobile:$("#issueInput6").val(),
			paypwd:safkeyPw
		}

		//发起请求
		requestToken(requestUrl,"get",AjaxObj,function(data){
			if(data.code == 1){
				toast(data.msg);
				parentView.reload();
				window.location.reload();	
			}else{
				toast(data.msg);
				window.location.reload();
			}
		});
	});
});
