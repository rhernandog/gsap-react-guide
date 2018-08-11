import React, { Component } from "react";
import { TweenLite, CSSPlugin } from "gsap/all";

import "./forums-absolute.css";

class ForumsAbsolute extends React.PureComponent {

	/* The selected index, is for the current active image.
	 * The next index is for the image that has been seleted by
	 * the user. This allows to create an animation for each card
	 * that will take it to it's final position.
	 * Special atention to the fact that when the card is going
	 * to a negative value, a onComplete must be added in order to
	 * set the image position at the end of the line (far left side
	 * of the collection), check if, given the number of cards and
	 * width of the visible area, the card should be animated into
	 * view at the end of the collection.
	*/
	state = {
		selected: 0,
		next: null,
		cardsAmount: this.props.cards.length
	};

	cards = [];
	// wrapper width
	wrapperWidth = 0;

	
	/** Method to place the selected element at the end.	
	 * Moves the selected element, that just was animated out of view,
	 * at the end of the group. Gets the width of the container and sets
	 * the x position to that value.
	*/
	placeSelectedElement = () => {
		const { next, selected } = this.state;
		TweenLite.set(this.cards[selected], { x: -this.wrapperWidth });
		// finally update the selected index in the state
		this.setState({ selected: next });
	};

	componentDidMount(){
		this.cards.forEach( (e, i) => {
			const amount = i === 0 ? 0 : 160 + (110 * (i - 1)) ;
			TweenLite.set(e, { x: -amount });
		});
		// set the initial card size
		/* TweenLite.set( this.cards[this.state.selected], {
			minWidth: 150, height: 450
		}); */
	}

	componentDidUpdate(prevProps, prevState){
		const { next, selected } = this.state;
		// a new element should be highlighted
		if ( prevState.next !== this.state.next ) {
			console.log( "next => ", next );
			console.log( "selected => ", selected );
			TweenLite.to(this.cards[next], 0.3, { x: 0 });
			/* Move the current element out
			 * After the selected element is moved out, goes back to the end of the line
			 * at the left side of the group
			*/
			TweenLite.to(this.cards[selected], 0.3, {
				x: 110,
				onComplete: this.placeSelectedElement
			});
			/* Move the other elements, that are neither the next or selected
			 * one to their next positions. Value must be absolut to allow overwrite
			 * in case the user clicks next while the animations are running.
			*/
		}
	}

	/* 
	 * 
	*/
	/** Method to advance to the next card
	 * Basically increases the selected and next indexes in the state
	 * by one.
	 * @private
	*/
	nextClickHandler = () => {
		const { selected, cardsAmount, next } = this.state;
		// check if the selected is the final one
		if ( next === cardsAmount - 1 ) {
			this.setState({ next: 0 });
		} else {
			this.setState({ next: (next || 0) + 1 });
		}
	}

	render(){
		// clear the array, prevents the array from growing on each render
		this.cards = [];
		const { selected, cardsAmount } = this.state;
		return <div className="wrapper">

			{/* cards */}
			<div className="cards-wrap" ref={e => e ? this.wrapperWidth = e.clientWidth : e }>
				
				<div className="card-indicator">
					{`${selected + 1} / ${cardsAmount}`}
				</div>
				
				{this.props.cards.map( (e, i) => <div key={e.id} data-target={i}
					ref={ card => card === null ? null : this.cards.push(card) }
					className="card-el"
				>
					{i + 1}
				</div>)}
			</div>

			{/* info */}
			<div className="card-info">

				<div className="card-info-data"></div>

				<div className="card-info-nav">
					<button className="btn btn-secondary" onClick={this.nextClickHandler}>Next</button>
				</div>

			</div>

		</div>;
	}

}

export default ForumsAbsolute;
