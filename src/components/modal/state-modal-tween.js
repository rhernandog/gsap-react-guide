/** 
 * 
*/

import React, { Component } from "react";
// modal component
import ModalComponent from "./modal-component";

class GSAPModal extends Component {

	state = {
		modalVisible: false
	}

	setModalVisible = v => this.setState({ modalVisible: v });

	render(){
		return <div>
			
			<div className="container">
				<div className="row">
					
					<div className="col-12 mt-3">
						<h3 className="text-center">State Controlled Modal</h3>
						<hr />
						<p>Animates a modal in and out by changing the state of the component.</p>
						<p>In this sample the modal animation is controlled by changing the state of the main component, then this state is passed as a prop to the modal component. The in/out animation of the modal depends on the value of this prop passed to it.</p>
						<p>A close method is also passed to the modal component as a prop, in order to hide the modal using a close button inside the modal component.</p>
					</div>

					<div className="col-12">
						<button className="btn gsap-btn" onClick={this.setModalVisible.bind(null, true)}>
							Show Modal
						</button>
						<hr/>
					</div>

					<div className="col-12 col-md-6">
						<h4>Main Component State</h4>
						<pre className="p-2">{JSON.stringify(this.state, null, 2)}</pre>
					</div>
					<div className="col-12 col-md-6">
						<h4>Modal Component Props</h4>
						<pre className="p-2">{JSON.stringify({
							visible: this.state.modalVisible
						}, null, 2)}</pre>
					</div>

				</div>
			</div>

			<ModalComponent visible={this.state.modalVisible} close={this.setModalVisible.bind(null, false)} />

		</div>;
	}

}

export default GSAPModal;
