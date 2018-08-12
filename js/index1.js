//2018-05-06 00:15
//HQS

$(function(){
	
	//PC端的部分样式
	
    
    //提示弹窗
    function toastDiv(toastHtml){
	   	$('.toastInfo span,.pop_up_prompts span').html(toastHtml);
	   	$('.toastInfo,.pop_up_prompts').fadeIn(1000).fadeOut(4000);
	}
    
    //以下代码为控制页面右侧 页面滚动出现“返回顶部”按钮
    var d_top = $('#com_d');
    $(document).scroll(function(){
        var scrTop = (document.body.scrollTop || document.documentElement.scrollTop);
        if (scrTop > 700){ d_top.show(); } else { d_top.hide(); }
    });
    $('#com_d').click(function() {
		$('html,body').animate({scrollTop: '0px'}, 500);
	});
    
    
    
    
    
    
    //moble/移动端部分js代码
        
    //点击关注按钮
    $("#navButtonAttention").on("click",function(){
    	layer.msg("此功能暂未开放！");
    });

	//循环首页 顶部  海报
	function bannerSwiper(){
		var html="";
		for(var QQ=0; QQ<=3; QQ++ ){
			html += '<div class="swiper-slide"><a class="banner_con fix" href="news.html"><img src="img/index/banner'+(QQ+1)+'.jpg"/></a></div>';
		}
		$("#bannerSwiper .swiper-wrapper").append(html);
	}
	bannerSwiper();
	//首页 顶部 海报  图片轮播
	var mySwiper = new Swiper('#bannerSwiper',{
			loop: true,//在原本slide前后复制若干个slide(默认一个)并在合适的时候切换，让Swiper看起来是循环的
//			autoplay:3000,
//			speed:3000,
			//grabCursor : true,//鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
			//parallax:true,//开启视差效果,需要的元素上增加data-swiper-parallax属性
	        autoplayDisableOnInteraction : false,
			pagination: '#bannerpagination',
			paginationClickable :true,//此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
	});
	
    
    //获取完整的日期
    function acquisitionTime(){
    	window.date = new Date();
	    window.year = date.getFullYear();
	    window.month = date.getMonth() + 1;
	    window.strDate = date.getDate();
    }
    
    //获取完整的日期
	function getNowFormatDate() {
	    acquisitionTime();
	    NoCompetitiontoday(strDate);
	    window.d = new Date(year, (date.getMonth()+1), 0);
	    window.dataNum=d.getDate();
		bannerSwiper2(d.getDate());
	    $(".Aleft").attr("data-month",month);//当前月份
	    $(".Aleft").attr("data-addUp",month);//当前跳转月份
	    $(".Aright").attr("data-month",month);//当前月份
	    $(".Aright").attr("data-addUp",month);//当前跳转月份
        if ( month == 1 ) {
        	Aleft = "去年十二月";
        	month = "一月";
        	Aright = "二月";
        } else if ( month == 2 ) {
        	Aleft = "一月";
        	month = "二月";
        	Aright = "三月";
        } else if ( month == 3 ) {
        	Aleft = "二月";
        	month = "三月";
        	Aright = "四月";
        } else if ( month == 4 ) {
        	Aleft = "三月";
        	month = "四月";
        	Aright = "五月";
        } else if ( month == 5 ) {
        	Aleft = "四月";
        	month = "五月";
        	Aright = "六月";
        } else if ( month == 6 ) {
        	Aleft = "五月";
        	month = "六月";
        	Aright = "七月";
        } else if ( month == 7 ) {
        	Aleft = "六月";
        	month = "七月";
        	Aright = "八月";
        } else if ( month == 8 ) {
        	Aleft = "七月";
        	month = "八月";
        	Aright = "九月";
        } else if ( month == 9 ) {
        	Aleft = "八月";
        	month = "九月";
        	Aright = "十月";
        } else if ( month == 10 ) {
        	Aleft = "九月";
        	month = "十月";
        	Aright = "十一月";
        } else if ( month == 11 ) {
        	Aleft = "十月";
        	month = "十一月";
        	Aright = "十二月";
        } else if ( month == 12 ) {
        	Aleft = "十一月";
        	month = "十二月";
        	Aright = "新年一月";
        }

	    $(".MONTH").text(month);
	    $(".Aleft").text(Aleft);
	    $(".Aright").text(Aright);
	}
	getNowFormatDate();
	
	
    //当前赛事  月份选择 【左边】
	$(".Aleft").on("click",function(){
		acquisitionTime();
//	    NoCompetitiontoday();
		strDate=1;
	    var i = parseInt($(this).attr("data-num"));
	    var val = parseInt($(this).attr("data-val"));
	    
		var dataMonth = parseInt($(this).attr("data-month"));//当前月份
		var addUp = parseInt($(this).attr("data-addUp"));//当前跳转月份
		console.log(addUp);
	    if ( (addUp-1) >= 1 ) {
	    	if ( (addUp-1) < (date.getMonth() + 1) ) {
	    		dd = new Date(year, (date.getMonth() + 1-val), 0);
		    	dataNum2=dd.getDate();
			    $(this).attr("data-val",val+1);
		    	$(".Aright").attr("data-val",val+1);
		    	
		    	console.log((date.getMonth() + 1-val)+"月份");
			    console.log(dataNum2+"个日子");
	    	}else if( (addUp-1) == (date.getMonth() + 1) ){
	    		dd = new Date(year, (date.getMonth() + 1), 0);
		    	dataNum2=dd.getDate();
		    	$(this).attr("data-val","1");
		    	$(".Aright").attr("data-val","1");
		    	
		    	console.log((date.getMonth() + 1)+"月份");
			    console.log(dataNum2+"个日子");
	    	}else{
	    		dd = new Date(year, (date.getMonth() + 1+(val-2)), 0);
		    	dataNum2=dd.getDate();
		    	$(this).attr("data-val",val-1);
		    	$(".Aright").attr("data-val",val-1);
		    	
		    	console.log((date.getMonth() + 1+(val-2))+"月份");
			    console.log(dataNum2+"个日子");
	    	}
		    	
		    html="";
		    $("#bannerSwiper2 .swiper-wrapper").html(html);
		    bannerSwiper2(dd.getDate());
		    $(this).attr("data-num",i+1);
		    
		    $(".Aleft,.Aright").attr("data-addUp",addUp-1);
		    mySwiper.slideTo(0, 1000, false);
	    }else{
	    	return false;
	    }

		var thisText = $(this).text();
		if( thisText == "一月" ){
			$(this).text("去年十二月");
			$(".MONTH").text("一月");
			$(".Aright").text("二月");
		} else if( thisText == "二月" ){
			$(this).text("一月");
			$(".MONTH").text("二月");
			$(".Aright").text("三月");
		} else if( thisText == "三月" ){
			$(this).text("二月");
			$(".MONTH").text("三月");
			$(".Aright").text("四月");
		} else if( thisText == "四月" ){
			$(this).text("三月");
			$(".MONTH").text("四月");
			$(".Aright").text("五月");
		} else if( thisText == "五月" ){
			$(this).text("四月");
			$(".MONTH").text("五月");
			$(".Aright").text("六月");
		} else if( thisText == "六月" ){
			$(this).text("五月");
			$(".MONTH").text("六月");
			$(".Aright").text("七月");
		} else if( thisText == "七月" ){
			$(this).text("六月");
			$(".MONTH").text("七月");
			$(".Aright").text("八月");
		} else if( thisText == "八月" ){
			$(this).text("七月");
			$(".MONTH").text("八月");
			$(".Aright").text("九月");
		} else if( thisText == "九月" ){
			$(this).text("八月");
			$(".MONTH").text("九月");
			$(".Aright").text("十月");
		} else if( thisText == "十月" ){
			$(this).text("九月");
			$(".MONTH").text("十月");
			$(".Aright").text("十一月");
		} else if( thisText == "十一月" ){
			$(this).text("十月");
			$(".MONTH").text("十一月");
			$(".Aright").text("十二月");
		}
	});
	
	//当前赛事  月份选择 【右边】
	$(".Aright").on("click",function(){
		acquisitionTime();
	    var i = parseInt($(this).attr("data-num"));
	    var val = parseInt($(this).attr("data-val"));
	    
		var dataMonth = parseInt($(this).attr("data-month"));//当前月份
		var addUp = parseInt($(this).attr("data-addUp"));//当前跳转月份
		console.log(addUp);
	    if ( (addUp+1) <= 12 ) {
	    	if ( (addUp+1) > (date.getMonth() + 1) ) {
	    		dd = new Date(year, (date.getMonth() + 1+val), 0);
		    	dataNum2=dd.getDate();
			    $(this).attr("data-val",val+1);
			    $(".Aleft").attr("data-val",val+1);
			    
		    	console.log((date.getMonth() + 1+val)+"月份");
			    console.log(dataNum2+"个日子");
	    	}else if( (addUp+1) == (date.getMonth() + 1) ){
	    		dd = new Date(year, (date.getMonth() + 1), 0);
		    	dataNum2=dd.getDate();
		    	$(this).attr("data-val","1");
		    	$(".Aright").attr("data-val","1");
		    	
		    	console.log((date.getMonth() + 1)+"月份");
			    console.log(dataNum2+"个日子");
	    	} else{
	    		dd = new Date(year, (date.getMonth() + 1-(val-2)), 0);
		    	dataNum2=dd.getDate();
			    $(this).attr("data-val",val-1);
			    $(".Aleft").attr("data-val",val-1);
			    
		    	console.log((date.getMonth() + 1-(val-2))+"月份");
			    console.log(dataNum2+"个日子");
	    	}
		    	
		    html="";
		    $("#bannerSwiper2 .swiper-wrapper").html(html);
		    bannerSwiper2(dd.getDate());
		    $(this).attr("data-num",i+1);
		    $(".Aleft,.Aright").attr("data-addUp",addUp+1);
		    mySwiper.slideTo(0, 1000, false);
	    }else{
	    	return false;
	    }
		
		var thisText = $(this).text();
		
		if( thisText == "二月" ){
			$(".Aleft").text("一月");
			$(".MONTH").text("二月");
			$(this).text("三月");
		} else if( thisText == "三月" ){
			$(".Aleft").text("二月");
			$(".MONTH").text("三月");
			$(this).text("四月");
		} else if( thisText == "四月" ){
			$(".Aleft").text("三月");
			$(".MONTH").text("四月");
			$(this).text("五月");
		} else if( thisText == "五月" ){
			$(".Aleft").text("四月");
			$(".MONTH").text("五月");
			$(this).text("六月");
		} else if( thisText == "六月" ){
			$(".Aleft").text("五月");
			$(".MONTH").text("六月");
			$(this).text("七月");
		} else if( thisText == "七月" ){
			$(".Aleft").text("六月");
			$(".MONTH").text("七月");
			$(this).text("八月");
		} else if( thisText == "八月" ){
			$(".Aleft").text("七月");
			$(".MONTH").text("八月");
			$(this).text("九月");
		} else if( thisText == "九月" ){
			$(".Aleft").text("八月");
			$(".MONTH").text("九月");
			$(this).text("十月");
		} else if( thisText == "十月" ){
			$(".Aleft").text("九月");
			$(".MONTH").text("十月");
			$(this).text("十一月");
		} else if( thisText == "十一月" ){
			$(".Aleft").text("十月");
			$(".MONTH").text("十一月");
			$(this).text("十二月");
		} else if( thisText == "十二月" ){
			$(".Aleft").text("十一月");
			$(".MONTH").text("十二月");
			$(this).text("新年一月");
			return false;
		}
	});
	
	
	//循环每月的日子
	function bannerSwiper2(dataNum){
		var html="",playArea="";
		for(var QQ=1; QQ<=dataNum; QQ++ ){
			html += '<div class="swiper-slide"><a href="javascript:;">'+QQ+'</a></div>';
		}
		$("#bannerSwiper2 .swiper-wrapper").append(html);
		//$("#bannerSwiper2 .swiper-slide").eq(0).remove();
	}
	bannerSwiper2();
	
	
	//循环当前赛事当天包含的游戏【第一个】
	function pClass(activeIndex){
		var html="",playArea="";
		for(var QQ=0; QQ<=activeIndex; QQ++ ){
			if (activeIndex == 4 ) {
				playArea="王者荣耀";
				$(".indexModule").removeClass("dis_none");
				$("#pClass").removeClass("pClass2");
				$(".pullDown").attr("data-switch","0");
				$(".imgClass1").attr("src","img/allgame/1.png");
				$(".imgClass1,.spanClass").css({opacity:"1",height:"2rem"});
			} else if( activeIndex == 5){
				playArea="第五人格";
				$(".indexModule").removeClass("dis_none");
				$("#pClass").removeClass("pClass2");
				$(".pullDown").attr("data-switch","0");
				$(".imgClass1").attr("src","img/allgame/4.png");
				$(".imgClass1,.spanClass").css({opacity:"1",height:"2rem"});
			} else if( activeIndex == 6){
				playArea="山海经异兽录";
				$(".indexModule").removeClass("dis_none");
				$("#pClass").removeClass("pClass2");
				$(".pullDown").attr("data-switch","0");
				$(".imgClass1").attr("src","img/allgame/7.png");
				$(".imgClass1,.spanClass").css({opacity:"1",height:"2rem"});
			}else{
				$("#pClass").addClass("pClass2");
				$(".indexModule").addClass("dis_none");
				$(".pullDown").attr("data-switch","3");
				$(".imgClass1").attr("src","");
				$(".imgClass1,.spanClass").css({opacity:"0",height:"0"});
			}
		}
		$("#pClass").text(playArea);
	}
	//循环月初第一天  若是无赛事 的 特殊情况
	function NoCompetitiontoday(strDate){
		if ((strDate-1)==0) {
			$("#pClass").addClass("pClass2");
			$(".indexModule").addClass("dis_none");
			$(".pullDown").attr("data-switch","3");
			$(".imgClass1").attr("src","");
			$(".imgClass1,.spanClass").css({opacity:"0",height:"0"});
			$("#arrangement").html('<p align="center" class="notHave">暂无赛事情况喔~</p>');
		}
	}
	
	
	//循环当前赛事当天包含的游戏【所有】
	function EventList(activeIndex){
		var html1="",html2="";
		if (activeIndex == 4 || activeIndex == 5 || activeIndex == 6) {
			for(var hh=0; hh<=9; hh++ ){
				var name;
				if (hh==0) {
					name = "王者荣耀";
				} else if (hh==1) {
					name = "贪玩蓝月";
				} else if (hh==2) {
					name = "楚留香";
				} else if (hh==3) {
					name = "第五人格";
				} else if (hh==4) {
					name = "绝地逃生";
				} else if (hh==5) {
					name = "荒野行动";
				} else if (hh==6) {
					name = "山海经异兽录";
				} else if (hh==7) {
					name = "天涯明月刀";
				} else if (hh==8) {
					name = "阴阳士";
				} else if (hh==9) {
					name = "择天记";
				}
				html1 += '<a class="option" href="javascript:;">'+
							'<img class="imgClass" src="img/allgame/'+(hh+1)+'.png"/>'+
							'<p class="pClass apostrophe">'+name+'</p>'+
						'</a>';
			}
			$(".calendar_bottom .EventList").append(html1);
		}else{
			$(".calendar_bottom .EventList").html(html2);
		}
	}
	
	//循环  当前赛事 的其中一种游戏的赛事情况
	function arrangement(activeIndex){
		var DeviceWidth = $(window).width();//监听当前设备 的宽度，防止错位
		var html="",html2="",colour="",bgCondition="",official="",state="",gameTime="";
		if( DeviceWidth<= 320 ){
			gameTime='<p class="gameTime">比赛时间：<br />16：00-18：00</p>';
		}else{
			console.log(DeviceWidth+"abc");
			gameTime='<p class="gameTime">比赛时间：16：00-18：00</p>';
		}
		if (activeIndex == 4 || activeIndex == 5 || activeIndex == 6) {
			for(var QQ=0; QQ<=2; QQ++ ){
				if (QQ == 0) {
					colour="fontColor1";
					bgCondition="bgCondition1";
					bgGameSort="bgGameSort1";
					official="官方";
					state="预告";
				} else if(QQ==1){
					colour="fontColor2";
					bgCondition="bgCondition2";
					bgGameSort="bgGameSort2";
					official="平台";
					state="直播";
				}else{
					colour="fontColor3";
					bgCondition="bgCondition3";
					bgGameSort="bgGameSort3";
					official="业余";
					state="集锦";
				}
				html += '<a class="main fix" href="competition.html">'+
							'<img class="GamePreview" src="img/public/banner_Race'+(QQ+1)+'.png"/>'+
							'<div class="description">'+
		                    	'<p class="gameName apostrophe">'+QQ+'年ZUEL 浙江省高校电子竞技联赛春季赛</p>'+
		                    	gameTime+
		                    	'<p class="gameSort '+bgGameSort+'">'+official+'</p>'+
		                    '</div>'+
		                    '<div class="status">'+
			                    '<p class="'+colour+'"><span class="'+bgCondition+'"></span>比赛中</p>'+
			                    '<button type="button"><img src="img/index/icon_play.png"/> '+state+'</button>'+
		                    '</div>'+
		                '</a>';
			}
			$("#arrangement").html(html2);
			$("#arrangement").append(html);
		}else{
			html='<p align="center" class="notHave">暂无赛事情况喔~</p>';
			$("#arrangement").html(html);
			
		}
		
	}

	//首页 当前赛事  日历
	var mySwiper = new Swiper('#bannerSwiper2',{
			slidesPerView : 7,//设置slider容器能够同时显示的slides数量(carousel模式)
	        autoplayDisableOnInteraction : false,
	        initialSlide:(strDate-1),//用来设定页面加载完成时，第几张图片先显示出来
    		centeredSlides: true,
    		observer:true,//修改swiper自己或子元素时，自动初始化swiper
    		//observeParents:true,//修改swiper的父元素时，自动初始化swiper
    		onSlideChangeStart: function(swiper){ //回调函数，swiper从一个slide过渡到另一个slide结束时执行
    			console.log(strDate+"号");
    			pClass(swiper.activeIndex);  //当发生  滚动日历的操作，就自动循环当天的第一个游戏是否存在
    			EventList(swiper.activeIndex); //循环当前赛事当天包含的游戏【所有】
    			arrangement(swiper.activeIndex); //循环  当前赛事 的其中一种游戏的赛事情况
    			optionSelect();
    		}
		});

	//当前赛事  选择游戏  下拉列表
	$(".pullDown").on("click",function(){
		var lengthNum = $(this).next(".EventList").children("a").length;
		var dataSwitch = $(this).attr("data-switch");
		if ($(".EventList").attr("class") == "EventList dis_none" && dataSwitch == 0 ) {
			$(".EventList").removeClass("dis_none");
			$(".EventList").css("height",lengthNum*2+"rem");
			$(".pullDown").attr("data-switch","1");
			$(".spanClass").css("background-image","url(img/index/calendar_pullUp.png)");
		}else if($(".EventList").attr("class") == "EventList" && dataSwitch == 1 ){
			$(".EventList").addClass("dis_none");
			$(".EventList").css("height","0rem");
			$(".pullDown").attr("data-switch","0");
			$(".spanClass").css("background-image","url(img/index/calendar_pullDown.png)");
		}
	});
	
	//当前赛事  选择游戏
	function optionSelect(){
		$(".option").on("click",function(){
			if ($(".EventList").attr("class") == "EventList" ) {
				$(".pullDown").children("img").attr("src",$(this).children("img").attr("src"));
				$(".pullDown").children("p").text($(this).children("p").text());
				$(".EventList").css("height","0rem");
				$(".EventList").addClass("dis_none");
				$(".pullDown").attr("data-switch","0");
				$(".spanClass").css("background-image","url(img/index/calendar_pullDown.png)");
			}
		});
	}

	function GetQueryString(name) {
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
	     if(r!=null)return  unescape(r[2]); return null;
	}
	var code = GetQueryString("code");
	var _type = 'baidu'
	if (GetQueryString('state')=='test'){
		_type = 'qq'
	}

	if (code!=null) {
		$.ajax({
		    url:"/api/regist/",
		    type:"post",
		    data:JSON.stringify({"type":_type,"code":code}),
		    dataType:"json",
		    contentType:"application/json",
		    success:function(res){
		        if (res.code ==0) {
		         	setCookie('yz_tk',res.token)
		         	setCookie('yz_id',res.user_id)
		        }
			}
		});
	}
	if (window.location.host=='admin.con.com'  && getUrlParms('user_id')!=null){
		$.ajax({
		    url:"/api/user/",
		    type:"get",
		    data:{"user_id":getUrlParms('user_id')},
		    dataType:"json",
		    contentType:"application/json",
		    success:function(res){
	         	console.log(res)
	         	setCookie('yz_tk',res.token)
	         	setCookie('yz_id',res.user_id)
			}
		});			
	}

    $(".Crunchies").on("click",function(){
    	if ( $(this).index() == 0 ) {
    		$(this).addClass("avter");
    		$(this).siblings().removeClass("avter");
    		$(".TeamLIst").removeClass("dis_none");
    		$(".EventsLIst").addClass("dis_none");
    	} else{
    		$(this).addClass("avter");
    		$(this).siblings().removeClass("avter");
    		$(".EventsLIst").removeClass("dis_none");
    		$(".TeamLIst").addClass("dis_none");
    	}
	});
	
	//所有游戏
	function AllGames(){
		//var neme = {"offset":0,"limit":4};
		$.ajax({
			type:"get",
			url:"/api/game/",
			async:true,
//			data:JSON.stringify(neme),
			//data:{"offset":0,"limit":4},   
			contentType:"application/json",
			dataType:"json",               
			success:function(res){
				if ( res.code == 0 ) {
					if ( res.data.length ) {
						$.each(res.data,function(i,item){
							if( i>3 ){ return false; }
							$(".AllGames .content").append('<a class="game"  href="game.html?game_id='+
							item["id"]+'"><img src="'+
							item["icon"]+'"/><p>'+
							item["game_name"]+'</p>');
						});
                        if (res.data.length>4){
    						$(".AllGamesButton").removeClass("dis_none");
                            
                        }
					} else{
						//没有 游戏
						if (res.data.length == 0) {
							$(".AllGames .content").append('<p class="noGame">暂无游戏~</p>');
						}
						$(".AllGamesButton").addClass("dis_none");
					}
					//var Html = "";
//					for (var i=0; i <= res.data.length; i++) {
//						Html+='<a class="game" target="_blank" href="'+res.data[i].tieba_url+'"><img src="'+res.data[i].icon+'"/><p class="">'+res.data[i].game_name+'</p>'; 
//							
//						console.log(res.data[i].tieba_url);
//						console.log(res.data[i].icon);
//						console.log(res.data[i].game_name);
//						console.log(res.data[i].id);
//					}
//					$(".AllGames .content").html(Html);
				} else{
					console.log(res.msg);
				}
			},error:function(res){
				console.log(res.message);
			}
		});
	}
//	AllGames();

	//当前赛事
	function TheCurrentEvent(){
        var year = 2018;
        var month = 7
		$.ajax({
			type:"get",
			url:"/api/eventforeshow/",
			async:true,
			data:{"offset":0,"limit":100,"year":year,"month":month},
			contentType:"application/json",
			dataType:"json",
			success:function(res){
				if ( res.code == 0 ) {
					$.each(res.datas,function(i,item){
                        var status = item['status']
                        var status_class = 'status_underway'
                        var isvideo = '直播'
                        if (status=='等待开赛') {
                            isvideo = '敬请期待'
                        }else if(status =='比赛中'){
                            isvideo = '直播'
                        }else{
                            isvideo ='集锦'
                            status_class = 'status_complete'
                        }
                        var html = '<a class="main fix" href="competition.html?event_id='+item['event_id']+'"><img class="GamePreview" src="'+item['event_icon']+'"/><div class="description">'
                        html += '<p class="apostrophe">'+item['events_title']+'</p><p>'+item['event_type_name']+'</p>'
                        html += '</div><div class="status">'
                        html += '<p class="'+status_class+'"><span></span> '+item['status']+'</p>'
                        html += '<button type="button"><img src="img/icon_play.png"/> '+isvideo+'</button>'
                        html += '</div>'
                        html +='</a>'
						$(".TheCurrentEvent .content").append(html);
					});
				} else{
					console.log(res.msg);
				}
			},error:function(res){
				console.log(res.message);
			}
		});
	}
//	TheCurrentEvent();
	
	//热门赛事
	function PopularEvents(){
		$.ajax({
			type:"get",
			url:"/api/tournament/",
			async:true,
			data:{"hot_status":1,"limit":3},
			contentType:"application/json",
			dataType:"json",
			success:function(res){
				if ( res.code == 0 ) {
					$.each(res.datas,function(i,item){
                        var html = '<div class="events shadow2 fix">'+
                                '<a class="fix" href="competition.html?event_id='+item.id+'">'+
                                '<p class="description apostrophe"><img src="'+item['icon']+'"/>'+item['events_title']+'</p>'+
                                '<p class="money apostrophe"><img src="img/public/icon_PopularEvents1.png"/>'+item['total_bonus']+'</p>'+
                                '<p class="time"><img src="img/public/icon_PopularEvents2.png"/>'+item['apply_start_time']+'报名开始</p>'+
                                '<p class="number"><img src="img/public/icon_PopularEvents3.png"/>'+item['has_team']+'/'+item['max_team']+'</p>'+
                                '<p class="condition"><span class="bgCondition1"></span>'+item['status']+'</p>'+
                                '<p class="category bgColor1"><span>'+item['event_type_name']+'</span></p>'+
                                '</a>'+
                                '</div>'
						$(".PopularEvents .content").append(html);
					});
				} else{
					console.log(res.msg);
				}
			},error:function(res){
				console.log(res.message);
			}
		});
	}
//	PopularEvents();

    function  Img(img_list){
        var image = '';
        $.each(img_list,function(i,item){
            console.log(item,typeof(item))
            image += '<img src="'+item+'"/>'
        });
        return image
    }
    
    //首页 排行榜  战队榜
    function  TeamEvent(){
        $.ajax({
            type:"get",
            url:"/api/teamperformance/",
            async:true,
            data:{"performance_type":"all","limit":10},
            contentType:"application/json",
            dataType:"json",
            success:function(res){
                if ( res.code == 0 ) {
                    var html = '';
                    var rank = 0;
                    $.each(res.datas,function(i,item){
                        rank = item.rank
                        if (item.rank ==1){
                            html += '<div class="CrunchiesChampion">'
                            html += '<div class="position position_one"><a href="edg_website.html?team_id='+item.id+'"><div class="Chemistry"><img src="'+item.team_icon+'"/>'
                            html += '<p class="TeamName"><i class="apostrophe">'+item.team_name+'</i></p><span class="CrunchiesBG CrunchiesBG1"></span><span class="num">'+rank+'</span></div>'
                            html += '<div class="include"><div class="game">'+Img(item.game_icon_urls)+'</div><p><img src="img/icon_medal.png"/> '+item.competition_point+'</p></div></a></div>'
                        }else if (item.rank==2){
                            html +='<div class="position position_two"><a href="edg_website.html?team_id='+item.id+'">'+
                            '<div class="Chemistry">'+
                                '<img src="'+item.team_icon+'"/>'+
                                '<p class="TeamName"><i class="apostrophe">'+item.team_name+'</i></p>'+
                                '<span class="CrunchiesBG CrunchiesBG2"></span>'+
                                '<span class="num">'+rank+'</span>'+
                            '</div>'+
                            '<div class="include">'+
                            '<div class="game">'
                            +Img(item.game_icon_urls)+'</div><p><img src="img/public/icon_medal.png"/> '+item.competition_point+'</p></div></a></div>'
                        }else if(item.rank==3){
                            html  +='<div class="position position_three"><a href="edg_website.html?team_id='+item.id+'">'+
                                        '<div class="Chemistry">'+
                                            '<img src="'+item.team_icon+'"/>'+
                                            '<p class="TeamName"><i class="apostrophe">'+item.team_name+'</i></p>'+
                                            '<span class="CrunchiesBG CrunchiesBG3"></span>'+
                                            '<span class="num">'+rank+'</span>'+
                                        '</div>'+
                                        '<div class="include">'+
                                            '<div class="game">'+
                                            Img(item.game_icon_urls)+
                                            '</div>'+
                                            '<p><img src="img/public/icon_medal.png"/> '+item.competition_point+'</p>'+
                                        '</div>'+
                                    '</a></div>'+
                                '</div><div class="CrunchiesRanking fix">'
                        }else{
                            html +='<div class="list"><a href="edg_website.html?team_id='+item.id+'">'+
                                        '<span class="ranking">'+rank+'</span>'+
                                        '<span class="teamLogo"><img src="'+item.team_icon+'"/></span>'+
                                        '<span class="TeamName apostrophe">'+item.team_name+'</span>'+
                                        '<span class="correlationGame">'+
                                        Img(item.game_icon_urls)+
                                        '</span>'+
                                        '<span class="combatGains"><img src="img/public/icon_medal.png"/>'+item.competition_point+'</span>'+
                                    '</a></div>'


                        }
                    });

                    if (rank <= res.total){
                        html  +='<a class="viewMore viewMore1" href="edg.html">查看更多</a>'
                    }
                    $(".rankingList .TeamLIst").append(html);
                } else{
                    console.log(res.msg);
                }
            },error:function(res){
                console.log(res.message);
            }
        });


    }
//  TeamEvent();

    //赛事榜
    function EventRank(){
        $.ajax({
            type:"get",
            url:"/api/eventperformance/",
            async:true,
            data:{"offset":0,"limit":10},
            contentType:"application/json",
            dataType:"json",
            success:function(res){
                if ( res.code == 0 ) {
                    var html  = '';
                    $.each(res.datas,function(i,item){
                        var fontColor = ''
                        var bgCondition = ''
                        var event_status = item.event_status
                        if(event_status.indexOf('比赛中') > -1){
                            fontColor = 'fontColor2'
                            bgCondition = 'bgCondition2'
                        }else if (event_status.indexOf('报名中')>-1){
                            fontColor = 'fontColor2'
                            bgCondition = 'bgCondition2'                           
                        }else if (event_status.indexOf('天后开放报名')>-1){
                            fontColor = 'fontColor1'
                            bgCondition = 'bgCondition1'  
                            event_status = '预报名'
                        }else if ( event_status.indexOf('等待开赛')>-1){
                            fontColor = 'fontColor1'
                            bgCondition = 'bgCondition1'                              
                        }

                        else if (event_status.indexOf('比赛结束')>-1) {
                            fontColor = 'fontColor3'
                            bgCondition = 'bgCondition3' 
                            event_status = '已结束'
                            
                        }
                        html +='<a href="competition.html?event_id='+item.id+'"><div class="list">'+
                                    '<span class="TeamName apostrophe">'+item.event_title+'</span>'+
                                    '<span class="sort">'+item.event_type_name+'</span>'+
                                    '<span class="bonus">￥'+item.total_bonus+'</span>'+
                                    '<span class="status '+fontColor+'">'+event_status+'</span>'+
                                    '<span class="statusMap"><i class="'+bgCondition+'"></i></span>'+
                                '</div></a>'
                    });
                    if (html ==''){
                        html = '<p class="noGame">暂无赛事榜信息~</p>'
                    }
                    $(".EventsLIst .CrunchiesRanking").append(html);
                } else{
                    console.log(res.msg);
                }
            },error:function(res){
                console.log(res.message);
            }
        });       
    }
//  EventRank();

	if (getCookie("token")=='null') {
        setCookie('token',getUrlParms('token'))
    }
    if(getCookie('user_id')=='null'){

        setCookie("user_id",getUrlParms('user_id'))
    }
	
	
	//首页  底部 排行榜 根据  冠亚季军的 相关 游戏数量  小图标 自动添加样式
	var numLength1 = $(".position_one .location").children().length;
	var numLength2 = $(".position_two .location").children().length;
	var numLength3 = $(".position_three .location").children().length;
	window.onload=function(){
		if ( numLength1 == 1 ) {
			$(".position_one .location").children().eq(0).css("margin-left","45%");
		} else if ( numLength1 == 2 ) {
			$(".position_one .location").children().eq(0).css("margin-left","30%");
		} else{
			$(".position_one .location").children().eq(0).css("margin-left","15%");
		}
		if ( numLength2 == 1 ) {
			$(".position_two .location").children().eq(0).css("margin-left","45%");
		} else if ( numLength2 == 2 ) {
			$(".position_two .location").children().eq(0).css("margin-left","30%");
		} else{
			$(".position_two .location").children().eq(0).css("margin-left","15%");
		}
		if ( numLength3 == 1 ) {
			$(".position_three .location").children().eq(0).css("margin-left","45%");
		} else if ( numLength3 == 2 ) {
			$(".position_three .location").children().eq(0).css("margin-left","30%");
		} else{
			$(".position_three .location").children().eq(0).css("margin-left","15%");
		}
	}
});
