import React, {
  Component,
  PropTypes
} from 'react';
import ReactDOM from 'react-dom'
import { Form, Row, Col, Input, Button,Modal, Icon ,Radio ,InputNumber,Affix, DatePicker,Layout,Select} from 'antd';
import { Router, Route, hashHistory } from 'react-router';
import {ExportButton} from './ExportButton';
import WrappedInlineTable from './InlineTable';
import SecretPersonMng from './SecretPersonMng';
import MultLineTable from './MultLineTable';
import imgUtil from './imgUtil';
import moment from 'moment';
moment.locale('zh-cn');
const { MonthPicker, RangePicker } = DatePicker;
const { Header, Footer, Sider, Content } = Layout;
const dateFormat = 'YYYY-MM-DD';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const Option = Select.Option;
const WrappedSecretPersonMng = Form.create()(SecretPersonMng);
const WrappedMultLineTable = Form.create()(MultLineTable);
class FirstForm extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
         col3:"col3",
         col6:"col6",
         result:[]
      } 
    /*1.表格数据格式start~*/
      //三列表格数据  
      this.tableCol3=[{"alias":"姓名","colName":"name"},{"alias":"部门及职务","colName":"departmentAndDuty"},{"alias":"职责分工","colName":"assignAndResponsibility"}];
      //六列表格数据
      this.tableCol6=[{"alias":"姓名","colName":"name"},
                    {"alias":"性别","colName":"gender"},
                    {"alias":"年龄","colName":"age"},
                    {"alias":"职务","colName":"duty"},
                    {"alias":"学历及专业","colName":"education"},
                    {"alias":"保密培训情况","colName":"secretTrainingSituation"}];
    /*表格数据格式end~*/
    //2.涉密人员管理数据
      this.secretStaffMng=[{"alias":"核心涉密人员","rowName":"hxsmry"},{"alias":"重要涉密人员","rowName":"zysmry"},{"alias":"一般涉密人员","rowName":"ybsmry"}];
    /*3.一标题多行数据格式start~*/
      //工作机构情况数据
      this.workSituationData=[{"headings":"保密工作机构设置情况","placeholder":"保密工作机构设置、隶属关系以及是否明确分管保密工作机构的单位负责同志、编制人员等基本情况。"},
                              {"headings":"保密工作机构负责人姓名、职务及任命文号","placeholder":""}]
      //定密管理数据
      this.tightMng=[{"headings":"定密工作情况","placeholder":"主要填写定密权限、定密工作程序和开展的主要定密工作"},
                    {"headings":"定密责任人情况","placeholder":""},
                    {"headings":"本单位国家秘密事项范围确定情况","placeholder":""},
                    {"headings":"确定和调整密级情况","placeholder":""}    

      ]
      //保密要害部门部位管理
      this.theImportSecretMng=[{"headings":"保密要害部门部位确定情况","placeholder":""},
                              {"headings":"保密防护措施落实情况","placeholder":""}]
      //信息系统、信息设备和存储设备管理
      this.sysAndEquiAndStorageMng=[{"headings":"涉密信息系统建设、防护情况","placeholder":""},
                                    {"headings":"涉密信息设备建设、防护情况","placeholder":""},
                                    {"headings":"涉密存储设备建设、防护情况","placeholder":""},
                                    {"headings":"涉密信息系统、涉密信息设备和涉密存储设备的管理情况","placeholder":""},
                                    {"headings":"非涉密信息系统、非涉密信息设备和非涉密存储设备的管理情况","placeholder":""},
                                    {"headings":"专用系统或者设备建设、防护和管理情况","placeholder":""},
                                  ]
      //协作配套管理
      this.collaborationMng = [{"headings":"采取了哪些保密管理措施","placeholder":""},
                              {"headings":"采取了哪些保密管理措施","placeholder":""}] 
      //保密工作经费
      this.workingFundsMng = [{"headings":"上年度至本年度保密管理经费预算和支出情况","placeholder":""},
                              {"headings":"上年度至本年度保密专项经费支出情况","placeholder":""}]      
                                                  
    /*一标题多行数据格式end~*/
    /*4.一标题单行数据格式start~*/
      //单位概况和申请理由
      this.summaryAndReasonOfCompany=[{"title":"单位概述","colName":"summaryOfCompany","headings":"","placeholder":""},
                                      {"title":"申请理由","colName":"applyReason","headings":"","placeholder":""},]
      //保密责任落实情况 以下的单行数据
      this.secretCarryOutSituation=[{"title":"法定代表人或主要负责人","colName":"mianLegalBody","headings":"上年度至本年度解决了保密工作哪些重要问题","placeholder":""},
                                    {"title":"分管保密工作负责人","colName":"chargeOfSecretLeader","headings":"上年度至本年度在保密工作方面抓了哪几项主要工作","placeholder":""},
                                    {"title":"其他负责人","colName":"otherLeader","headings":"上年度至本年度在保密工作方面做了哪些实际工作(按分工分别填写)","placeholder":""},
                                    {"title":"涉密部门或项目负责人","colName":"secretDepartment","headings":"上年度至本年度在保密管理方面结合实际落实了哪些具体措施","placeholder":""},
                                    {"title":"涉密人员","colName":"secretPerson","headings":"上年度至本年度在保密管理方面结合实际落实了哪些具体措施","placeholder":""},
                                  ]
      //专兼职工作人员 下面两个单行数据
      this.secretCommit=[{"title":"保密工作机构","colName":"secretSituation","headings":"上年度至本年度做的主要工作","placeholder":""}]
      //保密制度建设情况
      this.secretSysConstruction=[{"title":"基本制度","colName":"basicSystem","headings":"制度名称、文号、生效时间","placeholder":""},
                                  {"title":"专项制度","colName":"specialSystem","headings":"制度名称、文号、生效时间","placeholder":""}
                                 ]
      //国家秘密载体管理
      this.countriesSys=[{"title":"国家秘密载体管理","colName":"countriesSys","headings":"上年度至本年度做的主要工作","placeholder":""},
                         {"title":"密品管理","colName":"denseProductMng","headings":"上年度至本年度做的主要工作","placeholder":""}
                        ]  
      //新闻、会议、外场试验管理
      this.newsAndMeetingAndTestMng=[{"title":"新闻宣传管理","colName":"newsMng","headings":"采取了哪些保密管理措施","placeholder":""},
                                     {"title":"涉密会议管理","colName":"MeetingMng","headings":"采取了哪些保密管理措施，是否符合国家有关保密标准","placeholder":""},
                                     {"title":"外场试验管理","colName":"TestMng","headings":"采取了哪些保密管理措施","placeholder":""},
                        ] 
      //保密、考核、工作档案管理
      this.secretAndKpAndFileMng= [{"title":"保密检查","colName":"secretCheck","headings":"采取了哪些保密管理措施","placeholder":""},
                                   {"title":"考核与奖惩","colName":"kpAndRewardsAndPunishments","headings":"采取了哪些保密管理措施，是否符合国家有关保密标准","placeholder":""},
                                   {"title":"工作档案管理","colName":"workFileMng","headings":"采取了哪些保密管理措施","placeholder":""},
                                  ]
      this.foreignNationals =  [{"title":"涉外管理","colName":"foreignNationals","headings":"采取了哪些保密管理措施","placeholder":""}]                       
    /*一标题单行数据格式end~*/
      this.localStorageData={};
  }
  componentWillMount(){
      var dt = JSON.parse(window.currentContent);
      // console.log(dt);
      if(dt){
        this.localStorageData = dt;
        var values = {}
        for (var i in dt) {
          values[i] = {
            value: dt[i]
          }
        }
        if (!("companyCreateTime" in dt)) {
          values["companyCreateTime"] = {
            value: moment()
          }
        } else {
          values["companyCreateTime"] = {
            value: moment(values["companyCreateTime"].value)
          }
        }
        // console.log(values)
        this.props.form.setFields(values); 
      }
  }
  componentDidMount(){
  }
  genSingleLineTable(data){
      const { getFieldDecorator } = this.props.form;
      //console.log(this.props.form)
      const singleRowLayout = {
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 24 },
        },
      };
      var self=this;
      var rows=data.map(function(row,index){
          return(
              <tr className="trStyle">
                  <td className="tdLable">{row.title}</td>
                  <td className="tdInput">
                    <div>
                        <span style={{'position':'relative',top:0,left:8}}>{row.headings}{row.headings?<br/>:""}主要填写：</span>
                        <FormItem {...singleRowLayout}>
                          {getFieldDecorator(row.colName, {
                              rules: [{
                                required: true, message: '不能为空',
                              }],
                          })(
                              <TextArea  style={{backgroundColor:'transparent'}}  placeholder={row.placeholder} autosize={{ minRows: 8, maxRows: 10 }}/>  
                          )}
                        </FormItem>                                
                    </div>
                  </td>
              </tr>
          )
      });
      return rows
  }
  genMultLineTable(data,title,colName,checkRowCount){
      const { getFieldDecorator } = this.props.form;
      const singleRowLayout = {
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 24 },
        },
      };
      return(
          <tr className="trStyle">
              <td className="tdLable">{title}</td>
              <td className="tdInput">
                  <FormItem {...singleRowLayout}>
                      {getFieldDecorator(colName, {
                          rules: [{
                            required: true, message: '不能为空',
                          }, {
                            validator: this.checkMultLineTable.bind(this,checkRowCount)
                        }],
                      })(
                          <WrappedMultLineTable data={data} />
                      )}
                  </FormItem>    
              </td>
          </tr>
      )
  }
  retrieveFormData(){
    var result = {};
    //检查是否上传附件
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        result = values;
        localStorage.setItem("list",JSON.stringify(values));
      }else{
        Modal.warning({
          title: '提示信息',
          content: '导出时，表格中不能有漏填项',
        });
      }
    });
    return result;
  }
  onChange(result){
    this.setState({result:result});
  }
  checkPostalCode(rule,data,callback){
     var reg= /^[1-9][0-9]{5}$/;
     if(!reg.test(data)){
        callback('请正确填写邮政编码')
     }
     callback()
  }
  //验证电话号码的
  // checkPhone(rule,data,callback){
  //    var reg = /^1[3|4|5|7|8][0-9]{9}$/;
  //    if(!reg.test(data)){
  //       callback('请正确填写手机号码')
  //    }
  //    callback()
  // }
  checkTable(checkRowCount,rule,data,callback){ 
    // console.log(minRowCount,minColCount,rule,data,callback)
    //console.log(checkRowCount,data)
    for(var i=0;i<checkRowCount;i++){
      if(data){
        for(var j in data[i]){
          if(data[i][j].trim()==""){
              callback('至少填满'+checkRowCount+'行')
          }
        }
      }     
    }       
    callback()
  }
  checkSecretPersonMng(rule,data,callback){
    //console.log(data);
    var hasError=false;
    if(data){
      for(var i in data.counts){
          if(!data.counts[i]){
            hasError=true;
            break;
          }
      }
      if(data.content.trim()==""){
         hasError=true;
      }
    }   
    if(hasError){
       callback('不能为空')
    }
    callback()
  }
  checkMultLineTable(checkRowCount,rule,data,callback){
    //console.log(data);
    if(data){
      var numberOfEle=0;
      for(var i in data){
        if(data[i]){
           numberOfEle+=1;
        }
      }
      //console.log(numberOfEle)
      if(numberOfEle<checkRowCount){
         callback('不能为空')
      }      
    }      
    callback()
  }
  handleSubmit(e){
    // console.log(this.props.form.getFieldsValue());
    e.preventDefault();    
    this.props.form.validateFieldsAndScroll((err, values) => {
      window.saveContent(JSON.stringify(values));
      if (!err) {
        Modal.info({
          title: '提示信息',
          content: '保存成功',
        });
      }else{
        Modal.info({
          title: '提示信息',
          content: '保存成功，但仍有未填写项',
        });
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    var br="<br>";
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
    const singleRowLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
      },
    };
    const smallFormItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };
    const exportButtonLayout1 = {
      wrapperCol: {
        xs: {
          span: 6,
          offset: 18,
        },
        sm: {
          span: 6,
          offset: 18,
        },
      },
    };
    const ButtonLayout2 = {
      wrapperCol: {
        xs: {
          span: 6,
          offset: 20,
        },
        sm: {
          span: 6,
          offset: 20,
        },
      },
    };
    return (
       <Layout>        
         <Content>
            <Form id="content" style={{float:'right',position:'relative'}} onSubmit={this.handleSubmit.bind(this)}>
              <Affix style={{width:'100%',height:'33px',marginTop:'6px'}}>              
                   <Button style={{float:'right',marginLeft:'3px'}} type="primary" htmlType="submit">保存</Button>                  
                   <ExportButton  data={this.retrieveFormData.bind(this)} className="expBtn"/>                
              </Affix>
              <div style={{border:'1px solid #888'}}>
                <FormItem
                  {...formItemLayout}
                  label="单位名称"
                >
                  {getFieldDecorator('companyName', {
                    rules: [{
                      required: true, message: '不能为空;',    
                    }],
                  })(
                      <TextArea  placeholder="应填写全称，与单位合法身份证明文件相一致"  autosize/>              
                  )}
                </FormItem>  
                <FormItem
                  {...formItemLayout}
                  label="社会统一信用代码"
                >
                  {getFieldDecorator('creditCode', {
                    rules: [{
                      required: true, message: '不能为空;',    
                    }],
                  })(
                      <TextArea  placeholder=""  autosize={{ minRows: 2, maxRows:4 }}/>              
                  )}
                </FormItem>          
                <Row>
                  <Col span={12}  style={{'block':'none'}}>
                    <FormItem
                      {...smallFormItemLayout}
                      label="单位性质"
                    >
                      {getFieldDecorator('companyType', {
                        rules: [{
                          required: true, message: '不能为空',
                        }],
                      })(
                          <Select
                            showSearch
                            placeholder="==请选择=="
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                          >
                            <Option value="国有企业">国有企业</Option>
                            <Option value="国有控股企业">国有控股企业</Option>
                            <Option value="合资企业">合资企业</Option>
                            <Option value="私营企业">私营企业</Option>
                          </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12}  style={{ 'block' : 'none' }}>
                    <FormItem
                      {...smallFormItemLayout}
                      label="法定代表人"
                    >
                      {getFieldDecorator('legalBody', {
                        rules: [{
                          required: true, message: '不能为空',
                        }],
                    })(
                        <Input  />
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}  style={{ 'block' : 'none' }}>
                    <FormItem
                      {...smallFormItemLayout}
                      label="单位人数"
                    >
                      {getFieldDecorator('companyPersonCount', {
                        rules: [{
                          required: true, message: '不能为空',
                        }],
                      })(
                        <InputNumber  min={0}  style={{width:'100%'}} />
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12}  style={{ 'block' : 'none' }}>
                    <FormItem
                      {...smallFormItemLayout}
                      label="涉密人员数"
                    >
                      {getFieldDecorator('secretPersonCount', {
                        rules: [{
                          required: true, message: '不能为空',
                        }],
                    })(
                        <InputNumber min={0} style={{width:'100%'}} />
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <FormItem
                  {...formItemLayout}
                  label="注册地址"
                >
                  {getFieldDecorator('regAddress', {
                    rules: [{
                      required: true, message: '不能为空;',    
                    }],
                  })(
                      <TextArea  placeholder=""  autosize/>              
                  )}
                </FormItem> 
                <FormItem
                  {...formItemLayout}
                  label="科研生产(办公)地址"
                >
                  {getFieldDecorator('officeAddress', {
                    rules: [{
                      required: true, message: '不能为空;',    
                    }],
                  })(
                      <TextArea  placeholder=""  autosize={{ minRows: 2, maxRows:4 }}/>              
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="通信地址"
                >
                  {getFieldDecorator('mailingAddress', {
                    rules: [{
                      required: true, message: '不能为空;',    
                    }],
                  })(
                      <TextArea  placeholder=""  autosize={{ minRows: 2, maxRows:4 }}/>              
                  )}
                </FormItem>  
                <Row>
                  <Col span={12}  style={{ 'block' : 'none' }}>
                    <FormItem
                      {...smallFormItemLayout}
                      label="邮政编码"
                    >
                      {getFieldDecorator('postalCode', {
                        rules: [{
                          required: true, message: '不能为空',
                        },{
                          validator: this.checkPostalCode.bind(this)
                        }],
                      })(
                        <Input  />
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12}  style={{ 'block' : 'none' }}>
                    <FormItem
                      {...smallFormItemLayout}
                      label="联系电话"
                    >
                      {getFieldDecorator('phone', {
                        rules: [{
                          required: true, message: '不能为空',
                        }],
                    })(
                        <InputNumber  style={{width:'100%'}}/>
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}  style={{ 'block' : 'none' }}>
                    <FormItem
                      {...smallFormItemLayout}
                      label="单位创建时间"
                    >   
                      {getFieldDecorator('companyCreateTime')(
                          <DatePicker  style={{width:'100%'}}/>                 
                      )}            
                    </FormItem>
                  </Col>
                  <Col span={12}  style={{ 'block' : 'none' }}>
                    <FormItem
                      {...smallFormItemLayout}
                      label="是否为上市公司"
                      style={{'overflow':'auto'}}
                    >
                      {getFieldDecorator('isShangshi', {
                        rules: [{
                          required: true, message: '不能为空',
                        }],
                      })(
                        <RadioGroup>
                          <RadioButton value="1">是</RadioButton>
                          <RadioButton value="0">否</RadioButton>
                        </RadioGroup>
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}  style={{ 'block' : 'none' }}>
                    <FormItem
                      {...smallFormItemLayout}
                      label="注册资金"
                    >
                      {getFieldDecorator('regMoney', {
                        rules: [{
                          required: true, message: '不能为空',
                        }],
                      })(
                        <Input  />
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12}  style={{ 'block' : 'none' }}>
                    <FormItem
                      {...smallFormItemLayout}
                      label="固定总资产"
                    >
                      {getFieldDecorator('fixedAssets', {
                        rules: [{
                          required: true, message: '不能为空',
                        }],
                    })(
                       <Input  />
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <FormItem
                      {...formItemLayout}
                      label="股权结构"
                    >
                      {getFieldDecorator('equityStructure', {
                        rules: [{
                          required: true, message: '不能为空',
                        }],
                    })(
                        <Input  />
                      )}
                </FormItem>
                <FormItem
                      {...formItemLayout}
                      label="外国国籍、境外永久居留或者长期居留许可及涉外婚姻关系情况"
                    >
                      {getFieldDecorator('foreignRelations', {
                        rules: [{
                          required: true, message: '不能为空',
                        }],
                    })(
                         <TextArea  placeholder=""  autosize={{ minRows: 5, maxRows:6 }}/>      
                      )}
                </FormItem>
                <FormItem
                      {...formItemLayout}
                      label="证劵监管机构的行政处罚情况"
                    >
                      {getFieldDecorator('punishments', {
                        rules: [{
                          required: true, message: '不能为空',
                        }],
                    })(
                         <TextArea  placeholder=""  autosize={{ minRows: 3, maxRows:6 }}/>      
                      )}
                </FormItem>
              </div>
              <table style={{borderCollapse:'collapse',Layout:'fixed',width:'100%',border:'1px solid #888'}}>
                <tbody>
                  {this.genSingleLineTable(this.summaryAndReasonOfCompany)}
                  <tr>
                    <td></td>
                    <td  className="tdTitle">保密责任落实情况</td>
                  </tr>
                  {this.genSingleLineTable(this.secretCarryOutSituation)}
                  <tr>
                    <td></td>
                    <td  className="tdTitle">归口管理情况</td>
                  </tr>
                  <tr className="trStyle">
                    <td className="tdLable">归口管理</td>
                    <td className="tdInput">
                      <div>
                          <span style={{'position':'relative',top:0,left:8}}>上年度至本年度在保密工作方面做了哪些实际工作(按分工分别填写):<br/>主要填写：</span>
                          <FormItem {...singleRowLayout}>
                            {getFieldDecorator('centralizingMng', {
                                rules: [{
                                  required: true, message: '不能为空',
                                }],
                            })(
                                 <TextArea  style={{backgroundColor:'transparent'}} autosize={{ minRows: 8, maxRows: 10 }} />                                  
                            )}
                          </FormItem>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td  className="tdTitle">保密组织机构情况</td>
                  </tr>
                  <tr className="trStyle">
                    <td className="tdLable">保密委员会或保密工作领导小组</td>
                    <td className="tdInput">
                      <FormItem>
                        {getFieldDecorator("secretCommittee",{
                            rules: [{
                              required: true, message: '不能为空',
                            }, {
                               validator: this.checkTable.bind(this,1)
                            }],
                        })(
                            <WrappedInlineTable  key="secretCommittee" rowCount="6" dataMapping={this.tableCol3} />
                        )}
                    </FormItem>
                    </td>
                  </tr>
                  {this.genMultLineTable(this.workSituationData,'工作机构情况','workSituation',2)}
                  <tr className="trStyle">
                    <td className="tdLable">专(兼)职工作人员</td>
                    <td className="tdInput">
                      <FormItem>
                        {getFieldDecorator("mtcsol",{
                            rules: [{
                              required: true, message: '不能为空',
                            }, {
                               validator: this.checkTable.bind(this,1)
                            }],
                        })(
                            <WrappedInlineTable  key="mtcsol" rowCount="3" dataMapping={this.tableCol6} />
                        )}
                    </FormItem>
                    </td>
                  </tr>
                  <tr className="trStyle">
                    <td className="tdLable">保密委员会或保密工作领导小组</td>
                    <td className="tdInput">
                      <div>
                            <span style={{'position':'relative',top:0,left:8}}>上年度至本年度抓的重点工作:<br/>主要填写：</span>
                            <FormItem {...singleRowLayout}>
                              {getFieldDecorator('secretCommit', {
                                  rules: [{
                                    required: true, message: '不能为空',
                                  }],
                              })(
                                   <TextArea  style={{backgroundColor:'transparent'}} autosize={{ minRows: 12 }}/>                                  
                              )}
                            </FormItem>
                      </div>
                    </td>
                  </tr>
                  {this.genSingleLineTable(this.secretCommit)}
                  <tr>
                    <td></td>
                    <td  className="tdTitle">保密制度建设情况</td>
                  </tr>
                  {this.genSingleLineTable(this.secretSysConstruction)}
                  <tr>
                    <td></td>
                    <td  className="tdTitle">保密监督管理情况</td>
                  </tr>
                  {this.genMultLineTable(this.tightMng,'定密管理','tightMng',4)}
                  <tr className="trStyle">
                    <td className="tdLable">涉密人员管理</td>
                    <td className="tdInput">
                      <FormItem {...singleRowLayout}>
                        {getFieldDecorator('secretStaffMng', {
                            rules: [{
                               required: true, message: '不能为空',
                            }, {
                               validator: this.checkSecretPersonMng.bind(this)
                            }],
                        })(
                            <WrappedSecretPersonMng  data={this.secretStaffMng} />
                        )}
                      </FormItem>
                    </td>
                  </tr>
                  {this.genSingleLineTable(this.countriesSys)}
                  {this.genMultLineTable(this.theImportSecretMng,'保密要害部门部位管理','theImportSecretMng',2)}
                  {this.genMultLineTable(this.sysAndEquiAndStorageMng,'信息系统 、 信息设备和存储设备管理','sysAndEquiAndStorageMng',6)}
                  {this.genSingleLineTable(this.newsAndMeetingAndTestMng)}
                  {this.genMultLineTable(this.collaborationMng,'协作配套管理','collaborationMng',2)}
                  {this.genSingleLineTable(this.foreignNationals)}
                  <tr>
                    <td></td>
                    <td  className="tdTitle">监督与保障</td>
                  </tr>
                  {this.genSingleLineTable(this.secretAndKpAndFileMng)}
                  {this.genMultLineTable(this.workingFundsMng,'保密工作经费','workingFundsMng',2)}
                  <tr>
                    <td style={{borderBottom:'1px solid #888'}}></td>
                    <td  className="tdTitle" style={{borderBottom:'1px solid #888'}}>法定代表人或主要负责人承诺</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td style={{padding:8,textAlign:'center'}}>
                      <div className="commitment">本人郑重承诺，本单位符合所申报保密资格等级应当具备的基本条件，所填报的《申请书》内容真实，并保证保密资格标准在本单位的执行，履行本人所应承担的责任。</div>
                      <div className="signature">
                          <div style={{marginRight:215,marginBottom:20}}>法定代表人或主要负责人签字：</div>
                          <div>年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>          
            </Form>
         </Content>
      </Layout>
    );
  }
}

const WrappedFirstForm = Form.create()(FirstForm);
// ReactDOM.render(<WrappedFirstForm />, document.getElementById("session"));
export default WrappedFirstForm
