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
    this.result=[];
    this.state={
      values:values,
    }
    this.key=0;
  }
  //加号
  add(){
    // immutable
    // lodash deepCopy
    var values = Object.assign([], this.state.values);
    var row = [];
    for(var col = 0; col < this.props.dataMapping.length;col++)
        row[col] = "";
    values.push(row)
    this.setState({values: values})
  }
  //减号
  remove(k){
    var values=this.state.values;
    values.splice(k,1);
    this.setState({
        values:values
    });
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

  genTds(rowNum){
    // const { getFieldDecorator } = this.props.form;  
    var map=Immutable.fromJS(this.props).delete('value');
    var properties = map.toObject();
    var self=this;
    var tds=[];
    for(var i=0;i<self.props.dataMapping.length;i++){
      tds.push(
        <td style={{border:'1px solid #ddd'}}>           
            <Input style={{border:'none'}} {...properties} onChange={self.handleChange.bind(self,rowNum,i)}  value={this.state.values[rowNum][i]} /> 
        </td>
      )
    }
    return tds;
  }
  genTrs(rowCount){ 
      // console.log(this.state.values);
      // var trs = [];   
      // for(var i = 0;i < this.state.values.length;i++){
      //     trs.push(<tr key={i}>{this.genTds(i)}</tr>);
      // }
      // return trs;
      var self=this;
      var trs=self.state.values.map(function(row,index){
          return(
             <tr key={index}>
                {self.genTds(index)}
                {index > 0 ? (
                  <Icon
                    className="dynamic-delete-button"
                    type="minus-circle-o"
                    disabled={index === 0}
                    onClick={() => self.remove(index)}
                  />
                ) : null}
             </tr>
          );
      });
      return trs;
  }
  render(){
    return(
        <table style={{borderCollapse:'collapse',position:'relative',width:'100%',minHeight:180}}>
           <thead>
              <tr>
                {this.genThs()}
              </tr>
           </thead>
           <tbody className="tbodyStyle">
              {this.genTrs(this.props.rowCount)}
              <Button type="dashed" onClick={this.add.bind(this)} style={{ width: '100%' }}>
                <Icon type="plus" /> 添加一行
              </Button>
           </tbody>
        </table>
    )
  }
}

InlineTable.defaultProps = {
    value: []
}
export default InlineTable
