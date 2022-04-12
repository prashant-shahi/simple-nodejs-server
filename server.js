var http = require('http');

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'}); 
	var url = req.url;
	var method = req.method;
		
	if (url === '/') {
		res.write('Welcome to Expressless NodeJs application');
		res.end();
	} else if(url ==='/print' || url === '/v1/track') {
		if(method === 'POST') {
			var data = "";
	        req.on("data", function (chunk) {
	            data += chunk;
	        });
	        req.on("end", function(){
	            res.writeHead(200, { "Content-Type": "text/html" });
	            res.write('<h1>print page<h1><br/><p>The data is : ' + JSON.stringify(data) + '</p>');
	            console.log("Data: ", data)
		    console.log("Headers: ", JSON.stringify(req.headers));
	            res.end();
	        });
	    } else if(method === 'GET') {
	    	var body = `<!DOCTYPE html>
			<html lang="en">
			<head>
			    <meta charset="UTF-8">
			    <meta name="viewport" content="width=device-width, initial-scale=1.0">
			    <title>Expressless NodeJs Sample Example</title>
			</head>
			<body>
			    <form action="/print" method="POST">
			        <label>Name: </label>
			        <input type="text" name="dname" value="" /><br />
			        <label>Email: </label>
			        <input type="text" name="demail" value="" /><br />
			        <label>Address: </label>
			        <input type="text" name="daddress" value="" /><br />
			        <button>submit</button>
			    </form>
			</body>
			</html>`;
			res.writeHead(200, { "Content-Type": "text/html" });
            res.write(body);
            res.end();
		} else {
			res.writeHead(403, {'Content-Type': 'text/html'}); 
			res.write('<h1>Error 403: Forbidden</h1>');
			res.end();
		}
	} else {
		res.writeHead(404, {'Content-Type': 'text/html'}); 
		res.write('<h1>Error 404: Not Found</h1>')
	}
}).listen(8000, function(){
 console.log("server start at port 8000");
});
