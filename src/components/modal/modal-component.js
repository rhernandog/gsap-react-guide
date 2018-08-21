/** 
 * 
*/
import React, { Component } from "react";
import { TimelineLite, CSSPlugin } from "gsap/all";
// styles
import "../../styles/modal.css";

class ModalComponent extends Component {

	constructor(props){
		super(props);

		this.modalWrap = null;
		this.modalDialog = null;
		this.modalTween = new TimelineLite({ paused: true });

		this.keyDownHandler = this.keyDownHandler.bind(this);
	}


	keyDownHandler = e => {
		if ( e.keyCode == 27 ) this.props.close();
	}

	componentDidMount() {
		this.modalTween
			.set(this.modalWrap, { autoAlpha: 1 })
			.to(this.modalDialog, 0.25, { y: 50 }, 0)
			.reversed(true)
			.paused(false);
	}

	componentDidUpdate(){
		if ( this.props.visible ) {
			window.addEventListener('keydown', this.keyDownHandler);
		} else {
			window.removeEventListener('keydown', this.keyDownHandler);
		}
		this.modalTween.reversed(!this.props.visible);
	}

	render(){
		return <div className="modal"
			ref={div => this.modalWrap = div}
			onClick={this.props.close}
		>
			<div
				className="modal-dialog"
				ref={div => this.modalDialog = div}
				onClick={event => event.stopPropagation()}
			>
				<div className="modal-content">
					<div className="modal-header">
						<h4>A Simple Modal Tween</h4>
					</div>
					<div className="modal-body">
						<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam velit provident sunt iusto ratione dolore veritatis deserunt ullam vel doloribus.</p>
					</div>
					<div className="modal-footer">
						<button className="btn btn-secondary"
							onClick={this.props.close}
						>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>;
	}

}

export default ModalComponent;
