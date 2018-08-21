import React from "react";
import { Transition } from "react-transition-group";
import { TweenLite, CSSPlugin } from "gsap/all";

const startState = { autoAlpha: 0, y: -50 };

export const Home = props => <Transition
	unmountOnExit
	in={props.show}
	timeout={1000}
	onEnter={node => TweenLite.set(node, startState)}
	addEndListener={ (node, done) => {
		TweenLite.to(node, 0.5, {
			autoAlpha: props.show ? 1 : 0,
			y: props.show ? 0 : 50,
			onComplete: done
		});
	}}
>
	<div className="position-absolute col-12">
		<div className="col-12 mt-5">
			<div className="alert alert-success">
				<h2 className="text-center mb-0">HOME</h2>
			</div>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis exercitationem provident vitae cum inventore voluptatem, numquam laborum minima quisquam excepturi odit similique repellendus beatae vero autem, natus ab deleniti expedita?</p>
			<p>Porro eveniet dolores consectetur, sapiente quas cupiditate natus, nemo iusto modi hic accusantium necessitatibus cumque nostrum expedita quisquam corrupti alias nobis praesentium impedit non quos! Id deserunt explicabo iure nulla.</p>
		</div>
	</div>
</Transition>;

export const Services = props => <Transition
	unmountOnExit
	in={props.show}
	timeout={1000}
	onEnter={ node => TweenLite.set(node, startState) }
	addEndListener={ (node, done) => {
		TweenLite.to(node, 0.5, {
			autoAlpha: props.show ? 1 : 0,
			y: props.show ? 0 : 50,
			onComplete: done
		});
	}}
>
	<div className="position-absolute col-12">
		<div className="col-12 mt-5">
			<div className="alert alert-success">
				<h2 className="text-center mb-0">SERVICES</h2>
			</div>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, suscipit consequuntur repellendus qui harum, cumque facilis quisquam, consectetur saepe doloremque ducimus? Suscipit repudiandae aut fuga.</p>
			<p>Explicabo ut ea, hic delectus iste error illo tempora molestiae facilis amet officia, repudiandae impedit praesentium labore enim doloremque optio quae sunt odit possimus repellendus.</p>
		</div>
	</div>
</Transition>;

export const Contact = props => <Transition
	unmountOnExit
	in={props.show}
	timeout={1000}
	onEnter={ node => TweenLite.set(node, startState) }
	addEndListener={ (node, done) => {
		TweenLite.to(node, 0.5, {
			autoAlpha: props.show ? 1 : 0,
			y: props.show ? 0 : 50,
			onComplete: done
		});
	}}
>
	<div className="position-absolute col-12">
		<div className="col-12 mt-5">
		
			<div className="alert alert-success">
				<h3 className="text-center mb-0">CONTACT</h3>
			</div>

			<div className="row justify-content-center">
				<div className="col-12 col-md-6">
					<div className="form-group">
						<label htmlFor="name">Name</label>
						<input type="text" name="name" id="name" className="form-control" />
					</div>
					<div className="form-group">
						<label htmlFor="mail">Email</label>
						<input type="email" name="mail" id="mail" className="form-control"/>
					</div>
					<div className="form-group">
						<label htmlFor="comments">Comments</label>
						<textarea name="comments" id="comments" rows="5" className="form-control"></textarea>
					</div>
					<button className="btn gsap-btn">Submit</button>
				</div>
			</div>

		</div>
	</div>
</Transition>;
