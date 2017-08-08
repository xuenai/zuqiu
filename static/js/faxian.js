require(['config'],function(){
	require(['Zepto','IScroll','template','footer'],function(zepto,IScroll,template){
		require(['zepto.tap'],function(){

			$(function(){
				
				$('footer div').eq(1).addClass('active');

				$('.search button').on('touchstart',function(){

					$.get('/api/faxian',{name:$('.search input').val()},function(data){
						var data = {
							list : data.data
						};
						var html = template('guanzhu',data);
						$('section').html(html);
					});
				});

				$('section').on('touchstart','span',function(){
					var src = $(this).parents('.li').find('img').attr('src'),name = $(this).parent().find('span:first-child').html();
					var _this = this;
					$.post('/api/guanzhu',{img:src,name:name},function(data){
						if(data.code == 1) $(_this).html('关注成功');//注意异步请求的回调函数的this指向改变成window了
					})
				})
				
			});
			
		})
	})
})