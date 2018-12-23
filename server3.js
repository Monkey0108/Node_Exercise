let mysql=require('mysql');
let http=require('http');
let url=require('url');
let fs=require('fs');
let zlib=require('zlib');

//let pool=mysql.createPool();

let server=http.createServer((req,res)=>{
  let {pathname,query}=url.parse(req.url);
  switch (pathname) {
    case '/login':
      
      break;
    case '/reg':

      break;
    default:
      fs.stat(`www${pathname}`,(err,stats)=>{
        
      })
      let rs=fs.createReadStream(`www${pathname}`);
      let gz=zlib.createGzip();
      res.setHeader('content-encoding','gzip');
      rs.pipe(gz).pipe(res);

      rs.on('error',err=>{
        if(err){
          res.writeHead(404);
          res.write('Not Found');
          res.end()
        }
      })
      break;
  }


  
})

server.listen(8080)