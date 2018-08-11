/** 
 * MULTIPLE ELEMENTS SAMPLE
 * This sample creates an animation with a group of elements.
 * Using a data array, we create elements and add them to an array
 * in the component through the ref callback. This array is used in
 * the GSAP instance.
*/

import React, { Component } from "react";
import { TimelineLite, CSSPlugin, TweenLite } from "gsap/all";
import md5 from "blueimp-md5";

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
	},
	{
		"id": "df0089df387c989500c1c7c2cb164cee",
		"name": "Veribet"
	},
	{
		"id": "2ffbad734813a2db312ff82b3834190c",
		"name": "Veribet"
	},
	{
		"id": "748f47f60860d0b8553952d3c1ac237c",
		"name": "Tampflex"
	},
	{
		"id": "60218c567d0603a5a427c660bf580be4",
		"name": "Home Ing"
	}
];

class MultipleElements extends Component {

	// state
	state = {
		appData: [].concat(dataArray)
	};
	// array with the DOM elements
	elementsArray = [];
	// the timeline instance
	tl = new TimelineLite({ paused: true });

	addDataElement = () => {
		const newId = md5( new Date().getTime(), "nEwId" );
		// get an element from the current data and use it's name for the
		// new element
		const newEl = {
			id: md5( new Date().getTime(), "nEwId" ),
			name: this.state.appData[Math.floor(Math.random() * (this.state.appData.length - 1))].name
		};
		console.log( newEl );
		this.setState({
			appData: [].concat( this.state.appData, newEl)
		});
	};

	componentDidMount(){
		/* this.tl
			.staggerFrom( this.elementsArray, 0.5, {
				autoAlpha: 0, y: -20
			}, 0.1); */
	}

	render(){
		this.tl.kill().clear().pause(0);
		return <div className="row mt-3">
			<div className="col-12">
				<h3 className="text-center">Multiple Elements Animation</h3>
				<button className="btn btn-primary" onClick={this.addDataElement}>Test</button>
				<p>This sample </p>
				<hr/>
				{/* buttons */}
				<h3 className="text-center">Control Logo Tween</h3>
				<p>Use the buttons to control the Logo Tween</p>
				<div className="mb-2 btn-group">
					<button className="btn btn-primary"
						onClick={() =>  this.tl.play()}
					>Play</button>
					<button className="btn btn-primary"
						onClick={() => this.tl.reverse()}
					>Reverse</button>
					<button className="btn btn-primary"
						onClick={() => this.tl.restart()}
					>Restart</button>
					<button className="btn btn-primary"
						onClick={() => this.tl.pause()}
					>Pause</button>
				</div>
				<hr/>
			</div>
			{
				this.state.appData.map( (e, i) => <div key={e.id} className="col-12 col-sm-6 col-md-4 card-element"
					// ref={ e => this.elementsArray.push(e) }
					ref={ el => {
						if ( el ) {
							TweenLite.set(el, { clearProps: "all" });
							this.tl.to( el , 0.5, { autoAlpha: 1, y: -20 }, 0.1 * i);
						}
					}}
				>
					<div className="card mt-3">
						<div className="card-body">
							<div className="media">
								<img className="mr-3" src="http://via.placeholder.com/64" alt="Generic placeholder image" />
								<div className="media-body">
									<h5 className="mt-0">{e.name}</h5>
								</div>
							</div>
						</div>
					</div>
				</div> )
			}
		</div>;
	}
}

export default MultipleElements;
