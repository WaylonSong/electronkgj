import React, {
  Component,
  PropTypes
} from 'react';
import ReactDOM from 'react-dom'
import { Form, Row, Col, Input, Button, Icon ,Radio ,InputNumber} from 'antd';
import Immutable from 'immutable';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
class SecretPersonMng extends React.Component{
  constructor(props){
    super(props);
    this.state={
        value:{"counts":[],"content":""}
    }
    this.data=this.props.data;
  }
  componentDidMount(){
    //console.log(this.props.value);
    if(this.props.value.length==0){
       return;
    }
    if(JSON.stringify(this.props.value) != "{}"){
      // console.log("aaa");
      this.setState({
        value:this.props.value
      })
    }
  }
  handleChange(rowNum,e){
      //console.log(rowNum,e);
      const { value, onChange } = this.props
      var newValue = this.state.value;
      if(rowNum=="content"){
         newValue.content = e.target.value
      }else{
        newValue.counts[rowNum] = e
      }    
      this.setState({value:newValue});
      onChange(newValue);
  }
  gentrs(){
      const { getFieldDecorator } = this.props.form; 
      var map=Immutable.fromJS(this.props).delete('value');
      var properties = map.toObject();
      // const { value} = this.props; 
      var self=this;
      var ths=self.data.map(function(col,index){
          return(
              <tr>
                 <td>{col.alias}</td>
                 <td>                  
                    <InputNumber style={{width:'100%'}} {...properties} onChange={self.handleChange.bind(self,index)} value={self.state.value.counts[index]}/>
                 </td>
              </tr>
          )
      });
      return ths;
  }
  render(){
    const { getFieldDecorator } = this.props.form; 
    var total=0;
    for(var i in this.state.value.counts){
        if(!this.state.value.counts[i] || this.state.value.counts[i] ===""){
          this.state.value.counts[i] ="";
        }
        total+=this.state.value.counts[i]
    }
    return(        
      <div>
        <table id="secretPersonMng" style={{borderCollapse:'collapse',position:'relative',width:'100%',textAlign:'center'}}>
            <thead>
                <tr>
                   <th style={{border:'1px solid #ddd'}}>人员类别</th>
                   <th>人员数量</th>
                </tr>
            </thead>
            <tbody>
                {this.gentrs()}
                <tr>
                  <td>合&nbsp;&nbsp;计</td>
                  <td>{total}</td>
                </tr>
            </tbody>
        </table>
        <div>
            <span style={{'position':'relative',top:0,left:8}}>上年度至本年度做的主要工作:<br/>主要填写:</span>
            <TextArea  style={{backgroundColor:'transparent'}} onChange={this.handleChange.bind(this,"content")} value={this.state.value.content} autosize={{ minRows: 5, maxRows: 10}}/>                                  
        </div>  
      </div>                              
    )
  }
}

SecretPersonMng.defaultProps = {
    value: []
}
export default SecretPersonMng
