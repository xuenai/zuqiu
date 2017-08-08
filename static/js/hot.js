require(['config'],function(){
	require(['Zepto','swiper','IScroll','template','footer'],function(zepto,swiper,IScroll,template){
		require(['zepto.tap'],function(){

			$(function(){

				$('footer div').eq(0).addClass('active');

				$('header span:last-child').on('touchstart',function(){location = '/html/pinglun.html';})
				// var arrtitle = ['足球现场','足球生活','足球美女'];
				getData(0);
				getData(2);
				var myScroll2,myScroll3;
				var mySwiper = new Swiper ('.swiper-container', {//在myswiper的外面初始化iscroll对象，除了第一个在第一页的能滚动，其他的都不能滚动，所以在myswiper内初始化iscroll
				    direction: 'horizontal',//刚才这里有可能是没加逗号的原因
				    onSlideChangeStart: function(swiper){
				      $('nav a').eq(swiper.activeIndex).addClass('active').siblings().removeClass('active');
				  //     myScroll2 = new IScroll('.zhuqiushenghuo', {
						//     mouseWheel: true,
						//     scrollbars: true,
						//     probeType:2,
						//     startY:-startYvalue
						// });
				      myScroll3 = new IScroll('.zhuqiumeinv', {
						    mouseWheel: true,
						    scrollbars: true,
						    probeType:2,
						    startY:-startYvalue
						});
				    }
				}); 
				var htmlfontsize = 100*document.documentElement.clientWidth/640;
				var startYvalue = htmlfontsize * 0.6;

				var myScroll = new IScroll('.zhuqiuxiangchang', {
				    mouseWheel: true,
				    scrollbars: true,
				    probeType:2,
				    startY:-startYvalue
				});


				var flag = '';
				var maxScrollY;
				myScroll.on('scroll',function(){
					if(this.y >= 10){
						$('div.updrag').html('松手');
						flag = 'up';
					};
					if(this.y < 10 && this.y > -startYvalue){
						$('div.updrag').html('下拉');
						flag = '';
					};

					if(this.y <= maxScrollY - startYvalue-5){
						$('div.downdrag').html('松手');
						flag = 'down';
						this.maxScrollY = maxScrollY - startYvalue;
					};
					if(this.y > maxScrollY - startYvalue && this.y < maxScrollY){
						$('div.downdrag').html('上拉');
						flag = '';
						this.maxScrollY = maxScrollY;
					}
				});

				myScroll.on('scrollEnd',function(){
					if(flag == 'up'){
						$('div.updrag').html('刷新中...');
						getData(0,function(){
							$('div.updrag').html('下拉');
							flag = '';
							myScroll.scrollTo(0,-startYvalue,200);
						});
					};
					if(this.y < 10 && this.y > -startYvalue){
						myScroll.scrollTo(0,-startYvalue,200);
					};

					if(flag == 'down'){
						$('div.downdrag').html('加载中...');
						getData(0,function(){
							$('div.downdrag').html('上拉');
							flag = '';
							// myScroll.maxScrollY = maxScrollY;
						});
					}
				});


				$('nav').on('touchstart','a',function(){
					mySwiper.slideTo($(this).index(), 300, true);
				});
				function getData(index,cb){
					$.get('../json/index'+ index +'.json',function(data){
						var data = {
							list : data
						};
						var html = template('index1',data);
						$('.swiper-slide ul').eq(index).append(html);
						myScroll.refresh();
						maxScrollY = myScroll.maxScrollY;
						cb && cb();
						console.log(myScroll.maxScrollY);
					});
				};

				getdata2(1);
				var heigtharr = [0,0];
				function getdata2(index){
					$.get('../json/index'+ index +'.json',function(data){
						var nowul = $('.swiper-slide ul').eq(index);
						for(var i=0;i<data.length;i++){
							var html = '<li><img src="'+data[i].img+'"/><p>'+data[i].des+'</p></li>';
							nowul.append(html);
							if(heigtharr[0] <= heigtharr[1]){
								nowul.find('li:last-child').css('float','left');
								heigtharr[0] += nowul.find('li:last-child').height();
							}else{
								nowul.find('li:last-child').css('float','right');
								heigtharr[1] += nowul.find('li:last-child').height();
							}
						};
						// cb && cb();
						// console.log(myScroll2.maxScrollY); 
						myScroll2 = new IScroll('.zhuqiushenghuo', {
						    mouseWheel: true,
						    scrollbars: true,
						    probeType:2,
						    startY:-startYvalue
						});
						myScroll2.refresh();
						var c = $('.zhuqiushenghuo').height();
						console.log(c);
						console.log(myScroll2.maxScrollY);
					});
				}
			});
			
		})
	})
})