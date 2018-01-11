var $ = require('../vendor/jquery-3.1.1');
var {ipcRenderer} = require('electron');

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
})
