/** 
 * SIMPLE TWEEN SAMPLE
 * This sample creates a simple animation and controls for that animation.
 * Reviews the methods to get the DOM element and pass it to the GSAP
 * instance. 
*/

import React, { Component } from "react";
import { TimelineLite, CSSPlugin } from "gsap/all";

class SimpleTween extends Component {

	constructor(props){
		super(props);
		// logo container
		this.logoContainer = null;
		// logo tween
		this.logoTween = null;
	}


	componentDidMount(){
		// create logo tween
		this.logoTween = new TimelineLite({ paused:true })
			.to(this.logoContainer, 2, { x: 500 })
			.to(this.logoContainer, 1, { rotation: 360, transformOrigin: "center" });
	}


	render(){
		return <div className="container">
			<div className="row">

				<div className="col-12 mt-3">
					<h3 className="text-center">Simple Tween</h3>
					<p>Animates the GSAP logo to the right of it's original position and finally does a 360 degrees rotation. You can use the buttons to control the animation.</p>
					<p>Uses the <strong>ref</strong> inline callback to create a reference to the DOM element, which is then used in the <strong>componentDidMount</strong> event to create the GSAP instance.</p>
					<hr/>
				</div>

				<div className="col-12">
					<h3 className="text-center">Control Logo Tween</h3>
					<p>Use the buttons to control the Logo Tween</p>
					<div className="mb-2 btn-group">
						<button
							className="btn gsap-btn"
							onClick={() => this.logoTween.play()}
						>Play</button>
						<button
							className="btn gsap-btn"
							onClick={() => this.logoTween.pause()}
						>Pause</button>
						<button
							className="btn gsap-btn"
							onClick={() => this.logoTween.reverse()}
						>Reverse</button>
						<button
							className="btn gsap-btn"
							onClick={() => this.logoTween.restart()}
						>Restart</button>
					</div>
					<hr />
				</div>

				<div className="col-12 mt-3">
					<img
						src="img/logo.svg"
						alt=""
						className="img-fluid logo"
						ref={ img => this.logoContainer = img }
					/>
				</div>

			</div>
		</div>;
	}
	
}

export default SimpleTween;
