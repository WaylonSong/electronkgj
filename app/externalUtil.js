var $ = require('../vendor/jquery-3.1.1');
var {ipcRenderer} = require('electron');

$(function() {
	window.handleExportButton = function(button){
	 	return function(){
	 		data = button.props.data;
		 	if(data && typeof(data)=="object"){
				ipcRenderer.send("export", data)
			}else if(data && typeof(data) == "function"){
				var data = data();
				ipcRenderer.send("export", data)
			}
		}
	}
	window.imgUtil = require('../components/imgUtil')
})
