import React, { Component } from "react";
import { TweenLite, CSSPlugin } from "gsap/all";
import { Transition } from "react-transition-group";
import "../../styles/transition.css";

class SimpleTransition extends Component {

	constructor(props){
		super(props);
		this.state = {
			show: false
		};

		this.toggleComponent = this.toggleComponent.bind(this);
	}

	toggleComponent(){
		this.setState({ show: !this.state.show });
	}

	render(){
		const { show } = this.state;
		return <div className="container">
			<div className="row">
				<div className="col-12">
					<h3 className="text-center">Группа перехода и образец GSAP</h3>
					<p className="lead">В этом примере для монтирования и размонтирования компонента используется переход. После установки компонент <strong>анимируется</strong> с помощью GSAP. Затем компонент <strong>анимируется</strong>, а когда анимация завершается, отключается.</p>
					<hr/>
				</div>
				<div className="col-12">
					<div className="btn-group">
						<button
							className="btn gsap-btn"
							onClick={this.toggleComponent}
						>Переключить компонент</button>
					</div>
					<hr/>
				</div>
			</div>

			<div className="row justify-content-center">
				<Transition
					timeout={1000} mountOnEnter unmountOnExit
					in={show}
					addEndListener={(node, done) => {
						TweenLite.to(node, 0.5, {
							x: show ? 0 : 100,
							autoAlpha: show ? 1 : 0,
							onComplete: done
						});
					}}
				>
					<div className="card col-6 transition-card simple">
						<div className="card-body">
							<h5 className="card-title">
							Анимация React с помощью GSAP
								<button
									type="button"
									className="close"
									onClick={() => this.setState({ show: false })}
								>
									<span aria-hidden="true">&times;</span>
								</button>
							</h5>
							<p className="card-text">Весь этот элемент монтируется до начала анимации входа и отключается после завершения анимации выхода!!</p>
						</div>
					</div>
				</Transition>
			</div>

		</div>;
	}

}

export default SimpleTransition;
