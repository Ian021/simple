// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Router.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = void 0;

var Router =
/*#__PURE__*/
function () {
  function Router(pagesSetup) {
    _classCallCheck(this, Router);

    this.pages = pagesSetup.pages;
    this.template = pagesSetup.template;
  }

  _createClass(Router, [{
    key: "goTo",
    value: function goTo(pageName, store) {
      if (!this.templateInstance) {
        this.templateInstance = new this.template(store);
      }

      this.templateInstance.setCurrentPage(this.pages[pageName]);
      this.render();
    }
  }, {
    key: "render",
    value: function render() {
      this.templateInstance._beforeRender();

      this.templateInstance._render();

      this.templateInstance._apiCalls();

      this.templateInstance._afterRender();
    }
  }]);

  return Router;
}();

exports.Router = Router;
},{}],"components/Component.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = void 0;

var Component =
/*#__PURE__*/
function () {
  function Component(store) {
    _classCallCheck(this, Component);

    this._props = [];
    this.props = [];
    this.components = {};
    this.store = store;
    this.getState = store.getState();
    this.redirectTo = store.getRedirect();
    this.setState = store.setState();
    this.getStateUpdateId = store.getStateUpdateId();
    this._components = {};
    if (!this.name) this.name = Math.random();
  }

  _createClass(Component, [{
    key: "beforeRender",
    value: function beforeRender() {}
  }, {
    key: "render",
    value: function render() {
      return "";
    }
  }, {
    key: "apiCalls",
    value: function apiCalls() {}
  }, {
    key: "afterRender",
    value: function afterRender() {}
  }, {
    key: "useComponent",
    value: function useComponent(componentName) {
      return this._components[componentName]._render();
    }
  }, {
    key: "_setComponents",
    value: function _setComponents() {
      var _this = this;

      if (this.components) {
        var temp_components = {};
        Object.keys(this.components).forEach(function (componentName) {
          if (componentName in _this._components) {
            temp_components[componentName] = _this._components[componentName];
          } else {
            temp_components[componentName] = _this._createComponent(componentName);
          }
        });
        this._components = temp_components;
      }
    }
  }, {
    key: "_getComponentsList",
    value: function _getComponentsList() {
      return Object.values(this._components);
    }
  }, {
    key: "_createComponent",
    value: function _createComponent(componentName) {
      return new this.components[componentName](this.store);
    }
  }, {
    key: "_parseProps",
    value: function _parseProps() {
      var _this2 = this;

      this._props = [];
      this.props.forEach(function (prop) {
        _this2._props[prop] = _this2.getState(prop);
      });
    }
  }, {
    key: "getProp",
    value: function getProp(name) {
      return this._props[name];
    }
  }, {
    key: "_setPropsHaveUpdated",
    value: function _setPropsHaveUpdated() {
      this._varPropsHaveUpdated = this._checkIfPropsHaveUpdated();
    }
  }, {
    key: "_checkIfPropsHaveUpdated",
    value: function _checkIfPropsHaveUpdated() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.props[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var prop = _step.value;

          if (this.getProp(prop) !== this.getState(prop)) {
            return true;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return false;
    }
  }, {
    key: "_propsHaveUpdated",
    value: function _propsHaveUpdated() {
      return this._varPropsHaveUpdated;
    }
  }, {
    key: "_wasShowing",
    value: function _wasShowing() {
      if (this.lastUpdateId === this.getStateUpdateId() - 1) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "setLastUpdateId",
    value: function setLastUpdateId() {
      this.lastUpdateId = this.getStateUpdateId();
    }
  }, {
    key: "_beforeRender",
    value: function _beforeRender() {
      this._setPropsHaveUpdated();

      if (!this._wasShowing() || this._propsHaveUpdated()) {
        this.beforeRender();

        this._setComponents();

        this._parseProps();
      }

      this._beforeRenderComponents();
    }
  }, {
    key: "_beforeRenderComponents",
    value: function _beforeRenderComponents() {
      this._getComponentsList().forEach(function (component) {
        component._beforeRender();
      });
    }
  }, {
    key: "_render",
    value: function _render() {
      this._renderComponents();

      if (!this._wasShowing() || this._propsHaveUpdated()) {
        return this._updateHTML();
      }
    }
  }, {
    key: "_updateHTML",
    value: function _updateHTML() {
      var component = document.getElementById("_".concat(this.name));
      var componentHTML = this.render();

      if (component) {
        component.innerHTML = componentHTML;
      }

      return "<div id=\"_".concat(this.name, "\">\n                ").concat(componentHTML, "\n              </div>");
    }
  }, {
    key: "_renderComponents",
    value: function _renderComponents() {
      this._getComponentsList().forEach(function (component) {
        if (component._propsHaveUpdated()) {
          component._render();
        }
      });
    }
  }, {
    key: "_apiCalls",
    value: function _apiCalls() {
      if (!this._wasShowing()) {
        this.apiCalls();
      }

      this._apiCallsComponents();
    }
  }, {
    key: "_apiCallsComponents",
    value: function _apiCallsComponents() {
      this._getComponentsList().forEach(function (component) {
        component._apiCalls();
      });
    }
  }, {
    key: "_afterRender",
    value: function _afterRender() {
      if (!this._wasShowing() || this._propsHaveUpdated()) {
        this.afterRender();
      }

      this._afterRenderComponents();

      this.setLastUpdateId();
    }
  }, {
    key: "_afterRenderComponents",
    value: function _afterRenderComponents() {
      this._getComponentsList().forEach(function (component) {
        component._afterRender();
      });
    }
  }]);

  return Component;
}();

exports.Component = Component;
},{}],"components/Template.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Template = void 0;

var Component_1 = require("../components/Component");

var Template =
/*#__PURE__*/
function (_Component_1$Componen) {
  _inherits(Template, _Component_1$Componen);

  function Template() {
    var _this;

    _classCallCheck(this, Template);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Template).apply(this, arguments));
    _this.name = "app";
    _this.props = ["currentPage"];
    return _this;
  }

  _createClass(Template, [{
    key: "setCurrentPage",
    value: function setCurrentPage(Page) {
      this.Page = Page;
      this.components = {};
      this.components["".concat(this.Page.name)] = this.Page;
    }
  }, {
    key: "render",
    value: function render() {
      return "\n          ".concat(this.useComponent("".concat(this.Page.name)), "\n      ");
    }
  }]);

  return Template;
}(Component_1.Component);

exports.Template = Template;
},{"../components/Component":"components/Component.ts"}],"components/Home.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Home = void 0;

var Component_1 = require("../components/Component");

var Home =
/*#__PURE__*/
function (_Component_1$Componen) {
  _inherits(Home, _Component_1$Componen);

  function Home() {
    var _this;

    _classCallCheck(this, Home);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Home).apply(this, arguments));
    _this.name = "home";
    return _this;
  }

  _createClass(Home, [{
    key: "render",
    value: function render() {
      return "\n            <div class=\"home\">\n                <h1>Hello World!</h1>\n            </div>\n            ";
    }
  }]);

  return Home;
}(Component_1.Component);

exports.Home = Home;
},{"../components/Component":"components/Component.ts"}],"Store.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Store = void 0;

var Store =
/*#__PURE__*/
function () {
  function Store(router) {
    _classCallCheck(this, Store);

    this.router = router;
    this.state = {
      currentPage: ""
    };
    this.stateUpdateId = 1;
  }

  _createClass(Store, [{
    key: "getState",
    value: function getState() {
      var _this = this;

      return function (prop) {
        return _this.state[prop];
      };
    }
  }, {
    key: "getStateUpdateId",
    value: function getStateUpdateId() {
      var _this2 = this;

      return function () {
        return _this2.stateUpdateId;
      };
    }
  }, {
    key: "getRedirect",
    value: function getRedirect() {
      var _this3 = this;

      return function (pageName) {
        _this3.setState()({
          currentPage: pageName
        });
      };
    }
  }, {
    key: "setState",
    value: function setState() {
      var _this4 = this;

      return function (newState) {
        _this4.state = Object.assign(Object.assign({}, _this4.state), newState);
        _this4.stateUpdateId++;

        _this4.router.goTo(_this4.state.currentPage, _this4);
      };
    }
  }]);

  return Store;
}();

exports.Store = Store;
},{}],"index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Router_1 = require("./Router");

var Template_1 = require("./components/Template");

var Home_1 = require("./components/Home");

var Store_1 = require("./Store");

navigator.serviceWorker.register("/sw.js");
var pagesSetup = {
  pages: {
    home: Home_1.Home
  },
  template: Template_1.Template
};
var router = new Router_1.Router(pagesSetup);
var state = {
  currentPage: "home"
};
var store = new Store_1.Store(router);
store.setState()(state);
},{"./Router":"Router.ts","./components/Template":"components/Template.ts","./components/Home":"components/Home.ts","./Store":"Store.ts","./sw.js":[["sw.js","sw.js"],"sw.js.map","sw.js"]}]},{},["index.ts"], null)
//# sourceMappingURL=/index.js.map