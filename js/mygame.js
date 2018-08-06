//2018-05-06 00:15
//HQS

	
	//PC端的部分样式
	
    
    
//提示弹窗
function toastDiv(toastHtml){
   	$('.toastInfo span,.pop_up_prompts span').html(toastHtml);
   	$('.toastInfo,.pop_up_prompts').fadeIn(1000).fadeOut(4000);
}






//2018-08-03   15"15:31"
//HQS
//moble/移动端部分js代码

//循环已添加的游戏
function mygame(){
	var html="",playArea="";
	for(var QQ=0; QQ<=9; QQ++ ){
		html += '<div class="module fix">'+
					'<div class="left"><img src="img/allgame/'+(QQ+1)+'.png"/></div>'+
					'<div class="middle">'+
						'<p class="gameName apostrophe">'+(QQ+1)+'战警精钢狼</p>'+
						'<p class="gameRegione apostrophe">广东区-至尊王者服</p>'+
						'<p class="gameGrade apostrophe">精英军士</p>'+
					'</div>'+
					'<div class="right fix">'+
						'<button class="buttonStyle alter ChangeBinding" type="button">更改绑定</button>'+
						'<button class="buttonStyle delete removeGame" type="button"><img src="img/userCenter/icon_trashCan.png"/></button>'+
					'</div>'+
				'</div>';
	}
	$(".mygame .content").append(html);
}
mygame();


//更改绑定
$(".ChangeBinding").on("click",function(){
	popupArise();
	
	var subscript = $(this).parent().parent().index();//查找点击更改绑定 对应游戏所在的下标
	$(".BindingRole").attr("data-subscript",subscript);//返回给弹窗“绑定角色选区”   选择的   对应游戏所在的下标
	$(".BindingRole").attr("data-judge","1");//告诉  弹窗“绑定角色选区” 是【更改绑定】按钮  触发的
	$(".BindingRole").removeClass("dis_none");
});


//删除游戏
$(".removeGame").on("click",function(){
	popupArise();
	var subscript = $(this).parent().parent().index();//查找点击更改绑定 对应游戏所在的下标
	$(".BindingRole").attr("data-subscript",subscript);//返回给弹窗“绑定角色选区”   选择的   对应游戏所在的下标
	$(".removeGamePopup").removeClass("dis_none");
});

//确认  删除游戏
$("#removeGameAffirm").on("click",function(){
	var subscript = $(".BindingRole").attr("data-subscript");//选择的   对应游戏所在的下标
	$(".mygame .module").eq(subscript).remove("div.module");
	popupClose();
	$(".removeGamePopup").addClass("dis_none");
});


//添加游戏按钮
$("#addGame").on("click",function(){
	popupArise();
	$(".addGame").removeClass("dis_none");
});



//循环可添加的游戏
function check(){
	var html="",playArea="";
	for(var QQ=1; QQ<=10; QQ++ ){
		if(QQ==1){
			playArea="王者荣耀";
		}else if (QQ==2) {
			playArea="贪玩蓝月";
		}else if (QQ==3) {
			playArea="楚留香";
		}else if (QQ==4) {
			playArea="第五人格";
		}else if (QQ==5) {
			playArea="荒野行动";
		}else if (QQ==6) {
			playArea="绝地逃生";
		}else if (QQ==7) {
			playArea="山海异闻录";
		}else if (QQ==8) {
			playArea="天涯明月刀";
		}else if (QQ==9) {
			playArea="阴阳师";
		}else if (QQ==10) {
			playArea="择天记";
		}
		html += '<a class="check fix fix" href="javascript:;">'+
					'<img src="img/allgame/'+QQ+'.png"/>'+
					'<p class="apostrophe">'+playArea+'</p>'+
				'</a>';
	}
	$(".addGame .main").append(html);
}
check();

//选择游戏
$(".check").on("click",function(){
	var imgNum = $(this).children("img").attr("src");
	var imgName = $(this).children("p").text();
	$(".bg").attr("data-imgNum",imgNum);
	$(".bg").attr("data-imgName",imgName);
	$(".addGame").addClass("dis_none");
	$(".BindingGame").removeClass("dis_none");
});

//绑定新游戏   下一步
$("#nextStep").on("click",function(){
	if ($("#accounts").val() == "" ) {
		layer.msg("帐号不能为空！");
		return false;
	}
	if ($("#password").val() == "" ) {
		layer.msg("密码不能为空！");
		return false;
	}
	$(".BindingGame").addClass("dis_none");
	$(".BindingRole").removeClass("dis_none");
});

//绑定 弹窗
$("#BindingRoleAffirm").on("click",function(){
	var judge = $(".BindingRole").attr("data-judge");//【注意】此属性：判断是添加游戏   还是更改绑定
	
	var subscript = $(".BindingRole").attr("data-subscript");//【更改绑定】按钮  触发的 对应游戏所在的下标
	
	var precinct = $("#precinct").val();//游戏的【区】
	var ChooseSuit = $("#ChooseSuit").val();//游戏的【服】
	if ( judge == 0 ) {
		var imgNum = $(".bg").attr("data-imgNum");//所选的游戏图片
		var imgName = $(".bg").attr("data-imgName");//所选的游戏名字
		html= '<div class="module fix">'+
					'<div class="left"><img src="'+imgNum+'"/></div>'+
					'<div class="middle">'+
						'<p class="gameName apostrophe">'+imgName+'</p>'+
						'<p class="gameRegione apostrophe">'+precinct+'-'+ChooseSuit+'</p>'+
						'<p class="gameGrade apostrophe">精英军士</p>'+
					'</div>'+
					'<div class="right fix">'+
						'<button class="buttonStyle alter ChangeBinding" type="button">更改绑定</button>'+
						'<button class="buttonStyle delete removeGame" type="button"><img src="img/userCenter/icon_trashCan.png"/></button>'+
					'</div>'+
				'</div>';
		$(".mygame .content").append(html);
		layer.msg("添加成功！");
	} else{
		$(".module").eq(subscript).find("p.gameRegione").text(precinct+"-"+ChooseSuit);
		$(".BindingRole").attr("data-judge","0");
		layer.msg("更改成功！");
	}
		
	popupClose();
	$(".BindingRole").addClass("dis_none");
});
//点  弹窗  绑定角色选区  的【取消】按钮
$(".occlude").on("click",function(){
	$(".BindingRole").attr("data-judge","0");
});



//移动端 
//防止页面无游戏、或游戏过少，导致页面背景颜色混乱
function paddingBottom(){
	var height = $(window).height()-48;
	if ( $(window).width() <= 450 ) {
		if ( $(".mygame").attr("class") == "framing mygame fix dis_none" && $(".noGame").attr("class") == "noGame" ) {
			$(".mobile").css("padding-bottom",height);
		}
	}
}
//		paddingBottom();