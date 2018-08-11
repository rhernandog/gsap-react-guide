import React, { Component } from "react";
import { Transition } from "react-transition-group";
import { TweenLite, CSSPlugin } from "gsap/all";
import "../../styles/transition.css";

class FadeComponent extends Component {
	
	render(){
		return <Transition
			in={this.props.show}
			timeout={1000}
			unmountOnExit
			mountOnEnter
			addEndListener={ (node, done) => {
				TweenLite.to(node, 0.5, {
					x: this.props.show ? 0 : 100,
					autoAlpha: this.props.show ? 1 : 0,
					onComplete: done
				});
			}}
		>
			<div className="card col-6 transition-card">
				some content
			</div>
		</Transition>;
	}

}

export default FadeComponent;
