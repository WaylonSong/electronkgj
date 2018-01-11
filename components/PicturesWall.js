import React, {
  Component,
  PropTypes
} from 'react';
import ReactDOM from 'react-dom'
import { Form,Upload, Icon, Modal, Button,message} from 'antd';
var path = require('path');
const FormItem = Form.Item;
class YyzzUpLoad extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fileList:[],
      introduct:""
    }
  }

  componentWillReceiveProps(nextProps){
     var routerName=nextProps.location.pathname
     this.baseName='';
     var title = ''
     var introduct;
     if(routerName=="/upLoadyyzz"){
        this.baseName ="营业执照";
        title = '营业执照上传'
        introduct="营业执照上传要求：最新年检营业执照副本原件扫描件  或  副本复印件加盖公司公章的原件扫描件，文件不对外展示，若有疑虑，请在文件标注“仅作为谷瀑审核用，不得用于任何商业用途”如上传遇到问题可发送到工商审核QQ。";
     }
     else if(routerName=="/upLoadbmzz"){
        this.baseName ="保密资质";
        title = '保密资质上传'
        introduct="保密资质上传要求：最新年检营业执照副本原件扫描件  或  副本复印件加盖公司公章的原件扫描件，文件不对外展示，若有疑虑，请在文件标注“仅作为谷瀑审核用，不得用于任何商业用途”如上传遇到问题可发送到工商审核QQ。";
     }
     else if(routerName=="/upLoadgszc"){
        this.baseName ="公司章程";
        title = '公司章程上传'
        introduct="公司章程上传要求：最新年检营业执照副本原件扫描件  或  副本复印件加盖公司公章的原件扫描件，文件不对外展示，若有疑虑，请在文件标注“仅作为谷瀑审核用，不得用于任何商业用途”如上传遇到问题可发送到工商审核QQ。";
     }
     var files = window.imgUtil.loadImg("上传附件/"+this.baseName);
     var imgsExt={".bmp":"",".jpg":"",".png":"",".icon":"",".gif":"",".svg":"",".psd":""}; //例举常用图片格式
     files.map(function(file){
        var ext=path.extname(file.name);//获取后缀
        if(imgsExt[ext]==undefined){
           file.thumbUrl="D:/electron/electronkgj/images/folder.jpg";
        }
     });
     this.setState({
        title,
        fileList:files,
        introduct:introduct
     });
  }
  componentWillMount(){
    this.componentWillReceiveProps(this.props)
  }
  beforeUpload(file){
    const isLt02M = file.size / 1024 / 1024 > 0.2;
    const isLt100M = file.size / 1024 / 1024 < 100;
    if ((!isLt02M)||(!isLt100M)) {
      message.error('文件大小要在200KB-100MB之间，否则不能上传！');
    }
    return isLt02M&&isLt100M
  }

  handleChange({file, fileList}) {
    var originPath="";
    var newList = Object.assign([], this.state.fileList);
    // if (file.status == 'done') {
    // }
    if (file.status == 'removed'){
        newList.map(function(row,index){
            if(file.uid==row.uid){
                newList.splice(index,1);
            }
            return newList
        });
        window.imgUtil.deleteImg(file.url);
    }
    if (file.status == 'uploading') {
      originPath = file.originFileObj.path;
      const fullFileName = window.imgUtil.addImg(originPath, this.baseName); //originPath为图片的原始路径
      const currentFileName = fullFileName.substring(fullFileName.lastIndexOf('\\')+1, fullFileName.length) // 斜杠要换成变量
      var baseUrl=window.__dirname.replace(/\\/g, "/") //path.dirname()原始路径是啥
      var folderImgPath=baseUrl+"/images/folder.jpg"; //设置不是图片类型文件的显示图片地址
      var imgsExt=[".bmp",".jpg",".png",".tiff",".icon",".gif",".pcx",".tga",".exif",".fpx",".svg",".psd",".cdr",".pcd",".dxf",".ufo",".eps",".ai",".raw",".WMF"]; //例举常用图片格式
      var ext=path.extname(fullFileName);
      var flag=false;
      var imgUrL;
      for(var i in imgsExt){
          if(imgsExt[i]==ext){
             flag=true;
          }
      }  
      if(flag){
        imgUrL=fullFileName
      }else{
        imgUrL=folderImgPath
      }    
      var imgInfo={
          uid: -(fileList.length+1),
          name: currentFileName,
          status: 'done',
          url:fullFileName,
          thumbUrl:imgUrL,
      }
      newList.push(imgInfo);
    }
    this.setState({
       fileList: newList
    });
  }
  render(){
     const { getFieldDecorator } = this.props.form;
     var tip="提示：请保证文件大小在200KB-100MB之间，否则不能上传！";
     return(
        <FormItem
            style={{padding:'20px 10px 20px 0px',marginLeft:'300px'}}
            label={this.state.title||"上传附件"}
        >
            {getFieldDecorator(this.state.title||'companyName', {
              rules: [{
                required: true, message: '不能为空',
              }],
            })(
                <div>
                    <p style={{textIndent:'2em',lineHeight:3}}>{this.state.introduct}</p>
                    {this.state.title == "营业执照上传" && 
                    <Upload listType='picture' fileList={this.state.fileList}  beforeUpload={this.beforeUpload.bind(this)} onChange={this.handleChange.bind(this)}>
                      <Button>
                        <Icon type="upload" /> 上传
                      </Button>
                      <span style={{paddingLeft:10}}><i style={{color:'#F04134',fontSize:16}}> * </i>{tip}</span>
                    </Upload>
                    }
                    {this.state.title == "保密资质上传" &&
                    <Upload listType='picture' fileList={this.state.fileList}  beforeUpload={this.beforeUpload.bind(this)} onChange={this.handleChange.bind(this)}>
                      <Button>
                        <Icon type="upload" /> 上传
                      </Button>
                      <span style={{paddingLeft:10}}><i style={{color:'#F04134',fontSize:16}}> * </i>{tip}</span>
                    </Upload>
                    }
                    {this.state.title == "公司章程上传" &&
                    <Upload listType='picture' fileList={this.state.fileList} beforeUpload={this.beforeUpload.bind(this)} onChange={this.handleChange.bind(this)}>
                      <Button>
                        <Icon type="upload" /> 上传
                      </Button>
                      <span style={{paddingLeft:10}}><i style={{color:'#F04134',fontSize:16}}> * </i>{tip}</span>
                    </Upload>
                    }
                </div>
            )}
        </FormItem>
     );
  }
}
const WrappedYyzzUpLoad = Form.create()(YyzzUpLoad);
export default WrappedYyzzUpLoad
