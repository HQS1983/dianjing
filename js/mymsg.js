//2018-08-03    18:21:59
//HQS


//PC端的部分样式
	
    
    
//提示弹窗
function toastDiv(toastHtml){
   	$('.toastInfo span,.pop_up_prompts span').html(toastHtml);
   	$('.toastInfo,.pop_up_prompts').fadeIn(1000).fadeOut(4000);
}






//2018-08-03    18:21:59
//HQS
//moble/移动端部分js代码

//循环  已有的私信
function mymsg(){
	var html="",playArea="";
	playArea="斌哥,借我的钱，说好还钱什么时候还呀？";
	for(var QQ=1; QQ<=4; QQ++ ){
		html += '<a class="dialogBox" href="javascript:;">'+
					'<div class="left"><img src="img/allgame/'+QQ+'.png"/></div>'+
					'<div class="middle">'+
						'<p class="gameName apostrophe">'+QQ+'熊和奶奶的关系</p>'+
						'<p class="gameRegione apostrophe">'+playArea+'</p>'+
					'</div>'+
					'<div class="right fix">'+QQ+'天前</div>'+
				'</a>';
	}
	$(".mymsg .content").append(html);
}
mymsg();

