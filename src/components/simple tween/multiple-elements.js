/** 
 * MULTIPLE ELEMENTS SAMPLE
 * This sample creates an animation with a group of elements.
 * Using a data array, we create elements and add them to an array
 * in the component through the ref callback. This array is used in
 * the GSAP instance.
*/

import React, { Component } from "react";
import { TimelineLite, CSSPlugin, TweenMax } from "gsap/all";
// styles
import "../../styles/multiple-elements.css";

// the data array
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
		// cards, elements tha will be used in the tween
		this.cards = [];
		// the timeline instance
		this.tl = new TimelineLite({ paused: true });
		this.cardsTween;
	}

	componentDidMount(){
		this.cards.forEach( (card, index) => {
			this.tl.to( card , 0.5, { autoAlpha: 1, y: -20 }, 0.1 * index);
		});
	}

	render(){
		this.tl.kill().clear().pause(0);
		return <div className="container">
			<div className="row mt-3">
				
				<div className="col-12">
					<h3 className="text-center">Multiple Elements Animation</h3>
					<p>This sample uses an array of data to create a group of cards. For each card we add a instance to a single timeline, which can be controlled with the buttons present below.</p>
					<p>In this sample we use the ref inline callback to create a <i>from</i> instance in the timeline and the index value from the map array helper, to create the stagger effect.</p>
					<hr/>
					{/* buttons */}
					<h3 className="text-center">Control Timeline</h3>
					<p>Use the buttons to control the cards Timeline</p>
					<div className="mb-2 btn-group">
						<button
							className="btn gsap-btn"
							onClick={() =>  this.tl.play()}
						>Play</button>
						<button
							className="btn gsap-btn"
							onClick={() => this.tl.pause()}
						>Pause</button>
						<button
							className="btn gsap-btn"
							onClick={() => this.tl.reverse()}
						>Reverse</button>
						<button
							className="btn gsap-btn"
							onClick={() => this.tl.restart()}
						>Restart</button>
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
