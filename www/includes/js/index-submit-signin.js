function submitLogin(){
	$("#pleasewait").modal();
	
	var log_username	=	$("#username").val();
	var log_password	=	$("#password").val();
	
	$.post(
		// URL
		//
		"http://demo.totalindo.net/demo-starbucks/web-service/us-login.php",
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
				$("#myDialogs").empty();
				$("#myDialogs").html("<div class=\"text-danger\">Error !</div>");
				
				$("#myDialogsText").removeClass("alert-success alert-info alert-warning alert-danger");
				$("#myDialogsText").addClass("alert-danger");
				$("#myDialogsText").html(data['message']);
				
				$("#button-DialogYes").removeClass("btn-info btn-danger btn-warning btn-primary hide");
				$("#button-DialogNo").removeClass("hide");
				$("#button-DialogClose").removeClass("hide");
				
				$("#button-DialogYes").unbind();
				$("#button-DialogNo").unbind();
				$("#button-DialogClose").unbind();
				
				$("#button-DialogClose").bind("click", function(){
					$("#AppDialogs").modal("hide");
				});
				
				$("#button-DialogYes").addClass("hide");
				$("#button-DialogNo").addClass("hide");
				
				$("#pleasewait").modal('hide');
				$("#AppDialogs").modal();
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