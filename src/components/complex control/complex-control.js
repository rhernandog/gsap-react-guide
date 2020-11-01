/** 
 * COMPLE CONTROL SAMPLE
 * This sample creates a simple animation and controls for that animation.
 * Also it has a Draggable instance that allows to control the logo tween,
 * as well as the buttons included in the UI.
*/

import React, { Component } from "react";
import { TimelineLite, CSSPlugin, Draggable } from "gsap/all";

class ComplexControl extends Component {

	// logo container
	logoContainer = null;
	// drag knob
	draggableKnob = null;
	// Draggable instance
	knobDragInstance = null;
	// logo tween
	logoTween = null;

	logoTweenUpdate = () => {
		TweenLite.set(this.draggableKnob, {
			// rotation: this.logoTween.progress() * 360
			rotation: this.logoTween.progress() * 360
		});
		this.knobDragInstance[0].update();
	}

	// draggable update
	dragKnobUpdate = () => {
		// this.logoTween.progress( this.knobDragInstance[0].rotation / 360 );
		this.logoTween.progress(this.knobDragInstance[0].rotation / 360 );
	}

	componentDidMount() {
		// create logo tween
		this.logoTween = new TimelineLite({ paused: true, onUpdate: this.logoTweenUpdate })
			.to(this.logoContainer, 2, { x: 500 })
			.to(this.logoContainer, 1, { rotation: 360, transformOrigin: "center" });
		// 

		this.knobDragInstance = Draggable.create(this.draggableKnob, {
			type: "rotation",
			bounds: {
				minRotation: 0, maxRotation: 360
			},
			onPress: () => this.logoTween.pause(),
			onDrag: this.dragKnobUpdate
		});
	}

	render(){
		return <div className="row">
			<div className="col-12 mt-3">
				<h3 className="text-center">Простой Tween - Комплексный контроль</h3>
				<p>Оживляет логотип GSAP справа от его исходного положения.</p>
				<p>Создает экземпляр Draggable (вращение) для элемента ручки.</p>
				<p>Управлять анимацией логотипа можно с помощью ручки на правой стороне экрана. Также прогресс tween логоса, повлияет на вращение ручки и экземпляр Draggable ручки.</p>
				<hr />
			</div>
			{/* buttons */}
			<div className="col-12 col-md-6">
				<h3 className="text-center">Контроль логотипа Tween</h3>
				<p>Используйте кнопки для управления логотипом Tween</p>
				<div className="mb-2 btn-group">
					<button className="btn gsap-btn"
						onClick={() => this.logoTween.play()}
					>Играть</button>
					<button className="btn gsap-btn"
						onClick={() => this.logoTween.pause()}
					>Пауза</button>
					<button className="btn gsap-btn"
						onClick={() => this.logoTween.reverse()}
					>Реверс</button>
					<button className="btn gsap-btn"
						onClick={() => this.logoTween.restart()}
					>Перезапуск</button>
				</div>
			</div>
			{/* draggable knob */}
			<div className="col-12 col-md-6">
				<h3 className="text-center">Выдвижная Ручка</h3>
				<p>Поверните ручку, чтобы управлять анимацией логотипа</p>
				<div className="text-center">
					<img src="img/knob.png" alt="" className="img-fluid knob"
						ref={e => this.draggableKnob = e}
					/>
				</div>
			</div>
			
			<hr className="col-12" />
			
			<div className="col-12 mt-3">
				<img src="img/logo.svg" alt="" className="img-fluid logo" ref={e => this.logoContainer = e} />
			</div>
		</div>;
	}
}

export default ComplexControl;
