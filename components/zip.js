exports.archive = function(fileName, sourceDir="../dist", targetDir="../导出文件"){
	var archiver = require('archiver');
	var fs = require('fs');
	//被打包文件
	var zipPath = targetDir+"/"+fileName+'.zip';
	//创建一最终打包文件的输出流
	var output = fs.createWriteStream(zipPath);
	//生成archiver对象，打包类型为zip
	var zipArchiver = archiver('zip');
	//将打包对象与输出流关联
	zipArchiver.pipe(output);
	zipArchiver.directory(sourceDir, false);
	//打包
	zipArchiver.finalize();
	
	return output;
}
