var static = require('node-static'),
  http = require('http'),
  util = require('util');

var webroot = '/media/sink/data/projects/codemonic.net/worx/disco/nodejs/disco-arguments',
  port = 4444;

var file = new static.Server(webroot);

http.createServer(function(req, res) {
  req.addListener('end', function() {
    file.serve(req, res);
  }).resume();
}).listen(port, "disco-node.local");

console.log('node-static running at http://disco-node.local:%d', port);