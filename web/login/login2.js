$(window).ready(function(){
	$('.telePhone_num').bind('input propertychange',function(){
		var btn1 = $(".get_verify_num")[0];
		stopSt1(btn1);
	})

	$(".get_verify_num").click(function(){
			var phone =$("#username").val();
			if(phone==""){
				layer.msg("请输入电话号码");
				return false;
			}
			else if (!/^0?(13|14|15|17|18)[0-9]{9}$/i.test(phone)){
				layer.msg("请输入正确的手机号码");
				return false;
			}else{
				$("#span").hide();
				time(this);
			}
			$.ajax({
				url:"http://wuyujia.55555.io/work/api/code.php",
				data:{phone:phone},
				dataType:'json',
				type:'post',
				success:function(data){
					if(data.status){
					       layer.msg("发送短信成功");
					}else{
						layer.msg("发送失败");
					}
				},
				error: function () {
					layer.msg('访问失败');
				}
			});
		});
	$(".login_btn").click(function(){
			var verify =$(".verify_num").val();
			var  phone = $(".telePhone_num").val();
			if(verify==""){
				layer.msg("验证码不能为空");
				return false;
			}else{
				$("#span").hide();
			}
			$.ajax({
				url:"http://wuyujia.55555.io/work/api/login.php",
				type:'post',
				dataType:'json',
				data:{phone:phone,code:verify},
				success:function (data) {
					if(data.status==400){
						layer.msg("验证码错误");
					}
					if(data.status==401){
						layer.msg("验证码已过期");
					}
					if(data.status==200){
						localStorage.phone=data.token;
						if(data.role_id==1){
							setInterval(function(){
							window.location.href="../index/index.html";
							},2000);
						}
						if(data.role_id==2){
							setInterval(function(){
							window.location.href="../order/oder.html";
							},2000);
						}
					}
				},
				error:function () {
					layer.msg('访问失败');
				}
			});
		});
})

var wait=60;
var st1;
function time(o){
	if (wait==0) {
		o.removeAttribute("disabled");
		o.value="获取验证码";
		o.style.backgroundColor="#ffa628";
		wait=60;
	}else{
		o.setAttribute("disabled",true);
		o.value='(' + wait + ')';
		o.style.backgroundColor="#8f8b8b";
		wait--;
		st1 = setTimeout(function(){
			time(o)
		},1000)
	}
};

function stopSt1(a){
	a.removeAttribute("disabled");
	a.value="获取验证码";
	a.style.backgroundColor="#ffa628";
	wait=60;
	clearTimeout(st1);
}
