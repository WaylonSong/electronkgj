import React, {
	Component,
	PropTypes
} from 'react';
import ReactDOM from 'react-dom';
import $ from '../vendor/jquery-3.1.1';
import util from './util';
import {Button} from 'antd';
class ExportButton extends Component{
	submit(){
		var electron = require('electron');
		var ipcRenderer = electron.ipcRenderer;
		if(this.props.data && typeof(this.props.data)=="object"){
	    	// util.exportWord(this.props.data);
	    	ipcRenderer.send("export", this.props.data)
		}else if(this.props.data && typeof(this.props.data) == "function"){
			var data = this.props.data();
			util.echo(data);
			// util.exportWord(data);
	    	ipcRenderer.send("export", data)
		}
		else{
			var d = {};
			var t = $('form').serializeArray();
		    $.each(t, function() {
		      d[this.name] = this.value;
		    });	
		}
	}
	render(){
		return (<Button type="primary" style={{float:'right'}} onClick={this.submit.bind(this)}>导出</Button>)
	}
}
export{ExportButton}