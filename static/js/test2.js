require(['config'],function(){
	require(['Zepto','swiper','IScroll','template','footer'],function(zepto,swiper,IScroll,template){
		require(['zepto.tap'],function(){

			$(function(){

				getData(0);
				var mySwiper = new Swiper ('.swiper-container', {
				    direction: 'horizontal',
				    onSlideChangeStart: function(swiper){
				  		
				    }
				}); 
				
				

				var myScroll2 = new IScroll('.p2',{
					mouseWheel: true,
				    scrollbars: true,
				    probeType:2
				});

				var myScroll3 = new IScroll('.p3',{
					mouseWheel: true,
				    scrollbars: true,
				    probeType:2
				});
				var myScroll;
				

			
				function getData(index,cb){
					$.get('../json/index'+ index +'.json',function(data){
						var data = {
							list : data
						};
						var html = template('index1',data);
						$('.swiper-slide ul').eq(index).append(html);
						// myScroll.refresh();
						// maxScrollY = myScroll.maxScrollY;
						cb && cb();
							setTimeout(function(){
							myScroll = new IScroll('.p1',{
									mouseWheel: true,
								    scrollbars: true,
								    probeType:2
								});
								console.log(myScroll.maxScrollY);
						},50);

					});
				};
			});
			
		})
	})
})