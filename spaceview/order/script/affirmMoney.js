$(document).bind("plusready",function(){
	//接受页面传递值
	var pidValue = plus.webview.currentWebview().idValue1;
	var idValue = plus.webview.currentWebview().idValue2;
	
	//定义订单详情的数据接口
	var getAffirmDataUrl = mainUrl + "trade/orderDetail";
	
	//定义确认付款接口
	var affirmMoneyUrl = mainUrl + "obs/upload";
	
	//获取图片接口定义
	var getUpImgUrl = mainUrl + "obs/img";
	
	var getUpPayImgUrl = mainUrl + "obs/payimg";
	
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
				case 2:
					payType = "银行卡";
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
			
			requestToken(getUpPayImgUrl,"get",{id:thisIDValue,pid:pidValue},function(data){
				if(data.code == 1){
 					$(".affirmPayRq").show();
					$(".affirmPayRqImg>img").attr({src:data.msg});
				}
			});
			
			requestToken(getUpImgUrl,"get",{id:thisIDValue,pid:pidValue},function(data){
				if(data.code == 1){
					$(".affirmImgBox>img").attr({src:data.msg});
				}
			});
			
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
	
	//为付款二维码绑定点击事件
	$(".affirmPayRqImg>img").bind("tap",function(){
		plus.nativeUI.actionSheet({title:"保存付款图片",cancel:"取消",buttons:[{title:"保存到本地"}]},function(e){
			if(e.index == 1){
				var pathValue = $(".affirmPayRqImg>img").attr("src");
				plus.gallery.save( pathValue,function(){
					toast("保存成功！");
				},function(e){
					toast("保存失败！"+e.message);
				});
			}
		});
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
			timeout:30000,
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
