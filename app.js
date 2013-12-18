var http = require('http');
var path = require('path');
var fs = require('fs');
var url = require('url');
var mime = require('mime');
http.createServer(function (req, res) {
	'use strict';

	var uri = url.parse(req.url).pathname.replace(/\.\./ig, ''),
		filename;
	if (uri === '/') {
		uri = '/index.html';
	}
	filename = path.join(__dirname, uri);

	fs.exists(filename, function (exists) {
		console.log("exist", exists);
		if (!exists) {
			res.writeHead(404, {'Content-Type': mime.lookup(filename)});
			return res.end();
		}
		
		res.writeHead(200, {'Content-Type': mime.lookup(filename)});
		return fs.createReadStream(filename).pipe(res);
	});
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
