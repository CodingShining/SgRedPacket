$(document).bind("plusready",function(){
	//获取页面传递值
	var thisValue1 = plus.webview.currentWebview().IdValue;
	
	//获取类型
	var thisValue2 = plus.webview.currentWebview().TypeValue;
	
	//获取状态
	var thisValue3 = plus.webview.currentWebview().status;
	
	
	//发起请求获取订单信息
	var payMesageUrl = mainUrl + "trade/detail"; 
	
	//定义提交接口
	var paySubmintUrl = mainUrl + "trade/upload";
	
	//保存凭证地址
	var ImgVoucher = "";
	
	//发起请求
	requestToken(payMesageUrl,"get",{id:thisValue1},function(data){
		if(data.code == 1){
			var TotalPrice = 0;
			var numberValue = data.data.num;
			numberValue = toNumberFun(numberValue);
			var pireValue = data.data.price;
			pireValue = toNumberFun(pireValue);
			TotalPrice = pireValue*numberValue;
			var payType= "";
			var payOrderType = "";
			switch(data.data.pay_type){ 
				case 1:
					payType="微信";
				break;
				case 2:
					payType="支付宝";
				break;
				case 3:
					payType="银行卡";
				break;
			}
			
			switch(thisValue2){
				case "1":
					payOrderType="买入";
				break;
				case "2":
					payOrderType="出售";
				break;
			}
			//渲染数据
			$("#payContData1").text(TotalPrice); //交易价格（）cny
			$("#payContData3").text(data.data.uid);  //商家账号
			$("#payContData4").text(payType); //支付方式
			$("#payContData5").text(data.data.account);  //收款账户
			$("#payContData6").text(data.data.remarks);  //备注
			$("#payContData7").text(data.data.real_name);  //收款者姓名
			$("#payContData8").text(data.data.mobile);  //联系电话
			$("#payContData9").text(payOrderType); //订单类型
			$("#payContData10").text(data.data.price);  //单价
			$("#payContData11").text(data.data.num);  //数量
			
			if(data.data.img){
				ImgVoucher = data.data.img;
				$("#payContImg").attr({src:ImgUrl+ImgVoucher});
				$(".payVoucherImg").show();
			}
			
			if(thisValue3 == "1"){
				if(ImgVoucher){
					$(".payVoucher").hide();
					$(".payContBut").hide();
					$(".payImgBox").show();
					$("#payImgShow").attr({src:ImgUrl+ImgVoucher});
				}else{
					$(".payVoucher").show();
					$(".payContBut").show();
					$(".payImgBox").hide();
				}
			}else if(thisValue3 == "2"){
				$(".payVoucher").hide();
				$(".payContBut").hide();
			}else if(thisValue3 == "3"){
				$(".payVoucher").hide();
				$(".payContBut").hide();
			}
			
		}else{
			toast(data.msg);
		}
	});
	
	//为复制按钮绑定事件
	$(".copyPay").bind("tap",function(){
		//获取值
		var textValue = $("#payContData5").text();
		//复制到粘贴板
		copyText(textValue);
	});
	
	//为文件选择绑定事件
	$("#upFile").bind("change",function(){
		//获取值
		imgPart = window.URL.createObjectURL(this.files[0]);
		$("#upImgDome").attr({src:imgPart});
		$("#upImgDome").css({width:"100%",height:"100%"});
	});
	
	//为提交按钮绑定事件
	$("#payContSubmit").bind("tap",function(){
		if(!$("#upFile").val()){
			toast("请上传付款凭证");
			return;
		}
		var inputObj = document.getElementById("upFile");
		var imgObj = inputObj.files[0];
		var FormDataObj = new FormData();
		FormDataObj.append("file",imgObj);
		FormDataObj.append("id",thisValue1);
		
		//获取数据
		var info = getUserInfo();
		var tokenvalue =info.token ;
		var headerValue = {token:tokenvalue};
		$.ajax({
			type:"post",
			url:paySubmintUrl,
			data:FormDataObj,
			dataType:"json",
			timeout:3000,
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
	
	//为撤销按钮绑定事件
	$("#payContRep").bind("tap",function(){
		var urlValue = mainUrl + "trade/back";
		//发起请求
		requestToken(urlValue,"get",{id:thisValue1},function(data){
			if(data.code ==1){
				toast(data.msg);
				resLoadParent();
				BackView();
			}else{
				toast(data.msg);
			}
		});
	});
		
});
