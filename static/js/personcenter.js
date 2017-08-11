require(['config'],function(){
	require(['Zepto','swiper','IScroll','template','footer'],function(zepto,swiper,IScroll,template){
		require(['zepto.tap'],function(){

			$(function(){
				
				$('footer div').eq(3).addClass('active');

				var nickname = localStorage.getItem('nickname');
				$('.nickname').html(nickname);

				var mySwiper = new Swiper ('.swiper-container', {
				    direction: 'horizontal',
				    onSlideChangeStart: function(swiper){
				      $('.nav span').eq(swiper.activeIndex).addClass('active').siblings().removeClass('active');
				    }
				}); 
				
				$('.nav').on('touchstart','span',function(){
					mySwiper.slideTo($(this).index(), 300, true);
				})

				$.get('/api/yiguanzhu',function(data){
					if(data.data.length == 0) {
						$('.guanzhu').html('暂时没有关注的人');
						return;
					}
					var data = {
						list : data.data
					};
					var html = template('yiguanzhu',data);
					$('.guanzhu').html(html);
					$('.nav i').html(data.list.length);
				});


				//取消关注
				$('.guanzhu').on('touchstart','span:last-child',function(){
					var img = $(this).parents('.li').find('img').attr('src'),name = $(this).siblings('span').html();
					var _this = this;
					$.post('/api/quxiao',{img:img,name:name},function(data){
						if(data.code == 1){
							$(_this).parents('.li').remove();
							$('.nav i').html(Number($('.nav i').html())-1);
						}
					});
				})
			});
			
		})
	})
})