import React, {
	Component,
	PropTypes
} from 'react';
import ReactDOM from 'react-dom';
import $ from '../vendor/jquery-3.1.1';
import {Button} from 'antd';
// import {ipcRenderer} from 'electron'
class ExportButton extends Component{
	render(){
		return (<Button type="primary" style={{float:'right'}} id='exportButton' onClick={window.handleExportButton(this)}>导出</Button>)
	}
}
export{ExportButton}