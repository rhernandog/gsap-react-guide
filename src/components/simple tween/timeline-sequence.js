import React, { Component } from "react";
import { TimelineLite, CSSPlugin } from "gsap/all";
// styles
import "../../styles/sequence.css";

// icons will be animated using a stagger method
const iconsArray = [
	{ src: "https://www.greensock.com/_img/codepen/icon_robust.png", width: "83", height: "59" },
	{ src: "https://www.greensock.com/_img/codepen/icon_overwrite.png", width: "43", height: "59" },
	{ src: "https://www.greensock.com/_img/codepen/icon_compatible.png", width: "73", height: "59" },
	{ src: "https://www.greensock.com/_img/codepen/icon_support.png", width: "83", height: "59" },
	{ src: "https://www.greensock.com/_img/codepen/icon_plugin.png", width: "76", height: "59" }
];

class TimelineSequence extends Component {

	logoTl = new TimelineLite({ paused:true });

	content = null;
	head = null;
	subhead = null;
	feature = null;
	description = null;
	icons = [];

	// add instances to the timeline
	componentDidMount(){
		this.logoTl
			.set(this.content, { autoAlpha: 1 })// show content div
			.from(this.head, 0.5, { left: 100, autoAlpha: 0 })
			.from(this.subhead, 0.5, { left: -100, autoAlpha: 0 }, "-=0.25") // added -0.25 seconds prior to end this.of timeline
			.from(this.feature, 0.5, { scale: .5, autoAlpha: 0 }, "+=0.5") // added 0.5 seconds after end of timeline
			.from(this.description, 0.5, { left: 100, autoAlpha: 0 }, "-=0.25")
			.staggerFrom(this.icons, 0.2, { scale: 0, autoAlpha: 0 }, 0.1); //animate all icons with 0.1 second stagger
	}

	render(){
		return <div className="container">
			<div className="row">
				<div className="col-12 mt-3">

					<h3 className="text-center">Timeline Sequence</h3>
					<p className="lead">Uses the <strong>ref</strong> callback to create references for a group of elements in the app. Then using the <strong>componentDidMount</strong> method, creates a timeline sequence that can be controlled using the buttons.</p>
					
					{/* DEMO WRAPPER */}
					<div className="demoWrapper">

						<div className="bg"></div>

						<div className="content" ref={ e => this.content = e }>

							<h1 ref={ e => this.head = e }>Freakishly Robust</h1>
							<h2 ref={ e => this.subhead = e }>With features that makes other engines look like cheap toys</h2>
							<div className="info">
								<img src="https://www.greensock.com/_img/codepen/feature_robust.png" width="240" height="151" className="feature" ref={ e => this.feature = e } />
								<p className="description" ref={ e => this.description = e }>Animate colors, beziers, css properties, arrays, scrolls and lots more. Round values, smoothly reverse() on the fly, use relative values, employ virtually any easing equation, and manage conflicting tweens like a pro. GSAP does all this and much more with ease.</p>
							</div>

							<div className="nav">
								{ iconsArray.map( (e,i) => {
									const { src, width, height } = e;
									return <img key={`icon-${i}`}
										src={src} width={width} height={height}
										ref={ img => this.icons.push(img) }
									/>;
								})}
							</div>

						</div>

					</div>

					{/* BUTTONS */}
					<div className="my-3 btn-group">
						<button className="btn gsap-btn"
							onClick={() => this.logoTl.play()}
						>Play</button>
						<button className="btn gsap-btn"
							onClick={() => this.logoTl.pause()}
						>Pause</button>
						<button className="btn gsap-btn"
							onClick={() => this.logoTl.reverse()}
						>Reverse</button>
						<button className="btn gsap-btn"
							onClick={() => this.logoTl.restart()}
						>Restart</button>
					</div>

				</div>
			</div>
		</div>;
	}

}

export default TimelineSequence;
