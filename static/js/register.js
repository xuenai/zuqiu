require(['config'],function(){
	require(['Zepto'],function(zepto){
		require(['zepto.tap'],function(){
			var reg = /^1\d{10}$/;
			var telisok = false,pswisok = false,nickname = false;
			$('input').eq(0).on('blur',function(){
				if(!reg.test($(this).val())){
					$(this).val('输入格式不正确');
					// $(this).focus();
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

			$('input').eq(2).on('blur',function(){
				if(!$(this).val()){
					$(this).val('输入格式不正确');
					$(this).focus();
					nickname = false;
				}else{
					nickname = true;
				}
			});
			

			$('input:last-child').on('touchstart',function(event){
				event.preventDefault();
				$.post('/api/register',{tel:$('input').eq(0).val(),pwd:$('input').eq(1).val(),nickname:$('input').eq(2).val()},
					function(data){
						if(!data.tel){
							alert('电话号码已存在，请从新输入');
							return;
						};
						if(!data.nickname){
							alert('昵称已存在，请从新输入');
							return;	
						};
						location = '/html/login.html';
					});
			});
		})
	})
})