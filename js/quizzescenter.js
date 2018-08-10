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
    $("#icon_shop,#icon_recharge").on("click",function(){
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
	
	
	//游戏列表
	$("#selectGame").on("click",function(){
		var GameList = $(this).siblings(".lsit").attr("data-switch");
		var length = $(this).siblings(".lsit").children().length;
		if (GameList==0) {
			$(this).siblings(".lsit").animate({height:length*1.5+"rem",opacity:"1"},100);
			$(this).siblings(".lsit").attr("data-switch","1");
			$(this).siblings(".icon_dropDown").attr("src","img/index/calendar_pullUp.png");
		} else{
			$(this).siblings(".lsit").animate({height:"0rem",opacity:"0"},100);
			$(this).siblings(".lsit").attr("data-switch","0");
			$(this).siblings(".icon_dropDown").attr("src","img/quizzescenter/icon_dropDown.png");
		}
		if($("#StatusList").attr("data-switch") == 1){
			$("#StatusList").animate({height:"0rem",opacity:"0"},100);
			$("#StatusList").attr("data-switch","0");
			$("#StatusList").prev(".icon_dropDown").attr("src","img/quizzescenter/icon_dropDown.png");
		}
	});
	
	
	$(".lsit p").on("click",function(){
		$(this).parent().prev().prev().text($(this).text());
		$(this).parent(".lsit").animate({height:"0rem",opacity:"0"},100);
		$(this).parent(".lsit").attr("data-switch","0");
		$(this).parent().prev(".icon_dropDown").attr("src","img/quizzescenter/icon_dropDown.png");
	});
	
	
	//游戏比赛 状态
	$("#selectStatus").on("click",function(){
		var GameList = $(this).siblings(".lsit").attr("data-switch");
		var length = $(this).siblings(".lsit").children().length;
		if ( GameList==0 ) {
			$(this).siblings(".lsit").animate({height:length*1.505+"rem",opacity:"1"},100);
			$(this).siblings(".lsit").attr("data-switch","1");
			$(this).siblings(".icon_dropDown").attr("src","img/index/calendar_pullUp.png");
		} else{
			$(this).siblings(".lsit").animate({height:"0rem",opacity:"0"},100);
			$(this).siblings(".lsit").attr("data-switch","0");
			$(this).siblings(".icon_dropDown").attr("src","img/quizzescenter/icon_dropDown.png");
		}
		if($("#GameList").attr("data-switch") == 1){
			$("#GameList").animate({height:"0rem",opacity:"0"},100);
			$("#GameList").attr("data-switch","0");
			$("#GameList").prev(".icon_dropDown").attr("src","img/quizzescenter/icon_dropDown.png");
		}
	});
	
	//加载 竞猜列表
	function selectGuess(val){
		var html="",html1="",html2="";
		for(var QQ=0; QQ<=2; QQ++ ){
			if (QQ==0) {
				html1+= '<div class="guessingList shadow2 fix">'+
							'<p class="title stair apostrophe">吉林市JCG.ACE荒野行动争霸赛</p>'+
							'<p class="title second apostrophe">吃鸡队伍的剩余人数为单数还是双数</p>'+
							'<div class="zone fix" href="javascript:;">'+
								'<div class="game game1">'+
									'<div class="module module1"><img src="img/quizzescenter/odd.png"></div>'+
									'<div class="module2">'+
										'<p class="TeamName apostrophe">赔率</p>'+
										'<p class="odds">1.7</p>'+
									'</div>'+
								'</div>'+
								'<div class="game game2">'+
									'<div class="status"><button class="bottomPour" id="bottomPour1" type="button">投注</button></div>'+
									'<p class="">1小时后结束</p>'+
								'</div>'+
								'<div class="game game3">'+
									'<div class="module2">'+
										'<p class="TeamName apostrophe">赔率</p>'+
										'<p class="odds">2.01</p>'+
									'</div>'+
									'<div class="module1"><img src="img/quizzescenter/dual.png"></div>'+
								'</div>'+
							'</div>'+
							'<a class="moreGuessing" href="competition.html">查看详情>></a>'+
						'</div>';
			} else{
				html1+= '<div class="guessingList shadow2 fix">'+
							'<p class="title stair apostrophe">吉林市JCG.ACE荒野行动争霸赛</p>'+
							'<p class="title second apostrophe">下一场胜利的队伍</p>'+
							'<div class="zone fix" href="javascript:;">'+
								'<div class="game game1">'+
									'<div class="module1">'+
										'<img src="img/game/icon_Wings1.png">'+
										'<p class="teamName apostrophe">SuningGaming</p>'+
									'</div>'+
									'<div class="module2">'+
										'<p class="TeamName apostrophe">赔率</p>'+
										'<p class="odds">1.7</p>'+
									'</div>'+
								'</div>'+
								'<div class="game game2">'+
									'<div class="status"><button class="bottomPour" id="bottomPour1" type="button">投注</button></div>'+
									'<p class="">1小时后结束</p>'+
								'</div>'+
								'<div class="game game3">'+
									'<div class="module2">'+
										'<p class="TeamName apostrophe">赔率</p>'+
										'<p class="odds">2.01</p>'+
									'</div>'+
									'<div class="module1">'+
										'<img src="img/game/icon_Wings2.png">'+
										'<p class="teamName apostrophe">FunPlusx</p>'+
									'</div>'+
								'</div>'+
							'</div>'+
							'<a class="moreGuessing" href="competition.html">查看详情>></a>'+
						'</div>';
			}
//			html1 += '<div class="swiper-slide"><a class="banner_con fix" href="news.html"><img src="img/index/banner'+(QQ+1)+'.jpg"/></a></div>';
		}
		html += '<div class="betDetails fix">'+
					html1+
				'</div>';
		$(".select .content").append(html);
	}
	selectGuess();
});
