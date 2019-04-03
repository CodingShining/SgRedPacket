window.addEventListener("load",function(){
	
	document.addEventListener("plusready",function(){
		
		//IOS禁用侧滑返回
		plus.webview.currentWebview().setStyle({
			'popGesture':"none"
		});
		
		//设置系统背景颜色
		plus.navigator.setStatusBarStyle("light");
		
		//获取当前页面对象
		var thisView = plus.webview.currentWebview();
		
		//创建子页面数组
		var spaceView = ["view/gameview/gameview.html","spaceview/usercenter/team.html","view/asset/asset.html","view/usercenter/usercenter.html"];
		
		//创建子页面ID数组
		var spaceId = ["gameview","team","asset","usercenter"];
		
		//创建保存ViewObj对象的数组
		var viewObj = [];
		
		//循环创建页面
		for(var i=0;i<spaceView.length;i++){
			viewObj[i] = plus.webview.create(spaceView[i],spaceId[i],{top:"0px",bottom:"70px"});
		}
		
		//循环添加子页面
		for(var i=0;i<viewObj.length;i++){
			thisView.append(viewObj[i]);
			if(i != 0){
				plus.webview.hide(viewObj[i]);
			}
		}
		
		//为各个一级页面添加切换
		$(".mainNavUl>li").bind("tap",function(){
			plus.nativeUI.showWaiting();
			//获取页面id值
			var viewName = $(this).attr("data-viewname");
			if(viewName == "asset"){
				reloadView(viewName);
			}else if(viewName == "usercenter"){
				reloadView(viewName);
			}else if(viewName == "team"){
				reloadView(viewName);
			}
			
			 NavButIcon($(this));
			 GoToView(viewName);
			 
			 plus.nativeUI.closeWaiting();
		});
		
		/*定义主菜单图标切换函数*/
		function NavButIcon(dome){
			var clickValue = dome.attr("data-click");
			if(clickValue == "2"){
				return;
			}
			for(var i=0;i<$(".mainNavUl>li").length;i++){
				var dom = $(".mainNavUl>li").eq(i);
				dom.attr({"data-click":"1"});
				var domimgname = dom.attr("data-icon");
				dom.find("img").attr({"src":"img/"+domimgname+"1.png"});
				dom.find("span").css({"color":"#999aaa"});
			}
			//获取自定义属性
			var imgName  = dome.attr("data-icon");
			if(clickValue == "1"){
				dome.attr({"data-click":"2"});
				dome.find("img").attr({"src":"img/"+imgName+"2.png"});
				dome.find("span").css({"color":"#f6ab10"});
			}
		}
		
		function GoToView(viewName){
			plus.webview.show(viewName);
		}
	});
});