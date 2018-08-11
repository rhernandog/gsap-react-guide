import React, { Component } from "react";
import { render } from "react-dom";
// import base stylesheet
import "./styles/base.css";

// Import components
import SimpleTween from "./components/simple tween/simple-tween";

class App extends Component {

	render(){
		return <div>
			<SimpleTween />
		</div>;
	}
}

render( <App />, document.getElementById("app-wrap") );
