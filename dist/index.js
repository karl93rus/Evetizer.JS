(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Eventable": () => (/* reexport */ Eventable)
});

;// CONCATENATED MODULE: ./src/Storage.ts
var Storage = /** @class */ (function () {
    function Storage() {
        this._id = 0;
        this._storage = null;
        this._createStorage();
    }
    Storage.getInstance = function () {
        if (!Storage._Instance) {
            Storage._Instance = new Storage();
        }
        return Storage._Instance;
    };
    Storage.prototype.push = function (obj) {
        if (this._storage) {
            this._id++;
            this._storage.set(Symbol(this._id), obj);
        }
    };
    Storage.prototype.getExistingStorageMap = function () {
        if (!this._storage) {
            throw new Error('No storage. Create Eventable first');
        }
        return this._storage;
    };
    Storage.prototype._createStorage = function () {
        this._storage = new Map();
        Storage._Instance = this;
    };
    return Storage;
}());


;// CONCATENATED MODULE: ./src/Eventable.ts
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};

var Eventable = /** @class */ (function () {
    function Eventable(obj) {
        this._evt = '';
        this._triggerEvt = '';
        this._triggerFn = undefined;
        this._populateStorage();
    }
    Eventable.prototype.dispatchEvent = function (evt, data) {
        var e_1, _a;
        this._evt = evt;
        try {
            for (var _b = __values(Storage.getInstance().getExistingStorageMap().values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var obj = _c.value;
                if (obj._triggerEvt === this._evt) {
                    if (data) {
                        obj.callTriggerFn(data);
                    }
                    else {
                        obj.callTriggerFn();
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    Eventable.prototype.on = function (evt, cb) {
        this._triggerEvt = evt;
        this._triggerFn = cb;
    };
    Eventable.prototype._populateStorage = function () {
        Storage.getInstance().push(this);
    };
    Eventable.prototype.callTriggerFn = function (data) {
        if (this._triggerFn) {
            if (this._triggerFn && data) {
                this._triggerFn(data);
            }
            else if (this._triggerFn && !data) {
                this._triggerFn();
            }
        }
    };
    return Eventable;
}());


;// CONCATENATED MODULE: ./src/index.ts


/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map