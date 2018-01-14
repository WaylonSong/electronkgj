var util = {};
var fs=require('fs');
var path = require('path');
var stat=fs.stat;
util.copyDir=function(src,dst){
    //读取目录
    return new Promise(function(resolve, reject){
        var fileList = [];
        var imageDirs = [ '公司章程', '营业执照', '保密资质' ]
        var promises = [];
        for(var i = 0 ; i < imageDirs.length; i++){
            var subSrc = src + '/'+imageDirs[i];
            var subDst = dst + '/'+imageDirs[i];
            //
            fileList = fs.readdirSync(subSrc)
            fileList.forEach(function(path){
                var _src=subSrc+'/'+path;
                var _dst=subDst+'/'+path;
                var readable;
                var writable;
                readable=fs.createReadStream(_src);//创建读取流
                writable=fs.createWriteStream(_dst);//创建写入流
                promises.push(new Promise(function(resolve, reject){
                    readable.pipe(writable);
                    readable.on('end', ()=>{
                        resolve(1);
                    })
                }));
            });
        }
        Promise.all(promises).then(()=>{
            resolve(1);
        });
    });
}

util.moveImgs=function(src,dst,callback){
    //测试某个路径下文件是否存在
    if(!fs.existsSync(dst+'/附件')){
        fs.mkdirSync(dst+'/附件');
        var imageDirs = [ '公司章程', '营业执照', '保密资质' ]
        for(var i in imageDirs){
            fs.mkdirSync(dst+'/附件/'+imageDirs[i]);
        }
    }
    return callback(src,dst+'/附件')
}
util.MultLineTable = function(MultLineTableData,newdata){
    var data;
    for(var i=0;i<newdata[MultLineTableData].length;i++){
        data=MultLineTableData+'_'+i;
        newdata[data]=newdata[MultLineTableData][i];
    }
    return newdata;
}

util.exportWord = function(data){
    var dst = path.resolve(__dirname, '..');
    if(!fs.existsSync(dst+'/上传附件')){
        fs.mkdirSync(dst+'/上传附件');
        var imageDirs = [ '公司章程', '营业执照', '保密资质' ]
        for(var i in imageDirs){
            fs.mkdirSync(dst+'/上传附件/'+imageDirs[i]);
        }
    }
    if(!fs.existsSync(dst+'/导出文件')){
        fs.mkdirSync(dst+'/导出文件');
    }
    if(!fs.existsSync(dst+'/dist')){
        fs.mkdirSync(dst+'/dist');
    }
    return new Promise(function(resolve, reject){
        var JSZip = require('jszip');
        var Docxtemplater = require('docxtemplater');
        //Load the docx file as a binary
        var content = fs
            .readFileSync(path.resolve(__dirname, '../template/inputTempl.docx'), 'binary');
        var zip = new JSZip(content);
        var doc = new Docxtemplater();
        doc.loadZip(zip);
        //备份数据
        var newdata={};
        Object.assign(newdata,data); 
        //----------------------两个内嵌表格导出的数据格式是 二维数组 变 对象---------------------------
        //1.保密委员会或保密工作领导小组
        var secretCommitList=[];
        for(var i=0;i<newdata.secretCommittee.length;i++){
            secretCommitList.push(Object.assign({},newdata.secretCommittee[i]))
        }
        newdata.secretCommittee=secretCommitList;
        //2.专(兼)职工作人员
        var mtcsolList=[];
        for(var j=0;j<newdata.mtcsol.length;j++){
            mtcsolList.push(Object.assign({},newdata.mtcsol[j]))
        }
        newdata.mtcsol=mtcsolList;
        // console.log(newdata.mtcsol)
        //3.涉密人员管理
        newdata["hxsmry"]=newdata.secretStaffMng.counts[0];
        newdata["zysmry"]=newdata.secretStaffMng.counts[1];
        newdata["ybsmry"]=newdata.secretStaffMng.counts[2];
        var total=0;
        newdata.secretStaffMng.counts.map(function(i){
            total+=i;
        });
        newdata["total"]=total;
        newdata["companyCreateTime"]=newdata["companyCreateTime"]['_d'].substr(0,10);
        newdata["content"]=newdata.secretStaffMng.content;
        //4.多行输入框
        util.MultLineTable("workSituation",newdata);
        util.MultLineTable("tightMng",newdata);
        util.MultLineTable("theImportSecretMng",newdata);
        util.MultLineTable("sysAndEquiAndStorageMng",newdata);
        util.MultLineTable("collaborationMng",newdata);
        util.MultLineTable("workingFundsMng",newdata);
        //处理多行输入换行问题
        var lineKeys = ['chargeOfSecretLeader','mianLegalBody','applyReason','summaryOfCompany','secretCommit','centralizingMng','secretPerson','secretDepartment','otherLeader','workFileMng','kpAndRewardsAndPunishments','secretCheck','foreignNationals','testMng','meetingMng','newsMng','denseProductMng','countriesSys','content','specialSystem','basicSystem','secretSituation','workSituation_0', 'workSituation_1','tightMng_0','tightMng_1','tightMng_2','tightMng_3','theImportSecretMng_0','theImportSecretMng_1','sysAndEquiAndStorageMng_0','sysAndEquiAndStorageMng_1','sysAndEquiAndStorageMng_2','sysAndEquiAndStorageMng_3','sysAndEquiAndStorageMng_4','sysAndEquiAndStorageMng_5','collaborationMng_0','collaborationMng_1','workingFundsMng_0','workingFundsMng_1'];
        for( var i = 0; i < lineKeys.length; i++){ 
            var lines = newdata[lineKeys[i]].split('\n');
            newdata[lineKeys[i]] = lines;
        } 

        // newdata.products= [
        //     { name :"Windows", price: 100},
        //     { name :"Mac OSX", price: 200},
        //     { name :"Ubuntu", price: 0}
        // ]
        doc.setData(newdata);
        try {
            // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
            doc.render()
        }
        catch (error) {
            var e = {
                message: error.message,
                name: error.name,
                stack: error.stack,
                properties: error.properties,
            }
            
            // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
            throw error;
        }
        var buf = doc.getZip()
                     .generate({type: 'nodebuffer'});
        // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
        //1.创建时间戳_公司名的文件夹
        var timeStamp = Date.parse(new Date()); 
        var fileName=timeStamp+'_'+data.companyName;
        if (!fs.existsSync(path.resolve(__dirname, '../dist/',fileName))) {
            fs.mkdirSync(path.resolve(__dirname, '../dist/',fileName));
        }
        //3.导出word文件
        fs.writeFileSync(path.resolve(__dirname, '../dist/',fileName,'申请书.doc'), buf);
        //4.导出图片
        var srcPath = path.resolve(__dirname, '../上传附件') //图片的原始路径
        var newPath = path.resolve(__dirname, '../dist/',fileName) //新路径
        var promise = util.moveImgs(srcPath,newPath,util.copyDir); //执行copy
        promise.then(function(){
            //5.写json文件
            var writeFilePath =  path.resolve(__dirname, '../dist/',fileName,fileName+'.json');
            data["companyCreateTime"]=data["companyCreateTime"]['_d'].substr(0,10);

            fs.writeFileSync(writeFilePath, JSON.stringify(data));
            //6.调用压缩和加密
            var ziptargetDir=path.resolve(__dirname, '../导出文件/',fileName)

            var exportPromise = util.zipAndCrypto("填报文件", newPath, ziptargetDir, data.companyName); 
            //7.打开导出文件夹
            exportPromise.then(function(){
                resolve("导出成功！");
                var command = 'start "" "' +ziptargetDir+'"'; 
                require('child_process').exec(command); 
            })
        });
    })
    
};

util.zipAndCrypto = function(fileName,souceDir,targetDir, companyName){
    var {encrypt} = require("./crypto/tools");
    return encrypt(fileName,souceDir,targetDir, companyName)
}

util.echo = function(data){
    
}
exports = module.exports = util;


