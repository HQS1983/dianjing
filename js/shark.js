//2018-05-06 00:15
//HQS

$(function(){

	//PC端的部分样式
    	
    $(".Crunchies").on("click",function(){
    	if ( $(this).index() == 0 ) {
    		$(this).addClass("avter");
    		$(this).siblings().removeClass("avter");
    		$(".historyResults").removeClass("dis_none");
    		$(".NearlyWeek").addClass("dis_none");
    	} else{
    		$(this).addClass("avter");
    		$(this).siblings().removeClass("avter");
    		$(".NearlyWeek").removeClass("dis_none");
    		$(".historyResults").addClass("dis_none");
    	}
	});



    
    //moble/移动端部分js代码

	
	
	//赛事详情-对抗  开始
	//对阵图、赛程、排行
	$(".grouping").on("click",function(){
		var dataVal = $(this).parent().parent().attr("data-val");
		$(this).addClass("avter");
		$(this).siblings().removeClass("avter");
		if (dataVal==0) {
			$(".box1 .sortTitle").text($(this).text());
		} else{
			$(".box2 .contentTitle").text($(this).text());
		}
	});
	
	//赛程    排行
	function CrunchiesRanking2(){
		var html="";
		for(var o=0;o<=3;o++ ){
			html += '<div class="lump fix">'+
						'<p class="contentHeader">SunimgGaming</p>'+
						'<div class="chunk">'+
							'<div class="piece fix">'+
								'<div class="left fix">'+
									'<span class="list apostrophe">选手</span>'+
									'<span class="list apostrophe">头像</span>'+
									'<span class="list apostrophe">扑救次数</span>'+
									'<span class="list apostrophe">铲球</span>'+
									'<span class="list apostrophe">拦截次数</span>'+
									'<span class="list apostrophe lineHeight">横传球<br />次数</span>'+
									'<span class="list apostrophe lineHeight">完成<br />传球次数</span>'+
								'</div>'+
								'<div class="content fix">'+
									'<div class="list">'+
										'<span class="ranking apostrophe">精钢狼</span>'+
										'<span class="teamLogo"><img src="img/public/icon_Crunchies1.png"></span>'+
										'<span class="TeamName apostrophe">7</span>'+
										'<span class="TeamName apostrophe">7</span>'+
										'<span class="TeamName apostrophe">5</span>'+
										'<span class="TeamName apostrophe">3</span>'+
										'<span class="TeamName apostrophe">3</span>'+
									'</div>'+
									'<div class="list">'+
										'<span class="ranking apostrophe">精钢狼</span>'+
										'<span class="teamLogo"><img src="img/public/icon_Crunchies1.png"></span>'+
										'<span class="TeamName apostrophe">7</span>'+
										'<span class="TeamName apostrophe">7</span>'+
										'<span class="TeamName apostrophe">5</span>'+
										'<span class="TeamName apostrophe">3</span>'+
										'<span class="TeamName apostrophe">3</span>'+
									'</div>'+
									'<div class="list">'+
										'<span class="ranking apostrophe">精钢狼</span>'+
										'<span class="teamLogo"><img src="img/public/icon_Crunchies1.png"></span>'+
										'<span class="TeamName apostrophe">7</span>'+
										'<span class="TeamName apostrophe">7</span>'+
										'<span class="TeamName apostrophe">5</span>'+
										'<span class="TeamName apostrophe">3</span>'+
										'<span class="TeamName apostrophe">3</span>'+
									'</div>'+
									'<div class="list">'+
										'<span class="ranking apostrophe">精钢狼</span>'+
										'<span class="teamLogo"><img src="img/public/icon_Crunchies1.png"></span>'+
										'<span class="TeamName apostrophe">7</span>'+
										'<span class="TeamName apostrophe">7</span>'+
										'<span class="TeamName apostrophe">5</span>'+
										'<span class="TeamName apostrophe">3</span>'+
										'<span class="TeamName apostrophe">3</span>'+
									'</div>'+
								'</div>'+
							'</div>'+
							'<div class="receptacle">'+
								'<span class="capacity" style="width: 45%;"></span>'+
							'</div>'+
						'</div>'+
					'</div>';
		}
		$(".box3").append(html);
	}
	CrunchiesRanking2();
	
	/*战队主页   一键招募*/
	$(".share1").on('click', function() {
		popupArise();
		$('.share').removeClass('dis_none');

		$(".hideAside").on('click', function() {
			if ( $(".share").attr("class") == "share fix" ) {
				popupClose();
				$('.share').addClass('dis_none');
			} else{
				return false;
			}
		});
	});

	//赛事详情-对抗  结束
});

	

