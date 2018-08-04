//2018-05-06 00:15
//HQS

//PC端的部分样式


//moble/移动端部分js代码
    
  
    $(".aButton").on("click",function(){
	var num = $(this).index();
	$(this).addClass("avter");
	$(this).siblings().removeClass("avter");
});

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


//循环  已有的审核消息
function audit(){
	var html="";
	for(var QQ=1; QQ<=3; QQ++ ){
		html += '<div class="module fix">'+
					'<div class="topDiv fix">'+
	                    '<div class="left"><img src="img/public/icon_head.png"/></div>'+
	                    '<div class="right">'+
	                        '<p class="name apostrophe">'+QQ+'金刚狼</p>'+
	                        '<p class="leaveWord">我想加入强大的你们，  为人民服务！</p>'+
	                    '</div>'+
	                '</div>'+
	                '<div class="buttonDIV">'+
	                    '<button class="buttonStyle pass" type="button" onclick="">通过</button>'+
	                    '<button class="buttonStyle refuse" type="button" onclick="">拒绝</button>'+
	                '</div>'+
				'</div>';
	}
	$(".audit .content").append(html);
}
audit();

// 获取战队类型
function CheckTeamMember(check){
    $.ajax({
        type:"get",
        url:"/api/checkteammember/",
        async:false,
        data:{"token":getCookie('yz_tk'),"user_id":getCookie('yz_id'),"offset":0,"limit":100},
        contentType:"application/json",
        dataType:"json",
        success:function(res){
            if ( res.code == 0 ) {
                var html = ''
                $.each(res.datas,function(i,item){
                    html +='<div class="content fix">'+
                                '<div class="topDiv fix">'+
                                    '<div class="left"><img src="'+item.icon+'"/></div>'+
                                    '<div class="right">'+
                                        '<p class="name">'+item.nickname+'</p>'+
                                        '<p class="leaveWord">'+item.detail+'</p>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="buttonDIV">'+
                                    '<button class="buttonStyle pass" type="button" onclick="check('+item.id+',1);">通过</button>'+
                                    '<button class="buttonStyle refuse" type="button" onclick="check('+item.id+',2);">拒绝</button>'+
                                '</div>'+
                            '</div>'
                });
                if (check==1){
                	$(".audit").html(html);
                }else{

                    $(".audit").append(html);
                }
                if (res.datas.length==0){
                	$(".noGame").removeClass('dis_none')
                }
            } else{
                $(".noGame").removeClass('dis_none').text(res.msg)
            }
        },error:function(res){
            console.log(res.message);
        }
    });

}
//	    CheckTeamMember();
function check(id,status){
    $.ajax({
        type:"put",
        url:"/api/checkteammember/",
        async:false,
        data:JSON.stringify({"token":getCookie('yz_tk'),"user_id":getCookie('yz_id'),"id":id,"status":status}),
        contentType:"application/json",
        dataType:"json",
        success:function(res){
            if ( res.code == 0 ) {
    	    	layer.msg(res.msg);
		    	setTimeout(function() {
		    		CheckTeamMember(1);
		    	}, 2000);
            } else{
                layer.msg(res.msg);
            }
        },error:function(res){
            console.log(res.message);
        }
    });
}
