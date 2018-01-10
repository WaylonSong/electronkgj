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
let uuid = 4;
class InlineTable extends React.Component{
  constructor(props){
    super(props);
    var values=[];
    for(var row = 0;row < this.props.rowCount; row++){
      values[row] = [];
      for(var col = 0; col < this.props.dataMapping.length;col++)
        values[row][col] = "";
    }
    var keys = [];
    //初始化keys
    /*var length = (this.props.secretCommittee && this.props.secretCommittee.length)||4;
    for(var i = 0; i < this.props.secretCommittee.length; i++){
      keys.push(i)
    }*/
    this.state={
      values:values,
      keys:[0,1,2,3]//keys
    }
    this.result=[];
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
    const { getFieldDecorator,getFieldValue} = this.props.form;
    var map=Immutable.fromJS(this.props).delete('value');
    var properties = map.toObject();
    var self = this;  
    var tds=this.props.dataMapping.map(function(col,i){
        return(
          <td style={{border:'1px solid #ddd'}}>           
            <FormItem >
                {getFieldDecorator(`secretCommittee[${rowNum}][${col.colName}]`, {
                  initialValue:(self.props.secretCommittee&&self.props.secretCommittee[rowNum][col.colName])||"",//Todo
                  rules: [{ required: true, message: '不能为空！' }],
                })(
                    <Input style={{border:'none'}} {...properties} onChange={self.handleChange.bind(self,rowNum,i)}  value={self.state.values[rowNum][i]} />
                )}
            </FormItem>
          </td>
        );
    });
    return tds;
  }
  genTrs(){
    const { getFieldDecorator,getFieldValue} = this.props.form;  
    // getFieldDecorator('keys', { initialValue: [0,1,2,3] });
    // const keys = getFieldValue('keys');
    var self=this;
    // secretCommittee: [{name:'', departmentAndDuty:'',assignAndResponsibility:''}]
    // [{name:'', departmentAndDuty:'',assignAndResponsibility:''}]
    var trs = this.state.keys.map((k, index) => {
      return (
          <tr key={k}>
            {self.genTds(index)}
            {self.state.keys.length > 1 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                disabled={self.state.keys.length === 1}
                onClick={() => this.remove(k)}
              />
            ) : null}
          </tr>
      );
    });
    return trs;
  }

  

  remove(k){
    // const { form } = this.props;
    // // can use data-binding to get
    // const keys = form.getFieldValue('keys');
    // // We need at least one passenger
    // if (keys.length === 1) {
    //   return;
    // }
    // // can use data-binding to set
    // form.setFieldsValue({
    //   keys: keys.filter(key => key !== k),
    // });
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
    return(
        <table style={{borderCollapse:'collapse',position:'relative',width:'100%',minHeight:180}}>
           <thead>
              <tr>
                {this.genThs()}
              </tr>
           </thead>
           <tbody className="tbodyStyle">
                {this.genTrs()}
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
