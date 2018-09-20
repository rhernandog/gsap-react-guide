import React, { Component } from "react";
import { TimelineLite, CSSPlugin } from "gsap/all";

class UpdateState extends Component {

	constructor(props){
		super(props);

		this.state = {
			tweenComplete: false,
			reverseComplete: false
		};

		this.buttonClickHandler = this.buttonClickHandler.bind(this);
		this.updateState = this.updateState.bind(this);

		this.logoTween = null;
		this.logoContainer = null;
	}

	updateState(forward){
		const newState = {
			tweenComplete: forward,
			reverseComplete: !forward
		};
		this.setState( newState );
	}

	componentDidMount(){
		this.logoTween = new TimelineLite({
			paused: true,
			onComplete: this.updateState,
			onCompleteParams: [true],
			onReverseComplete: this.updateState,
			onReverseCompleteParams: [false]
		})
			.to(this.logoContainer, 2, { x: 500 })
			.to(this.logoContainer, 1, { rotation: 360, transformOrigin: "center" });
	}

	buttonClickHandler(type){
		
		this.setState({
			tweenComplete: false,
			reverseComplete: false
		});

		switch(type){
			case "play":
				return this.logoTween.play();
			case "pause":
				return this.logoTween.pause();
			case "restart":
				return this.logoTween.restart();
			case "reverse":
				return this.logoTween.reverse();
		}
		
	}

	render(){
		return <div className="container">
			<div className="row">
				
				<div className="col-12">
					<h3 className="text-center">Control State Via GSAP Callbacks</h3>
					<p>Uses GSAP <i>onComplete</i> and <i>onReverseComplete</i> callbacks to update the component's state.</p>
				</div>

				<div className="col-12 col-md-6">
					<h3 className="text-center">Control Logo Tween</h3>
					<p>Use the buttons to control the Logo Tween</p>
					<div className="mb-2 btn-group">
						<button
							className="btn gsap-btn"
							onClick={this.buttonClickHandler.bind(null, "play")}
						>Play</button>
						<button
							className="btn gsap-btn"
							onClick={this.buttonClickHandler.bind(null, "pause")}
						>Pause</button>
						<button
							className="btn gsap-btn"
							onClick={this.buttonClickHandler.bind(null, "reverse")}
						>Reverse</button>
						<button
							className="btn gsap-btn"
							onClick={this.buttonClickHandler.bind(null, "restart")}
						>Restart</button>
					</div>
				</div>

				<div className="col-12 col-md-6">
					<h4 className="text-center">App State</h4>
					<pre className="p-2">
						{JSON.stringify(this.state, null, 2)}
					</pre>
				</div>

				<div className="col-12 mt-3">
					<hr />
					<img
						src="img/logo.svg"
						alt="GSAP Logo"
						className="img-fluid logo"
						ref={img => this.logoContainer = img}
					/>
				</div>

			</div>
		</div>;
	}

}

export default UpdateState;
