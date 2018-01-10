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
class MultLineTable extends React.Component{
  constructor(props){
    super(props);
    this.state={
        value:[]
    }
  }
  componentDidMount(){
    // console.log(this.props.value);
    if(this.props.value.length>0){
      this.setState({
        value:this.props.value
      })
    }
  }
  handleChange(index,e){
      //console.log(this.props.data)
      const { value, onChange } = this.props
      var newValue = this.state.value;
      newValue[index] = e.target.value
      newValue.length=this.props.data.length;
      this.setState({value:newValue});
      onChange(newValue);
  }
  genRows(){
      var map=Immutable.fromJS(this.props).delete('value');
      var properties = map.toObject();
      var self=this;
      //console.log(self.props.data);
      var rows=self.props.data.map(function(row,index){
          return(
              <div className="border_bottom">
                 <span style={{'position':'relative',top:0,left:8}}>{row.headings}：<br/>主要填写：</span>
                 <TextArea  style={{backgroundColor:'transparent'}} {...properties} onChange={self.handleChange.bind(self,index)} value={self.state.value[index]} placeholder={row.placeholder} autosize={{ minRows: 5, maxRows: 10 }}/>                                  
              </div>
          )
      });
      return rows;
  }
  render(){
    const { getFieldDecorator } = this.props.form;  
    return(        
        <div>
            {this.genRows()}
        </div>                         
    )
  }
}

MultLineTable.defaultProps = {
    value: []
}
export default MultLineTable
