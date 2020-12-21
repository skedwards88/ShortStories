// Get parent div
// for file in folder:
//   make a chile div
//   put the contents of the file into the div

var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!');
}).listen(8085);