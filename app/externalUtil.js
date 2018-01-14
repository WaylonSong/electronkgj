var $ = require('../vendor/jquery-3.1.1');
var {ipcRenderer} = require('electron');
const os = require('os');
const storage = require('electron-json-storage');
storage.setDataPath(os.tmpdir());
console.log(storage.getDataPath())
storage.get('content', function(error, data) {
  if (error) {
  	window.currentContent = "";
  }else{
  	if(typeof data == 'object'){
  		window.currentContent = "";
  	}else
  		window.currentContent = data;
  }
});

$(function() {
	window.imgUtil = require('../components/imgUtil')
	window.exportZip = function(values){
		var isValid = window.imgUtil.check("上传附件/");
		if(!isValid){
			alert("请检查附件是否上传！")
	        return;
		}
		ipcRenderer.send("export", values)
	}
	window.saveContent = function(content){
		storage.set('content', content, function(error) {
		  if (error) throw error;
		});
	}
	window.openExportDIr = function(content){
		var path = require('path');
		var srcPath = path.resolve(__dirname, '../导出文件')
		var command = 'start "" "' +srcPath+'"'; 
        require('child_process').exec(command); 
	}
	window.openReadmeDir = function(content){
		console.log('readme')
		var path = require('path');
		var srcPath = path.resolve(__dirname, '../说明')
		var command = 'start "" "' +srcPath+'"'; 
        require('child_process').exec(command); 
	}
})
