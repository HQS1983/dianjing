//2018-05-06 00:15
//HQS

$(function(){
	
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
	
    function mynews(){
        $.ajax({
            type:"get",
            url:"/api/usermessage/",
            async:true,
            data:{"token":getCookie('yz_tk'),
            "user_id":getCookie('yz_id')},
            contentType:"application/json",
            dataType:"json",
            success:function(res){
                if ( res.code == 0 ) {
                    var html = '';
                    $.each(res.datas,function(i,item){
                        html +='<div class="content fix">'+
                                    '<a href="javascript:;">'+
                                        '<p class="abstract">'+item.message+'</p>'+
                                        '<p class="time"><img src="img/userCenter/icon_time.png"/>&nbsp;&nbsp;'+item.create_time+'</p>'+
                                    '</a>'+
                                '</div>'
                    });
                    $(".mynews").append(html)
                    if (res.datas.length==0){
                        $(".noGame").removeClass("dis_none")
                    }

                } else{
                    console.log(res.msg);
                }
            },error:function(res){
                console.log(res.message);
            }
        });
    }
//  mynews();
});
