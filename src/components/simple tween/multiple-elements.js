/** 
 * MULTIPLE ELEMENTS SAMPLE
 * Этот пример создает анимацию с группой элементов.
 * Используя массив данных, мы создаем элементы и добавляем их в массив 
 * в компоненте через обратный вызов ref. Этот массив используется в экземпляре 
 * GSAP.
*/

import React, { Component } from "react";
import { TimelineLite, CSSPlugin, TweenMax } from "gsap/all";
// стили
import "../../styles/multiple-elements.css";

// массив данных
const dataArray = [
	{
		"id": "0837a8f79f4657150c482f9400daea0b",
		"name": "Zathin"
	},
	{
		"id": "73000dccc18fd56c9941ee432a96708d",
		"name": "Tempsoft"
	},
	{
		"id": "33c6b55a4abad5eeaa6b29a3aeee8213",
		"name": "Bamity"
	},
	{
		"id": "7e5baef968a2c8ad3254169126247546",
		"name": "Span"
	},
	{
		"id": "528fcca2b4c1bf6d6190f848837c8d09",
		"name": "Duobam"
	},
	{
		"id": "b2452085516c81bab68c9f244700d8c1",
		"name": "Veribet"
	}
];

class MultipleElements extends Component {

	constructor(props){
		super(props);
		// карты, элементы, которые будут использоваться в твине
		this.cards = [];
		// экземпляр временной шкалы
		this.tl = new TimelineLite({ paused: true });
	}

	componentDidMount(){
		this.tl.staggerTo(this.cards , 0.5, { autoAlpha: 1, y: -20 }, 0.1);
	}

	render(){
		this.tl.kill().clear().pause(0);
		return <div className="container">
			<div className="row mt-3">
				
				<div className="col-12">
					<h3 className="text-center">Анимация Нескольких Элементов</h3>
					<p>В этом примере массив данных используется для создания группы карточек. Для каждой карты мы добавляем экземпляр в единую временную шкалу, которой можно управлять с помощью кнопок, представленных ниже.</p>
					<p>В этом примере мы используем встроенный обратный вызов ref для создания экземпляра <i>from</i> на временной шкале и значение индекса из помощника map array для создания эффекта stagger.</p>
					<hr/>
					{/* buttons */}
					<h3 className="text-center">Контрольная Шкала Времени</h3>
					<p>Используйте кнопки для управления временной шкалой карт</p>
					<div className="mb-2 btn-group">
						<button
							className="btn gsap-btn"
							onClick={() =>  this.tl.play()}
						>Играть</button>
						<button
							className="btn gsap-btn"
							onClick={() => this.tl.pause()}
						>Пауза</button>
						<button
							className="btn gsap-btn"
							onClick={() => this.tl.reverse()}
						>Реверс</button>
						<button
							className="btn gsap-btn"
							onClick={() => this.tl.restart()}
						>Рестарт</button>
					</div>
					<hr/>
				</div>
				
				{ // map through 
					dataArray.map( (e, i) => <div
						key={e.id}
						className="col-12 col-sm-6 col-md-4 card-element"
						ref={ div => this.cards.push(div) }
					>
						<div className="card mt-3">
							<div className="card-body">
								<div className="media">
									<img
										className="mr-3"
										src="http://via.placeholder.com/64"
										alt="Generic placeholder image"
									/>
									<div className="media-body">
										<h5 className="mt-0">{e.name}</h5>
									</div>
								</div>
							</div>
						</div>
					</div> )
				}

			</div>
		</div>;
	}
}

export default MultipleElements;
