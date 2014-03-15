	$(function(){
	//$("#select_div").hide( );
	
	$('#select_link').click(function(e){
		$("#progress .bar").css({ width: 0});// showing an empty progressbar
		$("#progress").show(); // showing an empty progressbar
		e.preventDefault();
		$("#select_div").empty();
		$("#select_div").hide();
		/* creating a simple data that contains
		 * 'iduser' the id of the user we ask if he's online
		 * 'stat' contains the status of this user (online or offline) 
		 */
		var userid=3,
		data = {"userid":userid,"stat":'offline'},
		ajaxs=[],  // ajaxs contains a list of all the AJAX requests, we create it to use the done() methode 
		objres=[],
		nbRequests=100, // the number of requests that we must send to the server
		old = 0; // the width of the progress bar
		
		
		//sendBar  to increment the progress bar, sendBar will be be incremented before
		// sending the ajax resquest, the other will increment when success 
		sendBar = 0 ,
		progressWidth = $("#progress").width() ;
		
		
		//catch the event done, when all requests finish
	// $.when(ajaxs).done(function (objres){
			//remove the bar from the screen
			 // $("#select_div").show();
			 // $("#progress ").hide();
			 // });
		
		// Loop to create (bnRequests=)100 AJAX requests 
		var i;
		
		for(i=0;i<nbRequests;i++){
			// 
			ajaxs[i]=sendAjax(data);
		}
							
						
		/* SendAjax(data), this function takes a data format 
		 * as a parameter and returns an return an ajax object
		 */		
		function sendAjax(data){
			
			return $.ajax({
					type: 'POST',
					data: JSON.stringify(data),
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					// to test on local 
					url: 'http://localhost:3000/',	
					//url: '/',	//using the '/' url to prevent some cross-domain security error
					//async: false, // when we switch the async to false, the browser will sticks and we can't show the progress.
					// exxecuting when request success
					 success: function(data){
							old=$("#progress .bar").width();
							$("#progress .bar").css({ width: (old+(progressWidth/nbRequests)) }).show();
							/*html contains the div that we will append foreach result*/
							var html = "<div id='user'"+data.userid+" class='binder-user-note' >" +
													 "<h1>User : "+data.userid+" Status "+data.stat +"</h1> </div>";
							$("#select_div").append(html);
							// a little hack to prevent the stick of the browser when using methods such as 
							// "$.when().done()"
							if($("#progress .bar").width() === progressWidth )
							{
								$("#progress").hide();
								$("#select_div").show();
							}
					}
			});		
		}
	});
					/*End function sendAjax*/
					
			
});
                     
        