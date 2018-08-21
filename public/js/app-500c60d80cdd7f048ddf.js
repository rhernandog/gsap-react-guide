/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.js","vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./src/styles/base.css":
/*!*******************************************************!*\
  !*** ./node_modules/css-loader!./src/styles/base.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "body,\r\npre {\r\n\tbackground-color: #333;\r\n\tcolor: #fff;\r\n}\r\n\r\nhr {\r\n\tborder-color: #fff;\r\n}\r\n\r\n.gsap-btn {\r\n\tbackground-color: #73b102;\r\n\tcolor: #fff;\r\n}\r\n\r\na:hover,\r\n.gsap-btn:hover,\r\n.gsap-btn:active,\r\n.gsap-btn:focus {\r\n\tbackground-color: #88ce02;\r\n\tcolor: #fff;\r\n}\r\n\r\n.logo {\r\n\twidth: 150px;\r\n}\r\n/*\tGSAP & REACT GUIDE BASE\r\n******************************************/\r\n\r\n.knob {\r\n\twidth: 150px;\r\n}\r\n\r\n/* DRAGGABLE COMPONENT */\r\n.drag-track {\r\n\twidth: 80%;\r\n\twidth: 600px;\r\n\tmargin: 15px auto 0;\r\n\tposition: relative;\r\n\tbackground-color: #fff;\r\n\tborder-radius: 2px;\r\n\theight: 15px;\r\n}\r\n\r\n.drag-handle {\r\n\tbackground-color: #e6e6e6;\r\n\tposition: absolute;\r\n\tborder-radius: 2px;\r\n\tcursor: pointer;\r\n\tleft: 0;\r\n\ttop: -3px;\r\n\theight: 21px;\r\n\twidth: 21px;\r\n}\r\n\r\n.drag-handle:hover {\r\n\tbackground-color: #f2f2f2;\r\n}\r\n", ""]);

// exports


/***/ }),

/***/ "./src/components/router/components.js":
/*!*********************************************!*\
  !*** ./src/components/router/components.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Contact = exports.Services = exports.Home = undefined;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactTransitionGroup = __webpack_require__(/*! react-transition-group */ "./node_modules/react-transition-group/index.js");

var _all = __webpack_require__(/*! gsap/all */ "./node_modules/gsap/all.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startState = { autoAlpha: 0, y: -50 };

var Home = exports.Home = function Home(props) {
	return _react2.default.createElement(
		_reactTransitionGroup.Transition,
		{
			unmountOnExit: true,
			"in": props.show,
			timeout: 1000,
			onEnter: function onEnter(node) {
				return _all.TweenLite.set(node, startState);
			},
			addEndListener: function addEndListener(node, done) {
				_all.TweenLite.to(node, 0.5, {
					autoAlpha: props.show ? 1 : 0,
					y: props.show ? 0 : 50,
					onComplete: done
				});
			}
		},
		_react2.default.createElement(
			"div",
			{ className: "position-absolute col-12" },
			_react2.default.createElement(
				"div",
				{ className: "col-12 mt-5" },
				_react2.default.createElement(
					"div",
					{ className: "alert alert-success" },
					_react2.default.createElement(
						"h2",
						{ className: "text-center mb-0" },
						"HOME"
					)
				),
				_react2.default.createElement(
					"p",
					null,
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis exercitationem provident vitae cum inventore voluptatem, numquam laborum minima quisquam excepturi odit similique repellendus beatae vero autem, natus ab deleniti expedita?"
				),
				_react2.default.createElement(
					"p",
					null,
					"Porro eveniet dolores consectetur, sapiente quas cupiditate natus, nemo iusto modi hic accusantium necessitatibus cumque nostrum expedita quisquam corrupti alias nobis praesentium impedit non quos! Id deserunt explicabo iure nulla."
				)
			)
		)
	);
};

var Services = exports.Services = function Services(props) {
	return _react2.default.createElement(
		_reactTransitionGroup.Transition,
		{
			unmountOnExit: true,
			"in": props.show,
			timeout: 1000,
			onEnter: function onEnter(node) {
				return _all.TweenLite.set(node, startState);
			},
			addEndListener: function addEndListener(node, done) {
				_all.TweenLite.to(node, 0.5, {
					autoAlpha: props.show ? 1 : 0,
					y: props.show ? 0 : 50,
					onComplete: done
				});
			}
		},
		_react2.default.createElement(
			"div",
			{ className: "position-absolute col-12" },
			_react2.default.createElement(
				"div",
				{ className: "col-12 mt-5" },
				_react2.default.createElement(
					"div",
					{ className: "alert alert-success" },
					_react2.default.createElement(
						"h2",
						{ className: "text-center mb-0" },
						"SERVICES"
					)
				),
				_react2.default.createElement(
					"p",
					null,
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, suscipit consequuntur repellendus qui harum, cumque facilis quisquam, consectetur saepe doloremque ducimus? Suscipit repudiandae aut fuga."
				),
				_react2.default.createElement(
					"p",
					null,
					"Explicabo ut ea, hic delectus iste error illo tempora molestiae facilis amet officia, repudiandae impedit praesentium labore enim doloremque optio quae sunt odit possimus repellendus."
				)
			)
		)
	);
};

var Contact = exports.Contact = function Contact(props) {
	return _react2.default.createElement(
		_reactTransitionGroup.Transition,
		{
			unmountOnExit: true,
			"in": props.show,
			timeout: 1000,
			onEnter: function onEnter(node) {
				return _all.TweenLite.set(node, startState);
			},
			addEndListener: function addEndListener(node, done) {
				_all.TweenLite.to(node, 0.5, {
					autoAlpha: props.show ? 1 : 0,
					y: props.show ? 0 : 50,
					onComplete: done
				});
			}
		},
		_react2.default.createElement(
			"div",
			{ className: "position-absolute col-12" },
			_react2.default.createElement(
				"div",
				{ className: "col-12 mt-5" },
				_react2.default.createElement(
					"div",
					{ className: "alert alert-success" },
					_react2.default.createElement(
						"h3",
						{ className: "text-center mb-0" },
						"CONTACT"
					)
				),
				_react2.default.createElement(
					"div",
					{ className: "row justify-content-center" },
					_react2.default.createElement(
						"div",
						{ className: "col-12 col-md-6" },
						_react2.default.createElement(
							"div",
							{ className: "form-group" },
							_react2.default.createElement(
								"label",
								{ htmlFor: "name" },
								"Name"
							),
							_react2.default.createElement("input", { type: "text", name: "name", id: "name", className: "form-control" })
						),
						_react2.default.createElement(
							"div",
							{ className: "form-group" },
							_react2.default.createElement(
								"label",
								{ htmlFor: "mail" },
								"Email"
							),
							_react2.default.createElement("input", { type: "email", name: "mail", id: "mail", className: "form-control" })
						),
						_react2.default.createElement(
							"div",
							{ className: "form-group" },
							_react2.default.createElement(
								"label",
								{ htmlFor: "comments" },
								"Comments"
							),
							_react2.default.createElement("textarea", { name: "comments", id: "comments", rows: "5", className: "form-control" })
						),
						_react2.default.createElement(
							"button",
							{ className: "btn gsap-btn" },
							"Submit"
						)
					)
				)
			)
		)
	);
};

/***/ }),

/***/ "./src/components/router/routes.js":
/*!*****************************************!*\
  !*** ./src/components/router/routes.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _components = __webpack_require__(/*! ./components */ "./src/components/router/components.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// components


var paths = ["/", "/services", "/contact"];

var Routes = function (_Component) {
	_inherits(Routes, _Component);

	function Routes() {
		_classCallCheck(this, Routes);

		return _possibleConstructorReturn(this, (Routes.__proto__ || Object.getPrototypeOf(Routes)).apply(this, arguments));
	}

	_createClass(Routes, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{ className: "container" },
				_react2.default.createElement(
					"div",
					{ className: "row" },
					_react2.default.createElement(
						"div",
						{ className: "col-12" },
						_react2.default.createElement(
							"h3",
							{ className: "text-center" },
							"Animating Routes With GSAP"
						),
						_react2.default.createElement("p", { className: "lead" })
					)
				),
				_react2.default.createElement(
					_reactRouterDom.BrowserRouter,
					null,
					_react2.default.createElement(
						"div",
						{ className: "row" },
						_react2.default.createElement(
							"nav",
							{ className: "col-12" },
							_react2.default.createElement(
								_reactRouterDom.Link,
								{ className: "btn gsap-btn mr-2", to: "/" },
								"Home"
							),
							_react2.default.createElement(
								_reactRouterDom.Link,
								{ className: "btn gsap-btn mr-2", to: "/services" },
								"Services"
							),
							_react2.default.createElement(
								_reactRouterDom.Link,
								{ className: "btn gsap-btn", to: "/contact" },
								"Contact"
							)
						),
						_react2.default.createElement(
							"div",
							{ className: "col-12" },
							_react2.default.createElement(
								_reactRouterDom.Route,
								{ path: "/", exact: true },
								function (_ref) {
									var match = _ref.match;
									return _react2.default.createElement(_components.Home, { show: match !== null });
								}
							),
							_react2.default.createElement(
								_reactRouterDom.Route,
								{ path: "/services" },
								function (_ref2) {
									var match = _ref2.match;
									return _react2.default.createElement(_components.Services, { show: match !== null });
								}
							),
							_react2.default.createElement(
								_reactRouterDom.Route,
								{ path: "/contact" },
								function (_ref3) {
									var match = _ref3.match;
									return _react2.default.createElement(_components.Contact, { show: match !== null });
								}
							),
							_react2.default.createElement(_reactRouterDom.Route, { path: "/", render: function render(_ref4) {
									var location = _ref4.location;

									if (paths.indexOf(location.pathname) < 0) {
										// this is 404
										return _react2.default.createElement(_reactRouterDom.Redirect, { to: "/" });
									} else {
										return "";
									}
								} })
						)
					)
				)
			);
		}
	}]);

	return Routes;
}(_react.Component);

exports.default = Routes;

/***/ }),

/***/ "./src/helpers/transition-group-cards.js":
/*!***********************************************!*\
  !*** ./src/helpers/transition-group-cards.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var cards = exports.cards = [{
	"id": "1729d38abee60593c8c5d2d2cb95f546",
	"name": "Tamy",
	"init": true
}, {
	"id": "6bd5d6329026a15bf607118cdc95671b",
	"name": "Derek",
	"init": true
}, {
	"id": "2df108538776b71a95fc5303d6104f46",
	"name": "Emmit",
	"init": true
}, {
	"id": "fa106f03ec0d8b04f7e2d20b02b276ef",
	"name": "Lilly",
	"init": true
}];

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");

__webpack_require__(/*! ./styles/base.css */ "./src/styles/base.css");

var _transitionGroupCards = __webpack_require__(/*! ./helpers/transition-group-cards */ "./src/helpers/transition-group-cards.js");

var _routes = __webpack_require__(/*! ./components/router/routes */ "./src/components/router/routes.js");

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import base stylesheet


// Import components


var App = function (_Component) {
	_inherits(App, _Component);

	function App() {
		_classCallCheck(this, App);

		return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
	}

	_createClass(App, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(_routes2.default, null)
			);
		}
	}]);

	return App;
}(_react.Component);

(0, _reactDom.render)(_react2.default.createElement(App, null), document.getElementById("app-wrap"));

/***/ }),

/***/ "./src/styles/base.css":
/*!*****************************!*\
  !*** ./src/styles/base.css ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader!./base.css */ "./node_modules/css-loader/index.js!./src/styles/base.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ })

/******/ });
//# sourceMappingURL=app-500c60d80cdd7f048ddf.js.map