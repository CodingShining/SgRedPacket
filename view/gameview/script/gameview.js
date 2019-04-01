window.addEventListener("load",function(){
	document.addEventListener("plusready",function(){
		
		//定义轮播图请求接口
		var swiperImgUrl = mainUrl + "hbgame/roteimg";
		
		//定义公告请求接口
		var noticeUrl = mainUrl + "cms/channel";
		
		//定义变量保存公告移动量
		var NoticeMoveValue = 0;
		
		//发起请求获取图片
		requestToken(swiperImgUrl,"get",{},function(data){
			if(data.code == 1){
				var imgList = data.data.roteimg;
				var fuliData = data.data.fl_area;
				if(imgList.length){
					for(var i=0;i<imgList.length;i++){ 
						$(".gameviewSwInBox").append('<div class="swiper-slide"><img src="'+(ImgUrl+imgList[i].imgurl)+'"></div>');
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
					
					$(".gameviewFuli").attr({"data-type":fuliData.name});
					$(".gameviewFuli").attr({"data-idName":fuliData.id});
					
					//为福利入口绑定事件
					$(".gameviewFuli").bind("tap",function(){
						//获取自定义属性
						var roomType = $(this).attr("data-type");
						var roomid = $(this).attr("data-idName");
						//前往房间
						goView("../../spaceview/game/gameRoom.html","gameRoom",{spaceValue:"true",roomTitle:roomType,roomIdValue:roomid,toggle:"1"});
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
		
		//为红包游戏广告绑定事件
		$(".gameHbIn").bind("tap",function(){
			goView("../../spaceview/game/gameHbHome.html","gameHbHome",{spaceValue:"true"});
		});
		
		//为c2c绑定事件
		$("#gameviewCtocNav").bind("tap",function(){
			//前往CtoC页面
			goView("../../spaceview/ctoc/ctoc.html","ctoc",{spaceValue:"true"});
		});
		
		//为我开放的绑定事件
		$(".NotOpen").bind("tap",function(){
			toast("暂未开放！");
		});
	});
});