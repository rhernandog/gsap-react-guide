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

/***/ "./src/components/simple tween/simple-tween.js":
/*!*****************************************************!*\
  !*** ./src/components/simple tween/simple-tween.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _all = __webpack_require__(/*! gsap/all */ "./node_modules/gsap/all.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /** 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * SIMPLE TWEEN SAMPLE
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This sample creates a simple animation and controls for that animation.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Reviews the methods to get the DOM element and pass it to the GSAP
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * instance. 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

// import { TimelineLite, CSSPlugin } from "gsap/all";


var SimpleTween = function (_Component) {
	_inherits(SimpleTween, _Component);

	function SimpleTween(props) {
		_classCallCheck(this, SimpleTween);

		// logo container
		var _this = _possibleConstructorReturn(this, (SimpleTween.__proto__ || Object.getPrototypeOf(SimpleTween)).call(this, props));

		_this.logoContainer = null;
		// logo tween
		_this.logoTween = null;
		return _this;
	}

	_createClass(SimpleTween, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			// create logo tween
			this.logoTween = new TimelineLite({ paused: true }).to(this.logoContainer, 2, { x: 500 }).to(this.logoContainer, 1, { rotation: 360, transformOrigin: "center" });
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement(
				"div",
				{ className: "container" },
				_react2.default.createElement(
					"div",
					{ className: "row" },
					_react2.default.createElement(
						"div",
						{ className: "col-12 mt-3" },
						_react2.default.createElement(
							"h3",
							{ className: "text-center" },
							"Simple Tween"
						),
						_react2.default.createElement(
							"p",
							null,
							"Animates the GSAP logo to the right of it's original position and finally does a 360 degrees rotation. You can use the buttons to control the animation."
						),
						_react2.default.createElement(
							"p",
							null,
							"Uses the ",
							_react2.default.createElement(
								"strong",
								null,
								"ref"
							),
							" inline callback to create a reference to the DOM element, which is then used in the ",
							_react2.default.createElement(
								"strong",
								null,
								"componentDidMount"
							),
							" event to create the GSAP instance."
						),
						_react2.default.createElement("hr", null)
					),
					_react2.default.createElement(
						"div",
						{ className: "col-12" },
						_react2.default.createElement(
							"h3",
							{ className: "text-center" },
							"Control Logo Tween"
						),
						_react2.default.createElement(
							"p",
							null,
							"Use the buttons to control the Logo Tween"
						),
						_react2.default.createElement(
							"div",
							{ className: "mb-2 btn-group" },
							_react2.default.createElement(
								"button",
								{
									className: "btn gsap-btn",
									onClick: function onClick() {
										return _this2.logoTween.play();
									}
								},
								"Play"
							),
							_react2.default.createElement(
								"button",
								{
									className: "btn gsap-btn",
									onClick: function onClick() {
										return _this2.logoTween.pause();
									}
								},
								"Pause"
							),
							_react2.default.createElement(
								"button",
								{
									className: "btn gsap-btn",
									onClick: function onClick() {
										return _this2.logoTween.reverse();
									}
								},
								"Reverse"
							),
							_react2.default.createElement(
								"button",
								{
									className: "btn gsap-btn",
									onClick: function onClick() {
										return _this2.logoTween.restart();
									}
								},
								"Restart"
							)
						),
						_react2.default.createElement("hr", null)
					),
					_react2.default.createElement(
						"div",
						{ className: "col-12 mt-3" },
						_react2.default.createElement("img", {
							src: "img/logo.svg",
							alt: "",
							className: "img-fluid logo",
							ref: function ref(img) {
								return _this2.logoContainer = img;
							}
						})
					)
				)
			);
		}
	}]);

	return SimpleTween;
}(_react.Component);

exports.default = SimpleTween;

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

var _simpleTween = __webpack_require__(/*! ./components/simple tween/simple-tween */ "./src/components/simple tween/simple-tween.js");

var _simpleTween2 = _interopRequireDefault(_simpleTween);

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
				_react2.default.createElement(_simpleTween2.default, null)
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
//# sourceMappingURL=app-8b1591094fff42954daf.js.map