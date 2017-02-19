var static = require('node-static'),
  http = require('http'),
  util = require('util');

var webroot = '/enter-path-to-your-disco-folder-here/disco-arguments',
  port = 4444;

var file = new static.Server(webroot);

http.createServer(function(req, res) {
  req.addListener('end', function() {
    file.serve(req, res);
  }).resume();
}).listen(port, "disco-node.local");

console.log('node-static running at http://disco-node.local:%d', port);
