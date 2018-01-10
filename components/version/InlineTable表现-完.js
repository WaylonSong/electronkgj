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
let uuid = 0;
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
  genTds(rowNum){
    const { getFieldDecorator } = this.props.form;  
    var self=this;
    var tds=[];
    for(var i=0;i<self.props.dataMapping.length;i++){
      tds.push(
        <td style={{border:'1px solid #ddd'}}>           
          <FormItem >
              {getFieldDecorator(self.props.dataMapping[i].colName, {
                rules: [{ required: true, message: 'Please input website!' }],
              })(
                  <Input style={{border:'none'}}  />
              )}
          </FormItem>
        </td>
      )
    }
    return tds;
  }
   remove(k){
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }
    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add(){
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid++;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,  // 实际就是根据这个keys（是个数组）来循环生成formitem
    });
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render(){
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    var self=this;
    const trs = keys.map((k, index) => {
      return (
          <tr key={k}>
            {self.genTds(k)}
            {keys.length > 1 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                disabled={keys.length === 1}
                onClick={() => this.remove(k)}
              />
            ) : null}
          </tr>
      );
    });
    return(
        <table style={{borderCollapse:'collapse',position:'relative',width:'100%',minHeight:180}}>
           <thead>
              <tr>
                {this.genThs()}
              </tr>
           </thead>
           <tbody className="tbodyStyle">
                {trs}
                <FormItem>
                  <Button type="dashed" onClick={this.add.bind(this)} style={{ width: '100%' }}>
                    <Icon type="plus" /> 添加一行
                  </Button>
                </FormItem>
           </tbody>
        </table>
    )
  }
}

InlineTable.defaultProps = {
    value: []
}
const WrappedInlineTable = Form.create()(InlineTable);
export default WrappedInlineTable;
