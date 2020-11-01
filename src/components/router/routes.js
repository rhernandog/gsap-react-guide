import React, { Component } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
// components
import { Home, Services, Contact } from "./components";

const paths = [
	"/", "/services", "/contact"
];

class Routes extends Component {

	render(){
		return <div className="container">
			<div className="row">
				<div className="col-12">
					<h3 className="text-center">Анимация маршрутов с помощью GSAP</h3>
					<p className="lead"></p>
				</div>
			</div>

			<BrowserRouter>
				<div className="row">

					{/* MENU */}
					<nav className="col-12">
						<Link className="btn gsap-btn mr-2" to="/">Дом</Link>
						<Link className="btn gsap-btn mr-2" to="/services">Сервисы</Link>
						<Link className="btn gsap-btn" to="/contact">Контакт</Link>
					</nav>

					{/* CONTENT */}
					<div className="col-12">
						<Route path="/" exact>
							{ ({ match }) => <Home show={match !== null} /> }
						</Route>
						
						<Route path="/services">
							{ ({ match }) => <Services show={match !== null} /> }
						</Route>
						<Route path="/contact">
							{ ({ match }) => <Contact show={match !== null} /> }
						</Route>
						<Route path="/" render={({ location }) => {
							if ( paths.indexOf( location.pathname ) < 0 ) {
								// this is 404
								return <Redirect to="/" />;
							} else {
								return "";
							}
						}} />
					</div>

				</div>
			</BrowserRouter>

		</div>;
	}

}

export default Routes;
