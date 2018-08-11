/** 
 * Control Through State.
 * This sample shows how to control a GSAP instance, through the state
 * of the component where the instance lives in.
 * Basically uses UI elements to update the component's state and as
 * the state changes the GSAP instance playhead starts, pauses, reverses
 * and resume, according to it.
 * This can be extrapolated to be used with props of other components
 * and controlled via a store using either Redux or MobX.
*/
import React, { Component } from "react";
import { TweenLite, CSSPlugin } from "gsap/all";

class ControlThroughState extends Component {

	// set the state
	state = {
		tweenPaused: true,
		tweenReversed: false,
		tweenRestart: false
	};

	pauseTween = () => this.setState({ tweenPaused: true });

	playTween = () => this.setState({
		tweenPaused: false,
		tweenReversed: false
	});

	reverseTween = () => this.setState({
		tweenPaused: false,
		tweenReversed: true
	});

	restartTween = () => this.setState({
		tweenPaused: false,
		tweenReversed: false,
		tweenRestart: true
	});

	componentDidUpdate(){
		const { tweenPaused, tweenReversed, tweenRestart } = this.state;
		console.log( this.state );
	}

	render(){
		return <div className="row">
			<div className="col-12">
				<div className="mb-2 btn-group">
					<button className="btn gsap-btn"
						onClick={this.playTween}
					>Play</button>
					<button className="btn gsap-btn"
						onClick={this.pauseTween}
					>Pause</button>
					<button className="btn gsap-btn"
						onClick={this.reverseTween}
					>Reverse</button>
					<button className="btn gsap-btn"
						onClick={this.restartTween}
					>Restart</button>
				</div>
			</div>
		</div>;
	}

}

export default ControlThroughState;
