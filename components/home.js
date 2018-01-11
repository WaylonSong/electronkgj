import React, {
  Component,
  PropTypes
} from 'react';
import ReactDOM from 'react-dom'
class HomePage extends React.Component {
  	render(){
	     return(
				<div>home</div>     
	     );
  	}
}
ReactDOM.render(<HomePage />, document.getElementById("container"));
export default HomePage;
