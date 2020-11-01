/** 
 * 
*/
import React, { Component } from "react";
import { TimelineLite, CSSPlugin } from "gsap/all";

class StateControl extends Component {

	constructor(props){
		super(props);

		this.state = {
			play: false,
			pause: true,
			reverse: false,
			restart: false
		};

		this.logoContainer = null;
		this.logoTween = new TimelineLite({ paused: true });

		this.buttonClickHandler = this.buttonClickHandler.bind(this);
	}

	/** The button click handler
	 * Depending on the type of action, how the state will be updated
	 * @param {string} type the action for the timeline
	*/
	buttonClickHandler = type => {
		const newState = {};
		newState[type] = true;
		this.setState( newState );
	}

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
					<p>Оживляет логотип GSAP справа от его исходного положения и, наконец, делает 360 градусов вращения. Вы можете использовать кнопки для управления анимацией.</p>
					<p>В этом конкретном примере анимация управляется на основе изменений состояния компонента. Приложение считывает обновления состояния и воспроизводит, приостанавливает, отменяет или перезапускает анимацию логотипа.</p>
					<hr />
				</div>

				<div className="col-12 col-md-6">
					<h3 className="text-center">Управление логотипом Tween</h3>
					<p>Используйте кнопки для управления Logo Tween</p>
					<div className="mb-2 btn-group">
						<button
							className="btn gsap-btn"
							onClick={this.buttonClickHandler.bind(null, "play")}
						>Играть</button>
						<button
							className="btn gsap-btn"
							onClick={this.buttonClickHandler.bind(null, "pause")}
						>Пауза</button>
						<button
							className="btn gsap-btn"
							onClick={this.buttonClickHandler.bind(null, "reverse")}
						>Реверс</button>
						<button
							className="btn gsap-btn"
							onClick={this.buttonClickHandler.bind(null, "restart")}
						>Рестарт</button>
					</div>
				</div>
				
				<div className="col-12 col-md-6">
					<h4 className="text-center">Состояние приложения</h4>
					<pre className="p-2">
						{ JSON.stringify(this.state, null, 2) }
					</pre>
				</div>

				<div className="col-12 mt-3">
					<hr/>
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

export default StateControl;
