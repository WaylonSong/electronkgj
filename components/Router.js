import React from 'react'
import ReactDOM from 'react-dom'
import {Icon,Layout} from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import WrappedFirstForm from './FirstForm';
import WrappedYyzzUpLoad from './PicturesWall';
const { Header, Footer, Sider, Content } = Layout;
// 军工保密资格认定填报系统<i></i>
const BasicExample = () => (
  <Router>
    <div>
      <Sider id="aside" width='280px' style={{float:'left',backgroundColor:'#F5F5F5'}}>
	      <ul className="nav">
	        <li className="linkToIndex"><Link to="/home">武器装备单位保密资格申请<i></i></Link></li>
	      </ul>
	      <ul className="nav">
	      	<Icon type="layout" style={{'fontSize':'14px',paddingRight:'5px'}} /> 表格填报
	        <li className="tab"><Link to="/fillInApp">申请书填报</Link></li>
	      </ul>
	      <ul className="nav">
	      	<Icon type="upload" style={{'fontSize':'14px',paddingRight:'5px'}}/> 附件上传
	        <li className="tab"><Link to="/upLoadyyzz">营业执照</Link></li>
	        <li className="tab"><Link to="/upLoadbmzz">保密资质</Link></li>
	        <li className="tab"><Link to="/upLoadgszc">公司章程</Link></li>
	      </ul>
      </Sider>
      <Switch>	
	      <Route path="/fillInApp" component={WrappedFirstForm}/>
	      <Route path="/upLoadyyzz" component={WrappedYyzzUpLoad}/>
	      <Route path="/upLoadbmzz" component={WrappedYyzzUpLoad}/>
	      <Route path="/upLoadgszc" component={WrappedYyzzUpLoad}/>
	      <Route path="/" component={Home}/>
      </Switch>
      <div style={{clear:'both'}}></div>
    </div>
  </Router>
)

const Home = () => (
	<Layout>
		<Content id="homebg">
			<div id="box">
				<h2 style={{fontSize:'24px',color:'#222'}}>武器装备科研生产单位保密资格申请</h2>
				<p style={{fontSize:'16px',color:'#222'}}>Application for confidentiality qualification of weapons and equipment units</p>
				<div style={{float:'right',marginTop:80}}>
			    	<div style={{width:200,height:50,color:'#fff',textAlign:'center',fontSize:16,padding:12,backgroundColor:'#62B0F8',margin:'20px auto',borderRadius:10}}><Link to="/fillInApp" style={{color:'#fff'}}>申请书填报</Link></div>
			    	<div style={{width:200,height:50,color:'#fff',textAlign:'center',fontSize:16,padding:12,backgroundColor:'#87C2F9',margin:'20px auto',borderRadius:10}}><Link to="/upLoadyyzz" style={{color:'#fff'}}>企业证照上传</Link></div>
		    	</div>
		    	<div style={{clear:'both'}}></div>
		    	<div id="footer">
		    		<p style={{textAlign:'center'}}>Copyright@2005-2025 军工*******公司 All RightReserved</p>
		    		<p style={{textAlign:'center'}}>联系电话：010-1234667 010-4444488</p>
		    		<p style={{textAlign:'center'}}>地址：北京市xxxx区XX大厦3楼</p>
		    	</div>
		    </div>
		</Content>
 	</Layout>
)

ReactDOM.render(<BasicExample />, document.getElementById("container"));
export default BasicExample



