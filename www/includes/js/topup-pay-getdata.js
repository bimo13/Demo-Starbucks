$("#pleasewait").modal();

function GetURLParameter(sParam){
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split("&");
	for(var i=0; i < sURLVariables.length; i++){
		var sParameterName = sURLVariables[i].split("=");
		if(sParameterName[0] == sParam){
			return sParameterName[1];
		}
	}
}

function GetUserData(){
	
	var topup_id	=	GetURLParameter("id");
	var topup_amt	=	GetURLParameter("amt");
	var topup_refs	=	GetURLParameter("refs");
	
	$.post(
		// URL
		//
		"http://demo.totalindo.net/demo-starbucks/web-service/topup-userdata.php",
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
				
				$("#pleasewait").modal("hide");
				$("#AppDialogs").modal();
			}else{
				$("#top-username").val(data['return_data']['username']);
				$("#top-amt").val(topup_amt);
				$("#top-refs").val(topup_refs);
				$("#top-proceed").attr("href","http://demo.totalindo.net/demo-starbucks/web-service/payment-process.php?id="+topup_id+"&refs="+topup_refs);
				$("#pleasewait").modal("hide");
			}
		},
		"json"
	);
}

GetUserData();