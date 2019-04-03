$(document).bind("plusready",function(){
	//定义上传图片接口
	var UpImgUrl = mainUrl + "common/upload";
	
	//定义修改头像接口
	var savimgUrl = mainUrl + "user/headimg";
	
	//获取用户本地信息
	var basicInfoLoca = getUserInfo();
	$("#basicInfoPhone").text(splitPhone(basicInfoLoca.mobile));
	$("#basicInfoNic").text(basicInfoLoca.nickname);
	$("#basicInfoId").text(basicInfoLoca.id);
	
	//判断用户头像
	if(localStorage.getItem("kingHeadImg")){
		var imgurl = localStorage.getItem("kingHeadImg");
		imgurl = ImgUrl + imgurl;
		$("#basicAvatar").attr({src:imgurl});
	}else{
		$("#basicAvatar").attr({src:"imgs/headimg.png"});
	}
	
	//为修改昵称绑定事件
	$("#basicGoModifynick").bind("tap",function(){
		goView("../else/modifynick.html","modifynick",{spaceValue:"true"});
	});
	
	//为修改头像绑定事件
//	$("#basicHeadImg").bind("tap",function(){
//		//显示选择框
//		plus.nativeUI.actionSheet({title:"设置头像",cancel:"取消",buttons:[{title:"拍照"},{title:"相册"}]},function(e){
//			switch(e.index){
//				case 1:
//					CameraFun();
//				break;
//				case 2:
//					galleryImgs();
//				break;	
//			}
//		});
//	});

	//为上传头像绑定事件
	$("#userImgInput").bind("change",function(){
		plus.nativeUI.showWaiting();
		//获取文件流
		var inputObj = document.getElementById("userImgInput");
		var fileObje = inputObj.files[0];
		var pathUrl = window.URL.createObjectURL(fileObje);
		var FromDataObj = new FormData();
		FromDataObj.append("file",fileObje);
		//获取数据
		var info = getUserInfo();
		var tokenvalue =info.token ;
		var headerValue = {token:tokenvalue};
		$.ajax({
			type:"post",
			url:UpImgUrl,
			data:FromDataObj,
			dataType:"json",
			timeout:3000,
			headers:headerValue,
			contentType: false,
			processData: false,
			success:function(data){
				if(data.code == 1){
					plus.nativeUI.closeWaiting();
					var userImg = data.data.url;
					requestToken(savimgUrl,"get",{url:userImg},function(data){
						if(data.code == 1){
							localStorage.setItem("kingHeadImg",userImg);
							resLoadParent();
							plus.webview.currentWebview().reload();
							toast(data.msg);
						}else{
							toast(data.msg);
						}
						 
					});
				}else{
					plus.nativeUI.closeWaiting();
					toast(data.msg);
				}
			},
			error:function(xhr){
				plus.nativeUI.closeWaiting();
				plus.nativeUI.toast("网络错误：请检查网络连接"+xhr.status);
			}
		});
	});
	
	//为退出登录绑定事件
	$("#basicInfoBut").bind("tap",function(){
		//显示选择框
		plus.nativeUI.actionSheet({title:"退出或者注销",cancel:"取消",buttons:[{title:"退出App"},{title:"注销账号"}]},function(e){
			switch(e.index){
				case 1:
					if(!isAndroid_ios()) {
						var threadClass = plus.ios.importClass("NSThread");
						var mainThread = plus.ios.invoke(threadClass, "mainThread");
						plus.ios.invoke(mainThread, "exit");
					} else {
						plus.runtime.quit();
					}
				break;
				case 2:
					var indexView = plus.webview.getLaunchWebview();
					indexView.reload();
					AllcloseView();
			}
		});
	});
	
	//设定拍照函数
//	function CameraFun(){
//		var camera = plus.camera.getCamera(1);
//		camera.captureImage(function(capturedFile){
//			plus.io.resolveLocalFileSystemURL(capturedFile,function(entry){
//				localStorage.setItem("kingHeadImg",entry.toLocalURL());
//			});
//			plus.webview.currentWebview().reload();
//		},function(e){
//			toast("拍照失败："+e.message);
//		},{index:"1"});
//	}
	
	//设定从相册中选择照片
//	function galleryImgs(){
//		plus.gallery.pick(function(file){
//			var fileUrl  = file;
//			plus.io.resolveLocalFileSystemURL(fileUrl,function(entry){
//				console.log(JSON.stringify(entry));
//			});
//			localStorage.setItem("kingHeadImg",file);
//			plus.webview.currentWebview().reload();
//		},function(e){
//			toast("操作失败"+e.message);
//		},{animation:false,});
//	}
});
