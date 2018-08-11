import React, { Component } from "react";
import { Draggable } from "gsap/all";

class DraggableSlider extends Component {

	dragHandle = null;
	dragPath = null;

	componentDidMount(){
		this.dragInstance = Draggable.create( this.dragHandle, {
			type: "x",
			bounds: { minX: 0, maxX: this.dragPath.clientWidth - this.dragHandle.clientWidth }
		});
	}

	render(){
		return <div className="drag-track" ref={ e => this.dragPath = e }>
			<div className="drag-handle" ref={ e => this.dragHandle = e }></div>
		</div>;
	}

}

export default DraggableSlider;
