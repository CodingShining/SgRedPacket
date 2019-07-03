window.addEventListener("load",function(){
	document.addEventListener("plusready",function(){
		
		//定义轮播图请求接口
		var swiperImgUrl = mainUrl + "hbgame/roteimg";
		
		//定义公告请求接口
		var noticeUrl = mainUrl + "cms/channel";
		
		//定义变量保存公告移动量
		var NoticeMoveValue = 0;
		
		var gameView = plus.webview.currentWebview(); 
		
		//开启下拉刷新
		gameView.setPullToRefresh({support:true,style:'circle',offset:'45px'}, getUpDataMes);
		
		//发起请求获取图片
		requestToken(swiperImgUrl,"get",{},function(data){
			if(data.code == 1){
				var imgList = data.data.roteimg;
				var fuliData = data.data.fl_area;
				if(imgList.length){
					for(var i=0;i<imgList.length;i++){
						$(".gameviewSwInBox").append('<div class="swiper-slide tapGoUrl" data-type="'+imgList[i].type+'" data-value="'+imgList[i].url+'"><img src="'+(ImgUrl+imgList[i].imgurl)+'"></div>');
					}
					//初始化轮播
					var mySwiper = new Swiper('.swiper-container',{
						direction: 'horizontal',
					    loop: false,
					    initialSlide :1,
					    effect : 'coverflow',
					    coverflow:{
					    	rotate: 0,
					        stretch:100,
					        depth: 60,
					        modifier: 2,
					        slideShadows:false
					    }
					});
					
					//为轮播绑定事件
					$(".tapGoUrl").bind("click",function(){
						//获取type之
						var type = $(this).attr("data-type");
						var urlValue = $(this).attr("data-value");
						if(type == "1"){
							goView("../../spaceview/bulletin/bulletincontent.html","bulletincontent",{spaceValue:"true",contIdValue:urlValue});
						}else if(type == "2"){
							plus.runtime.openURL(urlValue);
						}
					});
					
					$(".gameviewFuli").attr({"data-idName":fuliData.id}); 
					$(".gameviewFuli").attr({"data-titleName":fuliData.name});
					$(".gameviewFuli").attr({"data-num":fuliData.number});
					
					//为福利入口绑定事件
					$(".gameviewFuli").bind("tap",function(){
						//获取数据
						var mainName = $(this).attr("data-titleName");
						var mainIdName = $(this).attr("data-idName");
						var mainNum = $(this).attr("data-num");
						//前往红包游戏页面
						goView("../../spaceview/game/gameHbMain.html","gameHbMain",{spaceValue:"true",roomIdValue:mainIdName,roomTitle:mainName,roomNum:mainNum,toggle:"true"});
					});
				}
			}else{ 
				toast(data.msg);
			}
		});
		
		//发起请求获取公告列表
		requestToken(noticeUrl,"get",{},function(data){
			if(data.code == 1){
				var noticeList = data.data.data;
				if(noticeList.length){
					for(var g=0;g<noticeList.length;g++){
						$(".gameviewNoticeCont").append('<li data-notId="'+noticeList[g].id+'">'+noticeList[g].title+'</li>');
					}
				}else{
					$(".gameviewNotice").hide();
				}
				if(noticeList.length > 1){
					moveNoctice();
				}
				
				//为li绑定事件
				$(".gameviewNoticeCont>li").bind("tap",function(){
					//获取自定义值
					var idName = $(this).attr("data-notId")
					goView("../../spaceview/bulletin/bulletincontent.html","bulletincontent",{spaceValue:"true",contIdValue:idName});
				});
				
			}else{
				$(".gameviewNotice").hide();
				toast(data.msg);
			}
		});
		
		//第一次调用获取更新信息
		getUpDataMes();
		
		//定时滚动公告
		function moveNoctice(){
			//获取ul高度
			var UlHeight = ($(".gameviewNotice>ul").offset().height);
			//获取ul的op值
			var UlTop = $(".gameviewNotice>ul").css("top");
			
			//获取li的高度
			var LiHeight = $(".gameviewNotice>ul>li").offset().height;
			
			UlTop = UlTop.substr(0,UlTop.length-2);
			
			UlTop = toNumberFun(UlTop);
			
			UlTop = UlTop-30;
			
			if(UlTop == -(UlHeight)){
				$(".gameviewNotice>ul").css({"top":"0px"});
				NoticeMoveValue = 0;
			}
			
			NoticeMoveValue += LiHeight; 
			
			$(".gameviewNotice>ul").css({"top":"-"+NoticeMoveValue+"px"});
			setTimeout(function(){
				moveNoctice();
			},3000);
			  
		}
		
		//下拉刷新需要执行的函数
		function getUpDataMes(){
			//发起请求
			var urlValue = mainUrl + "trade/orderTips";
			//发起请求
			requestToken(urlValue,"get",{},function(data){
				if(data.code == 1){
					if(data.data == 1){
						$(".upDataImg").show();
					}else if(data.data == 0){
						$(".upDataImg").hide();
					}
					gameView.endPullToRefresh();
				}else{
					toast(data.msg);
					gameView.endPullToRefresh();
				}
			});
		}
		
		//为红包游戏广告绑定事件
		$(".gameHbIn").bind("tap",function(){
			goView("../../spaceview/game/gameHbHome.html","gameHbHome",{spaceValue:"true"});
		});
		
		//为c2c绑定事件
		$(".gameviewCtocNav").bind("tap",function(){
			//前往CtoC页面
			goView("../../spaceview/ctoc/ctoc.html","ctoc",{spaceValue:"true"});
		});
		
		//为邀请好友绑定事件
		$(".gameviewInvite").bind("tap",function(){
			//前往CtoC页面
			goView("../../spaceview/usercenter/invitation.html","invitation",{spaceValue:"true"});
		});
		
		//为公告绑定事件
		$(".gameviewBulletin").bind("tap",function(){
			//前往CtoC页面
			goView("../../spaceview/bulletin/helpText.html","helpText",{spaceValue: "true"});
		});
	});
});