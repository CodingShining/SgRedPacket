window.addEventListener("load",function(){
	document.addEventListener("plusready",function(){
		//监听返回键
		plus.key.addEventListener("backbutton",function(){
			 BackView();
		});
		
		//监听所有的返回箭头
		$("#kingBack").bind("tap",function(){
			BackView();
		});
	});
});

	//定义主接口
//	var mainUrl = "https://game.kinsey.vip/api/";
	var mainUrl = "http://47.92.174.226/api/"
	
	//定义图片接口
//	var ImgUrl = "https://game.kinsey.vip/";
	var ImgUrl = "http://47.92.174.226/";
	
	//定义退出程序自增量
	var closeView = 0;

	//定义页面回退函数
	function BackView(){
		//获取当前页面对象
		var viewObj = plus.webview.currentWebview();
		if(viewObj.spaceValue){
			//关闭当前页面
			plus.webview.close(viewObj);
		}else{
			if(closeView == 1){
				plus.runtime.quit();
			}else{
				plus.nativeUI.toast("多次点击返回将关闭应用");
				closeView = 1
				setTimeout(function(){
					closeView = 0;
				},1000);
			}
		}
	}
	
	//定义请求函数(Not Token)
	function request(urlvalue,typevalue,datavalue,heades,call){
		plus.nativeUI.showWaiting();
		$.ajax({
			type:typevalue,
			url:urlvalue,
			data:datavalue,
			dataType:"json",
			timeout:10000,
			headers:heades,
			success:function(data){
				plus.nativeUI.closeWaiting();
				call(data);
			},
			error:function(xhr){
				plus.nativeUI.closeWaiting();
				plus.nativeUI.toast("网络错误：请检查网络连接"+xhr.status);
			}
		});
	}
	
	//定义请求函数（Token）
	function requestToken(urlvalue,typevalue,datavalue,call){
		//获取Token
		var info = getUserInfo();
		var tokenvalue =info.token ;
		var headerValue = {token:tokenvalue};
		plus.nativeUI.showWaiting();
		$.ajax({
			type:typevalue,
			url:urlvalue,
			data:datavalue,
			dataType:"json",
			timeout:30000,
			headers:headerValue,
			success:function(data){
				plus.nativeUI.closeWaiting();
				call(data);
			},
			error:function(xhr){
				plus.nativeUI.closeWaiting();
				plus.nativeUI.toast("网络错误：请检查网络连接"+xhr.status); 
			}
		});
		
	}
	
	//定义获取用户基本信息函数
	function getUserInfo(){
		var userMessage = localStorage.getItem("userInfo");
		return JSON.parse(userMessage);
	}
	
    //定义二级页面跳转
	function goView(urlValue,idValue,data){
		//显示等待框
		plus.nativeUI.showWaiting();
		//创建页面
		var viewObj = plus.webview.create(urlValue,idValue,{},data);
		//延迟500毫秒显示页面
		setTimeout(function(){
			plus.webview.show(viewObj,"slide-in-right");
			plus.nativeUI.closeWaiting();
		},500);
	}
	
	//更新本地数据  dataName:需要更新的数据，dataValue：数据值
	function UpLocalData(dataName,dataValue){
		//获取本地数据
		var localData = getUserInfo();
		localData[dataName] = dataValue;
		//再次保存
		var NewLocalData = JSON.stringify(localData);
		localStorage.setItem("userInfo",NewLocalData);
	}
	
	//定义提示函数
	function toast(message){
		plus.nativeUI.toast(message);
	}
	
	//刷新父级页面
	function resLoadParent(){
		//获取当前页面
		var thisView = plus.webview.currentWebview();
		//获取父级页面
		var parentView = thisView.opener();
		//刷线父级页面
		parentView.reload(true);
	}
	
	//封装时间戳转换时间格式(y-m-d h-mi-s)
	function SwitchTime(text) {
		var dateTime = new Date(text * 1000);
		var y = dateTime.getFullYear();
		var m = dateTime.getMonth() + 1 < 10 ? '0' + (dateTime.getMonth() + 1) : dateTime.getMonth() + 1;
		var d = dateTime.getDate() < 10 ? '0' + (dateTime.getDate()) : dateTime.getDate();
		var h = dateTime.getHours() < 10 ? '0' + (dateTime.getHours()) : dateTime.getHours();
		var mint = dateTime.getMinutes() < 10 ? '0' + (dateTime.getMinutes()) : dateTime.getMinutes();
		var s = dateTime.getSeconds() < 10 ? '0' + (dateTime.getSeconds()) : dateTime.getSeconds();
		return y + "-" + m + "-" + d + " " + h + ":" + mint + ":" + s;
	}
	
	//封装时间戳转换时间格式(y-m-d h-mi-s)
	function SwitchYeat(text) {
		var dateTime = new Date(text * 1000);
		var y = dateTime.getFullYear();
		var m = dateTime.getMonth() + 1 < 10 ? '0' + (dateTime.getMonth() + 1) : dateTime.getMonth() + 1;
		var d = dateTime.getDate() < 10 ? '0' + (dateTime.getDate()) : dateTime.getDate();
		var h = dateTime.getHours() < 10 ? '0' + (dateTime.getHours()) : dateTime.getHours();
		var mint = dateTime.getMinutes() < 10 ? '0' + (dateTime.getMinutes()) : dateTime.getMinutes();
		var s = dateTime.getSeconds() < 10 ? '0' + (dateTime.getSeconds()) : dateTime.getSeconds();
		return y + "-" + m + "-" + d;
	}
	
	//封装时间戳转换时间格式(m-d h-mi-s)
	function SwitchDay(text) {
		var dateTime = new Date(text * 1000);
		var y = dateTime.getFullYear();
		var m = dateTime.getMonth() + 1 < 10 ? '0' + (dateTime.getMonth() + 1) : dateTime.getMonth() + 1;
		var d = dateTime.getDate() < 10 ? '0' + (dateTime.getDate()) : dateTime.getDate();
		var h = dateTime.getHours() < 10 ? '0' + (dateTime.getHours()) : dateTime.getHours();
		var mint = dateTime.getMinutes() < 10 ? '0' + (dateTime.getMinutes()) : dateTime.getMinutes();
		var s = dateTime.getSeconds() < 10 ? '0' + (dateTime.getSeconds()) : dateTime.getSeconds();
		return m + "-" + d + " " + h + ":" + mint;
	}
	
	//封装时间戳转换时间格式(m-d h-mi-s)
	function SwitchDiv(text) {
		var dateTime = new Date(text * 1000);
		var y = dateTime.getFullYear();
		var m = dateTime.getMonth() + 1 < 10 ? '0' + (dateTime.getMonth() + 1) : dateTime.getMonth() + 1;
		var d = dateTime.getDate() < 10 ? '0' + (dateTime.getDate()) : dateTime.getDate();
		var h = dateTime.getHours() < 10 ? '0' + (dateTime.getHours()) : dateTime.getHours();
		var mint = dateTime.getMinutes() < 10 ? '0' + (dateTime.getMinutes()) : dateTime.getMinutes();
		var s = dateTime.getSeconds() < 10 ? '0' + (dateTime.getSeconds()) : dateTime.getSeconds();
		return h + ":" + mint + ":" + s;
	}
	
	//剪切手机号码
	function splitPhone(textValue){
		var PhoneHead = textValue.substr(0,3);
		var PhoneLast = textValue.substr(textValue.length-4,textValue.length);
		var splitNumber = PhoneHead + "***" + PhoneLast;
		return splitNumber;
	}
	
	//关闭所有的页面除了首页
	function AllcloseView(){
		//获取首页的ID
		var indexId = plus.webview.getLaunchWebview().id;
		
		//刷新页面
		plus.webview.getLaunchWebview().reload();
		
		//获取所有的页面
		var allView = plus.webview.all();
		//循环关闭
		for(var i=0;i<allView.length;i++){
			if(allView[i].id == indexId){
				continue;
			}else{
				plus.webview.close(allView[i],"none");
			}
		}
	}
	
	//复制文字函数
	function copyText(txt) {
	    if (isAndroid_ios()) {
	      var Context = plus.android.importClass("android.content.Context");
	      var main = plus.android.runtimeMainActivity();
	      var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
	      plus.android.invoke(clip, "setText", txt);
	    } else {
	      var UIPasteboard = plus.ios.importClass("UIPasteboard");
	      var generalPasteboard = UIPasteboard.generalPasteboard();
	      generalPasteboard.setValueforPasteboardType(txt, "public.utf8-plain-text");
	
	    }
	    toast("已经复制到粘贴板");
  	}
	
	//判断客户端是否为安卓
	function isAndroid_ios(){
		var u = navigator.userAgent, app = navigator.appVersion;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		return isAndroid==true?true:false;
	}
	
	//将字符串转换成数字
	function toNumberFun(textValue){
		return Number(textValue);
	}
	
	//刷新指定页面
	function reloadView(idValue){
		var ViewObje = plus.webview.getWebviewById(idValue);
		//刷新页面
		ViewObje.reload(true);
	}
