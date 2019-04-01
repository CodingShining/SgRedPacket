$(document).bind("plusready",function(){
	
	//定义获取出售价格
	var getCnyMoney = mainUrl + "trade/sellview";
	
	//定义请求接口
	var requestUrl = mainUrl + "trade/sell";
	
	//定义收款方式
	var payType = 1;
	
	//定义小键盘自增量和记住密码变量
	var safkeyUp = 0;
	var safkeyPw = "";
	
	//保存手续费
	var sxfValue = 0;
	
	//获取页面父级
	var parentView = plus.webview.currentWebview().opener();
	
	//定义开户行名称
	var khhText = [
		 {title:"中国工商银行"},
		 {title:"中国农业银行"},
		 {title:"中国建设银行"},
		 {title:"中国银行"},
		 {title:"交通银行"},
		 {title:"中信银行"},
		 {title:"光大银行"},
		 {title:"华夏银行"},
		 {title:"招商银行"},
		 {title:"民生银行"},
		 {title:"兴业银行"},
	];
	
	//发起请求渲染数据
	requestToken(getCnyMoney,"get",{},function(data){
		if(data.code == 1){
			$("#issueMoney").text(data.data.balance);
			$("#issueInput1").val(data.data.price);
			sxfValue = data.data.tax;
			sxfValue = sxfValue / 100;
		}else{
			toast(data.msg);
		}
	});
	
	//为选择付款方式绑定事件
	$(".issuePayType").bind("tap",function(){
		plus.nativeUI.actionSheet({title:"选择付款方式",cancel:"取消",buttons:[{title:"微信"},{title:"支付宝"}]},function(e){
			switch(e.index){
				case 1:
					$("#issuePayText").text("微信");
					payType = 1;
					$(".khh").hide();
					$(".issuekhh").attr({"data-toggle":"0"});
				break;
				case 2:
					$("#issuePayText").text("支付宝");
					payType = 2;
					$(".khh").hide();
					$(".issuekhh").attr({"data-toggle":"0"});
				break;
				case 3:
					$("#issuePayText").text("银行卡");
					payType = 3;
					$(".khh").show();
					$(".issuekhh").attr({"data-toggle":"1"});
				break;
			}
		});
	});
	
	//为选择开户行绑定事件
	$(".issuekhh").bind("tap",function(){
		plus.nativeUI.actionSheet({title:"开户行名称",cancel:"取消",buttons:khhText},function(e){
			getBankName(e.index);
		});
	});
	
	//为数量输入框绑定事件
	$("#issueInput2").bind("change",function(){
		var value1 = $("#issueInput1").val();
		var value2 = $("#issueInput2").val();
		var value3 = value1 * value2;
		var value4 = value2 * sxfValue;
		value4 = value4.toFixed(2);
		$("#ConversText").text(value3);
		$("#sxfText").text(value4);
	});
	
	//为立即发布按钮绑定事件
	$(".issueBut>a").bind("tap",function(){
		var bankvalue1 = $(".issuekhh").attr("data-toggle");
		var bankvalue2 = $("#khhName").attr("data-toggle");
		if(!$("#issueInput2").val()){
			toast("请输入出售数量！");
			return;
		}else if(!$("#issueInput3").val()){
			toast("请输入收款账号！");
			return;
		}else if(!$("#issueInput5").val()){
			toast("请输入收款方姓名！");
			return;
		}else if(!$("#issueInput6").val()){
			toast("请输入联系电话！");
			return;
		}else if(bankvalue1=="1"){
			if(bankvalue2 == "0"){
				toast("请选择开户行！");
				return;	
			}
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
		
		var toggleValue = $(".issuekhh").attr("data-toggle");
		
		var AjaxObj = null;
		
		if(toggleValue == "1"){
			AjaxObj = {money:$("#issueInput2").val(),paytype:payType,account:$("#issueInput3").val(),remarks:$("#issueInput4").val(),realname:$("#issueInput5").val(),mobile:$("#issueInput6").val(),paypwd:safkeyPw};
		}else{
			AjaxObj = {money:$("#issueInput2").val(),paytype:payType,account:$("#issueInput3").val(),remarks:$("#issueInput4").val(),realname:$("#issueInput5").val(),mobile:$("#issueInput6").val(),paypwd:safkeyPw};
		}
		//发起请求
		requestToken(requestUrl,"get",AjaxObj,function(data){ 
			if(data.code == 1){
				console.log(JSON.stringify(AjaxObj));
				toast(data.msg);
				parentView.reload();
				window.location.reload();	
			}else{
				toast(data.msg);
				window.location.reload();
			}
		});
	});
	
	//封装赛选银行
	function getBankName(typeValue){
		switch(typeValue){
			case 1:
				$("#khhName").text("中国工商银行");
			break;
			case 2:
				$("#khhName").text("中国农业银行");
			break;
			case 3:
				$("#khhName").text("中国建设银行");
			break;
			case 4:
				$("#khhName").text("中国银行");
			break;
			case 5:
				$("#khhName").text("交通银行");
			break;
			case 6:
				$("#khhName").text("中信银行");
			break;
			case 7:
				$("#khhName").text("光大银行");
			break;
			case 8:
				$("#khhName").text("华夏银行");
			break;
			case 9:
				$("#khhName").text("招商银行");
			break;
			case 10:
				$("#khhName").text("民生银行");
			break;
			case 11:
				$("#khhName").text("兴业银行");
			break;
		}
		$("#khhName").attr({"data-toggle":"1"});
	}
});
