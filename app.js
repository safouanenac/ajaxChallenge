var express = require('express');
var app = express();
 
app.use(express.json()).use( express.urlencoded()).use(express.static(__dirname + '/public'));

app.post('/endpoint', function(req, res){
	stat =["Online","Offline"];
	req.body.stat=stat[(Math.floor(Math.random() * 2))]
				
	console.log('body: '+JSON.stringify(req.body));
	res.send(req.body);
	
});

app.get('/', function(req, res){
  res.sendfile(__dirname + '/index.html');

 });
 
app.listen(3000);