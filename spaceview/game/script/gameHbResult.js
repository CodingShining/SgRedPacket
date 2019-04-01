$(document).bind("plusready",function(){
	//获取红包ID
	var hbIdValue = plus.webview.currentWebview().hbId;
	
	//定义获取红包数据接口
	var getHHbMsgUrl = mainUrl + "hbgame/hbdetail";
	
	getDataResult();
	
	
	function getDataResult(){
		requestToken(getHHbMsgUrl,"get",{id:hbIdValue},function(data){
			if(data.code = 1){
				var HbMessage = data.data.hbdata[0];
				var selfHb = data.data.userhb;
				var imgUrl = ImgUrl + HbMessage.headimage
				var HbUserList = data.data.hblist;
				$("#hbResMes1").attr({src:imgUrl});
				$("#hbResMes2").text(HbMessage.nickname);
				$("#hbResMes3").text(HbMessage.number);
				$("#hbResMes4").text(HbMessage.odds);
				$("#hbResMes6").text(HbMessage.mark_num);
				$("#hbResMes7").text(HbMessage.mark);
				$("#hbResMes8").text(HbMessage.surplus);
				$("#hbResMes9").text(HbMessage.number);
				
				if(!selfHb){
					$("#hbResMes5").text("未抢到！"); 
				}else{
					$("#hbResMes5").text(selfHb.money);
				}
				
				
				if(HbUserList.length){
					for(var g=0;g<HbUserList.length;g++){
						var className = "";
						var htmlCont = "";
						var stust = HbUserList[g].status;
						var stust2 =  HbUserList[g].type
						
						if(stust2 == "1"){
							htmlCont = '<span><i><img src="img/gameGet1.png"></i><i style="color:#F6AB10">手气最佳</i></span>';
						}else if(stust2 == "2"){
							htmlCont = '<span><i><img src="img/gameGet3.png"></i><i style="color:#82858E">运气最差</i></span>';
						}
						
						switch(stust){
							case "0":
								className = "";
							break;
							case "1":
								className = "bingG";
								htmlCont += '<span><i><img src="img/gameGet2.png"></i><i style="color:#D52D2D">中雷选手</i></span>';
							break;
						}
						
						$(".gameHbGetUser").append('<li class="'+className+'"><div class="gamenGetUserImg"><img src="'+(ImgUrl+HbUserList[g].headimage)+'" /></div><div class="gamenGetUserMes"><div class="gamenGetMes1"><span>'+HbUserList[g].nickname+'</span><span>'+SwitchDay(HbUserList[g].add_time)+'</span></div><div class="gamenGetMes2"><span><i>'+HbUserList[g].money+'</i></span><span><div class="gamenGetIcon">'+htmlCont+'</div></span></div></div></li>');
					}
				}
				
				
			}else{
				toast(data.msg);
			}
		});
	}
});
