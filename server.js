let http=require('http');
let uuid=require('uuid/v4');
let fs=require('fs');
let common=require('./tools/common')

console.log(uuid())

let buff =Buffer.alloc(0);
let post={};

let server=http.createServer((req,res)=>{
  req.on('data',chunk=>{
    buff=Buffer.concat([buff,chunk])
  })

  req.on('end',()=>{
    if(req.headers['content-type']){
      let boundary='--'+req.headers['content-type'].split('; ')[1].split("=")[1];
      let arr=buff.split(boundary);
      arr=arr.slice(1,arr.length-1)
      
      arr=arr.map(item=>{
        return item.slice(2,item.length-2)
      })
      
      arr.forEach(item=>{
        let s=item.indexOf('\r\n\r\n'),e=s+4;
        let desc=item.slice(0,s);
        let content=item.slice(e);
        if(desc.indexOf('\r\n')===-1){//普通数据
          desc=desc.toString().split("; ")[1].split("=")[1];
          desc=desc.substr(1,desc.length-2)
          content=content.toString();
          post[desc]=content
        }else{
          console.log(desc.toString())
          let desc_arr=desc.toString().split('\r\n');
          let name=desc_arr[0].split('; ')[1].split("=")[1];
          let filename=desc_arr[0].split('; ')[2].split('=')[1];
          let type=desc_arr[1].split(':')[1]
          console.log(name,filename,type);
          fs.writeFile(`upload/${uuid().replace(/\-/g,'')}`,content,(error)=>{
            if(error){
              console.log('写入文件出错')
            }else{
              console.log('成功')
              res.end()
            }
          })
        }
       
      })
      //console.log(post)
    }
  })
 
})

server.listen(8080);


