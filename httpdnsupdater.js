var http = require("http");  
var util = require("util");

function getip(req) {
 return(req.socket.remoteAddress);
}

http.createServer(function(req,response){  
	console.log("I got a request from" + getip(req) + "request:" + req.url);  
	response.writeHeader(200, {"Content-Type": "text/plain"}); 
	response.end(getip(req));  
}).listen(8080);  

console.log("Server Running on 8080");   

