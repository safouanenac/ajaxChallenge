	$(function(){
	console.log("debut du script");
	$("#select_div").hide( );
	
	$('#select_link').click(function(e){
		e.preventDefault();
		console.log('select_link clicked');
		
		/* creating a simple data that contains
		 * 'iduser' the id of the user we ask if he's online
		 * 'stat' contains the status of this user (online or offline) 
		 */
		var data = {"userid":0,"stat":'offline'},
		ajaxs=[],  // ajaxs contains a list of all the AJAX requests, we create it to use the done() methode 
		objres=[],
		nbRequests=100; // the number of requests that we must send to the server
		
		
		//sendBar & receiveBar to increment the progress bar, sendBar will be be incremented before
		// sending the ajax resquest, the other will increment when success 
		sendBar = 0 ,
		receiveBar = 0 ,
		progressWidth = $("#progress").width() ;
		
		
		//catch the event done, when all requests finish
		 $.when(ajaxs).done(function (objres){
			// remove the bar from the screen
			$("#select_div").show();
			//$("#progress ").hide();
			});
		
		// Loop to create (bnRequests=)100 AJAX requests 
		var i;
		
		for(i=0;i<nbRequests;i++){
			// 
			data.userid=i;
			ajaxs[i]=sendAjax(data);
		}
							
						
		/* SendAjax(data), this function takes a data format 
		 * as a parameter and returns an return an ajax object
		 */		
		function sendAjax(data){
			
			return $.ajax({
					type: 'POST',
					data: JSON.stringify(data),
					contentType: 'application/json',
					//url: 'http://localhost:3000/endpoint',	
					 url: 'http://192.168.1.7:3000/endpoint',	
					async: false,
					// executing befor sending the request
					beforeSend: function(jqXHR,settings){
						//INCREMENT SENDBAR
						sendBar++;
						console.log("sendBar= ",sendBar,"from id=",data.userid);
						},
					// exxecuting when request success
					success: function(data) {
								//INCREMENT RECEIVE BAR
								receiveBar++;
								var old=$("#progress .bar").width();
								console.log("old = ",old);
								$("#progress .bar").css({ width: (old+(progressWidth/nbRequests)) });
								console.log("receivebar = ",receiveBar,"from id= ",data.userid);
								var html = "<div id='user'"+data.userid+" class='binder-user-note' >" +
									"<h1>User : "+data.userid+" Status "+data.stat +"</h1> </div>";
									$("#select_div").append(html);
							}
					});
					}	
	});		
});
                     /*$.ajax({
                        dataType: 'jsonp',
                        data: "data=yeah",						
                        jsonp: 'callback',
                        url: 'http://localhost:3000/endpoint?callback=?',						
                        success: function(data) {
                            console.log('success');
                            console.log(JSON.stringify(data));
                        }
                    });*/
 
 
					/*$.ajax('http://localhost:3000/endpoint', {
					        type: 'POST',
					        data: JSON.stringify(data),
					        contentType: 'application/json',
					        success: function() { console.log('success');},
					        error  : function() { console.log('error');}
					});*/
               
        