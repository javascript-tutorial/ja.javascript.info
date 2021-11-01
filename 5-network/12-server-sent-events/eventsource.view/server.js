let http = require('http');
let url = require('url');
let querystring = require('querystring');
<<<<<<< HEAD
=======
let static = require('node-static');
let fileServer = new static.Server('.');
>>>>>>> 6989312841d843f2350803ab552d9082437be569

function onDigits(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache'
  });

  let i = 0;

  let timer = setInterval(write, 1000);
  write();

  function write() {
    i++;

    if (i == 4) {
      res.write('event: bye\ndata: bye-bye\n\n');
      clearInterval(timer);
      res.end();
      return;
    }

    res.write('data: ' + i + '\n\n');

  }
}

function accept(req, res) {

  if (req.url == '/digits') {
    onDigits(req, res);
    return;
  }

  fileServer.serve(req, res);
<<<<<<< HEAD

=======
>>>>>>> 6989312841d843f2350803ab552d9082437be569
}


if (!module.parent) {
  http.createServer(accept).listen(8080);
} else {
  exports.accept = accept;
}
