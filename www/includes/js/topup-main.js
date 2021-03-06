$(".topup-button").click(function(){
	var amt = $(this).attr("amt");
	var cur = numeral($(this).attr("amt")).format('0,0');
	
	$("#myDialogs").empty();
	$("#myDialogs").html("<div class=\"text-success\">Top Up</div>");
	
	$("#myDialogsText").removeClass("alert-success alert-info alert-warning alert-danger");
	$("#myDialogsText").addClass("alert-success");
	$("#myDialogsText").html("Top-up your credits for Rp. "+cur+" ?");
	
	$("#button-DialogYes").removeClass("btn-info btn-danger btn-warning btn-primary hide");
	$("#button-DialogNo").removeClass("hide");
	$("#button-DialogClose").removeClass("hide");
	
	$("#button-DialogYes").unbind();
	$("#button-DialogNo").unbind();
	$("#button-DialogClose").unbind();
	
	$("#button-DialogYes").addClass("btn-success");
	$("#button-DialogYes").bind("click", function(){
		$("#AppDialogs").modal("hide");
		processTopup(amt);
	});
	
	$("#button-DialogNo").bind("click", function(){
		$("#AppDialogs").modal("hide");
	});
	
	$("#button-DialogClose").addClass("hide");
	
	$("#pleasewait").modal('hide');
	$("#AppDialogs").modal();
});

function processTopup(amt){
	$("#pleasewait").modal();
	
	$.post(
		// URL
		//
		"http://demo.totalindo.net/demo-starbucks/web-service/topup-add.php",
		// Data POST
		//
		{
			amt: amt
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
				$("#myDialogs").empty();
				$("#myDialogs").html("<div class=\"text-success\">Success</div>");
				
				$("#myDialogsText").removeClass("alert-success alert-info alert-warning alert-danger");
				$("#myDialogsText").addClass("alert-success");
				$("#myDialogsText").html(data['message']);
				
				$("#button-DialogYes").removeClass("btn-info btn-danger btn-warning btn-primary hide");
				$("#button-DialogNo").removeClass("hide");
				$("#button-DialogClose").removeClass("hide");
				
				$("#button-DialogYes").unbind();
				$("#button-DialogNo").unbind();
				$("#button-DialogClose").unbind();
				
				$("#button-DialogYes").addClass("btn-success");
				$("#button-DialogYes").bind("click", function(){
					window.location.href="top-up-payment.html?id="+data['return_data']['tu_id']+"&amt="+data['return_data']['tu_amt']+"&refs="+data['return_data']['tu_refs'];
				});
				
				$("#button-DialogNo").bind("click", function(){
					window.location.href="top-up-finish.html";
				});
				
				$("#button-DialogClose").addClass("hide");
				
				$("#pleasewait").modal('hide');
				$("#AppDialogs").modal();
			}
		},
		"json"
	);
}