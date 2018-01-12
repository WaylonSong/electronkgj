var $ = require('../vendor/jquery-3.1.1');
var {ipcRenderer} = require('electron');
const os = require('os');
const storage = require('electron-json-storage');
storage.setDataPath(os.tmpdir());
storage.get('content', function(error, data) {
  if (error) {
  	console.log('localStorage error')
  }
  window.currentContent = data;
});

$(function() {
	window.imgUtil = require('../components/imgUtil')
	window.handleExportButton = function(button){
	 	return function(){
    		var isValid = window.imgUtil.check("上传附件/");
    		if(!isValid){
    			alert("请检查附件是否上传！")
		        return;
    		}
	 		data = button.props.data;
		 	if(data && typeof(data)=="object"){
				ipcRenderer.send("export", data)
			}else if(data && typeof(data) == "function"){
				var data = data();
				ipcRenderer.send("export", data)
			}
		}
	}
	window.saveContent = function(content){
		storage.set('content', content, function(error) {
		  if (error) throw error;
		});
	}
})
