var imgUtil = {};
var fs = require("fs");
var path = require('path');
imgUtil.addImg = function(originPath,baseName){
    originPath=originPath.replace(/\\/g, "/")   
    var data = fs.readFileSync(originPath,'base64');
    var timeStamp = Date.parse(new Date()); //创建timestamp
    var ext=originPath.slice(originPath.lastIndexOf('.'),originPath.length);//后缀
    var seq= baseName+timeStamp;
    var fileName=seq+ext;
    var fullPath = path.resolve(__dirname, "../"+'上传附件/'+baseName+'/'+fileName) 
    fs.writeFileSync(fullPath, data, 'base64', function(err){
       if(err){
            console.log(err);
       }else{
            console.log("图片"+seq+ext+"写入成功");
       }
    });
    return fullPath;
};
imgUtil.loadImg= function(dirPath){
    var urls= path.resolve(__dirname, "../"+dirPath);
    if(!fs.existsSync(urls)){
        return [];
    }
    var fileList = fs.readdirSync(urls);
    var wrappedFileList=fileList.map(function(i,index){
        var imgInfo={
            uid: -(index+1),
            name: i,
            status: 'done',
            url: urls+"/"+i,
            thumbUrl: urls+"/"+i,
        }
        return imgInfo;
    });
    return wrappedFileList;
};
imgUtil.deleteImg= function(url){
    if(fs.existsSync(url)){
        fs.unlinkSync(url);
    }else{
        console.log("图片不存在");
    }
}
export default imgUtil;