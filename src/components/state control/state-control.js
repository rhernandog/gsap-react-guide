/** 
 * 
*/
import React, { Component } from "react";
import { TweenLite, CSSPlugin } from "gsap/all";

class StateControl extends Component {

	state = {
		play: false,
		pause: true,
		reverse: false,
		restart: false
	};

	/** The button click handler
	 * Depending on the type of action, how the state will be updated
	 * @param {string} type the action for the timeline
	*/
	buttonClickHandler = type => {
		const newState = {};
		newState[type] = true;
		this.setState( newState );
	}

	logoContainer = null;
	logoTween = new TimelineLite({ paused: true });

	componentDidMount(){
		// create logo tween
		this.logoTween
			.to(this.logoContainer, 2, { x: 500 })
			.to(this.logoContainer, 1, { rotation: 360, transformOrigin: "center" });
	}

	// after the component's state has changed, update the 
	// timeline control. We compare the previous and updated state
	componentDidUpdate(prevProps, prevState) {
		const {
			play: prePlay,
			pause: prePause,
			reverse: preReverse,
			restart: preRestart
		} = prevState;
		const { play, pause, reverse, restart } = this.state;
		// the play state has changed
		if ( play && play !== prePlay ) {
			this.logoTween.play();
			// play means that the paused and reversed state should be false
			this.setState({
				pause: false,
				reverse: false
			});
		}
		// the pause state has changed
		if ( pause && pause !== prePause ) {
			this.logoTween.pause();
			// pausing means that play and reverse states should be false
			this.setState({
				play: false,
				reverse: false
			});
		}
		// the reversed state has changed 
		if ( reverse && reverse !== preReverse ) {
			this.logoTween.reverse();
			// the pause and play state should be false
			this.setState({
				play: false,
				pause: false
			});
		}
		// the restart state has changed
		if ( restart && restart !== preRestart ) {
			this.logoTween.restart();
			// the play state should be true
			// pause and reverse should be false
			// finally reset restart
			this.setState({
				play: true,
				pause: false,
				reverse: false,
				restart: false
			});
		}
	}

	render(){
		return <div className="container">
			<div className="row">
				
				<div className="col-12 mt-3">
					<h3 className="text-center">State Controlled Tween</h3>
					<p>Animates the GSAP logo to the right of it's original position and finally does a 360 degrees rotation. You can use the buttons to control the animation.</p>
					<p>In this particular sample the animation is controlled based on the component's state changes. The app reads the state updates and plays, pauses, reverses or restarts the logo animation.</p>
					<hr />
				</div>

				<div className="col-12 col-md-6">
					<h3 className="text-center">Control Logo Tween</h3>
					<p>Use the buttons to control the Logo Tween</p>
					<div className="mb-2 btn-group">
						<button className="btn gsap-btn"
							onClick={this.buttonClickHandler.bind(null, "play")}
						>Play</button>
						<button className="btn gsap-btn"
							onClick={this.buttonClickHandler.bind(null, "pause")}
						>Pause</button>
						<button className="btn gsap-btn"
							onClick={this.buttonClickHandler.bind(null, "reverse")}
						>Reverse</button>
						<button className="btn gsap-btn"
							onClick={this.buttonClickHandler.bind(null, "restart")}
						>Restart</button>
					</div>
				</div>
				
				<div className="col-12 col-md-6">
					<h4 className="text-center">App State</h4>
					<pre className="p-2">{JSON.stringify(this.state, null, 2)}</pre>
				</div>

				<div className="col-12 mt-3">
					<hr/>
					<img src="img/logo.svg" alt="" className="img-fluid logo" ref={e => this.logoContainer = e} />
				</div>

			</div>
		</div>;
	}
	
}

export default StateControl;
