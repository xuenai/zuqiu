$(function(){
	var mySwiper = new Swiper('.swiper-container',{
		direction:'vertical',
		effect:'flip',
		onInit: function(swiper){
		    swiperAnimateCache(swiper);
		    swiperAnimate(swiper);
		}, 
		onSlideChangeEnd: function(swiper){ 
		    swiperAnimate(swiper);
		    if(swiper.activeIndex == 1){
		    	$('.shangcha').addClass('shangcharu');
		    	$('.xiacha').addClass('xiacharu');
		    }else{
		    	$('.shangcha').removeClass('shangcharu');
		    	$('.xiacha').removeClass('xiacharu');
		    }
		} 
	});
});

setTimeout(function(){setInterval(yu,100);},1500);
function yu(){
	var _left = Math.random()*8,_top = Math.random()*6;
	$('<div class="yu"></div>').css({
		left:_left + 'rem',
		top:_top + 'rem',
		width:1 + 'px'
	}).appendTo('.swiper-wrapper .swiper-slide:first-child')
	  .animate({
	  	left : _left + 10 + 'rem',
	  	top : _top + 10 + 'rem'
	  },1500,function(){
	  	$(this).remove();
	  });
};



