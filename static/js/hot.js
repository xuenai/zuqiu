require(['config'],function(){
	require(['Zepto','swiper','IScroll','template','footer'],function(zepto,swiper,IScroll,template){
		require(['zepto.tap'],function(){
//iscroll滚动不了的原因：iscroll对象在初始化的时候，元素内容还未被加载，此时高度为0，所以滚动不了，需要等待数据加载渲染之后再来初始化iscroll。
			$(function(){

				function fn(myScroll2,getdata2,index){
					var flag = '';
					var maxScrollY = myScroll2.maxScrollY;
					myScroll2.on('scroll',function(){
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

					myScroll2.on('scrollEnd',function(){
						if(flag == 'up'){
							$('div.updrag').html('刷新中...');
							getdata2(index,function(){
								$('div.updrag').html('下拉');
								flag = '';
								myScroll2.refresh();
								myScroll2.scrollTo(0,-startYvalue,200);
							});
						};
						if(this.y < 10 && this.y > -startYvalue){
							myScroll2.scrollTo(0,-startYvalue,200);
						};

						if(flag == 'down'){
							$('div.downdrag').html('加载中...');
							getdata2(index,function(){
								$('div.downdrag').html('上拉');
								flag = '';
								myScroll2.refresh();
								maxScrollY = myScroll2.maxScrollY;
							});
						}
					});

				}

				$('footer div').eq(0).addClass('active');

				$('header span:last-child').on('touchstart',function(){location = '/html/pinglun.html';});


				var mySwiper = new Swiper ('.swiper-container', {
				    direction: 'horizontal',//刚才这里有可能是没加逗号的原因
				    onSlideChangeStart: function(swiper){
				      $('nav a').eq(swiper.activeIndex).addClass('active').siblings().removeClass('active');
				    }
				}); 


				$('nav').on('touchstart','a',function(){
					mySwiper.slideTo($(this).index(), 300, true);
				});
				// var arrtitle = ['足球现场','足球生活','足球美女'];
				var htmlfontsize = 100*document.documentElement.clientWidth/640;
				var startYvalue = htmlfontsize * 0.6;
				var myScroll,myScroll2,myScroll3;

				//第一页
				getData(0,function(){
					setTimeout(function(){
						myScroll = new IScroll('.zhuqiuxiangchang', {
						    mouseWheel: true,
						    scrollbars: true,
						    probeType:2,
						    startY:-startYvalue
						});

						var flag = '',offbtn = true;
						var maxScrollY = myScroll.maxScrollY;
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
								if(offbtn){
									offbtn = false;
									$('div.updrag').html('刷新中...');
									getData(0,function(){
										$('div.updrag').html('下拉');
										flag = '';
										offbtn = true;
										myScroll.refresh();
										myScroll.scrollTo(0,-startYvalue,200);
									});
								}
							};
							if(this.y < 10 && this.y > -startYvalue){
								myScroll.scrollTo(0,-startYvalue,200);
							};

							if(flag == 'down'){
								$('div.downdrag').html('加载中...');
								getData(0,function(){
									$('div.downdrag').html('上拉');
									flag = '';
									myScroll.refresh();
									maxScrollY = myScroll.maxScrollY;
								});
							}
						});
					},200);
				});

				//第三页
				getData(2,function(){
					setTimeout(function(){
						myScroll3 = new IScroll('.zhuqiumeinv', {
						    mouseWheel: true,
						    scrollbars: true,
						    probeType:2,
						    startY:-startYvalue
						});
						fn(myScroll3,getData,2);
					},100);
				});


				function getData(index,cb){
					$.get('../json/index'+ index +'.json',function(data){
						var data = {
							list : data
						};
						var html = template('index1',data);
						$('.swiper-slide ul').eq(index).append(html);
						cb && cb();
					});
				};
				//第二页
				getdata2(1,function(){
					setTimeout(function(){
						myScroll2 = new IScroll('.zhuqiushenghuo', {
						    mouseWheel: true,
						    scrollbars: true,
						    probeType:2,
						    startY:-startYvalue
						});

						var flag = '';
						var maxScrollY = myScroll2.maxScrollY;
						myScroll2.on('scroll',function(){
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

						myScroll2.on('scrollEnd',function(){
							if(flag == 'up'){
								$('div.updrag').html('刷新中...');
								getdata2(1,function(){
									$('div.updrag').html('下拉');
									flag = '';
									myScroll2.refresh();
									myScroll2.scrollTo(0,-startYvalue,200);
								});
							};
							if(this.y < 10 && this.y > -startYvalue){
								myScroll2.scrollTo(0,-startYvalue,200);
							};

							if(flag == 'down'){
								$('div.downdrag').html('加载中...');
								getdata2(1,function(){
									$('div.downdrag').html('上拉');
									flag = '';
									myScroll2.refresh();
									maxScrollY = myScroll2.maxScrollY;
								});
							}
						});

					},100);
				});
				var heigtharr = [0,0];
				function getdata2(index,cb){
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
						cb && cb();
					});
				}
			});	
		})
	})
})