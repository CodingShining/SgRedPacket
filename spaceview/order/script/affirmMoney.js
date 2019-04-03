$(document).bind("plusready",function(){
	//接受页面传递值
	var pidValue = plus.webview.currentWebview().idValue1;
	var idValue = plus.webview.currentWebview().idValue2;
	
	//定义订单详情的数据接口
	var getAffirmDataUrl = mainUrl + "trade/orderDetail";
	
	//定义确认付款接口
	var affirmMoneyUrl = mainUrl + "trade/upload";
	
	//保存id值
	var thisIDValue = 0;
	var thisSidValue = 0;
	
	//发起请求：
	requestToken(getAffirmDataUrl,"get",{id:idValue,pid:pidValue},function(data){
		if(data.code == 1){
			var statValue = "";
			var payType = "";
			
			thisIDValue = data.data.id;
			thisSidValue = data.data.sid;
			
			switch(data.data.status){
				case 0:
					statValue ="等待付款";
				break;
				case 1:
					statValue = "已完成";
					$(".UpImgBox").hide();
					$(".affirmBut").hide();
					$(".affirmImgBox").show();
				break;
				case 2:
					statValue = "等待收款";
					$(".UpImgBox").hide();
					$(".affirmBut").hide();
					$(".affirmImgBox").show();
				break;
				case -1:
					statValue = "已撤销";
					$(".UpImgBox").hide();
					$(".affirmBut").hide();
				break;
			}
			
			switch(data.data.pay_type){
				case 1:
					payType = "微信支付";
				break;
				case 2:
					payType = "支付宝";
				break;
			}
			
			$("#affData1").text(data.data.sNo);
			$("#affData2").text(statValue);
			$("#affData3").text(data.data.username);
			$("#affData4").text(payType);
			$("#affData5").text(data.data.price);
			$("#affData6").text(data.data.num);
			$("#affData7").text(data.data.total_money);
			$("#affData8").text(data.data.account);
			$("#affData9").text(data.data.real_name);
			$("#affData10").text(data.data.mobile);
			$("#affData11").text(data.data.remarks);
			$("#affData12").text(data.data.time);
			
			if(data.data.img){
				$(".affirmImgBox>img").attr({src:ImgUrl+data.data.img});
			}
			
		}else{
			toast(data.msg);
		}
	});
	
	//为input绑定事件
	$("#affirmFile").bind("change",function(){
		//获取文件
		var inputObj = document.getElementById("affirmFile");
		var fileObj = inputObj.files[0];
		//获取文件路径
		var pathValue = window.URL.createObjectURL(fileObj);
		$("#upImgLabel>img").attr({src:pathValue});
		$("#upImgLabel").css({lineHeight:"0px"});
		$("#upImgLabel>img").css({width:"100%",height:"100%"});
	});
	
	//为确定付款绑定事件
	$(".affirmBut>a").bind("tap",function(){
		plus.nativeUI.showWaiting();
		//获取文件
		var inputObj = document.getElementById("affirmFile");
		var fileObj = inputObj.files[0];
		if(!fileObj){
			toast("请上传汇款凭证图片！");
			return;
		}
		
		//获取Token数据
		var info = getUserInfo();
		var tokenvalue =info.token ;
		var headerValue = {token:tokenvalue};
		
		//创建传递数据
		var FromDataObj = new FormData();
		FromDataObj.append("file",fileObj);
		FromDataObj.append("id",idValue);
		FromDataObj.append("pid",pidValue);
		
		$.ajax({
			type:"post",
			url:affirmMoneyUrl,
			data:FromDataObj,
			dataType:"json",
			timeout:3000,
			headers:headerValue,
			contentType: false,
			processData: false,
			success:function(data){
				plus.nativeUI.closeWaiting();
				toast(data.msg);
				plus.nativeUI.closeWaiting();
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
