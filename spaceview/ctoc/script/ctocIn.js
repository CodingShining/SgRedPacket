$(document).bind("plusready",function(){
	//获取传递过来的值
	var idValue = plus.webview.currentWebview().ctocId;
	
	//获取父级页面
	var parentView = plus.webview.currentWebview().opener();
	
	//定义获取信息接口
	var getInMesUrl = mainUrl + "trade/sellview";
	
	//定义提交接口
	var subUrl = mainUrl + "trade/sell";
	
	//保存单价
	var ctocInNum = 0;
	
	//保存手续费
	var taxValue = 0;
	
	//保存付款方式
	var payTypeValue = null;
	
	//保存最大最小值
	var ctocInMax = 0;
	var ctocInMin = 0;
	
	//保存是否上传了付款二维码
	var payRqImg = 0;
	
	//定义小键盘自增量和记住密码变量
	var safkeyUp = 0;
	var safkeyPw = "";
	
	//获取用户信息
	var UserMessage = getUserInfo();
	
	$("#ctocInInput5").val(UserMessage.mobile);
	
	//发起请求获取数据
	requestToken(getInMesUrl,"get",{id:idValue},function(data){
		if(data.code == 1){
			$("#nameText").text(data.data.username);
			$("#gdNumb").text(data.data.totalnum);
			$("#overnum").text(data.data.overnum);
			$("#djnum").text(data.data.price);
			taxValue = data.data.tax;
			ctocInNum = data.data.price;
			var markValue = data.data.remarks;
			ctocInMax = data.data.max_money;
			ctocInMin = data.data.min_money;
			$("#ctocInMin").text(data.data.min_money);
			$("#ctocInMax").text(data.data.max_money)
			if(!markValue){
				$(".remarksBox").hide();
			}else{
				$("#remarksText").text(markValue);
			}
		}else{
			toast(data.msg);
		}
	});
	
	//为数量输入框绑定事件
	$("#ctocInInput1").bind("change",function(){
		var value1 = $("#ctocInInput1").val();
		var value2 = toNumberFun(value1) * toNumberFun(ctocInNum);
		var value3 = toNumberFun(value1) * toNumberFun(taxValue);
		$("#ctocInConverCont").text(value2);
		$("#taxText").text(value3);
	});
	
	//为付款方式绑定事件
	$(".ctocInPayType").bind("tap",function(){
		plus.nativeUI.actionSheet({title:"选择付款方式",cancel:"取消",buttons:[{title:"微信"},{title:"支付宝"},{title:"银行卡"}]},function(e){
			if(e.index == 1){
				$(".ctocInPayType").text("微信");
				payTypeValue = "1";
			}else if(e.index == 2){
				$(".ctocInPayType").text("支付宝");
				payTypeValue = "2";
			}else if(e.index == 3){
				$(".ctocInPayType").text("银行卡");
				payTypeValue = "3";
			}
		});
	});
	
	//为上传付款二维码上传绑定事件
	$("#ctocInInput6").bind("change",function(){
		//获取图片值
		var inputObj = document.getElementById("ctocInInput6");
		var imgObj = inputObj.files[0];
		var imgPath = window.URL.createObjectURL(imgObj);
		//改变label下的图片地址
		$(".ctocInUpRq>label>img").attr({src:imgPath});
		$(".ctocInUpRq>label>img").css({width:"100%",height:"100%"});
		payRqImg = 1;
	});
	
	//为按钮绑定事件
	$(".ctocInBut>a").bind("tap",function(){
		 var value1 = $("#ctocInInput1").val();
		 var value2 = $("#ctocInInput2").val();
		 var value3 = $("#ctocInInput3").val();
		 var value4 = $("#ctocInInput4").val();
		 var value5 = $("#ctocInInput5").val();
		 if(!value1){
		 	toast("请输入出售数量");
		 	return;
		 }else if(!value2){
		 	toast("请输入收款账号");
		 	return;
		 }else if(!value4){
		 	toast("请输入收款人姓名");
		 	return;
		 }else if(!value5){
		 	toast("请输入收款人联系电话");
		 	return;
		 }else if(!payTypeValue){
		 	toast("请选择收款方式");
		 	return;
		 }else if(value1<ctocInMin){
		 	toast("出售数量小于最小值");
		 	return;
		 }else if(value1>ctocInMax){
		 	toast("出售数量大于最大值");
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
		
		plus.nativeUI.showWaiting();
		
		//创建FormData
		var FromDataObj = new FormData();
		
		//获取相关数据
		var FileInput = document.getElementById("ctocInInput6");
		
		var fileObj = FileInput.files[0];
		
		FromDataObj.append("file",fileObj);
		FromDataObj.append("id",idValue);
		FromDataObj.append("money",$("#ctocInInput1").val());
		FromDataObj.append("paytype",payTypeValue);
		FromDataObj.append("account",$("#ctocInInput2").val());
		FromDataObj.append("remarks",$("#ctocInInput3").val());
		FromDataObj.append("realname",$("#ctocInInput4").val());
		FromDataObj.append("mobile",$("#ctocInInput5").val());
		FromDataObj.append("paypwd",safkeyPw);
		
		//获取Token数据
		var info = getUserInfo();
		var tokenvalue =info.token ;
		var headerValue = {token:tokenvalue};
		
		//发起请求
		$.ajax({
			type:"post",
			url:subUrl,
			data:FromDataObj,
			dataType:"json",
			timeout:30000,
			headers:headerValue,
			contentType: false,
			processData: false,
			success:function(data){
				plus.nativeUI.closeWaiting();
				toast(data.msg);
				resLoadParent();
				BackView();
			},
			error:function(xhr){
				plus.nativeUI.closeWaiting();
				plus.nativeUI.toast("网络错误：请检查网络连接"+xhr.status);
			}
		});
	});
});
