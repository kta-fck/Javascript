// server .js　//
var http 		= require('http') ,
	fs 			= require('fs') ,
	ejs 			= require('ejs') ,
	qs 			= require('querystring') ;
var settings		= require('./setting.js');
var server 		= http.createServer();
var template = fs.readFileSync(__dirname + '/view/bbs.ejs','utf-8');
var count = 0;
var posts = [] ;


// 表示のみ

function viewPost(posts , res) {
	var data = ejs.render(template ,{
		posts:posts
	});
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(data);
	res.end();
}
server.on('request' , function(req,res)
	{
		if(req.method === 'POST') {
			req.data = "";
			req.on('readable' , function() {
				req.data += req.read();
			});
			req.on('end' ,function() {
				var query = qs.parse(req.data);
				console.log('query' + query.name + ' ' + query.content);
				if (query.name && query.content) {
					posts.push ({
						"name" : query.name,
						"content" : query.content
					})
				}
				viewPost(posts, res);
			})
		} else {
			viewPost(posts, res);
		}
	});

server.listen(settings.port , settings.host);

console.log('server llistening....');