Buffer.prototype.split=Buffer.prototype.split||function(str){
  let arr=[];
  let s=0;//开始位置
  let e=0;//结束位置
  let n=str.length;//字符长度
  while((e=this.indexOf(str,s))!==-1){
    arr.push(this.slice(s,e))
    s=e+n;
  }
  arr.push(this.slice(s));
  return arr
}