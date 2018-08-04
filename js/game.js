//2018-05-06 00:15
//HQS

	
	//PC端的部分样式
	
    
    
//提示弹窗
function toastDiv(toastHtml){
   	$('.toastInfo span,.pop_up_prompts span').html(toastHtml);
   	$('.toastInfo,.pop_up_prompts').fadeIn(1000).fadeOut(4000);
}



//2018-07-13
//HQS
//moble/移动端部分js代码

$("#unfold1").on("click",function(){
	$(".main").css({height:"auto",overflow:"auto"});
	$(this).addClass("dis_none");
	$("#unfold2").removeClass("dis_none");
});
$("#unfold2").on("click",function(){
	$(".main").css({height:"6rem",overflow:"hidden"});
	$(this).addClass("dis_none");
	$("#unfold1").removeClass("dis_none");
});

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


function GameEvent(){
    $.ajax({
        type:"get",
        url:"/api/eventperformance/",
        async:true,
        data:{"game_id":getUrlParms('game_id'),"offset":0,"limit":10},
        contentType:"application/json",
        dataType:"json",
        success:function(res){
            if ( res.code == 0 ) {
                var e_html = '<p class="contentHeader"><img src="img/public/icon_2.png"/>赛事列表</p>';
                $.each(res.datas,function(i,item){
                    e_html += '<div class="events shadow2 fix">'+
                                    '<a class="fix" href="competition.html?event_id='+item.id+'">'+
                                        '<p class="description apostrophe"><img src="img/public/icon_AllGames1.png"/>'+item.event_title+'</p>'+
                                        '<p class="money"><img src="img/public/icon_PopularEvents1.png"/>'+item.total_bonus+'</p>'+
                                        '<p class="time"><img src="img/public/icon_PopularEvents2.png"/>'+item.apply_start_time+' 报名开始</p>'+
                                        '<p class="number"><img src="img/public/icon_PopularEvents3.png"/>'+item.has_member+'/'+item.max_member+'</p>'+
                                        '<p class="condition"><span class="bgCondition1"></span>'+item.event_status+'</p>'+
                                        '<p class="category bgColor1"><span>'+item.event_type_name+'</span></p>'+
                                    '</a>'+
                                '</div>'
                                            
                });
                if (res.datas.length<=0){
                    e_html +='<div class="events fix"><p align="center" class="notHave">暂时还没有参赛喔~</p></div>'
                }
                $(".PopularEvents").append(e_html);
            } else{
                console.log(res.msg);
            }
        },error:function(res){
            console.log(res.message);
        }
    });
}
//GameEvent();