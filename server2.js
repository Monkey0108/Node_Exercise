let http = require('http');
let fs = require('fs');
let url = require('url');

let server = http.createServer((req, res) => {
  let { pathname } = url.parse(req.url);

  fs.stat(`www${pathname}`, (err, stats) => {
    if (err) {
      res.writeHead(404);
      res.write('Not Found');
      res.end();
    } else {
      if(req.headers['if-modified-since']){
        let s_time=Math.floor(stats.mtime.getTime()/1000);
        let c_time=Math.floor(new Date(req.headers['if-modified-since']).getTime()/1000);
        if(s_time>c_time){
          sendFile();
        }else{
          res.writeHead(304);
          res.write('Not Modified');
          res.end();
        }
      }else{
        sendFile();
      }
    }

    function sendFile() {
      res.setHeader('Last-Modified',stats.mtime);

      let rs = fs.createReadStream(`www${pathname}`)
      rs.pipe(res);
  
      res.on('finish', () => {
        res.end();
      })
      rs.on('error', err => {
        if (err) {
          res.writeHead(404);
          res.write('Not Found');
          res.end();
        }
      })
    }
  })


  


})

server.listen(8080);