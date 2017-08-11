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
				var flag = '';
				myScroll2.on('scroll',function(){
					if(this.y >= 50){
						$('div p').html('松手');
						flag = 'up';
					}
					if(this.y < 45 && this.y >= -50){
						$('div p').html('上拉');
						flag = '';
					}
				});

				myScroll2.on('scrollEnd',function(){
					console.log(1);
				})

				$(document).on('touchend',function(){
					if(flag == 'up'){
						$('.p2>div').css('padding-top','50px');
						$('div p').css('top','0');
						myScroll2.refresh();
						// myScroll2.scrollTo(0,50,1000);
						// setTimeout(function(){
						// 	$('.p2>div').css('padding-top','50px');
						// 	myScroll2.refresh();
						// },1000);
					}
				})
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