require(['config'],function(){
	require(['Zepto','swiper','IScroll'],function(zepto,swiper,IScroll){
		require(['zepto.tap'],function(){

			$(function(){
				var mySwiper = new Swiper ('.swiper-container', {
				    direction: 'horizontal'
				    
				    // 如果需要分页器
				    // pagination: '.swiper-pagination'
				    
				});  

				var htmlfontsize = 100*document.documentElement.clientWidth/640;
				var startYvalue = htmlfontsize * 0.5;
				var updrag = false;

				var myScroll = new IScroll('.zhuqiuxiangchang', {
				    mouseWheel: true,
				    scrollbars: true,
				    probeType:2
				});

				myScroll.on('scroll',function(){
					if(this.y >= 30){
						$('div.updrag').html('刷新');
						updrag = true;
					}
					console.log(this.y);
				});

				myScroll.on('scrollEnd',function(){
					// if(updrag)
					// $('.swiper-slide>div').css('padding-top','0.6rem');
					// $('.updrag').css('top','0');
				})

				$(document).on('touchend',function(){
					if(updrag){
						// myScroll.scrollTo(0,40,200);
					$('.swiper-slide>div').css('padding-top','0.6rem');
					$('.updrag').css('top','0');
					}
				})
			});


			// var reg = /^1\d{10}$/;
			// var telisok = false,pswisok = false;
			// $('input').eq(0).on('blur',function(){
			// 	if(!reg.test($(this).val())){
			// 		$(this).val('输入格式不正确');
			// 		$(this).focus();
			// 		telisok = false;
			// 	}else{
			// 		telisok = true;
			// 	}
			// });

			// $('input').eq(1).on('blur',function(){
			// 	if(!$(this).val()){
			// 		$(this).val('输入格式不正确');
			// 		$(this).focus();
			// 		pswisok = false;
			// 	}else{
			// 		pswisok = true;
			// 	}
			// });
			

			// $('input:last-child').on('touchstart',function(event){
			// 	event.preventDefault();
			// 	if(!(pswisok && telisok)){
			// 		alert('以上输入格式有误');
			// 		return;
			// 	};
			// 	$.post('/api/login',{tel:$('input').eq(0).val(),pwd:$('input').eq(1).val()},
			// 		function(data){
			// 			if(data.code == 0){
			// 				alert(data.msg);
			// 				return;
			// 			};
			// 			location = '/html/hot.html';
			// 		});
			// });
		})
	})
})