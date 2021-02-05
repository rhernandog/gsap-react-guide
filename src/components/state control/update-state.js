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
					<h3 className="text-center">Состояние управления с помощью обратных вызовов GSAP</h3>
					<p>Использует обратные вызовы GSAP <i>onComplete</i> и <i>onReverseComplete</i> для обновления состояния компонента.</p>
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
