require(['config'],function(){
	require(['Zepto'],function(zepto){
		require(['zepto.tap'],function(){
			var reg = /^1\d{10}$/;
			var telisok = false,pswisok = false;
			$('input').eq(0).on('blur',function(){
				if(!reg.test($(this).val())){
					$(this).val('输入格式不正确');
					$(this).focus();
					telisok = false;
				}else{
					telisok = true;
				}
			});

			$('input').eq(1).on('blur',function(){
				if(!$(this).val()){
					$(this).val('输入格式不正确');
					$(this).focus();
					pswisok = false;
				}else{
					pswisok = true;
				}
			});
			

			$('input:last-child').on('touchstart',function(event){
				event.preventDefault();
				if(!(pswisok && telisok)){
					alert('以上输入格式有误');
					return;
				};
				$.post('/api/login',{tel:$('input').eq(0).val(),pwd:$('input').eq(1).val()},
					function(data){
						if(data.code == 0){
							alert(data.msg);
							return;
						};
						location = '/html/hot.html';
					});
			});
		})
	})
})