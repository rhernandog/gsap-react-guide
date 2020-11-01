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
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
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
/******/
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

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/base.css":
/*!*******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/base.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "body,\npre {\n\tbackground-color: #333;\n\tcolor: #fff;\n}\n\nhr {\n\tborder-color: #fff;\n}\n\n.gsap-btn {\n\tbackground-color: #73b102;\n\tcolor: #fff;\n}\n\na:hover,\n.gsap-btn:hover,\n.gsap-btn:active,\n.gsap-btn:focus {\n\tbackground-color: #88ce02;\n\tcolor: #fff;\n}\n\n.logo {\n\twidth: 150px;\n}\n/*\tGSAP & REACT GUIDE BASE\n******************************************/\n\n.knob {\n\twidth: 150px;\n}\n\n/* DRAGGABLE COMPONENT */\n.drag-track {\n\twidth: 80%;\n\twidth: 600px;\n\tmargin: 15px auto 0;\n\tposition: relative;\n\tbackground-color: #fff;\n\tborder-radius: 2px;\n\theight: 15px;\n}\n\n.drag-handle {\n\tbackground-color: #e6e6e6;\n\tposition: absolute;\n\tborder-radius: 2px;\n\tcursor: pointer;\n\tleft: 0;\n\ttop: -3px;\n\theight: 21px;\n\twidth: 21px;\n}\n\n.drag-handle:hover {\n\tbackground-color: #f2f2f2;\n}\n", ""]);
// Exports
module.exports = exports;


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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * В этом примере создается простая анимация и элементы управления для этой анимации.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Проверяет методы получения элемента DOM и передачи его экземпляру GSAP 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               **/

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
							"\u041F\u0440\u043E\u0441\u0442\u0430\u044F \u0410\u043D\u0438\u043C\u0430\u0446\u0438\u044F"
						),
						_react2.default.createElement(
							"p",
							null,
							"\u0410\u043D\u0438\u043C\u0438\u0440\u0443\u0435\u0442 \u043B\u043E\u0433\u043E\u0442\u0438\u043F GSAP \u0441\u043F\u0440\u0430\u0432\u0430 \u043E\u0442 \u0435\u0433\u043E \u0438\u0441\u0445\u043E\u0434\u043D\u043E\u0433\u043E \u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0438, \u043D\u0430\u043A\u043E\u043D\u0435\u0446, \u0434\u0435\u043B\u0430\u0435\u0442 \u043F\u043E\u0432\u043E\u0440\u043E\u0442 \u043D\u0430 360 \u0433\u0440\u0430\u0434\u0443\u0441\u043E\u0432. \u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043A\u043D\u043E\u043F\u043A\u0438 \u0434\u043B\u044F \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u0430\u043D\u0438\u043C\u0430\u0446\u0438\u0435\u0439."
						),
						_react2.default.createElement(
							"p",
							null,
							"\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442 \u0432\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u044B\u0439 \u043E\u0431\u0440\u0430\u0442\u043D\u044B\u0439 \u0432\u044B\u0437\u043E\u0432 ",
							_react2.default.createElement(
								"strong",
								null,
								"ref"
							),
							" \u0434\u043B\u044F \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0441\u0441\u044B\u043B\u043A\u0438 \u043D\u0430 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 DOM, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0437\u0430\u0442\u0435\u043C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F \u0432 \u0441\u043E\u0431\u044B\u0442\u0438\u0438 ",
							_react2.default.createElement(
								"strong",
								null,
								"componentDidMount"
							),
							" \u0434\u043B\u044F \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u044D\u043A\u0437\u0435\u043C\u043F\u043B\u044F\u0440\u0430 GSAP."
						),
						_react2.default.createElement("hr", null)
					),
					_react2.default.createElement(
						"div",
						{ className: "col-12" },
						_react2.default.createElement(
							"h3",
							{ className: "text-center" },
							"\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043B\u043E\u0433\u043E\u0442\u0438\u043F\u043E\u043C Tween"
						),
						_react2.default.createElement(
							"p",
							null,
							"\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u043A\u043D\u043E\u043F\u043A\u0438 \u0434\u043B\u044F \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F Logo Tween"
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
								"\u0418\u0433\u0440\u0430\u0442\u044C"
							),
							_react2.default.createElement(
								"button",
								{
									className: "btn gsap-btn",
									onClick: function onClick() {
										return _this2.logoTween.pause();
									}
								},
								"\u041F\u0430\u0443\u0437\u0430"
							),
							_react2.default.createElement(
								"button",
								{
									className: "btn gsap-btn",
									onClick: function onClick() {
										return _this2.logoTween.reverse();
									}
								},
								"\u0420\u0435\u0432\u0435\u0440\u0441"
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


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./base.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/base.css");

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
//# sourceMappingURL=app-4565a37037a6dc1fb6f3.js.map