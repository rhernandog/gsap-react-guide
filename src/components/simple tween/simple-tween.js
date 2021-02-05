/** 
 * SIMPLE TWEEN SAMPLE
 * В этом примере создается простая анимация и элементы управления для этой анимации.
 * Проверяет методы получения элемента DOM и передачи его экземпляру GSAP 
**/

import React, { Component } from "react";
// import { TimelineLite, CSSPlugin } from "gsap/all";
import { TweenMax } from "gsap/all";

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
					<h3 className="text-center">Простая Анимация</h3>
					<p>Анимирует логотип GSAP справа от его исходного положения и, наконец, делает поворот на 360 градусов. Вы можете использовать кнопки для управления анимацией.</p>
					<p>Использует встроенный обратный вызов <strong>ref</strong> для создания ссылки на элемент DOM, который затем используется в событии <strong>componentDidMount</strong> для создания экземпляра GSAP.</p>
					<hr/>
				</div>

				<div className="col-12">
					<h3 className="text-center">Управление логотипом Tween</h3>
					<p>Используйте кнопки для управления Logo Tween</p>
					<div className="mb-2 btn-group">
						<button
							className="btn gsap-btn"
							onClick={() => this.logoTween.play()}
						>Играть</button>
						<button
							className="btn gsap-btn"
							onClick={() => this.logoTween.pause()}
						>Пауза</button>
						<button
							className="btn gsap-btn"
							onClick={() => this.logoTween.reverse()}
						>Реверс</button>
						<button
							className="btn gsap-btn"
							onClick={() => this.logoTween.restart()}
						>Перезапуск</button>
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
