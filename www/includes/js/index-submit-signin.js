function submitLogin(){
	$("#pleasewait").modal();
	
	var log_username	=	$("#username").val();
	var log_password	=	$("#password").val();
	
	$.post(
		// URL
		//
		"http://demo.totalindo.net/FMCG-1.01/web-service/login-service.php",
		// Data POST
		//
		{
			username: log_username,
			password: log_password
		},
		// When Succeeded
		//
		function(data){
			if(data['status'] != 1){
				$("#pleasewait").modal('hide');
				
				$(".messages").addClass('bg-danger');
				$(".text-messages").empty();
				$(".text-messages").addClass('text-danger');
				$(".text-messages").append(data['message']);
			}else{
				setTimeout(function(){
					$("#pleasewait").modal('hide');
					window.location.href	=	"main-page.html";
				}, 1000);
			}
		},
		"json"
	);
}