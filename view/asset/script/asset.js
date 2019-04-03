window.addEventListener("load",function(){
	document.addEventListener("plusready",function(){
		
		//定义链接
		var assetUrl = mainUrl + "user/getbalance";
		
		//定义变量保存数据
		var dataStor1 = "";
		var dataStor2 = "";
		var dataStor3 = "";
		var dataStor4 = "";
		var dataStor5 = "";
		var dataStor6 = "";
		var dataStor7 = "";
		var dataStor8 = "";
		var dataStor9 = "";
		var dataStor10 = "";
		var dataStor11 = "";
		
		//调用数据函数
		getAssetData();
		
		//为隐藏数据按钮绑定事件
		$(".sysBox").bind("tap",function(){
			//获取自定义属性
			var toggle = $(this).attr("data-toggle");
			if(toggle == "0"){
				$(this).find("img").attr({src:"../../img/closeye.png"});
				$(this).attr({"data-toggle":"1"});
				hideData("1");
			}else{
				$(this).find("img").attr({src:"../../img/openeye.png"});
				$(this).attr({"data-toggle":"0"});
				hideData("0");
			}
		});
		
		//为充币添加点击事件
		$(".recharge").bind("tap",function(){
			//获取自定义属性
			var typeValue = $(this).attr("data-reType");
			//前往充值页面
			goView("../../spaceview/asset/recharge.html","recharge",{spaceValue:"true",viewType:typeValue});
		});
		
		//为闪兑添加点击事件
		$(".conversion").bind("tap",function(){
			//获取自定属性
			var typeValue = $(this).attr("data-convType");
			//前往闪兑页面
			goView("../../spaceview/asset/conversion.html","conversion",{spaceValue:"true",viewType:typeValue});
		});
		
		//为提币添加点击事件
		$(".extract").bind("tap",function(){
			//获取自定义属性
			var typeValue = $(this).attr("data-exrType");
			//前往提币页面
			goView("../../spaceview/asset/extract.html","extract",{spaceValue:"true",viewType:typeValue});
		});
		
		//为赠送添加点击事件
		$(".gifts").bind("tap",function(){
			//前往赠送页面
			goView("../../spaceview/asset/gifts.html","gifts",{spaceValue:"true"});
		});
		
		//定义获取数据的函数
		function getAssetData(){
			//发起请求获取数据
			requestToken(assetUrl,"get",{},function(data){
	 			if(data.code == 1){
	 				//渲染头部数据
	 				$("#assetHeadData1").text(data.data.all_ptb);
	 				$("#assetHeadData2").text(data.data.all_cny);
	 				dataStor1 = data.data.all_ptb;
	 				dataStor2 = data.data.all_cny;
	 				
	 				//渲染平台币
	 				$("#assetPtbData1").text(data.data.ptb_price);
	 				$("#assetPtbData3").text(data.data.ptb);
	 				$("#assetPtbData2").text(data.data.ptb_cny);
	 				dataStor3 = data.data.ptb_price;
	 				dataStor4 = data.data.ptb;
	 				dataStor5 = data.data.ptb_cny;
	 				
	 				//渲染瑞波币
	 				$("#assetXrpData1").text(data.data.xrp_price);
	 				$("#assetXrpData2").text(data.data.xrp);
	 				$("#assetXrpData3").text(data.data.xrp_cny);
	 				dataStor6 = data.data.xrp_price;
	 				dataStor7 = data.data.xrp;
	 				dataStor8 = data.data.xrp_cny;
	 				
	 				//渲染EOS
	 				$("#assetEosData1").text(data.data.eos_price);
	 				$("#assetEosData2").text(data.data.eos);
	 				$("#assetEosData3").text(data.data.eos_cny);
	 				dataStor9 = data.data.eos_price;
	 				dataStor10 = data.data.eos;
	 				dataStor11 = data.data.eos_cny;
	 				
	 			}else{
	 				toast(data.msg);
	 			}
			});
		}
		
		//定义隐藏数据函数
		function hideData(toggle){
			if(toggle == "0"){
				//渲染头部数据
	 				$("#assetHeadData1").text(dataStor1);
	 				$("#assetHeadData2").text(dataStor2);
	 				
	 				//渲染平台币
	 				$("#assetPtbData1").text(dataStor3);
	 				$("#assetPtbData2").text(dataStor4);
	 				$("#assetPtbData3").text(dataStor5);
	 			
	 				//渲染瑞波币
	 				$("#assetXrpData1").text(dataStor6);
	 				$("#assetXrpData2").text(dataStor7);
	 				$("#assetXrpData3").text(dataStor8);
	 				
	 				//渲染EOS
	 				$("#assetEosData1").text(dataStor9);
	 				$("#assetEosData2").text(dataStor10);
	 				$("#assetEosData3").text(dataStor11);
			}else{
				$("#assetHeadData1").text("*****");
 				$("#assetHeadData2").text("*****");
 				
 				//渲染平台币
 				$("#assetPtbData1").text("*****");
 				$("#assetPtbData2").text("*****");
 				$("#assetPtbData3").text("*****");
 			
 				//渲染瑞波币
 				$("#assetXrpData1").text("*****");
 				$("#assetXrpData2").text("*****");
 				$("#assetXrpData3").text("*****");
 				
 				//渲染EOS
 				$("#assetEosData1").text("*****");
 				$("#assetEosData2").text("*****");
 				$("#assetEosData3").text("*****");
			}
		}
	});
});