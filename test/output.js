var fs = require('fs');
var buf = new Buffer('我喜爱编程');
fs.writeFileSync("./key.secrete", "abcd");
fs.open('./mess.txt','w',function(err,fd){
    fs.write(fd,buf,3,9,0,function(err,written,buffer){
        fs.write(fd,buf,12,3,null,function(err,written,buffer){
            if(err) console.log('写文件操作失败');
            console.log('写文件操作成功');
        });
    });
    //同步写入
    fs.writeSync(fd,buf,3,9,0);
});

