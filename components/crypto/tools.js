exports.encrypt = (fileName, souceDir, targetDir, companyName) => {
	/*
	加密过程：
	1.生成secrete
	2.将secrete文件输出到所要导出文件夹内
	3.将secrete和输出文件一起压缩
	4.将压缩文件打包
	*/
	var crypto = require('crypto');
	const fs = require('fs');
	var path = require('path');
	if(!fs.existsSync(targetDir)){
        fs.mkdirSync(targetDir);
    }
    if(!fs.existsSync(targetDir+'/tmp')){
        fs.mkdirSync(targetDir+'/tmp');
    }
	var secrete = exports.generateSecrete(targetDir+'/tmp');
	var {
		archive
	} = require(path.resolve(__dirname, '..', 'zip'));
	return new Promise(function(resolve, reject){
		var status = archive(fileName, souceDir, targetDir);
		var zipPath = targetDir + "/" + fileName + '.zip';
		status.on('close', function() {
			const cipher = crypto.createCipher('aes-128-ecb', secrete);
			const input = fs.createReadStream(zipPath);
			const output = fs.createWriteStream(targetDir+'/tmp'+'/files.kgj');

			// fs.unlinkSync(zipPath);
			input.pipe(cipher).pipe(output);
			input.on('end', () => {
			  	var status2 = archive(`${companyName}_导出申请文件`, targetDir+'/tmp', targetDir);
				status2.on('close', function(){
					resolve(1);  
				})
			});
			// promise.resolve(1)   
		});
	});
}

exports.decrypt = (fileSrc, keySrc) => {
	var crypto = require('crypto');
	const fs = require('fs');
	var privatePem = fs.readFileSync(__dirname + '/private.pem');
	var secreteFileBuffer = Buffer.from(fs.readFileSync(keySrc), "UTF-8");
	var secrete = crypto.privateDecrypt(privatePem, secreteFileBuffer).toString()
	const decipher = crypto.createDecipher('aes-128-ecb', secrete);
	const input2 = fs.createReadStream(fileSrc);
	const output2 = fs.createWriteStream('files.zip');
	input2.pipe(decipher).pipe(output2);
}

exports.generateSecrete = (targetDir) => {
	var crypto = require('crypto');
	const fs = require('fs');
	var secrete = (Math.random() + "             ").substring(0, 16);
	var publicPem = fs.readFileSync(__dirname + '/public.pub');
	var encryptedBuffer = Buffer.from(secrete);
	var secretFile = crypto.publicEncrypt(publicPem, encryptedBuffer)
	fs.writeFileSync(targetDir + "/key.secrete", secretFile.toString("base64"));
	return secrete;
}
	// exports.decrypt("/Users/song/work/electron/kegongjuDesktopApplication_2/output/1507601232000_1/files.kgj","/Users/song/work/electron/kegongjuDesktopApplication_2/output/1507601232000_1/key.secrete");
	// exports.generateSecrete();
	// exports.encrypt();
	// exports.decrypt();