define(['Zepto'],function(){
	$.get('/html/footer.html',function(data){
		$(document.body).append(data);
	})
})