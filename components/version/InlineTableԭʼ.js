import React, {
  Component,
  PropTypes
} from 'react';
import ReactDOM from 'react-dom'
import { Form, Row, Col, Input, Button, Icon ,Radio } from 'antd';
import Immutable from 'immutable';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
class InlineTable extends React.Component{
  constructor(props){
    super(props);
    var values=[];
    for(var row = 0;row < this.props.rowCount; row++){
      values[row] = [];
      for(var col = 0; col < this.props.dataMapping.length;col++)
        values[row][col] = "";
    }
    this.state={
      values:values
    }
    this.result=[];
    this.key=0;
  }
  componentDidMount(){
    if(this.props.value.length>0){
      this.setState({
        values:this.props.value
      })
    }
  }
  handleChange(row,col,e){
      const { value, onChange } = this.props
      var newValue = this.state.values;
      newValue[row][col] = e.target.value  
      this.setState({values:newValue});
      onChange(newValue);
      //console.log(newValue);
  }
  genThs(){
      var ths=this.props.dataMapping.map(function(col){
          return(
              <th style={{border:'1px solid #ddd'}}>{col.alias}</th>          
          )
      });
      return ths;
  }

  genTds(rows){
    const { getFieldDecorator } = this.props.form;  
    var self=this;
    var tds=[];
    for(var i=0;i<self.props.dataMapping.length;i++){
      tds.push(
        <td style={{border:'1px solid #ddd'}}>           
            <Input style={{border:'none'}} /> 
        </td>
      )
    }
    return tds;
  }
  genTrs(rowCount){ 
      var trs = [];   
      for(var i = 0;i < rowCount;i++){
          trs.push(<tr key={i}>{this.genTds(i)}</tr>);
      }
      return trs;
  }
  render(){
    const { getFieldDecorator } = this.props.form;  
    return(
        <table style={{borderCollapse:'collapse',position:'relative',width:'100%',minHeight:180}}>
           <thead>
              <tr>
                {this.genThs()}
              </tr>
           </thead>
           <tbody className="tbodyStyle">
              {this.genTrs(this.props.rowCount)}
           </tbody>
        </table>
    )
  }
}

InlineTable.defaultProps = {
    value: []
}
export default InlineTable
