/*
*******************************************************************************************
*  CARD SLIDE SAMPLE FROM REACTIFLUX
*******************************************************************************************
*/
import React, { Component } from "react";
import { TweenLite, CSSPlugin } from "gsap/all";

import "../styles/slide-card.css";

export const cardsData = [
	{
		"id": 1,
		"name": "Greater kudu"
	}, {
		"id": 2,
		"name": "Mongoose, javan gold-spotted"
	}, {
		"id": 3,
		"name": "Cat, european wild"
	}, {
		"id": 4,
		"name": "South American meadowlark (unidentified)"
	}, {
		"id": 5,
		"name": "Red-tailed hawk"
	}/*, {
		"id": 6,
		"name": "Rufous-collared sparrow"
	}, {
		"id": 7,
		"name": "Antechinus, brown"
	}, {
		"id": 8,
		"name": "African elephant"
	}, {
		"id": 9,
		"name": "Deer, black-tailed"
	}, {
		"id": 10,
		"name": "Northern fur seal"
	}, {
		"id": 11,
		"name": "Buffalo, american"
	}, {
		"id": 12,
		"name": "White-necked stork"
	}, {
		"id": 13,
		"name": "Gazelle, grant's"
	}, {
		"id": 14,
		"name": "Russian dragonfly"
	}, {
		"id": 15,
		"name": "Adouri (unidentified)"
	} */
];

class Card extends Component {

	constructor(props){
		super(props);

		this.state = {
			cards: this.props.cards,
			discarded: []
		};

		this.cardTween = null;
		this.cardElement = null;

		this.reverseCard = this.reverseCard.bind(this);
	}

	componentDidMount(){
		this.cardTween = TweenLite.to( this.cardElement, 0.75, {
			x: "125%", paused: true, onComplete: this.reverseCard
		});
	}

	reverseCard() {
		const { cards, discarded } = this.state;
		// if the card total in the state is 0
		// reset the cards in the state from the props
		if ( cards.length === 1 ) {
			this.setState({
				cards: this.props.cards,
				discarded: []
			});
		} else {
			const updatedCards = [].concat( cards );
			const first = updatedCards.shift();
			// update the state
			this.setState({
				cards: updatedCards,
				discarded: [first].concat( discarded)
			});
		}
		// reverse the animation
		this.cardTween.reverse();
	}

	render(){
		return <div className="card-wrapper">
			
			{/* container */}
			<div className="card-container">
				
				{/* card */}
				<div className="card" ref={e => this.cardElement = e}>
					<div className="card-content">{this.state.cards[0].name}</div>
				</div>

			</div>
			
			{/* controls */}
			<div className="card-controls">
				<div className="button-container">
					<button onClick={() => this.cardTween.play()}>Next Card</button>
				</div>
			</div>

		</div>;
	}

}

export default Card;
