import React, { Component } from "react";
import { TweenLite, CSSPlugin } from "gsap/all";
import { Transition, TransitionGroup } from "react-transition-group";
import "../../styles/transition.css";

const TransitionCard = props => {
	const { in: show, remove, card } = props;
	return <Transition
		timeout={1000}
		mountOnEnter unmountOnExit appear
		in={show}
		addEndListener={(node, done) => {
			TweenLite.to(node, 0.35, {
				y: 0,
				autoAlpha: show ? 1 : 0,
				onComplete: done,
				delay: !show ? 0 : card.init ? props.index * 0.15 : 0
			});
		}}
	>
		<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 card-container">
			<div className="card transition-card">
				<div className="card-body">
					<h4 className="card-title text-center">
						{card.name}
						<button
							type="button" className="close"
							onClick={remove.bind(null, card.id)}
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</h4>
				</div>
			</div>
		</div>
	</Transition>;
};


class TransitionList extends Component {

	constructor(props){
		super(props);
		this.state = {
			value: "",
			cards: [],
			init: false
		};
		this.addNewPerson = this.addNewPerson.bind(this);
		this.removePerson = this.removePerson.bind(this);
		this.updateNameHandler = this.updateNameHandler.bind(this);
	}

	static getDerivedStateFromProps(props, state){
		if ( state.cards.length === 0 && !state.init ) {
			return {
				cards: props.cards,
				init: true
			};
		}
		return null;
	}

	updateNameHandler(e){
		this.setState({ value: e.target.value });
	}

	removePerson(id){
		this.setState({
			cards: this.state.cards.filter(card => card.id !== id)
		});
	}

	addNewPerson(e){
		e.preventDefault();
		if ( this.state.value !== "" ) {
			this.setState({
				cards: [].concat( this.state.cards, {
					id: new Date().getTime(),
					name: this.state.value,
				}),
				value: ""
			});
		}
	}

	render(){
		return <div className="container">
			<div className="row">

				<div className="col-12">
					<h3 className="text-center">Transition of a List of Items</h3>
					<p className="lead">Just like the previous sample, this animates the mount/unmount of a collection of components or elements wrapped in a <strong>&lt;Transition&gt;</strong> tag.</p>
					<p className="lead">Unlike the previous sample, in this we don't pass the <strong>in</strong> property to the component. The <strong>&lt;TransitionGroup&gt;</strong> component handles and passes the in boolean to each <strong>&lt;Transition&gt;</strong> element. Then in every transition child, we can access the <strong>in</strong> boolean on it's props.</p>
					<hr/>
				</div>
				{/* form */}
				<div className="col-12 col-md-6 mb-5">
					<form onSubmit={this.addNewPerson}>
						<div className="input-group">
							<input
								type="text"
								id="personName"
								name="personName"
								className="form-control"
								onChange={this.updateNameHandler}
								value={this.state.value}
							/>
							<div className="input-group-append">
								<button className="btn gsap-btn" type="submit">Add Person</button>
							</div>
						</div>
					</form>
				</div>
			
			</div>

			
			<TransitionGroup className="row">
				{this.state.cards.map((card, index) => 
					<TransitionCard
						key={card.id}
						index={index}
						card={card}
						remove={this.removePerson}
					/>
				)}
			</TransitionGroup>

		</div>;
	}

}

export default TransitionList;
