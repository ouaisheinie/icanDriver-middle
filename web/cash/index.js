$(document).ready(function(){
	var flag = true;
	$('.income-details').click(function(){
		$('.every-income').slideToggle(400);
		if(flag){
			$(this).find('p').text('距我上次提现,我的收入情况');
			flag = false;
		}else{
			$(this).find('p').text('查看我最近的收入情况');
			flag =true;
		}
	});
})