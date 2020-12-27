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
})({"sw.js":[function(require,module,exports) {
var cacheName = "simple-v1";
var staticAssets = ["./", "./index.html", "./images/*", "./stylesheets/main.css", "./dist/index.js"];
self.addEventListener("install", function _callee(e) {
  var cache;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(caches.open(cacheName));

        case 2:
          cache = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(cache.addAll(staticAssets));

        case 5:
          return _context.abrupt("return", self.skipWaiting());

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
});
self.addEventListener("activate", function (e) {
  self.clients.claim();
});
self.addEventListener("fetch", function _callee2(e) {
  var req, url;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          req = e.request;
          url = new URL(req.url);

          if (url.origin === location.origin) {
            e.respondWith(cacheFirst(req));
          } else {
            e.respondWith(networkAndCache(req));
          }

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
});

function cacheFirst(req) {
  var cache, cached;
  return regeneratorRuntime.async(function cacheFirst$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(caches.open(cacheName));

        case 2:
          cache = _context3.sent;
          _context3.next = 5;
          return regeneratorRuntime.awrap(cache.match(req));

        case 5:
          cached = _context3.sent;
          return _context3.abrupt("return", cached || fetch(req));

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function networkAndCache(req) {
  var cache, fresh, cached;
  return regeneratorRuntime.async(function networkAndCache$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(caches.open(cacheName));

        case 2:
          cache = _context4.sent;
          _context4.prev = 3;
          _context4.next = 6;
          return regeneratorRuntime.awrap(fetch(req));

        case 6:
          fresh = _context4.sent;
          _context4.next = 9;
          return regeneratorRuntime.awrap(cache.put(req, fresh.clone()));

        case 9:
          return _context4.abrupt("return", fresh);

        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](3);
          _context4.next = 16;
          return regeneratorRuntime.awrap(cache.match(req));

        case 16:
          cached = _context4.sent;
          return _context4.abrupt("return", cached);

        case 18:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[3, 12]]);
}
},{}]},{},["sw.js"], null)
//# sourceMappingURL=/sw.js.map