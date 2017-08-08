(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.axis3d = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraContext = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _utils = _dereq_('../../utils');

var _core = _dereq_('../../core');

var _defaults2 = _dereq_('../defaults');

var _defaults = _interopRequireWildcard(_defaults2);

var _inverseView = _dereq_('./inverse-view');

var _info = _dereq_('./info');

var _view = _dereq_('./view');

var _eye = _dereq_('./eye');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var CameraContext = exports.CameraContext = function (_Component) {
  _inherits(CameraContext, _Component);

  _createClass(CameraContext, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function CameraContext(ctx, initialState) {
    _classCallCheck(this, CameraContext);

    (0, _utils.assignDefaults)(initialState, CameraContext.defaults());
    return _possibleConstructorReturn(this, (CameraContext.__proto__ || Object.getPrototypeOf(CameraContext)).call(this, ctx, initialState, new _info.CameraInfoContext(ctx, initialState), new _view.CameraViewContext(ctx, initialState), new _inverseView.CameraInverseViewContext(ctx, initialState), new _eye.CameraEyeContext(ctx, initialState)));
  }

  return CameraContext;
}(_core.Component);

},{"../../core":50,"../../utils":116,"../defaults":7,"./eye":2,"./info":4,"./inverse-view":5,"./view":6}],2:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraEyeContext = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _utils = _dereq_('../../utils');

var _scope = _dereq_('../../scope');

var _core = _dereq_('../../core');

var _defaults2 = _dereq_('../defaults');

var _defaults = _interopRequireWildcard(_defaults2);

var _eyeVector = _dereq_('eye-vector');

var _eyeVector2 = _interopRequireDefault(_eyeVector);

var _glMat = _dereq_('gl-mat4');

var _glMat2 = _interopRequireDefault(_glMat);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var kMat4Identity = _glMat2.default.identity([]);

var CameraEyeContext = exports.CameraEyeContext = function (_Component) {
  _inherits(CameraEyeContext, _Component);

  _createClass(CameraEyeContext, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function CameraEyeContext(ctx, initialState) {
    _classCallCheck(this, CameraEyeContext);

    (0, _utils.assignDefaults)(initialState, CameraEyeContext.defaults());
    return _possibleConstructorReturn(this, (CameraEyeContext.__proto__ || Object.getPrototypeOf(CameraEyeContext)).call(this, ctx, initialState, new _scope.ScopedContext(ctx, {
      eye: function eye(_ref, args) {
        var view = _ref.view;

        return (0, _eyeVector2.default)(view || kMat4Identity);
      }
    })));
  }

  return CameraEyeContext;
}(_core.Component);

},{"../../core":50,"../../scope":90,"../../utils":116,"../defaults":7,"eye-vector":127,"gl-mat4":156}],3:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inverseView = _dereq_('./inverse-view');

Object.keys(_inverseView).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _inverseView[key];
    }
  });
});

var _context = _dereq_('./context');

Object.keys(_context).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _context[key];
    }
  });
});

var _view = _dereq_('./view');

Object.keys(_view).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _view[key];
    }
  });
});

var _info = _dereq_('./info');

Object.keys(_info).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _info[key];
    }
  });
});

var _eye = _dereq_('./eye');

Object.keys(_eye).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _eye[key];
    }
  });
});

},{"./context":1,"./eye":2,"./info":4,"./inverse-view":5,"./view":6}],4:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraInfoContext = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _utils = _dereq_('../../utils');

var _scope = _dereq_('../../scope');

var _core = _dereq_('../../core');

var _defaults2 = _dereq_('../defaults');

var _defaults = _interopRequireWildcard(_defaults2);

var _glMat = _dereq_('gl-mat4');

var _glMat2 = _interopRequireDefault(_glMat);

var _glVec = _dereq_('gl-vec3');

var _glVec2 = _interopRequireDefault(_glVec);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var kMat4Identity = _glMat2.default.identity([]);

var CameraInfoContext = exports.CameraInfoContext = function (_Component) {
  _inherits(CameraInfoContext, _Component);

  _createClass(CameraInfoContext, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function CameraInfoContext(ctx, initialState) {
    _classCallCheck(this, CameraInfoContext);

    (0, _utils.assignDefaults)(initialState, CameraInfoContext.defaults());
    return _possibleConstructorReturn(this, (CameraInfoContext.__proto__ || Object.getPrototypeOf(CameraInfoContext)).call(this, ctx, initialState, new _scope.ScopedContext(ctx, {
      transform: function transform() {
        return kMat4Identity;
      },
      matrix: function matrix() {
        return kMat4Identity;
      },
      projection: function projection(ctx, args) {
        return (0, _utils.get)('projection', [args, ctx, initialState]) || kMat4Identity;
      },
      aspect: function aspect(ctx, args) {
        var width = (0, _utils.get)('viewportWidth', [args, ctx]);
        var height = (0, _utils.get)('viewportHeight', [args, ctx]);
        return width / height;
      },
      target: function target(ctx, args) {
        var scale = (0, _utils.get)('scale', [ctx, args, initialState]);
        var target = (0, _utils.get)('target', [args, ctx, initialState]);
        return _glVec2.default.multiply([], target, scale);
      },
      up: function up(ctx, args) {
        return (0, _utils.get)('up', [args, ctx, initialState]);
      },
      viewport: function viewport(ctx, args) {
        var viewport = (0, _utils.get)('viewport', [args, ctx, initialState]);
        var height = (0, _utils.get)('viewportHeight', [args, ctx, initialState]);
        var width = (0, _utils.get)('viewportWidth', [args, ctx, initialState]);
        var left = (0, _utils.get)('viewportLeft', [args, ctx, initialState]);
        var top = (0, _utils.get)('viewportTop', [args, ctx, initialState]);
        return viewport || [left || 0, top || 0, width || 0, height || 0];
      }
    })));
  }

  return CameraInfoContext;
}(_core.Component);

},{"../../core":50,"../../scope":90,"../../utils":116,"../defaults":7,"gl-mat4":156,"gl-vec3":238}],5:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraInverseViewContext = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _utils = _dereq_('../../utils');

var _scope = _dereq_('../../scope');

var _core = _dereq_('../../core');

var _defaults2 = _dereq_('../defaults');

var _defaults = _interopRequireWildcard(_defaults2);

var _glMat = _dereq_('gl-mat4');

var _glMat2 = _interopRequireDefault(_glMat);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var kMat4Identity = _glMat2.default.identity([]);

var CameraInverseViewContext = exports.CameraInverseViewContext = function (_Component) {
  _inherits(CameraInverseViewContext, _Component);

  _createClass(CameraInverseViewContext, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function CameraInverseViewContext(ctx, initialState) {
    _classCallCheck(this, CameraInverseViewContext);

    (0, _utils.assignDefaults)(initialState, CameraInverseViewContext.defaults());
    return _possibleConstructorReturn(this, (CameraInverseViewContext.__proto__ || Object.getPrototypeOf(CameraInverseViewContext)).call(this, ctx, initialState, new _scope.ScopedContext(ctx, {
      invertedView: function invertedView(_ref) {
        var view = _ref.view;

        return view ? _glMat2.default.invert([], view) : kMat4Identity;
      }
    })));
  }

  return CameraInverseViewContext;
}(_core.Component);

},{"../../core":50,"../../scope":90,"../../utils":116,"../defaults":7,"gl-mat4":156}],6:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraViewContext = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _utils = _dereq_('../../utils');

var _scope = _dereq_('../../scope');

var _core = _dereq_('../../core');

var _defaults2 = _dereq_('../defaults');

var _defaults = _interopRequireWildcard(_defaults2);

var _glMat = _dereq_('gl-mat4');

var _glMat2 = _interopRequireDefault(_glMat);

var _glQuat = _dereq_('gl-quat');

var _glQuat2 = _interopRequireDefault(_glQuat);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var scratchQuaternion = _glQuat2.default.identity([]);
var scratchMatrix = _glMat2.default.identity([]);
var kMat4Identity = _glMat2.default.identity([]);

var CameraViewContext = exports.CameraViewContext = function (_Component) {
  _inherits(CameraViewContext, _Component);

  _createClass(CameraViewContext, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function CameraViewContext(ctx, initialState) {
    _classCallCheck(this, CameraViewContext);

    (0, _utils.assignDefaults)(initialState, CameraViewContext.defaults());
    return _possibleConstructorReturn(this, (CameraViewContext.__proto__ || Object.getPrototypeOf(CameraViewContext)).call(this, ctx, initialState, new _scope.ScopedContext(ctx, {
      view: function view(ctx, args) {
        var view = (0, _utils.get)('view', [ctx, args]);
        if (view) {
          return view;
        }
        var matrix = _glMat2.default.identity([]);
        var position = (0, _utils.get)('position', [ctx, args]);
        var rotation = (0, _utils.get)('rotation', [ctx, args]);
        var target = (0, _utils.get)('target', [ctx, args]);
        var scale = (0, _utils.get)('scale', [ctx, args]);
        var up = (0, _utils.get)('up', [ctx, args]);
        if (!position || !rotation || !target || !scale) {
          return kMat4Identity;
        }
        _glQuat2.default.normalize(scratchQuaternion, rotation);
        _glMat2.default.fromQuat(scratchMatrix, scratchQuaternion);
        _glMat2.default.translate(matrix, matrix, position);
        _glMat2.default.lookAt(matrix, target, position, up);
        _glMat2.default.multiply(matrix, matrix, scratchMatrix);
        _glMat2.default.scale(matrix, matrix, scale);
        return matrix;
      }
    })));
  }

  return CameraViewContext;
}(_core.Component);

},{"../../core":50,"../../scope":90,"../../utils":116,"../defaults":7,"gl-mat4":156,"gl-quat":181}],7:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.up = exports.target = exports.direction = exports.uniformName = undefined;

var _defaults = _dereq_('../object3d/defaults');

Object.keys(_defaults).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _defaults[key];
    }
  });
});

var _glMat = _dereq_('gl-mat4');

var uniformName = exports.uniformName = 'camera';
var direction = exports.direction = [0, 0, -1];
var target = exports.target = [0, 0, 0];
var up = exports.up = [0, 1, 0];

},{"../object3d/defaults":86,"gl-mat4":156}],8:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _orthographic = _dereq_('./orthographic');

Object.keys(_orthographic).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _orthographic[key];
    }
  });
});

var _perspective = _dereq_('./perspective');

Object.keys(_perspective).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _perspective[key];
    }
  });
});

var _uniforms = _dereq_('./uniforms');

Object.keys(_uniforms).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _uniforms[key];
    }
  });
});

var _context = _dereq_('./context');

Object.keys(_context).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _context[key];
    }
  });
});

},{"./context":3,"./orthographic":16,"./perspective":24,"./uniforms":26}],9:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lookAt = lookAt;

var _glVec = _dereq_('gl-vec3');

var _glVec2 = _interopRequireDefault(_glVec);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var kEpsilon = 0.000000001;

// adapted from:
// https://github.com/Jam3/perspective-camera/blob/master/lib/camera-look-at.js
function lookAt(direction, target, position, up) {
  var tmp = [];
  _glVec2.default.subtract(tmp, target, position);
  _glVec2.default.normalize(tmp, tmp);
  if (tmp.every(Boolean)) {
    // not zero vector
    var d = _glVec2.default.dot(tmp, up);
    if (Math.abs(d - 1) < kEpsilon) {
      // collinear
      _glVec2.default.scale(up, direction, -1);
    } else if (Math.abs(d + 1) < kEpsilon) {
      // collinear opposite
      _glVec2.default.copy(up, direction);
    }
    _glVec2.default.copy(direction, tmp);
    _glVec2.default.cross(tmp, direction, up);
    _glVec2.default.normalize(tmp, tmp);
    _glVec2.default.cross(up, tmp, direction);
    _glVec2.default.normalize(up, up);
  }
}

},{"gl-vec3":238}],10:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrthographicCameraContext = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _projection = _dereq_('./projection');

var _info = _dereq_('./info');

var _view = _dereq_('./view');

var _utils = _dereq_('../../../utils');

var _core = _dereq_('../../../core');

var _defaults2 = _dereq_('../defaults');

var _defaults = _interopRequireWildcard(_defaults2);

var _context = _dereq_('../../context');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var OrthographicCameraContext = exports.OrthographicCameraContext = function (_Component) {
  _inherits(OrthographicCameraContext, _Component);

  _createClass(OrthographicCameraContext, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function OrthographicCameraContext(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, OrthographicCameraContext);

    (0, _utils.assignDefaults)(initialState, OrthographicCameraContext.defaults());
    return _possibleConstructorReturn(this, (OrthographicCameraContext.__proto__ || Object.getPrototypeOf(OrthographicCameraContext)).call(this, ctx, initialState, new _context.CameraInfoContext(ctx, initialState), new _info.OrthographicCameraInfoContext(ctx, initialState), new _projection.OrthographicCameraProjectionContext(ctx, initialState), new _view.OrthographicCameraViewContext(ctx, initialState), new _context.CameraInverseViewContext(ctx, initialState), new _context.CameraEyeContext(ctx, initialState)));
  }

  return OrthographicCameraContext;
}(_core.Component);

},{"../../../core":50,"../../../utils":116,"../../context":3,"../defaults":15,"./info":12,"./projection":13,"./view":14}],11:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _projection = _dereq_('./projection');

Object.keys(_projection).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _projection[key];
    }
  });
});

var _context = _dereq_('./context');

Object.keys(_context).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _context[key];
    }
  });
});

var _info = _dereq_('./info');

Object.keys(_info).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _info[key];
    }
  });
});

var _view = _dereq_('./view');

Object.keys(_view).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _view[key];
    }
  });
});

},{"./context":10,"./info":12,"./projection":13,"./view":14}],12:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrthographicCameraInfoContext = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _perspective = _dereq_('../../perspective');

var _utils = _dereq_('../../../utils');

var _scope = _dereq_('../../../scope');

var _core = _dereq_('../../../core');

var _defaults2 = _dereq_('../defaults');

var _defaults = _interopRequireWildcard(_defaults2);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var OrthographicCameraInfoContext = exports.OrthographicCameraInfoContext = function (_Component) {
  _inherits(OrthographicCameraInfoContext, _Component);

  _createClass(OrthographicCameraInfoContext, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function OrthographicCameraInfoContext(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, OrthographicCameraInfoContext);

    (0, _utils.assignDefaults)(initialState, OrthographicCameraInfoContext.defaults());
    return _possibleConstructorReturn(this, (OrthographicCameraInfoContext.__proto__ || Object.getPrototypeOf(OrthographicCameraInfoContext)).call(this, ctx, initialState, new _perspective.PerspectiveCameraInfoContext(ctx, initialState)));
  }

  return OrthographicCameraInfoContext;
}(_core.Component);

},{"../../../core":50,"../../../scope":90,"../../../utils":116,"../../perspective":24,"../defaults":15}],13:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrthographicCameraProjectionContext = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _utils = _dereq_('../../../utils');

var _scope = _dereq_('../../../scope');

var _core = _dereq_('../../../core');

var _defaults2 = _dereq_('../defaults');

var _defaults = _interopRequireWildcard(_defaults2);

var _glMat = _dereq_('gl-mat4');

var _glMat2 = _interopRequireDefault(_glMat);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var OrthographicCameraProjectionContext = exports.OrthographicCameraProjectionContext = function (_Component) {
  _inherits(OrthographicCameraProjectionContext, _Component);

  _createClass(OrthographicCameraProjectionContext, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function OrthographicCameraProjectionContext(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, OrthographicCameraProjectionContext);

    (0, _utils.assignDefaults)(initialState, OrthographicCameraProjectionContext.defaults());
    return _possibleConstructorReturn(this, (OrthographicCameraProjectionContext.__proto__ || Object.getPrototypeOf(OrthographicCameraProjectionContext)).call(this, ctx, initialState, new _scope.ScopedContext(ctx, {
      projection: function projection() {
        var projection = _glMat2.default.identity(scratchMatrix);
        var viewport = (0, _utils.get)('viewport', [args, ctx, initialState]);
        var near = (0, _utils.get)('near', [args, ctx, initialState]);
        var far = (0, _utils.get)('far', [args, ctx, initialState]);
        var left = viewport[0];
        var bottom = viewport[1];
        var right = viewport[2];
        var top = viewport[3];
        _glMat2.default.ortho(projection, left, right, bottom, top, near, far);
        return projection;
      }
    })));
  }

  return OrthographicCameraProjectionContext;
}(_core.Component);

},{"../../../core":50,"../../../scope":90,"../../../utils":116,"../defaults":15,"gl-mat4":156}],14:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrthographicCameraViewContext = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _perspective = _dereq_('../../perspective');

var _utils = _dereq_('../../../utils');

var _scope = _dereq_('../../../scope');

var _core = _dereq_('../../../core');

var _defaults2 = _dereq_('../defaults');

var _defaults = _interopRequireWildcard(_defaults2);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var OrthographicCameraViewContext = exports.OrthographicCameraViewContext = function (_Component) {
  _inherits(OrthographicCameraViewContext, _Component);

  _createClass(OrthographicCameraViewContext, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function OrthographicCameraViewContext(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, OrthographicCameraViewContext);

    (0, _utils.assignDefaults)(initialState, OrthographicCameraViewContext.defaults());
    return _possibleConstructorReturn(this, (OrthographicCameraViewContext.__proto__ || Object.getPrototypeOf(OrthographicCameraViewContext)).call(this, ctx, initialState, new _perspective.PerspectiveCameraViewContext(ctx, initialState)));
  }

  return OrthographicCameraViewContext;
}(_core.Component);

},{"../../../core":50,"../../../scope":90,"../../../utils":116,"../../perspective":24,"../defaults":15}],15:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defaults = _dereq_('../defaults');

Object.keys(_defaults).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _defaults[key];
    }
  });
});
var near = exports.near = 100;
var far = exports.far = 1;

},{"../defaults":7}],16:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _orthographic = _dereq_('./orthographic');

Object.keys(_orthographic).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _orthographic[key];
    }
  });
});

var _context = _dereq_('./context');

Object.keys(_context).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _context[key];
    }
  });
});

},{"./context":11,"./orthographic":17}],17:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrthographicCamera = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _context = _dereq_('./context');

var _utils = _dereq_('../../utils');

var _core = _dereq_('../../core');

var _defaults2 = _dereq_('./defaults');

var _defaults = _interopRequireWildcard(_defaults2);

var _object3d = _dereq_('../../object3d');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var OrthographicCamera = exports.OrthographicCamera = function (_Component) {
  _inherits(OrthographicCamera, _Component);

  _createClass(OrthographicCamera, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function OrthographicCamera(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, OrthographicCamera);

    (0, _utils.assignDefaults)(initialState, OrthographicCamera.defaults());
    return _possibleConstructorReturn(this, (OrthographicCamera.__proto__ || Object.getPrototypeOf(OrthographicCamera)).call(this, ctx, initialState, new _object3d.Object3D(ctx, initialState), new _context.OrthographicCameraContext(ctx, initialState)));
  }

  return OrthographicCamera;
}(_core.Component);

},{"../../core":50,"../../object3d":87,"../../utils":116,"./context":11,"./defaults":15}],18:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PerspectiveCameraContext = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _projection = _dereq_('./projection');

var _info = _dereq_('./info');

var _view = _dereq_('./view');

var _utils = _dereq_('../../../utils');

var _core = _dereq_('../../../core');

var _defaults2 = _dereq_('../defaults');

var _defaults = _interopRequireWildcard(_defaults2);

var _context = _dereq_('../../context');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var PerspectiveCameraContext = exports.PerspectiveCameraContext = function (_Component) {
  _inherits(PerspectiveCameraContext, _Component);

  _createClass(PerspectiveCameraContext, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function PerspectiveCameraContext(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, PerspectiveCameraContext);

    (0, _utils.assignDefaults)(initialState, PerspectiveCameraContext.defaults());
    return _possibleConstructorReturn(this, (PerspectiveCameraContext.__proto__ || Object.getPrototypeOf(PerspectiveCameraContext)).call(this, ctx, initialState, new _context.CameraInfoContext(ctx, initialState), new _info.PerspectiveCameraInfoContext(ctx, initialState), new _view.PerspectiveCameraViewContext(ctx, initialState), new _projection.PerspectiveCameraProjectionContext(ctx, initialState), new _context.CameraInverseViewContext(ctx, initialState), new _context.CameraEyeContext(ctx, initialState)));
  }

  return PerspectiveCameraContext;
}(_core.Component);

},{"../../../core":50,"../../../utils":116,"../../context":3,"../defaults":23,"./info":20,"./projection":21,"./view":22}],19:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _projection = _dereq_('./projection');

Object.keys(_projection).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _projection[key];
    }
  });
});

var _context = _dereq_('./context');

Object.keys(_context).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _context[key];
    }
  });
});

var _view = _dereq_('./view');

Object.keys(_view).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _view[key];
    }
  });
});

var _info = _dereq_('./info');

Object.keys(_info).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _info[key];
    }
  });
});

},{"./context":18,"./info":20,"./projection":21,"./view":22}],20:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PerspectiveCameraInfoContext = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _utils = _dereq_('../../../utils');

var _scope = _dereq_('../../../scope');

var _core = _dereq_('../../../core');

var _defaults2 = _dereq_('../defaults');

var _defaults = _interopRequireWildcard(_defaults2);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var PerspectiveCameraInfoContext = exports.PerspectiveCameraInfoContext = function (_Component) {
  _inherits(PerspectiveCameraInfoContext, _Component);

  _createClass(PerspectiveCameraInfoContext, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function PerspectiveCameraInfoContext(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, PerspectiveCameraInfoContext);

    (0, _utils.assignDefaults)(initialState, PerspectiveCameraInfoContext.defaults());
    return _possibleConstructorReturn(this, (PerspectiveCameraInfoContext.__proto__ || Object.getPrototypeOf(PerspectiveCameraInfoContext)).call(this, ctx, initialState, new _scope.ScopedContext(ctx, {
      direction: function direction(ctx, args) {
        return (0, _utils.get)('direction', [args, ctx]);
      },
      near: function near(ctx, args) {
        return (0, _utils.get)('near', [args, ctx]);
      },
      far: function far(ctx, args) {
        return (0, _utils.get)('far', [args, ctx]);
      },
      fov: function fov(ctx, args) {
        return (0, _utils.get)('fov', [args, ctx]);
      },
      up: function up(ctx, args) {
        return (0, _utils.get)('up', [args, ctx]);
      }
    })));
  }

  return PerspectiveCameraInfoContext;
}(_core.Component);

},{"../../../core":50,"../../../scope":90,"../../../utils":116,"../defaults":23}],21:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PerspectiveCameraProjectionContext = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _utils = _dereq_('../../../utils');

var _scope = _dereq_('../../../scope');

var _core = _dereq_('../../../core');

var _defaults2 = _dereq_('../defaults');

var _defaults = _interopRequireWildcard(_defaults2);

var _glMat = _dereq_('gl-mat4');

var _glMat2 = _interopRequireDefault(_glMat);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var PerspectiveCameraProjectionContext = exports.PerspectiveCameraProjectionContext = function (_Component) {
  _inherits(PerspectiveCameraProjectionContext, _Component);

  _createClass(PerspectiveCameraProjectionContext, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function PerspectiveCameraProjectionContext(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, PerspectiveCameraProjectionContext);

    (0, _utils.assignDefaults)(initialState, PerspectiveCameraProjectionContext.defaults());
    return _possibleConstructorReturn(this, (PerspectiveCameraProjectionContext.__proto__ || Object.getPrototypeOf(PerspectiveCameraProjectionContext)).call(this, ctx, initialState, new _scope.ScopedContext(ctx, {
      projection: function projection(ctx, args) {
        var projection = _glMat2.default.identity([]);
        if ('projection' in args && args.projection) {
          _glMat2.default.copy(projection, args.projection);
        } else {
          var aspect = (0, _utils.get)('aspect', [args, ctx]);
          var near = (0, _utils.get)('near', [args, ctx]);
          var far = (0, _utils.get)('far', [args, ctx]);
          var fov = (0, _utils.get)('fov', [args, ctx]);
          _glMat2.default.perspective(projection, fov, aspect, near, far);
        }
        return projection;
      }
    })));
  }

  return PerspectiveCameraProjectionContext;
}(_core.Component);

},{"../../../core":50,"../../../scope":90,"../../../utils":116,"../defaults":23,"gl-mat4":156}],22:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PerspectiveCameraViewContext = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _utils = _dereq_('../../../utils');

var _scope = _dereq_('../../../scope');

var _core = _dereq_('../../../core');

var _defaults2 = _dereq_('../defaults');

var _defaults = _interopRequireWildcard(_defaults2);

var _lookAt = _dereq_('../../look-at');

var _glMat = _dereq_('gl-mat4');

var _glMat2 = _interopRequireDefault(_glMat);

var _glVec = _dereq_('gl-vec3');

var _glVec2 = _interopRequireDefault(_glVec);

var _glQuat = _dereq_('gl-quat');

var _glQuat2 = _interopRequireDefault(_glQuat);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var scratchQuaternion = _glQuat2.default.identity([]);
var scratchMatrix = _glMat2.default.identity([]);
var kMat4Identity = _glMat2.default.identity([]);

var PerspectiveCameraViewContext = exports.PerspectiveCameraViewContext = function (_Component) {
  _inherits(PerspectiveCameraViewContext, _Component);

  _createClass(PerspectiveCameraViewContext, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function PerspectiveCameraViewContext(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, PerspectiveCameraViewContext);

    (0, _utils.assignDefaults)(initialState, PerspectiveCameraViewContext.defaults());
    return _possibleConstructorReturn(this, (PerspectiveCameraViewContext.__proto__ || Object.getPrototypeOf(PerspectiveCameraViewContext)).call(this, ctx, initialState, new _scope.ScopedContext(ctx, {
      view: function view(ctx, args) {
        var view = (0, _utils.get)('view', [ctx, args]);
        if (view) {
          return view;
        }
        var matrix = _glMat2.default.identity([]);
        var center = [0, 0, 0];
        var direction = (0, _utils.get)('direction', [ctx, args]);
        var position = (0, _utils.get)('position', [ctx, args]);
        var rotation = (0, _utils.get)('rotation', [ctx, args]);
        var target = (0, _utils.get)('target', [ctx, args]);
        var scale = (0, _utils.get)('scale', [ctx, args]);
        var up = (0, _utils.get)('up', [ctx, args]);
        if (!position || !rotation || !target || !scale) {
          return kMat4Identity;
        }
        (0, _lookAt.lookAt)(direction, target, position, up);
        _glVec2.default.add(center, position, direction);
        _glQuat2.default.normalize(scratchQuaternion, rotation);
        _glMat2.default.fromQuat(scratchMatrix, scratchQuaternion);
        _glMat2.default.lookAt(matrix, position, center, up);
        _glMat2.default.multiply(matrix, matrix, scratchMatrix);
        _glMat2.default.scale(matrix, matrix, scale);
        return matrix;
      }
    })));
  }

  return PerspectiveCameraViewContext;
}(_core.Component);

},{"../../../core":50,"../../../scope":90,"../../../utils":116,"../../look-at":9,"../defaults":23,"gl-mat4":156,"gl-quat":181,"gl-vec3":238}],23:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defaults = _dereq_('../defaults');

Object.keys(_defaults).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _defaults[key];
    }
  });
});
var near = exports.near = 0.01;
var far = exports.far = 1000;
var fov = exports.fov = 60 * Math.PI / 180;

},{"../defaults":7}],24:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _perspective = _dereq_('./perspective');

Object.keys(_perspective).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _perspective[key];
    }
  });
});

var _context = _dereq_('./context');

Object.keys(_context).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _context[key];
    }
  });
});

},{"./context":19,"./perspective":25}],25:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PerspectiveCamera = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _context = _dereq_('./context');

var _utils = _dereq_('../../utils');

var _defaults2 = _dereq_('./defaults');

var _defaults = _interopRequireWildcard(_defaults2);

var _core = _dereq_('../../core');

var _object3d = _dereq_('../../object3d');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var PerspectiveCamera = exports.PerspectiveCamera = function (_Component) {
  _inherits(PerspectiveCamera, _Component);

  _createClass(PerspectiveCamera, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function PerspectiveCamera(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, PerspectiveCamera);

    (0, _utils.assignDefaults)(initialState, PerspectiveCamera.defaults());
    return _possibleConstructorReturn(this, (PerspectiveCamera.__proto__ || Object.getPrototypeOf(PerspectiveCamera)).call(this, ctx, initialState, new _object3d.Object3D(ctx, initialState), new _context.PerspectiveCameraContext(ctx, initialState)));
  }

  return PerspectiveCamera;
}(_core.Component);

},{"../../core":50,"../../object3d":87,"../../utils":116,"./context":19,"./defaults":23}],26:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraShaderUniforms = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _utils = _dereq_('../utils');

var _shader = _dereq_('../shader');

var _core = _dereq_('../core');

var _defaults2 = _dereq_('./defaults');

var _defaults = _interopRequireWildcard(_defaults2);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var CameraShaderUniforms = exports.CameraShaderUniforms = function (_Component) {
  _inherits(CameraShaderUniforms, _Component);

  _createClass(CameraShaderUniforms, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function CameraShaderUniforms(ctx, initialState) {
    _classCallCheck(this, CameraShaderUniforms);

    (0, _utils.assignDefaults)(initialState, CameraShaderUniforms.defaults());
    var uniformName = initialState.uniformName;
    return _possibleConstructorReturn(this, (CameraShaderUniforms.__proto__ || Object.getPrototypeOf(CameraShaderUniforms)).call(this, ctx, initialState, new _shader.ShaderUniforms(ctx, { prefix: uniformName + '.' }, {
      invertedView: function invertedView(_ref) {
        var _invertedView = _ref.invertedView;
        return _invertedView;
      },
      projection: function projection(_ref2) {
        var _projection = _ref2.projection;
        return _projection;
      },
      aspect: function aspect(_ref3) {
        var _aspect = _ref3.aspect;
        return _aspect;
      },
      view: function view(_ref4) {
        var _view = _ref4.view;
        return _view;
      },
      eye: function eye(_ref5) {
        var _eye = _ref5.eye;
        return [].concat(_toConsumableArray(_eye));
      }
    })));
  }

  return CameraShaderUniforms;
}(_core.Component);

},{"../core":50,"../shader":93,"../utils":116,"./defaults":7}],27:[function(_dereq_,module,exports){
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Compute = undefined;

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _core = _dereq_('./core');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof2(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Compute = exports.Compute = function (_Component) {
  _inherits(Compute, _Component);

  function Compute(ctx, initialState, props) {
    var _ref;

    _classCallCheck(this, Compute);

    for (var _len = arguments.length, children = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      children[_key - 3] = arguments[_key];
    }

    if ('function' == typeof props) {
      children.unshift(props);
    }
    if ('function' == typeof initialState) {
      children.unshift(initialState);
    }
    if ('object' != (typeof initialState === 'undefined' ? 'undefined' : _typeof(initialState))) {
      initialState = {};
    }
    if ('object' != (typeof props === 'undefined' ? 'undefined' : _typeof(props))) {
      props = initialState;
    }
    var getContext = ctx.regl({});
    return _possibleConstructorReturn(this, (_ref = Compute.__proto__ || Object.getPrototypeOf(Compute)).call.apply(_ref, [this, ctx, function (state, block) {
      getContext(initialState.compute);
      getContext(block);
    }].concat(children)));
  }

  return Compute;
}(_core.Component);

},{"./core":50}],28:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * A Command extends the Function class by generating Javascript
 * and passing it directly to the Function (super) constructor.
 */
var commandCount = 0;

var Command = exports.Command = function (_Function) {
  _inherits(Command, _Function);

  _createClass(Command, null, [{
    key: 'count',
    value: function (_count) {
      function count() {
        return _count.apply(this, arguments);
      }

      count.toString = function () {
        return _count.toString();
      };

      return count;
    }(function () {
      return count;
    })
  }, {
    key: 'codegen',
    value: function codegen(fn) {
      if ('function' != typeof fn) {
        throw new TypeError("Expecting a function");
      } else {
        return 'return (' + String(fn) + ').apply(this, arguments);';
      }
    }
  }]);

  function Command(fn) {
    var _ret;

    _classCallCheck(this, Command);

    if ('function' != typeof fn) {
      throw new TypeError("Command constructor expects a function.");
    }
    // initialize underlying function wrap

    var _this = _possibleConstructorReturn(this, (Command.__proto__ || Object.getPrototypeOf(Command)).call(this, Command.codegen(function wrap(fn) {
      return fn.apply(fn, Array.prototype.slice.call(arguments, 1));
    })));

    var exec = function exec() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _this.apply(undefined, [fn].concat(args));
    };
    _this.constructor = exec.constructor = Command;
    void commandCount++;
    return _ret = Object.assign(exec, { 'this': _this }), _possibleConstructorReturn(_this, _ret);
  }

  return Command;
}(Function);

},{}],29:[function(_dereq_,module,exports){
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _command = _dereq_('./command');

var _entity = _dereq_('./entity');

function _objectDestructuringEmpty(obj) {
  if (obj == null) throw new TypeError("Cannot destructure undefined");
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof2(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * A Component is a commandthat composes one or more components and functions
 * into a single function  that is invokable like any command function.
 * An initial or default state can be given which is injected into the block
 * context object each call.
 */
var componentCount = 0;

var Component = exports.Component = function (_Command) {
  _inherits(Component, _Command);

  _createClass(Component, null, [{
    key: 'id',
    value: function id() {
      return ++componentCount;
    }
  }, {
    key: 'defaults',
    value: function defaults() {
      return {};
    }
  }, {
    key: 'compose',
    value: function compose() {
      for (var _len = arguments.length, components = Array(_len), _key = 0; _key < _len; _key++) {
        components[_key] = arguments[_key];
      }

      if (Array.isArray(components[0])) {
        components = components[0];
      }
      components = Array.isArray(components) ? components : [];
      return component;
      function component(state, block) {
        if ('function' == typeof state) {
          block = state;state = {};
        }
        state = 'object' == (typeof state === 'undefined' ? 'undefined' : _typeof(state)) && state ? state : {};
        block = 'function' == typeof block ? block : function () {};
        if (0 == components.length) {
          return block(state);
        } else {
          walk(components.slice());
        }
        function walk(list) {
          var component = list.shift();
          if ('function' == typeof component) {
            if (list.length) {
              component(state, function () {
                return walk(list);
              });
            } else if (block != component) {
              component(state, block);
            }
          } else {
            walk(list);
          }
        }
      }
    }
  }]);

  function Component(ctx) {
    for (var _len2 = arguments.length, children = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      children[_key2 - 2] = arguments[_key2];
    }

    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Component);

    if ('function' == typeof initialState) {
      children.unshift(initialState);
      initialState = {};
    } else if (Array.isArray(initialState)) {
      children = initialState;
      initialState = {};
    }
    children = Component.compose(children);
    var entity = new _entity.Entity(ctx, initialState);
    return _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this, function (state, block) {
      if ('function' == typeof state) {
        block = state;state = {};
      }
      state = 'object' == (typeof state === 'undefined' ? 'undefined' : _typeof(state)) && state ? state : {};
      block = 'function' == typeof block ? block : function () {};
      if (Array.isArray(state)) {
        state = state.map(function (s) {
          return _extends({}, initialState, s);
        });
      } else {
        state = _extends({}, initialState, state);
      }
      entity(state, function (_ref, args) {
        _objectDestructuringEmpty(_ref);

        children(args, block);
      });
    }));
  }

  return Component;
}(_command.Command);

},{"./command":28,"./entity":32}],30:[function(_dereq_,module,exports){
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Context = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _events = _dereq_('events');

var _defined = _dereq_('defined');

var _defined2 = _interopRequireDefault(_defined);

var _document = _dereq_('global/document');

var _document2 = _interopRequireDefault(_document);

var _window = _dereq_('global/window');

var _window2 = _interopRequireDefault(_window);

var _domEvents = _dereq_('dom-events');

var _domEvents2 = _interopRequireDefault(_domEvents);

var _regl = _dereq_('regl');

var _regl2 = _interopRequireDefault(_regl);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof2(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Context = exports.Context = function (_EventEmitter) {
  _inherits(Context, _EventEmitter);

  function Context() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var createRegl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _regl2.default;

    _classCallCheck(this, Context);

    var _this = _possibleConstructorReturn(this, (Context.__proto__ || Object.getPrototypeOf(Context)).call(this));

    _this.setMaxListeners(Infinity);

    _this._store = new Map();
    _this._hasFocus = false;
    _this._reglContext = null;

    // coalesce regl options if given as `.gl`
    opts.regl = (0, _defined2.default)(opts.regl, opts.gl || {});

    // derive container element
    if (opts.canvas && 'object' == _typeof(opts.canvas)) {
      opts.regl.canvas = opts.canvas;
    } else if (opts.element && 'CANVAS' == opts.element.nodeName) {
      opts.regl.canvas = opts.element;
    } else if (opts.element && opts.element.nodeName) {
      opts.regl.container = opts.element;
    } else if ('string' == typeof opts.element) {
      opts.regl.container = opts.element;
    }

    // call regl initializer
    createRegl(_extends({}, opts.regl, {
      attributes: _extends({}, opts.regl.attributes || {}),
      extensions: ['OES_texture_float'].concat(_toConsumableArray(opts.regl.extensions || [])),

      optionalExtensions: ['ANGLE_instanced_arrays'].concat(_toConsumableArray(opts.regl.optionalExtensions || [])),

      onDone: function onDone(err, regl) {
        if (err) {
          return _this.emit('error', err);
        }
        _this._regl = regl;
        _this._isDestroyed = false;
        if (regl._gl && regl._gl.canvas) {
          _this._domElement = _this._regl._gl.canvas;
        } else {
          _this._domElement = null;
        }
      }
    }));

    if (null != _this._domElement && 'undefind' != typeof _window2.default && 'undefind' != typeof _document2.default) {
      var bind = function bind(t, e, f) {
        _domEvents2.default.on(t, e, f);
        _this.once('beforedestroy', function () {
          return _domEvents2.default.off(t, e, f);
        });
      };
      // context focus event handlers
      var onblur = function onblur() {
        _this.blur();
      };
      var onfocus = function onfocus() {
        _this.focus();
      };
      var onwindowblur = function onwindowblur() {
        _this.blur();
      };
      var onmousedown = function onmousedown(e) {
        if (e.target == _this._domElement) {
          _this.focus();
        } else {
          _this.blur();
        }
      };
      bind(_this._domElement, 'blur', onblur);
      bind(_this._domElement, 'focus', onfocus);
      bind(_window2.default, 'blur', onwindowblur);
      bind(_document2.default, 'mousedown', onmousedown);
      bind(_document2.default, 'touchstart', onmousedown);
    }
    return _this;
  }

  _createClass(Context, [{
    key: 'focus',
    value: function focus() {
      this._hasFocus = true;
      this.emit('focus');
      return this;
    }
  }, {
    key: 'blur',
    value: function blur() {
      this._hasFocus = false;
      this.emit('blur');
      return this;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.emit('beforedestroy');
      if (this._regl && 'function' == typeof this._regl.destroy) {
        this._regl.destroy();
      }

      if (this._domElement && this._domElement.parentElement) {
        this._domElement.parentElement.removeChild(this._domElement);
      }

      delete this._regl;
      delete this._store;
      delete this._domElement;
      delete this._reglContext;
      this._hasFocus = false;
      this.emit('destroy');
      return this;
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      if (this._regl) {
        if ('function' == typeof this._regl._refresh) this._regl.refresh();
      }
      return this;
    }
  }, {
    key: 'get',
    value: function get(key) {
      if (this._store) {
        return this._store.get(key);
      }
      return null;
    }
  }, {
    key: 'set',
    value: function set(key, value) {
      if (this._store) {
        this._store.set(key, value);
        return value;
      }
      return null;
    }
  }, {
    key: 'reglContext',
    get: function get() {
      return this._reglContext || null;
    }
  }, {
    key: 'domElement',
    get: function get() {
      return this._domElement || null;
    }
  }, {
    key: 'hasFocus',
    get: function get() {
      return Boolean(this._hasFocus);
    }
  }, {
    key: 'regl',
    get: function get() {
      return this._regl || null;
    }
  }, {
    key: 'gl',
    get: function get() {
      return this._regl._gl || null;
    }
  }]);

  return Context;
}(_events.EventEmitter);

},{"defined":124,"dom-events":125,"events":126,"global/document":271,"global/window":272,"regl":292}],31:[function(_dereq_,module,exports){
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DynamicValueCounter = exports.DynamicValue = undefined;

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _defined = _dereq_('defined');

var _defined2 = _interopRequireDefault(_defined);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var DynamicValue = exports.DynamicValue = function () {
  _createClass(DynamicValue, null, [{
    key: 'createCounter',
    value: function createCounter() {
      return new DynamicValueCounter();
    }
  }, {
    key: 'pluck',
    value: function pluck(scope, property, key) {
      var value = undefined;
      if (scope && null != scope[property]) {
        value = null != key ? scope[property][key] : scope[property];
      }

      for (var _len = arguments.length, defaultValues = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        defaultValues[_key - 3] = arguments[_key];
      }

      return DynamicValue.primitive(_defined2.default.apply(undefined, [value].concat(defaultValues)));
    }
  }, {
    key: 'primitive',
    value: function primitive(v) {
      var value = v;
      if (null == v) {
        value = undefined;
      }
      if ('object' == (typeof v === 'undefined' ? 'undefined' : _typeof(v))) {
        var hasLength = 'number' == typeof v.length;
        var hasIterator = 'function' == typeof v[Symbol.iterator];
        // array
        if (hasLength) {
          if (hasIterator) {
            value = [].concat(_toConsumableArray(v));
          } else {
            value = Array(v.length).fill(0).map(function (_, i) {
              return v[i];
            });
          }
        }
        // object
        else {
            value = Object.assign({}, v);
          }
      }
      return value;
    }
  }]);

  function DynamicValue(ctx) {
    var _this = this;

    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, DynamicValue);

    var define = function define(k, v, def) {
      return Object.defineProperty(_this, k, {
        enumerable: false, get: function get() {
          return v || def;
        }
      });
    };
    define('ctx', ctx, {});
    define('initialState', initialState, {});
    if ('object' == (typeof props === 'undefined' ? 'undefined' : _typeof(props))) {
      this.set(props);
    }
  }

  _createClass(DynamicValue, [{
    key: 'set',
    value: function set(name, value) {
      var _initialState$prefix = this.initialState.prefix,
          prefix = _initialState$prefix === undefined ? '' : _initialState$prefix;

      if (name && 'object' == (typeof name === 'undefined' ? 'undefined' : _typeof(name))) {
        var descriptors = Object.getOwnPropertyDescriptors(name);
        for (var key in descriptors) {
          try {
            Object.defineProperty(this, '' + prefix + key, descriptors[key]);
          } catch (e) {}
        }
      } else if ('string' == typeof name && null != value) {
        this['' + prefix + name] = DynamicValue.primitive(value);
      }
      this.purge();
      return this;
    }
  }, {
    key: 'unset',
    value: function unset(name) {
      var _initialState$prefix2 = this.initialState.prefix,
          prefix = _initialState$prefix2 === undefined ? '' : _initialState$prefix2;

      if ('string' == typeof name) {
        delete this['' + prefix + name];
      }
      return this;
    }
  }, {
    key: 'purge',
    value: function purge() {
      for (var key in this) {
        if (null == this[key]) {
          delete this[key];
        }
      }
      return this;
    }
  }]);

  return DynamicValue;
}();

var DynamicValueCounter = exports.DynamicValueCounter = function () {
  function DynamicValueCounter() {
    _classCallCheck(this, DynamicValueCounter);

    Object.defineProperties(this, {
      contexts: { enumerable: false, value: new Set() },
      map: { enumerable: false, value: new WeakMap() }
    });
  }

  _createClass(DynamicValueCounter, [{
    key: 'setContext',
    value: function setContext(ctx) {
      var set = this.map.get(ctx) || new Set();
      this.map.set(ctx, set);
      if (false == this.contexts.has(ctx)) {
        this.contexts.add(ctx);
      }
      return this;
    }
  }, {
    key: 'getSetForContext',
    value: function getSetForContext(ctx) {
      this.setContext(ctx);
      return this.map.get(ctx);
    }
  }, {
    key: 'addValueForContext',
    value: function addValueForContext(ctx, dynamicValue) {
      var set = this.getSetForContext(ctx);
      if (false == set.has(dynamicValue)) {
        set.add(dynamicValue);
      }
      return this;
    }
  }, {
    key: 'sumSetForContext',
    value: function sumSetForContext(ctx) {
      return this.getSetForContext(ctx).size();
    }
  }, {
    key: 'listSetForContext',
    value: function listSetForContext(ctx) {
      return [].concat(_toConsumableArray(this.getSetForContext(ctx)));
    }
  }, {
    key: 'list',
    value: function list() {
      return [].concat(_toConsumableArray(this.contexts));
    }
  }]);

  return DynamicValueCounter;
}();

},{"defined":124}],32:[function(_dereq_,module,exports){
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Entity = undefined;

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _command = _dereq_('./command');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof2(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * An Entity is a command that injects a context with a unique ID. State
 * is not preserved, but rather just provided. The current and previous states
 * are captured and provided to the scope block function given to the intance
 * entity function. The previous state is exposed as a property on the curren
 * state object. Basically, this class just constructs a command function
 * that accepts some input, injects a regl context, and passes it to an optional
 * block function. The context just defines an `entityID` property. Most
 * classes inherit from Component, which inherits Entity.
 */
var entityCount = 0;

var Entity = exports.Entity = function (_Command) {
  _inherits(Entity, _Command);

  _createClass(Entity, null, [{
    key: 'id',
    value: function id() {
      return ++entityCount;
    }
  }]);

  function Entity(ctx) {
    _classCallCheck(this, Entity);

    var id = Entity.id();
    var injectContext = ctx.regl({ context: { entityID: function entityID() {
          return id;
        } } });
    return _possibleConstructorReturn(this, (Entity.__proto__ || Object.getPrototypeOf(Entity)).call(this, function (state, block) {
      if ('function' == typeof state) {
        block = state;state = {};
      }
      state = 'object' == (typeof state === 'undefined' ? 'undefined' : _typeof(state)) && state ? state : {};
      block = 'function' == typeof block ? block : function () {};
      injectContext(state, block);
    }));
  }

  return Entity;
}(_command.Command);

},{"./command":28}],33:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Geometry = undefined;

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _boundPoints = _dereq_('bound-points');

var _boundPoints2 = _interopRequireDefault(_boundPoints);

var _defined = _dereq_('defined');

var _defined2 = _interopRequireDefault(_defined);

var _meshReindex = _dereq_('mesh-reindex');

var _meshReindex2 = _interopRequireDefault(_meshReindex);

var _unindexMesh = _dereq_('unindex-mesh');

var _unindexMesh2 = _interopRequireDefault(_unindexMesh);

var _normals = _dereq_('normals');

var _normals2 = _interopRequireDefault(_normals);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Geometry = exports.Geometry = function () {
  function Geometry() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Geometry);

    var complex = {};
    var flatten = (0, _defined2.default)(opts.flatten, false);
    if (opts.positions) {
      complex = opts;
    } else {
      complex = opts.complex;
    }
    Object.defineProperty(this, '_complex', { enumerable: false, value: {} });
    this.flatten = Boolean(flatten);
    this.complex = complex || null;
  }

  _createClass(Geometry, [{
    key: 'computeBoundingBox',
    value: function computeBoundingBox() {
      return (0, _boundPoints2.default)(this.positions);
    }
  }, {
    key: 'complex',
    set: function set(complex) {
      if (complex instanceof Geometry) {
        complex = complex.complex;
      }
      if (complex) {
        if (this.flatten && complex.cells) {
          var cells = complex.cells.map(function (cell) {
            return cell.slice();
          });
          var flattened = (0, _meshReindex2.default)((0, _unindexMesh2.default)(complex.positions, cells));
          try {
            complex.normals = _normals2.default.vertexNormals(flattened.cells, flattened.positions);
          } catch (e) {
            console.warn("Unable to compute vertex normals.");
          }
          Object.assign(complex, flattened);
        }

        if (null == complex.normals && complex.positions && complex.cells) {
          try {
            complex.normals = _normals2.default.vertexNormals(complex.cells, complex.positions);
          } catch (e) {
            console.warn("Unable to compute vertex normals.");
          }
        }
      }

      Object.assign(this._complex, complex);
      return complex;
    },
    get: function get() {
      return this._complex || null;
    }
  }, {
    key: 'positions',
    get: function get() {
      return this.complex ? this.complex.positions : null;
    }
  }, {
    key: 'normals',
    get: function get() {
      return this.complex ? this.complex.normals : null;
    }
  }, {
    key: 'uvs',
    get: function get() {
      return this.complex ? this.complex.uvs : null;
    }
  }, {
    key: 'cells',
    get: function get() {
      return this.complex ? this.complex.cells : null;
    }
  }]);

  return Geometry;
}();

},{"bound-points":119,"defined":124,"mesh-reindex":285,"normals":287,"unindex-mesh":296}],34:[function(_dereq_,module,exports){
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebGLShaderInstancedAttributes = exports.WebGLShaderAttributes = undefined;

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _dynamic = _dereq_('../dynamic');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof2(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var shaderAttributesCounter = _dynamic.DynamicValue.createCounter();

var WebGLShaderAttributes = exports.WebGLShaderAttributes = function (_DynamicValue) {
  _inherits(WebGLShaderAttributes, _DynamicValue);

  _createClass(WebGLShaderAttributes, null, [{
    key: 'counter',
    value: function counter() {
      return shaderAttributesCounter;
    }
  }, {
    key: 'getTotalUniformCount',
    value: function getTotalUniformCount() {
      var counter = WebGLShaderAttributes.counter();
      var list = counter.list();
      var sum = list.map(function (ctx) {
        return WebGLShaderAttributes.getContextUniformCount(ctx);
      }).reduce(function (a, b) {
        return a + b;
      }, 0);
      return sum;
    }
  }, {
    key: 'getContextUniformCount',
    value: function getContextUniformCount(ctx) {
      var counter = WebGLShaderAttributes.counter();
      var list = counter.listSetForContext(ctx);
      var attributes = list.reduce(function (a, b) {
        return Object.assign(a, b);
      }, {});
      var sum = Object.keys(attributes).length;
      return sum;
    }
  }]);

  function WebGLShaderAttributes(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var props = arguments[2];

    _classCallCheck(this, WebGLShaderAttributes);

    if (null == props) {
      props = initialState;
      initialState = {};
    } else if (null == initialState && null == props) {
      initialState = {};
      props = {};
    }

    var _this = _possibleConstructorReturn(this, (WebGLShaderAttributes.__proto__ || Object.getPrototypeOf(WebGLShaderAttributes)).call(this, ctx, initialState, props));

    shaderAttributesCounter.addValueForContext(ctx, _this);
    return _this;
  }

  return WebGLShaderAttributes;
}(_dynamic.DynamicValue);

var WebGLShaderInstancedAttributes = exports.WebGLShaderInstancedAttributes = function (_WebGLShaderAttribute) {
  _inherits(WebGLShaderInstancedAttributes, _WebGLShaderAttribute);

  function WebGLShaderInstancedAttributes(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var props = arguments[2];

    _classCallCheck(this, WebGLShaderInstancedAttributes);

    if (null == props && 'object' == (typeof initialState === 'undefined' ? 'undefined' : _typeof(initialState))) {
      props = initialState;
      initialState = {};
    } else if (null == initialState && null == props) {
      initialState = {};
      props = {};
    }
    for (var prop in props) {
      if (props[prop] && 'object' == _typeof(props[prop])) {
        if ('object' == _typeof(props[prop].buffer)) {
          if ('number' != typeof props[prop].divisor) {
            props[prop].divisor = 1;
          }
        } else {
          props[prop] = {
            buffer: props[prop],
            divisor: 1
          };
        }
      }
    }
    return _possibleConstructorReturn(this, (WebGLShaderInstancedAttributes.__proto__ || Object.getPrototypeOf(WebGLShaderInstancedAttributes)).call(this, ctx, initialState, props));
  }

  return WebGLShaderInstancedAttributes;
}(WebGLShaderAttributes);

},{"../dynamic":31}],35:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _attributes = _dereq_('./attributes');

Object.keys(_attributes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _attributes[key];
    }
  });
});

var _uniforms = _dereq_('./uniforms');

Object.keys(_uniforms).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _uniforms[key];
    }
  });
});

},{"./attributes":34,"./uniforms":36}],36:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebGLShaderUniforms = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _dynamic = _dereq_('../dynamic');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var shaderUniformsCounter = _dynamic.DynamicValue.createCounter();

var WebGLShaderUniforms = exports.WebGLShaderUniforms = function (_DynamicValue) {
  _inherits(WebGLShaderUniforms, _DynamicValue);

  _createClass(WebGLShaderUniforms, null, [{
    key: 'counter',
    value: function counter() {
      return shaderUniformsCounter;
    }
  }, {
    key: 'getTotalUniformCount',
    value: function getTotalUniformCount() {
      var counter = WebGLShaderUniforms.counter();
      var list = counter.list();
      var sum = list.map(function (ctx) {
        return WebGLShaderUniforms.getContextUniformCount(ctx);
      }).reduce(function (a, b) {
        return a + b;
      }, 0);
      return sum;
    }
  }, {
    key: 'getContextUniformCount',
    value: function getContextUniformCount(ctx) {
      var counter = WebGLShaderUniforms.counter();
      var list = counter.listSetForContext(ctx);
      var uniforms = list.reduce(function (a, b) {
        return Object.assign(a, b);
      }, {});
      var sum = Object.keys(uniforms).length;
      return sum;
    }
  }]);

  function WebGLShaderUniforms(ctx, initialState, props) {
    _classCallCheck(this, WebGLShaderUniforms);

    var _this = _possibleConstructorReturn(this, (WebGLShaderUniforms.__proto__ || Object.getPrototypeOf(WebGLShaderUniforms)).call(this, ctx, _extends({}, initialState), _extends({}, props)));

    shaderUniformsCounter.addValueForContext(ctx, _this);
    return _this;
  }

  return WebGLShaderUniforms;
}(_dynamic.DynamicValue);

},{"../dynamic":31}],37:[function(_dereq_,module,exports){
(function (__dirname){
'use strict';

var _Object$assign;

var _glslify = _dereq_('glslify');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

Object.assign(exports, (_Object$assign = {}, _defineProperty(_Object$assign, __dirname + '/variables', '#define GLSLIFY 1\n#ifndef GLSL_CAMERA_VARIABLES\n#define GLSL_CAMERA_VARIABLES\n\n#ifndef GLSL_CAMERA_UNIFORM_VARIABLE\n#define GLSL_CAMERA_UNIFORM_VARIABLE camera\n#endif\n\n#endif\n'), _defineProperty(_Object$assign, __dirname + '/uniforms', '#define GLSLIFY 1\n#ifndef GLSL_CAMERA_UNIFORMS\n#define GLSL_CAMERA_UNIFORMS\n\n#include "./variables"\n\n#ifdef GLSL_CAMERA\nuniform Camera GLSL_CAMERA_UNIFORM_VARIABLE;\n#endif\n\n#endif\n'), _defineProperty(_Object$assign, __dirname + '/camera', '#define GLSLIFY 1\n#ifndef GLSL_CAMERA\n#define GLSL_CAMERA\n\nstruct Camera {\n  mat4 projection;\n  mat4 view;\n  vec3 eye;\n};\n\n#endif\n'), _Object$assign));

}).call(this,"/lib/core/glsl/camera")
},{"glslify":284}],38:[function(_dereq_,module,exports){
(function (__dirname){
'use strict';

var _glslify = _dereq_('glslify');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

Object.assign(exports, _defineProperty({}, __dirname + '/common', '#define GLSLIFY 1\n#ifndef GLSL_COMMON\n#define GLSL_COMMON 1\n\n#ifndef M_PI\n#define M_PI 3.141592653589793\n#endif\n\n#ifndef M_E\n#define M_E 2.718281828459045\n#endif\n\n#endif\n'));

}).call(this,"/lib/core/glsl/common")
},{"glslify":284}],39:[function(_dereq_,module,exports){
(function (__dirname){
'use strict';

var _glslify = _dereq_('glslify');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

Object.assign(exports, _defineProperty({}, __dirname + '/main', '#define GLSLIFY 1\n#ifndef GLSL_FRAGMENT_MAIN\n#define GLSL_FRAGMENT_MAIN\n\n#include "../varying/data"\n#include "../varying/read"\n\nvoid InitVarying(inout VaryingData varyingData);\nvoid BeforeMain(inout vec4 fragColor, inout VaryingData varyingData);\nvoid Main(inout vec4 fragColor, inout VaryingData data);\nvoid TransformMain(inout vec4 fragColor, inout VaryingData varyingData);\nvoid AfterMain(inout vec4 fragColor, inout VaryingData varyingData);\n\nvoid main() {\n  VaryingData varyingData = ReadVaryingData();\n  InitVarying(varyingData);\n  BeforeMain(gl_FragColor, varyingData);\n  Main(gl_FragColor, varyingData);\n  TransformMain(gl_FragColor, varyingData);\n  AfterMain(gl_FragColor, varyingData);\n}\n\n#ifdef GLSL_FRAGMENT_MAIN_BEFORE\n  void GLSL_FRAGMENT_MAIN_BEFORE(inout vec4 fragColor,\n                                 inout VaryingData varyingData);\n#endif\n\n#ifdef GLSL_FRAGMENT_MAIN_TRANSFORM\n  void GLSL_FRAGMENT_MAIN_TRANSFORM(inout vec4 fragColor,\n                                    inout VaryingData varyingData);\n#endif\n\n#ifdef GLSL_FRAGMENT_MAIN_AFTER\n  void GLSL_FRAGMENT_MAIN_AFTER(inout vec4 fragColor,\n                                inout VaryingData varyingData);\n#endif\n\nvoid BeforeMain(inout vec4 fragColor,\n                inout VaryingData varyingData) {\n#ifdef GLSL_FRAGMENT_MAIN_BEFORE\n  GLSL_FRAGMENT_MAIN_BEFORE(fragColor, varyingData);\n#endif\n}\n\nvoid TransformMain(inout vec4 fragColor,\n                   inout VaryingData varyingData) {\n#ifdef GLSL_FRAGMENT_MAIN_TRANSFORM\n  GLSL_FRAGMENT_MAIN_TRANSFORM(fragColor, varyingData);\n#endif\n}\n\nvoid AfterMain(inout vec4 fragColor,\n               inout VaryingData varyingData) {\n#ifdef GLSL_FRAGMENT_MAIN_AFTER\n  GLSL_FRAGMENT_MAIN_AFTER(fragColor, varyingData);\n#endif\n}\n\nvoid InitVarying(inout VaryingData varyingData) {\n  varyingData = ReadVaryingData();\n}\n\n#endif\n'));

}).call(this,"/lib/core/glsl/fragment")
},{"glslify":284}],40:[function(_dereq_,module,exports){
(function (__dirname){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.time = exports.mesh = exports.common = exports.camera = exports.vertex = exports.varying = exports.texture = exports.fragment = exports.material = undefined;

var _material2 = _dereq_('./material');

var _material = _interopRequireWildcard(_material2);

var _fragment2 = _dereq_('./fragment');

var _fragment = _interopRequireWildcard(_fragment2);

var _texture2 = _dereq_('./texture');

var _texture = _interopRequireWildcard(_texture2);

var _varying2 = _dereq_('./varying');

var _varying = _interopRequireWildcard(_varying2);

var _vertex2 = _dereq_('./vertex');

var _vertex = _interopRequireWildcard(_vertex2);

var _camera2 = _dereq_('./camera');

var _camera = _interopRequireWildcard(_camera2);

var _common2 = _dereq_('./common');

var _common = _interopRequireWildcard(_common2);

var _mesh2 = _dereq_('./mesh');

var _mesh = _interopRequireWildcard(_mesh2);

var _time2 = _dereq_('./time');

var _time = _interopRequireWildcard(_time2);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

exports.material = _material;
exports.fragment = _fragment;
exports.texture = _texture;
exports.varying = _varying;
exports.vertex = _vertex;
exports.camera = _camera;
exports.common = _common;
exports.mesh = _mesh;
exports.time = _time;

for (var lib in exports) {
  for (var path in exports[lib]) {
    var newPath = path.replace(__dirname + '/' + lib, '');
    exports[lib][newPath] = exports[lib][path];
    delete exports[lib][path];
  }
}

}).call(this,"/lib/core/glsl")
},{"./camera":37,"./common":38,"./fragment":39,"./material":41,"./mesh":42,"./texture":43,"./time":44,"./varying":46,"./vertex":49}],41:[function(_dereq_,module,exports){
(function (__dirname){
'use strict';

var _Object$assign;

var _glslify = _dereq_('glslify');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

Object.assign(exports, (_Object$assign = {}, _defineProperty(_Object$assign, __dirname + '/fragment/main', '#define GLSLIFY 1\n#ifndef GLSL_MATERIAL_FRAGMENT_MAIN\n#define GLSL_MATERIAL_FRAGMENT_MAIN\n\n#include "../material"\n#include "../uniforms"\n#include "../variables"\n\n#include "../../mesh/fragment"\n#include "../../fragment/main"\n#include "../../varying/read"\n\nvoid Main(inout vec4 fragColor, inout VaryingData data) {\n  fragColor = MeshFragment(\n      GLSL_MATERIAL_UNIFORM_VARIABLE.color,\n      GLSL_MATERIAL_UNIFORM_VARIABLE.opacity);\n}\n\n#endif\n'), _defineProperty(_Object$assign, __dirname + '/variables', '#define GLSLIFY 1\n#ifndef GLSL_MATERIAL_VARIABLES\n#define GLSL_MATERIAL_VARIABLES\n\n#ifndef GLSL_MATERIAL_UNIFORM_VARIABLE\n#define GLSL_MATERIAL_UNIFORM_VARIABLE material\n#endif\n\n#endif\n'), _defineProperty(_Object$assign, __dirname + '/material', '#define GLSLIFY 1\n#ifndef GLSL_MATERIAL\n#define GLSL_MATERIAL\n\nstruct Material {\n  vec3 color;\n  float opacity;\n};\n\n#endif\n'), _defineProperty(_Object$assign, __dirname + '/uniforms', '#define GLSLIFY 1\n#ifndef GLSL_MATERIAL_UNIFORMS\n#define GLSL_MATERIAL_UNIFORMS\n\n#include "./variables"\n#include "./material"\n\nuniform Material GLSL_MATERIAL_UNIFORM_VARIABLE;\n\n#endif\n'), _Object$assign));

}).call(this,"/lib/core/glsl/material")
},{"glslify":284}],42:[function(_dereq_,module,exports){
(function (__dirname){
'use strict';

var _Object$assign;

var _glslify = _dereq_('glslify');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

Object.assign(exports, (_Object$assign = {}, _defineProperty(_Object$assign, __dirname + '/vertex/main', '#define GLSLIFY 1\n#ifndef GLSL_MESH_VERTEX_MAIN\n#define GLSL_MESH_VERTEX_MAIN\n\n#include "../variables"\n#include "../uniforms"\n#include "../vertex"\n#include "../mesh"\n\n#include "../../camera/camera"\n#include "../../camera/uniforms"\n\n#ifdef GLSL_MESH_HAS_POSITION\n#include "../../vertex/attributes/position"\n#include "../../varying/position"\n#endif\n\n#ifdef GLSL_MESH_HAS_NORMAL\n#include "../../vertex/attributes/normal"\n#include "../../varying/normal"\n#endif\n\n#ifdef GLSL_MESH_HAS_UV\n#include "../../vertex/attributes/uv"\n#include "../../varying/uv"\n#endif\n\n#include "../../varying/emit"\n#include "../../vertex/main"\n\nvoid Main(inout vec4 vertexPosition, inout VaryingData data) {\n  vertexPosition = MeshVertex(\n      GLSL_CAMERA_UNIFORM_VARIABLE.projection,\n      GLSL_CAMERA_UNIFORM_VARIABLE.view,\n      GLSL_MESH_UNIFORM_VARIABLE.model,\n      GLSL_VERTEX_ATTRIBUTES_POSITION_VARIABLE);\n}\n\n#endif\n'), _defineProperty(_Object$assign, __dirname + '/variables', '#define GLSLIFY 1\n#ifndef GLSL_MESH_VARIABLES\n#define GLSL_MESH_VARIABLES\n\n#ifndef GLSL_MESH_UNIFORM_VARIABLE\n#define GLSL_MESH_UNIFORM_VARIABLE mesh\n#endif\n\n#endif\n'), _defineProperty(_Object$assign, __dirname + '/uniforms', '#define GLSLIFY 1\n#ifndef GLSL_MESH_UNIFORMS\n#define GLSL_MESH_UNIFORMS\n\n#include "./variables"\n#include "./mesh"\n\nuniform Mesh GLSL_MESH_UNIFORM_VARIABLE;\n\n#endif\n'), _defineProperty(_Object$assign, __dirname + '/fragment', '#define GLSLIFY 1\n#ifndef GLSL_MESH_FRAGMENT\n#define GLSL_MESH_FRAGMENT\n\n#ifndef GLSL_MESH_FRAGMENT_DEFAULT_COLOR\n#define GLSL_MESH_FRAGMENT_DEFAULT_COLOR vec4(0.25882352941176473, 0.5254901960784314, 0.9568627450980393, 1.0)\n#endif\n\nvec4 MeshFragment(void) {\n  return vec4(GLSL_MESH_FRAGMENT_DEFAULT_COLOR);\n}\n\nvec4 MeshFragment(vec4 color) {\n  return color;\n}\n\nvec4 MeshFragment(float r, float g, float b, float a) {\n  return MeshFragment(vec4(r, g, b, a));\n}\n\nvec4 MeshFragment(float r, float g, float b) {\n  return MeshFragment(r, g, b, 1.0);\n}\n\nvec4 MeshFragment(float c) {\n  return MeshFragment(c, c, c, 1.0);\n}\n\nvec4 MeshFragment(vec3 color, float opacity) {\n  return MeshFragment(vec4(color, opacity));\n}\n\nvec4 MeshFragment(vec3 color) {\n  return MeshFragment(color, 1.0);\n}\n\n#endif\n'), _defineProperty(_Object$assign, __dirname + '/vertex', '#define GLSLIFY 1\n#ifndef GLSL_MESH_VERTEX\n#define GLSL_MESH_VERTEX\n\n#ifndef GLSL_MESH_VERTEX_DEFAULT_POSITION\n#define GLSL_MESH_VERTEX_DEFAULT_POSITION vec4(0.0, 0.0, 0.0, 1.0)\n#endif\n\nvec4 MeshVertex(void) {\n  return vec4(GLSL_MESH_VERTEX_DEFAULT_POSITION);\n}\n\nvec4 MeshVertex(vec4 position) {\n  return position;\n}\n\nvec4 MeshVertex(mat4 transform, vec4 position) {\n  return MeshVertex(transform * position);\n}\n\nvec4 MeshVertex(mat4 transform, vec3 position) {\n  return MeshVertex(transform, vec4(position, 1.0));\n}\n\nvec4 MeshVertex(mat4 transform, mat4 model, vec4 position) {\n  return MeshVertex(transform * model * position);\n}\n\nvec4 MeshVertex(mat4 transform, mat4 model, vec3 position) {\n  return MeshVertex(transform, model, vec4(position, 1.0));\n}\n\nvec4 MeshVertex(mat4 projection, mat4 view, mat4 model, vec4 position) {\n  return MeshVertex(projection * view * model, position);\n}\n\nvec4 MeshVertex(mat4 projection, mat4 view, mat4 model, vec3 position) {\n  return MeshVertex(projection, view, model, vec4(position, 1.0));\n}\n\n#endif\n'), _defineProperty(_Object$assign, __dirname + '/mesh', '#define GLSLIFY 1\n#ifndef GLSL_MESH\n#define GLSL_MESH\n\nstruct Mesh {\n  vec4 rotation;\n  vec3 scale;\n  vec3 position;\n  mat4 model;\n  mat3 modelNormal;\n};\n\n#endif\n'), _Object$assign));

}).call(this,"/lib/core/glsl/mesh")
},{"glslify":284}],43:[function(_dereq_,module,exports){
(function (__dirname){
'use strict';

var _Object$assign;

var _glslify = _dereq_('glslify');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

Object.assign(exports, (_Object$assign = {}, _defineProperty(_Object$assign, __dirname + '/variables', '#define GLSLIFY 1\n#ifndef GLSL_TEXTURE_VARIABLES\n#define GLSL_TEXTURE_VARIABLES\n\n#ifndef GLSL_TEXTURE_2D_VARIABLE\n#define GLSL_TEXTURE_2D_VARIABLE tex2d\n#endif\n\n#ifndef GLSL_TEXTURE_CUBE_VARIABLE\n#define GLSL_TEXTURE_CUBE_VARIABLE texCube\n#endif\n\n#endif\n'), _defineProperty(_Object$assign, __dirname + '/uniforms', '#define GLSLIFY 1\n#ifndef GLSL_TEXTURE_UNIFORMS\n#define GLSL_TEXTURE_UNIFORMS\n\n#include "./variables"\n\n#ifdef GLSL_TEXTURE_2D\nuniform Texture2D GLSL_TEXTURE_2D_VARIABLE;\n#endif\n\n#ifdef GLSL_TEXTURE_CUBE\nuniform TextureCube GLSL_TEXTURE_CUBE_VARIABLE;\n#endif\n\n#endif\n'), _defineProperty(_Object$assign, __dirname + '/cube', '#define GLSLIFY 1\n#ifndef GLSL_TEXTURE_CUBE\n#define GLSL_TEXTURE_CUBE\n\nstruct TextureCube {\n  vec2 resolution;\n  samplerCube data;\n};\n\n#endif\n'), _defineProperty(_Object$assign, __dirname + '/2d', '#define GLSLIFY 1\n#ifndef GLSL_TEXTURE_2D\n#define GLSL_TEXTURE_2D\n\nstruct Texture2D {\n  vec2 resolution;\n  sampler2D data;\n};\n\n#endif\n'), _Object$assign));

}).call(this,"/lib/core/glsl/texture")
},{"glslify":284}],44:[function(_dereq_,module,exports){
(function (__dirname){
'use strict';

var _Object$assign;

var _glslify = _dereq_('glslify');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

Object.assign(exports, (_Object$assign = {}, _defineProperty(_Object$assign, __dirname + '/variables', '#define GLSLIFY 1\n#ifndef GLSL_TIME_VARIABLES\n#define GLSL_TIME_VARIABLES\n\n#ifndef GLSL_TIME_UNIFORM_VARIABLE\n#define GLSL_TIME_UNIFORM_VARIABLE time\n#endif\n\n#endif\n'), _defineProperty(_Object$assign, __dirname + '/time', '#define GLSLIFY 1\n#ifndef GLSL_TIME\n#define GLSL_TIME\n\n#include "./variables"\n\nuniform float GLSL_TIME_UNIFORM_VARIABLE;\n\nfloat GetTime() {\n  return GLSL_TIME_UNIFORM_VARIABLE;\n}\n\n#endif\n'), _Object$assign));

}).call(this,"/lib/core/glsl/time")
},{"glslify":284}],45:[function(_dereq_,module,exports){
(function (__dirname){
'use strict';

var _Object$assign;

var _glslify = _dereq_('glslify');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

Object.assign(exports, (_Object$assign = {}, _defineProperty(_Object$assign, __dirname + '/position', '#define GLSLIFY 1\n#ifndef GLSL_VARYING_EMIT_POSITION\n#define GLSL_VARYING_EMIT_POSITION\n#ifdef GLSL_VARYING_POSITION\n\n#include "../variables"\n\nvoid EmitVaryingLocalPosition(vec3 position) {\n  GLSL_VARYING_LOCAL_POSITION_VARIABLE = position;\n}\n\nvoid EmitVaryingPosition(mat4 model, vec3 position) {\n  vec4 worldPosition = model * vec4(position, 1.0);\n  GLSL_VARYING_POSITION_VARIABLE = worldPosition.xyz;\n}\n\nvoid EmitVaryingPositions(mat4 model, vec3 position) {\n  EmitVaryingPosition(model, position);\n  EmitVaryingLocalPosition(position);\n}\n\n#endif\n#endif\n'), _defineProperty(_Object$assign, __dirname + '/normal', '#define GLSLIFY 1\n#ifndef GLSL_VARYING_EMIT_NORMAL\n#define GLSL_VARYING_EMIT_NORMAL\n#ifdef GLSL_VARYING_NORMAL\n\n#include "../variables"\n\nvoid EmitVaryingLocalNormal(vec3 normal) {\n  GLSL_VARYING_LOCAL_NORMAL_VARIABLE = normalize(normal);\n}\n\nvoid EmitVaryingNormal(mat3 modelNormal, vec3 normal) {\n  GLSL_VARYING_NORMAL_VARIABLE = normalize(modelNormal * normal);\n}\n\nvoid EmitVaryingNormals(mat3 modelNormal, vec3 normal) {\n  EmitVaryingNormal(modelNormal, normal);\n  EmitVaryingLocalNormal(normal);\n}\n\n#endif\n#endif\n'), _defineProperty(_Object$assign, __dirname + '/color', '#define GLSLIFY 1\n#ifndef GLSL_VARYING_EMIT_COLOR\n#define GLSL_VARYING_EMIT_COLOR\n#ifdef GLSL_VARYING_COLOR\n\n#include "../variables"\n\nvoid EmitVaryingColor(vec4 color) {\n  GLSL_VARYING_COLOR_VARIABLE = color;\n}\n\nvoid EmitVaryingColor(vec3 color) {\n  EmitVaryingColor(vec4(color, 1.0));\n}\n\nvoid EmitVaryingColors(vec4 color) {\n  EmitVaryingColor(color);\n}\n\nvoid EmitVaryingColors(vec3 color) {\n  EmitVaryingColors(vec4(color, 1.0));\n}\n\n#endif\n#endif\n'), _defineProperty(_Object$assign, __dirname + '/uv', '#define GLSLIFY 1\n#ifndef GLSL_VARYING_EMIT_UV\n#define GLSL_VARYING_EMIT_UV\n#ifdef GLSL_VARYING_UV\n\n#include "../variables"\n\nvoid EmitVaryingUv(vec2 uv) {\n  GLSL_VARYING_UV_VARIABLE = uv;\n}\n\nvoid EmitVaryingUvs(vec2 uv) {\n  EmitVaryingUv(uv);\n}\n\n#endif\n#endif\n'), _Object$assign));

}).call(this,"/lib/core/glsl/varying/emit")
},{"glslify":284}],46:[function(_dereq_,module,exports){
(function (__dirname){
'use strict';

var _extends2;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _glslify = _dereq_('glslify');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

Object.assign(exports, _extends({}, _dereq_('./emit'), _dereq_('./read'), (_extends2 = {}, _defineProperty(_extends2, __dirname + '/variables', '#define GLSLIFY 1\n#ifndef GLSL_VARYING_VARIABLES\n#define GLSL_VARYING_VARIABLES\n\n#ifndef GLSL_VARYING_COLOR_VARIABLE\n#define GLSL_VARYING_COLOR_VARIABLE vColor\n#endif\n\n#ifndef GLSL_VARYING_POSITION_VARIABLE\n#define GLSL_VARYING_POSITION_VARIABLE vPosition\n#endif\n\n#ifndef GLSL_VARYING_LOCAL_POSITION_VARIABLE\n#define GLSL_VARYING_LOCAL_POSITION_VARIABLE vLocalPosition\n#endif\n\n#ifndef GLSL_VARYING_NORMAL_VARIABLE\n#define GLSL_VARYING_NORMAL_VARIABLE vNormal\n#endif\n\n#ifndef GLSL_VARYING_LOCAL_NORMAL_VARIABLE\n#define GLSL_VARYING_LOCAL_NORMAL_VARIABLE vLocalNormal\n#endif\n\n#ifndef GLSL_VARYING_UV_VARIABLE\n#define GLSL_VARYING_UV_VARIABLE vUv\n#endif\n\n#endif\n'), _defineProperty(_extends2, __dirname + '/position', '#define GLSLIFY 1\n#ifndef GLSL_VARYING_POSITION\n#define GLSL_VARYING_POSITION\n\n#include "./variables"\n\nvarying vec3 GLSL_VARYING_LOCAL_POSITION_VARIABLE;\nvarying vec3 GLSL_VARYING_POSITION_VARIABLE;\n\n#endif\n'), _defineProperty(_extends2, __dirname + '/normal', '#define GLSLIFY 1\n#ifndef GLSL_VARYING_NORMAL\n#define GLSL_VARYING_NORMAL\n\n#include "./variables"\n\nvarying vec3 GLSL_VARYING_LOCAL_NORMAL_VARIABLE;\nvarying vec3 GLSL_VARYING_NORMAL_VARIABLE;\n\n#endif\n'), _defineProperty(_extends2, __dirname + '/color', '#define GLSLIFY 1\n#ifndef GLSL_VARYING_COLOR\n#define GLSL_VARYING_COLOR\n\n#include "./variables"\n\nvarying vec4 GLSL_VARYING_COLOR_VARIABLE;\n\n#endif\n'), _defineProperty(_extends2, __dirname + '/data', '#define GLSLIFY 1\n#ifndef GLSL_VARYING_DATA\n#define GLSL_VARYING_DATA\n\nstruct VaryingData {\n  // exported\n  vec3 localPosition;\n  vec3 localNormal;\n  vec3 position;\n  vec3 normal;\n  vec4 color;\n  vec2 uv;\n\n  // private\n  mat3 modelNormal;\n  mat4 model;\n};\n\nVaryingData CreateVaryingData() {\n  VaryingData data;\n  data.localPosition = vec3(0.0);\n  data.localNormal = vec3(0.0);\n  data.position = vec3(0.0);\n  data.normal = vec3(0.0);\n  data.color = vec4(0.0);\n  data.uv = vec2(0.0);\n\n  data.modelNormal = mat3(1.0);\n  data.model = mat4(1.0);\n  return data;\n}\n\n#endif\n'), _defineProperty(_extends2, __dirname + '/emit', '#define GLSLIFY 1\n#ifndef GLSL_VARYING_EMIT\n#define GLSL_VARYING_EMIT\n\n#include "./emit/position"\n#include "./emit/normal"\n#include "./emit/color"\n#include "./emit/uv"\n#include "./data"\n\nvoid EmitVaryingData(const in VaryingData data) {\n#if defined(GLSL_VARYING_POSITION) && defined(GLSL_VARYING_EMIT_POSITION)\n  EmitVaryingPositions(data.model, data.position);\n#endif\n\n#if defined(GLSL_VARYING_NORMAL) && defined(GLSL_VARYING_EMIT_NORMAL)\n  EmitVaryingNormals(data.modelNormal, data.normal);\n#endif\n\n#if defined(GLSL_VARYING_COLOR) && defined(GLSL_VARYING_EMIT_COLOR)\n  EmitVaryingColors(data.color);\n#endif\n\n#if defined(GLSL_VARYING_UV) && defined(GLSL_VARYING_EMIT_UV)\n  EmitVaryingUvs(data.uv);\n#endif\n}\n\n#endif\n'), _defineProperty(_extends2, __dirname + '/read', '#define GLSLIFY 1\n#ifndef GLSL_VARYING_READ\n#define GLSL_VARYING_READ\n\n#include "./read/position"\n#include "./read/normal"\n#include "./read/color"\n#include "./read/uv"\n#include "./data"\n\nVaryingData ReadVaryingData() {\n  VaryingData data = CreateVaryingData();\n#if defined(GLSL_VARYING_POSITION) && defined(GLSL_VARYING_READ_POSITION)\n  data.localPosition = ReadVaryingLocalPosition();\n  data.position = ReadVaryingPosition();\n#endif\n\n#if defined(GLSL_VARYING_NORMAL) && defined(GLSL_VARYING_READ_NORMAL)\n  data.localNormal = ReadVaryingLocalNormal();\n  data.normal = ReadVaryingNormal();\n#endif\n\n#if defined(GLSL_VARYING_COLOR) && defined(GLSL_VARYING_READ_COLOR)\n  data.color = ReadVaryingColor();\n#endif\n\n#if defined(GLSL_VARYING_UV) && defined(GLSL_VARYING_READ_UV)\n  data.uv = ReadVaryingUv();\n#endif\n  return data;\n}\n\n#endif\n'), _defineProperty(_extends2, __dirname + '/uv', '#define GLSLIFY 1\n#ifndef GLSL_VARYING_UV\n#define GLSL_VARYING_UV\n\n#include "./variables"\n\nvarying vec2 GLSL_VARYING_UV_VARIABLE;\n\n#endif\n'), _extends2)));

}).call(this,"/lib/core/glsl/varying")
},{"./emit":45,"./read":47,"glslify":284}],47:[function(_dereq_,module,exports){
(function (__dirname){
'use strict';

var _Object$assign;

var _glslify = _dereq_('glslify');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

Object.assign(exports, (_Object$assign = {}, _defineProperty(_Object$assign, __dirname + '/position', '#define GLSLIFY 1\n#ifndef GLSL_VARYING_READ_POSITION\n#define GLSL_VARYING_READ_POSITION\n#ifdef GLSL_VARYING_POSITION\n\n#include "../variables"\n\nvec3 ReadVaryingLocalPosition() {\n  return vec3(GLSL_VARYING_LOCAL_POSITION_VARIABLE);\n}\n\nvec3 ReadVaryingPosition() {\n  return vec3(GLSL_VARYING_POSITION_VARIABLE);\n}\n\n#endif\n#endif\n'), _defineProperty(_Object$assign, __dirname + '/normal', '#define GLSLIFY 1\n#ifndef GLSL_VARYING_READ_NORMAL\n#define GLSL_VARYING_READ_NORMAL\n#ifdef GLSL_VARYING_NORMAL\n\n#include "../variables"\n\nvec3 ReadVaryingLocalNormal() {\n  return vec3(GLSL_VARYING_LOCAL_NORMAL_VARIABLE);\n}\n\nvec3 ReadVaryingNormal() {\n  return vec3(GLSL_VARYING_NORMAL_VARIABLE);\n}\n\n#endif\n#endif\n'), _defineProperty(_Object$assign, __dirname + '/color', '#define GLSLIFY 1\n#ifndef GLSL_VARYING_READ_COLOR\n#define GLSL_VARYING_READ_COLOR\n#ifdef GLSL_VARYING_COLOR\n\n#include "../variables"\n\nvec4 ReadVaryingColor() {\n  return vec4(GLSL_VARYING_COLOR_VARIABLE);\n}\n\n#endif\n#endif\n'), _defineProperty(_Object$assign, __dirname + '/uv', '#define GLSLIFY 1\n#ifndef GLSL_VARYING_READ_UV\n#define GLSL_VARYING_READ_UV\n#ifdef GLSL_VARYING_UV\n\n#include "../variables"\n\nvec2 ReadVaryingUv() {\n  return vec2(GLSL_VARYING_UV_VARIABLE);\n}\n\n#endif\n#endif\n'), _Object$assign));

}).call(this,"/lib/core/glsl/varying/read")
},{"glslify":284}],48:[function(_dereq_,module,exports){
(function (__dirname){
'use strict';

var _Object$assign;

var _glslify = _dereq_('glslify');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

Object.assign(exports, (_Object$assign = {}, _defineProperty(_Object$assign, __dirname + '/variables', '#define GLSLIFY 1\n#ifndef GLSL_VERTEX_ATTRIBUTES_VARIABLES\n#define GLSL_VERTEX_ATTRIBUTES_VARIABLES\n\n#ifndef GLSL_VERTEX_ATTRIBUTES_POSITION_VARIABLE\n#define GLSL_VERTEX_ATTRIBUTES_POSITION_VARIABLE position\n#endif\n\n#ifndef GLSL_VERTEX_ATTRIBUTES_NORMAL_VARIABLE\n#define GLSL_VERTEX_ATTRIBUTES_NORMAL_VARIABLE normal\n#endif\n\n#ifndef GLSL_VERTEX_ATTRIBUTES_COLOR_VARIABLE\n#define GLSL_VERTEX_ATTRIBUTES_COLOR_VARIABLE color\n#endif\n\n#ifndef GLSL_VERTEX_ATTRIBUTES_UV_VARIABLE\n#define GLSL_VERTEX_ATTRIBUTES_UV_VARIABLE uv\n#endif\n\n#endif\n'), _defineProperty(_Object$assign, __dirname + '/position', '#define GLSLIFY 1\n#ifndef GLSL_VERTEX_ATTRIBUTES_POSITION\n#define GLSL_VERTEX_ATTRIBUTES_POSITION\n\n#include "./variables"\n\nattribute vec3 GLSL_VERTEX_ATTRIBUTES_POSITION_VARIABLE;\n\n#endif\n'), _defineProperty(_Object$assign, __dirname + '/normal', '#define GLSLIFY 1\n#ifndef GLSL_VERTEX_ATTRIBUTES_NORMAL\n#define GLSL_VERTEX_ATTRIBUTES_NORMAL\n\n#include "./variables"\n\nattribute vec3 GLSL_VERTEX_ATTRIBUTES_NORMAL_VARIABLE;\n\n#endif\n'), _defineProperty(_Object$assign, __dirname + '/color', '#define GLSLIFY 1\n#ifndef GLSL_VERTEX_ATTRIBUTES_COLOR\n#define GLSL_VERTEX_ATTRIBUTES_COLOR\n\n#include "./variables"\n\nattribute vec4 GLSL_VERTEX_ATTRIBUTES_COLOR_VARIABLE;\n\n#endif\n'), _defineProperty(_Object$assign, __dirname + '/uv', '#define GLSLIFY 1\n#ifndef GLSL_VERTEX_ATTRIBUTES_UV\n#define GLSL_VERTEX_ATTRIBUTES_UV\n\n#include "./variables"\n\nattribute vec2 GLSL_VERTEX_ATTRIBUTES_UV_VARIABLE;\n\n#endif\n'), _Object$assign));

}).call(this,"/lib/core/glsl/vertex/attributes")
},{"glslify":284}],49:[function(_dereq_,module,exports){
(function (__dirname){
'use strict';

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _glslify = _dereq_('glslify');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

Object.assign(exports, _extends({}, _dereq_('./attributes'), _defineProperty({}, __dirname + '/main', '#define GLSLIFY 1\n#ifndef GLSL_VERTEX_MAIN\n#define GLSL_VERTEX_MAIN\n\n#include "../varying/data"\n\nvoid InitVarying(inout VaryingData varyingData);\nvoid BeforeMain(inout vec4 vertexPosition, inout VaryingData varyingData);\nvoid Main(inout vec4 vertexPosition, inout VaryingData data);\nvoid TransformMain(inout vec4 vertexPosition, inout VaryingData varyingData);\nvoid AfterMain(inout vec4 vertexPosition, inout VaryingData varyingData);\n\nvoid main() {\n  VaryingData varyingData = CreateVaryingData();\n  InitVarying(varyingData);\n  gl_Position = vec4(vec3(0.0), 1.0);\n  BeforeMain(gl_Position, varyingData);\n  Main(gl_Position, varyingData);\n  TransformMain(gl_Position, varyingData);\n#ifdef GLSL_VARYING_EMIT\n  EmitVaryingData(varyingData);\n#endif\n  AfterMain(gl_Position, varyingData);\n}\n\n#ifdef GLSL_VERTEX_MAIN_BEFORE\n  void GLSL_VERTEX_MAIN_BEFORE(inout vec4 vertexPosition,\n                               inout VaryingData varyingData);\n#endif\n\n#ifdef GLSL_VERTEX_MAIN_TRANSFORM\n  void GLSL_VERTEX_MAIN_TRANSFORM(inout vec4 vertexPosition,\n                                  inout VaryingData varyingData);\n#endif\n\n#ifdef GLSL_VERTEX_MAIN_AFTER\n  void GLSL_VERTEX_MAIN_AFTER(inout vec4 vertexPosition,\n                              inout VaryingData varyingData);\n#endif\n\nvoid BeforeMain(inout vec4 vertexPosition,\n                inout VaryingData varyingData) {\n#ifdef GLSL_VERTEX_MAIN_BEFORE\n  GLSL_VERTEX_MAIN_BEFORE(vertexPosition, varyingData);\n#endif\n}\n\nvoid TransformMain(inout vec4 vertexPosition,\n                   inout VaryingData varyingData) {\n#ifdef GLSL_VERTEX_MAIN_TRANSFORM\n  GLSL_VERTEX_MAIN_TRANSFORM(vertexPosition, varyingData);\n#endif\n}\n\nvoid AfterMain(inout vec4 vertexPosition,\n               inout VaryingData varyingData) {\n#ifdef GLSL_VERTEX_MAIN_AFTER\n  GLSL_VERTEX_MAIN_AFTER(vertexPosition, varyingData);\n#endif\n}\n\nvoid InitVarying(inout VaryingData varyingData) {\n  #ifdef GLSL_VERTEX_ATTRIBUTES_POSITION\n    varyingData.position = position;\n  #endif\n\n  #ifdef GLSL_VERTEX_ATTRIBUTES_NORMAL\n    varyingData.normal = normal;\n  #endif\n\n  #ifdef GLSL_VERTEX_ATTRIBUTES_COLOR\n    varyingData.color = color;\n  #endif\n\n  #ifdef GLSL_VERTEX_ATTRIBUTES_UV\n    varyingData.uv = uv;\n  #endif\n\n  #if defined(GLSL_MESH) && defined(GLSL_MESH_UNIFORMS)\n    varyingData.modelNormal = mesh.modelNormal;\n    varyingData.model = mesh.model;\n  #endif\n}\n\n#endif\n')));

}).call(this,"/lib/core/glsl/vertex")
},{"./attributes":48,"glslify":284}],50:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.libglsl = undefined;

var _component = _dereq_('./component');

Object.keys(_component).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _component[key];
    }
  });
});

var _shaderlib = _dereq_('./shaderlib');

Object.keys(_shaderlib).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _shaderlib[key];
    }
  });
});

var _geometry = _dereq_('./geometry');

Object.keys(_geometry).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _geometry[key];
    }
  });
});

var _command = _dereq_('./command');

Object.keys(_command).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _command[key];
    }
  });
});

var _dynamic = _dereq_('./dynamic');

Object.keys(_dynamic).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _dynamic[key];
    }
  });
});

var _context = _dereq_('./context');

Object.keys(_context).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _context[key];
    }
  });
});

var _entity = _dereq_('./entity');

Object.keys(_entity).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _entity[key];
    }
  });
});

var _gl = _dereq_('./gl');

Object.keys(_gl).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _gl[key];
    }
  });
});

var _glsl = _dereq_('./glsl');

var _libglsl = _interopRequireWildcard(_glsl);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

exports.libglsl = _libglsl;

},{"./command":28,"./component":29,"./context":30,"./dynamic":31,"./entity":32,"./geometry":33,"./gl":35,"./glsl":40,"./shaderlib":51}],51:[function(_dereq_,module,exports){
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShaderLibPreprocessor = exports.ShaderLibPlugin = exports.ShaderLib = undefined;

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _dynamic = _dereq_('./dynamic');

var _component = _dereq_('./component');

var _glsl = _dereq_('./glsl');

var libglsl = _interopRequireWildcard(_glsl);

var _path = _dereq_('path');

var _glslTokenDefines = _dereq_('glsl-token-defines');

var _glslTokenString = _dereq_('glsl-token-string');

var _glslTokenString2 = _interopRequireDefault(_glslTokenString);

var _glslInjectDefines = _dereq_('glsl-inject-defines');

var _glslInjectDefines2 = _interopRequireDefault(_glslInjectDefines);

var _glslTokenizer = _dereq_('glsl-tokenizer');

var _glslTokenizer2 = _interopRequireDefault(_glslTokenizer);

var _prepr = _dereq_('prepr');

var _prepr2 = _interopRequireDefault(_prepr);

var _defined = _dereq_('defined');

var _defined2 = _interopRequireDefault(_defined);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof2(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var kGLSLTokenPreprocecsor = 'preprocessor';
var kGLSLTokenBlockComment = 'block-comment';
var kGLSLTokenLineComment = 'line-comment';

var kDefaultShaderLibPrecision = 'mediump float';
var kDefaultShaderLibVersion = '100';
var kDefaultShaderName = '<anonymous>';

var ShaderLib = exports.ShaderLib = function () {
  _createClass(ShaderLib, null, [{
    key: 'defaults',
    value: function defaults() {
      return {
        precision: kDefaultShaderLibPrecision,
        shaderName: kDefaultShaderName,
        version: kDefaultShaderLibVersion,
        defines: {},
        name: kDefaultShaderName
      };
    }
  }]);

  function ShaderLib() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$preprocessor = _ref.preprocessor,
        preprocessor = _ref$preprocessor === undefined ? undefined : _ref$preprocessor,
        _ref$middleware = _ref.middleware,
        middleware = _ref$middleware === undefined ? [] : _ref$middleware,
        _ref$precision = _ref.precision,
        precision = _ref$precision === undefined ? kDefaultShaderLibPrecision : _ref$precision,
        _ref$version = _ref.version,
        version = _ref$version === undefined ? kDefaultShaderLibVersion : _ref$version,
        _ref$defines = _ref.defines,
        defines = _ref$defines === undefined ? {} : _ref$defines,
        glsl = _ref.glsl;

    _classCallCheck(this, ShaderLib);

    this.cache = new _dynamic.DynamicValue(this);
    this.store = new _dynamic.DynamicValue(this);
    this.version = (0, _defined2.default)(version || kDefaultShaderLibVersion);
    this.precision = (0, _defined2.default)(precision, kDefaultShaderLibPrecision);
    this.middleware = (0, _defined2.default)(middleware, []);
    this.preprocessor = (0, _defined2.default)(preprocessor, new ShaderLibPreprocessor(this));
    this.preprocessor.define(defines);
    this.add(_extends({}, libglsl, glsl));
  }

  _createClass(ShaderLib, [{
    key: 'define',
    value: function define(key, value) {
      return this.preprocessor.define(key, value);
    }
  }, {
    key: 'injectShaderNameDefine',
    value: function injectShaderNameDefine(name, source) {
      var regex = /\s?#ifndef SHADER_NAME\s?\n#define SHADER_NAME\s?.*\n#endif\n?$/g;
      return String(source).replace(regex, '');
    }
  }, {
    key: 'injectShaderPrecision',
    value: function injectShaderPrecision(source) {
      var _precision = this.precision,
          precision = _precision === undefined ? kDefaultShaderLibPrecision : _precision;

      var header = 'precision ' + precision + ';';
      var regex = /[\s|\t]?precision\s+([a-z]+)\s+([a-z|A-Z]+)[\s+]?;[\s|\t|\r]?/g;
      source = source.replace(header, '').replace(regex, '');
      return header + '\n' + source;
    }
  }, {
    key: 'add',
    value: function add(name, source) {
      var _this = this;

      if ('string' == typeof name && 'string' == typeof source) {
        name = name.replace(/[\/]+/g, '/');
        this.store.set(name, source);
      } else if (name && 'object' == (typeof name === 'undefined' ? 'undefined' : _typeof(name))) {
        var walk = function walk(stack, scope) {
          for (var key in scope) {
            stack.push(key);
            if ('object' == _typeof(scope[key])) {
              walk(stack, scope[key]);
            } else {
              _this.add(stack.join('/'), scope[key]);
            }
            stack.pop();
          }
        };
        walk([], name);
      }
      return this;
    }
  }, {
    key: 'get',
    value: function get(path) {
      if ('string' == typeof path) {
        if ('string' == typeof this.store[path]) {
          return this.compile(path, this.store[path]);
        }
      }
      return null;
    }
  }, {
    key: 'resolve',
    value: function resolve(path) {
      var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : './';

      root = (0, _path.resolve)('/', root);
      path = path.replace((0, _path.extname)(path), '');
      path = (0, _path.resolve)(root, path).slice(1);
      return path;
    }
  }, {
    key: 'hash',
    value: function hash(source) {
      return 'string' != typeof source ? null : String(source).split('').map(function (c) {
        return c.charCodeAt(0);
      }).reduce(function (a, b) {
        return a + b;
      }, 0).toString('16');
    }
  }, {
    key: 'isCached',
    value: function isCached(source) {
      return 'string' == typeof this.cache[this.hash(source) || ''];
    }
  }, {
    key: 'preprocess',
    value: function preprocess(source) {
      var defines = this.defines;

      source = (0, _prepr2.default)(source, defines);
      source = source.split('\n').filter(function (line) {
        return false == /^\s*$/.test(line);
      }).join('\n');
      return source;
    }
  }, {
    key: 'compile',
    value: function compile(name, source) {
      if (!source && name) {
        source = name;name = null;
      }
      if (!name) {
        name = kDefaultShaderName;
      }
      if (!source) {
        return null;
      }
      var hash = this.hash(source);
      if (this.cache[hash]) {
        return this.cache[hash];
      }
      source = this.injectShaderNameDefine(name, source);
      source = this.preprocessor.process(name, source);
      source = this.injectShaderPrecision(source);
      source = source.split('\n').filter(function (line) {
        return line.length;
      }).map(function (line) {
        return 1 == line.length ? line + '\n' : line;
      }).join('\n');
      this.cache.set(hash, source);
      return source + '\n';
    }
  }, {
    key: 'use',
    value: function use(middleware) {
      if ('function' == typeof middleware) {
        this.middleware.push(middleware);
      }
      return this;
    }
  }, {
    key: 'defines',
    get: function get() {
      var _ref2 = this.preprocessor || {},
          _ref2$defines = _ref2.defines,
          defines = _ref2$defines === undefined ? null : _ref2$defines;

      return defines;
    }
  }]);

  return ShaderLib;
}();

var ShaderLibPlugin = exports.ShaderLibPlugin = function (_Component) {
  _inherits(ShaderLibPlugin, _Component);

  function ShaderLibPlugin() {
    _classCallCheck(this, ShaderLibPlugin);

    return _possibleConstructorReturn(this, (ShaderLibPlugin.__proto__ || Object.getPrototypeOf(ShaderLibPlugin)).apply(this, arguments));
  }

  return ShaderLibPlugin;
}(_component.Component);

var ShaderLibPreprocessor = exports.ShaderLibPreprocessor = function () {
  function ShaderLibPreprocessor(shaderLib) {
    _classCallCheck(this, ShaderLibPreprocessor);

    this.defines = new _dynamic.DynamicValue(this);
    this.shaderLib = shaderLib;
    this.middleware = [];
  }

  _createClass(ShaderLibPreprocessor, [{
    key: 'define',
    value: function define(key, value) {
      var _this3 = this;

      if ('object' == (typeof key === 'undefined' ? 'undefined' : _typeof(key))) {
        return Object.keys(key).map(function (k) {
          return _this3.define(k, key[k]);
        }).some(function (v) {
          return true === v;
        });
      } else if ('string' == typeof key) {
        // boolean -> number
        if (true === value) {
          value = 1;
        } else if (false === value) {
          value = 0;
        }
        if (null != value) {
          // any -> string
          value = String(value);
          if (value != this.defines[key]) {
            this.defines.set(key, value);
            return true;
          } else {
            return false;
          }
        }
      }
      return false;
    }
  }, {
    key: 'undefine',
    value: function undefine(key) {
      this.defines.unset(key);
      return this;
    }
  }, {
    key: 'process',
    value: function process(name, source) {
      var _this4 = this;

      var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var shaderLib = this.shaderLib,
          defines = this.defines;
      var middleware = shaderLib.middleware,
          version = shaderLib.version;

      var includeStack = [];
      var stack = [];
      opts = !opts || 'object' != (typeof opts === 'undefined' ? 'undefined' : _typeof(opts)) ? {} : opts;
      if ('string' == typeof source) {
        source = (0, _glslInjectDefines2.default)(source, _extends({}, defines, opts.defines));
      }
      visit('\n' + source + '\n', stack, name != kDefaultShaderName ? (0, _path.dirname)(name) : '/');
      source = (0, _glslTokenString2.default)(stack);
      return middleware.filter(function (ware) {
        return 'function' == typeof ware;
      }).reduce(function (src, ware) {
        return (0, _defined2.default)(ware(shaderLib, _this4, src, opts), src);
      }, source).replace('#define GLSLIFY 1\n', '');

      function visit(source, stack, root) {
        var tokens = (0, _glslTokenizer2.default)(source, { version: version });
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          var _loop = function _loop() {
            var token = _step.value;

            var push = function push() {
              return stack.push(token);
            };
            switch (token.type) {
              case kGLSLTokenBlockComment:
              case kGLSLTokenLineComment:
                break;
              case kGLSLTokenPreprocecsor:
                var includeRegex = RegExp(/[\s|\t]?#include[\s]+([<|"]?.*[>|"]?)$/);
                var directive = token.data.match(/(#[a-z]+)\s?/)[0].trim();
                switch (directive) {
                  case '#define':
                    var match = token.data.match(/#define[\s]+(.*)/);
                    if (match) {
                      var kv = match[1].match(/.*[\s]+(.*)/);
                      if (!kv) {
                        token.data = token.data + ' 1';
                      }
                    }
                    push();
                    break;

                  case '#include':
                    var _ref3 = token.data.match(includeRegex) || [],
                        _ref4 = _slicedToArray(_ref3, 2),
                        statement = _ref4[0],
                        arg = _ref4[1];

                    var path = arg.replace(/^["|<](.*)["|>]/, '$1').trim();
                    var left = arg[0].trim();
                    var right = arg[arg.trim().length - 1].trim();
                    var createError = function createError(ErrorType, msg) {
                      return new ErrorType((msg || '') + '\n\tat (glsl) ' + includeStack.join('\n\tat (glsl) '));
                    };
                    if (-1 == ['<', '"'].indexOf(left)) {
                      var msg = 'Unexpected token \'' + left + '\'. Expecting \'<\' or \'"\'.';
                      throw createError(SyntaxError, msg);
                    } else if (-1 == ['>', '"'].indexOf(right)) {
                      var expected = '<' == left ? '\'>\'' : '\'"\'';
                      var _msg = 'Unexpected token \'' + right + '\'. Expecting ' + expected + '.';
                      throw createError(SyntaxError, _msg);
                    }

                    if ('<' == left && '>' != right) {
                      var _msg2 = 'Unexpected token \'' + right + '\'. Expecting \'>\'.';
                      throw createError(SyntaxError, _msg2);
                    } else if ('"' == left && '"' != right) {
                      var _msg3 = 'Unexpected token \'' + right + '\'. Expecting \'"\'.';
                      throw createError(SyntaxError, _msg3);
                    }

                    var nextRoot = '<' == left && '>' == right ? '/' : root;
                    var prefix = '.' != path[0] ? './' : '';
                    var resolvedPath = shaderLib.resolve('' + prefix + path, nextRoot);
                    var shader = shaderLib.get(resolvedPath);
                    if (shader) {
                      includeStack.push(path + ':' + token.line);
                      visit(shader + '\n', stack, nextRoot);
                    } else {
                      throw createError(ReferenceError, 'glsl lib ' + arg + ' not found.');
                    }
                    includeStack.pop();
                    break;

                  default:
                    push();
                }
                break;

              default:
                push();break;
            }
          };

          for (var _iterator = tokens[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            _loop();
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }
  }]);

  return ShaderLibPreprocessor;
}();

},{"./component":29,"./dynamic":31,"./glsl":40,"defined":124,"glsl-inject-defines":273,"glsl-token-defines":274,"glsl-token-string":276,"glsl-tokenizer":283,"path":289,"prepr":290}],52:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FrameContext = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _utils = _dereq_('../utils');

var _scope = _dereq_('../scope');

var _core = _dereq_('../core');

var _defaults2 = _dereq_('./defaults');

var _defaults = _interopRequireWildcard(_defaults2);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var FrameContext = exports.FrameContext = function (_Component) {
  _inherits(FrameContext, _Component);

  _createClass(FrameContext, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function FrameContext(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, FrameContext);

    (0, _utils.assignDefaults)(initialState, FrameContext.defaults());
    return _possibleConstructorReturn(this, (FrameContext.__proto__ || Object.getPrototypeOf(FrameContext)).call(this, ctx, initialState, new _scope.ScopedContext(ctx, {
      // props
      regl: function regl() {
        return ctx ? ctx.regl : null;
      },
      gl: function gl() {
        return ctx ? ctx.gl : null;
      },

      // functions
      cancel: function cancel(_ref) {
        var frame = _ref.frame,
            frames = _ref.frames;

        return function () {
          if (frame) {
            frame.cancel();
            frames.splice(frames.indexOf(frame), 1);
          }
        };
      },
      clear: function clear(ctx, args) {
        return function (clear) {
          ctx.regl.clear(_extends({}, clear || (0, _utils.get)('clear', [args, initialState])));
        };
      },
      cancelAll: function cancelAll(_ref2) {
        var frames = _ref2.frames,
            frame = _ref2.frame,
            loop = _ref2.loop;

        return function () {
          if (frames) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = frames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var f = _step.value;
                f.cancel();
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }

            frames.splice(0, frames.length);
          }
          if (loop) {
            loop.cancel();
            loop = null;
          }
        };
      }
    })));
  }

  return FrameContext;
}(_core.Component);

},{"../core":50,"../scope":90,"../utils":116,"./defaults":53}],53:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var autoClear = exports.autoClear = true;
var blending = exports.blending = {
  equation: 'add',
  enable: false,
  color: [0, 0, 0, 1],
  func: { src: 'src alpha', dst: 'one minus src alpha' }
};

var culling = exports.culling = {
  enable: true,
  face: 'back'
};

var depth = exports.depth = {
  enable: true,
  range: [0, 1],
  func: 'less',
  mask: true
};

var clear = exports.clear = {
  color: [17 / 255, 17 / 255, 17 / 255, 1],
  depth: 1
};

},{}],54:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Frame = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _utils = _dereq_('../utils');

var _scope = _dereq_('../scope');

var _core = _dereq_('../core');

var _uniforms = _dereq_('./uniforms');

var _context = _dereq_('./context');

var _state = _dereq_('./state');

var _defaults2 = _dereq_('./defaults');

var _defaults = _interopRequireWildcard(_defaults2);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Frame = exports.Frame = function (_Component) {
  _inherits(Frame, _Component);

  _createClass(Frame, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function Frame(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Frame);

    (0, _utils.assignDefaults)(initialState, Frame.defaults());
    var getContext = ctx.regl({});

    var uniforms = new _uniforms.FrameShaderUniforms(ctx, initialState);
    var context = new _context.FrameContext(ctx, initialState);
    var state = new _state.FrameState(ctx, initialState);

    var clear = function clear() {
      return getContext(function (_ref) {
        var clear = _ref.clear;
        return clear();
      });
    };
    var autoClear = _core.Component.compose(context, clear);
    var frames = [];
    var pipe = _core.Component.compose(state, context, uniforms);

    var loop = null; // for all frames

    var _this = _possibleConstructorReturn(this, (Frame.__proto__ || Object.getPrototypeOf(Frame)).call(this, ctx, initialState, function (state, refresh) {
      if (null == loop) {
        createFrameLoop();
      }
      var inject = new _scope.ScopedContext(ctx, { frame: function (_frame) {
          function frame() {
            return _frame.apply(this, arguments);
          }

          frame.toString = function () {
            return _frame.toString();
          };

          return frame;
        }(function () {
          return frame;
        }), frames: frames, loop: loop });
      var update = _core.Component.compose(inject, pipe);
      var frame = createFrameRefresh(refresh, update);
      frames.push(frame);
    }));

    function createFrameRefresh(refresh, components) {
      var cancelled = null;
      var frame = null;
      return frame = {
        cancel: function cancel() {
          cancelled = true;
        },
        onframe: function onframe() {
          if (cancelled) {
            frames.splice(frames.indexOf(frame, 1));
          } else try {
            components(function () {
              return getContext(refresh);
            });
          } catch (err) {
            ctx.emit('error', err);
            destroyFrameLoop();
          }
        }
      };
    }

    function createFrameLoop() {
      loop = ctx.regl.frame(function () {
        try {
          if (true === initialState.autoClear) {
            autoClear();
          }
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = frames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var f = _step.value;
              f.onframe.apply(f, arguments);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        } catch (err) {
          try {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = frames[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _f = _step2.value;
                _f.cancel();
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }
          } catch (err) {
            ctx.emit('error', err);
          }
          destroyFrameLoop();
        }
      });
    }

    function destroyFrameLoop() {
      try {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = frames[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var f = _step3.value;
            f.cancel();
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      } catch (err) {
        ctx.emit('error', err);
      }
      frames.splice(0, frames.length);
    }
    return _this;
  }

  return Frame;
}(_core.Component);

},{"../core":50,"../scope":90,"../utils":116,"./context":52,"./defaults":53,"./state":56,"./uniforms":57}],55:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _uniforms = _dereq_('./uniforms');

Object.keys(_uniforms).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _uniforms[key];
    }
  });
});

var _context = _dereq_('./context');

Object.keys(_context).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _context[key];
    }
  });
});

var _frame = _dereq_('./frame');

Object.keys(_frame).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _frame[key];
    }
  });
});

var _state = _dereq_('./state');

Object.keys(_state).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _state[key];
    }
  });
});

},{"./context":52,"./frame":54,"./state":56,"./uniforms":57}],56:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FrameState = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _utils = _dereq_('../utils');

var _material = _dereq_('../material');

var _core = _dereq_('../core');

var _defaults2 = _dereq_('./defaults');

var _defaults = _interopRequireWildcard(_defaults2);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var FrameState = exports.FrameState = function (_Component) {
  _inherits(FrameState, _Component);

  _createClass(FrameState, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function FrameState(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, FrameState);

    (0, _utils.assignDefaults)(initialState, FrameState.defaults());
    return _possibleConstructorReturn(this, (FrameState.__proto__ || Object.getPrototypeOf(FrameState)).call(this, ctx, ctx.regl({
      depth: _extends({}, initialState.depth),
      blend: _extends({}, initialState.blending),
      cull: _extends({}, initialState.culling)
    })));
  }

  return FrameState;
}(_core.Component);

},{"../core":50,"../material":61,"../utils":116,"./defaults":53}],57:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FrameShaderUniforms = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _utils = _dereq_('../utils');

var _shader = _dereq_('../shader');

var _core = _dereq_('../core');

var _defaults2 = _dereq_('./defaults');

var _defaults = _interopRequireWildcard(_defaults2);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var FrameShaderUniforms = exports.FrameShaderUniforms = function (_Component) {
  _inherits(FrameShaderUniforms, _Component);

  _createClass(FrameShaderUniforms, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function FrameShaderUniforms(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, FrameShaderUniforms);

    (0, _utils.assignDefaults)(initialState, FrameShaderUniforms.defaults());
    return _possibleConstructorReturn(this, (FrameShaderUniforms.__proto__ || Object.getPrototypeOf(FrameShaderUniforms)).call(this, ctx, initialState, new _shader.ShaderUniforms(ctx, {
      time: function time(_ref) {
        var _time = _ref.time;
        return _time;
      },
      tick: function tick(_ref2) {
        var _tick = _ref2.tick;
        return _tick;
      }
    })));
  }

  return FrameShaderUniforms;
}(_core.Component);

},{"../core":50,"../shader":93,"../utils":116,"./defaults":53}],58:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _camera = _dereq_('./camera');

Object.keys(_camera).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _camera[key];
    }
  });
});

var _compute = _dereq_('./compute');

Object.keys(_compute).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _compute[key];
    }
  });
});

var _core = _dereq_('./core');

Object.keys(_core).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _core[key];
    }
  });
});

var _frame = _dereq_('./frame');

Object.keys(_frame).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _frame[key];
    }
  });
});

var _material = _dereq_('./material');

Object.keys(_material).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _material[key];
    }
  });
});

var _mesh = _dereq_('./mesh');

Object.keys(_mesh).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _mesh[key];
    }
  });
});

var _object3d = _dereq_('./object3d');

Object.keys(_object3d).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _object3d[key];
    }
  });
});

var _scissor = _dereq_('./scissor');

Object.keys(_scissor).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _scissor[key];
    }
  });
});

var _scope = _dereq_('./scope');

Object.keys(_scope).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _scope[key];
    }
  });
});

var _shader = _dereq_('./shader');

Object.keys(_shader).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _shader[key];
    }
  });
});

var _texture = _dereq_('./texture');

Object.keys(_texture).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _texture[key];
    }
  });
});

var _viewport = _dereq_('./viewport');

Object.keys(_viewport).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _viewport[key];
    }
  });
});

},{"./camera":8,"./compute":27,"./core":50,"./frame":55,"./material":61,"./mesh":73,"./object3d":87,"./scissor":89,"./scope":90,"./shader":93,"./texture":114,"./viewport":117}],59:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MaterialContext = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _utils = _dereq_('../utils');

var _scope = _dereq_('../scope');

var _core = _dereq_('../core');

var _defaults = _dereq_('./defaults');

var defaults = _interopRequireWildcard(_defaults);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var MaterialContext = exports.MaterialContext = function (_Component) {
  _inherits(MaterialContext, _Component);

  _createClass(MaterialContext, null, [{
    key: 'defualts',
    value: function defualts() {
      return _extends({}, defaults);
    }
  }]);

  function MaterialContext(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, MaterialContext);

    (0, _utils.assignDefaults)(initialState, MaterialContext.defaults());
    return _possibleConstructorReturn(this, (MaterialContext.__proto__ || Object.getPrototypeOf(MaterialContext)).call(this, ctx, initialState, new _scope.ScopedContext(ctx, {
      lineWidth: function lineWidth(ctx, args) {
        return (0, _utils.get)('lineWidth', [args, ctx]);
      },
      wireframe: function wireframe(ctx, args) {
        return (0, _utils.get)('wireframe', [args, ctx]);
      },
      opacity: function opacity(ctx, args) {
        return (0, _utils.get)('opacity', [args, ctx]);
      },
      color: function color(ctx, args) {
        return (0, _utils.ensureRGB)((0, _utils.get)('color', [args, ctx]));
      }
    })));
  }

  return MaterialContext;
}(_core.Component);

},{"../core":50,"../scope":90,"../utils":116,"./defaults":60}],60:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var uniformName = exports.uniformName = 'material';
var opacity = exports.opacity = 1;
var color = exports.color = [100 / 255, 110 / 255, 255 / 255];

var wireframePrimitive = exports.wireframePrimitive = 'line strip';
var primitive = exports.primitive = 'triangles';
var lineWidth = exports.lineWidth = 1;

var blending = exports.blending = {
  equation: 'add',
  enable: true,
  color: [0, 0, 0, 1],
  func: { src: 'src alpha', dst: 'one minus src alpha' }
};

var culling = exports.culling = {
  enable: false,
  face: 'back'
};

var depth = exports.depth = {
  enable: true,
  range: [0, 1],
  func: 'less',
  mask: true
};

},{}],61:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _material = _dereq_('./material');

Object.keys(_material).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _material[key];
    }
  });
});

var _context = _dereq_('./context');

Object.keys(_context).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _context[key];
    }
  });
});

var _shader = _dereq_('./shader');

Object.keys(_shader).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _shader[key];
    }
  });
});

var _state = _dereq_('./state');

Object.keys(_state).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _state[key];
    }
  });
});

},{"./context":59,"./material":62,"./shader":63,"./state":66}],62:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Material = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _shader = _dereq_('./shader');

var _context = _dereq_('./context');

var _utils = _dereq_('../utils');

var _state = _dereq_('./state');

var _core = _dereq_('../core');

var _defaults2 = _dereq_('./defaults');

var _defaults = _interopRequireWildcard(_defaults2);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Material = exports.Material = function (_Component) {
  _inherits(Material, _Component);

  _createClass(Material, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function Material(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Material);

    (0, _utils.assignDefaults)(initialState, Material.defaults());
    return _possibleConstructorReturn(this, (Material.__proto__ || Object.getPrototypeOf(Material)).call(this, ctx, initialState, new _state.MaterialState(ctx, initialState), new _context.MaterialContext(ctx, initialState), new _shader.MaterialShaderUniforms(ctx, initialState), new _shader.MaterialShader(ctx, initialState)));
  }

  return Material;
}(_core.Component);

},{"../core":50,"../utils":116,"./context":59,"./defaults":60,"./shader":63,"./state":66}],63:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _uniforms = _dereq_('./uniforms');

Object.keys(_uniforms).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _uniforms[key];
    }
  });
});

var _shader = _dereq_('./shader');

Object.keys(_shader).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _shader[key];
    }
  });
});

},{"./shader":64,"./uniforms":65}],64:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MaterialShader = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _utils = _dereq_('../../utils');

var _core = _dereq_('../../core');

var _shader = _dereq_('../../shader');

var _defaults2 = _dereq_('../defaults');

var _defaults = _interopRequireWildcard(_defaults2);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var MaterialShader = exports.MaterialShader = function (_Component) {
  _inherits(MaterialShader, _Component);

  _createClass(MaterialShader, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function MaterialShader(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, MaterialShader);

    (0, _utils.assignDefaults)(initialState, MaterialShader.defaults());
    var uniformName = initialState.uniformName,
        _initialState$fragmen = initialState.fragmentShader,
        fragmentShader = _initialState$fragmen === undefined ? null : _initialState$fragmen;
    return _possibleConstructorReturn(this, (MaterialShader.__proto__ || Object.getPrototypeOf(MaterialShader)).call(this, ctx, initialState, new _shader.Shader(ctx, {
      fragmentShader: function fragmentShader(_ref) {
        var _fragmentShader = _ref.fragmentShader;

        if (_fragmentShader) {
          return _fragmentShader;
        }
        return '\n          #define GLSL_MATERIAL_UNIFORM_VARIABLE ' + uniformName + '\n          #include <material/fragment/main>\n          ';
      }
    })));
  }

  return MaterialShader;
}(_core.Component);

},{"../../core":50,"../../shader":93,"../../utils":116,"../defaults":60}],65:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MaterialShaderUniforms = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _utils = _dereq_('../../utils');

var _shader = _dereq_('../../shader');

var _core = _dereq_('../../core');

var _defaults2 = _dereq_('../defaults');

var _defaults = _interopRequireWildcard(_defaults2);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var MaterialShaderUniforms = exports.MaterialShaderUniforms = function (_Component) {
  _inherits(MaterialShaderUniforms, _Component);

  _createClass(MaterialShaderUniforms, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function MaterialShaderUniforms(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, MaterialShaderUniforms);

    (0, _utils.assignDefaults)(initialState, MaterialShaderUniforms.defaults());
    var uniformName = initialState.uniformName;
    return _possibleConstructorReturn(this, (MaterialShaderUniforms.__proto__ || Object.getPrototypeOf(MaterialShaderUniforms)).call(this, ctx, initialState, new _shader.ShaderUniforms(ctx, { prefix: uniformName + '.' }, {
      opacity: function opacity(ctx, args) {
        return (0, _utils.get)('opacity', [args, ctx, initialState]);
      },
      color: function color(ctx, args) {
        return (0, _utils.ensureRGB)((0, _utils.get)('color', [args, ctx, initialState]));
      }
    })));
  }

  return MaterialShaderUniforms;
}(_core.Component);

},{"../../core":50,"../../shader":93,"../../utils":116,"../defaults":60}],66:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MaterialState = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _utils = _dereq_('../utils');

var _core = _dereq_('../core');

var _defaults2 = _dereq_('./defaults');

var _defaults = _interopRequireWildcard(_defaults2);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var MaterialState = exports.MaterialState = function (_Component) {
  _inherits(MaterialState, _Component);

  _createClass(MaterialState, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function MaterialState(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, MaterialState);

    (0, _utils.assignDefaults)(initialState, MaterialState.defaults());
    return _possibleConstructorReturn(this, (MaterialState.__proto__ || Object.getPrototypeOf(MaterialState)).call(this, ctx, initialState, ctx.regl({
      blend: {
        equation: function equation(ctx, args) {
          return (0, _utils.get)('equation', [args.blending, ctx.blending, initialState.blending]);
        },
        color: function color(ctx, args) {
          return (0, _utils.ensureRGBA)((0, _utils.get)('color', [args.blending, ctx.blending, initialState.blending]));
        },
        enable: function enable(ctx, args) {
          return (0, _utils.get)('enable', [args.blending, ctx.blending, initialState.blending]);
        },
        func: function func(ctx, args) {
          return (0, _utils.get)('func', [args.blending, ctx.blending, initialState.blending]);
        }
      },

      cull: {
        enable: function enable(ctx, args) {
          return Boolean((0, _utils.get)('enable', [args.culling, ctx.culling, initialState.culling]));
        },
        face: function face(ctx, args) {
          return String((0, _utils.get)('face', [args.culling, ctx.culling, initialState.culling]));
        }
      },

      depth: {
        enable: function enable(ctx, args) {
          return Boolean((0, _utils.get)('enable', [args.depth, ctx.depth, initialState.depth]));
        },
        range: function range(ctx, args) {
          return (0, _utils.get)('range', [args.depth, ctx.depth, initialState.depth]);
        },
        func: function func(ctx, args) {
          return (0, _utils.get)('func', [args.depth, ctx.depth, initialState.depth]);
        },
        mask: function mask(ctx, args) {
          return (0, _utils.get)('mask', [args.depth, ctx.depth, initialState.depth]);
        }
      }
    })));
  }

  return MaterialState;
}(_core.Component);

},{"../core":50,"../utils":116,"./defaults":60}],67:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeshBoundingBoxContext = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _utils = _dereq_('../../utils');

var _scope = _dereq_('../../scope');

var _core = _dereq_('../../core');

var _defaults2 = _dereq_('../defaults');

var _defaults = _interopRequireWildcard(_defaults2);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var MeshBoundingBoxContext = exports.MeshBoundingBoxContext = function (_Component) {
  _inherits(MeshBoundingBoxContext, _Component);

  _createClass(MeshBoundingBoxContext, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function MeshBoundingBoxContext(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, MeshBoundingBoxContext);

    (0, _utils.assignDefaults)(initialState, MeshBoundingBoxContext.defaults());
    var computedBoundingBoxWeakMap = new WeakMap();
    return _possibleConstructorReturn(this, (MeshBoundingBoxContext.__proto__ || Object.getPrototypeOf(MeshBoundingBoxContext)).call(this, ctx, initialState, new _scope.ScopedContext(ctx, {
      boundingBox: function boundingBox(_ref) {
        var geometry = _ref.geometry;

        if (!geometry) {
          return null;
        } else if (computedBoundingBoxWeakMap.has(geometry)) {
          return computedBoundingBoxWeakMap.get(geometry);
        } else if ('function' == typeof geometry.computeBoundingBox) {
          var computedBoundingBox = geometry.computeBoundingBox();
          computedBoundingBoxWeakMap.set(geometry, computedBoundingBox);
          return computedBoundingBox;
        } else {
          return null;
        }
      }
    })));
  }

  return MeshBoundingBoxContext;
}(_core.Component);

},{"../../core":50,"../../scope":90,"../../utils":116,"../defaults":72}],68:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeshContext = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _boundingBox = _dereq_('./bounding-box');

var _geometry = _dereq_('./geometry');

var _size = _dereq_('./size');

var _utils = _dereq_('../../utils');

var _core = _dereq_('../../core');

var _defaults2 = _dereq_('../defaults');

var _defaults = _interopRequireWildcard(_defaults2);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var MeshContext = exports.MeshContext = function (_Component) {
  _inherits(MeshContext, _Component);

  _createClass(MeshContext, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function MeshContext(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, MeshContext);

    (0, _utils.assignDefaults)(initialState, MeshContext.defaults());
    return _possibleConstructorReturn(this, (MeshContext.__proto__ || Object.getPrototypeOf(MeshContext)).call(this, ctx, initialState, new _geometry.MeshGeometryContext(ctx, initialState), new _boundingBox.MeshBoundingBoxContext(ctx, initialState), new _size.MeshSizeContext(ctx, initialState)));
  }

  return MeshContext;
}(_core.Component);

},{"../../core":50,"../../utils":116,"../defaults":72,"./bounding-box":67,"./geometry":69,"./size":71}],69:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeshGeometryContext = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _utils = _dereq_('../../utils');

var _scope = _dereq_('../../scope');

var _core = _dereq_('../../core');

var _defaults2 = _dereq_('../defaults');

var _defaults = _interopRequireWildcard(_defaults2);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var MeshGeometryContext = exports.MeshGeometryContext = function (_Component) {
  _inherits(MeshGeometryContext, _Component);

  _createClass(MeshGeometryContext, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function MeshGeometryContext(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, MeshGeometryContext);

    (0, _utils.assignDefaults)(initialState, MeshGeometryContext.defaults());
    var _geometry = initialState.geometry;
    return _possibleConstructorReturn(this, (MeshGeometryContext.__proto__ || Object.getPrototypeOf(MeshGeometryContext)).call(this, ctx, initialState, new _scope.ScopedContext(ctx, {
      geometry: function geometry() {
        return _geometry;
      }
    })));
  }

  return MeshGeometryContext;
}(_core.Component);

},{"../../core":50,"../../scope":90,"../../utils":116,"../defaults":72}],70:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _boundingBox = _dereq_('./bounding-box');

Object.keys(_boundingBox).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _boundingBox[key];
    }
  });
});

var _geometry = _dereq_('./geometry');

Object.keys(_geometry).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _geometry[key];
    }
  });
});

var _context = _dereq_('./context');

Object.keys(_context).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _context[key];
    }
  });
});

var _size = _dereq_('./size');

Object.keys(_size).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _size[key];
    }
  });
});

},{"./bounding-box":67,"./context":68,"./geometry":69,"./size":71}],71:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeshSizeContext = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _utils = _dereq_('../../utils');

var _scope = _dereq_('../../scope');

var _core = _dereq_('../../core');

var _defaults2 = _dereq_('../defaults');

var _defaults = _interopRequireWildcard(_defaults2);

var _glVec = _dereq_('gl-vec2');

var _glVec2 = _interopRequireDefault(_glVec);

var _glVec3 = _dereq_('gl-vec3');

var _glVec4 = _interopRequireDefault(_glVec3);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var MeshSizeContext = exports.MeshSizeContext = function (_Component) {
  _inherits(MeshSizeContext, _Component);

  _createClass(MeshSizeContext, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function MeshSizeContext(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, MeshSizeContext);

    (0, _utils.assignDefaults)(initialState, MeshSizeContext.defaults());
    var computedSizeWeakMap = new WeakMap();
    return _possibleConstructorReturn(this, (MeshSizeContext.__proto__ || Object.getPrototypeOf(MeshSizeContext)).call(this, ctx, initialState, new _scope.ScopedContext(ctx, {
      size: function size(_ref) {
        var boundingBox = _ref.boundingBox,
            scale = _ref.scale;

        if (!boundingBox) {
          return [0, 0];
        } else if (computedSizeWeakMap.has(boundingBox)) {
          return computedSizeWeakMap.get(boundingBox);
        }
        if (!scale) {
          scale = [1, 1, 1];
        }
        var dimension = boundingBox && boundingBox[0].length;
        var min = boundingBox[0];
        var max = boundingBox[1];
        var computedSize = [];
        switch (dimension) {
          case 3:
            _glVec4.default.subtract(computedSize, max, min);
            _glVec4.default.multiply(computedSize, computedSize, scale);
            break;
          case 2:
            _glVec2.default.subtract(computedSize, max, min);
            _glVec2.default.multiply(computedSize, computedSize, scale);
            break;
        }
        computedSizeWeakMap.set(boundingBox, computedSize);
        return computedSize;
      }
    })));
  }

  return MeshSizeContext;
}(_core.Component);

},{"../../core":50,"../../scope":90,"../../utils":116,"../defaults":72,"gl-vec2":208,"gl-vec3":238}],72:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var uniformName = exports.uniformName = 'mesh';
var wireframePrimitive = exports.wireframePrimitive = 'line strip';
var primitive = exports.primitive = 'triangles';
var lineWidth = exports.lineWidth = 1;

},{}],73:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _context = _dereq_('./context');

Object.keys(_context).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _context[key];
    }
  });
});

var _shader = _dereq_('./shader');

Object.keys(_shader).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _shader[key];
    }
  });
});

var _state = _dereq_('./state');

Object.keys(_state).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _state[key];
    }
  });
});

var _mesh = _dereq_('./mesh');

Object.keys(_mesh).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _mesh[key];
    }
  });
});

},{"./context":70,"./mesh":74,"./shader":77,"./state":80}],74:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mesh = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _camera = _dereq_('../camera');

var _utils = _dereq_('../utils');

var _defaults2 = _dereq_('./defaults');

var _defaults = _interopRequireWildcard(_defaults2);

var _core = _dereq_('../core');

var _object3d = _dereq_('../object3d');

var _context = _dereq_('./context');

var _state = _dereq_('./state');

var _shader = _dereq_('./shader');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Mesh = exports.Mesh = function (_Component) {
  _inherits(Mesh, _Component);

  _createClass(Mesh, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function Mesh(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Mesh);

    (0, _utils.assignDefaults)(initialState, Mesh.defaults());
    if (null == initialState.geometry.complex) {
      initialState.geometry = new _core.Geometry({ complex: initialState.geometry });
    }
    var getContext = ctx.regl({});
    var draw = ctx.regl(_extends({}, initialState.regl));
    return _possibleConstructorReturn(this, (Mesh.__proto__ || Object.getPrototypeOf(Mesh)).call(this, ctx, initialState, new _object3d.Object3D(ctx, initialState), new _context.MeshContext(ctx, initialState), new _state.MeshState(ctx, initialState), new _shader.MeshShaderDefines(ctx, initialState), new _shader.MeshShaderAttributes(ctx, initialState), new _shader.MeshShaderUniforms(ctx, initialState), new _shader.MeshShader(ctx, initialState), new _camera.CameraShaderUniforms(ctx, _extends({}, initialState.camera)), function (state, block) {
      draw(state);
      getContext(block);
    }));
  }

  return Mesh;
}(_core.Component);

},{"../camera":8,"../core":50,"../object3d":87,"../utils":116,"./context":70,"./defaults":72,"./shader":77,"./state":80}],75:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeshShaderAttributes = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _shader = _dereq_('../../shader');

var _utils = _dereq_('../../utils');

var _core = _dereq_('../../core');

var _defaults2 = _dereq_('../defaults');

var _defaults = _interopRequireWildcard(_defaults2);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var MeshShaderAttributes = exports.MeshShaderAttributes = function (_Component) {
  _inherits(MeshShaderAttributes, _Component);

  _createClass(MeshShaderAttributes, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function MeshShaderAttributes(ctx, initialState) {
    _classCallCheck(this, MeshShaderAttributes);

    (0, _utils.assignDefaults)(initialState, MeshShaderAttributes.defaults());
    var geometry = initialState.geometry;

    var attributes = {};
    if (geometry) {
      attributes.position = geometry.positions || null;
      attributes.normal = geometry.normals || null;
      attributes.uv = geometry.uvs || null;
    }
    return _possibleConstructorReturn(this, (MeshShaderAttributes.__proto__ || Object.getPrototypeOf(MeshShaderAttributes)).call(this, ctx, initialState, new _shader.ShaderAttributes(ctx, attributes)));
  }

  return MeshShaderAttributes;
}(_core.Component);

},{"../../core":50,"../../shader":93,"../../utils":116,"../defaults":72}],76:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeshShaderDefines = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _utils = _dereq_('../../utils');

var _shader = _dereq_('../../shader');

var _core = _dereq_('../../core');

var _defaults2 = _dereq_('../defaults');

var _defaults = _interopRequireWildcard(_defaults2);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var MeshShaderDefines = exports.MeshShaderDefines = function (_Component) {
  _inherits(MeshShaderDefines, _Component);

  _createClass(MeshShaderDefines, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function MeshShaderDefines(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, MeshShaderDefines);

    (0, _utils.assignDefaults)(initialState, MeshShaderDefines.defaults());
    return _possibleConstructorReturn(this, (MeshShaderDefines.__proto__ || Object.getPrototypeOf(MeshShaderDefines)).call(this, ctx, initialState, new _shader.ShaderDefines(ctx, {
      GLSL_MESH_HAS_POSITION: function GLSL_MESH_HAS_POSITION(_ref) {
        var geometry = _ref.geometry;

        if (geometry.positions) {
          return true;
        }
        return null;
      },
      GLSL_MESH_HAS_NORMAL: function GLSL_MESH_HAS_NORMAL(_ref2) {
        var geometry = _ref2.geometry;

        if (geometry.normals) {
          return true;
        }
        return null;
      },
      GLSL_MESH_HAS_UV: function GLSL_MESH_HAS_UV(_ref3) {
        var geometry = _ref3.geometry;

        if (geometry.uvs) {
          return true;
        }
        return null;
      }
    })));
  }

  return MeshShaderDefines;
}(_core.Component);

},{"../../core":50,"../../shader":93,"../../utils":116,"../defaults":72}],77:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _attributes = _dereq_('./attributes');

Object.keys(_attributes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _attributes[key];
    }
  });
});

var _uniforms = _dereq_('./uniforms');

Object.keys(_uniforms).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _uniforms[key];
    }
  });
});

var _defines = _dereq_('./defines');

Object.keys(_defines).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _defines[key];
    }
  });
});

var _shader = _dereq_('./shader');

Object.keys(_shader).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _shader[key];
    }
  });
});

},{"./attributes":75,"./defines":76,"./shader":78,"./uniforms":79}],78:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeshShader = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _utils = _dereq_('../../utils');

var _core = _dereq_('../../core');

var _defaults2 = _dereq_('../defaults');

var _defaults = _interopRequireWildcard(_defaults2);

var _shader = _dereq_('../../shader');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var MeshShader = exports.MeshShader = function (_Component) {
  _inherits(MeshShader, _Component);

  _createClass(MeshShader, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }, {
    key: 'createVertexShader',
    value: function createVertexShader() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          uniformName = _ref.uniformName;

      return '\n    #define GLSL_MESH_UNIFORM_VARIABLE ' + uniformName + '\n    #include <mesh/vertex/main>\n    ';
    }
  }]);

  function MeshShader(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, MeshShader);

    (0, _utils.assignDefaults)(initialState, MeshShader.defaults());
    return _possibleConstructorReturn(this, (MeshShader.__proto__ || Object.getPrototypeOf(MeshShader)).call(this, ctx, new _shader.Shader(ctx, _extends({
      vertexShader: function vertexShader(_ref2) {
        var _vertexShader = _ref2.vertexShader;
        var uniformName = initialState.uniformName;

        if ('string' == typeof _vertexShader) {
          return _vertexShader;
        } else {
          return MeshShader.createVertexShader({ uniformName: uniformName });
        }
      }
    }, initialState))));
  }

  return MeshShader;
}(_core.Component);

},{"../../core":50,"../../shader":93,"../../utils":116,"../defaults":72}],79:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeshShaderUniforms = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _utils = _dereq_('../../utils');

var _shader = _dereq_('../../shader');

var _core = _dereq_('../../core');

var _defaults2 = _dereq_('../defaults');

var _defaults = _interopRequireWildcard(_defaults2);

var _glMat = _dereq_('gl-mat4');

var _glMat2 = _interopRequireDefault(_glMat);

var _glMat3 = _dereq_('gl-mat3');

var _glMat4 = _interopRequireDefault(_glMat3);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var kMat4Identity = _glMat2.default.identity([]);
var kMat3Identity = _glMat4.default.identity([]);

var MeshShaderUniforms = exports.MeshShaderUniforms = function (_Component) {
  _inherits(MeshShaderUniforms, _Component);

  _createClass(MeshShaderUniforms, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function MeshShaderUniforms(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, MeshShaderUniforms);

    (0, _utils.assignDefaults)(initialState, MeshShaderUniforms.defaults());
    var uniformName = initialState.uniformName;

    initialState.prefix = uniformName + '.';
    return _possibleConstructorReturn(this, (MeshShaderUniforms.__proto__ || Object.getPrototypeOf(MeshShaderUniforms)).call(this, ctx, initialState, new _shader.ShaderUniforms(ctx, initialState, {
      position: function position(ctx, args) {
        return (0, _utils.get)('position', [ctx, args, initialState]);
      },
      rotation: function rotation(ctx, args) {
        return (0, _utils.get)('rotation', [ctx, args, initialState]);
      },
      scale: function scale(ctx, args) {
        return (0, _utils.get)('scale', [ctx, args, initialState]);
      },
      modelNormal: function modelNormal(_ref) {
        var transform = _ref.transform;

        return (0, _utils.isArrayLike)(transform) ? _glMat4.default.normalFromMat4([], transform) || kMat3Identity : kMat3Identity;
      },
      model: function model(_ref2) {
        var transform = _ref2.transform;

        return (0, _utils.isArrayLike)(transform) ? transform : kMat4Identity;
      }
    })));
  }

  return MeshShaderUniforms;
}(_core.Component);

},{"../../core":50,"../../shader":93,"../../utils":116,"../defaults":72,"gl-mat3":138,"gl-mat4":156}],80:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeshState = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _utils = _dereq_('../utils');

var _core = _dereq_('../core');

var _defaults2 = _dereq_('./defaults');

var _defaults = _interopRequireWildcard(_defaults2);

var _defined = _dereq_('defined');

var _defined2 = _interopRequireDefault(_defined);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var MeshState = exports.MeshState = function (_Component) {
  _inherits(MeshState, _Component);

  _createClass(MeshState, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function MeshState(ctx, initialState) {
    _classCallCheck(this, MeshState);

    (0, _utils.assignDefaults)(initialState, MeshState.defaults());
    var geometry = initialState.geometry;

    var opts = {
      primitive: function primitive(ctx, args) {
        if ((0, _utils.get)('wireframe', [args, ctx])) {
          return (0, _utils.get)('wireframePrimitive', [args, ctx]);
        }
        return (0, _utils.get)('primitive', [args, ctx]);
      },
      lineWidth: function lineWidth(ctx, args) {
        return Math.max(1, (0, _utils.get)('lineWidth', [args, ctx]));
      }
    };
    if (geometry && geometry.cells) {
      opts.elements = function (ctx, args) {
        var cells = geometry.cells;
        var count = (0, _utils.get)('count', [args, ctx]);
        if (cells && 'number' == typeof count) {
          return cells.slice(0, (0, _defined2.default)(Math.floor(count), 0, cells.length));
        }
        return cells;
      };
    } else if (geometry) {
      opts.count = function (ctx, args) {
        return (0, _utils.get)('count', [args, ctx]) || geometry.positions.length;
      };
    }

    return _possibleConstructorReturn(this, (MeshState.__proto__ || Object.getPrototypeOf(MeshState)).call(this, ctx, initialState, ctx.regl(opts)));
  }

  return MeshState;
}(_core.Component);

},{"../core":50,"../utils":116,"./defaults":72,"defined":124}],81:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Object3DContext = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _transform = _dereq_('./transform');

var _matrix = _dereq_('./matrix');

var _trs = _dereq_('./trs');

var _utils = _dereq_('../../utils');

var _core = _dereq_('../../core');

var _defaults2 = _dereq_('../defaults');

var _defaults = _interopRequireWildcard(_defaults2);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Object3DContext = exports.Object3DContext = function (_Component) {
  _inherits(Object3DContext, _Component);

  _createClass(Object3DContext, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function Object3DContext(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Object3DContext);

    (0, _utils.assignDefaults)(initialState, Object3DContext.defaults());
    return _possibleConstructorReturn(this, (Object3DContext.__proto__ || Object.getPrototypeOf(Object3DContext)).call(this, ctx, initialState, new _trs.Object3DTRSContext(ctx, initialState), new _matrix.Object3DMatrixContext(ctx, initialState), new _transform.Object3DTransformContext(ctx, initialState)));
  }

  return Object3DContext;
}(_core.Component);

},{"../../core":50,"../../utils":116,"../defaults":86,"./matrix":83,"./transform":84,"./trs":85}],82:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _transform = _dereq_('./transform');

Object.keys(_transform).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _transform[key];
    }
  });
});

var _context = _dereq_('./context');

Object.keys(_context).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _context[key];
    }
  });
});

var _matrix = _dereq_('./matrix');

Object.keys(_matrix).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _matrix[key];
    }
  });
});

var _trs = _dereq_('./trs');

Object.keys(_trs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _trs[key];
    }
  });
});

},{"./context":81,"./matrix":83,"./transform":84,"./trs":85}],83:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Object3DMatrixContext = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _utils = _dereq_('../../utils');

var _scope = _dereq_('../../scope');

var _core = _dereq_('../../core');

var _defaults2 = _dereq_('../defaults');

var _defaults = _interopRequireWildcard(_defaults2);

var _glMat = _dereq_('gl-mat4');

var _glMat2 = _interopRequireDefault(_glMat);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Object3DMatrixContext = exports.Object3DMatrixContext = function (_Component) {
  _inherits(Object3DMatrixContext, _Component);

  _createClass(Object3DMatrixContext, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function Object3DMatrixContext(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Object3DMatrixContext);

    (0, _utils.assignDefaults)(initialState, Object3DMatrixContext.defaults());
    return _possibleConstructorReturn(this, (Object3DMatrixContext.__proto__ || Object.getPrototypeOf(Object3DMatrixContext)).call(this, ctx, initialState, new _scope.ScopedContext(ctx, {
      matrix: function matrix(ctx, args) {
        var matrix = _glMat2.default.identity([]);
        var position = (0, _utils.get)('position', [ctx, args]);
        var rotation = (0, _utils.get)('rotation', [ctx, args]);
        var scale = (0, _utils.get)('scale', [ctx, args, initialState]);
        // M = T * R * S
        _glMat2.default.fromRotationTranslation(matrix, rotation, position);
        _glMat2.default.scale(matrix, matrix, scale);
        return matrix;
      }
    })));
  }

  return Object3DMatrixContext;
}(_core.Component);

},{"../../core":50,"../../scope":90,"../../utils":116,"../defaults":86,"gl-mat4":156}],84:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Object3DTransformContext = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _utils = _dereq_('../../utils');

var _scope = _dereq_('../../scope');

var _core = _dereq_('../../core');

var _defaults2 = _dereq_('../defaults');

var _defaults = _interopRequireWildcard(_defaults2);

var _glMat = _dereq_('gl-mat4');

var _glMat2 = _interopRequireDefault(_glMat);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Object3DTransformContext = exports.Object3DTransformContext = function (_Component) {
  _inherits(Object3DTransformContext, _Component);

  _createClass(Object3DTransformContext, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function Object3DTransformContext(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Object3DTransformContext);

    (0, _utils.assignDefaults)(initialState, Object3DTransformContext.defaults());
    return _possibleConstructorReturn(this, (Object3DTransformContext.__proto__ || Object.getPrototypeOf(Object3DTransformContext)).call(this, ctx, initialState, new _scope.ScopedContext(ctx, {
      transform: function transform(ctx, args) {
        var local = ctx.matrix,
            parent = ctx.transform;

        var matrix = _glMat2.default.identity([]);

        var _ref = args || {},
            transform = _ref.transform;
        // M' = Mp * M


        if (parent) {
          _glMat2.default.multiply(matrix, parent, local);
        }
        // apply external transform from arguments to computed transform
        if (transform) {
          _glMat2.default.multiply(matrix, transform, matrix);
        }
        return matrix;
      }
    })));
  }

  return Object3DTransformContext;
}(_core.Component);

},{"../../core":50,"../../scope":90,"../../utils":116,"../defaults":86,"gl-mat4":156}],85:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Object3DTRSContext = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _utils = _dereq_('../../utils');

var _scope = _dereq_('../../scope');

var _core = _dereq_('../../core');

var _defaults2 = _dereq_('../defaults');

var _defaults = _interopRequireWildcard(_defaults2);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Object3DTRSContext = exports.Object3DTRSContext = function (_Component) {
  _inherits(Object3DTRSContext, _Component);

  _createClass(Object3DTRSContext, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function Object3DTRSContext(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Object3DTRSContext);

    (0, _utils.assignDefaults)(initialState, Object3DTRSContext.defaults());
    return _possibleConstructorReturn(this, (Object3DTRSContext.__proto__ || Object.getPrototypeOf(Object3DTRSContext)).call(this, ctx, initialState, new _scope.ScopedContext(ctx, {
      scale: function scale(ctx, args) {
        var scale = (0, _utils.get)('scale', [args, initialState, ctx]);
        if ('number' == typeof scale) {
          return [scale, scale, scale];
        }
        return scale;
      },
      position: function position(ctx, args) {
        return (0, _utils.get)('position', [args, initialState, ctx]);
      },
      rotation: function rotation(ctx, args) {
        return (0, _utils.get)('rotation', [args, initialState, ctx]);
      }
    })));
  }

  return Object3DTRSContext;
}(_core.Component);

},{"../../core":50,"../../scope":90,"../../utils":116,"../defaults":86}],86:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var rotation = exports.rotation = [0, 0, 0, 1];
var position = exports.position = [0, 0, 0];
var scale = exports.scale = [1, 1, 1];

},{}],87:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _object3d = _dereq_('./object3d');

Object.keys(_object3d).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _object3d[key];
    }
  });
});

var _context = _dereq_('./context');

Object.keys(_context).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _context[key];
    }
  });
});

},{"./context":82,"./object3d":88}],88:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Object3D = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _context = _dereq_('./context');

var _utils = _dereq_('../utils');

var _core = _dereq_('../core');

var _defaults2 = _dereq_('./defaults');

var _defaults = _interopRequireWildcard(_defaults2);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Object3D = exports.Object3D = function (_Component) {
  _inherits(Object3D, _Component);

  _createClass(Object3D, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function Object3D(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Object3D);

    (0, _utils.assignDefaults)(initialState, Object3D.defaults());
    return _possibleConstructorReturn(this, (Object3D.__proto__ || Object.getPrototypeOf(Object3D)).call(this, ctx, initialState, new _context.Object3DContext(ctx, initialState)));
  }

  return Object3D;
}(_core.Component);

},{"../core":50,"../utils":116,"./context":82,"./defaults":86}],89:[function(_dereq_,module,exports){
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scissor = undefined;

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _core = _dereq_('./core');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof2(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Scissor = exports.Scissor = function (_Component) {
  _inherits(Scissor, _Component);

  function Scissor(ctx, initialState, props) {
    var _ref;

    _classCallCheck(this, Scissor);

    for (var _len = arguments.length, children = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      children[_key - 3] = arguments[_key];
    }

    if ('function' == typeof props) {
      children.unshift(props);
    }
    if ('function' == typeof initialState) {
      children.unshift(initialState);
    }
    if ('object' != (typeof initialState === 'undefined' ? 'undefined' : _typeof(initialState))) {
      initialState = {};
    }
    if ('object' != (typeof props === 'undefined' ? 'undefined' : _typeof(props))) {
      props = initialState;
    }
    var context = ctx.regl({
      scissor: { enable: true, box: initialState.scissor }
    });
    return _possibleConstructorReturn(this, (_ref = Scissor.__proto__ || Object.getPrototypeOf(Scissor)).call.apply(_ref, [this, ctx, context].concat(children)));
  }

  return Scissor;
}(_core.Component);

},{"./core":50}],90:[function(_dereq_,module,exports){
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScopedContext = undefined;

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _core = _dereq_('./core');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof2(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var ScopedContext = exports.ScopedContext = function (_Component) {
  _inherits(ScopedContext, _Component);

  function ScopedContext(ctx, initialState, props) {
    var _ref;

    _classCallCheck(this, ScopedContext);

    for (var _len = arguments.length, children = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      children[_key - 3] = arguments[_key];
    }

    if ('function' == typeof props) {
      children.unshift(props);
    }
    if ('function' == typeof initialState) {
      children.unshift(initialState);
    }
    if ('object' != (typeof initialState === 'undefined' ? 'undefined' : _typeof(initialState))) {
      initialState = {};
    }
    if ('object' != (typeof props === 'undefined' ? 'undefined' : _typeof(props))) {
      props = initialState;
    }
    var context = ctx.regl({ context: new _core.DynamicValue(ctx, {}, props) });
    return _possibleConstructorReturn(this, (_ref = ScopedContext.__proto__ || Object.getPrototypeOf(ScopedContext)).call.apply(_ref, [this, ctx, context].concat(children)));
  }

  return ScopedContext;
}(_core.Component);

},{"./core":50}],91:[function(_dereq_,module,exports){
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShaderInstancedAttributes = exports.ShaderAttributes = undefined;

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _core = _dereq_('../core');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof2(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var ShaderAttributes = exports.ShaderAttributes = function (_Component) {
  _inherits(ShaderAttributes, _Component);

  function ShaderAttributes(ctx, initialState, props) {
    var _ref;

    _classCallCheck(this, ShaderAttributes);

    for (var _len = arguments.length, children = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      children[_key - 3] = arguments[_key];
    }

    if ('function' == typeof props) {
      children.unshift(props);
    }
    if ('function' == typeof initialState) {
      children.unshift(initialState);
    }
    if ('object' != (typeof initialState === 'undefined' ? 'undefined' : _typeof(initialState))) {
      initialState = {};
    }
    if ('object' != (typeof props === 'undefined' ? 'undefined' : _typeof(props))) {
      props = initialState;
    }
    var attributes = ctx.regl({
      attributes: new _core.WebGLShaderAttributes(ctx, initialState, props)
    });
    return _possibleConstructorReturn(this, (_ref = ShaderAttributes.__proto__ || Object.getPrototypeOf(ShaderAttributes)).call.apply(_ref, [this, ctx, {}, attributes].concat(children)));
  }

  return ShaderAttributes;
}(_core.Component);

var ShaderInstancedAttributes = exports.ShaderInstancedAttributes = function (_Component2) {
  _inherits(ShaderInstancedAttributes, _Component2);

  function ShaderInstancedAttributes(ctx, initialState, props) {
    var _ref2;

    _classCallCheck(this, ShaderInstancedAttributes);

    for (var _len2 = arguments.length, children = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
      children[_key2 - 3] = arguments[_key2];
    }

    if ('function' == typeof props) {
      children.unshift(props);
    }
    if ('function' == typeof initialState) {
      children.unshift(initialState);
    }
    if ('object' != (typeof initialState === 'undefined' ? 'undefined' : _typeof(initialState))) {
      initialState = {};
    }
    if ('object' != (typeof props === 'undefined' ? 'undefined' : _typeof(props))) {
      props = initialState;
    }
    var attributes = ctx.regl({
      attributes: new _core.WebGLShaderInstancedAttributes(ctx, initialState, props)
    });
    return _possibleConstructorReturn(this, (_ref2 = ShaderInstancedAttributes.__proto__ || Object.getPrototypeOf(ShaderInstancedAttributes)).call.apply(_ref2, [this, ctx, {}, attributes].concat(children)));
  }

  return ShaderInstancedAttributes;
}(_core.Component);

},{"../core":50}],92:[function(_dereq_,module,exports){
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShaderDefines = undefined;

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _scope = _dereq_('../scope');

var _core = _dereq_('../core');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof2(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var ShaderDefines = exports.ShaderDefines = function (_Component) {
  _inherits(ShaderDefines, _Component);

  function ShaderDefines(ctx, initialState, props) {
    _classCallCheck(this, ShaderDefines);

    for (var _len = arguments.length, children = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      children[_key - 3] = arguments[_key];
    }

    if ('function' == typeof props) {
      children.unshift(props);
    }
    if ('function' == typeof initialState) {
      children.unshift(initialState);
    }
    if ('object' != (typeof initialState === 'undefined' ? 'undefined' : _typeof(initialState))) {
      initialState = {};
    }
    if ('object' != (typeof props === 'undefined' ? 'undefined' : _typeof(props))) {
      props = initialState;
    }
    return _possibleConstructorReturn(this, (ShaderDefines.__proto__ || Object.getPrototypeOf(ShaderDefines)).call(this, ctx, initialState, new _scope.ScopedContext(ctx, initialState, {
      defines: function defines() {
        var defines = {};
        for (var prop in props) {
          var value = props[prop];
          if ('function' == typeof value) {
            defines[prop] = value.apply(undefined, arguments);
          } else {
            defines[prop] = value;
          }

          if (null == defines[prop]) {
            delete defines[prop];
          }
        }
        return defines;
      }
    })));
  }

  return ShaderDefines;
}(_core.Component);

},{"../core":50,"../scope":90}],93:[function(_dereq_,module,exports){
arguments[4][77][0].apply(exports,arguments)
},{"./attributes":91,"./defines":92,"./shader":94,"./uniforms":95,"dup":77}],94:[function(_dereq_,module,exports){
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Shader = undefined;

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _core = _dereq_('../core');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof2(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Shader = exports.Shader = function (_Component) {
  _inherits(Shader, _Component);

  _createClass(Shader, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _core.ShaderLib.defaults(), {
        defines: {}
      });
    }
  }]);

  function Shader(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Shader);

    Object.assign(initialState, Shader.defaults(), initialState);
    var defines = initialState.defines,
        shaderName = initialState.shaderName;

    var shaderLib = new _core.ShaderLib(_extends({}, initialState, { defines: defines }));

    var injectParentContext = ctx.regl({});
    var injectContext = null;

    var fragmentShaderUncompiled = null;
    var vertexShaderUncompiled = null;
    var fragmentShader = null;
    var vertexShader = null;

    var contextCache = {};
    var shaderCache = {};

    var _this = _possibleConstructorReturn(this, (Shader.__proto__ || Object.getPrototypeOf(Shader)).call(this, ctx, initialState, update));

    function update(state, block, previousState) {
      injectParentContext(function (reglContext) {
        var _state$forceCompile = state.forceCompile,
            forceCompile = _state$forceCompile === undefined ? false : _state$forceCompile;

        Object.assign(defines, _extends({}, reglContext.defines, state.defines));

        if (Object.keys(defines).length) {
          if (shaderLib.preprocessor.define(defines)) {
            forceCompile = true;
          }
        }

        if (forceCompile || shouldCompile(reglContext, state)) {
          compile(reglContext, state);
        }

        if ('function' == typeof injectContext) {
          injectContext(state, block);
        } else {
          block(state);
        }
      });
    }

    function compile(reglContext, currentState) {
      var opts = {
        context: {
          fragmentShader: function (_fragmentShader) {
            function fragmentShader(_x2) {
              return _fragmentShader.apply(this, arguments);
            }

            fragmentShader.toString = function () {
              return _fragmentShader.toString();
            };

            return fragmentShader;
          }(function (_ref) {
            var fs = _ref.fragmentShader;
            return fs || fragmentShader;
          }),
          vertexShader: function (_vertexShader) {
            function vertexShader(_x3) {
              return _vertexShader.apply(this, arguments);
            }

            vertexShader.toString = function () {
              return _vertexShader.toString();
            };

            return vertexShader;
          }(function (_ref2) {
            var vs = _ref2.vertexShader;
            return vs || vertexShader;
          })
        }
      };

      var parentOpts = {
        context: {
          defines: function (_defines) {
            function defines(_x4) {
              return _defines.apply(this, arguments);
            }

            defines.toString = function () {
              return _defines.toString();
            };

            return defines;
          }(function (_ref3) {
            var contextDefines = _ref3.defines;

            return _extends({}, contextDefines, defines);
          })
        }
      };

      if (!isShaderCached(currentState.vertexShader)) {
        compileVertexShader();
      }

      if (!isShaderCached(currentState.fragmentShader)) {
        compileFragmentShader();
      }

      injectParentContext = ctx.regl(parentOpts);

      if ('string' == typeof vertexShader) {
        opts.vert = vertexShader;
      }
      if ('string' == typeof fragmentShader) {
        opts.frag = fragmentShader;
      }
      if ('string' == typeof opts.vert || 'string' == typeof opts.frag) {
        var hash = [shaderLib.hash(opts.vert), shaderLib.hash(opts.frag)].filter(Boolean).join('');
        if (null == contextCache[hash]) {
          injectContext = ctx.regl(opts);
          contextCache[hash] = injectContext;
        }
      }

      function compileShader(type, shader) {
        var compiled = null;
        var uncompiled = null;
        if (isViableShader(shader)) {
          uncompiled = getViableShader(reglContext, currentState, shader);
          compiled = shaderLib.compile(shaderName + ' (' + type + ')', uncompiled);
          compiled = shaderLib.preprocess(compiled);
          return { compiled: compiled, uncompiled: uncompiled };
        }
        return null;
      }

      function isShaderCached(shader) {
        shader = getViableShader(reglContext, currentState, shader);
        return Boolean(shaderCache[shaderLib.hash(shader)]);
      }

      function compileVertexShader() {
        var result = compileShader('vertex', currentState.vertexShader);
        if (result) {
          vertexShader = result.compiled;
          vertexShaderUncompiled = result.uncompiled;
          shaderCache[shaderLib.hash(vertexShaderUncompiled)] = vertexShader;
        }
      }

      function compileFragmentShader() {
        var result = compileShader('fragment', currentState.fragmentShader);
        if (result) {
          fragmentShader = result.compiled;
          fragmentShaderUncompiled = result.uncompiled;
          shaderCache[shaderLib.hash(fragmentShaderUncompiled)] = fragmentShader;
        }
      }
    }

    function getViableShader(reglContext, currentState, shader) {
      if ('string' == typeof shader) {
        return shader;
      } else if ('function' == typeof shader) {
        return shader(reglContext, currentState);
      }
    }

    function isViableShader(shader) {
      return ['string', 'function'].indexOf(typeof shader === 'undefined' ? 'undefined' : _typeof(shader)) > -1;
    }

    function shouldCompile(reglContext, currentState) {
      var needsCompile = false;
      check('function' != typeof injectContext);
      checkShader(vertexShaderUncompiled, currentState.vertexShader);
      checkShader(fragmentShaderUncompiled, currentState.fragmentShader);
      return needsCompile;

      function check(cond) {
        if (cond) {
          needsCompile = true;
        }
      }

      function checkShader(current, next) {
        next = getViableShader(reglContext, currentState, next);
        if (shaderCache[shaderLib.hash(next)]) {
          return check(false);
        }
        if ('string' != typeof current && next) {
          return check(true);
        } else if ('string' == typeof next && current != next) {
          return check(true);
        }
      }
    }
    return _this;
  }

  return Shader;
}(_core.Component);

},{"../core":50}],95:[function(_dereq_,module,exports){
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShaderUniforms = undefined;

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _core = _dereq_('../core');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof2(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var ShaderUniforms = exports.ShaderUniforms = function (_Component) {
  _inherits(ShaderUniforms, _Component);

  function ShaderUniforms(ctx, initialState, props) {
    var _ref;

    _classCallCheck(this, ShaderUniforms);

    for (var _len = arguments.length, children = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      children[_key - 3] = arguments[_key];
    }

    if ('function' == typeof props) {
      children.unshift(props);
    }
    if ('function' == typeof initialState) {
      children.unshift(initialState);
    }
    if ('object' != (typeof initialState === 'undefined' ? 'undefined' : _typeof(initialState))) {
      initialState = {};
    }
    if ('object' != (typeof props === 'undefined' ? 'undefined' : _typeof(props))) {
      props = initialState;
    }
    var uniforms = ctx.regl({
      uniforms: new _core.WebGLShaderUniforms(ctx, initialState, props)
    });
    return _possibleConstructorReturn(this, (_ref = ShaderUniforms.__proto__ || Object.getPrototypeOf(ShaderUniforms)).call.apply(_ref, [this, ctx, uniforms].concat(children)));
  }

  return ShaderUniforms;
}(_core.Component);

},{"../core":50}],96:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextureContext = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _utils = _dereq_('../../../utils');

var _core = _dereq_('../../../core');

var _defaults2 = _dereq_('../defaults');

var _defaults = _interopRequireWildcard(_defaults2);

var _pointer = _dereq_('./pointer');

var _data = _dereq_('./data');

var _info = _dereq_('./info');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var TextureContext = exports.TextureContext = function (_Component) {
  _inherits(TextureContext, _Component);

  _createClass(TextureContext, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function TextureContext(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, TextureContext);

    (0, _utils.assignDefaults)(initialState, TextureContext.defaults());
    var uniformName = initialState.uniformName;
    return _possibleConstructorReturn(this, (TextureContext.__proto__ || Object.getPrototypeOf(TextureContext)).call(this, ctx, initialState, new _data.TextureDataContext(ctx, initialState), new _pointer.TexturePointerContext(ctx, initialState), new _info.TextureInfoContext(ctx, initialState)));
  }

  return TextureContext;
}(_core.Component);

},{"../../../core":50,"../../../utils":116,"../defaults":101,"./data":97,"./info":99,"./pointer":100}],97:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextureDataContext = undefined;

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _utils = _dereq_('../../utils');

var _utils2 = _dereq_('../../../utils');

var _scope = _dereq_('../../../scope');

var _core = _dereq_('../../../core');

var _defaults2 = _dereq_('../defaults');

var _defaults = _interopRequireWildcard(_defaults2);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var TextureDataContext = exports.TextureDataContext = function (_Component) {
  _inherits(TextureDataContext, _Component);

  _createClass(TextureDataContext, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function TextureDataContext(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, TextureDataContext);

    (0, _utils2.assignDefaults)(initialState, TextureDataContext.defaults());
    return _possibleConstructorReturn(this, (TextureDataContext.__proto__ || Object.getPrototypeOf(TextureDataContext)).call(this, ctx, initialState, new _scope.ScopedContext(ctx, {
      textureData: function textureData(ctx, args) {
        var data = (0, _utils2.get)('data', [args, ctx]);
        if (data && (0, _utils.isTextureDataReady)(data)) {
          var _getTextureDataResolu = (0, _utils.getTextureDataResolution)(data),
              _getTextureDataResolu2 = _slicedToArray(_getTextureDataResolu, 2),
              w = _getTextureDataResolu2[0],
              h = _getTextureDataResolu2[1];

          if (w && h) {
            return data;
          }
        }
        return null;
      }
    })));
  }

  return TextureDataContext;
}(_core.Component);

},{"../../../core":50,"../../../scope":90,"../../../utils":116,"../../utils":115,"../defaults":101}],98:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _context = _dereq_('./context');

Object.keys(_context).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _context[key];
    }
  });
});

var _pointer = _dereq_('./pointer');

Object.keys(_pointer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _pointer[key];
    }
  });
});

var _data = _dereq_('./data');

Object.keys(_data).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _data[key];
    }
  });
});

var _info = _dereq_('./info');

Object.keys(_info).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _info[key];
    }
  });
});

},{"./context":96,"./data":97,"./info":99,"./pointer":100}],99:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextureInfoContext = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _utils = _dereq_('../../utils');

var _utils2 = _dereq_('../../../utils');

var _scope = _dereq_('../../../scope');

var _core = _dereq_('../../../core');

var _defaults2 = _dereq_('../defaults');

var _defaults = _interopRequireWildcard(_defaults2);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var TextureInfoContext = exports.TextureInfoContext = function (_Component) {
  _inherits(TextureInfoContext, _Component);

  _createClass(TextureInfoContext, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function TextureInfoContext(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, TextureInfoContext);

    (0, _utils2.assignDefaults)(initialState, TextureInfoContext.defaults());
    var uniformName = initialState.uniformName;
    return _possibleConstructorReturn(this, (TextureInfoContext.__proto__ || Object.getPrototypeOf(TextureInfoContext)).call(this, ctx, initialState, new _scope.ScopedContext(ctx, {
      textureUniformName: function textureUniformName() {
        return uniformName;
      },
      textureResolution: function textureResolution(_ref) {
        var textureData = _ref.textureData;

        return (0, _utils.getTextureDataResolution)(textureData);
      }
    })));
  }

  return TextureInfoContext;
}(_core.Component);

},{"../../../core":50,"../../../scope":90,"../../../utils":116,"../../utils":115,"../defaults":101}],100:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TexturePointerContext = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _utils = _dereq_('../../../utils');

var _scope = _dereq_('../../../scope');

var _core = _dereq_('../../../core');

var _defaults2 = _dereq_('../defaults');

var _defaults = _interopRequireWildcard(_defaults2);

var _utils2 = _dereq_('../../utils');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var TexturePointerContext = exports.TexturePointerContext = function (_Component) {
  _inherits(TexturePointerContext, _Component);

  _createClass(TexturePointerContext, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function TexturePointerContext(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, TexturePointerContext);

    (0, _utils.assignDefaults)(initialState, TexturePointerContext.defaults());
    var texture = ctx.regl.texture(_extends({}, initialState.texture));
    var previouslyUploadedData = null;
    return _possibleConstructorReturn(this, (TexturePointerContext.__proto__ || Object.getPrototypeOf(TexturePointerContext)).call(this, ctx, initialState, new _scope.ScopedContext(ctx, {
      texturePointer: function texturePointer(_ref) {
        var textureData = _ref.textureData;

        if (textureData) {
          if ((0, _utils2.isImage)(textureData)) {
            if (textureData != previouslyUploadedData) {
              texture(_extends({}, initialState.texture, { data: textureData }));
              previouslyUploadedData = textureData;
            }
          } else if ((0, _utils2.isVideo)(textureData) && (0, _utils2.isTextureDataReady)(textureData)) {
            texture(_extends({}, initialState.texture, { data: textureData }));
            previouslyUploadedData = textureData;
          }
        }
        return texture;
      }
    })));
  }

  return TexturePointerContext;
}(_core.Component);

},{"../../../core":50,"../../../scope":90,"../../../utils":116,"../../utils":115,"../defaults":101}],101:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var uniformName = exports.uniformName = 'tex2d';
var texture = exports.texture = {
  min: 'linear',
  mag: 'linear'
};

},{}],102:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _uniforms = _dereq_('./uniforms');

Object.keys(_uniforms).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _uniforms[key];
    }
  });
});

var _context = _dereq_('./context');

Object.keys(_context).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _context[key];
    }
  });
});

var _texture = _dereq_('./texture');

Object.keys(_texture).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _texture[key];
    }
  });
});

},{"./context":98,"./texture":103,"./uniforms":104}],103:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Texture = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _uniforms = _dereq_('./uniforms');

var _context = _dereq_('./context');

var _utils = _dereq_('../../utils');

var _defaults2 = _dereq_('./defaults');

var _defaults = _interopRequireWildcard(_defaults2);

var _core = _dereq_('../../core');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Texture = exports.Texture = function (_Component) {
  _inherits(Texture, _Component);

  _createClass(Texture, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function Texture(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Texture);

    (0, _utils.assignDefaults)(initialState, Texture.defaults());
    return _possibleConstructorReturn(this, (Texture.__proto__ || Object.getPrototypeOf(Texture)).call(this, ctx, initialState, new _context.TextureContext(ctx, initialState), new _uniforms.TextureShaderUniforms(ctx, initialState)));
  }

  return Texture;
}(_core.Component);

},{"../../core":50,"../../utils":116,"./context":98,"./defaults":101,"./uniforms":104}],104:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextureShaderUniforms = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _utils = _dereq_('../../utils');

var _shader = _dereq_('../../shader');

var _core = _dereq_('../../core');

var _defaults2 = _dereq_('./defaults');

var _defaults = _interopRequireWildcard(_defaults2);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var TextureShaderUniforms = exports.TextureShaderUniforms = function (_Component) {
  _inherits(TextureShaderUniforms, _Component);

  _createClass(TextureShaderUniforms, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function TextureShaderUniforms(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, TextureShaderUniforms);

    (0, _utils.assignDefaults)(initialState, TextureShaderUniforms.defaults());
    var uniformName = initialState.uniformName;
    return _possibleConstructorReturn(this, (TextureShaderUniforms.__proto__ || Object.getPrototypeOf(TextureShaderUniforms)).call(this, ctx, initialState, new _shader.ShaderUniforms(ctx, { prefix: uniformName + '.' }, {
      resolution: function resolution(_ref) {
        var textureResolution = _ref.textureResolution;
        return textureResolution;
      },
      data: function data(_ref2) {
        var texturePointer = _ref2.texturePointer;
        return texturePointer;
      }
    })));
  }

  return TextureShaderUniforms;
}(_core.Component);

},{"../../core":50,"../../shader":93,"../../utils":116,"./defaults":101}],105:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CubeTextureContext = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _utils = _dereq_('../../../utils');

var _core = _dereq_('../../../core');

var _defaults2 = _dereq_('../defaults');

var _defaults = _interopRequireWildcard(_defaults2);

var _pointer = _dereq_('./pointer');

var _data = _dereq_('./data');

var _info = _dereq_('./info');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var CubeTextureContext = exports.CubeTextureContext = function (_Component) {
  _inherits(CubeTextureContext, _Component);

  _createClass(CubeTextureContext, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function CubeTextureContext(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, CubeTextureContext);

    (0, _utils.assignDefaults)(initialState, CubeTextureContext.defaults());
    var uniformName = initialState.uniformName;
    return _possibleConstructorReturn(this, (CubeTextureContext.__proto__ || Object.getPrototypeOf(CubeTextureContext)).call(this, ctx, initialState, new _data.CubeTextureDataContext(ctx, initialState), new _pointer.CubeTexturePointerContext(ctx, initialState), new _info.CubeTextureInfoContext(ctx, initialState)));
  }

  return CubeTextureContext;
}(_core.Component);

},{"../../../core":50,"../../../utils":116,"../defaults":110,"./data":106,"./info":108,"./pointer":109}],106:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CubeTextureDataContext = undefined;

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var _utils = _dereq_('../../../utils');

var _scope = _dereq_('../../../scope');

var _core = _dereq_('../../../core');

var _defaults = _dereq_('../defaults');

var defaults = _interopRequireWildcard(_defaults);

var _utils2 = _dereq_('../../utils');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var CubeTextureDataContext = exports.CubeTextureDataContext = function (_Component) {
  _inherits(CubeTextureDataContext, _Component);

  function CubeTextureDataContext(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, CubeTextureDataContext);

    (0, _utils.assignDefaults)(initialState, CubeTexture.defaults());
    return _possibleConstructorReturn(this, (CubeTextureDataContext.__proto__ || Object.getPrototypeOf(CubeTextureDataContext)).call(this, ctx, initialState, new _scope.ScopedContext(ctx, {
      cubeTextureData: function cubeTextureData(ctx, args) {
        var data = (0, _utils.get)('data', [args, ctx, initialState]);
        if (data && Array.isArray(data) && data.some(_utils2.isCubeTextureDataReady)) {
          var _getCubeTextureDataRe = (0, _utils2.getCubeTextureDataResolution)(data),
              _getCubeTextureDataRe2 = _slicedToArray(_getCubeTextureDataRe, 2),
              w = _getCubeTextureDataRe2[0],
              h = _getCubeTextureDataRe2[1];

          if (w && h) {
            return [].concat(_toConsumableArray(data));
          }
        }
        return null;
      }
    })));
  }

  return CubeTextureDataContext;
}(_core.Component);

},{"../../../core":50,"../../../scope":90,"../../../utils":116,"../../utils":115,"../defaults":110}],107:[function(_dereq_,module,exports){
arguments[4][98][0].apply(exports,arguments)
},{"./context":105,"./data":106,"./info":108,"./pointer":109,"dup":98}],108:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CubeTextureInfoContext = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _utils = _dereq_('../../utils');

var _utils2 = _dereq_('../../../utils');

var _scope = _dereq_('../../../scope');

var _core = _dereq_('../../../core');

var _defaults2 = _dereq_('../defaults');

var _defaults = _interopRequireWildcard(_defaults2);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var CubeTextureInfoContext = exports.CubeTextureInfoContext = function (_Component) {
  _inherits(CubeTextureInfoContext, _Component);

  _createClass(CubeTextureInfoContext, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function CubeTextureInfoContext(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, CubeTextureInfoContext);

    (0, _utils2.assignDefaults)(initialState, CubeTextureContext.defaults());
    var uniformName = initialState.uniformName;
    return _possibleConstructorReturn(this, (CubeTextureInfoContext.__proto__ || Object.getPrototypeOf(CubeTextureInfoContext)).call(this, ctx, initialState, new _scope.ScopedContext(ctx, {
      cubeTextureUniformName: function cubeTextureUniformName() {
        return uniformName;
      },
      cubeTextureResolution: function cubeTextureResolution(_ref) {
        var cubeTextureData = _ref.cubeTextureData;

        return (0, _utils.getCubeTextureDataResolution)(cubeTextureData);
      }
    })));
  }

  return CubeTextureInfoContext;
}(_core.Component);

},{"../../../core":50,"../../../scope":90,"../../../utils":116,"../../utils":115,"../defaults":110}],109:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CubeTexturePointerContext = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _utils = _dereq_('../../../utils');

var _scope = _dereq_('../../../scope');

var _core = _dereq_('../../../core');

var _defaults = _dereq_('../defaults');

var defaults = _interopRequireWildcard(_defaults);

var _utils2 = _dereq_('../../utils');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var CubeTexturePointerContext = exports.CubeTexturePointerContext = function (_Component) {
  _inherits(CubeTexturePointerContext, _Component);

  function CubeTexturePointerContext(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, CubeTexturePointerContext);

    (0, _utils.assignDefaults)(initialState, CubeTexture.defaults());
    var cubeTexture = ctx.regl.cube(_extends({}, initialState.texture));
    var faces = Array(6).fill(null);
    return _possibleConstructorReturn(this, (CubeTexturePointerContext.__proto__ || Object.getPrototypeOf(CubeTexturePointerContext)).call(this, ctx, initialState, new _scope.ScopedContext(ctx, {
      cubeTexturePointer: function cubeTexturePointer(_ref) {
        var cubeTextureData = _ref.cubeTextureData;

        var needsUpload = false;
        if (Array.isArray(cubeTextureData)) {
          for (var i = 0; i < faces.length; ++i) {
            if (faces[i] != cubeTextureData[i]) {
              if ((0, _utils2.isCubeTextureDataReady)(cubeTextureData[[i]])) {
                faces[i] = cubeTextureData[i];
                needsUpload = true;
              }
            }
          }
        }
        var resolution = (0, _utils2.getCubeTextureDataResolution)(faces);
        for (var _i = 0; _i < faces.length; ++_i) {
          if (null == faces[_i] || !(0, _utils2.isCubeTextureDataReady)(faces[_i])) {
            faces[_i] = { shape: resolution };
          }
        }
        if (needsUpload) {
          cubeTexture.apply(undefined, _toConsumableArray(faces));
        }
        return cubeTexture;
      }
    })));
  }

  return CubeTexturePointerContext;
}(_core.Component);

},{"../../../core":50,"../../../scope":90,"../../../utils":116,"../../utils":115,"../defaults":110}],110:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var uniformName = exports.uniformName = 'texCube';
var texture = exports.texture = {
  min: 'linear',
  mag: 'linear'
};

},{}],111:[function(_dereq_,module,exports){
arguments[4][102][0].apply(exports,arguments)
},{"./context":107,"./texture":112,"./uniforms":113,"dup":102}],112:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CubeTexture = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _uniforms = _dereq_('./uniforms');

var _context = _dereq_('./context');

var _utils = _dereq_('../../utils');

var _defaults2 = _dereq_('./defaults');

var _defaults = _interopRequireWildcard(_defaults2);

var _core = _dereq_('../../core');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var CubeTexture = exports.CubeTexture = function (_Component) {
  _inherits(CubeTexture, _Component);

  _createClass(CubeTexture, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function CubeTexture(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, CubeTexture);

    (0, _utils.assignDefaults)(initialState, CubeTexture.defaults());
    return _possibleConstructorReturn(this, (CubeTexture.__proto__ || Object.getPrototypeOf(CubeTexture)).call(this, ctx, initialState, new _context.CubeTextureContext(ctx, initialState), new _uniforms.CubeTextureShaderUniforms(ctx, initialState)));
  }

  return CubeTexture;
}(_core.Component);

},{"../../core":50,"../../utils":116,"./context":107,"./defaults":110,"./uniforms":113}],113:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CubeTextureShaderUniforms = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _utils = _dereq_('../../utils');

var _shader = _dereq_('../../shader');

var _core = _dereq_('../../core');

var _defaults2 = _dereq_('./defaults');

var _defaults = _interopRequireWildcard(_defaults2);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var CubeTextureShaderUniforms = exports.CubeTextureShaderUniforms = function (_Component) {
  _inherits(CubeTextureShaderUniforms, _Component);

  _createClass(CubeTextureShaderUniforms, null, [{
    key: 'defaults',
    value: function defaults() {
      return _extends({}, _defaults);
    }
  }]);

  function CubeTextureShaderUniforms(ctx) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, CubeTextureShaderUniforms);

    (0, _utils.assignDefaults)(initialState, CubeTextureUniforms.defaults());
    var uniformName = initialState.uniformName;
    return _possibleConstructorReturn(this, (CubeTextureShaderUniforms.__proto__ || Object.getPrototypeOf(CubeTextureShaderUniforms)).call(this, ctx, initialState, new _shader.ShaderUniforms(ctx, { prefix: uniformName + '.' }, {
      resolution: function resolution(_ref) {
        var cubeTextureResolution = _ref.cubeTextureResolution;
        return cubeTextureResolution;
      },
      data: function data(_ref2) {
        var cubeTexturePointer = _ref2.cubeTexturePointer;
        return cubeTexturePointer;
      }
    })));
  }

  return CubeTextureShaderUniforms;
}(_core.Component);

},{"../../core":50,"../../shader":93,"../../utils":116,"./defaults":110}],114:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cube = _dereq_('./cube');

Object.keys(_cube).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _cube[key];
    }
  });
});

var _d = _dereq_('./2d');

Object.keys(_d).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _d[key];
    }
  });
});

},{"./2d":102,"./cube":111}],115:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isImage = exports.isVideo = exports.isCanvas = undefined;
exports.isTextureDataReady = isTextureDataReady;
exports.getTextureDataResolution = getTextureDataResolution;
exports.isCubeTextureDataReady = isCubeTextureDataReady;
exports.getCubeTextureDataResolution = getCubeTextureDataResolution;

var _window = _dereq_('global/window');

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var HTMLVideoElement = _window2.default.HTMLVideoElement;
var HTMLCanvasElement = _window2.default.HTMLCanvasElement;
var HTMLImageElement = _window2.default.HTMLImageElement;

// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState

var _ref = HTMLVideoElement || {};
var _ref$HAVE_ENOUGH_DATA = _ref.HAVE_ENOUGH_DATA;
var HAVE_ENOUGH_DATA = _ref$HAVE_ENOUGH_DATA === undefined ? 4 : _ref$HAVE_ENOUGH_DATA;

var isCanvas = exports.isCanvas = function isCanvas(d) {
  return d instanceof HTMLCanvasElement;
};
var isVideo = exports.isVideo = function isVideo(d) {
  return d instanceof HTMLVideoElement;
};
var isImage = exports.isImage = function isImage(d) {
  return d instanceof HTMLImageElement;
};

function isTextureDataReady(data) {
  var resolution = getTextureDataResolution(data);
  if (!resolution[0] || !resolution[1]) {
    return false;
  }
  if (isVideo(data) && data.readyState >= HAVE_ENOUGH_DATA) {
    return true;
  } else if (isImage(data) || isCanvas(data)) {
    if (data.width && data.height) {
      return true;
    }
  }
  return false;
}

function getTextureDataResolution(data) {
  if (isImage(data) || isCanvas(data)) {
    return [data.width, data.height];
  } else if (isVideo(data)) {
    return [data.videoWidth || 0, data.videoHeight || 0];
  } else if (data && data.shape) {
    return data.shape;
  } else {
    return [0, 0];
  }
}

function isCubeTextureDataReady(data) {
  if (isVideo(data) && data.readyState >= HAVE_ENOUGH_DATA) {
    return true;
  } else if (isImage(data) || isCanvas(data)) {
    if (data.width && data.height) {
      return true;
    }
  }
  return false;
}

function getCubeTextureDataResolution(data) {
  if (Array.isArray(data)) {
    data = data.filter(function (d) {
      return d;
    }).filter(function (d) {
      return isImage(d) || isVideo(d) || d.shape.every(Boolean);
    })[0];
    return getCubeTextureDataResolution(data);
  }
  if (isImage(data) || isCanvas(data)) {
    return [data.width, data.height];
  } else if (isVideo(data)) {
    return [data.videoWidth || 0, data.videoHeight || 0];
  } else if (data && data.shape) {
    return data.shape;
  } else {
    return [0, 0];
  }
}

},{"global/window":272}],116:[function(_dereq_,module,exports){
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isArrayLike = exports.ensureRGB = exports.ensureRGBA = exports.clampToMaxSize = exports.scaleWithCanvas = exports.makePowerOfTwo = exports.getScreenOrientation = exports.createCanvas = exports.nearestPowerOfTwo = exports.get = exports.assignDefaults = exports.lerp = exports.radians = exports.debug = undefined;

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _debug = _dereq_('debug');

var _debug2 = _interopRequireDefault(_debug);

var _document = _dereq_('global/document');

var _document2 = _interopRequireDefault(_document);

var _window = _dereq_('global/window');

var _window2 = _interopRequireDefault(_window);

var _clamp = _dereq_('clamp');

var _clamp2 = _interopRequireDefault(_clamp);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}

<<<<<<< HEAD
<<<<<<< HEAD
var kLibraryVersion = '0.3.1';
=======
var kLibraryVersion = '0.3.0';
>>>>>>> Release 0.3.0
=======
var kLibraryVersion = '0.3.1';
>>>>>>> Release 0.3.1
var TypedArray = Object.getPrototypeOf(Float32Array.prototype).constructor;

var HTMLImageElement = _window2.default.HTMLImageElement;
var HTMLCanvasElement = _window2.default.HTMLCanvasElement;
var debug = exports.debug = (0, _debug2.default)('[axis@' + kLibraryVersion + ']');

var radians = exports.radians = function radians(n) {
  return n == n ? n * Math.PI / 180.0 : 0;
};
var lerp = exports.lerp = function lerp(v0, v1, t) {
  return v0 * (1 - t) + v1 * t;
};

var assignDefaults = exports.assignDefaults = function assignDefaults(object, defaults) {
  return Object.assign(object, _extends({}, defaults, object));
};

var get = exports.get = function get(k, objs) {
  return (objs.filter(function (o) {
    return o;
  }).find(function (o) {
    return null != o[k];
  }) || {})[k];
};

var nearestPowerOfTwo = exports.nearestPowerOfTwo = function nearestPowerOfTwo(value) {
  return Math.pow(2, Math.round(Math.log(value) / Math.LN2));
};

var createCanvas = exports.createCanvas = function createCanvas() {
  return _document2.default.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
};

var getScreenOrientation = exports.getScreenOrientation = function getScreenOrientation() {
  var type = null;
  if ('object' == _typeof(_window2.default.screen)) {
    if ('object' == _typeof(_window2.default.screen.orientation)) {
      type = _window2.default.screen.orientation.type;
    } else if ('string' == typeof _window2.default.screen.orientation) {
      type = _window2.default.screen.orientation;
    } else if ('object' == _typeof(_window2.default.screen.mozOrientation)) {
      type = _window2.default.screen.mozOrientation.type;
    } else if ('string' == typeof _window2.default.screen.mozOrientation) {
      type = _window2.default.screen.mozOrientation;
    }
  }
  switch (type) {
    case 'landscape-primary':
      return 90;
    case 'landscape-secondary':
      return -90;
    case 'portrait-secondary':
      return 180;
    case 'portrait-primary':
      return 0;
    default:
      return _window2.default.orientation || _window2.default.mozOrientation || 0;
  }
};

var makePowerOfTwo = exports.makePowerOfTwo = function makePowerOfTwo(image) {
  if (image instanceof HTMLImageElement || image instanceof HTMLCanvasElement) {
    var canvas = createCanvas();
    var context = canvas.getContext('2d');
    canvas.width = nearestPowerOfTwo(image.width);
    canvas.height = nearestPowerOfTwo(image.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas;
  }
  return image;
};

var scaleWithCanvas = exports.scaleWithCanvas = function scaleWithCanvas(image, scale, scaleNearestPowerOfTwo) {
  var canvas = createCanvas();
  var context = canvas.getContext('2d');
  var width = image.width,
      height = image.height;

  if (scaleNearestPowerOfTwo) {
    width = nearestPowerOfTwo(width);
    height = nearestPowerOfTwo(height);
  }
  canvas.width = Math.floor(image.width * scale);
  canvas.height = Math.floor(image.height * scale);
  context.drawImage(image, 0, 0, width, height, 0, 0, canvas.width, canvas.height);
  return canvas;
};

var clampToMaxSize = exports.clampToMaxSize = function clampToMaxSize(image, maxSize, scaleNearestPowerOfTwo) {
  if (image.width > maxSize || image.height > maxSize) {
    var scale = maxSize / Math.max(image.width, image.height);
    return scaleWithCanvas(image, scale, scaleNearestPowerOfTwo);
  } else {
    return scaleNearestPowerOfTwo ? makePowerOfTwo(image) : image;
  }
};

var ensureRGBA = exports.ensureRGBA = function ensureRGBA(color) {
  color = [].concat(_toConsumableArray(color || []));
  for (var i = 0; i < 3; ++i) {
    if ('number' != typeof color[i]) {
      color[i] = 0;
    } else {
      color[i] = (0, _clamp2.default)(color[i], 0, 1);
    }
  }
  if ('number' != typeof color[3]) {
    color[3] = 1;
  } else {
    color[3] = (0, _clamp2.default)(color[3], 0, 1);
  }
  return [].concat(_toConsumableArray(color)).slice(0, 4);
};

var ensureRGB = exports.ensureRGB = function ensureRGB(color) {
  return ensureRGBA(color).slice(0, 3);
};

var isArrayLike = exports.isArrayLike = function isArrayLike(array) {
  return Boolean(array && (Array.isArray(array) || array instanceof TypedArray || 'number' == array.length || 'function' == typeof array[Symbol.iterator]));
};

},{"clamp":121,"debug":122,"global/document":271,"global/window":272}],117:[function(_dereq_,module,exports){
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Viewport = undefined;

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _core = _dereq_('./core');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof2(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Viewport = exports.Viewport = function (_Component) {
  _inherits(Viewport, _Component);

  function Viewport(ctx, initialState, props) {
    var _ref;

    _classCallCheck(this, Viewport);

    for (var _len = arguments.length, children = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      children[_key - 3] = arguments[_key];
    }

    if ('function' == typeof props) {
      children.unshift(props);
    }
    if ('function' == typeof initialState) {
      children.unshift(initialState);
    }
    if ('object' != (typeof initialState === 'undefined' ? 'undefined' : _typeof(initialState))) {
      initialState = {};
    }
    if ('object' != (typeof props === 'undefined' ? 'undefined' : _typeof(props))) {
      props = initialState;
    }
    var context = ctx.regl({ viewport: initialState.viewport });
    return _possibleConstructorReturn(this, (_ref = Viewport.__proto__ || Object.getPrototypeOf(Viewport)).call.apply(_ref, [this, ctx, context].concat(children)));
  }

  return Viewport;
}(_core.Component);

},{"./core":50}],118:[function(_dereq_,module,exports){
"use strict";

module.exports = balanced;
function balanced(a, b, str) {
  var r = range(a, b, str);

  return r && {
    start: r[0],
    end: r[1],
    pre: str.slice(0, r[0]),
    body: str.slice(r[0] + a.length, r[1]),
    post: str.slice(r[1] + b.length)
  };
}

balanced.range = range;
function range(a, b, str) {
  var begs, beg, left, right, result;
  var ai = str.indexOf(a);
  var bi = str.indexOf(b, ai + 1);
  var i = ai;

  if (ai >= 0 && bi > 0) {
    begs = [];
    left = str.length;

    while (i < str.length && i >= 0 && !result) {
      if (i == ai) {
        begs.push(i);
        ai = str.indexOf(a, i + 1);
      } else if (begs.length == 1) {
        result = [begs.pop(), bi];
      } else {
        beg = begs.pop();
        if (beg < left) {
          left = beg;
          right = bi;
        }

        bi = str.indexOf(b, i + 1);
      }

      i = ai < bi && ai >= 0 ? ai : bi;
    }

    if (begs.length) {
      result = [left, right];
    }
  }

  return result;
}

},{}],119:[function(_dereq_,module,exports){
'use strict';

module.exports = findBounds;

function findBounds(points) {
  var n = points.length;
  if (n === 0) {
    return [[], []];
  }
  var d = points[0].length;
  var lo = points[0].slice();
  var hi = points[0].slice();
  for (var i = 1; i < n; ++i) {
    var p = points[i];
    for (var j = 0; j < d; ++j) {
      var x = p[j];
      lo[j] = Math.min(lo[j], x);
      hi[j] = Math.max(hi[j], x);
    }
  }
  return [lo, hi];
}

},{}],120:[function(_dereq_,module,exports){
"use strict";

},{}],121:[function(_dereq_,module,exports){
"use strict";

module.exports = clamp;

function clamp(value, min, max) {
  return min < max ? value < min ? min : value > max ? max : value : value < max ? max : value > min ? min : value;
}

},{}],122:[function(_dereq_,module,exports){
(function (process){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = _dereq_('./debug');
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();

/**
 * Colors.
 */

exports.colors = ['lightseagreen', 'forestgreen', 'goldenrod', 'dodgerblue', 'darkorchid', 'crimson'];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance ||
  // is firebug? http://stackoverflow.com/a/398120/376773
  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) ||
  // is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 ||
  // double check webkit in userAgent just in case we are in a worker
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit');

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function (match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === (typeof console === 'undefined' ? 'undefined' : _typeof(console)) && console.log && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch (e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch (e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

}).call(this,_dereq_('_process'))
},{"./debug":123,"_process":291}],123:[function(_dereq_,module,exports){
'use strict';

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = _dereq_('ms');

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0,
      i;

  for (i in namespace) {
    hash = (hash << 5) - hash + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

},{"ms":286}],124:[function(_dereq_,module,exports){
"use strict";

module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],125:[function(_dereq_,module,exports){
'use strict';

var synth = _dereq_('synthetic-dom-events');

var on = function on(element, name, fn, capture) {
    return element.addEventListener(name, fn, capture || false);
};

var off = function off(element, name, fn, capture) {
    return element.removeEventListener(name, fn, capture || false);
};

var once = function once(element, name, fn, capture) {
    function tmp(ev) {
        off(element, name, tmp, capture);
        fn(ev);
    }
    on(element, name, tmp, capture);
};

var emit = function emit(element, name, opt) {
    var ev = synth(name, opt);
    element.dispatchEvent(ev);
};

if (!document.addEventListener) {
    on = function on(element, name, fn) {
        return element.attachEvent('on' + name, fn);
    };
}

if (!document.removeEventListener) {
    off = function off(element, name, fn) {
        return element.detachEvent('on' + name, fn);
    };
}

if (!document.dispatchEvent) {
    emit = function emit(element, name, opt) {
        var ev = synth(name, opt);
        return element.fireEvent('on' + ev.type, ev);
    };
}

module.exports = {
    on: on,
    off: off,
    once: once,
    emit: emit
};

},{"synthetic-dom-events":293}],126:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function (n) {
  if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function (type) {
  var er, handler, len, args, i, listeners;

  if (!this._events) this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler)) return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++) {
      listeners[i].apply(this, args);
    }
  }

  return true;
};

EventEmitter.prototype.addListener = function (type, listener) {
  var m;

  if (!isFunction(listener)) throw TypeError('listener must be a function');

  if (!this._events) this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener) this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function (type, listener) {
  if (!isFunction(listener)) throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function (type, listener) {
  var list, position, length, i;

  if (!isFunction(listener)) throw TypeError('listener must be a function');

  if (!this._events || !this._events[type]) return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener || isFunction(list.listener) && list.listener === listener) {
    delete this._events[type];
    if (this._events.removeListener) this.emit('removeListener', type, listener);
  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener || list[i].listener && list[i].listener === listener) {
        position = i;
        break;
      }
    }

    if (position < 0) return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener) this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function (type) {
  var key, listeners;

  if (!this._events) return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0) this._events = {};else if (this._events[type]) delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length) {
      this.removeListener(type, listeners[listeners.length - 1]);
    }
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function (type) {
  var ret;
  if (!this._events || !this._events[type]) ret = [];else if (isFunction(this._events[type])) ret = [this._events[type]];else ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function (type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener)) return 1;else if (evlistener) return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function (emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],127:[function(_dereq_,module,exports){
'use strict';

var invert = _dereq_('gl-mat4/invert');
var scratch = new Float32Array(16);

module.exports = getEyeVector;

function getEyeVector(viewMatrix, out) {
  if (!out) out = [];
  invert(scratch, viewMatrix);
  out[0] = scratch[12];
  out[1] = scratch[13];
  out[2] = scratch[14];
  return out;
}

},{"gl-mat4/invert":157}],128:[function(_dereq_,module,exports){
"use strict";

module.exports = adjoint;

/**
 * Calculates the adjugate of a mat3
 *
 * @alias mat3.adjoint
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function adjoint(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];

  out[0] = a11 * a22 - a12 * a21;
  out[1] = a02 * a21 - a01 * a22;
  out[2] = a01 * a12 - a02 * a11;
  out[3] = a12 * a20 - a10 * a22;
  out[4] = a00 * a22 - a02 * a20;
  out[5] = a02 * a10 - a00 * a12;
  out[6] = a10 * a21 - a11 * a20;
  out[7] = a01 * a20 - a00 * a21;
  out[8] = a00 * a11 - a01 * a10;

  return out;
}

},{}],129:[function(_dereq_,module,exports){
"use strict";

module.exports = clone;

/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @alias mat3.clone
 * @param {mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */
function clone(a) {
  var out = new Float32Array(9);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}

},{}],130:[function(_dereq_,module,exports){
"use strict";

module.exports = copy;

/**
 * Copy the values from one mat3 to another
 *
 * @alias mat3.copy
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}

},{}],131:[function(_dereq_,module,exports){
"use strict";

module.exports = create;

/**
 * Creates a new identity mat3
 *
 * @alias mat3.create
 * @returns {mat3} a new 3x3 matrix
 */
function create() {
  var out = new Float32Array(9);
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}

},{}],132:[function(_dereq_,module,exports){
"use strict";

module.exports = determinant;

/**
 * Calculates the determinant of a mat3
 *
 * @alias mat3.determinant
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */
function determinant(a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];

  return a00 * (a22 * a11 - a12 * a21) + a01 * (a12 * a20 - a22 * a10) + a02 * (a21 * a10 - a11 * a20);
}

},{}],133:[function(_dereq_,module,exports){
"use strict";

module.exports = frob;

/**
 * Returns Frobenius norm of a mat3
 *
 * @alias mat3.frob
 * @param {mat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
function frob(a) {
  return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3] + a[4] * a[4] + a[5] * a[5] + a[6] * a[6] + a[7] * a[7] + a[8] * a[8]);
}

},{}],134:[function(_dereq_,module,exports){
"use strict";

module.exports = fromMat2d;

/**
 * Copies the values from a mat2d into a mat3
 *
 * @alias mat3.fromMat2d
 * @param {mat3} out the receiving matrix
 * @param {mat2d} a the matrix to copy
 * @returns {mat3} out
 **/
function fromMat2d(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = 0;

  out[3] = a[2];
  out[4] = a[3];
  out[5] = 0;

  out[6] = a[4];
  out[7] = a[5];
  out[8] = 1;

  return out;
}

},{}],135:[function(_dereq_,module,exports){
"use strict";

module.exports = fromMat4;

/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @alias mat3.fromMat4
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */
function fromMat4(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[4];
  out[4] = a[5];
  out[5] = a[6];
  out[6] = a[8];
  out[7] = a[9];
  out[8] = a[10];
  return out;
}

},{}],136:[function(_dereq_,module,exports){
"use strict";

module.exports = fromQuat;

/**
* Calculates a 3x3 matrix from the given quaternion
*
* @alias mat3.fromQuat
* @param {mat3} out mat3 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat3} out
*/
function fromQuat(out, q) {
  var x = q[0];
  var y = q[1];
  var z = q[2];
  var w = q[3];

  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;

  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;

  out[0] = 1 - yy - zz;
  out[3] = yx - wz;
  out[6] = zx + wy;

  out[1] = yx + wz;
  out[4] = 1 - xx - zz;
  out[7] = zy - wx;

  out[2] = zx - wy;
  out[5] = zy + wx;
  out[8] = 1 - xx - yy;

  return out;
}

},{}],137:[function(_dereq_,module,exports){
"use strict";

module.exports = identity;

/**
 * Set a mat3 to the identity matrix
 *
 * @alias mat3.identity
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}

},{}],138:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  adjoint: _dereq_('./adjoint'),
  clone: _dereq_('./clone'),
  copy: _dereq_('./copy'),
  create: _dereq_('./create'),
  determinant: _dereq_('./determinant'),
  frob: _dereq_('./frob'),
  fromMat2: _dereq_('./from-mat2'),
  fromMat4: _dereq_('./from-mat4'),
  fromQuat: _dereq_('./from-quat'),
  identity: _dereq_('./identity'),
  invert: _dereq_('./invert'),
  multiply: _dereq_('./multiply'),
  normalFromMat4: _dereq_('./normal-from-mat4'),
  rotate: _dereq_('./rotate'),
  scale: _dereq_('./scale'),
  str: _dereq_('./str'),
  translate: _dereq_('./translate'),
  transpose: _dereq_('./transpose')
};

},{"./adjoint":128,"./clone":129,"./copy":130,"./create":131,"./determinant":132,"./frob":133,"./from-mat2":134,"./from-mat4":135,"./from-quat":136,"./identity":137,"./invert":139,"./multiply":140,"./normal-from-mat4":141,"./rotate":142,"./scale":143,"./str":144,"./translate":145,"./transpose":146}],139:[function(_dereq_,module,exports){
"use strict";

module.exports = invert;

/**
 * Inverts a mat3
 *
 * @alias mat3.invert
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function invert(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];

  var b01 = a22 * a11 - a12 * a21;
  var b11 = -a22 * a10 + a12 * a20;
  var b21 = a21 * a10 - a11 * a20;

  // Calculate the determinant
  var det = a00 * b01 + a01 * b11 + a02 * b21;

  if (!det) return null;
  det = 1.0 / det;

  out[0] = b01 * det;
  out[1] = (-a22 * a01 + a02 * a21) * det;
  out[2] = (a12 * a01 - a02 * a11) * det;
  out[3] = b11 * det;
  out[4] = (a22 * a00 - a02 * a20) * det;
  out[5] = (-a12 * a00 + a02 * a10) * det;
  out[6] = b21 * det;
  out[7] = (-a21 * a00 + a01 * a20) * det;
  out[8] = (a11 * a00 - a01 * a10) * det;

  return out;
}

},{}],140:[function(_dereq_,module,exports){
"use strict";

module.exports = multiply;

/**
 * Multiplies two mat3's
 *
 * @alias mat3.multiply
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
function multiply(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];

  var b00 = b[0],
      b01 = b[1],
      b02 = b[2];
  var b10 = b[3],
      b11 = b[4],
      b12 = b[5];
  var b20 = b[6],
      b21 = b[7],
      b22 = b[8];

  out[0] = b00 * a00 + b01 * a10 + b02 * a20;
  out[1] = b00 * a01 + b01 * a11 + b02 * a21;
  out[2] = b00 * a02 + b01 * a12 + b02 * a22;

  out[3] = b10 * a00 + b11 * a10 + b12 * a20;
  out[4] = b10 * a01 + b11 * a11 + b12 * a21;
  out[5] = b10 * a02 + b11 * a12 + b12 * a22;

  out[6] = b20 * a00 + b21 * a10 + b22 * a20;
  out[7] = b20 * a01 + b21 * a11 + b22 * a21;
  out[8] = b20 * a02 + b21 * a12 + b22 * a22;

  return out;
}

},{}],141:[function(_dereq_,module,exports){
"use strict";

module.exports = normalFromMat4;

/**
* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
*
* @alias mat3.normalFromMat4
* @param {mat3} out mat3 receiving operation result
* @param {mat4} a Mat4 to derive the normal matrix from
*
* @returns {mat3} out
*/
function normalFromMat4(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];

  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32;

  // Calculate the determinant
  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) return null;
  det = 1.0 / det;

  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

  out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

  out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

  return out;
}

},{}],142:[function(_dereq_,module,exports){
"use strict";

module.exports = rotate;

/**
 * Rotates a mat3 by the given angle
 *
 * @alias mat3.rotate
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
function rotate(out, a, rad) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];

  var s = Math.sin(rad);
  var c = Math.cos(rad);

  out[0] = c * a00 + s * a10;
  out[1] = c * a01 + s * a11;
  out[2] = c * a02 + s * a12;

  out[3] = c * a10 - s * a00;
  out[4] = c * a11 - s * a01;
  out[5] = c * a12 - s * a02;

  out[6] = a20;
  out[7] = a21;
  out[8] = a22;

  return out;
}

},{}],143:[function(_dereq_,module,exports){
"use strict";

module.exports = scale;

/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @alias mat3.scale
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
function scale(out, a, v) {
  var x = v[0];
  var y = v[1];

  out[0] = x * a[0];
  out[1] = x * a[1];
  out[2] = x * a[2];

  out[3] = y * a[3];
  out[4] = y * a[4];
  out[5] = y * a[5];

  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];

  return out;
}

},{}],144:[function(_dereq_,module,exports){
'use strict';

module.exports = str;

/**
 * Returns a string representation of a mat3
 *
 * @alias mat3.str
 * @param {mat3} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
function str(a) {
  return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' + a[8] + ')';
}

},{}],145:[function(_dereq_,module,exports){
"use strict";

module.exports = translate;

/**
 * Translate a mat3 by the given vector
 *
 * @alias mat3.translate
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */
function translate(out, a, v) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  var x = v[0],
      y = v[1];

  out[0] = a00;
  out[1] = a01;
  out[2] = a02;

  out[3] = a10;
  out[4] = a11;
  out[5] = a12;

  out[6] = x * a00 + y * a10 + a20;
  out[7] = x * a01 + y * a11 + a21;
  out[8] = x * a02 + y * a12 + a22;

  return out;
}

},{}],146:[function(_dereq_,module,exports){
"use strict";

module.exports = transpose;

/**
 * Transpose the values of a mat3
 *
 * @alias mat3.transpose
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    var a01 = a[1],
        a02 = a[2],
        a12 = a[5];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a01;
    out[5] = a[7];
    out[6] = a02;
    out[7] = a12;
  } else {
    out[0] = a[0];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a[1];
    out[4] = a[4];
    out[5] = a[7];
    out[6] = a[2];
    out[7] = a[5];
    out[8] = a[8];
  }

  return out;
}

},{}],147:[function(_dereq_,module,exports){
"use strict";

module.exports = adjoint;

/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function adjoint(out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11],
        a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15];

    out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
    out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
    out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
    out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
    out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
    out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
    return out;
};

},{}],148:[function(_dereq_,module,exports){
"use strict";

module.exports = clone;

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
function clone(a) {
    var out = new Float32Array(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

},{}],149:[function(_dereq_,module,exports){
"use strict";

module.exports = copy;

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

},{}],150:[function(_dereq_,module,exports){
"use strict";

module.exports = create;

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
function create() {
    var out = new Float32Array(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

},{}],151:[function(_dereq_,module,exports){
"use strict";

module.exports = determinant;

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
function determinant(a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11],
        a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15],
        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};

},{}],152:[function(_dereq_,module,exports){
"use strict";

module.exports = fromQuat;

/**
 * Creates a matrix from a quaternion rotation.
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @returns {mat4} out
 */
function fromQuat(out, q) {
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,
        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};

},{}],153:[function(_dereq_,module,exports){
"use strict";

module.exports = fromRotationTranslation;

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
function fromRotationTranslation(out, q, v) {
    // Quaternion math
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,
        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;

    return out;
};

},{}],154:[function(_dereq_,module,exports){
"use strict";

module.exports = frustum;

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
function frustum(out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left),
        tb = 1 / (top - bottom),
        nf = 1 / (near - far);
    out[0] = near * 2 * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = near * 2 * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = far * near * 2 * nf;
    out[15] = 0;
    return out;
};

},{}],155:[function(_dereq_,module,exports){
"use strict";

module.exports = identity;

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

},{}],156:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  create: _dereq_('./create'),
  clone: _dereq_('./clone'),
  copy: _dereq_('./copy'),
  identity: _dereq_('./identity'),
  transpose: _dereq_('./transpose'),
  invert: _dereq_('./invert'),
  adjoint: _dereq_('./adjoint'),
  determinant: _dereq_('./determinant'),
  multiply: _dereq_('./multiply'),
  translate: _dereq_('./translate'),
  scale: _dereq_('./scale'),
  rotate: _dereq_('./rotate'),
  rotateX: _dereq_('./rotateX'),
  rotateY: _dereq_('./rotateY'),
  rotateZ: _dereq_('./rotateZ'),
  fromRotationTranslation: _dereq_('./fromRotationTranslation'),
  fromQuat: _dereq_('./fromQuat'),
  frustum: _dereq_('./frustum'),
  perspective: _dereq_('./perspective'),
  perspectiveFromFieldOfView: _dereq_('./perspectiveFromFieldOfView'),
  ortho: _dereq_('./ortho'),
  lookAt: _dereq_('./lookAt'),
  str: _dereq_('./str')
};

},{"./adjoint":147,"./clone":148,"./copy":149,"./create":150,"./determinant":151,"./fromQuat":152,"./fromRotationTranslation":153,"./frustum":154,"./identity":155,"./invert":157,"./lookAt":158,"./multiply":159,"./ortho":160,"./perspective":161,"./perspectiveFromFieldOfView":162,"./rotate":163,"./rotateX":164,"./rotateY":165,"./rotateZ":166,"./scale":167,"./str":168,"./translate":169,"./transpose":170}],157:[function(_dereq_,module,exports){
"use strict";

module.exports = invert;

/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function invert(out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11],
        a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15],
        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,


    // Calculate the determinant
    det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};

},{}],158:[function(_dereq_,module,exports){
'use strict';

var identity = _dereq_('./identity');

module.exports = lookAt;

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
function lookAt(out, eye, center, up) {
    var x0,
        x1,
        x2,
        y0,
        y1,
        y2,
        z0,
        z1,
        z2,
        len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (Math.abs(eyex - centerx) < 0.000001 && Math.abs(eyey - centery) < 0.000001 && Math.abs(eyez - centerz) < 0.000001) {
        return identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
};

},{"./identity":155}],159:[function(_dereq_,module,exports){
"use strict";

module.exports = multiply;

/**
 * Multiplies two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
function multiply(out, a, b) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11],
        a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15];

    // Cache only the current line of the second matrix
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[4];b1 = b[5];b2 = b[6];b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[8];b1 = b[9];b2 = b[10];b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[12];b1 = b[13];b2 = b[14];b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
};

},{}],160:[function(_dereq_,module,exports){
"use strict";

module.exports = ortho;

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function ortho(out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
};

},{}],161:[function(_dereq_,module,exports){
"use strict";

module.exports = perspective;

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function perspective(out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = 2 * far * near * nf;
    out[15] = 0;
    return out;
};

},{}],162:[function(_dereq_,module,exports){
"use strict";

module.exports = perspectiveFromFieldOfView;

/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function perspectiveFromFieldOfView(out, fov, near, far) {
    var upTan = Math.tan(fov.upDegrees * Math.PI / 180.0),
        downTan = Math.tan(fov.downDegrees * Math.PI / 180.0),
        leftTan = Math.tan(fov.leftDegrees * Math.PI / 180.0),
        rightTan = Math.tan(fov.rightDegrees * Math.PI / 180.0),
        xScale = 2.0 / (leftTan + rightTan),
        yScale = 2.0 / (upTan + downTan);

    out[0] = xScale;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = 0.0;
    out[5] = yScale;
    out[6] = 0.0;
    out[7] = 0.0;
    out[8] = -((leftTan - rightTan) * xScale * 0.5);
    out[9] = (upTan - downTan) * yScale * 0.5;
    out[10] = far / (near - far);
    out[11] = -1.0;
    out[12] = 0.0;
    out[13] = 0.0;
    out[14] = far * near / (near - far);
    out[15] = 0.0;
    return out;
}

},{}],163:[function(_dereq_,module,exports){
"use strict";

module.exports = rotate;

/**
 * Rotates a mat4 by the given angle
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
function rotate(out, a, rad, axis) {
    var x = axis[0],
        y = axis[1],
        z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s,
        c,
        t,
        a00,
        a01,
        a02,
        a03,
        a10,
        a11,
        a12,
        a13,
        a20,
        a21,
        a22,
        a23,
        b00,
        b01,
        b02,
        b10,
        b11,
        b12,
        b20,
        b21,
        b22;

    if (Math.abs(len) < 0.000001) {
        return null;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0];a01 = a[1];a02 = a[2];a03 = a[3];
    a10 = a[4];a11 = a[5];a12 = a[6];a13 = a[7];
    a20 = a[8];a21 = a[9];a22 = a[10];a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c;b01 = y * x * t + z * s;b02 = z * x * t - y * s;
    b10 = x * y * t - z * s;b11 = y * y * t + c;b12 = z * y * t + x * s;
    b20 = x * z * t + y * s;b21 = y * z * t - x * s;b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) {
        // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};

},{}],164:[function(_dereq_,module,exports){
"use strict";

module.exports = rotateX;

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateX(out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) {
        // If the source and destination differ, copy the unchanged rows
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
};

},{}],165:[function(_dereq_,module,exports){
"use strict";

module.exports = rotateY;

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateY(out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) {
        // If the source and destination differ, copy the unchanged rows
        out[4] = a[4];
        out[5] = a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
};

},{}],166:[function(_dereq_,module,exports){
"use strict";

module.exports = rotateZ;

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateZ(out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];

    if (a !== out) {
        // If the source and destination differ, copy the unchanged last row
        out[8] = a[8];
        out[9] = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
};

},{}],167:[function(_dereq_,module,exports){
"use strict";

module.exports = scale;

/**
 * Scales the mat4 by the dimensions in the given vec3
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
function scale(out, a, v) {
    var x = v[0],
        y = v[1],
        z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

},{}],168:[function(_dereq_,module,exports){
'use strict';

module.exports = str;

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
function str(a) {
  return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' + a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
};

},{}],169:[function(_dereq_,module,exports){
"use strict";

module.exports = translate;

/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
function translate(out, a, v) {
    var x = v[0],
        y = v[1],
        z = v[2],
        a00,
        a01,
        a02,
        a03,
        a10,
        a11,
        a12,
        a13,
        a20,
        a21,
        a22,
        a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0];a01 = a[1];a02 = a[2];a03 = a[3];
        a10 = a[4];a11 = a[5];a12 = a[6];a13 = a[7];
        a20 = a[8];a21 = a[9];a22 = a[10];a23 = a[11];

        out[0] = a00;out[1] = a01;out[2] = a02;out[3] = a03;
        out[4] = a10;out[5] = a11;out[6] = a12;out[7] = a13;
        out[8] = a20;out[9] = a21;out[10] = a22;out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
};

},{}],170:[function(_dereq_,module,exports){
"use strict";

module.exports = transpose;

/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function transpose(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1],
            a02 = a[2],
            a03 = a[3],
            a12 = a[6],
            a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }

    return out;
};

},{}],171:[function(_dereq_,module,exports){
'use strict';

/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */
module.exports = _dereq_('gl-vec4/add');

},{"gl-vec4/add":260}],172:[function(_dereq_,module,exports){
"use strict";

module.exports = calculateW;

/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate W component of
 * @returns {quat} out
 */
function calculateW(out, a) {
  var x = a[0],
      y = a[1],
      z = a[2];

  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
  return out;
}

},{}],173:[function(_dereq_,module,exports){
'use strict';

/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */
module.exports = _dereq_('gl-vec4/clone');

},{"gl-vec4/clone":261}],174:[function(_dereq_,module,exports){
"use strict";

module.exports = conjugate;

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */
function conjugate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a[3];
  return out;
}

},{}],175:[function(_dereq_,module,exports){
'use strict';

/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */
module.exports = _dereq_('gl-vec4/copy');

},{"gl-vec4/copy":262}],176:[function(_dereq_,module,exports){
"use strict";

module.exports = create;

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */
function create() {
  var out = new Float32Array(4);
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}

},{}],177:[function(_dereq_,module,exports){
'use strict';

/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */
module.exports = _dereq_('gl-vec4/dot');

},{"gl-vec4/dot":263}],178:[function(_dereq_,module,exports){
"use strict";

module.exports = fromMat3;

/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */
function fromMat3(out, m) {
  // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
  // article "Quaternion Calculus and Fast Animation".
  var fTrace = m[0] + m[4] + m[8];
  var fRoot;

  if (fTrace > 0.0) {
    // |w| > 1/2, may as well choose w > 1/2
    fRoot = Math.sqrt(fTrace + 1.0); // 2w
    out[3] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot; // 1/(4w)
    out[0] = (m[5] - m[7]) * fRoot;
    out[1] = (m[6] - m[2]) * fRoot;
    out[2] = (m[1] - m[3]) * fRoot;
  } else {
    // |w| <= 1/2
    var i = 0;
    if (m[4] > m[0]) {
      i = 1;
    }
    if (m[8] > m[i * 3 + i]) {
      i = 2;
    }
    var j = (i + 1) % 3;
    var k = (i + 2) % 3;

    fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
    out[i] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
    out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
    out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
  }

  return out;
}

},{}],179:[function(_dereq_,module,exports){
'use strict';

/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */
module.exports = _dereq_('gl-vec4/fromValues');

},{"gl-vec4/fromValues":264}],180:[function(_dereq_,module,exports){
"use strict";

module.exports = identity;

/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
function identity(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}

},{}],181:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  add: _dereq_('./add'),
  calculateW: _dereq_('./calculateW'),
  clone: _dereq_('./clone'),
  conjugate: _dereq_('./conjugate'),
  copy: _dereq_('./copy'),
  create: _dereq_('./create'),
  dot: _dereq_('./dot'),
  fromMat3: _dereq_('./fromMat3'),
  fromValues: _dereq_('./fromValues'),
  identity: _dereq_('./identity'),
  invert: _dereq_('./invert'),
  length: _dereq_('./length'),
  lerp: _dereq_('./lerp'),
  multiply: _dereq_('./multiply'),
  normalize: _dereq_('./normalize'),
  rotateX: _dereq_('./rotateX'),
  rotateY: _dereq_('./rotateY'),
  rotateZ: _dereq_('./rotateZ'),
  rotationTo: _dereq_('./rotationTo'),
  scale: _dereq_('./scale'),
  set: _dereq_('./set'),
  setAxes: _dereq_('./setAxes'),
  setAxisAngle: _dereq_('./setAxisAngle'),
  slerp: _dereq_('./slerp'),
  sqlerp: _dereq_('./sqlerp'),
  squaredLength: _dereq_('./squaredLength')
};

},{"./add":171,"./calculateW":172,"./clone":173,"./conjugate":174,"./copy":175,"./create":176,"./dot":177,"./fromMat3":178,"./fromValues":179,"./identity":180,"./invert":182,"./length":183,"./lerp":184,"./multiply":185,"./normalize":186,"./rotateX":187,"./rotateY":188,"./rotateZ":189,"./rotationTo":190,"./scale":191,"./set":192,"./setAxes":193,"./setAxisAngle":194,"./slerp":195,"./sqlerp":196,"./squaredLength":197}],182:[function(_dereq_,module,exports){
"use strict";

module.exports = invert;

/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */
function invert(out, a) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3,
      invDot = dot ? 1.0 / dot : 0;

  // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

  out[0] = -a0 * invDot;
  out[1] = -a1 * invDot;
  out[2] = -a2 * invDot;
  out[3] = a3 * invDot;
  return out;
}

},{}],183:[function(_dereq_,module,exports){
'use strict';

/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 * @function
 */
module.exports = _dereq_('gl-vec4/length');

},{"gl-vec4/length":265}],184:[function(_dereq_,module,exports){
'use strict';

/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 * @function
 */
module.exports = _dereq_('gl-vec4/lerp');

},{"gl-vec4/lerp":266}],185:[function(_dereq_,module,exports){
"use strict";

module.exports = multiply;

/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */
function multiply(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3],
      bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];

  out[0] = ax * bw + aw * bx + ay * bz - az * by;
  out[1] = ay * bw + aw * by + az * bx - ax * bz;
  out[2] = az * bw + aw * bz + ax * by - ay * bx;
  out[3] = aw * bw - ax * bx - ay * by - az * bz;
  return out;
}

},{}],186:[function(_dereq_,module,exports){
'use strict';

/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */
module.exports = _dereq_('gl-vec4/normalize');

},{"gl-vec4/normalize":267}],187:[function(_dereq_,module,exports){
"use strict";

module.exports = rotateX;

/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
function rotateX(out, a, rad) {
  rad *= 0.5;

  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3],
      bx = Math.sin(rad),
      bw = Math.cos(rad);

  out[0] = ax * bw + aw * bx;
  out[1] = ay * bw + az * bx;
  out[2] = az * bw - ay * bx;
  out[3] = aw * bw - ax * bx;
  return out;
}

},{}],188:[function(_dereq_,module,exports){
"use strict";

module.exports = rotateY;

/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
function rotateY(out, a, rad) {
  rad *= 0.5;

  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3],
      by = Math.sin(rad),
      bw = Math.cos(rad);

  out[0] = ax * bw - az * by;
  out[1] = ay * bw + aw * by;
  out[2] = az * bw + ax * by;
  out[3] = aw * bw - ay * by;
  return out;
}

},{}],189:[function(_dereq_,module,exports){
"use strict";

module.exports = rotateZ;

/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
function rotateZ(out, a, rad) {
  rad *= 0.5;

  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3],
      bz = Math.sin(rad),
      bw = Math.cos(rad);

  out[0] = ax * bw + ay * bz;
  out[1] = ay * bw - ax * bz;
  out[2] = az * bw + aw * bz;
  out[3] = aw * bw - az * bz;
  return out;
}

},{}],190:[function(_dereq_,module,exports){
'use strict';

var vecDot = _dereq_('gl-vec3/dot');
var vecCross = _dereq_('gl-vec3/cross');
var vecLength = _dereq_('gl-vec3/length');
var vecNormalize = _dereq_('gl-vec3/normalize');

var quatNormalize = _dereq_('./normalize');
var quatAxisAngle = _dereq_('./setAxisAngle');

module.exports = rotationTo;

var tmpvec3 = [0, 0, 0];
var xUnitVec3 = [1, 0, 0];
var yUnitVec3 = [0, 1, 0];

/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {vec3} a the initial vector
 * @param {vec3} b the destination vector
 * @returns {quat} out
 */
function rotationTo(out, a, b) {
  var dot = vecDot(a, b);
  if (dot < -0.999999) {
    vecCross(tmpvec3, xUnitVec3, a);
    if (vecLength(tmpvec3) < 0.000001) {
      vecCross(tmpvec3, yUnitVec3, a);
    }
    vecNormalize(tmpvec3, tmpvec3);
    quatAxisAngle(out, tmpvec3, Math.PI);
    return out;
  } else if (dot > 0.999999) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
  } else {
    vecCross(tmpvec3, a, b);
    out[0] = tmpvec3[0];
    out[1] = tmpvec3[1];
    out[2] = tmpvec3[2];
    out[3] = 1 + dot;
    return quatNormalize(out, out);
  }
}

},{"./normalize":186,"./setAxisAngle":194,"gl-vec3/cross":232,"gl-vec3/dot":235,"gl-vec3/length":240,"gl-vec3/normalize":246}],191:[function(_dereq_,module,exports){
'use strict';

/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */
module.exports = _dereq_('gl-vec4/scale');

},{"gl-vec4/scale":268}],192:[function(_dereq_,module,exports){
'use strict';

/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */
module.exports = _dereq_('gl-vec4/set');

},{"gl-vec4/set":269}],193:[function(_dereq_,module,exports){
'use strict';

var mat3create = _dereq_('gl-mat3/create');
var fromMat3 = _dereq_('./fromMat3');
var normalize = _dereq_('./normalize');

module.exports = setAxes;

var matr = mat3create();

/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {vec3} view  the vector representing the viewing direction
 * @param {vec3} right the vector representing the local "right" direction
 * @param {vec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */
function setAxes(out, view, right, up) {
  matr[0] = right[0];
  matr[3] = right[1];
  matr[6] = right[2];

  matr[1] = up[0];
  matr[4] = up[1];
  matr[7] = up[2];

  matr[2] = -view[0];
  matr[5] = -view[1];
  matr[8] = -view[2];

  return normalize(out, fromMat3(out, matr));
}

},{"./fromMat3":178,"./normalize":186,"gl-mat3/create":131}],194:[function(_dereq_,module,exports){
"use strict";

module.exports = setAxisAngle;

/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/
function setAxisAngle(out, axis, rad) {
  rad = rad * 0.5;
  var s = Math.sin(rad);
  out[0] = s * axis[0];
  out[1] = s * axis[1];
  out[2] = s * axis[2];
  out[3] = Math.cos(rad);
  return out;
}

},{}],195:[function(_dereq_,module,exports){
"use strict";

module.exports = slerp;

/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */
function slerp(out, a, b, t) {
  // benchmarks:
  //    http://jsperf.com/quaternion-slerp-implementations

  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3],
      bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];

  var omega, cosom, sinom, scale0, scale1;

  // calc cosine
  cosom = ax * bx + ay * by + az * bz + aw * bw;
  // adjust signs (if necessary)
  if (cosom < 0.0) {
    cosom = -cosom;
    bx = -bx;
    by = -by;
    bz = -bz;
    bw = -bw;
  }
  // calculate coefficients
  if (1.0 - cosom > 0.000001) {
    // standard case (slerp)
    omega = Math.acos(cosom);
    sinom = Math.sin(omega);
    scale0 = Math.sin((1.0 - t) * omega) / sinom;
    scale1 = Math.sin(t * omega) / sinom;
  } else {
    // "from" and "to" quaternions are very close
    //  ... so we can do a linear interpolation
    scale0 = 1.0 - t;
    scale1 = t;
  }
  // calculate final values
  out[0] = scale0 * ax + scale1 * bx;
  out[1] = scale0 * ay + scale1 * by;
  out[2] = scale0 * az + scale1 * bz;
  out[3] = scale0 * aw + scale1 * bw;

  return out;
}

},{}],196:[function(_dereq_,module,exports){
'use strict';

var slerp = _dereq_('./slerp');

module.exports = sqlerp;

var temp1 = [0, 0, 0, 1];
var temp2 = [0, 0, 0, 1];

/**
 * Performs a spherical linear interpolation with two control points
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {quat} c the third operand
 * @param {quat} d the fourth operand
 * @param {Number} t interpolation amount
 * @returns {quat} out
 */
function sqlerp(out, a, b, c, d, t) {
  slerp(temp1, a, d, t);
  slerp(temp2, b, c, t);
  slerp(out, temp1, temp2, 2 * t * (1 - t));

  return out;
}

},{"./slerp":195}],197:[function(_dereq_,module,exports){
'use strict';

/**
 * Calculates the squared length of a quat
 *
 * @param {quat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */
module.exports = _dereq_('gl-vec4/squaredLength');

},{"gl-vec4/squaredLength":270}],198:[function(_dereq_,module,exports){
"use strict";

module.exports = add;

/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  return out;
}

},{}],199:[function(_dereq_,module,exports){
"use strict";

module.exports = clone;

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */
function clone(a) {
  var out = new Float32Array(2);
  out[0] = a[0];
  out[1] = a[1];
  return out;
}

},{}],200:[function(_dereq_,module,exports){
"use strict";

module.exports = copy;

/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  return out;
}

},{}],201:[function(_dereq_,module,exports){
"use strict";

module.exports = create;

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
function create() {
  var out = new Float32Array(2);
  out[0] = 0;
  out[1] = 0;
  return out;
}

},{}],202:[function(_dereq_,module,exports){
"use strict";

module.exports = cross;

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */
function cross(out, a, b) {
  var z = a[0] * b[1] - a[1] * b[0];
  out[0] = out[1] = 0;
  out[2] = z;
  return out;
}

},{}],203:[function(_dereq_,module,exports){
"use strict";

module.exports = distance;

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
function distance(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return Math.sqrt(x * x + y * y);
}

},{}],204:[function(_dereq_,module,exports){
"use strict";

module.exports = divide;

/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  return out;
}

},{}],205:[function(_dereq_,module,exports){
"use strict";

module.exports = dot;

/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}

},{}],206:[function(_dereq_,module,exports){
'use strict';

module.exports = forEach;

var vec = _dereq_('./create')();

/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
function forEach(a, stride, offset, count, fn, arg) {
    var i, l;
    if (!stride) {
        stride = 2;
    }

    if (!offset) {
        offset = 0;
    }

    if (count) {
        l = Math.min(count * stride + offset, a.length);
    } else {
        l = a.length;
    }

    for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
    }

    return a;
}

},{"./create":201}],207:[function(_dereq_,module,exports){
"use strict";

module.exports = fromValues;

/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */
function fromValues(x, y) {
  var out = new Float32Array(2);
  out[0] = x;
  out[1] = y;
  return out;
}

},{}],208:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  create: _dereq_('./create'),
  clone: _dereq_('./clone'),
  fromValues: _dereq_('./fromValues'),
  copy: _dereq_('./copy'),
  set: _dereq_('./set'),
  add: _dereq_('./add'),
  subtract: _dereq_('./subtract'),
  multiply: _dereq_('./multiply'),
  divide: _dereq_('./divide'),
  min: _dereq_('./min'),
  max: _dereq_('./max'),
  scale: _dereq_('./scale'),
  scaleAndAdd: _dereq_('./scaleAndAdd'),
  distance: _dereq_('./distance'),
  squaredDistance: _dereq_('./squaredDistance'),
  length: _dereq_('./length'),
  squaredLength: _dereq_('./squaredLength'),
  negate: _dereq_('./negate'),
  normalize: _dereq_('./normalize'),
  dot: _dereq_('./dot'),
  cross: _dereq_('./cross'),
  lerp: _dereq_('./lerp'),
  random: _dereq_('./random'),
  transformMat2: _dereq_('./transformMat2'),
  transformMat2d: _dereq_('./transformMat2d'),
  transformMat3: _dereq_('./transformMat3'),
  transformMat4: _dereq_('./transformMat4'),
  forEach: _dereq_('./forEach')
};

},{"./add":198,"./clone":199,"./copy":200,"./create":201,"./cross":202,"./distance":203,"./divide":204,"./dot":205,"./forEach":206,"./fromValues":207,"./length":209,"./lerp":210,"./max":211,"./min":212,"./multiply":213,"./negate":214,"./normalize":215,"./random":216,"./scale":217,"./scaleAndAdd":218,"./set":219,"./squaredDistance":220,"./squaredLength":221,"./subtract":222,"./transformMat2":223,"./transformMat2d":224,"./transformMat3":225,"./transformMat4":226}],209:[function(_dereq_,module,exports){
"use strict";

module.exports = length;

/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
function length(a) {
    var x = a[0],
        y = a[1];
    return Math.sqrt(x * x + y * y);
}

},{}],210:[function(_dereq_,module,exports){
"use strict";

module.exports = lerp;

/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */
function lerp(out, a, b, t) {
    var ax = a[0],
        ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
}

},{}],211:[function(_dereq_,module,exports){
"use strict";

module.exports = max;

/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  return out;
}

},{}],212:[function(_dereq_,module,exports){
"use strict";

module.exports = min;

/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  return out;
}

},{}],213:[function(_dereq_,module,exports){
"use strict";

module.exports = multiply;

/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  return out;
}

},{}],214:[function(_dereq_,module,exports){
"use strict";

module.exports = negate;

/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */
function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  return out;
}

},{}],215:[function(_dereq_,module,exports){
"use strict";

module.exports = normalize;

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
function normalize(out, a) {
    var x = a[0],
        y = a[1];
    var len = x * x + y * y;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
    }
    return out;
}

},{}],216:[function(_dereq_,module,exports){
"use strict";

module.exports = random;

/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */
function random(out, scale) {
  scale = scale || 1.0;
  var r = Math.random() * 2.0 * Math.PI;
  out[0] = Math.cos(r) * scale;
  out[1] = Math.sin(r) * scale;
  return out;
}

},{}],217:[function(_dereq_,module,exports){
"use strict";

module.exports = scale;

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */
function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  return out;
}

},{}],218:[function(_dereq_,module,exports){
"use strict";

module.exports = scaleAndAdd;

/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */
function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  return out;
}

},{}],219:[function(_dereq_,module,exports){
"use strict";

module.exports = set;

/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */
function set(out, x, y) {
  out[0] = x;
  out[1] = y;
  return out;
}

},{}],220:[function(_dereq_,module,exports){
"use strict";

module.exports = squaredDistance;

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
function squaredDistance(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return x * x + y * y;
}

},{}],221:[function(_dereq_,module,exports){
"use strict";

module.exports = squaredLength;

/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
function squaredLength(a) {
    var x = a[0],
        y = a[1];
    return x * x + y * y;
}

},{}],222:[function(_dereq_,module,exports){
"use strict";

module.exports = subtract;

/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  return out;
}

},{}],223:[function(_dereq_,module,exports){
"use strict";

module.exports = transformMat2;

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat2(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
}

},{}],224:[function(_dereq_,module,exports){
"use strict";

module.exports = transformMat2d;

/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat2d(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
}

},{}],225:[function(_dereq_,module,exports){
"use strict";

module.exports = transformMat3;

/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat3(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
}

},{}],226:[function(_dereq_,module,exports){
"use strict";

module.exports = transformMat4;

/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat4(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
}

},{}],227:[function(_dereq_,module,exports){
"use strict";

module.exports = add;

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}

},{}],228:[function(_dereq_,module,exports){
'use strict';

module.exports = angle;

var fromValues = _dereq_('./fromValues');
var normalize = _dereq_('./normalize');
var dot = _dereq_('./dot');

/**
 * Get the angle between two 3D vectors
 * @param {vec3} a The first operand
 * @param {vec3} b The second operand
 * @returns {Number} The angle in radians
 */
function angle(a, b) {
    var tempA = fromValues(a[0], a[1], a[2]);
    var tempB = fromValues(b[0], b[1], b[2]);

    normalize(tempA, tempA);
    normalize(tempB, tempB);

    var cosine = dot(tempA, tempB);

    if (cosine > 1.0) {
        return 0;
    } else {
        return Math.acos(cosine);
    }
}

},{"./dot":235,"./fromValues":237,"./normalize":246}],229:[function(_dereq_,module,exports){
"use strict";

module.exports = clone;

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
function clone(a) {
  var out = new Float32Array(3);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}

},{}],230:[function(_dereq_,module,exports){
"use strict";

module.exports = copy;

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}

},{}],231:[function(_dereq_,module,exports){
"use strict";

module.exports = create;

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
function create() {
    var out = new Float32Array(3);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
}

},{}],232:[function(_dereq_,module,exports){
"use strict";

module.exports = cross;

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function cross(out, a, b) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        bx = b[0],
        by = b[1],
        bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
}

},{}],233:[function(_dereq_,module,exports){
"use strict";

module.exports = distance;

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
function distance(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return Math.sqrt(x * x + y * y + z * z);
}

},{}],234:[function(_dereq_,module,exports){
"use strict";

module.exports = divide;

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  return out;
}

},{}],235:[function(_dereq_,module,exports){
"use strict";

module.exports = dot;

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

},{}],236:[function(_dereq_,module,exports){
'use strict';

module.exports = forEach;

var vec = _dereq_('./create')();

/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
function forEach(a, stride, offset, count, fn, arg) {
    var i, l;
    if (!stride) {
        stride = 3;
    }

    if (!offset) {
        offset = 0;
    }

    if (count) {
        l = Math.min(count * stride + offset, a.length);
    } else {
        l = a.length;
    }

    for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        vec[2] = a[i + 2];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
        a[i + 2] = vec[2];
    }

    return a;
}

},{"./create":231}],237:[function(_dereq_,module,exports){
"use strict";

module.exports = fromValues;

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
function fromValues(x, y, z) {
  var out = new Float32Array(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}

},{}],238:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  create: _dereq_('./create'),
  clone: _dereq_('./clone'),
  angle: _dereq_('./angle'),
  fromValues: _dereq_('./fromValues'),
  copy: _dereq_('./copy'),
  set: _dereq_('./set'),
  add: _dereq_('./add'),
  subtract: _dereq_('./subtract'),
  multiply: _dereq_('./multiply'),
  divide: _dereq_('./divide'),
  min: _dereq_('./min'),
  max: _dereq_('./max'),
  scale: _dereq_('./scale'),
  scaleAndAdd: _dereq_('./scaleAndAdd'),
  distance: _dereq_('./distance'),
  squaredDistance: _dereq_('./squaredDistance'),
  length: _dereq_('./length'),
  squaredLength: _dereq_('./squaredLength'),
  negate: _dereq_('./negate'),
  inverse: _dereq_('./inverse'),
  normalize: _dereq_('./normalize'),
  dot: _dereq_('./dot'),
  cross: _dereq_('./cross'),
  lerp: _dereq_('./lerp'),
  random: _dereq_('./random'),
  transformMat4: _dereq_('./transformMat4'),
  transformMat3: _dereq_('./transformMat3'),
  transformQuat: _dereq_('./transformQuat'),
  rotateX: _dereq_('./rotateX'),
  rotateY: _dereq_('./rotateY'),
  rotateZ: _dereq_('./rotateZ'),
  forEach: _dereq_('./forEach')
};

},{"./add":227,"./angle":228,"./clone":229,"./copy":230,"./create":231,"./cross":232,"./distance":233,"./divide":234,"./dot":235,"./forEach":236,"./fromValues":237,"./inverse":239,"./length":240,"./lerp":241,"./max":242,"./min":243,"./multiply":244,"./negate":245,"./normalize":246,"./random":247,"./rotateX":248,"./rotateY":249,"./rotateZ":250,"./scale":251,"./scaleAndAdd":252,"./set":253,"./squaredDistance":254,"./squaredLength":255,"./subtract":256,"./transformMat3":257,"./transformMat4":258,"./transformQuat":259}],239:[function(_dereq_,module,exports){
"use strict";

module.exports = inverse;

/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to invert
 * @returns {vec3} out
 */
function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  return out;
}

},{}],240:[function(_dereq_,module,exports){
"use strict";

module.exports = length;

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
function length(a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return Math.sqrt(x * x + y * y + z * z);
}

},{}],241:[function(_dereq_,module,exports){
"use strict";

module.exports = lerp;

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
function lerp(out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
}

},{}],242:[function(_dereq_,module,exports){
"use strict";

module.exports = max;

/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  return out;
}

},{}],243:[function(_dereq_,module,exports){
"use strict";

module.exports = min;

/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  return out;
}

},{}],244:[function(_dereq_,module,exports){
"use strict";

module.exports = multiply;

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  return out;
}

},{}],245:[function(_dereq_,module,exports){
"use strict";

module.exports = negate;

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}

},{}],246:[function(_dereq_,module,exports){
"use strict";

module.exports = normalize;

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
function normalize(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var len = x * x + y * y + z * z;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
    }
    return out;
}

},{}],247:[function(_dereq_,module,exports){
"use strict";

module.exports = random;

/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */
function random(out, scale) {
    scale = scale || 1.0;

    var r = Math.random() * 2.0 * Math.PI;
    var z = Math.random() * 2.0 - 1.0;
    var zScale = Math.sqrt(1.0 - z * z) * scale;

    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale;
    return out;
}

},{}],248:[function(_dereq_,module,exports){
"use strict";

module.exports = rotateX;

/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
function rotateX(out, a, b, c) {
    var p = [],
        r = [];
    //Translate point to the origin
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];

    //perform rotation
    r[0] = p[0];
    r[1] = p[1] * Math.cos(c) - p[2] * Math.sin(c);
    r[2] = p[1] * Math.sin(c) + p[2] * Math.cos(c);

    //translate to correct position
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];

    return out;
}

},{}],249:[function(_dereq_,module,exports){
"use strict";

module.exports = rotateY;

/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
function rotateY(out, a, b, c) {
  var p = [],
      r = [];
  //Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];

  //perform rotation
  r[0] = p[2] * Math.sin(c) + p[0] * Math.cos(c);
  r[1] = p[1];
  r[2] = p[2] * Math.cos(c) - p[0] * Math.sin(c);

  //translate to correct position
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];

  return out;
}

},{}],250:[function(_dereq_,module,exports){
"use strict";

module.exports = rotateZ;

/**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
function rotateZ(out, a, b, c) {
  var p = [],
      r = [];
  //Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];

  //perform rotation
  r[0] = p[0] * Math.cos(c) - p[1] * Math.sin(c);
  r[1] = p[0] * Math.sin(c) + p[1] * Math.cos(c);
  r[2] = p[2];

  //translate to correct position
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];

  return out;
}

},{}],251:[function(_dereq_,module,exports){
"use strict";

module.exports = scale;

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}

},{}],252:[function(_dereq_,module,exports){
"use strict";

module.exports = scaleAndAdd;

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  return out;
}

},{}],253:[function(_dereq_,module,exports){
"use strict";

module.exports = set;

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
function set(out, x, y, z) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}

},{}],254:[function(_dereq_,module,exports){
"use strict";

module.exports = squaredDistance;

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
function squaredDistance(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return x * x + y * y + z * z;
}

},{}],255:[function(_dereq_,module,exports){
"use strict";

module.exports = squaredLength;

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
function squaredLength(a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return x * x + y * y + z * z;
}

},{}],256:[function(_dereq_,module,exports){
"use strict";

module.exports = subtract;

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}

},{}],257:[function(_dereq_,module,exports){
"use strict";

module.exports = transformMat3;

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
function transformMat3(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  out[0] = x * m[0] + y * m[3] + z * m[6];
  out[1] = x * m[1] + y * m[4] + z * m[7];
  out[2] = x * m[2] + y * m[5] + z * m[8];
  return out;
}

},{}],258:[function(_dereq_,module,exports){
"use strict";

module.exports = transformMat4;

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
function transformMat4(out, a, m) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1.0;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out;
}

},{}],259:[function(_dereq_,module,exports){
"use strict";

module.exports = transformQuat;

/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
function transformQuat(out, a, q) {
    // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

    var x = a[0],
        y = a[1],
        z = a[2],
        qx = q[0],
        qy = q[1],
        qz = q[2],
        qw = q[3],


    // calculate quat * vec
    ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
}

},{}],260:[function(_dereq_,module,exports){
"use strict";

module.exports = add;

/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}

},{}],261:[function(_dereq_,module,exports){
"use strict";

module.exports = clone;

/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */
function clone(a) {
  var out = new Float32Array(4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}

},{}],262:[function(_dereq_,module,exports){
"use strict";

module.exports = copy;

/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}

},{}],263:[function(_dereq_,module,exports){
"use strict";

module.exports = dot;

/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}

},{}],264:[function(_dereq_,module,exports){
"use strict";

module.exports = fromValues;

/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */
function fromValues(x, y, z, w) {
  var out = new Float32Array(4);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}

},{}],265:[function(_dereq_,module,exports){
"use strict";

module.exports = length;

/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */
function length(a) {
  var x = a[0],
      y = a[1],
      z = a[2],
      w = a[3];
  return Math.sqrt(x * x + y * y + z * z + w * w);
}

},{}],266:[function(_dereq_,module,exports){
"use strict";

module.exports = lerp;

/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */
function lerp(out, a, b, t) {
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  out[3] = aw + t * (b[3] - aw);
  return out;
}

},{}],267:[function(_dereq_,module,exports){
"use strict";

module.exports = normalize;

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */
function normalize(out, a) {
  var x = a[0],
      y = a[1],
      z = a[2],
      w = a[3];
  var len = x * x + y * y + z * z + w * w;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
    out[0] = x * len;
    out[1] = y * len;
    out[2] = z * len;
    out[3] = w * len;
  }
  return out;
}

},{}],268:[function(_dereq_,module,exports){
"use strict";

module.exports = scale;

/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */
function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}

},{}],269:[function(_dereq_,module,exports){
"use strict";

module.exports = set;

/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */
function set(out, x, y, z, w) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}

},{}],270:[function(_dereq_,module,exports){
"use strict";

module.exports = squaredLength;

/**
 * Calculates the squared length of a vec4
 *
 * @param {vec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
function squaredLength(a) {
  var x = a[0],
      y = a[1],
      z = a[2],
      w = a[3];
  return x * x + y * y + z * z + w * w;
}

},{}],271:[function(_dereq_,module,exports){
(function (global){
'use strict';

var topLevel = typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : {};
var minDoc = _dereq_('min-document');

var doccy;

if (typeof document !== 'undefined') {
    doccy = document;
} else {
    doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }
}

module.exports = doccy;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"min-document":120}],272:[function(_dereq_,module,exports){
(function (global){
"use strict";

var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined") {
    win = self;
} else {
    win = {};
}

module.exports = win;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],273:[function(_dereq_,module,exports){
'use strict';

var tokenize = _dereq_('glsl-tokenizer');
var stringify = _dereq_('glsl-token-string');
var inject = _dereq_('glsl-token-inject-block');

module.exports = function glslInjectDefine(source, defines) {
  if (!defines) {
    return source;
  }

  var keys = Object.keys(defines);
  if (keys.length === 0) {
    return source;
  }

  var tokens = tokenize(source);
  for (var i = keys.length - 1; i >= 0; i--) {
    var key = keys[i];
    var val = String(defines[key]);
    if (val) {
      // allow empty value
      val = ' ' + val;
    }

    inject(tokens, {
      type: 'preprocessor',
      data: '#define ' + key + val
    });
  }

  return stringify(tokens);
};

},{"glsl-token-inject-block":275,"glsl-token-string":276,"glsl-tokenizer":283}],274:[function(_dereq_,module,exports){
'use strict';

module.exports = defines;

function defines(tokens) {
  var definitions = {};

  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (token.type !== 'preprocessor') continue;
    var datum = token.data.trim();
    if (datum.indexOf('#define')) continue;
    var parts = datum.match(/#define\s+([^\s]+)(.+)?$/i);
    if (!parts) continue;
    var name = (parts[1] || '').trim();
    var value = (parts[2] || '').trim();

    definitions[name] = value;
  }

  return definitions;
}

},{}],275:[function(_dereq_,module,exports){
'use strict';

module.exports = glslTokenInject;

var newline = { data: '\n', type: 'whitespace' };
var regex = /[^\r\n]$/;

function glslTokenInject(tokens, newTokens) {
  if (!Array.isArray(newTokens)) newTokens = [newTokens];
  var start = getStartIndex(tokens);
  var last = start > 0 ? tokens[start - 1] : null;
  if (last && regex.test(last.data)) {
    tokens.splice(start++, 0, newline);
  }
  tokens.splice.apply(tokens, [start, 0].concat(newTokens));

  var end = start + newTokens.length;
  if (tokens[end] && /[^\r\n]$/.test(tokens[end].data)) {
    tokens.splice(end, 0, newline);
  }
  return tokens;
}

function getStartIndex(tokens) {
  // determine starting index for attributes
  var start = -1;
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (token.type === 'preprocessor') {
      if (/^#(extension|version)/.test(token.data)) {
        start = Math.max(start, i);
      }
    } else if (token.type === 'keyword' && token.data === 'precision') {
      var semi = findNextSemicolon(tokens, i);
      if (semi === -1) {
        throw new Error('precision statement not followed by any semicolons!');
      }
      start = Math.max(start, semi);
    }
  }
  return start + 1;
}

function findNextSemicolon(tokens, start) {
  for (var i = start; i < tokens.length; i++) {
    if (tokens[i].type === 'operator' && tokens[i].data === ';') {
      return i;
    }
  }
  return -1;
}

},{}],276:[function(_dereq_,module,exports){
'use strict';

module.exports = toString;

function toString(tokens) {
  var output = [];

  for (var i = 0; i < tokens.length; i++) {
    if (tokens[i].type === 'eof') continue;
    output.push(tokens[i].data);
  }

  return output.join('');
}

},{}],277:[function(_dereq_,module,exports){
'use strict';

module.exports = tokenize;

var literals100 = _dereq_('./lib/literals'),
    operators = _dereq_('./lib/operators'),
    builtins100 = _dereq_('./lib/builtins'),
    literals300es = _dereq_('./lib/literals-300es'),
    builtins300es = _dereq_('./lib/builtins-300es');

var NORMAL = 999 // <-- never emitted
,
    TOKEN = 9999 // <-- never emitted
,
    BLOCK_COMMENT = 0,
    LINE_COMMENT = 1,
    PREPROCESSOR = 2,
    OPERATOR = 3,
    INTEGER = 4,
    FLOAT = 5,
    IDENT = 6,
    BUILTIN = 7,
    KEYWORD = 8,
    WHITESPACE = 9,
    EOF = 10,
    HEX = 11;

var map = ['block-comment', 'line-comment', 'preprocessor', 'operator', 'integer', 'float', 'ident', 'builtin', 'keyword', 'whitespace', 'eof', 'integer'];

function tokenize(opt) {
  var i = 0,
      total = 0,
      mode = NORMAL,
      c,
      last,
      content = [],
      tokens = [],
      line = 1,
      col = 0,
      start = 0,
      isnum = false,
      isoperator = false,
      input = '',
      len;

  opt = opt || {};
  var allBuiltins = builtins100;
  var allLiterals = literals100;
  if (opt.version === '300 es') {
    allBuiltins = builtins300es;
    allLiterals = literals300es;
  }

  return function (data) {
    tokens = [];
    if (data !== null) return write(data.replace ? data.replace(/\r\n/g, '\n') : data);
    return end();
  };

  function token(data) {
    if (data.length) {
      tokens.push({
        type: map[mode],
        data: data,
        position: start,
        line: line,
        column: col
      });
    }
  }

  function write(chunk) {
    i = 0;
    input += chunk;
    len = input.length;

    var last;

    while (c = input[i], i < len) {
      last = i;

      switch (mode) {
        case BLOCK_COMMENT:
          i = block_comment();break;
        case LINE_COMMENT:
          i = line_comment();break;
        case PREPROCESSOR:
          i = preprocessor();break;
        case OPERATOR:
          i = operator();break;
        case INTEGER:
          i = integer();break;
        case HEX:
          i = hex();break;
        case FLOAT:
          i = decimal();break;
        case TOKEN:
          i = readtoken();break;
        case WHITESPACE:
          i = whitespace();break;
        case NORMAL:
          i = normal();break;
      }

      if (last !== i) {
        switch (input[last]) {
          case '\n':
            col = 0;++line;break;
          default:
            ++col;break;
        }
      }
    }

    total += i;
    input = input.slice(i);
    return tokens;
  }

  function end(chunk) {
    if (content.length) {
      token(content.join(''));
    }

    mode = EOF;
    token('(eof)');
    return tokens;
  }

  function normal() {
    content = content.length ? [] : content;

    if (last === '/' && c === '*') {
      start = total + i - 1;
      mode = BLOCK_COMMENT;
      last = c;
      return i + 1;
    }

    if (last === '/' && c === '/') {
      start = total + i - 1;
      mode = LINE_COMMENT;
      last = c;
      return i + 1;
    }

    if (c === '#') {
      mode = PREPROCESSOR;
      start = total + i;
      return i;
    }

    if (/\s/.test(c)) {
      mode = WHITESPACE;
      start = total + i;
      return i;
    }

    isnum = /\d/.test(c);
    isoperator = /[^\w_]/.test(c);

    start = total + i;
    mode = isnum ? INTEGER : isoperator ? OPERATOR : TOKEN;
    return i;
  }

  function whitespace() {
    if (/[^\s]/g.test(c)) {
      token(content.join(''));
      mode = NORMAL;
      return i;
    }
    content.push(c);
    last = c;
    return i + 1;
  }

  function preprocessor() {
    if ((c === '\r' || c === '\n') && last !== '\\') {
      token(content.join(''));
      mode = NORMAL;
      return i;
    }
    content.push(c);
    last = c;
    return i + 1;
  }

  function line_comment() {
    return preprocessor();
  }

  function block_comment() {
    if (c === '/' && last === '*') {
      content.push(c);
      token(content.join(''));
      mode = NORMAL;
      return i + 1;
    }

    content.push(c);
    last = c;
    return i + 1;
  }

  function operator() {
    if (last === '.' && /\d/.test(c)) {
      mode = FLOAT;
      return i;
    }

    if (last === '/' && c === '*') {
      mode = BLOCK_COMMENT;
      return i;
    }

    if (last === '/' && c === '/') {
      mode = LINE_COMMENT;
      return i;
    }

    if (c === '.' && content.length) {
      while (determine_operator(content)) {}

      mode = FLOAT;
      return i;
    }

    if (c === ';' || c === ')' || c === '(') {
      if (content.length) while (determine_operator(content)) {}
      token(c);
      mode = NORMAL;
      return i + 1;
    }

    var is_composite_operator = content.length === 2 && c !== '=';
    if (/[\w_\d\s]/.test(c) || is_composite_operator) {
      while (determine_operator(content)) {}
      mode = NORMAL;
      return i;
    }

    content.push(c);
    last = c;
    return i + 1;
  }

  function determine_operator(buf) {
    var j = 0,
        idx,
        res;

    do {
      idx = operators.indexOf(buf.slice(0, buf.length + j).join(''));
      res = operators[idx];

      if (idx === -1) {
        if (j-- + buf.length > 0) continue;
        res = buf.slice(0, 1).join('');
      }

      token(res);

      start += res.length;
      content = content.slice(res.length);
      return content.length;
    } while (1);
  }

  function hex() {
    if (/[^a-fA-F0-9]/.test(c)) {
      token(content.join(''));
      mode = NORMAL;
      return i;
    }

    content.push(c);
    last = c;
    return i + 1;
  }

  function integer() {
    if (c === '.') {
      content.push(c);
      mode = FLOAT;
      last = c;
      return i + 1;
    }

    if (/[eE]/.test(c)) {
      content.push(c);
      mode = FLOAT;
      last = c;
      return i + 1;
    }

    if (c === 'x' && content.length === 1 && content[0] === '0') {
      mode = HEX;
      content.push(c);
      last = c;
      return i + 1;
    }

    if (/[^\d]/.test(c)) {
      token(content.join(''));
      mode = NORMAL;
      return i;
    }

    content.push(c);
    last = c;
    return i + 1;
  }

  function decimal() {
    if (c === 'f') {
      content.push(c);
      last = c;
      i += 1;
    }

    if (/[eE]/.test(c)) {
      content.push(c);
      last = c;
      return i + 1;
    }

    if (c === '-' && /[eE]/.test(last)) {
      content.push(c);
      last = c;
      return i + 1;
    }

    if (/[^\d]/.test(c)) {
      token(content.join(''));
      mode = NORMAL;
      return i;
    }

    content.push(c);
    last = c;
    return i + 1;
  }

  function readtoken() {
    if (/[^\d\w_]/.test(c)) {
      var contentstr = content.join('');
      if (allLiterals.indexOf(contentstr) > -1) {
        mode = KEYWORD;
      } else if (allBuiltins.indexOf(contentstr) > -1) {
        mode = BUILTIN;
      } else {
        mode = IDENT;
      }
      token(content.join(''));
      mode = NORMAL;
      return i;
    }
    content.push(c);
    last = c;
    return i + 1;
  }
}

},{"./lib/builtins":279,"./lib/builtins-300es":278,"./lib/literals":281,"./lib/literals-300es":280,"./lib/operators":282}],278:[function(_dereq_,module,exports){
'use strict';

// 300es builtins/reserved words that were previously valid in v100
var v100 = _dereq_('./builtins');

// The texture2D|Cube functions have been removed
// And the gl_ features are updated
v100 = v100.slice().filter(function (b) {
  return !/^(gl\_|texture)/.test(b);
});

module.exports = v100.concat([
// the updated gl_ constants
'gl_VertexID', 'gl_InstanceID', 'gl_Position', 'gl_PointSize', 'gl_FragCoord', 'gl_FrontFacing', 'gl_FragDepth', 'gl_PointCoord', 'gl_MaxVertexAttribs', 'gl_MaxVertexUniformVectors', 'gl_MaxVertexOutputVectors', 'gl_MaxFragmentInputVectors', 'gl_MaxVertexTextureImageUnits', 'gl_MaxCombinedTextureImageUnits', 'gl_MaxTextureImageUnits', 'gl_MaxFragmentUniformVectors', 'gl_MaxDrawBuffers', 'gl_MinProgramTexelOffset', 'gl_MaxProgramTexelOffset', 'gl_DepthRangeParameters', 'gl_DepthRange'

// other builtins
, 'trunc', 'round', 'roundEven', 'isnan', 'isinf', 'floatBitsToInt', 'floatBitsToUint', 'intBitsToFloat', 'uintBitsToFloat', 'packSnorm2x16', 'unpackSnorm2x16', 'packUnorm2x16', 'unpackUnorm2x16', 'packHalf2x16', 'unpackHalf2x16', 'outerProduct', 'transpose', 'determinant', 'inverse', 'texture', 'textureSize', 'textureProj', 'textureLod', 'textureOffset', 'texelFetch', 'texelFetchOffset', 'textureProjOffset', 'textureLodOffset', 'textureProjLod', 'textureProjLodOffset', 'textureGrad', 'textureGradOffset', 'textureProjGrad', 'textureProjGradOffset']);

},{"./builtins":279}],279:[function(_dereq_,module,exports){
'use strict';

module.exports = [
// Keep this list sorted
'abs', 'acos', 'all', 'any', 'asin', 'atan', 'ceil', 'clamp', 'cos', 'cross', 'dFdx', 'dFdy', 'degrees', 'distance', 'dot', 'equal', 'exp', 'exp2', 'faceforward', 'floor', 'fract', 'gl_BackColor', 'gl_BackLightModelProduct', 'gl_BackLightProduct', 'gl_BackMaterial', 'gl_BackSecondaryColor', 'gl_ClipPlane', 'gl_ClipVertex', 'gl_Color', 'gl_DepthRange', 'gl_DepthRangeParameters', 'gl_EyePlaneQ', 'gl_EyePlaneR', 'gl_EyePlaneS', 'gl_EyePlaneT', 'gl_Fog', 'gl_FogCoord', 'gl_FogFragCoord', 'gl_FogParameters', 'gl_FragColor', 'gl_FragCoord', 'gl_FragData', 'gl_FragDepth', 'gl_FragDepthEXT', 'gl_FrontColor', 'gl_FrontFacing', 'gl_FrontLightModelProduct', 'gl_FrontLightProduct', 'gl_FrontMaterial', 'gl_FrontSecondaryColor', 'gl_LightModel', 'gl_LightModelParameters', 'gl_LightModelProducts', 'gl_LightProducts', 'gl_LightSource', 'gl_LightSourceParameters', 'gl_MaterialParameters', 'gl_MaxClipPlanes', 'gl_MaxCombinedTextureImageUnits', 'gl_MaxDrawBuffers', 'gl_MaxFragmentUniformComponents', 'gl_MaxLights', 'gl_MaxTextureCoords', 'gl_MaxTextureImageUnits', 'gl_MaxTextureUnits', 'gl_MaxVaryingFloats', 'gl_MaxVertexAttribs', 'gl_MaxVertexTextureImageUnits', 'gl_MaxVertexUniformComponents', 'gl_ModelViewMatrix', 'gl_ModelViewMatrixInverse', 'gl_ModelViewMatrixInverseTranspose', 'gl_ModelViewMatrixTranspose', 'gl_ModelViewProjectionMatrix', 'gl_ModelViewProjectionMatrixInverse', 'gl_ModelViewProjectionMatrixInverseTranspose', 'gl_ModelViewProjectionMatrixTranspose', 'gl_MultiTexCoord0', 'gl_MultiTexCoord1', 'gl_MultiTexCoord2', 'gl_MultiTexCoord3', 'gl_MultiTexCoord4', 'gl_MultiTexCoord5', 'gl_MultiTexCoord6', 'gl_MultiTexCoord7', 'gl_Normal', 'gl_NormalMatrix', 'gl_NormalScale', 'gl_ObjectPlaneQ', 'gl_ObjectPlaneR', 'gl_ObjectPlaneS', 'gl_ObjectPlaneT', 'gl_Point', 'gl_PointCoord', 'gl_PointParameters', 'gl_PointSize', 'gl_Position', 'gl_ProjectionMatrix', 'gl_ProjectionMatrixInverse', 'gl_ProjectionMatrixInverseTranspose', 'gl_ProjectionMatrixTranspose', 'gl_SecondaryColor', 'gl_TexCoord', 'gl_TextureEnvColor', 'gl_TextureMatrix', 'gl_TextureMatrixInverse', 'gl_TextureMatrixInverseTranspose', 'gl_TextureMatrixTranspose', 'gl_Vertex', 'greaterThan', 'greaterThanEqual', 'inversesqrt', 'length', 'lessThan', 'lessThanEqual', 'log', 'log2', 'matrixCompMult', 'max', 'min', 'mix', 'mod', 'normalize', 'not', 'notEqual', 'pow', 'radians', 'reflect', 'refract', 'sign', 'sin', 'smoothstep', 'sqrt', 'step', 'tan', 'texture2D', 'texture2DLod', 'texture2DProj', 'texture2DProjLod', 'textureCube', 'textureCubeLod', 'texture2DLodEXT', 'texture2DProjLodEXT', 'textureCubeLodEXT', 'texture2DGradEXT', 'texture2DProjGradEXT', 'textureCubeGradEXT'];

},{}],280:[function(_dereq_,module,exports){
'use strict';

var v100 = _dereq_('./literals');

module.exports = v100.slice().concat(['layout', 'centroid', 'smooth', 'case', 'mat2x2', 'mat2x3', 'mat2x4', 'mat3x2', 'mat3x3', 'mat3x4', 'mat4x2', 'mat4x3', 'mat4x4', 'uint', 'uvec2', 'uvec3', 'uvec4', 'samplerCubeShadow', 'sampler2DArray', 'sampler2DArrayShadow', 'isampler2D', 'isampler3D', 'isamplerCube', 'isampler2DArray', 'usampler2D', 'usampler3D', 'usamplerCube', 'usampler2DArray', 'coherent', 'restrict', 'readonly', 'writeonly', 'resource', 'atomic_uint', 'noperspective', 'patch', 'sample', 'subroutine', 'common', 'partition', 'active', 'filter', 'image1D', 'image2D', 'image3D', 'imageCube', 'iimage1D', 'iimage2D', 'iimage3D', 'iimageCube', 'uimage1D', 'uimage2D', 'uimage3D', 'uimageCube', 'image1DArray', 'image2DArray', 'iimage1DArray', 'iimage2DArray', 'uimage1DArray', 'uimage2DArray', 'image1DShadow', 'image2DShadow', 'image1DArrayShadow', 'image2DArrayShadow', 'imageBuffer', 'iimageBuffer', 'uimageBuffer', 'sampler1DArray', 'sampler1DArrayShadow', 'isampler1D', 'isampler1DArray', 'usampler1D', 'usampler1DArray', 'isampler2DRect', 'usampler2DRect', 'samplerBuffer', 'isamplerBuffer', 'usamplerBuffer', 'sampler2DMS', 'isampler2DMS', 'usampler2DMS', 'sampler2DMSArray', 'isampler2DMSArray', 'usampler2DMSArray']);

},{"./literals":281}],281:[function(_dereq_,module,exports){
'use strict';

module.exports = [
// current
'precision', 'highp', 'mediump', 'lowp', 'attribute', 'const', 'uniform', 'varying', 'break', 'continue', 'do', 'for', 'while', 'if', 'else', 'in', 'out', 'inout', 'float', 'int', 'void', 'bool', 'true', 'false', 'discard', 'return', 'mat2', 'mat3', 'mat4', 'vec2', 'vec3', 'vec4', 'ivec2', 'ivec3', 'ivec4', 'bvec2', 'bvec3', 'bvec4', 'sampler1D', 'sampler2D', 'sampler3D', 'samplerCube', 'sampler1DShadow', 'sampler2DShadow', 'struct'

// future
, 'asm', 'class', 'union', 'enum', 'typedef', 'template', 'this', 'packed', 'goto', 'switch', 'default', 'inline', 'noinline', 'volatile', 'public', 'static', 'extern', 'external', 'interface', 'long', 'short', 'double', 'half', 'fixed', 'unsigned', 'input', 'output', 'hvec2', 'hvec3', 'hvec4', 'dvec2', 'dvec3', 'dvec4', 'fvec2', 'fvec3', 'fvec4', 'sampler2DRect', 'sampler3DRect', 'sampler2DRectShadow', 'sizeof', 'cast', 'namespace', 'using'];

},{}],282:[function(_dereq_,module,exports){
'use strict';

module.exports = ['<<=', '>>=', '++', '--', '<<', '>>', '<=', '>=', '==', '!=', '&&', '||', '+=', '-=', '*=', '/=', '%=', '&=', '^^', '^=', '|=', '(', ')', '[', ']', '.', '!', '~', '*', '/', '%', '+', '-', '<', '>', '&', '^', '|', '?', ':', '=', ',', ';', '{', '}'];

},{}],283:[function(_dereq_,module,exports){
'use strict';

var tokenize = _dereq_('./index');

module.exports = tokenizeString;

function tokenizeString(str, opt) {
  var generator = tokenize(opt);
  var tokens = [];

  tokens = tokens.concat(generator(str));
  tokens = tokens.concat(generator(null));

  return tokens;
}

},{"./index":277}],284:[function(_dereq_,module,exports){
'use strict';

module.exports = function (strings) {
  if (typeof strings === 'string') strings = [strings];
  var exprs = [].slice.call(arguments, 1);
  var parts = [];
  for (var i = 0; i < strings.length - 1; i++) {
    parts.push(strings[i], exprs[i] || '');
  }
  parts.push(strings[i]);
  return parts.join('');
};

},{}],285:[function(_dereq_,module,exports){
"use strict";

module.exports = reindex;

function reindex(array) {
  var pos = [];
  var cel = [];

  var i = 0;
  var c = 0;
  while (i < array.length) {
    cel.push([c++, c++, c++]);
    pos.push([array[i++], array[i++], array[i++]], [array[i++], array[i++], array[i++]], [array[i++], array[i++], array[i++]]);
  }

  return {
    positions: pos,
    cells: cel
  };
}

},{}],286:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function (val, options) {
  options = options || {};
  var type = typeof val === 'undefined' ? 'undefined' : _typeof(val);
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') || plural(ms, h, 'hour') || plural(ms, m, 'minute') || plural(ms, s, 'second') || ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}

},{}],287:[function(_dereq_,module,exports){
"use strict";

var DEFAULT_NORMALS_EPSILON = 1e-6;
var DEFAULT_FACE_EPSILON = 1e-6;

//Estimate the vertex normals of a mesh
exports.vertexNormals = function (faces, positions, specifiedEpsilon) {

  var N = positions.length;
  var normals = new Array(N);
  var epsilon = specifiedEpsilon === void 0 ? DEFAULT_NORMALS_EPSILON : specifiedEpsilon;

  //Initialize normal array
  for (var i = 0; i < N; ++i) {
    normals[i] = [0.0, 0.0, 0.0];
  }

  //Walk over all the faces and add per-vertex contribution to normal weights
  for (var i = 0; i < faces.length; ++i) {
    var f = faces[i];
    var p = 0;
    var c = f[f.length - 1];
    var n = f[0];
    for (var j = 0; j < f.length; ++j) {

      //Shift indices back
      p = c;
      c = n;
      n = f[(j + 1) % f.length];

      var v0 = positions[p];
      var v1 = positions[c];
      var v2 = positions[n];

      //Compute infineteismal arcs
      var d01 = new Array(3);
      var m01 = 0.0;
      var d21 = new Array(3);
      var m21 = 0.0;
      for (var k = 0; k < 3; ++k) {
        d01[k] = v0[k] - v1[k];
        m01 += d01[k] * d01[k];
        d21[k] = v2[k] - v1[k];
        m21 += d21[k] * d21[k];
      }

      //Accumulate values in normal
      if (m01 * m21 > epsilon) {
        var norm = normals[c];
        var w = 1.0 / Math.sqrt(m01 * m21);
        for (var k = 0; k < 3; ++k) {
          var u = (k + 1) % 3;
          var v = (k + 2) % 3;
          norm[k] += w * (d21[u] * d01[v] - d21[v] * d01[u]);
        }
      }
    }
  }

  //Scale all normals to unit length
  for (var i = 0; i < N; ++i) {
    var norm = normals[i];
    var m = 0.0;
    for (var k = 0; k < 3; ++k) {
      m += norm[k] * norm[k];
    }
    if (m > epsilon) {
      var w = 1.0 / Math.sqrt(m);
      for (var k = 0; k < 3; ++k) {
        norm[k] *= w;
      }
    } else {
      for (var k = 0; k < 3; ++k) {
        norm[k] = 0.0;
      }
    }
  }

  //Return the resulting set of patches
  return normals;
};

//Compute face normals of a mesh
exports.faceNormals = function (faces, positions, specifiedEpsilon) {

  var N = faces.length;
  var normals = new Array(N);
  var epsilon = specifiedEpsilon === void 0 ? DEFAULT_FACE_EPSILON : specifiedEpsilon;

  for (var i = 0; i < N; ++i) {
    var f = faces[i];
    var pos = new Array(3);
    for (var j = 0; j < 3; ++j) {
      pos[j] = positions[f[j]];
    }

    var d01 = new Array(3);
    var d21 = new Array(3);
    for (var j = 0; j < 3; ++j) {
      d01[j] = pos[1][j] - pos[0][j];
      d21[j] = pos[2][j] - pos[0][j];
    }

    var n = new Array(3);
    var l = 0.0;
    for (var j = 0; j < 3; ++j) {
      var u = (j + 1) % 3;
      var v = (j + 2) % 3;
      n[j] = d01[u] * d21[v] - d01[v] * d21[u];
      l += n[j] * n[j];
    }
    if (l > epsilon) {
      l = 1.0 / Math.sqrt(l);
    } else {
      l = 0.0;
    }
    for (var j = 0; j < 3; ++j) {
      n[j] *= l;
    }
    normals[i] = n;
  }
  return normals;
};

},{}],288:[function(_dereq_,module,exports){
'use strict';

/**
 * @module parenthesis
 */

function parse(str, opts) {
	//pretend non-string parsed per-se
	if (typeof str !== 'string') return [str];

	var res = [str];

	opts = opts || {};

	var brackets = opts.brackets ? Array.isArray(opts.brackets) ? opts.brackets : [opts.brackets] : ['{}', '[]', '()'];

	var escape = opts.escape || '___';

	var flat = !!opts.flat;

	brackets.forEach(function (bracket) {
		//create parenthesis regex
		var pRE = new RegExp(['\\', bracket[0], '[^\\', bracket[0], '\\', bracket[1], ']*\\', bracket[1]].join(''));

		var ids = [];

		function replaceToken(token, idx, str) {
			//save token to res
			var refId = res.push(token.slice(bracket[0].length, -bracket[1].length)) - 1;

			ids.push(refId);

			return escape + refId;
		}

		res.forEach(function (str, i) {
			var prevStr;

			//replace paren tokens till there’s none
			var a = 0;
			while (str != prevStr) {
				prevStr = str;
				str = str.replace(pRE, replaceToken);
				if (a++ > 10e3) throw Error('References have circular dependency. Please, check them.');
			}

			res[i] = str;
		});

		//wrap found refs to brackets
		ids = ids.reverse();
		res = res.map(function (str) {
			ids.forEach(function (id) {
				str = str.replace(new RegExp('(\\' + escape + id + '(?![0-9]))', 'g'), bracket[0] + '$1' + bracket[1]);
			});
			return str;
		});
	});

	var re = new RegExp('\\' + escape + '([0-9]+)');

	//transform references to tree
	function nest(str, refs, escape) {
		var res = [],
		    match;

		var a = 0;
		while (match = re.exec(str)) {
			if (a++ > 10e3) throw Error('Circular references in parenthesis');

			res.push(str.slice(0, match.index));

			res.push(nest(refs[match[1]], refs));

			str = str.slice(match.index + match[0].length);
		}

		res.push(str);

		return res;
	}

	return flat ? res : nest(res[0], res);
};

function stringify(arg, opts) {
	if (opts && opts.flat) {
		var replaceRef = function replaceRef(match, idx) {
			if (arg[idx] == null) throw Error('Reference ' + idx + 'is undefined');
			return arg[idx];
		};

		var escape = opts && opts.escape || '___';

		var str = arg[0],
		    prevStr;

		//pretend bad string stringified with no parentheses
		if (!str) return '';

		var re = new RegExp('\\' + escape + '([0-9]+)');

		var a = 0;
		while (str != prevStr) {
			if (a++ > 10e3) throw Error('Circular references in ' + arg);
			prevStr = str;
			str = str.replace(re, replaceRef);
		}

		return str;
	}

	return arg.reduce(function f(prev, curr) {
		if (Array.isArray(curr)) {
			curr = curr.reduce(f, '');
		}
		return prev + curr;
	}, '');
}

function parenthesis(arg, opts) {
	if (Array.isArray(arg)) {
		return stringify(arg, opts);
	} else {
		return parse(arg, opts);
	}
}

parenthesis.parse = parse;
parenthesis.stringify = stringify;

module.exports = parenthesis;

},{}],289:[function(_dereq_,module,exports){
(function (process){
'use strict';

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function splitPath(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function () {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = i >= 0 ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function (p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return (resolvedAbsolute ? '/' : '') + resolvedPath || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function (path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function (p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function (path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function () {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function (p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};

// path.relative(from, to)
// posix version
exports.relative = function (from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};

exports.basename = function (path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  return splitPath(path)[3];
};

function filter(xs, f) {
  if (xs.filter) return xs.filter(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    if (f(xs[i], i, xs)) res.push(xs[i]);
  }
  return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = function substr(str, start, len) {
  return str.substr(start, len);
};

}).call(this,_dereq_('_process'))
},{"_process":291}],290:[function(_dereq_,module,exports){
'use strict';

/**
 * Preprocess in C-preprocessor fashion
 * @module  prepr
 */

var paren = _dereq_('parenthesis');
var balanced = _dereq_('balanced-match');
var extend = _dereq_('xtend/mutable');

/**
 * Main processing function
 */
function preprocess(what, how) {
	var source = what + '';

	//defined macros
	//FIXME: provide real values here
	var macros = extend({
		__LINE__: 0,
		__FILE__: '_',
		__VERSION__: 100,
		defined: function defined(arg) {
			return [].slice.call(arguments).every(function (arg) {
				return macros[arg] != null;
			});
		}
	}, how);

	return process(source);

	//process chunk of a string by finding out macros and replacing them
	function process(str) {
		if (!str) return '';

		var arr = [];

		var chunk = str;

		//find next directive, get chunk to process before it
		var directive = /#[A-Za-z0-9_$]+/ig.exec(str);

		//get chunk to process - before next call
		if (directive) {
			chunk = chunk.slice(0, directive.index);
			str = str.slice(directive.index);
		}

		//escape bad things
		chunk = escape(chunk, arr);

		//replace all defined X to defined (X)
		chunk = chunk.replace(/\bdefined\s*([A-Za-z0-9_$]+)/g, 'defined($1)');

		//for each registered macro do it’s call
		for (var name in macros) {
			//fn macro
			if (macros[name] instanceof Function) {
				chunk = processFunction(chunk, name, macros[name]);
			}
		}

		chunk = escape(chunk, arr);

		//for each defined var do replacement
		for (var name in macros) {
			//value replacement
			if (!(macros[name] instanceof Function)) {
				chunk = processDefinition(chunk, name, macros[name]);
			}
		}

		chunk = unescape(chunk, arr);

		//process directive
		if (directive) {
			if (/^#def/.test(directive[0])) {
				str = define(str);
			} else if (/^#undef/.test(directive[0])) {
				str = undefine(str);
			} else if (/^#if/.test(directive[0])) {
				str = processIf(str);
			} else if (/^#line/.test(directive[0])) {
				var data = /#[A-Za-z0-9_]+\s*([-0-9]+)?[^\n]*/.exec(str);
				macros.__LINE__ = parseInt(data[1]);
				str = str.slice(data.index + data[0].length);
			} else if (/^#version/.test(directive[0])) {
				var data = /#[A-Za-z0-9_]+\s*([-0-9]+)?[^\n]*/.exec(str);
				macros.__VERSION__ = parseInt(data[1]);
				str = str.slice(data.index + data[0].length);
			} else {
				//drop directive line
				var directiveDecl = /\n/m.exec(str);
				chunk += str.slice(0, directiveDecl.index) + '\n';
				str = str.slice(directiveDecl.index);
			}

			return chunk + process(str);
		}

		return chunk;
	}

	//replace defined macros from a string
	function processFunction(str, name, fn) {
		var arr = [];
		str = escape(str, arr);

		var parts = paren(str, {
			flat: true,
			brackets: '()',
			escape: '___'
		});

		var re = new RegExp(name + '\\s*\\(___([0-9]+)\\)', 'g');

		//replace each macro call with result
		parts = parts.map(function (part) {
			return part.replace(re, function (match, argsPartIdx) {
				//parse arguments
				var args = parts[argsPartIdx];
				if (args.trim().length) {
					args = args.split(/\s*,\s*/);
					args = args.map(function (arg) {
						var argParts = parts.slice();
						argParts[0] = arg;
						return paren.stringify(argParts, { flat: true, escape: '___' });
					}).map(function (arg) {
						return arg;
					});
				} else {
					args = [];
				}

				if (args.length != fn.length) throw Error('macro "' + name + '" requires ' + fn.length + ' arguments, but ' + args.length + ' given');

				//apply macro call with args
				return fn.apply(null, args);
			});
		});

		str = paren.stringify(parts, { flat: true, escape: '___' });

		str = unescape(str, arr);

		return str;
	}

	//replace defined variables from a string
	function processDefinition(str, name, value) {
		var arr = [];
		str = escape(str, arr);

		//apply concatenation ENTRY ## something → valueSomething
		str = str.replace(new RegExp('([^#A-Za-z0-9_$]|^)' + name + '\\s*##\\s*([A-Za-z0-9_$]*)', 'g'), function (match, pre, post) {
			return pre + value + post;
		});
		str = str.replace(new RegExp('([A-Za-z0-9_$]*)\\s*##\\s*' + name + '([^A-Za-z0-9_$]|$)', 'g'), function (match, pre, post) {
			return pre + value + post;
		});

		//replace definition entries
		str = str.replace(new RegExp('([^#A-Za-z0-9_$]|^)' + name + '([^A-Za-z0-9_$]|$)', 'g'), function (match, pre, post) {

			//insert definition
			if (macros[value] != null && !(macros[value] instanceof Function)) value = macros[value];

			return pre + value + post;
		});
		//replace stringifications
		str = str.replace(new RegExp('#' + name + '([^A-Za-z0-9_$]|$)', 'g'), function (match, post) {
			return '"' + value + '"' + post;
		});

		str = unescape(str, arr);

		return str;
	}

	//helpers to escape unfoldable things in strings
	function escape(str, arr) {
		//hide comments
		str = str.replace(/\/\/[^\n]*$/mg, function (match) {
			return ' ___comment' + arr.push(match);
		});
		str = str.replace(/\/\*([^\*]|[\r\n]|(\*+([^\*\/]|[\r\n])))*\*+\//g, function (match) {
			return ' ___comment' + arr.push(match);
		});
		//Escape strings
		str = str.replace(/\'[^']*\'/g, function (match) {
			return ' ___string' + arr.push(match);
		});
		str = str.replace(/\"[^"]*\"/g, function (match) {
			return ' ___string' + arr.push(match);
		});
		str = str.replace(/\`[^`]*\`/g, function (match) {
			return ' ___string' + arr.push(match);
		});
		return str;
	}

	function unescape(str, arr) {
		//unescape strings
		arr.forEach(function (rep, i) {
			str = str.replace(' ___string' + (i + 1), rep);
		});

		//unhide comments
		arr.forEach(function (value, i) {
			str = str.replace(' ___comment' + (i + 1), value);
		});
		return str;
	}

	//register macro, #define directive
	function define(str) {
		var data = /#[A-Za-z]+[ ]*([A-Za-z0-9_$]*)(?:\(([^\(\)]*)\))?[ \r]*([^\n]*)$/m.exec(str);
		str = str.slice(data.index + data[0].length);

		var name = data[1];
		var args = data[2];
		var value = data[3];

		if (!name || !value) throw Error('Macro definition "' + data[0] + '" is malformed');

		//register function macro
		//#define FOO(A, B) (expr)
		if (args != null) {
			var fn = function fn() {
				var result = value;

				//for each arg - replace it’s occurence in `result`
				for (var i = 0; i < args.length; i++) {
					result = processDefinition(result, args[i], arguments[i]);
				}

				result = process(result);

				return result;
			};

			if (args.trim().length) {
				args = args.split(/\s*,\s*/);
			} else {
				args = [];
			}

			;
			Object.defineProperty(fn, 'length', {
				value: args.length
			});

			macros[name] = fn;
		}

		//register value macro
		//#define FOO insertion
		//#define FOO (expr)
		else {
				macros[name] = value;
			}

		return str;
	}

	//unregister macro, #undef directive
	function undefine(str) {
		var data = /#[A-Za-z0-9_]+[ ]*([A-Za-z0-9_$]+)/.exec(str);
		delete macros[data[1]];

		return str.slice(data.index + data[0].length);
	}

	//process if/else/ifdef/elif/ifndef/defined
	function processIf(str) {
		var match = balanced('#if', '#endif', str);

		//if no nested ifs - means we are in clause, return as is
		if (!match) return str;

		var body = match.body;
		var post = match.post;
		var elseBody = '';

		//find else part
		var matchElse;
		if (matchElse = /^\s*#else[^\n\r]*$/m.exec(body)) {
			elseBody = body.slice(matchElse.index + matchElse[0].length);
			body = body.slice(0, matchElse.index);
		}

		//ifdef
		if (/^def/.test(body)) {
			body = body.slice(3);
			var nameMatch = /[A-Za-z0-9_$]+/.exec(body);
			var name = nameMatch[0];
			body = body.slice(name.length + nameMatch.index);
			if (macros[name] != null) str = process(body);else str = process(elseBody);
		}
		//ifndef
		else if (/^ndef/.test(body)) {
				body = body.slice(4);
				var nameMatch = /[A-Za-z0-9_$]+/.exec(body);
				var name = nameMatch[0];
				body = body.slice(name.length + nameMatch.index);
				if (macros[name] == null) str = process(body);else str = process(elseBody);
			}
			//if
			else {
					//split elifs
					var clauses = body.split(/^\s*#elif\s+/m);

					var result = false;

					//find first triggered clause
					for (var i = 0; i < clauses.length; i++) {
						var clause = clauses[i];

						var exprMatch = /\s*(.*)/.exec(clause);
						var expr = exprMatch[0];
						clause = clause.slice(expr.length + exprMatch.index);

						//eval expression
						expr = process(expr);

						try {
							result = eval(expr);
						} catch (e) {
							result = false;
						}

						if (result) {
							str = process(clause);
							break;
						}
					}

					//else clause
					if (!result) {
						str = process(elseBody);
					}
				}

		//trim post till the first endline, because there may be comments after #endif
		var match = /[\n\r]/.exec(post);
		if (match) post = post.slice(match.index);

		return str + post;
	}
}

module.exports = preprocess;

},{"balanced-match":118,"parenthesis":288,"xtend/mutable":297}],291:[function(_dereq_,module,exports){
'use strict';

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

},{}],292:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (global, factory) {
  (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.createREGL = factory();
})(undefined, function () {
  'use strict';

  var arrayTypes = {
    "[object Int8Array]": 5120,
    "[object Int16Array]": 5122,
    "[object Int32Array]": 5124,
    "[object Uint8Array]": 5121,
    "[object Uint8ClampedArray]": 5121,
    "[object Uint16Array]": 5123,
    "[object Uint32Array]": 5125,
    "[object Float32Array]": 5126,
    "[object Float64Array]": 5121,
    "[object ArrayBuffer]": 5121
  };

  var isTypedArray = function isTypedArray(x) {
    return Object.prototype.toString.call(x) in arrayTypes;
  };

  var extend = function extend(base, opts) {
    var keys = Object.keys(opts);
    for (var i = 0; i < keys.length; ++i) {
      base[keys[i]] = opts[keys[i]];
    }
    return base;
  };

  // Error checking and parameter validation.
  //
  // Statements for the form `check.someProcedure(...)` get removed by
  // a browserify transform for optimized/minified bundles.
  //
  /* globals btoa */
  // only used for extracting shader names.  if btoa not present, then errors
  // will be slightly crappier
  function decodeB64(str) {
    if (typeof btoa !== 'undefined') {
      return btoa(str);
    }
    return 'base64:' + str;
  }

  function raise(message) {
    var error = new Error('(regl) ' + message);
    console.error(error);
    throw error;
  }

  function check(pred, message) {
    if (!pred) {
      raise(message);
    }
  }

  function encolon(message) {
    if (message) {
      return ': ' + message;
    }
    return '';
  }

  function checkParameter(param, possibilities, message) {
    if (!(param in possibilities)) {
      raise('unknown parameter (' + param + ')' + encolon(message) + '. possible values: ' + Object.keys(possibilities).join());
    }
  }

  function checkIsTypedArray(data, message) {
    if (!isTypedArray(data)) {
      raise('invalid parameter type' + encolon(message) + '. must be a typed array');
    }
  }

  function checkTypeOf(value, type, message) {
    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== type) {
      raise('invalid parameter type' + encolon(message) + '. expected ' + type + ', got ' + (typeof value === 'undefined' ? 'undefined' : _typeof(value)));
    }
  }

  function checkNonNegativeInt(value, message) {
    if (!(value >= 0 && (value | 0) === value)) {
      raise('invalid parameter type, (' + value + ')' + encolon(message) + '. must be a nonnegative integer');
    }
  }

  function checkOneOf(value, list, message) {
    if (list.indexOf(value) < 0) {
      raise('invalid value' + encolon(message) + '. must be one of: ' + list);
    }
  }

  var constructorKeys = ['gl', 'canvas', 'container', 'attributes', 'pixelRatio', 'extensions', 'optionalExtensions', 'profile', 'onDone'];

  function checkConstructor(obj) {
    Object.keys(obj).forEach(function (key) {
      if (constructorKeys.indexOf(key) < 0) {
        raise('invalid regl constructor argument "' + key + '". must be one of ' + constructorKeys);
      }
    });
  }

  function leftPad(str, n) {
    str = str + '';
    while (str.length < n) {
      str = ' ' + str;
    }
    return str;
  }

  function ShaderFile() {
    this.name = 'unknown';
    this.lines = [];
    this.index = {};
    this.hasErrors = false;
  }

  function ShaderLine(number, line) {
    this.number = number;
    this.line = line;
    this.errors = [];
  }

  function ShaderError(fileNumber, lineNumber, message) {
    this.file = fileNumber;
    this.line = lineNumber;
    this.message = message;
  }

  function guessCommand() {
    var error = new Error();
    var stack = (error.stack || error).toString();
    var pat = /compileProcedure.*\n\s*at.*\((.*)\)/.exec(stack);
    if (pat) {
      return pat[1];
    }
    var pat2 = /compileProcedure.*\n\s*at\s+(.*)(\n|$)/.exec(stack);
    if (pat2) {
      return pat2[1];
    }
    return 'unknown';
  }

  function guessCallSite() {
    var error = new Error();
    var stack = (error.stack || error).toString();
    var pat = /at REGLCommand.*\n\s+at.*\((.*)\)/.exec(stack);
    if (pat) {
      return pat[1];
    }
    var pat2 = /at REGLCommand.*\n\s+at\s+(.*)\n/.exec(stack);
    if (pat2) {
      return pat2[1];
    }
    return 'unknown';
  }

  function parseSource(source, command) {
    var lines = source.split('\n');
    var lineNumber = 1;
    var fileNumber = 0;
    var files = {
      unknown: new ShaderFile(),
      0: new ShaderFile()
    };
    files.unknown.name = files[0].name = command || guessCommand();
    files.unknown.lines.push(new ShaderLine(0, ''));
    for (var i = 0; i < lines.length; ++i) {
      var line = lines[i];
      var parts = /^\s*\#\s*(\w+)\s+(.+)\s*$/.exec(line);
      if (parts) {
        switch (parts[1]) {
          case 'line':
            var lineNumberInfo = /(\d+)(\s+\d+)?/.exec(parts[2]);
            if (lineNumberInfo) {
              lineNumber = lineNumberInfo[1] | 0;
              if (lineNumberInfo[2]) {
                fileNumber = lineNumberInfo[2] | 0;
                if (!(fileNumber in files)) {
                  files[fileNumber] = new ShaderFile();
                }
              }
            }
            break;
          case 'define':
            var nameInfo = /SHADER_NAME(_B64)?\s+(.*)$/.exec(parts[2]);
            if (nameInfo) {
              files[fileNumber].name = nameInfo[1] ? decodeB64(nameInfo[2]) : nameInfo[2];
            }
            break;
        }
      }
      files[fileNumber].lines.push(new ShaderLine(lineNumber++, line));
    }
    Object.keys(files).forEach(function (fileNumber) {
      var file = files[fileNumber];
      file.lines.forEach(function (line) {
        file.index[line.number] = line;
      });
    });
    return files;
  }

  function parseErrorLog(errLog) {
    var result = [];
    errLog.split('\n').forEach(function (errMsg) {
      if (errMsg.length < 5) {
        return;
      }
      var parts = /^ERROR\:\s+(\d+)\:(\d+)\:\s*(.*)$/.exec(errMsg);
      if (parts) {
        result.push(new ShaderError(parts[1] | 0, parts[2] | 0, parts[3].trim()));
      } else if (errMsg.length > 0) {
        result.push(new ShaderError('unknown', 0, errMsg));
      }
    });
    return result;
  }

  function annotateFiles(files, errors) {
    errors.forEach(function (error) {
      var file = files[error.file];
      if (file) {
        var line = file.index[error.line];
        if (line) {
          line.errors.push(error);
          file.hasErrors = true;
          return;
        }
      }
      files.unknown.hasErrors = true;
      files.unknown.lines[0].errors.push(error);
    });
  }

  function checkShaderError(gl, shader, source, type, command) {
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      var errLog = gl.getShaderInfoLog(shader);
      var typeName = type === gl.FRAGMENT_SHADER ? 'fragment' : 'vertex';
      checkCommandType(source, 'string', typeName + ' shader source must be a string', command);
      var files = parseSource(source, command);
      var errors = parseErrorLog(errLog);
      annotateFiles(files, errors);

      Object.keys(files).forEach(function (fileNumber) {
        var file = files[fileNumber];
        if (!file.hasErrors) {
          return;
        }

        var strings = [''];
        var styles = [''];

        function push(str, style) {
          strings.push(str);
          styles.push(style || '');
        }

        push('file number ' + fileNumber + ': ' + file.name + '\n', 'color:red;text-decoration:underline;font-weight:bold');

        file.lines.forEach(function (line) {
          if (line.errors.length > 0) {
            push(leftPad(line.number, 4) + '|  ', 'background-color:yellow; font-weight:bold');
            push(line.line + '\n', 'color:red; background-color:yellow; font-weight:bold');

            // try to guess token
            var offset = 0;
            line.errors.forEach(function (error) {
              var message = error.message;
              var token = /^\s*\'(.*)\'\s*\:\s*(.*)$/.exec(message);
              if (token) {
                var tokenPat = token[1];
                message = token[2];
                switch (tokenPat) {
                  case 'assign':
                    tokenPat = '=';
                    break;
                }
                offset = Math.max(line.line.indexOf(tokenPat, offset), 0);
              } else {
                offset = 0;
              }

              push(leftPad('| ', 6));
              push(leftPad('^^^', offset + 3) + '\n', 'font-weight:bold');
              push(leftPad('| ', 6));
              push(message + '\n', 'font-weight:bold');
            });
            push(leftPad('| ', 6) + '\n');
          } else {
            push(leftPad(line.number, 4) + '|  ');
            push(line.line + '\n', 'color:red');
          }
        });
        if (typeof document !== 'undefined') {
          styles[0] = strings.join('%c');
          console.log.apply(console, styles);
        } else {
          console.log(strings.join(''));
        }
      });

      check.raise('Error compiling ' + typeName + ' shader, ' + files[0].name);
    }
  }

  function checkLinkError(gl, program, fragShader, vertShader, command) {
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      var errLog = gl.getProgramInfoLog(program);
      var fragParse = parseSource(fragShader, command);
      var vertParse = parseSource(vertShader, command);

      var header = 'Error linking program with vertex shader, "' + vertParse[0].name + '", and fragment shader "' + fragParse[0].name + '"';

      if (typeof document !== 'undefined') {
        console.log('%c' + header + '\n%c' + errLog, 'color:red;text-decoration:underline;font-weight:bold', 'color:red');
      } else {
        console.log(header + '\n' + errLog);
      }
      check.raise(header);
    }
  }

  function saveCommandRef(object) {
    object._commandRef = guessCommand();
  }

  function saveDrawCommandInfo(opts, uniforms, attributes, stringStore) {
    saveCommandRef(opts);

    function id(str) {
      if (str) {
        return stringStore.id(str);
      }
      return 0;
    }
    opts._fragId = id(opts.static.frag);
    opts._vertId = id(opts.static.vert);

    function addProps(dict, set) {
      Object.keys(set).forEach(function (u) {
        dict[stringStore.id(u)] = true;
      });
    }

    var uniformSet = opts._uniformSet = {};
    addProps(uniformSet, uniforms.static);
    addProps(uniformSet, uniforms.dynamic);

    var attributeSet = opts._attributeSet = {};
    addProps(attributeSet, attributes.static);
    addProps(attributeSet, attributes.dynamic);

    opts._hasCount = 'count' in opts.static || 'count' in opts.dynamic || 'elements' in opts.static || 'elements' in opts.dynamic;
  }

  function commandRaise(message, command) {
    var callSite = guessCallSite();
    raise(message + ' in command ' + (command || guessCommand()) + (callSite === 'unknown' ? '' : ' called from ' + callSite));
  }

  function checkCommand(pred, message, command) {
    if (!pred) {
      commandRaise(message, command || guessCommand());
    }
  }

  function checkParameterCommand(param, possibilities, message, command) {
    if (!(param in possibilities)) {
      commandRaise('unknown parameter (' + param + ')' + encolon(message) + '. possible values: ' + Object.keys(possibilities).join(), command || guessCommand());
    }
  }

  function checkCommandType(value, type, message, command) {
    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== type) {
      commandRaise('invalid parameter type' + encolon(message) + '. expected ' + type + ', got ' + (typeof value === 'undefined' ? 'undefined' : _typeof(value)), command || guessCommand());
    }
  }

  function checkOptional(block) {
    block();
  }

  function checkFramebufferFormat(attachment, texFormats, rbFormats) {
    if (attachment.texture) {
      checkOneOf(attachment.texture._texture.internalformat, texFormats, 'unsupported texture format for attachment');
    } else {
      checkOneOf(attachment.renderbuffer._renderbuffer.format, rbFormats, 'unsupported renderbuffer format for attachment');
    }
  }

  var GL_CLAMP_TO_EDGE = 0x812F;

  var GL_NEAREST = 0x2600;
  var GL_NEAREST_MIPMAP_NEAREST = 0x2700;
  var GL_LINEAR_MIPMAP_NEAREST = 0x2701;
  var GL_NEAREST_MIPMAP_LINEAR = 0x2702;
  var GL_LINEAR_MIPMAP_LINEAR = 0x2703;

  var GL_BYTE = 5120;
  var GL_UNSIGNED_BYTE = 5121;
  var GL_SHORT = 5122;
  var GL_UNSIGNED_SHORT = 5123;
  var GL_INT = 5124;
  var GL_UNSIGNED_INT = 5125;
  var GL_FLOAT = 5126;

  var GL_UNSIGNED_SHORT_4_4_4_4 = 0x8033;
  var GL_UNSIGNED_SHORT_5_5_5_1 = 0x8034;
  var GL_UNSIGNED_SHORT_5_6_5 = 0x8363;
  var GL_UNSIGNED_INT_24_8_WEBGL = 0x84FA;

  var GL_HALF_FLOAT_OES = 0x8D61;

  var TYPE_SIZE = {};

  TYPE_SIZE[GL_BYTE] = TYPE_SIZE[GL_UNSIGNED_BYTE] = 1;

  TYPE_SIZE[GL_SHORT] = TYPE_SIZE[GL_UNSIGNED_SHORT] = TYPE_SIZE[GL_HALF_FLOAT_OES] = TYPE_SIZE[GL_UNSIGNED_SHORT_5_6_5] = TYPE_SIZE[GL_UNSIGNED_SHORT_4_4_4_4] = TYPE_SIZE[GL_UNSIGNED_SHORT_5_5_5_1] = 2;

  TYPE_SIZE[GL_INT] = TYPE_SIZE[GL_UNSIGNED_INT] = TYPE_SIZE[GL_FLOAT] = TYPE_SIZE[GL_UNSIGNED_INT_24_8_WEBGL] = 4;

  function pixelSize(type, channels) {
    if (type === GL_UNSIGNED_SHORT_5_5_5_1 || type === GL_UNSIGNED_SHORT_4_4_4_4 || type === GL_UNSIGNED_SHORT_5_6_5) {
      return 2;
    } else if (type === GL_UNSIGNED_INT_24_8_WEBGL) {
      return 4;
    } else {
      return TYPE_SIZE[type] * channels;
    }
  }

  function isPow2(v) {
    return !(v & v - 1) && !!v;
  }

  function checkTexture2D(info, mipData, limits) {
    var i;
    var w = mipData.width;
    var h = mipData.height;
    var c = mipData.channels;

    // Check texture shape
    check(w > 0 && w <= limits.maxTextureSize && h > 0 && h <= limits.maxTextureSize, 'invalid texture shape');

    // check wrap mode
    if (info.wrapS !== GL_CLAMP_TO_EDGE || info.wrapT !== GL_CLAMP_TO_EDGE) {
      check(isPow2(w) && isPow2(h), 'incompatible wrap mode for texture, both width and height must be power of 2');
    }

    if (mipData.mipmask === 1) {
      if (w !== 1 && h !== 1) {
        check(info.minFilter !== GL_NEAREST_MIPMAP_NEAREST && info.minFilter !== GL_NEAREST_MIPMAP_LINEAR && info.minFilter !== GL_LINEAR_MIPMAP_NEAREST && info.minFilter !== GL_LINEAR_MIPMAP_LINEAR, 'min filter requires mipmap');
      }
    } else {
      // texture must be power of 2
      check(isPow2(w) && isPow2(h), 'texture must be a square power of 2 to support mipmapping');
      check(mipData.mipmask === (w << 1) - 1, 'missing or incomplete mipmap data');
    }

    if (mipData.type === GL_FLOAT) {
      if (limits.extensions.indexOf('oes_texture_float_linear') < 0) {
        check(info.minFilter === GL_NEAREST && info.magFilter === GL_NEAREST, 'filter not supported, must enable oes_texture_float_linear');
      }
      check(!info.genMipmaps, 'mipmap generation not supported with float textures');
    }

    // check image complete
    var mipimages = mipData.images;
    for (i = 0; i < 16; ++i) {
      if (mipimages[i]) {
        var mw = w >> i;
        var mh = h >> i;
        check(mipData.mipmask & 1 << i, 'missing mipmap data');

        var img = mipimages[i];

        check(img.width === mw && img.height === mh, 'invalid shape for mip images');

        check(img.format === mipData.format && img.internalformat === mipData.internalformat && img.type === mipData.type, 'incompatible type for mip image');

        if (img.compressed) {
          // TODO: check size for compressed images
        } else if (img.data) {
          // check(img.data.byteLength === mw * mh *
          // Math.max(pixelSize(img.type, c), img.unpackAlignment),
          var rowSize = Math.ceil(pixelSize(img.type, c) * mw / img.unpackAlignment) * img.unpackAlignment;
          check(img.data.byteLength === rowSize * mh, 'invalid data for image, buffer size is inconsistent with image format');
        } else if (img.element) {
          // TODO: check element can be loaded
        } else if (img.copy) {
          // TODO: check compatible format and type
        }
      } else if (!info.genMipmaps) {
        check((mipData.mipmask & 1 << i) === 0, 'extra mipmap data');
      }
    }

    if (mipData.compressed) {
      check(!info.genMipmaps, 'mipmap generation for compressed images not supported');
    }
  }

  function checkTextureCube(texture, info, faces, limits) {
    var w = texture.width;
    var h = texture.height;
    var c = texture.channels;

    // Check texture shape
    check(w > 0 && w <= limits.maxTextureSize && h > 0 && h <= limits.maxTextureSize, 'invalid texture shape');
    check(w === h, 'cube map must be square');
    check(info.wrapS === GL_CLAMP_TO_EDGE && info.wrapT === GL_CLAMP_TO_EDGE, 'wrap mode not supported by cube map');

    for (var i = 0; i < faces.length; ++i) {
      var face = faces[i];
      check(face.width === w && face.height === h, 'inconsistent cube map face shape');

      if (info.genMipmaps) {
        check(!face.compressed, 'can not generate mipmap for compressed textures');
        check(face.mipmask === 1, 'can not specify mipmaps and generate mipmaps');
      }

      var mipmaps = face.images;
      for (var j = 0; j < 16; ++j) {
        var img = mipmaps[j];
        if (img) {
          var mw = w >> j;
          var mh = h >> j;
          check(face.mipmask & 1 << j, 'missing mipmap data');
          check(img.width === mw && img.height === mh, 'invalid shape for mip images');
          check(img.format === texture.format && img.internalformat === texture.internalformat && img.type === texture.type, 'incompatible type for mip image');

          if (img.compressed) {
            // TODO: check size for compressed images
          } else if (img.data) {
            check(img.data.byteLength === mw * mh * Math.max(pixelSize(img.type, c), img.unpackAlignment), 'invalid data for image, buffer size is inconsistent with image format');
          } else if (img.element) {
            // TODO: check element can be loaded
          } else if (img.copy) {
            // TODO: check compatible format and type
          }
        }
      }
    }
  }

  var check$1 = extend(check, {
    optional: checkOptional,
    raise: raise,
    commandRaise: commandRaise,
    command: checkCommand,
    parameter: checkParameter,
    commandParameter: checkParameterCommand,
    constructor: checkConstructor,
    type: checkTypeOf,
    commandType: checkCommandType,
    isTypedArray: checkIsTypedArray,
    nni: checkNonNegativeInt,
    oneOf: checkOneOf,
    shaderError: checkShaderError,
    linkError: checkLinkError,
    callSite: guessCallSite,
    saveCommandRef: saveCommandRef,
    saveDrawInfo: saveDrawCommandInfo,
    framebufferFormat: checkFramebufferFormat,
    guessCommand: guessCommand,
    texture2D: checkTexture2D,
    textureCube: checkTextureCube
  });

  var VARIABLE_COUNTER = 0;

  var DYN_FUNC = 0;

  function DynamicVariable(type, data) {
    this.id = VARIABLE_COUNTER++;
    this.type = type;
    this.data = data;
  }

  function escapeStr(str) {
    return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  }

  function splitParts(str) {
    if (str.length === 0) {
      return [];
    }

    var firstChar = str.charAt(0);
    var lastChar = str.charAt(str.length - 1);

    if (str.length > 1 && firstChar === lastChar && (firstChar === '"' || firstChar === "'")) {
      return ['"' + escapeStr(str.substr(1, str.length - 2)) + '"'];
    }

    var parts = /\[(false|true|null|\d+|'[^']*'|"[^"]*")\]/.exec(str);
    if (parts) {
      return splitParts(str.substr(0, parts.index)).concat(splitParts(parts[1])).concat(splitParts(str.substr(parts.index + parts[0].length)));
    }

    var subparts = str.split('.');
    if (subparts.length === 1) {
      return ['"' + escapeStr(str) + '"'];
    }

    var result = [];
    for (var i = 0; i < subparts.length; ++i) {
      result = result.concat(splitParts(subparts[i]));
    }
    return result;
  }

  function toAccessorString(str) {
    return '[' + splitParts(str).join('][') + ']';
  }

  function defineDynamic(type, data) {
    return new DynamicVariable(type, toAccessorString(data + ''));
  }

  function isDynamic(x) {
    return typeof x === 'function' && !x._reglType || x instanceof DynamicVariable;
  }

  function unbox(x, path) {
    if (typeof x === 'function') {
      return new DynamicVariable(DYN_FUNC, x);
    }
    return x;
  }

  var dynamic = {
    DynamicVariable: DynamicVariable,
    define: defineDynamic,
    isDynamic: isDynamic,
    unbox: unbox,
    accessor: toAccessorString
  };

  /* globals requestAnimationFrame, cancelAnimationFrame */
  var raf = {
    next: typeof requestAnimationFrame === 'function' ? function (cb) {
      return requestAnimationFrame(cb);
    } : function (cb) {
      return setTimeout(cb, 16);
    },
    cancel: typeof cancelAnimationFrame === 'function' ? function (raf) {
      return cancelAnimationFrame(raf);
    } : clearTimeout
  };

  /* globals performance */
  var clock = typeof performance !== 'undefined' && performance.now ? function () {
    return performance.now();
  } : function () {
    return +new Date();
  };

  function createStringStore() {
    var stringIds = { '': 0 };
    var stringValues = [''];
    return {
      id: function id(str) {
        var result = stringIds[str];
        if (result) {
          return result;
        }
        result = stringIds[str] = stringValues.length;
        stringValues.push(str);
        return result;
      },

      str: function str(id) {
        return stringValues[id];
      }
    };
  }

  // Context and canvas creation helper functions
  function createCanvas(element, onDone, pixelRatio) {
    var canvas = document.createElement('canvas');
    extend(canvas.style, {
      border: 0,
      margin: 0,
      padding: 0,
      top: 0,
      left: 0
    });
    element.appendChild(canvas);

    if (element === document.body) {
      canvas.style.position = 'absolute';
      extend(element.style, {
        margin: 0,
        padding: 0
      });
    }

    function resize() {
      var w = window.innerWidth;
      var h = window.innerHeight;
      if (element !== document.body) {
        var bounds = element.getBoundingClientRect();
        w = bounds.right - bounds.left;
        h = bounds.bottom - bounds.top;
      }
      canvas.width = pixelRatio * w;
      canvas.height = pixelRatio * h;
      extend(canvas.style, {
        width: w + 'px',
        height: h + 'px'
      });
    }

    window.addEventListener('resize', resize, false);

    function onDestroy() {
      window.removeEventListener('resize', resize);
      element.removeChild(canvas);
    }

    resize();

    return {
      canvas: canvas,
      onDestroy: onDestroy
    };
  }

  function createContext(canvas, contexAttributes) {
    function get(name) {
      try {
        return canvas.getContext(name, contexAttributes);
      } catch (e) {
        return null;
      }
    }
    return get('webgl') || get('experimental-webgl') || get('webgl-experimental');
  }

  function isHTMLElement(obj) {
    return typeof obj.nodeName === 'string' && typeof obj.appendChild === 'function' && typeof obj.getBoundingClientRect === 'function';
  }

  function isWebGLContext(obj) {
    return typeof obj.drawArrays === 'function' || typeof obj.drawElements === 'function';
  }

  function parseExtensions(input) {
    if (typeof input === 'string') {
      return input.split();
    }
    check$1(Array.isArray(input), 'invalid extension array');
    return input;
  }

  function getElement(desc) {
    if (typeof desc === 'string') {
      check$1(typeof document !== 'undefined', 'not supported outside of DOM');
      return document.querySelector(desc);
    }
    return desc;
  }

  function parseArgs(args_) {
    var args = args_ || {};
    var element, container, canvas, gl;
    var contextAttributes = {};
    var extensions = [];
    var optionalExtensions = [];
    var pixelRatio = typeof window === 'undefined' ? 1 : window.devicePixelRatio;
    var profile = false;
    var onDone = function onDone(err) {
      if (err) {
        check$1.raise(err);
      }
    };
    var onDestroy = function onDestroy() {};
    if (typeof args === 'string') {
      check$1(typeof document !== 'undefined', 'selector queries only supported in DOM enviroments');
      element = document.querySelector(args);
      check$1(element, 'invalid query string for element');
    } else if ((typeof args === 'undefined' ? 'undefined' : _typeof(args)) === 'object') {
      if (isHTMLElement(args)) {
        element = args;
      } else if (isWebGLContext(args)) {
        gl = args;
        canvas = gl.canvas;
      } else {
        check$1.constructor(args);
        if ('gl' in args) {
          gl = args.gl;
        } else if ('canvas' in args) {
          canvas = getElement(args.canvas);
        } else if ('container' in args) {
          container = getElement(args.container);
        }
        if ('attributes' in args) {
          contextAttributes = args.attributes;
          check$1.type(contextAttributes, 'object', 'invalid context attributes');
        }
        if ('extensions' in args) {
          extensions = parseExtensions(args.extensions);
        }
        if ('optionalExtensions' in args) {
          optionalExtensions = parseExtensions(args.optionalExtensions);
        }
        if ('onDone' in args) {
          check$1.type(args.onDone, 'function', 'invalid or missing onDone callback');
          onDone = args.onDone;
        }
        if ('profile' in args) {
          profile = !!args.profile;
        }
        if ('pixelRatio' in args) {
          pixelRatio = +args.pixelRatio;
          check$1(pixelRatio > 0, 'invalid pixel ratio');
        }
      }
    } else {
      check$1.raise('invalid arguments to regl');
    }

    if (element) {
      if (element.nodeName.toLowerCase() === 'canvas') {
        canvas = element;
      } else {
        container = element;
      }
    }

    if (!gl) {
      if (!canvas) {
        check$1(typeof document !== 'undefined', 'must manually specify webgl context outside of DOM environments');
        var result = createCanvas(container || document.body, onDone, pixelRatio);
        if (!result) {
          return null;
        }
        canvas = result.canvas;
        onDestroy = result.onDestroy;
      }
      gl = createContext(canvas, contextAttributes);
    }

    if (!gl) {
      onDestroy();
      onDone('webgl not supported, try upgrading your browser or graphics drivers http://get.webgl.org');
      return null;
    }

    return {
      gl: gl,
      canvas: canvas,
      container: container,
      extensions: extensions,
      optionalExtensions: optionalExtensions,
      pixelRatio: pixelRatio,
      profile: profile,
      onDone: onDone,
      onDestroy: onDestroy
    };
  }

  function createExtensionCache(gl, config) {
    var extensions = {};

    function tryLoadExtension(name_) {
      check$1.type(name_, 'string', 'extension name must be string');
      var name = name_.toLowerCase();
      var ext;
      try {
        ext = extensions[name] = gl.getExtension(name);
      } catch (e) {}
      return !!ext;
    }

    for (var i = 0; i < config.extensions.length; ++i) {
      var name = config.extensions[i];
      if (!tryLoadExtension(name)) {
        config.onDestroy();
        config.onDone('"' + name + '" extension is not supported by the current WebGL context, try upgrading your system or a different browser');
        return null;
      }
    }

    config.optionalExtensions.forEach(tryLoadExtension);

    return {
      extensions: extensions,
      restore: function restore() {
        Object.keys(extensions).forEach(function (name) {
          if (!tryLoadExtension(name)) {
            throw new Error('(regl): error restoring extension ' + name);
          }
        });
      }
    };
  }

  var GL_SUBPIXEL_BITS = 0x0D50;
  var GL_RED_BITS = 0x0D52;
  var GL_GREEN_BITS = 0x0D53;
  var GL_BLUE_BITS = 0x0D54;
  var GL_ALPHA_BITS = 0x0D55;
  var GL_DEPTH_BITS = 0x0D56;
  var GL_STENCIL_BITS = 0x0D57;

  var GL_ALIASED_POINT_SIZE_RANGE = 0x846D;
  var GL_ALIASED_LINE_WIDTH_RANGE = 0x846E;

  var GL_MAX_TEXTURE_SIZE = 0x0D33;
  var GL_MAX_VIEWPORT_DIMS = 0x0D3A;
  var GL_MAX_VERTEX_ATTRIBS = 0x8869;
  var GL_MAX_VERTEX_UNIFORM_VECTORS = 0x8DFB;
  var GL_MAX_VARYING_VECTORS = 0x8DFC;
  var GL_MAX_COMBINED_TEXTURE_IMAGE_UNITS = 0x8B4D;
  var GL_MAX_VERTEX_TEXTURE_IMAGE_UNITS = 0x8B4C;
  var GL_MAX_TEXTURE_IMAGE_UNITS = 0x8872;
  var GL_MAX_FRAGMENT_UNIFORM_VECTORS = 0x8DFD;
  var GL_MAX_CUBE_MAP_TEXTURE_SIZE = 0x851C;
  var GL_MAX_RENDERBUFFER_SIZE = 0x84E8;

  var GL_VENDOR = 0x1F00;
  var GL_RENDERER = 0x1F01;
  var GL_VERSION = 0x1F02;
  var GL_SHADING_LANGUAGE_VERSION = 0x8B8C;

  var GL_MAX_TEXTURE_MAX_ANISOTROPY_EXT = 0x84FF;

  var GL_MAX_COLOR_ATTACHMENTS_WEBGL = 0x8CDF;
  var GL_MAX_DRAW_BUFFERS_WEBGL = 0x8824;

  var wrapLimits = function wrapLimits(gl, extensions) {
    var maxAnisotropic = 1;
    if (extensions.ext_texture_filter_anisotropic) {
      maxAnisotropic = gl.getParameter(GL_MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    }

    var maxDrawbuffers = 1;
    var maxColorAttachments = 1;
    if (extensions.webgl_draw_buffers) {
      maxDrawbuffers = gl.getParameter(GL_MAX_DRAW_BUFFERS_WEBGL);
      maxColorAttachments = gl.getParameter(GL_MAX_COLOR_ATTACHMENTS_WEBGL);
    }

    return {
      // drawing buffer bit depth
      colorBits: [gl.getParameter(GL_RED_BITS), gl.getParameter(GL_GREEN_BITS), gl.getParameter(GL_BLUE_BITS), gl.getParameter(GL_ALPHA_BITS)],
      depthBits: gl.getParameter(GL_DEPTH_BITS),
      stencilBits: gl.getParameter(GL_STENCIL_BITS),
      subpixelBits: gl.getParameter(GL_SUBPIXEL_BITS),

      // supported extensions
      extensions: Object.keys(extensions).filter(function (ext) {
        return !!extensions[ext];
      }),

      // max aniso samples
      maxAnisotropic: maxAnisotropic,

      // max draw buffers
      maxDrawbuffers: maxDrawbuffers,
      maxColorAttachments: maxColorAttachments,

      // point and line size ranges
      pointSizeDims: gl.getParameter(GL_ALIASED_POINT_SIZE_RANGE),
      lineWidthDims: gl.getParameter(GL_ALIASED_LINE_WIDTH_RANGE),
      maxViewportDims: gl.getParameter(GL_MAX_VIEWPORT_DIMS),
      maxCombinedTextureUnits: gl.getParameter(GL_MAX_COMBINED_TEXTURE_IMAGE_UNITS),
      maxCubeMapSize: gl.getParameter(GL_MAX_CUBE_MAP_TEXTURE_SIZE),
      maxRenderbufferSize: gl.getParameter(GL_MAX_RENDERBUFFER_SIZE),
      maxTextureUnits: gl.getParameter(GL_MAX_TEXTURE_IMAGE_UNITS),
      maxTextureSize: gl.getParameter(GL_MAX_TEXTURE_SIZE),
      maxAttributes: gl.getParameter(GL_MAX_VERTEX_ATTRIBS),
      maxVertexUniforms: gl.getParameter(GL_MAX_VERTEX_UNIFORM_VECTORS),
      maxVertexTextureUnits: gl.getParameter(GL_MAX_VERTEX_TEXTURE_IMAGE_UNITS),
      maxVaryingVectors: gl.getParameter(GL_MAX_VARYING_VECTORS),
      maxFragmentUniforms: gl.getParameter(GL_MAX_FRAGMENT_UNIFORM_VECTORS),

      // vendor info
      glsl: gl.getParameter(GL_SHADING_LANGUAGE_VERSION),
      renderer: gl.getParameter(GL_RENDERER),
      vendor: gl.getParameter(GL_VENDOR),
      version: gl.getParameter(GL_VERSION)
    };
  };

  function isNDArrayLike(obj) {
    return !!obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && Array.isArray(obj.shape) && Array.isArray(obj.stride) && typeof obj.offset === 'number' && obj.shape.length === obj.stride.length && (Array.isArray(obj.data) || isTypedArray(obj.data));
  }

  var values = function values(obj) {
    return Object.keys(obj).map(function (key) {
      return obj[key];
    });
  };

  function loop(n, f) {
    var result = Array(n);
    for (var i = 0; i < n; ++i) {
      result[i] = f(i);
    }
    return result;
  }

  var GL_BYTE$1 = 5120;
  var GL_UNSIGNED_BYTE$2 = 5121;
  var GL_SHORT$1 = 5122;
  var GL_UNSIGNED_SHORT$1 = 5123;
  var GL_INT$1 = 5124;
  var GL_UNSIGNED_INT$1 = 5125;
  var GL_FLOAT$2 = 5126;

  var bufferPool = loop(8, function () {
    return [];
  });

  function nextPow16(v) {
    for (var i = 16; i <= 1 << 28; i *= 16) {
      if (v <= i) {
        return i;
      }
    }
    return 0;
  }

  function log2(v) {
    var r, shift;
    r = (v > 0xFFFF) << 4;
    v >>>= r;
    shift = (v > 0xFF) << 3;
    v >>>= shift;r |= shift;
    shift = (v > 0xF) << 2;
    v >>>= shift;r |= shift;
    shift = (v > 0x3) << 1;
    v >>>= shift;r |= shift;
    return r | v >> 1;
  }

  function alloc(n) {
    var sz = nextPow16(n);
    var bin = bufferPool[log2(sz) >> 2];
    if (bin.length > 0) {
      return bin.pop();
    }
    return new ArrayBuffer(sz);
  }

  function free(buf) {
    bufferPool[log2(buf.byteLength) >> 2].push(buf);
  }

  function allocType(type, n) {
    var result = null;
    switch (type) {
      case GL_BYTE$1:
        result = new Int8Array(alloc(n), 0, n);
        break;
      case GL_UNSIGNED_BYTE$2:
        result = new Uint8Array(alloc(n), 0, n);
        break;
      case GL_SHORT$1:
        result = new Int16Array(alloc(2 * n), 0, n);
        break;
      case GL_UNSIGNED_SHORT$1:
        result = new Uint16Array(alloc(2 * n), 0, n);
        break;
      case GL_INT$1:
        result = new Int32Array(alloc(4 * n), 0, n);
        break;
      case GL_UNSIGNED_INT$1:
        result = new Uint32Array(alloc(4 * n), 0, n);
        break;
      case GL_FLOAT$2:
        result = new Float32Array(alloc(4 * n), 0, n);
        break;
      default:
        return null;
    }
    if (result.length !== n) {
      return result.subarray(0, n);
    }
    return result;
  }

  function freeType(array) {
    free(array.buffer);
  }

  var pool = {
    alloc: alloc,
    free: free,
    allocType: allocType,
    freeType: freeType
  };

  var flattenUtils = {
    shape: arrayShape$1,
    flatten: flattenArray
  };

  function flatten1D(array, nx, out) {
    for (var i = 0; i < nx; ++i) {
      out[i] = array[i];
    }
  }

  function flatten2D(array, nx, ny, out) {
    var ptr = 0;
    for (var i = 0; i < nx; ++i) {
      var row = array[i];
      for (var j = 0; j < ny; ++j) {
        out[ptr++] = row[j];
      }
    }
  }

  function flatten3D(array, nx, ny, nz, out, ptr_) {
    var ptr = ptr_;
    for (var i = 0; i < nx; ++i) {
      var row = array[i];
      for (var j = 0; j < ny; ++j) {
        var col = row[j];
        for (var k = 0; k < nz; ++k) {
          out[ptr++] = col[k];
        }
      }
    }
  }

  function flattenRec(array, shape, level, out, ptr) {
    var stride = 1;
    for (var i = level + 1; i < shape.length; ++i) {
      stride *= shape[i];
    }
    var n = shape[level];
    if (shape.length - level === 4) {
      var nx = shape[level + 1];
      var ny = shape[level + 2];
      var nz = shape[level + 3];
      for (i = 0; i < n; ++i) {
        flatten3D(array[i], nx, ny, nz, out, ptr);
        ptr += stride;
      }
    } else {
      for (i = 0; i < n; ++i) {
        flattenRec(array[i], shape, level + 1, out, ptr);
        ptr += stride;
      }
    }
  }

  function flattenArray(array, shape, type, out_) {
    var sz = 1;
    if (shape.length) {
      for (var i = 0; i < shape.length; ++i) {
        sz *= shape[i];
      }
    } else {
      sz = 0;
    }
    var out = out_ || pool.allocType(type, sz);
    switch (shape.length) {
      case 0:
        break;
      case 1:
        flatten1D(array, shape[0], out);
        break;
      case 2:
        flatten2D(array, shape[0], shape[1], out);
        break;
      case 3:
        flatten3D(array, shape[0], shape[1], shape[2], out, 0);
        break;
      default:
        flattenRec(array, shape, 0, out, 0);
    }
    return out;
  }

  function arrayShape$1(array_) {
    var shape = [];
    for (var array = array_; array.length; array = array[0]) {
      shape.push(array.length);
    }
    return shape;
  }

  var int8 = 5120;
  var int16 = 5122;
  var int32 = 5124;
  var uint8 = 5121;
  var uint16 = 5123;
  var uint32 = 5125;
  var float = 5126;
  var float32 = 5126;
  var glTypes = {
    int8: int8,
    int16: int16,
    int32: int32,
    uint8: uint8,
    uint16: uint16,
    uint32: uint32,
    float: float,
    float32: float32
  };

  var dynamic$1 = 35048;
  var stream = 35040;
  var usageTypes = {
    dynamic: dynamic$1,
    stream: stream,
    "static": 35044
  };

  var arrayFlatten = flattenUtils.flatten;
  var arrayShape = flattenUtils.shape;

  var GL_STATIC_DRAW = 0x88E4;
  var GL_STREAM_DRAW = 0x88E0;

  var GL_UNSIGNED_BYTE$1 = 5121;
  var GL_FLOAT$1 = 5126;

  var DTYPES_SIZES = [];
  DTYPES_SIZES[5120] = 1; // int8
  DTYPES_SIZES[5122] = 2; // int16
  DTYPES_SIZES[5124] = 4; // int32
  DTYPES_SIZES[5121] = 1; // uint8
  DTYPES_SIZES[5123] = 2; // uint16
  DTYPES_SIZES[5125] = 4; // uint32
  DTYPES_SIZES[5126] = 4; // float32

  function typedArrayCode(data) {
    return arrayTypes[Object.prototype.toString.call(data)] | 0;
  }

  function copyArray(out, inp) {
    for (var i = 0; i < inp.length; ++i) {
      out[i] = inp[i];
    }
  }

  function transpose(result, data, shapeX, shapeY, strideX, strideY, offset) {
    var ptr = 0;
    for (var i = 0; i < shapeX; ++i) {
      for (var j = 0; j < shapeY; ++j) {
        result[ptr++] = data[strideX * i + strideY * j + offset];
      }
    }
  }

  function wrapBufferState(gl, stats, config) {
    var bufferCount = 0;
    var bufferSet = {};

    function REGLBuffer(type) {
      this.id = bufferCount++;
      this.buffer = gl.createBuffer();
      this.type = type;
      this.usage = GL_STATIC_DRAW;
      this.byteLength = 0;
      this.dimension = 1;
      this.dtype = GL_UNSIGNED_BYTE$1;

      this.persistentData = null;

      if (config.profile) {
        this.stats = { size: 0 };
      }
    }

    REGLBuffer.prototype.bind = function () {
      gl.bindBuffer(this.type, this.buffer);
    };

    REGLBuffer.prototype.destroy = function () {
      destroy(this);
    };

    var streamPool = [];

    function createStream(type, data) {
      var buffer = streamPool.pop();
      if (!buffer) {
        buffer = new REGLBuffer(type);
      }
      buffer.bind();
      initBufferFromData(buffer, data, GL_STREAM_DRAW, 0, 1, false);
      return buffer;
    }

    function destroyStream(stream$$1) {
      streamPool.push(stream$$1);
    }

    function initBufferFromTypedArray(buffer, data, usage) {
      buffer.byteLength = data.byteLength;
      gl.bufferData(buffer.type, data, usage);
    }

    function initBufferFromData(buffer, data, usage, dtype, dimension, persist) {
      var shape;
      buffer.usage = usage;
      if (Array.isArray(data)) {
        buffer.dtype = dtype || GL_FLOAT$1;
        if (data.length > 0) {
          var flatData;
          if (Array.isArray(data[0])) {
            shape = arrayShape(data);
            var dim = 1;
            for (var i = 1; i < shape.length; ++i) {
              dim *= shape[i];
            }
            buffer.dimension = dim;
            flatData = arrayFlatten(data, shape, buffer.dtype);
            initBufferFromTypedArray(buffer, flatData, usage);
            if (persist) {
              buffer.persistentData = flatData;
            } else {
              pool.freeType(flatData);
            }
          } else if (typeof data[0] === 'number') {
            buffer.dimension = dimension;
            var typedData = pool.allocType(buffer.dtype, data.length);
            copyArray(typedData, data);
            initBufferFromTypedArray(buffer, typedData, usage);
            if (persist) {
              buffer.persistentData = typedData;
            } else {
              pool.freeType(typedData);
            }
          } else if (isTypedArray(data[0])) {
            buffer.dimension = data[0].length;
            buffer.dtype = dtype || typedArrayCode(data[0]) || GL_FLOAT$1;
            flatData = arrayFlatten(data, [data.length, data[0].length], buffer.dtype);
            initBufferFromTypedArray(buffer, flatData, usage);
            if (persist) {
              buffer.persistentData = flatData;
            } else {
              pool.freeType(flatData);
            }
          } else {
            check$1.raise('invalid buffer data');
          }
        }
      } else if (isTypedArray(data)) {
        buffer.dtype = dtype || typedArrayCode(data);
        buffer.dimension = dimension;
        initBufferFromTypedArray(buffer, data, usage);
        if (persist) {
          buffer.persistentData = new Uint8Array(new Uint8Array(data.buffer));
        }
      } else if (isNDArrayLike(data)) {
        shape = data.shape;
        var stride = data.stride;
        var offset = data.offset;

        var shapeX = 0;
        var shapeY = 0;
        var strideX = 0;
        var strideY = 0;
        if (shape.length === 1) {
          shapeX = shape[0];
          shapeY = 1;
          strideX = stride[0];
          strideY = 0;
        } else if (shape.length === 2) {
          shapeX = shape[0];
          shapeY = shape[1];
          strideX = stride[0];
          strideY = stride[1];
        } else {
          check$1.raise('invalid shape');
        }

        buffer.dtype = dtype || typedArrayCode(data.data) || GL_FLOAT$1;
        buffer.dimension = shapeY;

        var transposeData = pool.allocType(buffer.dtype, shapeX * shapeY);
        transpose(transposeData, data.data, shapeX, shapeY, strideX, strideY, offset);
        initBufferFromTypedArray(buffer, transposeData, usage);
        if (persist) {
          buffer.persistentData = transposeData;
        } else {
          pool.freeType(transposeData);
        }
      } else {
        check$1.raise('invalid buffer data');
      }
    }

    function destroy(buffer) {
      stats.bufferCount--;

      var handle = buffer.buffer;
      check$1(handle, 'buffer must not be deleted already');
      gl.deleteBuffer(handle);
      buffer.buffer = null;
      delete bufferSet[buffer.id];
    }

    function createBuffer(options, type, deferInit, persistent) {
      stats.bufferCount++;

      var buffer = new REGLBuffer(type);
      bufferSet[buffer.id] = buffer;

      function reglBuffer(options) {
        var usage = GL_STATIC_DRAW;
        var data = null;
        var byteLength = 0;
        var dtype = 0;
        var dimension = 1;
        if (Array.isArray(options) || isTypedArray(options) || isNDArrayLike(options)) {
          data = options;
        } else if (typeof options === 'number') {
          byteLength = options | 0;
        } else if (options) {
          check$1.type(options, 'object', 'buffer arguments must be an object, a number or an array');

          if ('data' in options) {
            check$1(data === null || Array.isArray(data) || isTypedArray(data) || isNDArrayLike(data), 'invalid data for buffer');
            data = options.data;
          }

          if ('usage' in options) {
            check$1.parameter(options.usage, usageTypes, 'invalid buffer usage');
            usage = usageTypes[options.usage];
          }

          if ('type' in options) {
            check$1.parameter(options.type, glTypes, 'invalid buffer type');
            dtype = glTypes[options.type];
          }

          if ('dimension' in options) {
            check$1.type(options.dimension, 'number', 'invalid dimension');
            dimension = options.dimension | 0;
          }

          if ('length' in options) {
            check$1.nni(byteLength, 'buffer length must be a nonnegative integer');
            byteLength = options.length | 0;
          }
        }

        buffer.bind();
        if (!data) {
          gl.bufferData(buffer.type, byteLength, usage);
          buffer.dtype = dtype || GL_UNSIGNED_BYTE$1;
          buffer.usage = usage;
          buffer.dimension = dimension;
          buffer.byteLength = byteLength;
        } else {
          initBufferFromData(buffer, data, usage, dtype, dimension, persistent);
        }

        if (config.profile) {
          buffer.stats.size = buffer.byteLength * DTYPES_SIZES[buffer.dtype];
        }

        return reglBuffer;
      }

      function setSubData(data, offset) {
        check$1(offset + data.byteLength <= buffer.byteLength, 'invalid buffer subdata call, buffer is too small. ' + ' Can\'t write data of size ' + data.byteLength + ' starting from offset ' + offset + ' to a buffer of size ' + buffer.byteLength);

        gl.bufferSubData(buffer.type, offset, data);
      }

      function subdata(data, offset_) {
        var offset = (offset_ || 0) | 0;
        var shape;
        buffer.bind();
        if (Array.isArray(data)) {
          if (data.length > 0) {
            if (typeof data[0] === 'number') {
              var converted = pool.allocType(buffer.dtype, data.length);
              copyArray(converted, data);
              setSubData(converted, offset);
              pool.freeType(converted);
            } else if (Array.isArray(data[0]) || isTypedArray(data[0])) {
              shape = arrayShape(data);
              var flatData = arrayFlatten(data, shape, buffer.dtype);
              setSubData(flatData, offset);
              pool.freeType(flatData);
            } else {
              check$1.raise('invalid buffer data');
            }
          }
        } else if (isTypedArray(data)) {
          setSubData(data, offset);
        } else if (isNDArrayLike(data)) {
          shape = data.shape;
          var stride = data.stride;

          var shapeX = 0;
          var shapeY = 0;
          var strideX = 0;
          var strideY = 0;
          if (shape.length === 1) {
            shapeX = shape[0];
            shapeY = 1;
            strideX = stride[0];
            strideY = 0;
          } else if (shape.length === 2) {
            shapeX = shape[0];
            shapeY = shape[1];
            strideX = stride[0];
            strideY = stride[1];
          } else {
            check$1.raise('invalid shape');
          }
          var dtype = Array.isArray(data.data) ? buffer.dtype : typedArrayCode(data.data);

          var transposeData = pool.allocType(dtype, shapeX * shapeY);
          transpose(transposeData, data.data, shapeX, shapeY, strideX, strideY, data.offset);
          setSubData(transposeData, offset);
          pool.freeType(transposeData);
        } else {
          check$1.raise('invalid data for buffer subdata');
        }
        return reglBuffer;
      }

      if (!deferInit) {
        reglBuffer(options);
      }

      reglBuffer._reglType = 'buffer';
      reglBuffer._buffer = buffer;
      reglBuffer.subdata = subdata;
      if (config.profile) {
        reglBuffer.stats = buffer.stats;
      }
      reglBuffer.destroy = function () {
        destroy(buffer);
      };

      return reglBuffer;
    }

    function restoreBuffers() {
      values(bufferSet).forEach(function (buffer) {
        buffer.buffer = gl.createBuffer();
        gl.bindBuffer(buffer.type, buffer.buffer);
        gl.bufferData(buffer.type, buffer.persistentData || buffer.byteLength, buffer.usage);
      });
    }

    if (config.profile) {
      stats.getTotalBufferSize = function () {
        var total = 0;
        // TODO: Right now, the streams are not part of the total count.
        Object.keys(bufferSet).forEach(function (key) {
          total += bufferSet[key].stats.size;
        });
        return total;
      };
    }

    return {
      create: createBuffer,

      createStream: createStream,
      destroyStream: destroyStream,

      clear: function clear() {
        values(bufferSet).forEach(destroy);
        streamPool.forEach(destroy);
      },

      getBuffer: function getBuffer(wrapper) {
        if (wrapper && wrapper._buffer instanceof REGLBuffer) {
          return wrapper._buffer;
        }
        return null;
      },

      restore: restoreBuffers,

      _initBuffer: initBufferFromData
    };
  }

  var points = 0;
  var point = 0;
  var lines = 1;
  var line = 1;
  var triangles = 4;
  var triangle = 4;
  var primTypes = {
    points: points,
    point: point,
    lines: lines,
    line: line,
    triangles: triangles,
    triangle: triangle,
    "line loop": 2,
    "line strip": 3,
    "triangle strip": 5,
    "triangle fan": 6
  };

  var GL_POINTS = 0;
  var GL_LINES = 1;
  var GL_TRIANGLES = 4;

  var GL_BYTE$2 = 5120;
  var GL_UNSIGNED_BYTE$3 = 5121;
  var GL_SHORT$2 = 5122;
  var GL_UNSIGNED_SHORT$2 = 5123;
  var GL_INT$2 = 5124;
  var GL_UNSIGNED_INT$2 = 5125;

  var GL_ELEMENT_ARRAY_BUFFER = 34963;

  var GL_STREAM_DRAW$1 = 0x88E0;
  var GL_STATIC_DRAW$1 = 0x88E4;

  function wrapElementsState(gl, extensions, bufferState, stats) {
    var elementSet = {};
    var elementCount = 0;

    var elementTypes = {
      'uint8': GL_UNSIGNED_BYTE$3,
      'uint16': GL_UNSIGNED_SHORT$2
    };

    if (extensions.oes_element_index_uint) {
      elementTypes.uint32 = GL_UNSIGNED_INT$2;
    }

    function REGLElementBuffer(buffer) {
      this.id = elementCount++;
      elementSet[this.id] = this;
      this.buffer = buffer;
      this.primType = GL_TRIANGLES;
      this.vertCount = 0;
      this.type = 0;
    }

    REGLElementBuffer.prototype.bind = function () {
      this.buffer.bind();
    };

    var bufferPool = [];

    function createElementStream(data) {
      var result = bufferPool.pop();
      if (!result) {
        result = new REGLElementBuffer(bufferState.create(null, GL_ELEMENT_ARRAY_BUFFER, true, false)._buffer);
      }
      initElements(result, data, GL_STREAM_DRAW$1, -1, -1, 0, 0);
      return result;
    }

    function destroyElementStream(elements) {
      bufferPool.push(elements);
    }

    function initElements(elements, data, usage, prim, count, byteLength, type) {
      elements.buffer.bind();
      if (data) {
        var predictedType = type;
        if (!type && (!isTypedArray(data) || isNDArrayLike(data) && !isTypedArray(data.data))) {
          predictedType = extensions.oes_element_index_uint ? GL_UNSIGNED_INT$2 : GL_UNSIGNED_SHORT$2;
        }
        bufferState._initBuffer(elements.buffer, data, usage, predictedType, 3);
      } else {
        gl.bufferData(GL_ELEMENT_ARRAY_BUFFER, byteLength, usage);
        elements.buffer.dtype = dtype || GL_UNSIGNED_BYTE$3;
        elements.buffer.usage = usage;
        elements.buffer.dimension = 3;
        elements.buffer.byteLength = byteLength;
      }

      var dtype = type;
      if (!type) {
        switch (elements.buffer.dtype) {
          case GL_UNSIGNED_BYTE$3:
          case GL_BYTE$2:
            dtype = GL_UNSIGNED_BYTE$3;
            break;

          case GL_UNSIGNED_SHORT$2:
          case GL_SHORT$2:
            dtype = GL_UNSIGNED_SHORT$2;
            break;

          case GL_UNSIGNED_INT$2:
          case GL_INT$2:
            dtype = GL_UNSIGNED_INT$2;
            break;

          default:
            check$1.raise('unsupported type for element array');
        }
        elements.buffer.dtype = dtype;
      }
      elements.type = dtype;

      // Check oes_element_index_uint extension
      check$1(dtype !== GL_UNSIGNED_INT$2 || !!extensions.oes_element_index_uint, '32 bit element buffers not supported, enable oes_element_index_uint first');

      // try to guess default primitive type and arguments
      var vertCount = count;
      if (vertCount < 0) {
        vertCount = elements.buffer.byteLength;
        if (dtype === GL_UNSIGNED_SHORT$2) {
          vertCount >>= 1;
        } else if (dtype === GL_UNSIGNED_INT$2) {
          vertCount >>= 2;
        }
      }
      elements.vertCount = vertCount;

      // try to guess primitive type from cell dimension
      var primType = prim;
      if (prim < 0) {
        primType = GL_TRIANGLES;
        var dimension = elements.buffer.dimension;
        if (dimension === 1) primType = GL_POINTS;
        if (dimension === 2) primType = GL_LINES;
        if (dimension === 3) primType = GL_TRIANGLES;
      }
      elements.primType = primType;
    }

    function destroyElements(elements) {
      stats.elementsCount--;

      check$1(elements.buffer !== null, 'must not double destroy elements');
      delete elementSet[elements.id];
      elements.buffer.destroy();
      elements.buffer = null;
    }

    function createElements(options, persistent) {
      var buffer = bufferState.create(null, GL_ELEMENT_ARRAY_BUFFER, true);
      var elements = new REGLElementBuffer(buffer._buffer);
      stats.elementsCount++;

      function reglElements(options) {
        if (!options) {
          buffer();
          elements.primType = GL_TRIANGLES;
          elements.vertCount = 0;
          elements.type = GL_UNSIGNED_BYTE$3;
        } else if (typeof options === 'number') {
          buffer(options);
          elements.primType = GL_TRIANGLES;
          elements.vertCount = options | 0;
          elements.type = GL_UNSIGNED_BYTE$3;
        } else {
          var data = null;
          var usage = GL_STATIC_DRAW$1;
          var primType = -1;
          var vertCount = -1;
          var byteLength = 0;
          var dtype = 0;
          if (Array.isArray(options) || isTypedArray(options) || isNDArrayLike(options)) {
            data = options;
          } else {
            check$1.type(options, 'object', 'invalid arguments for elements');
            if ('data' in options) {
              data = options.data;
              check$1(Array.isArray(data) || isTypedArray(data) || isNDArrayLike(data), 'invalid data for element buffer');
            }
            if ('usage' in options) {
              check$1.parameter(options.usage, usageTypes, 'invalid element buffer usage');
              usage = usageTypes[options.usage];
            }
            if ('primitive' in options) {
              check$1.parameter(options.primitive, primTypes, 'invalid element buffer primitive');
              primType = primTypes[options.primitive];
            }
            if ('count' in options) {
              check$1(typeof options.count === 'number' && options.count >= 0, 'invalid vertex count for elements');
              vertCount = options.count | 0;
            }
            if ('type' in options) {
              check$1.parameter(options.type, elementTypes, 'invalid buffer type');
              dtype = elementTypes[options.type];
            }
            if ('length' in options) {
              byteLength = options.length | 0;
            } else {
              byteLength = vertCount;
              if (dtype === GL_UNSIGNED_SHORT$2 || dtype === GL_SHORT$2) {
                byteLength *= 2;
              } else if (dtype === GL_UNSIGNED_INT$2 || dtype === GL_INT$2) {
                byteLength *= 4;
              }
            }
          }
          initElements(elements, data, usage, primType, vertCount, byteLength, dtype);
        }

        return reglElements;
      }

      reglElements(options);

      reglElements._reglType = 'elements';
      reglElements._elements = elements;
      reglElements.subdata = function (data, offset) {
        buffer.subdata(data, offset);
        return reglElements;
      };
      reglElements.destroy = function () {
        destroyElements(elements);
      };

      return reglElements;
    }

    return {
      create: createElements,
      createStream: createElementStream,
      destroyStream: destroyElementStream,
      getElements: function getElements(elements) {
        if (typeof elements === 'function' && elements._elements instanceof REGLElementBuffer) {
          return elements._elements;
        }
        return null;
      },
      clear: function clear() {
        values(elementSet).forEach(destroyElements);
      }
    };
  }

  var FLOAT = new Float32Array(1);
  var INT = new Uint32Array(FLOAT.buffer);

  var GL_UNSIGNED_SHORT$4 = 5123;

  function convertToHalfFloat(array) {
    var ushorts = pool.allocType(GL_UNSIGNED_SHORT$4, array.length);

    for (var i = 0; i < array.length; ++i) {
      if (isNaN(array[i])) {
        ushorts[i] = 0xffff;
      } else if (array[i] === Infinity) {
        ushorts[i] = 0x7c00;
      } else if (array[i] === -Infinity) {
        ushorts[i] = 0xfc00;
      } else {
        FLOAT[0] = array[i];
        var x = INT[0];

        var sgn = x >>> 31 << 15;
        var exp = (x << 1 >>> 24) - 127;
        var frac = x >> 13 & (1 << 10) - 1;

        if (exp < -24) {
          // round non-representable denormals to 0
          ushorts[i] = sgn;
        } else if (exp < -14) {
          // handle denormals
          var s = -14 - exp;
          ushorts[i] = sgn + (frac + (1 << 10) >> s);
        } else if (exp > 15) {
          // round overflow to +/- Infinity
          ushorts[i] = sgn + 0x7c00;
        } else {
          // otherwise convert directly
          ushorts[i] = sgn + (exp + 15 << 10) + frac;
        }
      }
    }

    return ushorts;
  }

  function isArrayLike(s) {
    return Array.isArray(s) || isTypedArray(s);
  }

  var GL_COMPRESSED_TEXTURE_FORMATS = 0x86A3;

  var GL_TEXTURE_2D = 0x0DE1;
  var GL_TEXTURE_CUBE_MAP = 0x8513;
  var GL_TEXTURE_CUBE_MAP_POSITIVE_X = 0x8515;

  var GL_RGBA = 0x1908;
  var GL_ALPHA = 0x1906;
  var GL_RGB = 0x1907;
  var GL_LUMINANCE = 0x1909;
  var GL_LUMINANCE_ALPHA = 0x190A;

  var GL_RGBA4 = 0x8056;
  var GL_RGB5_A1 = 0x8057;
  var GL_RGB565 = 0x8D62;

  var GL_UNSIGNED_SHORT_4_4_4_4$1 = 0x8033;
  var GL_UNSIGNED_SHORT_5_5_5_1$1 = 0x8034;
  var GL_UNSIGNED_SHORT_5_6_5$1 = 0x8363;
  var GL_UNSIGNED_INT_24_8_WEBGL$1 = 0x84FA;

  var GL_DEPTH_COMPONENT = 0x1902;
  var GL_DEPTH_STENCIL = 0x84F9;

  var GL_SRGB_EXT = 0x8C40;
  var GL_SRGB_ALPHA_EXT = 0x8C42;

  var GL_HALF_FLOAT_OES$1 = 0x8D61;

  var GL_COMPRESSED_RGB_S3TC_DXT1_EXT = 0x83F0;
  var GL_COMPRESSED_RGBA_S3TC_DXT1_EXT = 0x83F1;
  var GL_COMPRESSED_RGBA_S3TC_DXT3_EXT = 0x83F2;
  var GL_COMPRESSED_RGBA_S3TC_DXT5_EXT = 0x83F3;

  var GL_COMPRESSED_RGB_ATC_WEBGL = 0x8C92;
  var GL_COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL = 0x8C93;
  var GL_COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL = 0x87EE;

  var GL_COMPRESSED_RGB_PVRTC_4BPPV1_IMG = 0x8C00;
  var GL_COMPRESSED_RGB_PVRTC_2BPPV1_IMG = 0x8C01;
  var GL_COMPRESSED_RGBA_PVRTC_4BPPV1_IMG = 0x8C02;
  var GL_COMPRESSED_RGBA_PVRTC_2BPPV1_IMG = 0x8C03;

  var GL_COMPRESSED_RGB_ETC1_WEBGL = 0x8D64;

  var GL_UNSIGNED_BYTE$4 = 0x1401;
  var GL_UNSIGNED_SHORT$3 = 0x1403;
  var GL_UNSIGNED_INT$3 = 0x1405;
  var GL_FLOAT$3 = 0x1406;

  var GL_TEXTURE_WRAP_S = 0x2802;
  var GL_TEXTURE_WRAP_T = 0x2803;

  var GL_REPEAT = 0x2901;
  var GL_CLAMP_TO_EDGE$1 = 0x812F;
  var GL_MIRRORED_REPEAT = 0x8370;

  var GL_TEXTURE_MAG_FILTER = 0x2800;
  var GL_TEXTURE_MIN_FILTER = 0x2801;

  var GL_NEAREST$1 = 0x2600;
  var GL_LINEAR = 0x2601;
  var GL_NEAREST_MIPMAP_NEAREST$1 = 0x2700;
  var GL_LINEAR_MIPMAP_NEAREST$1 = 0x2701;
  var GL_NEAREST_MIPMAP_LINEAR$1 = 0x2702;
  var GL_LINEAR_MIPMAP_LINEAR$1 = 0x2703;

  var GL_GENERATE_MIPMAP_HINT = 0x8192;
  var GL_DONT_CARE = 0x1100;
  var GL_FASTEST = 0x1101;
  var GL_NICEST = 0x1102;

  var GL_TEXTURE_MAX_ANISOTROPY_EXT = 0x84FE;

  var GL_UNPACK_ALIGNMENT = 0x0CF5;
  var GL_UNPACK_FLIP_Y_WEBGL = 0x9240;
  var GL_UNPACK_PREMULTIPLY_ALPHA_WEBGL = 0x9241;
  var GL_UNPACK_COLORSPACE_CONVERSION_WEBGL = 0x9243;

  var GL_BROWSER_DEFAULT_WEBGL = 0x9244;

  var GL_TEXTURE0 = 0x84C0;

  var MIPMAP_FILTERS = [GL_NEAREST_MIPMAP_NEAREST$1, GL_NEAREST_MIPMAP_LINEAR$1, GL_LINEAR_MIPMAP_NEAREST$1, GL_LINEAR_MIPMAP_LINEAR$1];

  var CHANNELS_FORMAT = [0, GL_LUMINANCE, GL_LUMINANCE_ALPHA, GL_RGB, GL_RGBA];

  var FORMAT_CHANNELS = {};
  FORMAT_CHANNELS[GL_LUMINANCE] = FORMAT_CHANNELS[GL_ALPHA] = FORMAT_CHANNELS[GL_DEPTH_COMPONENT] = 1;
  FORMAT_CHANNELS[GL_DEPTH_STENCIL] = FORMAT_CHANNELS[GL_LUMINANCE_ALPHA] = 2;
  FORMAT_CHANNELS[GL_RGB] = FORMAT_CHANNELS[GL_SRGB_EXT] = 3;
  FORMAT_CHANNELS[GL_RGBA] = FORMAT_CHANNELS[GL_SRGB_ALPHA_EXT] = 4;

  function objectName(str) {
    return '[object ' + str + ']';
  }

  var CANVAS_CLASS = objectName('HTMLCanvasElement');
  var CONTEXT2D_CLASS = objectName('CanvasRenderingContext2D');
  var IMAGE_CLASS = objectName('HTMLImageElement');
  var VIDEO_CLASS = objectName('HTMLVideoElement');

  var PIXEL_CLASSES = Object.keys(arrayTypes).concat([CANVAS_CLASS, CONTEXT2D_CLASS, IMAGE_CLASS, VIDEO_CLASS]);

  // for every texture type, store
  // the size in bytes.
  var TYPE_SIZES = [];
  TYPE_SIZES[GL_UNSIGNED_BYTE$4] = 1;
  TYPE_SIZES[GL_FLOAT$3] = 4;
  TYPE_SIZES[GL_HALF_FLOAT_OES$1] = 2;

  TYPE_SIZES[GL_UNSIGNED_SHORT$3] = 2;
  TYPE_SIZES[GL_UNSIGNED_INT$3] = 4;

  var FORMAT_SIZES_SPECIAL = [];
  FORMAT_SIZES_SPECIAL[GL_RGBA4] = 2;
  FORMAT_SIZES_SPECIAL[GL_RGB5_A1] = 2;
  FORMAT_SIZES_SPECIAL[GL_RGB565] = 2;
  FORMAT_SIZES_SPECIAL[GL_DEPTH_STENCIL] = 4;

  FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGB_S3TC_DXT1_EXT] = 0.5;
  FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGBA_S3TC_DXT1_EXT] = 0.5;
  FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGBA_S3TC_DXT3_EXT] = 1;
  FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGBA_S3TC_DXT5_EXT] = 1;

  FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGB_ATC_WEBGL] = 0.5;
  FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL] = 1;
  FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL] = 1;

  FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGB_PVRTC_4BPPV1_IMG] = 0.5;
  FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGB_PVRTC_2BPPV1_IMG] = 0.25;
  FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGBA_PVRTC_4BPPV1_IMG] = 0.5;
  FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGBA_PVRTC_2BPPV1_IMG] = 0.25;

  FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGB_ETC1_WEBGL] = 0.5;

  function isNumericArray(arr) {
    return Array.isArray(arr) && (arr.length === 0 || typeof arr[0] === 'number');
  }

  function isRectArray(arr) {
    if (!Array.isArray(arr)) {
      return false;
    }
    var width = arr.length;
    if (width === 0 || !isArrayLike(arr[0])) {
      return false;
    }
    return true;
  }

  function classString(x) {
    return Object.prototype.toString.call(x);
  }

  function isCanvasElement(object) {
    return classString(object) === CANVAS_CLASS;
  }

  function isContext2D(object) {
    return classString(object) === CONTEXT2D_CLASS;
  }

  function isImageElement(object) {
    return classString(object) === IMAGE_CLASS;
  }

  function isVideoElement(object) {
    return classString(object) === VIDEO_CLASS;
  }

  function isPixelData(object) {
    if (!object) {
      return false;
    }
    var className = classString(object);
    if (PIXEL_CLASSES.indexOf(className) >= 0) {
      return true;
    }
    return isNumericArray(object) || isRectArray(object) || isNDArrayLike(object);
  }

  function typedArrayCode$1(data) {
    return arrayTypes[Object.prototype.toString.call(data)] | 0;
  }

  function convertData(result, data) {
    var n = data.length;
    switch (result.type) {
      case GL_UNSIGNED_BYTE$4:
      case GL_UNSIGNED_SHORT$3:
      case GL_UNSIGNED_INT$3:
      case GL_FLOAT$3:
        var converted = pool.allocType(result.type, n);
        converted.set(data);
        result.data = converted;
        break;

      case GL_HALF_FLOAT_OES$1:
        result.data = convertToHalfFloat(data);
        break;

      default:
        check$1.raise('unsupported texture type, must specify a typed array');
    }
  }

  function preConvert(image, n) {
    return pool.allocType(image.type === GL_HALF_FLOAT_OES$1 ? GL_FLOAT$3 : image.type, n);
  }

  function postConvert(image, data) {
    if (image.type === GL_HALF_FLOAT_OES$1) {
      image.data = convertToHalfFloat(data);
      pool.freeType(data);
    } else {
      image.data = data;
    }
  }

  function transposeData(image, array, strideX, strideY, strideC, offset) {
    var w = image.width;
    var h = image.height;
    var c = image.channels;
    var n = w * h * c;
    var data = preConvert(image, n);

    var p = 0;
    for (var i = 0; i < h; ++i) {
      for (var j = 0; j < w; ++j) {
        for (var k = 0; k < c; ++k) {
          data[p++] = array[strideX * j + strideY * i + strideC * k + offset];
        }
      }
    }

    postConvert(image, data);
  }

  function getTextureSize(format, type, width, height, isMipmap, isCube) {
    var s;
    if (typeof FORMAT_SIZES_SPECIAL[format] !== 'undefined') {
      // we have a special array for dealing with weird color formats such as RGB5A1
      s = FORMAT_SIZES_SPECIAL[format];
    } else {
      s = FORMAT_CHANNELS[format] * TYPE_SIZES[type];
    }

    if (isCube) {
      s *= 6;
    }

    if (isMipmap) {
      // compute the total size of all the mipmaps.
      var total = 0;

      var w = width;
      while (w >= 1) {
        // we can only use mipmaps on a square image,
        // so we can simply use the width and ignore the height:
        total += s * w * w;
        w /= 2;
      }
      return total;
    } else {
      return s * width * height;
    }
  }

  function createTextureSet(gl, extensions, limits, reglPoll, contextState, stats, config) {
    // -------------------------------------------------------
    // Initialize constants and parameter tables here
    // -------------------------------------------------------
    var mipmapHint = {
      "don't care": GL_DONT_CARE,
      'dont care': GL_DONT_CARE,
      'nice': GL_NICEST,
      'fast': GL_FASTEST
    };

    var wrapModes = {
      'repeat': GL_REPEAT,
      'clamp': GL_CLAMP_TO_EDGE$1,
      'mirror': GL_MIRRORED_REPEAT
    };

    var magFilters = {
      'nearest': GL_NEAREST$1,
      'linear': GL_LINEAR
    };

    var minFilters = extend({
      'mipmap': GL_LINEAR_MIPMAP_LINEAR$1,
      'nearest mipmap nearest': GL_NEAREST_MIPMAP_NEAREST$1,
      'linear mipmap nearest': GL_LINEAR_MIPMAP_NEAREST$1,
      'nearest mipmap linear': GL_NEAREST_MIPMAP_LINEAR$1,
      'linear mipmap linear': GL_LINEAR_MIPMAP_LINEAR$1
    }, magFilters);

    var colorSpace = {
      'none': 0,
      'browser': GL_BROWSER_DEFAULT_WEBGL
    };

    var textureTypes = {
      'uint8': GL_UNSIGNED_BYTE$4,
      'rgba4': GL_UNSIGNED_SHORT_4_4_4_4$1,
      'rgb565': GL_UNSIGNED_SHORT_5_6_5$1,
      'rgb5 a1': GL_UNSIGNED_SHORT_5_5_5_1$1
    };

    var textureFormats = {
      'alpha': GL_ALPHA,
      'luminance': GL_LUMINANCE,
      'luminance alpha': GL_LUMINANCE_ALPHA,
      'rgb': GL_RGB,
      'rgba': GL_RGBA,
      'rgba4': GL_RGBA4,
      'rgb5 a1': GL_RGB5_A1,
      'rgb565': GL_RGB565
    };

    var compressedTextureFormats = {};

    if (extensions.ext_srgb) {
      textureFormats.srgb = GL_SRGB_EXT;
      textureFormats.srgba = GL_SRGB_ALPHA_EXT;
    }

    if (extensions.oes_texture_float) {
      textureTypes.float32 = textureTypes.float = GL_FLOAT$3;
    }

    if (extensions.oes_texture_half_float) {
      textureTypes['float16'] = textureTypes['half float'] = GL_HALF_FLOAT_OES$1;
    }

    if (extensions.webgl_depth_texture) {
      extend(textureFormats, {
        'depth': GL_DEPTH_COMPONENT,
        'depth stencil': GL_DEPTH_STENCIL
      });

      extend(textureTypes, {
        'uint16': GL_UNSIGNED_SHORT$3,
        'uint32': GL_UNSIGNED_INT$3,
        'depth stencil': GL_UNSIGNED_INT_24_8_WEBGL$1
      });
    }

    if (extensions.webgl_compressed_texture_s3tc) {
      extend(compressedTextureFormats, {
        'rgb s3tc dxt1': GL_COMPRESSED_RGB_S3TC_DXT1_EXT,
        'rgba s3tc dxt1': GL_COMPRESSED_RGBA_S3TC_DXT1_EXT,
        'rgba s3tc dxt3': GL_COMPRESSED_RGBA_S3TC_DXT3_EXT,
        'rgba s3tc dxt5': GL_COMPRESSED_RGBA_S3TC_DXT5_EXT
      });
    }

    if (extensions.webgl_compressed_texture_atc) {
      extend(compressedTextureFormats, {
        'rgb atc': GL_COMPRESSED_RGB_ATC_WEBGL,
        'rgba atc explicit alpha': GL_COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL,
        'rgba atc interpolated alpha': GL_COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL
      });
    }

    if (extensions.webgl_compressed_texture_pvrtc) {
      extend(compressedTextureFormats, {
        'rgb pvrtc 4bppv1': GL_COMPRESSED_RGB_PVRTC_4BPPV1_IMG,
        'rgb pvrtc 2bppv1': GL_COMPRESSED_RGB_PVRTC_2BPPV1_IMG,
        'rgba pvrtc 4bppv1': GL_COMPRESSED_RGBA_PVRTC_4BPPV1_IMG,
        'rgba pvrtc 2bppv1': GL_COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
      });
    }

    if (extensions.webgl_compressed_texture_etc1) {
      compressedTextureFormats['rgb etc1'] = GL_COMPRESSED_RGB_ETC1_WEBGL;
    }

    // Copy over all texture formats
    var supportedCompressedFormats = Array.prototype.slice.call(gl.getParameter(GL_COMPRESSED_TEXTURE_FORMATS));
    Object.keys(compressedTextureFormats).forEach(function (name) {
      var format = compressedTextureFormats[name];
      if (supportedCompressedFormats.indexOf(format) >= 0) {
        textureFormats[name] = format;
      }
    });

    var supportedFormats = Object.keys(textureFormats);
    limits.textureFormats = supportedFormats;

    // associate with every format string its
    // corresponding GL-value.
    var textureFormatsInvert = [];
    Object.keys(textureFormats).forEach(function (key) {
      var val = textureFormats[key];
      textureFormatsInvert[val] = key;
    });

    // associate with every type string its
    // corresponding GL-value.
    var textureTypesInvert = [];
    Object.keys(textureTypes).forEach(function (key) {
      var val = textureTypes[key];
      textureTypesInvert[val] = key;
    });

    var magFiltersInvert = [];
    Object.keys(magFilters).forEach(function (key) {
      var val = magFilters[key];
      magFiltersInvert[val] = key;
    });

    var minFiltersInvert = [];
    Object.keys(minFilters).forEach(function (key) {
      var val = minFilters[key];
      minFiltersInvert[val] = key;
    });

    var wrapModesInvert = [];
    Object.keys(wrapModes).forEach(function (key) {
      var val = wrapModes[key];
      wrapModesInvert[val] = key;
    });

    // colorFormats[] gives the format (channels) associated to an
    // internalformat
    var colorFormats = supportedFormats.reduce(function (color, key) {
      var glenum = textureFormats[key];
      if (glenum === GL_LUMINANCE || glenum === GL_ALPHA || glenum === GL_LUMINANCE || glenum === GL_LUMINANCE_ALPHA || glenum === GL_DEPTH_COMPONENT || glenum === GL_DEPTH_STENCIL) {
        color[glenum] = glenum;
      } else if (glenum === GL_RGB5_A1 || key.indexOf('rgba') >= 0) {
        color[glenum] = GL_RGBA;
      } else {
        color[glenum] = GL_RGB;
      }
      return color;
    }, {});

    function TexFlags() {
      // format info
      this.internalformat = GL_RGBA;
      this.format = GL_RGBA;
      this.type = GL_UNSIGNED_BYTE$4;
      this.compressed = false;

      // pixel storage
      this.premultiplyAlpha = false;
      this.flipY = false;
      this.unpackAlignment = 1;
      this.colorSpace = 0;

      // shape info
      this.width = 0;
      this.height = 0;
      this.channels = 0;
    }

    function copyFlags(result, other) {
      result.internalformat = other.internalformat;
      result.format = other.format;
      result.type = other.type;
      result.compressed = other.compressed;

      result.premultiplyAlpha = other.premultiplyAlpha;
      result.flipY = other.flipY;
      result.unpackAlignment = other.unpackAlignment;
      result.colorSpace = other.colorSpace;

      result.width = other.width;
      result.height = other.height;
      result.channels = other.channels;
    }

    function parseFlags(flags, options) {
      if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object' || !options) {
        return;
      }

      if ('premultiplyAlpha' in options) {
        check$1.type(options.premultiplyAlpha, 'boolean', 'invalid premultiplyAlpha');
        flags.premultiplyAlpha = options.premultiplyAlpha;
      }

      if ('flipY' in options) {
        check$1.type(options.flipY, 'boolean', 'invalid texture flip');
        flags.flipY = options.flipY;
      }

      if ('alignment' in options) {
        check$1.oneOf(options.alignment, [1, 2, 4, 8], 'invalid texture unpack alignment');
        flags.unpackAlignment = options.alignment;
      }

      if ('colorSpace' in options) {
        check$1.parameter(options.colorSpace, colorSpace, 'invalid colorSpace');
        flags.colorSpace = colorSpace[options.colorSpace];
      }

      if ('type' in options) {
        var type = options.type;
        check$1(extensions.oes_texture_float || !(type === 'float' || type === 'float32'), 'you must enable the OES_texture_float extension in order to use floating point textures.');
        check$1(extensions.oes_texture_half_float || !(type === 'half float' || type === 'float16'), 'you must enable the OES_texture_half_float extension in order to use 16-bit floating point textures.');
        check$1(extensions.webgl_depth_texture || !(type === 'uint16' || type === 'uint32' || type === 'depth stencil'), 'you must enable the WEBGL_depth_texture extension in order to use depth/stencil textures.');
        check$1.parameter(type, textureTypes, 'invalid texture type');
        flags.type = textureTypes[type];
      }

      var w = flags.width;
      var h = flags.height;
      var c = flags.channels;
      var hasChannels = false;
      if ('shape' in options) {
        check$1(Array.isArray(options.shape) && options.shape.length >= 2, 'shape must be an array');
        w = options.shape[0];
        h = options.shape[1];
        if (options.shape.length === 3) {
          c = options.shape[2];
          check$1(c > 0 && c <= 4, 'invalid number of channels');
          hasChannels = true;
        }
        check$1(w >= 0 && w <= limits.maxTextureSize, 'invalid width');
        check$1(h >= 0 && h <= limits.maxTextureSize, 'invalid height');
      } else {
        if ('radius' in options) {
          w = h = options.radius;
          check$1(w >= 0 && w <= limits.maxTextureSize, 'invalid radius');
        }
        if ('width' in options) {
          w = options.width;
          check$1(w >= 0 && w <= limits.maxTextureSize, 'invalid width');
        }
        if ('height' in options) {
          h = options.height;
          check$1(h >= 0 && h <= limits.maxTextureSize, 'invalid height');
        }
        if ('channels' in options) {
          c = options.channels;
          check$1(c > 0 && c <= 4, 'invalid number of channels');
          hasChannels = true;
        }
      }
      flags.width = w | 0;
      flags.height = h | 0;
      flags.channels = c | 0;

      var hasFormat = false;
      if ('format' in options) {
        var formatStr = options.format;
        check$1(extensions.webgl_depth_texture || !(formatStr === 'depth' || formatStr === 'depth stencil'), 'you must enable the WEBGL_depth_texture extension in order to use depth/stencil textures.');
        check$1.parameter(formatStr, textureFormats, 'invalid texture format');
        var internalformat = flags.internalformat = textureFormats[formatStr];
        flags.format = colorFormats[internalformat];
        if (formatStr in textureTypes) {
          if (!('type' in options)) {
            flags.type = textureTypes[formatStr];
          }
        }
        if (formatStr in compressedTextureFormats) {
          flags.compressed = true;
        }
        hasFormat = true;
      }

      // Reconcile channels and format
      if (!hasChannels && hasFormat) {
        flags.channels = FORMAT_CHANNELS[flags.format];
      } else if (hasChannels && !hasFormat) {
        if (flags.channels !== CHANNELS_FORMAT[flags.format]) {
          flags.format = flags.internalformat = CHANNELS_FORMAT[flags.channels];
        }
      } else if (hasFormat && hasChannels) {
        check$1(flags.channels === FORMAT_CHANNELS[flags.format], 'number of channels inconsistent with specified format');
      }
    }

    function setFlags(flags) {
      gl.pixelStorei(GL_UNPACK_FLIP_Y_WEBGL, flags.flipY);
      gl.pixelStorei(GL_UNPACK_PREMULTIPLY_ALPHA_WEBGL, flags.premultiplyAlpha);
      gl.pixelStorei(GL_UNPACK_COLORSPACE_CONVERSION_WEBGL, flags.colorSpace);
      gl.pixelStorei(GL_UNPACK_ALIGNMENT, flags.unpackAlignment);
    }

    // -------------------------------------------------------
    // Tex image data
    // -------------------------------------------------------
    function TexImage() {
      TexFlags.call(this);

      this.xOffset = 0;
      this.yOffset = 0;

      // data
      this.data = null;
      this.needsFree = false;

      // html element
      this.element = null;

      // copyTexImage info
      this.needsCopy = false;
    }

    function parseImage(image, options) {
      var data = null;
      if (isPixelData(options)) {
        data = options;
      } else if (options) {
        check$1.type(options, 'object', 'invalid pixel data type');
        parseFlags(image, options);
        if ('x' in options) {
          image.xOffset = options.x | 0;
        }
        if ('y' in options) {
          image.yOffset = options.y | 0;
        }
        if (isPixelData(options.data)) {
          data = options.data;
        }
      }

      check$1(!image.compressed || data instanceof Uint8Array, 'compressed texture data must be stored in a uint8array');

      if (options.copy) {
        check$1(!data, 'can not specify copy and data field for the same texture');
        var viewW = contextState.viewportWidth;
        var viewH = contextState.viewportHeight;
        image.width = image.width || viewW - image.xOffset;
        image.height = image.height || viewH - image.yOffset;
        image.needsCopy = true;
        check$1(image.xOffset >= 0 && image.xOffset < viewW && image.yOffset >= 0 && image.yOffset < viewH && image.width > 0 && image.width <= viewW && image.height > 0 && image.height <= viewH, 'copy texture read out of bounds');
      } else if (!data) {
        image.width = image.width || 1;
        image.height = image.height || 1;
        image.channels = image.channels || 4;
      } else if (isTypedArray(data)) {
        image.channels = image.channels || 4;
        image.data = data;
        if (!('type' in options) && image.type === GL_UNSIGNED_BYTE$4) {
          image.type = typedArrayCode$1(data);
        }
      } else if (isNumericArray(data)) {
        image.channels = image.channels || 4;
        convertData(image, data);
        image.alignment = 1;
        image.needsFree = true;
      } else if (isNDArrayLike(data)) {
        var array = data.data;
        if (!Array.isArray(array) && image.type === GL_UNSIGNED_BYTE$4) {
          image.type = typedArrayCode$1(array);
        }
        var shape = data.shape;
        var stride = data.stride;
        var shapeX, shapeY, shapeC, strideX, strideY, strideC;
        if (shape.length === 3) {
          shapeC = shape[2];
          strideC = stride[2];
        } else {
          check$1(shape.length === 2, 'invalid ndarray pixel data, must be 2 or 3D');
          shapeC = 1;
          strideC = 1;
        }
        shapeX = shape[0];
        shapeY = shape[1];
        strideX = stride[0];
        strideY = stride[1];
        image.alignment = 1;
        image.width = shapeX;
        image.height = shapeY;
        image.channels = shapeC;
        image.format = image.internalformat = CHANNELS_FORMAT[shapeC];
        image.needsFree = true;
        transposeData(image, array, strideX, strideY, strideC, data.offset);
      } else if (isCanvasElement(data) || isContext2D(data)) {
        if (isCanvasElement(data)) {
          image.element = data;
        } else {
          image.element = data.canvas;
        }
        image.width = image.element.width;
        image.height = image.element.height;
        image.channels = 4;
      } else if (isImageElement(data)) {
        image.element = data;
        image.width = data.naturalWidth;
        image.height = data.naturalHeight;
        image.channels = 4;
      } else if (isVideoElement(data)) {
        image.element = data;
        image.width = data.videoWidth;
        image.height = data.videoHeight;
        image.channels = 4;
      } else if (isRectArray(data)) {
        var w = image.width || data[0].length;
        var h = image.height || data.length;
        var c = image.channels;
        if (isArrayLike(data[0][0])) {
          c = c || data[0][0].length;
        } else {
          c = c || 1;
        }
        var arrayShape = flattenUtils.shape(data);
        var n = 1;
        for (var dd = 0; dd < arrayShape.length; ++dd) {
          n *= arrayShape[dd];
        }
        var allocData = preConvert(image, n);
        flattenUtils.flatten(data, arrayShape, '', allocData);
        postConvert(image, allocData);
        image.alignment = 1;
        image.width = w;
        image.height = h;
        image.channels = c;
        image.format = image.internalformat = CHANNELS_FORMAT[c];
        image.needsFree = true;
      }

      if (image.type === GL_FLOAT$3) {
        check$1(limits.extensions.indexOf('oes_texture_float') >= 0, 'oes_texture_float extension not enabled');
      } else if (image.type === GL_HALF_FLOAT_OES$1) {
        check$1(limits.extensions.indexOf('oes_texture_half_float') >= 0, 'oes_texture_half_float extension not enabled');
      }

      // do compressed texture  validation here.
    }

    function setImage(info, target, miplevel) {
      var element = info.element;
      var data = info.data;
      var internalformat = info.internalformat;
      var format = info.format;
      var type = info.type;
      var width = info.width;
      var height = info.height;

      setFlags(info);

      if (element) {
        gl.texImage2D(target, miplevel, format, format, type, element);
      } else if (info.compressed) {
        gl.compressedTexImage2D(target, miplevel, internalformat, width, height, 0, data);
      } else if (info.needsCopy) {
        reglPoll();
        gl.copyTexImage2D(target, miplevel, format, info.xOffset, info.yOffset, width, height, 0);
      } else {
        gl.texImage2D(target, miplevel, format, width, height, 0, format, type, data);
      }
    }

    function setSubImage(info, target, x, y, miplevel) {
      var element = info.element;
      var data = info.data;
      var internalformat = info.internalformat;
      var format = info.format;
      var type = info.type;
      var width = info.width;
      var height = info.height;

      setFlags(info);

      if (element) {
        gl.texSubImage2D(target, miplevel, x, y, format, type, element);
      } else if (info.compressed) {
        gl.compressedTexSubImage2D(target, miplevel, x, y, internalformat, width, height, data);
      } else if (info.needsCopy) {
        reglPoll();
        gl.copyTexSubImage2D(target, miplevel, x, y, info.xOffset, info.yOffset, width, height);
      } else {
        gl.texSubImage2D(target, miplevel, x, y, width, height, format, type, data);
      }
    }

    // texImage pool
    var imagePool = [];

    function allocImage() {
      return imagePool.pop() || new TexImage();
    }

    function freeImage(image) {
      if (image.needsFree) {
        pool.freeType(image.data);
      }
      TexImage.call(image);
      imagePool.push(image);
    }

    // -------------------------------------------------------
    // Mip map
    // -------------------------------------------------------
    function MipMap() {
      TexFlags.call(this);

      this.genMipmaps = false;
      this.mipmapHint = GL_DONT_CARE;
      this.mipmask = 0;
      this.images = Array(16);
    }

    function parseMipMapFromShape(mipmap, width, height) {
      var img = mipmap.images[0] = allocImage();
      mipmap.mipmask = 1;
      img.width = mipmap.width = width;
      img.height = mipmap.height = height;
      img.channels = mipmap.channels = 4;
    }

    function parseMipMapFromObject(mipmap, options) {
      var imgData = null;
      if (isPixelData(options)) {
        imgData = mipmap.images[0] = allocImage();
        copyFlags(imgData, mipmap);
        parseImage(imgData, options);
        mipmap.mipmask = 1;
      } else {
        parseFlags(mipmap, options);
        if (Array.isArray(options.mipmap)) {
          var mipData = options.mipmap;
          for (var i = 0; i < mipData.length; ++i) {
            imgData = mipmap.images[i] = allocImage();
            copyFlags(imgData, mipmap);
            imgData.width >>= i;
            imgData.height >>= i;
            parseImage(imgData, mipData[i]);
            mipmap.mipmask |= 1 << i;
          }
        } else {
          imgData = mipmap.images[0] = allocImage();
          copyFlags(imgData, mipmap);
          parseImage(imgData, options);
          mipmap.mipmask = 1;
        }
      }
      copyFlags(mipmap, mipmap.images[0]);

      // For textures of the compressed format WEBGL_compressed_texture_s3tc
      // we must have that
      //
      // "When level equals zero width and height must be a multiple of 4.
      // When level is greater than 0 width and height must be 0, 1, 2 or a multiple of 4. "
      //
      // but we do not yet support having multiple mipmap levels for compressed textures,
      // so we only test for level zero.

      if (mipmap.compressed && mipmap.internalformat === GL_COMPRESSED_RGB_S3TC_DXT1_EXT || mipmap.internalformat === GL_COMPRESSED_RGBA_S3TC_DXT1_EXT || mipmap.internalformat === GL_COMPRESSED_RGBA_S3TC_DXT3_EXT || mipmap.internalformat === GL_COMPRESSED_RGBA_S3TC_DXT5_EXT) {
        check$1(mipmap.width % 4 === 0 && mipmap.height % 4 === 0, 'for compressed texture formats, mipmap level 0 must have width and height that are a multiple of 4');
      }
    }

    function setMipMap(mipmap, target) {
      var images = mipmap.images;
      for (var i = 0; i < images.length; ++i) {
        if (!images[i]) {
          return;
        }
        setImage(images[i], target, i);
      }
    }

    var mipPool = [];

    function allocMipMap() {
      var result = mipPool.pop() || new MipMap();
      TexFlags.call(result);
      result.mipmask = 0;
      for (var i = 0; i < 16; ++i) {
        result.images[i] = null;
      }
      return result;
    }

    function freeMipMap(mipmap) {
      var images = mipmap.images;
      for (var i = 0; i < images.length; ++i) {
        if (images[i]) {
          freeImage(images[i]);
        }
        images[i] = null;
      }
      mipPool.push(mipmap);
    }

    // -------------------------------------------------------
    // Tex info
    // -------------------------------------------------------
    function TexInfo() {
      this.minFilter = GL_NEAREST$1;
      this.magFilter = GL_NEAREST$1;

      this.wrapS = GL_CLAMP_TO_EDGE$1;
      this.wrapT = GL_CLAMP_TO_EDGE$1;

      this.anisotropic = 1;

      this.genMipmaps = false;
      this.mipmapHint = GL_DONT_CARE;
    }

    function parseTexInfo(info, options) {
      if ('min' in options) {
        var minFilter = options.min;
        check$1.parameter(minFilter, minFilters);
        info.minFilter = minFilters[minFilter];
        if (MIPMAP_FILTERS.indexOf(info.minFilter) >= 0) {
          info.genMipmaps = true;
        }
      }

      if ('mag' in options) {
        var magFilter = options.mag;
        check$1.parameter(magFilter, magFilters);
        info.magFilter = magFilters[magFilter];
      }

      var wrapS = info.wrapS;
      var wrapT = info.wrapT;
      if ('wrap' in options) {
        var wrap = options.wrap;
        if (typeof wrap === 'string') {
          check$1.parameter(wrap, wrapModes);
          wrapS = wrapT = wrapModes[wrap];
        } else if (Array.isArray(wrap)) {
          check$1.parameter(wrap[0], wrapModes);
          check$1.parameter(wrap[1], wrapModes);
          wrapS = wrapModes[wrap[0]];
          wrapT = wrapModes[wrap[1]];
        }
      } else {
        if ('wrapS' in options) {
          var optWrapS = options.wrapS;
          check$1.parameter(optWrapS, wrapModes);
          wrapS = wrapModes[optWrapS];
        }
        if ('wrapT' in options) {
          var optWrapT = options.wrapT;
          check$1.parameter(optWrapT, wrapModes);
          wrapT = wrapModes[optWrapT];
        }
      }
      info.wrapS = wrapS;
      info.wrapT = wrapT;

      if ('anisotropic' in options) {
        var anisotropic = options.anisotropic;
        check$1(typeof anisotropic === 'number' && anisotropic >= 1 && anisotropic <= limits.maxAnisotropic, 'aniso samples must be between 1 and ');
        info.anisotropic = options.anisotropic;
      }

      if ('mipmap' in options) {
        var hasMipMap = false;
        switch (_typeof(options.mipmap)) {
          case 'string':
            check$1.parameter(options.mipmap, mipmapHint, 'invalid mipmap hint');
            info.mipmapHint = mipmapHint[options.mipmap];
            info.genMipmaps = true;
            hasMipMap = true;
            break;

          case 'boolean':
            hasMipMap = info.genMipmaps = options.mipmap;
            break;

          case 'object':
            check$1(Array.isArray(options.mipmap), 'invalid mipmap type');
            info.genMipmaps = false;
            hasMipMap = true;
            break;

          default:
            check$1.raise('invalid mipmap type');
        }
        if (hasMipMap && !('min' in options)) {
          info.minFilter = GL_NEAREST_MIPMAP_NEAREST$1;
        }
      }
    }

    function setTexInfo(info, target) {
      gl.texParameteri(target, GL_TEXTURE_MIN_FILTER, info.minFilter);
      gl.texParameteri(target, GL_TEXTURE_MAG_FILTER, info.magFilter);
      gl.texParameteri(target, GL_TEXTURE_WRAP_S, info.wrapS);
      gl.texParameteri(target, GL_TEXTURE_WRAP_T, info.wrapT);
      if (extensions.ext_texture_filter_anisotropic) {
        gl.texParameteri(target, GL_TEXTURE_MAX_ANISOTROPY_EXT, info.anisotropic);
      }
      if (info.genMipmaps) {
        gl.hint(GL_GENERATE_MIPMAP_HINT, info.mipmapHint);
        gl.generateMipmap(target);
      }
    }

    // -------------------------------------------------------
    // Full texture object
    // -------------------------------------------------------
    var textureCount = 0;
    var textureSet = {};
    var numTexUnits = limits.maxTextureUnits;
    var textureUnits = Array(numTexUnits).map(function () {
      return null;
    });

    function REGLTexture(target) {
      TexFlags.call(this);
      this.mipmask = 0;
      this.internalformat = GL_RGBA;

      this.id = textureCount++;

      this.refCount = 1;

      this.target = target;
      this.texture = gl.createTexture();

      this.unit = -1;
      this.bindCount = 0;

      this.texInfo = new TexInfo();

      if (config.profile) {
        this.stats = { size: 0 };
      }
    }

    function tempBind(texture) {
      gl.activeTexture(GL_TEXTURE0);
      gl.bindTexture(texture.target, texture.texture);
    }

    function tempRestore() {
      var prev = textureUnits[0];
      if (prev) {
        gl.bindTexture(prev.target, prev.texture);
      } else {
        gl.bindTexture(GL_TEXTURE_2D, null);
      }
    }

    function destroy(texture) {
      var handle = texture.texture;
      check$1(handle, 'must not double destroy texture');
      var unit = texture.unit;
      var target = texture.target;
      if (unit >= 0) {
        gl.activeTexture(GL_TEXTURE0 + unit);
        gl.bindTexture(target, null);
        textureUnits[unit] = null;
      }
      gl.deleteTexture(handle);
      texture.texture = null;
      texture.params = null;
      texture.pixels = null;
      texture.refCount = 0;
      delete textureSet[texture.id];
      stats.textureCount--;
    }

    extend(REGLTexture.prototype, {
      bind: function bind() {
        var texture = this;
        texture.bindCount += 1;
        var unit = texture.unit;
        if (unit < 0) {
          for (var i = 0; i < numTexUnits; ++i) {
            var other = textureUnits[i];
            if (other) {
              if (other.bindCount > 0) {
                continue;
              }
              other.unit = -1;
            }
            textureUnits[i] = texture;
            unit = i;
            break;
          }
          if (unit >= numTexUnits) {
            check$1.raise('insufficient number of texture units');
          }
          if (config.profile && stats.maxTextureUnits < unit + 1) {
            stats.maxTextureUnits = unit + 1; // +1, since the units are zero-based
          }
          texture.unit = unit;
          gl.activeTexture(GL_TEXTURE0 + unit);
          gl.bindTexture(texture.target, texture.texture);
        }
        return unit;
      },

      unbind: function unbind() {
        this.bindCount -= 1;
      },

      decRef: function decRef() {
        if (--this.refCount <= 0) {
          destroy(this);
        }
      }
    });

    function createTexture2D(a, b) {
      var texture = new REGLTexture(GL_TEXTURE_2D);
      textureSet[texture.id] = texture;
      stats.textureCount++;

      function reglTexture2D(a, b) {
        var texInfo = texture.texInfo;
        TexInfo.call(texInfo);
        var mipData = allocMipMap();

        if (typeof a === 'number') {
          if (typeof b === 'number') {
            parseMipMapFromShape(mipData, a | 0, b | 0);
          } else {
            parseMipMapFromShape(mipData, a | 0, a | 0);
          }
        } else if (a) {
          check$1.type(a, 'object', 'invalid arguments to regl.texture');
          parseTexInfo(texInfo, a);
          parseMipMapFromObject(mipData, a);
        } else {
          // empty textures get assigned a default shape of 1x1
          parseMipMapFromShape(mipData, 1, 1);
        }

        if (texInfo.genMipmaps) {
          mipData.mipmask = (mipData.width << 1) - 1;
        }
        texture.mipmask = mipData.mipmask;

        copyFlags(texture, mipData);

        check$1.texture2D(texInfo, mipData, limits);
        texture.internalformat = mipData.internalformat;

        reglTexture2D.width = mipData.width;
        reglTexture2D.height = mipData.height;

        tempBind(texture);
        setMipMap(mipData, GL_TEXTURE_2D);
        setTexInfo(texInfo, GL_TEXTURE_2D);
        tempRestore();

        freeMipMap(mipData);

        if (config.profile) {
          texture.stats.size = getTextureSize(texture.internalformat, texture.type, mipData.width, mipData.height, texInfo.genMipmaps, false);
        }
        reglTexture2D.format = textureFormatsInvert[texture.internalformat];
        reglTexture2D.type = textureTypesInvert[texture.type];

        reglTexture2D.mag = magFiltersInvert[texInfo.magFilter];
        reglTexture2D.min = minFiltersInvert[texInfo.minFilter];

        reglTexture2D.wrapS = wrapModesInvert[texInfo.wrapS];
        reglTexture2D.wrapT = wrapModesInvert[texInfo.wrapT];

        return reglTexture2D;
      }

      function subimage(image, x_, y_, level_) {
        check$1(!!image, 'must specify image data');

        var x = x_ | 0;
        var y = y_ | 0;
        var level = level_ | 0;

        var imageData = allocImage();
        copyFlags(imageData, texture);
        imageData.width = 0;
        imageData.height = 0;
        parseImage(imageData, image);
        imageData.width = imageData.width || (texture.width >> level) - x;
        imageData.height = imageData.height || (texture.height >> level) - y;

        check$1(texture.type === imageData.type && texture.format === imageData.format && texture.internalformat === imageData.internalformat, 'incompatible format for texture.subimage');
        check$1(x >= 0 && y >= 0 && x + imageData.width <= texture.width && y + imageData.height <= texture.height, 'texture.subimage write out of bounds');
        check$1(texture.mipmask & 1 << level, 'missing mipmap data');
        check$1(imageData.data || imageData.element || imageData.needsCopy, 'missing image data');

        tempBind(texture);
        setSubImage(imageData, GL_TEXTURE_2D, x, y, level);
        tempRestore();

        freeImage(imageData);

        return reglTexture2D;
      }

      function resize(w_, h_) {
        var w = w_ | 0;
        var h = h_ | 0 || w;
        if (w === texture.width && h === texture.height) {
          return reglTexture2D;
        }

        reglTexture2D.width = texture.width = w;
        reglTexture2D.height = texture.height = h;

        tempBind(texture);
        for (var i = 0; texture.mipmask >> i; ++i) {
          gl.texImage2D(GL_TEXTURE_2D, i, texture.format, w >> i, h >> i, 0, texture.format, texture.type, null);
        }
        tempRestore();

        // also, recompute the texture size.
        if (config.profile) {
          texture.stats.size = getTextureSize(texture.internalformat, texture.type, w, h, false, false);
        }

        return reglTexture2D;
      }

      reglTexture2D(a, b);

      reglTexture2D.subimage = subimage;
      reglTexture2D.resize = resize;
      reglTexture2D._reglType = 'texture2d';
      reglTexture2D._texture = texture;
      if (config.profile) {
        reglTexture2D.stats = texture.stats;
      }
      reglTexture2D.destroy = function () {
        texture.decRef();
      };

      return reglTexture2D;
    }

    function createTextureCube(a0, a1, a2, a3, a4, a5) {
      var texture = new REGLTexture(GL_TEXTURE_CUBE_MAP);
      textureSet[texture.id] = texture;
      stats.cubeCount++;

      var faces = new Array(6);

      function reglTextureCube(a0, a1, a2, a3, a4, a5) {
        var i;
        var texInfo = texture.texInfo;
        TexInfo.call(texInfo);
        for (i = 0; i < 6; ++i) {
          faces[i] = allocMipMap();
        }

        if (typeof a0 === 'number' || !a0) {
          var s = a0 | 0 || 1;
          for (i = 0; i < 6; ++i) {
            parseMipMapFromShape(faces[i], s, s);
          }
        } else if ((typeof a0 === 'undefined' ? 'undefined' : _typeof(a0)) === 'object') {
          if (a1) {
            parseMipMapFromObject(faces[0], a0);
            parseMipMapFromObject(faces[1], a1);
            parseMipMapFromObject(faces[2], a2);
            parseMipMapFromObject(faces[3], a3);
            parseMipMapFromObject(faces[4], a4);
            parseMipMapFromObject(faces[5], a5);
          } else {
            parseTexInfo(texInfo, a0);
            parseFlags(texture, a0);
            if ('faces' in a0) {
              var face_input = a0.faces;
              check$1(Array.isArray(face_input) && face_input.length === 6, 'cube faces must be a length 6 array');
              for (i = 0; i < 6; ++i) {
                check$1(_typeof(face_input[i]) === 'object' && !!face_input[i], 'invalid input for cube map face');
                copyFlags(faces[i], texture);
                parseMipMapFromObject(faces[i], face_input[i]);
              }
            } else {
              for (i = 0; i < 6; ++i) {
                parseMipMapFromObject(faces[i], a0);
              }
            }
          }
        } else {
          check$1.raise('invalid arguments to cube map');
        }

        copyFlags(texture, faces[0]);
        if (texInfo.genMipmaps) {
          texture.mipmask = (faces[0].width << 1) - 1;
        } else {
          texture.mipmask = faces[0].mipmask;
        }

        check$1.textureCube(texture, texInfo, faces, limits);
        texture.internalformat = faces[0].internalformat;

        reglTextureCube.width = faces[0].width;
        reglTextureCube.height = faces[0].height;

        tempBind(texture);
        for (i = 0; i < 6; ++i) {
          setMipMap(faces[i], GL_TEXTURE_CUBE_MAP_POSITIVE_X + i);
        }
        setTexInfo(texInfo, GL_TEXTURE_CUBE_MAP);
        tempRestore();

        if (config.profile) {
          texture.stats.size = getTextureSize(texture.internalformat, texture.type, reglTextureCube.width, reglTextureCube.height, texInfo.genMipmaps, true);
        }

        reglTextureCube.format = textureFormatsInvert[texture.internalformat];
        reglTextureCube.type = textureTypesInvert[texture.type];

        reglTextureCube.mag = magFiltersInvert[texInfo.magFilter];
        reglTextureCube.min = minFiltersInvert[texInfo.minFilter];

        reglTextureCube.wrapS = wrapModesInvert[texInfo.wrapS];
        reglTextureCube.wrapT = wrapModesInvert[texInfo.wrapT];

        for (i = 0; i < 6; ++i) {
          freeMipMap(faces[i]);
        }

        return reglTextureCube;
      }

      function subimage(face, image, x_, y_, level_) {
        check$1(!!image, 'must specify image data');
        check$1(typeof face === 'number' && face === (face | 0) && face >= 0 && face < 6, 'invalid face');

        var x = x_ | 0;
        var y = y_ | 0;
        var level = level_ | 0;

        var imageData = allocImage();
        copyFlags(imageData, texture);
        imageData.width = 0;
        imageData.height = 0;
        parseImage(imageData, image);
        imageData.width = imageData.width || (texture.width >> level) - x;
        imageData.height = imageData.height || (texture.height >> level) - y;

        check$1(texture.type === imageData.type && texture.format === imageData.format && texture.internalformat === imageData.internalformat, 'incompatible format for texture.subimage');
        check$1(x >= 0 && y >= 0 && x + imageData.width <= texture.width && y + imageData.height <= texture.height, 'texture.subimage write out of bounds');
        check$1(texture.mipmask & 1 << level, 'missing mipmap data');
        check$1(imageData.data || imageData.element || imageData.needsCopy, 'missing image data');

        tempBind(texture);
        setSubImage(imageData, GL_TEXTURE_CUBE_MAP_POSITIVE_X + face, x, y, level);
        tempRestore();

        freeImage(imageData);

        return reglTextureCube;
      }

      function resize(radius_) {
        var radius = radius_ | 0;
        if (radius === texture.width) {
          return;
        }

        reglTextureCube.width = texture.width = radius;
        reglTextureCube.height = texture.height = radius;

        tempBind(texture);
        for (var i = 0; i < 6; ++i) {
          for (var j = 0; texture.mipmask >> j; ++j) {
            gl.texImage2D(GL_TEXTURE_CUBE_MAP_POSITIVE_X + i, j, texture.format, radius >> j, radius >> j, 0, texture.format, texture.type, null);
          }
        }
        tempRestore();

        if (config.profile) {
          texture.stats.size = getTextureSize(texture.internalformat, texture.type, reglTextureCube.width, reglTextureCube.height, false, true);
        }

        return reglTextureCube;
      }

      reglTextureCube(a0, a1, a2, a3, a4, a5);

      reglTextureCube.subimage = subimage;
      reglTextureCube.resize = resize;
      reglTextureCube._reglType = 'textureCube';
      reglTextureCube._texture = texture;
      if (config.profile) {
        reglTextureCube.stats = texture.stats;
      }
      reglTextureCube.destroy = function () {
        texture.decRef();
      };

      return reglTextureCube;
    }

    // Called when regl is destroyed
    function destroyTextures() {
      for (var i = 0; i < numTexUnits; ++i) {
        gl.activeTexture(GL_TEXTURE0 + i);
        gl.bindTexture(GL_TEXTURE_2D, null);
        textureUnits[i] = null;
      }
      values(textureSet).forEach(destroy);

      stats.cubeCount = 0;
      stats.textureCount = 0;
    }

    if (config.profile) {
      stats.getTotalTextureSize = function () {
        var total = 0;
        Object.keys(textureSet).forEach(function (key) {
          total += textureSet[key].stats.size;
        });
        return total;
      };
    }

    function restoreTextures() {
      values(textureSet).forEach(function (texture) {
        texture.texture = gl.createTexture();
        gl.bindTexture(texture.target, texture.texture);
        for (var i = 0; i < 32; ++i) {
          if ((texture.mipmask & 1 << i) === 0) {
            continue;
          }
          if (texture.target === GL_TEXTURE_2D) {
            gl.texImage2D(GL_TEXTURE_2D, i, texture.internalformat, texture.width >> i, texture.height >> i, 0, texture.internalformat, texture.type, null);
          } else {
            for (var j = 0; j < 6; ++j) {
              gl.texImage2D(GL_TEXTURE_CUBE_MAP_POSITIVE_X + j, i, texture.internalformat, texture.width >> i, texture.height >> i, 0, texture.internalformat, texture.type, null);
            }
          }
        }
        setTexInfo(texture.texInfo, texture.target);
      });
    }

    return {
      create2D: createTexture2D,
      createCube: createTextureCube,
      clear: destroyTextures,
      getTexture: function getTexture(wrapper) {
        return null;
      },
      restore: restoreTextures
    };
  }

  var GL_RENDERBUFFER = 0x8D41;

  var GL_RGBA4$1 = 0x8056;
  var GL_RGB5_A1$1 = 0x8057;
  var GL_RGB565$1 = 0x8D62;
  var GL_DEPTH_COMPONENT16 = 0x81A5;
  var GL_STENCIL_INDEX8 = 0x8D48;
  var GL_DEPTH_STENCIL$1 = 0x84F9;

  var GL_SRGB8_ALPHA8_EXT = 0x8C43;

  var GL_RGBA32F_EXT = 0x8814;

  var GL_RGBA16F_EXT = 0x881A;
  var GL_RGB16F_EXT = 0x881B;

  var FORMAT_SIZES = [];

  FORMAT_SIZES[GL_RGBA4$1] = 2;
  FORMAT_SIZES[GL_RGB5_A1$1] = 2;
  FORMAT_SIZES[GL_RGB565$1] = 2;

  FORMAT_SIZES[GL_DEPTH_COMPONENT16] = 2;
  FORMAT_SIZES[GL_STENCIL_INDEX8] = 1;
  FORMAT_SIZES[GL_DEPTH_STENCIL$1] = 4;

  FORMAT_SIZES[GL_SRGB8_ALPHA8_EXT] = 4;
  FORMAT_SIZES[GL_RGBA32F_EXT] = 16;
  FORMAT_SIZES[GL_RGBA16F_EXT] = 8;
  FORMAT_SIZES[GL_RGB16F_EXT] = 6;

  function getRenderbufferSize(format, width, height) {
    return FORMAT_SIZES[format] * width * height;
  }

  var wrapRenderbuffers = function wrapRenderbuffers(gl, extensions, limits, stats, config) {
    var formatTypes = {
      'rgba4': GL_RGBA4$1,
      'rgb565': GL_RGB565$1,
      'rgb5 a1': GL_RGB5_A1$1,
      'depth': GL_DEPTH_COMPONENT16,
      'stencil': GL_STENCIL_INDEX8,
      'depth stencil': GL_DEPTH_STENCIL$1
    };

    if (extensions.ext_srgb) {
      formatTypes['srgba'] = GL_SRGB8_ALPHA8_EXT;
    }

    if (extensions.ext_color_buffer_half_float) {
      formatTypes['rgba16f'] = GL_RGBA16F_EXT;
      formatTypes['rgb16f'] = GL_RGB16F_EXT;
    }

    if (extensions.webgl_color_buffer_float) {
      formatTypes['rgba32f'] = GL_RGBA32F_EXT;
    }

    var formatTypesInvert = [];
    Object.keys(formatTypes).forEach(function (key) {
      var val = formatTypes[key];
      formatTypesInvert[val] = key;
    });

    var renderbufferCount = 0;
    var renderbufferSet = {};

    function REGLRenderbuffer(renderbuffer) {
      this.id = renderbufferCount++;
      this.refCount = 1;

      this.renderbuffer = renderbuffer;

      this.format = GL_RGBA4$1;
      this.width = 0;
      this.height = 0;

      if (config.profile) {
        this.stats = { size: 0 };
      }
    }

    REGLRenderbuffer.prototype.decRef = function () {
      if (--this.refCount <= 0) {
        destroy(this);
      }
    };

    function destroy(rb) {
      var handle = rb.renderbuffer;
      check$1(handle, 'must not double destroy renderbuffer');
      gl.bindRenderbuffer(GL_RENDERBUFFER, null);
      gl.deleteRenderbuffer(handle);
      rb.renderbuffer = null;
      rb.refCount = 0;
      delete renderbufferSet[rb.id];
      stats.renderbufferCount--;
    }

    function createRenderbuffer(a, b) {
      var renderbuffer = new REGLRenderbuffer(gl.createRenderbuffer());
      renderbufferSet[renderbuffer.id] = renderbuffer;
      stats.renderbufferCount++;

      function reglRenderbuffer(a, b) {
        var w = 0;
        var h = 0;
        var format = GL_RGBA4$1;

        if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' && a) {
          var options = a;
          if ('shape' in options) {
            var shape = options.shape;
            check$1(Array.isArray(shape) && shape.length >= 2, 'invalid renderbuffer shape');
            w = shape[0] | 0;
            h = shape[1] | 0;
          } else {
            if ('radius' in options) {
              w = h = options.radius | 0;
            }
            if ('width' in options) {
              w = options.width | 0;
            }
            if ('height' in options) {
              h = options.height | 0;
            }
          }
          if ('format' in options) {
            check$1.parameter(options.format, formatTypes, 'invalid renderbuffer format');
            format = formatTypes[options.format];
          }
        } else if (typeof a === 'number') {
          w = a | 0;
          if (typeof b === 'number') {
            h = b | 0;
          } else {
            h = w;
          }
        } else if (!a) {
          w = h = 1;
        } else {
          check$1.raise('invalid arguments to renderbuffer constructor');
        }

        // check shape
        check$1(w > 0 && h > 0 && w <= limits.maxRenderbufferSize && h <= limits.maxRenderbufferSize, 'invalid renderbuffer size');

        if (w === renderbuffer.width && h === renderbuffer.height && format === renderbuffer.format) {
          return;
        }

        reglRenderbuffer.width = renderbuffer.width = w;
        reglRenderbuffer.height = renderbuffer.height = h;
        renderbuffer.format = format;

        gl.bindRenderbuffer(GL_RENDERBUFFER, renderbuffer.renderbuffer);
        gl.renderbufferStorage(GL_RENDERBUFFER, format, w, h);

        if (config.profile) {
          renderbuffer.stats.size = getRenderbufferSize(renderbuffer.format, renderbuffer.width, renderbuffer.height);
        }
        reglRenderbuffer.format = formatTypesInvert[renderbuffer.format];

        return reglRenderbuffer;
      }

      function resize(w_, h_) {
        var w = w_ | 0;
        var h = h_ | 0 || w;

        if (w === renderbuffer.width && h === renderbuffer.height) {
          return reglRenderbuffer;
        }

        // check shape
        check$1(w > 0 && h > 0 && w <= limits.maxRenderbufferSize && h <= limits.maxRenderbufferSize, 'invalid renderbuffer size');

        reglRenderbuffer.width = renderbuffer.width = w;
        reglRenderbuffer.height = renderbuffer.height = h;

        gl.bindRenderbuffer(GL_RENDERBUFFER, renderbuffer.renderbuffer);
        gl.renderbufferStorage(GL_RENDERBUFFER, renderbuffer.format, w, h);

        // also, recompute size.
        if (config.profile) {
          renderbuffer.stats.size = getRenderbufferSize(renderbuffer.format, renderbuffer.width, renderbuffer.height);
        }

        return reglRenderbuffer;
      }

      reglRenderbuffer(a, b);

      reglRenderbuffer.resize = resize;
      reglRenderbuffer._reglType = 'renderbuffer';
      reglRenderbuffer._renderbuffer = renderbuffer;
      if (config.profile) {
        reglRenderbuffer.stats = renderbuffer.stats;
      }
      reglRenderbuffer.destroy = function () {
        renderbuffer.decRef();
      };

      return reglRenderbuffer;
    }

    if (config.profile) {
      stats.getTotalRenderbufferSize = function () {
        var total = 0;
        Object.keys(renderbufferSet).forEach(function (key) {
          total += renderbufferSet[key].stats.size;
        });
        return total;
      };
    }

    function restoreRenderbuffers() {
      values(renderbufferSet).forEach(function (rb) {
        rb.renderbuffer = gl.createRenderbuffer();
        gl.bindRenderbuffer(GL_RENDERBUFFER, rb.renderbuffer);
        gl.renderbufferStorage(GL_RENDERBUFFER, rb.format, rb.width, rb.height);
      });
      gl.bindRenderbuffer(GL_RENDERBUFFER, null);
    }

    return {
      create: createRenderbuffer,
      clear: function clear() {
        values(renderbufferSet).forEach(destroy);
      },
      restore: restoreRenderbuffers
    };
  };

  // We store these constants so that the minifier can inline them
  var GL_FRAMEBUFFER = 0x8D40;
  var GL_RENDERBUFFER$1 = 0x8D41;

  var GL_TEXTURE_2D$1 = 0x0DE1;
  var GL_TEXTURE_CUBE_MAP_POSITIVE_X$1 = 0x8515;

  var GL_COLOR_ATTACHMENT0 = 0x8CE0;
  var GL_DEPTH_ATTACHMENT = 0x8D00;
  var GL_STENCIL_ATTACHMENT = 0x8D20;
  var GL_DEPTH_STENCIL_ATTACHMENT = 0x821A;

  var GL_FRAMEBUFFER_COMPLETE = 0x8CD5;
  var GL_FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 0x8CD6;
  var GL_FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 0x8CD7;
  var GL_FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 0x8CD9;
  var GL_FRAMEBUFFER_UNSUPPORTED = 0x8CDD;

  var GL_HALF_FLOAT_OES$2 = 0x8D61;
  var GL_UNSIGNED_BYTE$5 = 0x1401;
  var GL_FLOAT$4 = 0x1406;

  var GL_RGBA$1 = 0x1908;

  var GL_DEPTH_COMPONENT$1 = 0x1902;

  var colorTextureFormatEnums = [GL_RGBA$1];

  // for every texture format, store
  // the number of channels
  var textureFormatChannels = [];
  textureFormatChannels[GL_RGBA$1] = 4;

  // for every texture type, store
  // the size in bytes.
  var textureTypeSizes = [];
  textureTypeSizes[GL_UNSIGNED_BYTE$5] = 1;
  textureTypeSizes[GL_FLOAT$4] = 4;
  textureTypeSizes[GL_HALF_FLOAT_OES$2] = 2;

  var GL_RGBA4$2 = 0x8056;
  var GL_RGB5_A1$2 = 0x8057;
  var GL_RGB565$2 = 0x8D62;
  var GL_DEPTH_COMPONENT16$1 = 0x81A5;
  var GL_STENCIL_INDEX8$1 = 0x8D48;
  var GL_DEPTH_STENCIL$2 = 0x84F9;

  var GL_SRGB8_ALPHA8_EXT$1 = 0x8C43;

  var GL_RGBA32F_EXT$1 = 0x8814;

  var GL_RGBA16F_EXT$1 = 0x881A;
  var GL_RGB16F_EXT$1 = 0x881B;

  var colorRenderbufferFormatEnums = [GL_RGBA4$2, GL_RGB5_A1$2, GL_RGB565$2, GL_SRGB8_ALPHA8_EXT$1, GL_RGBA16F_EXT$1, GL_RGB16F_EXT$1, GL_RGBA32F_EXT$1];

  var statusCode = {};
  statusCode[GL_FRAMEBUFFER_COMPLETE] = 'complete';
  statusCode[GL_FRAMEBUFFER_INCOMPLETE_ATTACHMENT] = 'incomplete attachment';
  statusCode[GL_FRAMEBUFFER_INCOMPLETE_DIMENSIONS] = 'incomplete dimensions';
  statusCode[GL_FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT] = 'incomplete, missing attachment';
  statusCode[GL_FRAMEBUFFER_UNSUPPORTED] = 'unsupported';

  function wrapFBOState(gl, extensions, limits, textureState, renderbufferState, stats) {
    var framebufferState = {
      cur: null,
      next: null,
      dirty: false,
      setFBO: null
    };

    var colorTextureFormats = ['rgba'];
    var colorRenderbufferFormats = ['rgba4', 'rgb565', 'rgb5 a1'];

    if (extensions.ext_srgb) {
      colorRenderbufferFormats.push('srgba');
    }

    if (extensions.ext_color_buffer_half_float) {
      colorRenderbufferFormats.push('rgba16f', 'rgb16f');
    }

    if (extensions.webgl_color_buffer_float) {
      colorRenderbufferFormats.push('rgba32f');
    }

    var colorTypes = ['uint8'];
    if (extensions.oes_texture_half_float) {
      colorTypes.push('half float', 'float16');
    }
    if (extensions.oes_texture_float) {
      colorTypes.push('float', 'float32');
    }

    function FramebufferAttachment(target, texture, renderbuffer) {
      this.target = target;
      this.texture = texture;
      this.renderbuffer = renderbuffer;

      var w = 0;
      var h = 0;
      if (texture) {
        w = texture.width;
        h = texture.height;
      } else if (renderbuffer) {
        w = renderbuffer.width;
        h = renderbuffer.height;
      }
      this.width = w;
      this.height = h;
    }

    function decRef(attachment) {
      if (attachment) {
        if (attachment.texture) {
          attachment.texture._texture.decRef();
        }
        if (attachment.renderbuffer) {
          attachment.renderbuffer._renderbuffer.decRef();
        }
      }
    }

    function incRefAndCheckShape(attachment, width, height) {
      if (!attachment) {
        return;
      }
      if (attachment.texture) {
        var texture = attachment.texture._texture;
        var tw = Math.max(1, texture.width);
        var th = Math.max(1, texture.height);
        check$1(tw === width && th === height, 'inconsistent width/height for supplied texture');
        texture.refCount += 1;
      } else {
        var renderbuffer = attachment.renderbuffer._renderbuffer;
        check$1(renderbuffer.width === width && renderbuffer.height === height, 'inconsistent width/height for renderbuffer');
        renderbuffer.refCount += 1;
      }
    }

    function attach(location, attachment) {
      if (attachment) {
        if (attachment.texture) {
          gl.framebufferTexture2D(GL_FRAMEBUFFER, location, attachment.target, attachment.texture._texture.texture, 0);
        } else {
          gl.framebufferRenderbuffer(GL_FRAMEBUFFER, location, GL_RENDERBUFFER$1, attachment.renderbuffer._renderbuffer.renderbuffer);
        }
      }
    }

    function parseAttachment(attachment) {
      var target = GL_TEXTURE_2D$1;
      var texture = null;
      var renderbuffer = null;

      var data = attachment;
      if ((typeof attachment === 'undefined' ? 'undefined' : _typeof(attachment)) === 'object') {
        data = attachment.data;
        if ('target' in attachment) {
          target = attachment.target | 0;
        }
      }

      check$1.type(data, 'function', 'invalid attachment data');

      var type = data._reglType;
      if (type === 'texture2d') {
        texture = data;
        check$1(target === GL_TEXTURE_2D$1);
      } else if (type === 'textureCube') {
        texture = data;
        check$1(target >= GL_TEXTURE_CUBE_MAP_POSITIVE_X$1 && target < GL_TEXTURE_CUBE_MAP_POSITIVE_X$1 + 6, 'invalid cube map target');
      } else if (type === 'renderbuffer') {
        renderbuffer = data;
        target = GL_RENDERBUFFER$1;
      } else {
        check$1.raise('invalid regl object for attachment');
      }

      return new FramebufferAttachment(target, texture, renderbuffer);
    }

    function allocAttachment(width, height, isTexture, format, type) {
      if (isTexture) {
        var texture = textureState.create2D({
          width: width,
          height: height,
          format: format,
          type: type
        });
        texture._texture.refCount = 0;
        return new FramebufferAttachment(GL_TEXTURE_2D$1, texture, null);
      } else {
        var rb = renderbufferState.create({
          width: width,
          height: height,
          format: format
        });
        rb._renderbuffer.refCount = 0;
        return new FramebufferAttachment(GL_RENDERBUFFER$1, null, rb);
      }
    }

    function unwrapAttachment(attachment) {
      return attachment && (attachment.texture || attachment.renderbuffer);
    }

    function resizeAttachment(attachment, w, h) {
      if (attachment) {
        if (attachment.texture) {
          attachment.texture.resize(w, h);
        } else if (attachment.renderbuffer) {
          attachment.renderbuffer.resize(w, h);
        }
      }
    }

    var framebufferCount = 0;
    var framebufferSet = {};

    function REGLFramebuffer() {
      this.id = framebufferCount++;
      framebufferSet[this.id] = this;

      this.framebuffer = gl.createFramebuffer();
      this.width = 0;
      this.height = 0;

      this.colorAttachments = [];
      this.depthAttachment = null;
      this.stencilAttachment = null;
      this.depthStencilAttachment = null;
    }

    function decFBORefs(framebuffer) {
      framebuffer.colorAttachments.forEach(decRef);
      decRef(framebuffer.depthAttachment);
      decRef(framebuffer.stencilAttachment);
      decRef(framebuffer.depthStencilAttachment);
    }

    function _destroy(framebuffer) {
      var handle = framebuffer.framebuffer;
      check$1(handle, 'must not double destroy framebuffer');
      gl.deleteFramebuffer(handle);
      framebuffer.framebuffer = null;
      stats.framebufferCount--;
      delete framebufferSet[framebuffer.id];
    }

    function updateFramebuffer(framebuffer) {
      var i;

      gl.bindFramebuffer(GL_FRAMEBUFFER, framebuffer.framebuffer);
      var colorAttachments = framebuffer.colorAttachments;
      for (i = 0; i < colorAttachments.length; ++i) {
        attach(GL_COLOR_ATTACHMENT0 + i, colorAttachments[i]);
      }
      for (i = colorAttachments.length; i < limits.maxColorAttachments; ++i) {
        gl.framebufferTexture2D(GL_FRAMEBUFFER, GL_COLOR_ATTACHMENT0 + i, GL_TEXTURE_2D$1, null, 0);
      }

      gl.framebufferTexture2D(GL_FRAMEBUFFER, GL_DEPTH_STENCIL_ATTACHMENT, GL_TEXTURE_2D$1, null, 0);
      gl.framebufferTexture2D(GL_FRAMEBUFFER, GL_DEPTH_ATTACHMENT, GL_TEXTURE_2D$1, null, 0);
      gl.framebufferTexture2D(GL_FRAMEBUFFER, GL_STENCIL_ATTACHMENT, GL_TEXTURE_2D$1, null, 0);

      attach(GL_DEPTH_ATTACHMENT, framebuffer.depthAttachment);
      attach(GL_STENCIL_ATTACHMENT, framebuffer.stencilAttachment);
      attach(GL_DEPTH_STENCIL_ATTACHMENT, framebuffer.depthStencilAttachment);

      // Check status code
      var status = gl.checkFramebufferStatus(GL_FRAMEBUFFER);
      if (status !== GL_FRAMEBUFFER_COMPLETE) {
        check$1.raise('framebuffer configuration not supported, status = ' + statusCode[status]);
      }

      gl.bindFramebuffer(GL_FRAMEBUFFER, framebufferState.next);
      framebufferState.cur = framebufferState.next;

      // FIXME: Clear error code here.  This is a work around for a bug in
      // headless-gl
      gl.getError();
    }

    function createFBO(a0, a1) {
      var framebuffer = new REGLFramebuffer();
      stats.framebufferCount++;

      function reglFramebuffer(a, b) {
        var i;

        check$1(framebufferState.next !== framebuffer, 'can not update framebuffer which is currently in use');

        var extDrawBuffers = extensions.webgl_draw_buffers;

        var width = 0;
        var height = 0;

        var needsDepth = true;
        var needsStencil = true;

        var colorBuffer = null;
        var colorTexture = true;
        var colorFormat = 'rgba';
        var colorType = 'uint8';
        var colorCount = 1;

        var depthBuffer = null;
        var stencilBuffer = null;
        var depthStencilBuffer = null;
        var depthStencilTexture = false;

        if (typeof a === 'number') {
          width = a | 0;
          height = b | 0 || width;
        } else if (!a) {
          width = height = 1;
        } else {
          check$1.type(a, 'object', 'invalid arguments for framebuffer');
          var options = a;

          if ('shape' in options) {
            var shape = options.shape;
            check$1(Array.isArray(shape) && shape.length >= 2, 'invalid shape for framebuffer');
            width = shape[0];
            height = shape[1];
          } else {
            if ('radius' in options) {
              width = height = options.radius;
            }
            if ('width' in options) {
              width = options.width;
            }
            if ('height' in options) {
              height = options.height;
            }
          }

          if ('color' in options || 'colors' in options) {
            colorBuffer = options.color || options.colors;
            if (Array.isArray(colorBuffer)) {
              check$1(colorBuffer.length === 1 || extDrawBuffers, 'multiple render targets not supported');
            }
          }

          if (!colorBuffer) {
            if ('colorCount' in options) {
              colorCount = options.colorCount | 0;
              check$1(colorCount > 0, 'invalid color buffer count');
            }

            if ('colorTexture' in options) {
              colorTexture = !!options.colorTexture;
              colorFormat = 'rgba4';
            }

            if ('colorType' in options) {
              colorType = options.colorType;
              if (!colorTexture) {
                if (colorType === 'half float' || colorType === 'float16') {
                  check$1(extensions.ext_color_buffer_half_float, 'you must enable EXT_color_buffer_half_float to use 16-bit render buffers');
                  colorFormat = 'rgba16f';
                } else if (colorType === 'float' || colorType === 'float32') {
                  check$1(extensions.webgl_color_buffer_float, 'you must enable WEBGL_color_buffer_float in order to use 32-bit floating point renderbuffers');
                  colorFormat = 'rgba32f';
                }
              } else {
                check$1(extensions.oes_texture_float || !(colorType === 'float' || colorType === 'float32'), 'you must enable OES_texture_float in order to use floating point framebuffer objects');
                check$1(extensions.oes_texture_half_float || !(colorType === 'half float' || colorType === 'float16'), 'you must enable OES_texture_half_float in order to use 16-bit floating point framebuffer objects');
              }
              check$1.oneOf(colorType, colorTypes, 'invalid color type');
            }

            if ('colorFormat' in options) {
              colorFormat = options.colorFormat;
              if (colorTextureFormats.indexOf(colorFormat) >= 0) {
                colorTexture = true;
              } else if (colorRenderbufferFormats.indexOf(colorFormat) >= 0) {
                colorTexture = false;
              } else {
                if (colorTexture) {
                  check$1.oneOf(options.colorFormat, colorTextureFormats, 'invalid color format for texture');
                } else {
                  check$1.oneOf(options.colorFormat, colorRenderbufferFormats, 'invalid color format for renderbuffer');
                }
              }
            }
          }

          if ('depthTexture' in options || 'depthStencilTexture' in options) {
            depthStencilTexture = !!(options.depthTexture || options.depthStencilTexture);
            check$1(!depthStencilTexture || extensions.webgl_depth_texture, 'webgl_depth_texture extension not supported');
          }

          if ('depth' in options) {
            if (typeof options.depth === 'boolean') {
              needsDepth = options.depth;
            } else {
              depthBuffer = options.depth;
              needsStencil = false;
            }
          }

          if ('stencil' in options) {
            if (typeof options.stencil === 'boolean') {
              needsStencil = options.stencil;
            } else {
              stencilBuffer = options.stencil;
              needsDepth = false;
            }
          }

          if ('depthStencil' in options) {
            if (typeof options.depthStencil === 'boolean') {
              needsDepth = needsStencil = options.depthStencil;
            } else {
              depthStencilBuffer = options.depthStencil;
              needsDepth = false;
              needsStencil = false;
            }
          }
        }

        // parse attachments
        var colorAttachments = null;
        var depthAttachment = null;
        var stencilAttachment = null;
        var depthStencilAttachment = null;

        // Set up color attachments
        if (Array.isArray(colorBuffer)) {
          colorAttachments = colorBuffer.map(parseAttachment);
        } else if (colorBuffer) {
          colorAttachments = [parseAttachment(colorBuffer)];
        } else {
          colorAttachments = new Array(colorCount);
          for (i = 0; i < colorCount; ++i) {
            colorAttachments[i] = allocAttachment(width, height, colorTexture, colorFormat, colorType);
          }
        }

        check$1(extensions.webgl_draw_buffers || colorAttachments.length <= 1, 'you must enable the WEBGL_draw_buffers extension in order to use multiple color buffers.');
        check$1(colorAttachments.length <= limits.maxColorAttachments, 'too many color attachments, not supported');

        width = width || colorAttachments[0].width;
        height = height || colorAttachments[0].height;

        if (depthBuffer) {
          depthAttachment = parseAttachment(depthBuffer);
        } else if (needsDepth && !needsStencil) {
          depthAttachment = allocAttachment(width, height, depthStencilTexture, 'depth', 'uint32');
        }

        if (stencilBuffer) {
          stencilAttachment = parseAttachment(stencilBuffer);
        } else if (needsStencil && !needsDepth) {
          stencilAttachment = allocAttachment(width, height, false, 'stencil', 'uint8');
        }

        if (depthStencilBuffer) {
          depthStencilAttachment = parseAttachment(depthStencilBuffer);
        } else if (!depthBuffer && !stencilBuffer && needsStencil && needsDepth) {
          depthStencilAttachment = allocAttachment(width, height, depthStencilTexture, 'depth stencil', 'depth stencil');
        }

        check$1(!!depthBuffer + !!stencilBuffer + !!depthStencilBuffer <= 1, 'invalid framebuffer configuration, can specify exactly one depth/stencil attachment');

        var commonColorAttachmentSize = null;

        for (i = 0; i < colorAttachments.length; ++i) {
          incRefAndCheckShape(colorAttachments[i], width, height);
          check$1(!colorAttachments[i] || colorAttachments[i].texture && colorTextureFormatEnums.indexOf(colorAttachments[i].texture._texture.format) >= 0 || colorAttachments[i].renderbuffer && colorRenderbufferFormatEnums.indexOf(colorAttachments[i].renderbuffer._renderbuffer.format) >= 0, 'framebuffer color attachment ' + i + ' is invalid');

          if (colorAttachments[i] && colorAttachments[i].texture) {
            var colorAttachmentSize = textureFormatChannels[colorAttachments[i].texture._texture.format] * textureTypeSizes[colorAttachments[i].texture._texture.type];

            if (commonColorAttachmentSize === null) {
              commonColorAttachmentSize = colorAttachmentSize;
            } else {
              // We need to make sure that all color attachments have the same number of bitplanes
              // (that is, the same numer of bits per pixel)
              // This is required by the GLES2.0 standard. See the beginning of Chapter 4 in that document.
              check$1(commonColorAttachmentSize === colorAttachmentSize, 'all color attachments much have the same number of bits per pixel.');
            }
          }
        }
        incRefAndCheckShape(depthAttachment, width, height);
        check$1(!depthAttachment || depthAttachment.texture && depthAttachment.texture._texture.format === GL_DEPTH_COMPONENT$1 || depthAttachment.renderbuffer && depthAttachment.renderbuffer._renderbuffer.format === GL_DEPTH_COMPONENT16$1, 'invalid depth attachment for framebuffer object');
        incRefAndCheckShape(stencilAttachment, width, height);
        check$1(!stencilAttachment || stencilAttachment.renderbuffer && stencilAttachment.renderbuffer._renderbuffer.format === GL_STENCIL_INDEX8$1, 'invalid stencil attachment for framebuffer object');
        incRefAndCheckShape(depthStencilAttachment, width, height);
        check$1(!depthStencilAttachment || depthStencilAttachment.texture && depthStencilAttachment.texture._texture.format === GL_DEPTH_STENCIL$2 || depthStencilAttachment.renderbuffer && depthStencilAttachment.renderbuffer._renderbuffer.format === GL_DEPTH_STENCIL$2, 'invalid depth-stencil attachment for framebuffer object');

        // decrement references
        decFBORefs(framebuffer);

        framebuffer.width = width;
        framebuffer.height = height;

        framebuffer.colorAttachments = colorAttachments;
        framebuffer.depthAttachment = depthAttachment;
        framebuffer.stencilAttachment = stencilAttachment;
        framebuffer.depthStencilAttachment = depthStencilAttachment;

        reglFramebuffer.color = colorAttachments.map(unwrapAttachment);
        reglFramebuffer.depth = unwrapAttachment(depthAttachment);
        reglFramebuffer.stencil = unwrapAttachment(stencilAttachment);
        reglFramebuffer.depthStencil = unwrapAttachment(depthStencilAttachment);

        reglFramebuffer.width = framebuffer.width;
        reglFramebuffer.height = framebuffer.height;

        updateFramebuffer(framebuffer);

        return reglFramebuffer;
      }

      function resize(w_, h_) {
        check$1(framebufferState.next !== framebuffer, 'can not resize a framebuffer which is currently in use');

        var w = w_ | 0;
        var h = h_ | 0 || w;
        if (w === framebuffer.width && h === framebuffer.height) {
          return reglFramebuffer;
        }

        // resize all buffers
        var colorAttachments = framebuffer.colorAttachments;
        for (var i = 0; i < colorAttachments.length; ++i) {
          resizeAttachment(colorAttachments[i], w, h);
        }
        resizeAttachment(framebuffer.depthAttachment, w, h);
        resizeAttachment(framebuffer.stencilAttachment, w, h);
        resizeAttachment(framebuffer.depthStencilAttachment, w, h);

        framebuffer.width = reglFramebuffer.width = w;
        framebuffer.height = reglFramebuffer.height = h;

        updateFramebuffer(framebuffer);

        return reglFramebuffer;
      }

      reglFramebuffer(a0, a1);

      return extend(reglFramebuffer, {
        resize: resize,
        _reglType: 'framebuffer',
        _framebuffer: framebuffer,
        destroy: function destroy() {
          _destroy(framebuffer);
          decFBORefs(framebuffer);
        },
        use: function use(block) {
          framebufferState.setFBO({
            framebuffer: reglFramebuffer
          }, block);
        }
      });
    }

    function createCubeFBO(options) {
      var faces = Array(6);

      function reglFramebufferCube(a) {
        var i;

        check$1(faces.indexOf(framebufferState.next) < 0, 'can not update framebuffer which is currently in use');

        var extDrawBuffers = extensions.webgl_draw_buffers;

        var params = {
          color: null
        };

        var radius = 0;

        var colorBuffer = null;
        var colorFormat = 'rgba';
        var colorType = 'uint8';
        var colorCount = 1;

        if (typeof a === 'number') {
          radius = a | 0;
        } else if (!a) {
          radius = 1;
        } else {
          check$1.type(a, 'object', 'invalid arguments for framebuffer');
          var options = a;

          if ('shape' in options) {
            var shape = options.shape;
            check$1(Array.isArray(shape) && shape.length >= 2, 'invalid shape for framebuffer');
            check$1(shape[0] === shape[1], 'cube framebuffer must be square');
            radius = shape[0];
          } else {
            if ('radius' in options) {
              radius = options.radius | 0;
            }
            if ('width' in options) {
              radius = options.width | 0;
              if ('height' in options) {
                check$1(options.height === radius, 'must be square');
              }
            } else if ('height' in options) {
              radius = options.height | 0;
            }
          }

          if ('color' in options || 'colors' in options) {
            colorBuffer = options.color || options.colors;
            if (Array.isArray(colorBuffer)) {
              check$1(colorBuffer.length === 1 || extDrawBuffers, 'multiple render targets not supported');
            }
          }

          if (!colorBuffer) {
            if ('colorCount' in options) {
              colorCount = options.colorCount | 0;
              check$1(colorCount > 0, 'invalid color buffer count');
            }

            if ('colorType' in options) {
              check$1.oneOf(options.colorType, colorTypes, 'invalid color type');
              colorType = options.colorType;
            }

            if ('colorFormat' in options) {
              colorFormat = options.colorFormat;
              check$1.oneOf(options.colorFormat, colorTextureFormats, 'invalid color format for texture');
            }
          }

          if ('depth' in options) {
            params.depth = options.depth;
          }

          if ('stencil' in options) {
            params.stencil = options.stencil;
          }

          if ('depthStencil' in options) {
            params.depthStencil = options.depthStencil;
          }
        }

        var colorCubes;
        if (colorBuffer) {
          if (Array.isArray(colorBuffer)) {
            colorCubes = [];
            for (i = 0; i < colorBuffer.length; ++i) {
              colorCubes[i] = colorBuffer[i];
            }
          } else {
            colorCubes = [colorBuffer];
          }
        } else {
          colorCubes = Array(colorCount);
          var cubeMapParams = {
            radius: radius,
            format: colorFormat,
            type: colorType
          };
          for (i = 0; i < colorCount; ++i) {
            colorCubes[i] = textureState.createCube(cubeMapParams);
          }
        }

        // Check color cubes
        params.color = Array(colorCubes.length);
        for (i = 0; i < colorCubes.length; ++i) {
          var cube = colorCubes[i];
          check$1(typeof cube === 'function' && cube._reglType === 'textureCube', 'invalid cube map');
          radius = radius || cube.width;
          check$1(cube.width === radius && cube.height === radius, 'invalid cube map shape');
          params.color[i] = {
            target: GL_TEXTURE_CUBE_MAP_POSITIVE_X$1,
            data: colorCubes[i]
          };
        }

        for (i = 0; i < 6; ++i) {
          for (var j = 0; j < colorCubes.length; ++j) {
            params.color[j].target = GL_TEXTURE_CUBE_MAP_POSITIVE_X$1 + i;
          }
          // reuse depth-stencil attachments across all cube maps
          if (i > 0) {
            params.depth = faces[0].depth;
            params.stencil = faces[0].stencil;
            params.depthStencil = faces[0].depthStencil;
          }
          if (faces[i]) {
            faces[i](params);
          } else {
            faces[i] = createFBO(params);
          }
        }

        return extend(reglFramebufferCube, {
          width: radius,
          height: radius,
          color: colorCubes
        });
      }

      function resize(radius_) {
        var i;
        var radius = radius_ | 0;
        check$1(radius > 0 && radius <= limits.maxCubeMapSize, 'invalid radius for cube fbo');

        if (radius === reglFramebufferCube.width) {
          return reglFramebufferCube;
        }

        var colors = reglFramebufferCube.color;
        for (i = 0; i < colors.length; ++i) {
          colors[i].resize(radius);
        }

        for (i = 0; i < 6; ++i) {
          faces[i].resize(radius);
        }

        reglFramebufferCube.width = reglFramebufferCube.height = radius;

        return reglFramebufferCube;
      }

      reglFramebufferCube(options);

      return extend(reglFramebufferCube, {
        faces: faces,
        resize: resize,
        _reglType: 'framebufferCube',
        destroy: function destroy() {
          faces.forEach(function (f) {
            f.destroy();
          });
        }
      });
    }

    function restoreFramebuffers() {
      values(framebufferSet).forEach(function (fb) {
        fb.framebuffer = gl.createFramebuffer();
        updateFramebuffer(fb);
      });
    }

    return extend(framebufferState, {
      getFramebuffer: function getFramebuffer(object) {
        if (typeof object === 'function' && object._reglType === 'framebuffer') {
          var fbo = object._framebuffer;
          if (fbo instanceof REGLFramebuffer) {
            return fbo;
          }
        }
        return null;
      },
      create: createFBO,
      createCube: createCubeFBO,
      clear: function clear() {
        values(framebufferSet).forEach(_destroy);
      },
      restore: restoreFramebuffers
    });
  }

  var GL_FLOAT$5 = 5126;

  function AttributeRecord() {
    this.state = 0;

    this.x = 0.0;
    this.y = 0.0;
    this.z = 0.0;
    this.w = 0.0;

    this.buffer = null;
    this.size = 0;
    this.normalized = false;
    this.type = GL_FLOAT$5;
    this.offset = 0;
    this.stride = 0;
    this.divisor = 0;
  }

  function wrapAttributeState(gl, extensions, limits, bufferState, stringStore) {
    var NUM_ATTRIBUTES = limits.maxAttributes;
    var attributeBindings = new Array(NUM_ATTRIBUTES);
    for (var i = 0; i < NUM_ATTRIBUTES; ++i) {
      attributeBindings[i] = new AttributeRecord();
    }

    return {
      Record: AttributeRecord,
      scope: {},
      state: attributeBindings
    };
  }

  var GL_FRAGMENT_SHADER = 35632;
  var GL_VERTEX_SHADER = 35633;

  var GL_ACTIVE_UNIFORMS = 0x8B86;
  var GL_ACTIVE_ATTRIBUTES = 0x8B89;

  function wrapShaderState(gl, stringStore, stats, config) {
    // ===================================================
    // glsl compilation and linking
    // ===================================================
    var fragShaders = {};
    var vertShaders = {};

    function ActiveInfo(name, id, location, info) {
      this.name = name;
      this.id = id;
      this.location = location;
      this.info = info;
    }

    function insertActiveInfo(list, info) {
      for (var i = 0; i < list.length; ++i) {
        if (list[i].id === info.id) {
          list[i].location = info.location;
          return;
        }
      }
      list.push(info);
    }

    function getShader(type, id, command) {
      var cache = type === GL_FRAGMENT_SHADER ? fragShaders : vertShaders;
      var shader = cache[id];

      if (!shader) {
        var source = stringStore.str(id);
        shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        check$1.shaderError(gl, shader, source, type, command);
        cache[id] = shader;
      }

      return shader;
    }

    // ===================================================
    // program linking
    // ===================================================
    var programCache = {};
    var programList = [];

    var PROGRAM_COUNTER = 0;

    function REGLProgram(fragId, vertId) {
      this.id = PROGRAM_COUNTER++;
      this.fragId = fragId;
      this.vertId = vertId;
      this.program = null;
      this.uniforms = [];
      this.attributes = [];

      if (config.profile) {
        this.stats = {
          uniformsCount: 0,
          attributesCount: 0
        };
      }
    }

    function linkProgram(desc, command) {
      var i, info;

      // -------------------------------
      // compile & link
      // -------------------------------
      var fragShader = getShader(GL_FRAGMENT_SHADER, desc.fragId);
      var vertShader = getShader(GL_VERTEX_SHADER, desc.vertId);

      var program = desc.program = gl.createProgram();
      gl.attachShader(program, fragShader);
      gl.attachShader(program, vertShader);
      gl.linkProgram(program);
      check$1.linkError(gl, program, stringStore.str(desc.fragId), stringStore.str(desc.vertId), command);

      // -------------------------------
      // grab uniforms
      // -------------------------------
      var numUniforms = gl.getProgramParameter(program, GL_ACTIVE_UNIFORMS);
      if (config.profile) {
        desc.stats.uniformsCount = numUniforms;
      }
      var uniforms = desc.uniforms;
      for (i = 0; i < numUniforms; ++i) {
        info = gl.getActiveUniform(program, i);
        if (info) {
          if (info.size > 1) {
            for (var j = 0; j < info.size; ++j) {
              var name = info.name.replace('[0]', '[' + j + ']');
              insertActiveInfo(uniforms, new ActiveInfo(name, stringStore.id(name), gl.getUniformLocation(program, name), info));
            }
          } else {
            insertActiveInfo(uniforms, new ActiveInfo(info.name, stringStore.id(info.name), gl.getUniformLocation(program, info.name), info));
          }
        }
      }

      // -------------------------------
      // grab attributes
      // -------------------------------
      var numAttributes = gl.getProgramParameter(program, GL_ACTIVE_ATTRIBUTES);
      if (config.profile) {
        desc.stats.attributesCount = numAttributes;
      }

      var attributes = desc.attributes;
      for (i = 0; i < numAttributes; ++i) {
        info = gl.getActiveAttrib(program, i);
        if (info) {
          insertActiveInfo(attributes, new ActiveInfo(info.name, stringStore.id(info.name), gl.getAttribLocation(program, info.name), info));
        }
      }
    }

    if (config.profile) {
      stats.getMaxUniformsCount = function () {
        var m = 0;
        programList.forEach(function (desc) {
          if (desc.stats.uniformsCount > m) {
            m = desc.stats.uniformsCount;
          }
        });
        return m;
      };

      stats.getMaxAttributesCount = function () {
        var m = 0;
        programList.forEach(function (desc) {
          if (desc.stats.attributesCount > m) {
            m = desc.stats.attributesCount;
          }
        });
        return m;
      };
    }

    function restoreShaders() {
      fragShaders = {};
      vertShaders = {};
      for (var i = 0; i < programList.length; ++i) {
        linkProgram(programList[i]);
      }
    }

    return {
      clear: function clear() {
        var deleteShader = gl.deleteShader.bind(gl);
        values(fragShaders).forEach(deleteShader);
        fragShaders = {};
        values(vertShaders).forEach(deleteShader);
        vertShaders = {};

        programList.forEach(function (desc) {
          gl.deleteProgram(desc.program);
        });
        programList.length = 0;
        programCache = {};

        stats.shaderCount = 0;
      },

      program: function program(vertId, fragId, command) {
        check$1.command(vertId >= 0, 'missing vertex shader', command);
        check$1.command(fragId >= 0, 'missing fragment shader', command);

        var cache = programCache[fragId];
        if (!cache) {
          cache = programCache[fragId] = {};
        }
        var program = cache[vertId];
        if (!program) {
          program = new REGLProgram(fragId, vertId);
          stats.shaderCount++;

          linkProgram(program, command);
          cache[vertId] = program;
          programList.push(program);
        }
        return program;
      },

      restore: restoreShaders,

      shader: getShader,

      frag: -1,
      vert: -1
    };
  }

  var GL_RGBA$2 = 6408;
  var GL_UNSIGNED_BYTE$6 = 5121;
  var GL_PACK_ALIGNMENT = 0x0D05;
  var GL_FLOAT$6 = 0x1406; // 5126

  function wrapReadPixels(gl, framebufferState, reglPoll, context, glAttributes, extensions) {
    function readPixelsImpl(input) {
      var type;
      if (framebufferState.next === null) {
        check$1(glAttributes.preserveDrawingBuffer, 'you must create a webgl context with "preserveDrawingBuffer":true in order to read pixels from the drawing buffer');
        type = GL_UNSIGNED_BYTE$6;
      } else {
        check$1(framebufferState.next.colorAttachments[0].texture !== null, 'You cannot read from a renderbuffer');
        type = framebufferState.next.colorAttachments[0].texture._texture.type;

        if (extensions.oes_texture_float) {
          check$1(type === GL_UNSIGNED_BYTE$6 || type === GL_FLOAT$6, 'Reading from a framebuffer is only allowed for the types \'uint8\' and \'float\'');
        } else {
          check$1(type === GL_UNSIGNED_BYTE$6, 'Reading from a framebuffer is only allowed for the type \'uint8\'');
        }
      }

      var x = 0;
      var y = 0;
      var width = context.framebufferWidth;
      var height = context.framebufferHeight;
      var data = null;

      if (isTypedArray(input)) {
        data = input;
      } else if (input) {
        check$1.type(input, 'object', 'invalid arguments to regl.read()');
        x = input.x | 0;
        y = input.y | 0;
        check$1(x >= 0 && x < context.framebufferWidth, 'invalid x offset for regl.read');
        check$1(y >= 0 && y < context.framebufferHeight, 'invalid y offset for regl.read');
        width = (input.width || context.framebufferWidth - x) | 0;
        height = (input.height || context.framebufferHeight - y) | 0;
        data = input.data || null;
      }

      // sanity check input.data
      if (data) {
        if (type === GL_UNSIGNED_BYTE$6) {
          check$1(data instanceof Uint8Array, 'buffer must be \'Uint8Array\' when reading from a framebuffer of type \'uint8\'');
        } else if (type === GL_FLOAT$6) {
          check$1(data instanceof Float32Array, 'buffer must be \'Float32Array\' when reading from a framebuffer of type \'float\'');
        }
      }

      check$1(width > 0 && width + x <= context.framebufferWidth, 'invalid width for read pixels');
      check$1(height > 0 && height + y <= context.framebufferHeight, 'invalid height for read pixels');

      // Update WebGL state
      reglPoll();

      // Compute size
      var size = width * height * 4;

      // Allocate data
      if (!data) {
        if (type === GL_UNSIGNED_BYTE$6) {
          data = new Uint8Array(size);
        } else if (type === GL_FLOAT$6) {
          data = data || new Float32Array(size);
        }
      }

      // Type check
      check$1.isTypedArray(data, 'data buffer for regl.read() must be a typedarray');
      check$1(data.byteLength >= size, 'data buffer for regl.read() too small');

      // Run read pixels
      gl.pixelStorei(GL_PACK_ALIGNMENT, 4);
      gl.readPixels(x, y, width, height, GL_RGBA$2, type, data);
      return data;
    }

    function readPixelsFBO(options) {
      var result;
      framebufferState.setFBO({
        framebuffer: options.framebuffer
      }, function () {
        result = readPixelsImpl(options);
      });
      return result;
    }

    function readPixels(options) {
      if (!options || !('framebuffer' in options)) {
        return readPixelsImpl(options);
      } else {
        return readPixelsFBO(options);
      }
    }

    return readPixels;
  }

  function wrapVAOState(gl, extensions, stats, config) {
    var extension = extensions.oes_vertex_array_object;
    var hasSupport = Boolean(extension);
    var currentVao = null;
    var vaoCount = 0;
    var vaoSet = {};

    return {
      hasSupport: hasSupport,
      create: createVAO,
      clear: clearVAOs

      //
      // Creates and returns a new `REGLVAO' instance after adding
      // it to the internal object set. If successful, the `stats.vaoCount'
      // is incremented. Upon destruction of this instance, the
      // `stats.vaoCount' is decremented. A `REGLVAO' instance has a unique
      // ID and a reference to the underyling vertex array object handle
      // created with `gl.createVertexArray()' or the extensions equivalent.
      //
    };function createVAO() {
      var vao = new REGLVAO(gl);
      vaoSet[vao.id] = vao;
      stats.vaoCount = vaoCount;
      return vao;
    }

    //
    // Destroys all `REGLVAO' instances in the internal object set.
    // by calling `gl.deleteVertexArray()' or the extensions equivalent.
    //
    function clearVAOs() {
      values(vaoSet).forEach(function (vao) {
        if (vao && typeof vao.destroy === 'function') {
          vao.destroy();
        }
      });
    }

    //
    // Encapsualtes a vertex array object handle and provides methods
    // for binding, unbinding, and destroying a vertex array object.
    //
    function REGLVAO(gl) {
      this.id = -1;
      this.handle = null;

      if (extension) {
        this.handle = extension.createVertexArrayOES();
        if (this.handle) {
          this.id = vaoCount++;
        }
      }

      this.bind = function () {
        if (extension && this.handle && currentVao !== this) {
          extension.bindVertexArrayOES(this.handle);
          currentVao = this;
        }
      };

      this.unbind = function () {
        if (extension && currentVao) {
          extension.bindVertexArrayOES(null);
          currentVao = null;
        }
      };

      this.destroy = function () {
        if (extension && this.handle) {
          extension.deleteVertexArrayOES(this.handle);
          vaoCount = Math.max(0, vaoCount - 1);
          stats.vaoCount = vaoCount;
          this.id = -1;
          this.handle = null;
        }
      };
    }
  }

  function slice(x) {
    return Array.prototype.slice.call(x);
  }

  function join(x) {
    return slice(x).join('');
  }

  function createEnvironment() {
    // Unique variable id counter
    var varCounter = 0;

    // Linked values are passed from this scope into the generated code block
    // Calling link() passes a value into the generated scope and returns
    // the variable name which it is bound to
    var linkedNames = [];
    var linkedValues = [];
    function link(value) {
      for (var i = 0; i < linkedValues.length; ++i) {
        if (linkedValues[i] === value) {
          return linkedNames[i];
        }
      }

      var name = 'g' + varCounter++;
      linkedNames.push(name);
      linkedValues.push(value);
      return name;
    }

    // create a code block
    function block() {
      var code = [];
      function push() {
        code.push.apply(code, slice(arguments));
      }

      var vars = [];
      function def() {
        var name = 'v' + varCounter++;
        vars.push(name);

        if (arguments.length > 0) {
          code.push(name, '=');
          code.push.apply(code, slice(arguments));
          code.push(';');
        }

        return name;
      }

      return extend(push, {
        def: def,
        toString: function toString() {
          return join([vars.length > 0 ? 'var ' + vars + ';' : '', join(code)]);
        }
      });
    }

    function scope() {
      var entry = block();
      var exit = block();

      var entryToString = entry.toString;
      var exitToString = exit.toString;

      function save(object, prop) {
        exit(object, prop, '=', entry.def(object, prop), ';');
      }

      return extend(function () {
        entry.apply(entry, slice(arguments));
      }, {
        def: entry.def,
        entry: entry,
        exit: exit,
        save: save,
        set: function set(object, prop, value) {
          save(object, prop);
          entry(object, prop, '=', value, ';');
        },
        toString: function toString() {
          return entryToString() + exitToString();
        }
      });
    }

    function conditional() {
      var pred = join(arguments);
      var thenBlock = scope();
      var elseBlock = scope();

      var thenToString = thenBlock.toString;
      var elseToString = elseBlock.toString;

      return extend(thenBlock, {
        then: function then() {
          thenBlock.apply(thenBlock, slice(arguments));
          return this;
        },
        else: function _else() {
          elseBlock.apply(elseBlock, slice(arguments));
          return this;
        },
        toString: function toString() {
          var elseClause = elseToString();
          if (elseClause) {
            elseClause = 'else{' + elseClause + '}';
          }
          return join(['if(', pred, '){', thenToString(), '}', elseClause]);
        }
      });
    }

    // procedure list
    var globalBlock = block();
    var procedures = {};
    function proc(name, count) {
      var args = [];
      function arg() {
        var name = 'a' + args.length;
        args.push(name);
        return name;
      }

      count = count || 0;
      for (var i = 0; i < count; ++i) {
        arg();
      }

      var body = scope();
      var bodyToString = body.toString;

      var result = procedures[name] = extend(body, {
        arg: arg,
        toString: function toString() {
          return join(['function(', args.join(), '){', bodyToString(), '}']);
        }
      });

      return result;
    }

    function compile() {
      var code = ['"use strict";', globalBlock, 'return {'];
      Object.keys(procedures).forEach(function (name) {
        code.push('"', name, '":', procedures[name].toString(), ',');
      });
      code.push('}');
      var src = join(code).replace(/;/g, ';\n').replace(/}/g, '}\n').replace(/{/g, '{\n');
      var proc = Function.apply(null, linkedNames.concat(src));
      return proc.apply(null, linkedValues);
    }

    return {
      global: globalBlock,
      link: link,
      block: block,
      proc: proc,
      scope: scope,
      cond: conditional,
      compile: compile
    };
  }

  // "cute" names for vector components
  var CUTE_COMPONENTS = 'xyzw'.split('');

  var GL_UNSIGNED_BYTE$7 = 5121;

  var ATTRIB_STATE_POINTER = 1;
  var ATTRIB_STATE_CONSTANT = 2;

  var DYN_FUNC$1 = 0;
  var DYN_PROP$1 = 1;
  var DYN_CONTEXT$1 = 2;
  var DYN_STATE$1 = 3;
  var DYN_THUNK = 4;

  var S_DITHER = 'dither';
  var S_BLEND_ENABLE = 'blend.enable';
  var S_BLEND_COLOR = 'blend.color';
  var S_BLEND_EQUATION = 'blend.equation';
  var S_BLEND_FUNC = 'blend.func';
  var S_DEPTH_ENABLE = 'depth.enable';
  var S_DEPTH_FUNC = 'depth.func';
  var S_DEPTH_RANGE = 'depth.range';
  var S_DEPTH_MASK = 'depth.mask';
  var S_COLOR_MASK = 'colorMask';
  var S_CULL_ENABLE = 'cull.enable';
  var S_CULL_FACE = 'cull.face';
  var S_FRONT_FACE = 'frontFace';
  var S_LINE_WIDTH = 'lineWidth';
  var S_POLYGON_OFFSET_ENABLE = 'polygonOffset.enable';
  var S_POLYGON_OFFSET_OFFSET = 'polygonOffset.offset';
  var S_SAMPLE_ALPHA = 'sample.alpha';
  var S_SAMPLE_ENABLE = 'sample.enable';
  var S_SAMPLE_COVERAGE = 'sample.coverage';
  var S_STENCIL_ENABLE = 'stencil.enable';
  var S_STENCIL_MASK = 'stencil.mask';
  var S_STENCIL_FUNC = 'stencil.func';
  var S_STENCIL_OPFRONT = 'stencil.opFront';
  var S_STENCIL_OPBACK = 'stencil.opBack';
  var S_SCISSOR_ENABLE = 'scissor.enable';
  var S_SCISSOR_BOX = 'scissor.box';
  var S_VIEWPORT = 'viewport';

  var S_PROFILE = 'profile';

  var S_FRAMEBUFFER = 'framebuffer';
  var S_VERT = 'vert';
  var S_FRAG = 'frag';
  var S_ELEMENTS = 'elements';
  var S_PRIMITIVE = 'primitive';
  var S_COUNT = 'count';
  var S_OFFSET = 'offset';
  var S_INSTANCES = 'instances';

  var SUFFIX_WIDTH = 'Width';
  var SUFFIX_HEIGHT = 'Height';

  var S_FRAMEBUFFER_WIDTH = S_FRAMEBUFFER + SUFFIX_WIDTH;
  var S_FRAMEBUFFER_HEIGHT = S_FRAMEBUFFER + SUFFIX_HEIGHT;
  var S_VIEWPORT_WIDTH = S_VIEWPORT + SUFFIX_WIDTH;
  var S_VIEWPORT_HEIGHT = S_VIEWPORT + SUFFIX_HEIGHT;
  var S_DRAWINGBUFFER = 'drawingBuffer';
  var S_DRAWINGBUFFER_WIDTH = S_DRAWINGBUFFER + SUFFIX_WIDTH;
  var S_DRAWINGBUFFER_HEIGHT = S_DRAWINGBUFFER + SUFFIX_HEIGHT;

  var NESTED_OPTIONS = [S_BLEND_FUNC, S_BLEND_EQUATION, S_STENCIL_FUNC, S_STENCIL_OPFRONT, S_STENCIL_OPBACK, S_SAMPLE_COVERAGE, S_VIEWPORT, S_SCISSOR_BOX, S_POLYGON_OFFSET_OFFSET];

  var GL_ARRAY_BUFFER$1 = 34962;
  var GL_ELEMENT_ARRAY_BUFFER$1 = 34963;

  var GL_FRAGMENT_SHADER$1 = 35632;
  var GL_VERTEX_SHADER$1 = 35633;

  var GL_TEXTURE_2D$2 = 0x0DE1;
  var GL_TEXTURE_CUBE_MAP$1 = 0x8513;

  var GL_CULL_FACE = 0x0B44;
  var GL_BLEND = 0x0BE2;
  var GL_DITHER = 0x0BD0;
  var GL_STENCIL_TEST = 0x0B90;
  var GL_DEPTH_TEST = 0x0B71;
  var GL_SCISSOR_TEST = 0x0C11;
  var GL_POLYGON_OFFSET_FILL = 0x8037;
  var GL_SAMPLE_ALPHA_TO_COVERAGE = 0x809E;
  var GL_SAMPLE_COVERAGE = 0x80A0;

  var GL_FLOAT$7 = 5126;
  var GL_FLOAT_VEC2 = 35664;
  var GL_FLOAT_VEC3 = 35665;
  var GL_FLOAT_VEC4 = 35666;
  var GL_INT$3 = 5124;
  var GL_INT_VEC2 = 35667;
  var GL_INT_VEC3 = 35668;
  var GL_INT_VEC4 = 35669;
  var GL_BOOL = 35670;
  var GL_BOOL_VEC2 = 35671;
  var GL_BOOL_VEC3 = 35672;
  var GL_BOOL_VEC4 = 35673;
  var GL_FLOAT_MAT2 = 35674;
  var GL_FLOAT_MAT3 = 35675;
  var GL_FLOAT_MAT4 = 35676;
  var GL_SAMPLER_2D = 35678;
  var GL_SAMPLER_CUBE = 35680;

  var GL_TRIANGLES$1 = 4;

  var GL_FRONT = 1028;
  var GL_BACK = 1029;
  var GL_CW = 0x0900;
  var GL_CCW = 0x0901;
  var GL_MIN_EXT = 0x8007;
  var GL_MAX_EXT = 0x8008;
  var GL_ALWAYS = 519;
  var GL_KEEP = 7680;
  var GL_ZERO = 0;
  var GL_ONE = 1;
  var GL_FUNC_ADD = 0x8006;
  var GL_LESS = 513;

  var GL_FRAMEBUFFER$1 = 0x8D40;
  var GL_COLOR_ATTACHMENT0$1 = 0x8CE0;

  var blendFuncs = {
    '0': 0,
    '1': 1,
    'zero': 0,
    'one': 1,
    'src color': 768,
    'one minus src color': 769,
    'src alpha': 770,
    'one minus src alpha': 771,
    'dst color': 774,
    'one minus dst color': 775,
    'dst alpha': 772,
    'one minus dst alpha': 773,
    'constant color': 32769,
    'one minus constant color': 32770,
    'constant alpha': 32771,
    'one minus constant alpha': 32772,
    'src alpha saturate': 776
  };

  // There are invalid values for srcRGB and dstRGB. See:
  // https://www.khronos.org/registry/webgl/specs/1.0/#6.13
  // https://github.com/KhronosGroup/WebGL/blob/0d3201f5f7ec3c0060bc1f04077461541f1987b9/conformance-suites/1.0.3/conformance/misc/webgl-specific.html#L56
  var invalidBlendCombinations = ['constant color, constant alpha', 'one minus constant color, constant alpha', 'constant color, one minus constant alpha', 'one minus constant color, one minus constant alpha', 'constant alpha, constant color', 'constant alpha, one minus constant color', 'one minus constant alpha, constant color', 'one minus constant alpha, one minus constant color'];

  var compareFuncs = {
    'never': 512,
    'less': 513,
    '<': 513,
    'equal': 514,
    '=': 514,
    '==': 514,
    '===': 514,
    'lequal': 515,
    '<=': 515,
    'greater': 516,
    '>': 516,
    'notequal': 517,
    '!=': 517,
    '!==': 517,
    'gequal': 518,
    '>=': 518,
    'always': 519
  };

  var stencilOps = {
    '0': 0,
    'zero': 0,
    'keep': 7680,
    'replace': 7681,
    'increment': 7682,
    'decrement': 7683,
    'increment wrap': 34055,
    'decrement wrap': 34056,
    'invert': 5386
  };

  var shaderType = {
    'frag': GL_FRAGMENT_SHADER$1,
    'vert': GL_VERTEX_SHADER$1
  };

  var orientationType = {
    'cw': GL_CW,
    'ccw': GL_CCW
  };

  function isBufferArgs(x) {
    return Array.isArray(x) || isTypedArray(x) || isNDArrayLike(x);
  }

  // Make sure viewport is processed first
  function sortState(state) {
    return state.sort(function (a, b) {
      if (a === S_VIEWPORT) {
        return -1;
      } else if (b === S_VIEWPORT) {
        return 1;
      }
      return a < b ? -1 : 1;
    });
  }

  function Declaration(thisDep, contextDep, propDep, append) {
    this.thisDep = thisDep;
    this.contextDep = contextDep;
    this.propDep = propDep;
    this.append = append;
  }

  function isStatic(decl) {
    return decl && !(decl.thisDep || decl.contextDep || decl.propDep);
  }

  function createStaticDecl(append) {
    return new Declaration(false, false, false, append);
  }

  function createDynamicDecl(dyn, append) {
    var type = dyn.type;
    if (type === DYN_FUNC$1) {
      var numArgs = dyn.data.length;
      return new Declaration(true, numArgs >= 1, numArgs >= 2, append);
    } else if (type === DYN_THUNK) {
      var data = dyn.data;
      return new Declaration(data.thisDep, data.contextDep, data.propDep, append);
    } else {
      return new Declaration(type === DYN_STATE$1, type === DYN_CONTEXT$1, type === DYN_PROP$1, append);
    }
  }

  var SCOPE_DECL = new Declaration(false, false, false, function () {});

  function reglCore(gl, stringStore, extensions, limits, vaoState, bufferState, elementState, textureState, framebufferState, uniformState, attributeState, shaderState, drawState, contextState, timer, config) {
    var AttributeRecord = attributeState.Record;

    var blendEquations = {
      'add': 32774,
      'subtract': 32778,
      'reverse subtract': 32779
    };
    if (extensions.ext_blend_minmax) {
      blendEquations.min = GL_MIN_EXT;
      blendEquations.max = GL_MAX_EXT;
    }

    var extInstancing = extensions.angle_instanced_arrays;
    var extDrawBuffers = extensions.webgl_draw_buffers;

    // ===================================================
    // ===================================================
    // WEBGL STATE
    // ===================================================
    // ===================================================
    var currentState = {
      dirty: true,
      profile: config.profile
    };
    var nextState = {};
    var GL_STATE_NAMES = [];
    var GL_FLAGS = {};
    var GL_VARIABLES = {};

    function propName(name) {
      return name.replace('.', '_');
    }

    function stateFlag(sname, cap, init) {
      var name = propName(sname);
      GL_STATE_NAMES.push(sname);
      nextState[name] = currentState[name] = !!init;
      GL_FLAGS[name] = cap;
    }

    function stateVariable(sname, func, init) {
      var name = propName(sname);
      GL_STATE_NAMES.push(sname);
      if (Array.isArray(init)) {
        currentState[name] = init.slice();
        nextState[name] = init.slice();
      } else {
        currentState[name] = nextState[name] = init;
      }
      GL_VARIABLES[name] = func;
    }

    // Dithering
    stateFlag(S_DITHER, GL_DITHER);

    // Blending
    stateFlag(S_BLEND_ENABLE, GL_BLEND);
    stateVariable(S_BLEND_COLOR, 'blendColor', [0, 0, 0, 0]);
    stateVariable(S_BLEND_EQUATION, 'blendEquationSeparate', [GL_FUNC_ADD, GL_FUNC_ADD]);
    stateVariable(S_BLEND_FUNC, 'blendFuncSeparate', [GL_ONE, GL_ZERO, GL_ONE, GL_ZERO]);

    // Depth
    stateFlag(S_DEPTH_ENABLE, GL_DEPTH_TEST, true);
    stateVariable(S_DEPTH_FUNC, 'depthFunc', GL_LESS);
    stateVariable(S_DEPTH_RANGE, 'depthRange', [0, 1]);
    stateVariable(S_DEPTH_MASK, 'depthMask', true);

    // Color mask
    stateVariable(S_COLOR_MASK, S_COLOR_MASK, [true, true, true, true]);

    // Face culling
    stateFlag(S_CULL_ENABLE, GL_CULL_FACE);
    stateVariable(S_CULL_FACE, 'cullFace', GL_BACK);

    // Front face orientation
    stateVariable(S_FRONT_FACE, S_FRONT_FACE, GL_CCW);

    // Line width
    stateVariable(S_LINE_WIDTH, S_LINE_WIDTH, 1);

    // Polygon offset
    stateFlag(S_POLYGON_OFFSET_ENABLE, GL_POLYGON_OFFSET_FILL);
    stateVariable(S_POLYGON_OFFSET_OFFSET, 'polygonOffset', [0, 0]);

    // Sample coverage
    stateFlag(S_SAMPLE_ALPHA, GL_SAMPLE_ALPHA_TO_COVERAGE);
    stateFlag(S_SAMPLE_ENABLE, GL_SAMPLE_COVERAGE);
    stateVariable(S_SAMPLE_COVERAGE, 'sampleCoverage', [1, false]);

    // Stencil
    stateFlag(S_STENCIL_ENABLE, GL_STENCIL_TEST);
    stateVariable(S_STENCIL_MASK, 'stencilMask', -1);
    stateVariable(S_STENCIL_FUNC, 'stencilFunc', [GL_ALWAYS, 0, -1]);
    stateVariable(S_STENCIL_OPFRONT, 'stencilOpSeparate', [GL_FRONT, GL_KEEP, GL_KEEP, GL_KEEP]);
    stateVariable(S_STENCIL_OPBACK, 'stencilOpSeparate', [GL_BACK, GL_KEEP, GL_KEEP, GL_KEEP]);

    // Scissor
    stateFlag(S_SCISSOR_ENABLE, GL_SCISSOR_TEST);
    stateVariable(S_SCISSOR_BOX, 'scissor', [0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight]);

    // Viewport
    stateVariable(S_VIEWPORT, S_VIEWPORT, [0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight]);

    // ===================================================
    // ===================================================
    // ENVIRONMENT
    // ===================================================
    // ===================================================
    var sharedState = {
      gl: gl,
      context: contextState,
      strings: stringStore,
      next: nextState,
      current: currentState,
      draw: drawState,
      elements: elementState,
      vao: vaoState,
      buffer: bufferState,
      shader: shaderState,
      attributes: attributeState.state,
      uniforms: uniformState,
      framebuffer: framebufferState,
      extensions: extensions,

      timer: timer,
      isBufferArgs: isBufferArgs
    };

    var sharedConstants = {
      primTypes: primTypes,
      compareFuncs: compareFuncs,
      blendFuncs: blendFuncs,
      blendEquations: blendEquations,
      stencilOps: stencilOps,
      glTypes: glTypes,
      orientationType: orientationType
    };

    check$1.optional(function () {
      sharedState.isArrayLike = isArrayLike;
    });

    if (extDrawBuffers) {
      sharedConstants.backBuffer = [GL_BACK];
      sharedConstants.drawBuffer = loop(limits.maxDrawbuffers, function (i) {
        if (i === 0) {
          return [0];
        }
        return loop(i, function (j) {
          return GL_COLOR_ATTACHMENT0$1 + j;
        });
      });
    }

    var drawCallCounter = 0;
    function createREGLEnvironment() {
      var env = createEnvironment();
      var link = env.link;
      var global = env.global;
      env.id = drawCallCounter++;

      env.batchId = '0';

      // link shared state
      var SHARED = link(sharedState);
      var shared = env.shared = {
        props: 'a0'
      };
      Object.keys(sharedState).forEach(function (prop) {
        shared[prop] = global.def(SHARED, '.', prop);
      });

      // Inject runtime assertion stuff for debug builds
      check$1.optional(function () {
        env.CHECK = link(check$1);
        env.commandStr = check$1.guessCommand();
        env.command = link(env.commandStr);
        env.assert = function (block, pred, message) {
          block('if(!(', pred, '))', this.CHECK, '.commandRaise(', link(message), ',', this.command, ');');
        };

        sharedConstants.invalidBlendCombinations = invalidBlendCombinations;
      });

      // Copy GL state variables over
      var nextVars = env.next = {};
      var currentVars = env.current = {};
      Object.keys(GL_VARIABLES).forEach(function (variable) {
        if (Array.isArray(currentState[variable])) {
          nextVars[variable] = global.def(shared.next, '.', variable);
          currentVars[variable] = global.def(shared.current, '.', variable);
        }
      });

      // Initialize shared constants
      var constants = env.constants = {};
      Object.keys(sharedConstants).forEach(function (name) {
        constants[name] = global.def(JSON.stringify(sharedConstants[name]));
      });

      // Helper function for calling a block
      env.invoke = function (block, x) {
        switch (x.type) {
          case DYN_FUNC$1:
            var argList = ['this', shared.context, shared.props, env.batchId];
            return block.def(link(x.data), '.call(', argList.slice(0, Math.max(x.data.length + 1, 4)), ')');
          case DYN_PROP$1:
            return block.def(shared.props, x.data);
          case DYN_CONTEXT$1:
            return block.def(shared.context, x.data);
          case DYN_STATE$1:
            return block.def('this', x.data);
          case DYN_THUNK:
            x.data.append(env, block);
            return x.data.ref;
        }
      };

      env.attribCache = {};

      var scopeAttribs = {};
      env.scopeAttrib = function (name) {
        var id = stringStore.id(name);
        if (id in scopeAttribs) {
          return scopeAttribs[id];
        }
        var binding = attributeState.scope[id];
        if (!binding) {
          binding = attributeState.scope[id] = new AttributeRecord();
        }
        var result = scopeAttribs[id] = link(binding);
        return result;
      };

      return env;
    }

    // ===================================================
    // ===================================================
    // PARSING
    // ===================================================
    // ===================================================
    function parseProfile(options) {
      var staticOptions = options.static;
      var dynamicOptions = options.dynamic;

      var profileEnable;
      if (S_PROFILE in staticOptions) {
        var value = !!staticOptions[S_PROFILE];
        profileEnable = createStaticDecl(function (env, scope) {
          return value;
        });
        profileEnable.enable = value;
      } else if (S_PROFILE in dynamicOptions) {
        var dyn = dynamicOptions[S_PROFILE];
        profileEnable = createDynamicDecl(dyn, function (env, scope) {
          return env.invoke(scope, dyn);
        });
      }

      return profileEnable;
    }

    function parseFramebuffer(options, env) {
      var staticOptions = options.static;
      var dynamicOptions = options.dynamic;

      if (S_FRAMEBUFFER in staticOptions) {
        var framebuffer = staticOptions[S_FRAMEBUFFER];
        if (framebuffer) {
          framebuffer = framebufferState.getFramebuffer(framebuffer);
          check$1.command(framebuffer, 'invalid framebuffer object');
          return createStaticDecl(function (env, block) {
            var FRAMEBUFFER = env.link(framebuffer);
            var shared = env.shared;
            block.set(shared.framebuffer, '.next', FRAMEBUFFER);
            var CONTEXT = shared.context;
            block.set(CONTEXT, '.' + S_FRAMEBUFFER_WIDTH, FRAMEBUFFER + '.width');
            block.set(CONTEXT, '.' + S_FRAMEBUFFER_HEIGHT, FRAMEBUFFER + '.height');
            return FRAMEBUFFER;
          });
        } else {
          return createStaticDecl(function (env, scope) {
            var shared = env.shared;
            scope.set(shared.framebuffer, '.next', 'null');
            var CONTEXT = shared.context;
            scope.set(CONTEXT, '.' + S_FRAMEBUFFER_WIDTH, CONTEXT + '.' + S_DRAWINGBUFFER_WIDTH);
            scope.set(CONTEXT, '.' + S_FRAMEBUFFER_HEIGHT, CONTEXT + '.' + S_DRAWINGBUFFER_HEIGHT);
            return 'null';
          });
        }
      } else if (S_FRAMEBUFFER in dynamicOptions) {
        var dyn = dynamicOptions[S_FRAMEBUFFER];
        return createDynamicDecl(dyn, function (env, scope) {
          var FRAMEBUFFER_FUNC = env.invoke(scope, dyn);
          var shared = env.shared;
          var FRAMEBUFFER_STATE = shared.framebuffer;
          var FRAMEBUFFER = scope.def(FRAMEBUFFER_STATE, '.getFramebuffer(', FRAMEBUFFER_FUNC, ')');

          check$1.optional(function () {
            env.assert(scope, '!' + FRAMEBUFFER_FUNC + '||' + FRAMEBUFFER, 'invalid framebuffer object');
          });

          scope.set(FRAMEBUFFER_STATE, '.next', FRAMEBUFFER);
          var CONTEXT = shared.context;
          scope.set(CONTEXT, '.' + S_FRAMEBUFFER_WIDTH, FRAMEBUFFER + '?' + FRAMEBUFFER + '.width:' + CONTEXT + '.' + S_DRAWINGBUFFER_WIDTH);
          scope.set(CONTEXT, '.' + S_FRAMEBUFFER_HEIGHT, FRAMEBUFFER + '?' + FRAMEBUFFER + '.height:' + CONTEXT + '.' + S_DRAWINGBUFFER_HEIGHT);
          return FRAMEBUFFER;
        });
      } else {
        return null;
      }
    }

    function parseViewportScissor(options, framebuffer, env) {
      var staticOptions = options.static;
      var dynamicOptions = options.dynamic;

      function parseBox(param) {
        if (param in staticOptions) {
          var box = staticOptions[param];
          check$1.commandType(box, 'object', 'invalid ' + param, env.commandStr);

          var isStatic = true;
          var x = box.x | 0;
          var y = box.y | 0;
          var w, h;
          if ('width' in box) {
            w = box.width | 0;
            check$1.command(w >= 0, 'invalid ' + param, env.commandStr);
          } else {
            isStatic = false;
          }
          if ('height' in box) {
            h = box.height | 0;
            check$1.command(h >= 0, 'invalid ' + param, env.commandStr);
          } else {
            isStatic = false;
          }

          return new Declaration(!isStatic && framebuffer && framebuffer.thisDep, !isStatic && framebuffer && framebuffer.contextDep, !isStatic && framebuffer && framebuffer.propDep, function (env, scope) {
            var CONTEXT = env.shared.context;
            var BOX_W = w;
            if (!('width' in box)) {
              BOX_W = scope.def(CONTEXT, '.', S_FRAMEBUFFER_WIDTH, '-', x);
            }
            var BOX_H = h;
            if (!('height' in box)) {
              BOX_H = scope.def(CONTEXT, '.', S_FRAMEBUFFER_HEIGHT, '-', y);
            }
            return [x, y, BOX_W, BOX_H];
          });
        } else if (param in dynamicOptions) {
          var dynBox = dynamicOptions[param];
          var result = createDynamicDecl(dynBox, function (env, scope) {
            var BOX = env.invoke(scope, dynBox);

            check$1.optional(function () {
              env.assert(scope, BOX + '&&typeof ' + BOX + '==="object"', 'invalid ' + param);
            });

            var CONTEXT = env.shared.context;
            var BOX_X = scope.def(BOX, '.x|0');
            var BOX_Y = scope.def(BOX, '.y|0');
            var BOX_W = scope.def('"width" in ', BOX, '?', BOX, '.width|0:', '(', CONTEXT, '.', S_FRAMEBUFFER_WIDTH, '-', BOX_X, ')');
            var BOX_H = scope.def('"height" in ', BOX, '?', BOX, '.height|0:', '(', CONTEXT, '.', S_FRAMEBUFFER_HEIGHT, '-', BOX_Y, ')');

            check$1.optional(function () {
              env.assert(scope, BOX_W + '>=0&&' + BOX_H + '>=0', 'invalid ' + param);
            });

            return [BOX_X, BOX_Y, BOX_W, BOX_H];
          });
          if (framebuffer) {
            result.thisDep = result.thisDep || framebuffer.thisDep;
            result.contextDep = result.contextDep || framebuffer.contextDep;
            result.propDep = result.propDep || framebuffer.propDep;
          }
          return result;
        } else if (framebuffer) {
          return new Declaration(framebuffer.thisDep, framebuffer.contextDep, framebuffer.propDep, function (env, scope) {
            var CONTEXT = env.shared.context;
            return [0, 0, scope.def(CONTEXT, '.', S_FRAMEBUFFER_WIDTH), scope.def(CONTEXT, '.', S_FRAMEBUFFER_HEIGHT)];
          });
        } else {
          return null;
        }
      }

      var viewport = parseBox(S_VIEWPORT);

      if (viewport) {
        var prevViewport = viewport;
        viewport = new Declaration(viewport.thisDep, viewport.contextDep, viewport.propDep, function (env, scope) {
          var VIEWPORT = prevViewport.append(env, scope);
          var CONTEXT = env.shared.context;
          scope.set(CONTEXT, '.' + S_VIEWPORT_WIDTH, VIEWPORT[2]);
          scope.set(CONTEXT, '.' + S_VIEWPORT_HEIGHT, VIEWPORT[3]);
          return VIEWPORT;
        });
      }

      return {
        viewport: viewport,
        scissor_box: parseBox(S_SCISSOR_BOX)
      };
    }

    function parseProgram(options) {
      var staticOptions = options.static;
      var dynamicOptions = options.dynamic;

      function parseShader(name) {
        if (name in staticOptions) {
          var id = stringStore.id(staticOptions[name]);
          check$1.optional(function () {
            shaderState.shader(shaderType[name], id, check$1.guessCommand());
          });
          var result = createStaticDecl(function () {
            return id;
          });
          result.id = id;
          return result;
        } else if (name in dynamicOptions) {
          var dyn = dynamicOptions[name];
          return createDynamicDecl(dyn, function (env, scope) {
            var str = env.invoke(scope, dyn);
            var id = scope.def(env.shared.strings, '.id(', str, ')');
            check$1.optional(function () {
              scope(env.shared.shader, '.shader(', shaderType[name], ',', id, ',', env.command, ');');
            });
            return id;
          });
        }
        return null;
      }

      var frag = parseShader(S_FRAG);
      var vert = parseShader(S_VERT);

      var program = null;
      var progVar;
      if (isStatic(frag) && isStatic(vert)) {
        program = shaderState.program(vert.id, frag.id);
        progVar = createStaticDecl(function (env, scope) {
          return env.link(program);
        });
      } else {
        progVar = new Declaration(frag && frag.thisDep || vert && vert.thisDep, frag && frag.contextDep || vert && vert.contextDep, frag && frag.propDep || vert && vert.propDep, function (env, scope) {
          var SHADER_STATE = env.shared.shader;
          var fragId;
          if (frag) {
            fragId = frag.append(env, scope);
          } else {
            fragId = scope.def(SHADER_STATE, '.', S_FRAG);
          }
          var vertId;
          if (vert) {
            vertId = vert.append(env, scope);
          } else {
            vertId = scope.def(SHADER_STATE, '.', S_VERT);
          }
          var progDef = SHADER_STATE + '.program(' + vertId + ',' + fragId;
          check$1.optional(function () {
            progDef += ',' + env.command;
          });
          return scope.def(progDef + ')');
        });
      }

      return {
        frag: frag,
        vert: vert,
        progVar: progVar,
        program: program
      };
    }

    function parseDraw(options, env) {
      var staticOptions = options.static;
      var dynamicOptions = options.dynamic;

      function parseElements() {
        if (S_ELEMENTS in staticOptions) {
          var elements = staticOptions[S_ELEMENTS];
          if (isBufferArgs(elements)) {
            elements = elementState.getElements(elementState.create(elements, true));
          } else if (elements) {
            elements = elementState.getElements(elements);
            check$1.command(elements, 'invalid elements', env.commandStr);
          }
          var result = createStaticDecl(function (env, scope) {
            if (elements) {
              var result = env.link(elements);
              env.ELEMENTS = result;
              return result;
            }
            env.ELEMENTS = null;
            return null;
          });
          result.value = elements;
          return result;
        } else if (S_ELEMENTS in dynamicOptions) {
          var dyn = dynamicOptions[S_ELEMENTS];
          return createDynamicDecl(dyn, function (env, scope) {
            var shared = env.shared;

            var IS_BUFFER_ARGS = shared.isBufferArgs;
            var ELEMENT_STATE = shared.elements;

            var elementDefn = env.invoke(scope, dyn);
            var elements = scope.def('null');
            var elementStream = scope.def(IS_BUFFER_ARGS, '(', elementDefn, ')');

            var ifte = env.cond(elementStream).then(elements, '=', ELEMENT_STATE, '.createStream(', elementDefn, ');').else(elements, '=', ELEMENT_STATE, '.getElements(', elementDefn, ');');

            check$1.optional(function () {
              env.assert(ifte.else, '!' + elementDefn + '||' + elements, 'invalid elements');
            });

            scope.entry(ifte);
            scope.exit(env.cond(elementStream).then(ELEMENT_STATE, '.destroyStream(', elements, ');'));

            env.ELEMENTS = elements;

            return elements;
          });
        }

        return null;
      }

      var elements = parseElements();

      function parsePrimitive() {
        if (S_PRIMITIVE in staticOptions) {
          var primitive = staticOptions[S_PRIMITIVE];
          check$1.commandParameter(primitive, primTypes, 'invalid primitve', env.commandStr);
          return createStaticDecl(function (env, scope) {
            return primTypes[primitive];
          });
        } else if (S_PRIMITIVE in dynamicOptions) {
          var dynPrimitive = dynamicOptions[S_PRIMITIVE];
          return createDynamicDecl(dynPrimitive, function (env, scope) {
            var PRIM_TYPES = env.constants.primTypes;
            var prim = env.invoke(scope, dynPrimitive);
            check$1.optional(function () {
              env.assert(scope, prim + ' in ' + PRIM_TYPES, 'invalid primitive, must be one of ' + Object.keys(primTypes));
            });
            return scope.def(PRIM_TYPES, '[', prim, ']');
          });
        } else if (elements) {
          if (isStatic(elements)) {
            if (elements.value) {
              return createStaticDecl(function (env, scope) {
                return scope.def(env.ELEMENTS, '.primType');
              });
            } else {
              return createStaticDecl(function () {
                return GL_TRIANGLES$1;
              });
            }
          } else {
            return new Declaration(elements.thisDep, elements.contextDep, elements.propDep, function (env, scope) {
              var elements = env.ELEMENTS;
              return scope.def(elements, '?', elements, '.primType:', GL_TRIANGLES$1);
            });
          }
        }
        return null;
      }

      function parseParam(param, isOffset) {
        if (param in staticOptions) {
          var value = staticOptions[param] | 0;
          check$1.command(!isOffset || value >= 0, 'invalid ' + param, env.commandStr);
          return createStaticDecl(function (env, scope) {
            if (isOffset) {
              env.OFFSET = value;
            }
            return value;
          });
        } else if (param in dynamicOptions) {
          var dynValue = dynamicOptions[param];
          return createDynamicDecl(dynValue, function (env, scope) {
            var result = env.invoke(scope, dynValue);
            if (isOffset) {
              env.OFFSET = result;
              check$1.optional(function () {
                env.assert(scope, result + '>=0', 'invalid ' + param);
              });
            }
            return result;
          });
        } else if (isOffset && elements) {
          return createStaticDecl(function (env, scope) {
            env.OFFSET = '0';
            return 0;
          });
        }
        return null;
      }

      var OFFSET = parseParam(S_OFFSET, true);

      function parseVertCount() {
        if (S_COUNT in staticOptions) {
          var count = staticOptions[S_COUNT] | 0;
          check$1.command(typeof count === 'number' && count >= 0, 'invalid vertex count', env.commandStr);
          return createStaticDecl(function () {
            return count;
          });
        } else if (S_COUNT in dynamicOptions) {
          var dynCount = dynamicOptions[S_COUNT];
          return createDynamicDecl(dynCount, function (env, scope) {
            var result = env.invoke(scope, dynCount);
            check$1.optional(function () {
              env.assert(scope, 'typeof ' + result + '==="number"&&' + result + '>=0&&' + result + '===(' + result + '|0)', 'invalid vertex count');
            });
            return result;
          });
        } else if (elements) {
          if (isStatic(elements)) {
            if (elements) {
              if (OFFSET) {
                return new Declaration(OFFSET.thisDep, OFFSET.contextDep, OFFSET.propDep, function (env, scope) {
                  var result = scope.def(env.ELEMENTS, '.vertCount-', env.OFFSET);

                  check$1.optional(function () {
                    env.assert(scope, result + '>=0', 'invalid vertex offset/element buffer too small');
                  });

                  return result;
                });
              } else {
                return createStaticDecl(function (env, scope) {
                  return scope.def(env.ELEMENTS, '.vertCount');
                });
              }
            } else {
              var result = createStaticDecl(function () {
                return -1;
              });
              check$1.optional(function () {
                result.MISSING = true;
              });
              return result;
            }
          } else {
            var variable = new Declaration(elements.thisDep || OFFSET.thisDep, elements.contextDep || OFFSET.contextDep, elements.propDep || OFFSET.propDep, function (env, scope) {
              var elements = env.ELEMENTS;
              if (env.OFFSET) {
                return scope.def(elements, '?', elements, '.vertCount-', env.OFFSET, ':-1');
              }
              return scope.def(elements, '?', elements, '.vertCount:-1');
            });
            check$1.optional(function () {
              variable.DYNAMIC = true;
            });
            return variable;
          }
        }
        return null;
      }

      return {
        elements: elements,
        primitive: parsePrimitive(),
        count: parseVertCount(),
        instances: parseParam(S_INSTANCES, false),
        offset: OFFSET
      };
    }

    function parseGLState(options, env) {
      var staticOptions = options.static;
      var dynamicOptions = options.dynamic;

      var STATE = {};

      GL_STATE_NAMES.forEach(function (prop) {
        var param = propName(prop);

        function parseParam(parseStatic, parseDynamic) {
          if (prop in staticOptions) {
            var value = parseStatic(staticOptions[prop]);
            STATE[param] = createStaticDecl(function () {
              return value;
            });
          } else if (prop in dynamicOptions) {
            var dyn = dynamicOptions[prop];
            STATE[param] = createDynamicDecl(dyn, function (env, scope) {
              return parseDynamic(env, scope, env.invoke(scope, dyn));
            });
          }
        }

        switch (prop) {
          case S_CULL_ENABLE:
          case S_BLEND_ENABLE:
          case S_DITHER:
          case S_STENCIL_ENABLE:
          case S_DEPTH_ENABLE:
          case S_SCISSOR_ENABLE:
          case S_POLYGON_OFFSET_ENABLE:
          case S_SAMPLE_ALPHA:
          case S_SAMPLE_ENABLE:
          case S_DEPTH_MASK:
            return parseParam(function (value) {
              check$1.commandType(value, 'boolean', prop, env.commandStr);
              return value;
            }, function (env, scope, value) {
              check$1.optional(function () {
                env.assert(scope, 'typeof ' + value + '==="boolean"', 'invalid flag ' + prop, env.commandStr);
              });
              return value;
            });

          case S_DEPTH_FUNC:
            return parseParam(function (value) {
              check$1.commandParameter(value, compareFuncs, 'invalid ' + prop, env.commandStr);
              return compareFuncs[value];
            }, function (env, scope, value) {
              var COMPARE_FUNCS = env.constants.compareFuncs;
              check$1.optional(function () {
                env.assert(scope, value + ' in ' + COMPARE_FUNCS, 'invalid ' + prop + ', must be one of ' + Object.keys(compareFuncs));
              });
              return scope.def(COMPARE_FUNCS, '[', value, ']');
            });

          case S_DEPTH_RANGE:
            return parseParam(function (value) {
              check$1.command(isArrayLike(value) && value.length === 2 && typeof value[0] === 'number' && typeof value[1] === 'number' && value[0] <= value[1], 'depth range is 2d array', env.commandStr);
              return value;
            }, function (env, scope, value) {
              check$1.optional(function () {
                env.assert(scope, env.shared.isArrayLike + '(' + value + ')&&' + value + '.length===2&&' + 'typeof ' + value + '[0]==="number"&&' + 'typeof ' + value + '[1]==="number"&&' + value + '[0]<=' + value + '[1]', 'depth range must be a 2d array');
              });

              var Z_NEAR = scope.def('+', value, '[0]');
              var Z_FAR = scope.def('+', value, '[1]');
              return [Z_NEAR, Z_FAR];
            });

          case S_BLEND_FUNC:
            return parseParam(function (value) {
              check$1.commandType(value, 'object', 'blend.func', env.commandStr);
              var srcRGB = 'srcRGB' in value ? value.srcRGB : value.src;
              var srcAlpha = 'srcAlpha' in value ? value.srcAlpha : value.src;
              var dstRGB = 'dstRGB' in value ? value.dstRGB : value.dst;
              var dstAlpha = 'dstAlpha' in value ? value.dstAlpha : value.dst;
              check$1.commandParameter(srcRGB, blendFuncs, param + '.srcRGB', env.commandStr);
              check$1.commandParameter(srcAlpha, blendFuncs, param + '.srcAlpha', env.commandStr);
              check$1.commandParameter(dstRGB, blendFuncs, param + '.dstRGB', env.commandStr);
              check$1.commandParameter(dstAlpha, blendFuncs, param + '.dstAlpha', env.commandStr);

              check$1.command(invalidBlendCombinations.indexOf(srcRGB + ', ' + dstRGB) === -1, 'unallowed blending combination (srcRGB, dstRGB) = (' + srcRGB + ', ' + dstRGB + ')', env.commandStr);

              return [blendFuncs[srcRGB], blendFuncs[dstRGB], blendFuncs[srcAlpha], blendFuncs[dstAlpha]];
            }, function (env, scope, value) {
              var BLEND_FUNCS = env.constants.blendFuncs;

              check$1.optional(function () {
                env.assert(scope, value + '&&typeof ' + value + '==="object"', 'invalid blend func, must be an object');
              });

              function read(prefix, suffix) {
                var func = scope.def('"', prefix, suffix, '" in ', value, '?', value, '.', prefix, suffix, ':', value, '.', prefix);

                check$1.optional(function () {
                  env.assert(scope, func + ' in ' + BLEND_FUNCS, 'invalid ' + prop + '.' + prefix + suffix + ', must be one of ' + Object.keys(blendFuncs));
                });

                return func;
              }

              var srcRGB = read('src', 'RGB');
              var dstRGB = read('dst', 'RGB');

              check$1.optional(function () {
                var INVALID_BLEND_COMBINATIONS = env.constants.invalidBlendCombinations;

                env.assert(scope, INVALID_BLEND_COMBINATIONS + '.indexOf(' + srcRGB + '+", "+' + dstRGB + ') === -1 ', 'unallowed blending combination for (srcRGB, dstRGB)');
              });

              var SRC_RGB = scope.def(BLEND_FUNCS, '[', srcRGB, ']');
              var SRC_ALPHA = scope.def(BLEND_FUNCS, '[', read('src', 'Alpha'), ']');
              var DST_RGB = scope.def(BLEND_FUNCS, '[', dstRGB, ']');
              var DST_ALPHA = scope.def(BLEND_FUNCS, '[', read('dst', 'Alpha'), ']');

              return [SRC_RGB, DST_RGB, SRC_ALPHA, DST_ALPHA];
            });

          case S_BLEND_EQUATION:
            return parseParam(function (value) {
              if (typeof value === 'string') {
                check$1.commandParameter(value, blendEquations, 'invalid ' + prop, env.commandStr);
                return [blendEquations[value], blendEquations[value]];
              } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
                check$1.commandParameter(value.rgb, blendEquations, prop + '.rgb', env.commandStr);
                check$1.commandParameter(value.alpha, blendEquations, prop + '.alpha', env.commandStr);
                return [blendEquations[value.rgb], blendEquations[value.alpha]];
              } else {
                check$1.commandRaise('invalid blend.equation', env.commandStr);
              }
            }, function (env, scope, value) {
              var BLEND_EQUATIONS = env.constants.blendEquations;

              var RGB = scope.def();
              var ALPHA = scope.def();

              var ifte = env.cond('typeof ', value, '==="string"');

              check$1.optional(function () {
                function checkProp(block, name, value) {
                  env.assert(block, value + ' in ' + BLEND_EQUATIONS, 'invalid ' + name + ', must be one of ' + Object.keys(blendEquations));
                }
                checkProp(ifte.then, prop, value);

                env.assert(ifte.else, value + '&&typeof ' + value + '==="object"', 'invalid ' + prop);
                checkProp(ifte.else, prop + '.rgb', value + '.rgb');
                checkProp(ifte.else, prop + '.alpha', value + '.alpha');
              });

              ifte.then(RGB, '=', ALPHA, '=', BLEND_EQUATIONS, '[', value, '];');
              ifte.else(RGB, '=', BLEND_EQUATIONS, '[', value, '.rgb];', ALPHA, '=', BLEND_EQUATIONS, '[', value, '.alpha];');

              scope(ifte);

              return [RGB, ALPHA];
            });

          case S_BLEND_COLOR:
            return parseParam(function (value) {
              check$1.command(isArrayLike(value) && value.length === 4, 'blend.color must be a 4d array', env.commandStr);
              return loop(4, function (i) {
                return +value[i];
              });
            }, function (env, scope, value) {
              check$1.optional(function () {
                env.assert(scope, env.shared.isArrayLike + '(' + value + ')&&' + value + '.length===4', 'blend.color must be a 4d array');
              });
              return loop(4, function (i) {
                return scope.def('+', value, '[', i, ']');
              });
            });

          case S_STENCIL_MASK:
            return parseParam(function (value) {
              check$1.commandType(value, 'number', param, env.commandStr);
              return value | 0;
            }, function (env, scope, value) {
              check$1.optional(function () {
                env.assert(scope, 'typeof ' + value + '==="number"', 'invalid stencil.mask');
              });
              return scope.def(value, '|0');
            });

          case S_STENCIL_FUNC:
            return parseParam(function (value) {
              check$1.commandType(value, 'object', param, env.commandStr);
              var cmp = value.cmp || 'keep';
              var ref = value.ref || 0;
              var mask = 'mask' in value ? value.mask : -1;
              check$1.commandParameter(cmp, compareFuncs, prop + '.cmp', env.commandStr);
              check$1.commandType(ref, 'number', prop + '.ref', env.commandStr);
              check$1.commandType(mask, 'number', prop + '.mask', env.commandStr);
              return [compareFuncs[cmp], ref, mask];
            }, function (env, scope, value) {
              var COMPARE_FUNCS = env.constants.compareFuncs;
              check$1.optional(function () {
                function assert() {
                  env.assert(scope, Array.prototype.join.call(arguments, ''), 'invalid stencil.func');
                }
                assert(value + '&&typeof ', value, '==="object"');
                assert('!("cmp" in ', value, ')||(', value, '.cmp in ', COMPARE_FUNCS, ')');
              });
              var cmp = scope.def('"cmp" in ', value, '?', COMPARE_FUNCS, '[', value, '.cmp]', ':', GL_KEEP);
              var ref = scope.def(value, '.ref|0');
              var mask = scope.def('"mask" in ', value, '?', value, '.mask|0:-1');
              return [cmp, ref, mask];
            });

          case S_STENCIL_OPFRONT:
          case S_STENCIL_OPBACK:
            return parseParam(function (value) {
              check$1.commandType(value, 'object', param, env.commandStr);
              var fail = value.fail || 'keep';
              var zfail = value.zfail || 'keep';
              var zpass = value.zpass || 'keep';
              check$1.commandParameter(fail, stencilOps, prop + '.fail', env.commandStr);
              check$1.commandParameter(zfail, stencilOps, prop + '.zfail', env.commandStr);
              check$1.commandParameter(zpass, stencilOps, prop + '.zpass', env.commandStr);
              return [prop === S_STENCIL_OPBACK ? GL_BACK : GL_FRONT, stencilOps[fail], stencilOps[zfail], stencilOps[zpass]];
            }, function (env, scope, value) {
              var STENCIL_OPS = env.constants.stencilOps;

              check$1.optional(function () {
                env.assert(scope, value + '&&typeof ' + value + '==="object"', 'invalid ' + prop);
              });

              function read(name) {
                check$1.optional(function () {
                  env.assert(scope, '!("' + name + '" in ' + value + ')||' + '(' + value + '.' + name + ' in ' + STENCIL_OPS + ')', 'invalid ' + prop + '.' + name + ', must be one of ' + Object.keys(stencilOps));
                });

                return scope.def('"', name, '" in ', value, '?', STENCIL_OPS, '[', value, '.', name, ']:', GL_KEEP);
              }

              return [prop === S_STENCIL_OPBACK ? GL_BACK : GL_FRONT, read('fail'), read('zfail'), read('zpass')];
            });

          case S_POLYGON_OFFSET_OFFSET:
            return parseParam(function (value) {
              check$1.commandType(value, 'object', param, env.commandStr);
              var factor = value.factor | 0;
              var units = value.units | 0;
              check$1.commandType(factor, 'number', param + '.factor', env.commandStr);
              check$1.commandType(units, 'number', param + '.units', env.commandStr);
              return [factor, units];
            }, function (env, scope, value) {
              check$1.optional(function () {
                env.assert(scope, value + '&&typeof ' + value + '==="object"', 'invalid ' + prop);
              });

              var FACTOR = scope.def(value, '.factor|0');
              var UNITS = scope.def(value, '.units|0');

              return [FACTOR, UNITS];
            });

          case S_CULL_FACE:
            return parseParam(function (value) {
              var face = 0;
              if (value === 'front') {
                face = GL_FRONT;
              } else if (value === 'back') {
                face = GL_BACK;
              }
              check$1.command(!!face, param, env.commandStr);
              return face;
            }, function (env, scope, value) {
              check$1.optional(function () {
                env.assert(scope, value + '==="front"||' + value + '==="back"', 'invalid cull.face');
              });
              return scope.def(value, '==="front"?', GL_FRONT, ':', GL_BACK);
            });

          case S_LINE_WIDTH:
            return parseParam(function (value) {
              check$1.command(typeof value === 'number' && value >= limits.lineWidthDims[0] && value <= limits.lineWidthDims[1], 'invalid line width, must positive number between ' + limits.lineWidthDims[0] + ' and ' + limits.lineWidthDims[1], env.commandStr);
              return value;
            }, function (env, scope, value) {
              check$1.optional(function () {
                env.assert(scope, 'typeof ' + value + '==="number"&&' + value + '>=' + limits.lineWidthDims[0] + '&&' + value + '<=' + limits.lineWidthDims[1], 'invalid line width');
              });

              return value;
            });

          case S_FRONT_FACE:
            return parseParam(function (value) {
              check$1.commandParameter(value, orientationType, param, env.commandStr);
              return orientationType[value];
            }, function (env, scope, value) {
              check$1.optional(function () {
                env.assert(scope, value + '==="cw"||' + value + '==="ccw"', 'invalid frontFace, must be one of cw,ccw');
              });
              return scope.def(value + '==="cw"?' + GL_CW + ':' + GL_CCW);
            });

          case S_COLOR_MASK:
            return parseParam(function (value) {
              check$1.command(isArrayLike(value) && value.length === 4, 'color.mask must be length 4 array', env.commandStr);
              return value.map(function (v) {
                return !!v;
              });
            }, function (env, scope, value) {
              check$1.optional(function () {
                env.assert(scope, env.shared.isArrayLike + '(' + value + ')&&' + value + '.length===4', 'invalid color.mask');
              });
              return loop(4, function (i) {
                return '!!' + value + '[' + i + ']';
              });
            });

          case S_SAMPLE_COVERAGE:
            return parseParam(function (value) {
              check$1.command((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value, param, env.commandStr);
              var sampleValue = 'value' in value ? value.value : 1;
              var sampleInvert = !!value.invert;
              check$1.command(typeof sampleValue === 'number' && sampleValue >= 0 && sampleValue <= 1, 'sample.coverage.value must be a number between 0 and 1', env.commandStr);
              return [sampleValue, sampleInvert];
            }, function (env, scope, value) {
              check$1.optional(function () {
                env.assert(scope, value + '&&typeof ' + value + '==="object"', 'invalid sample.coverage');
              });
              var VALUE = scope.def('"value" in ', value, '?+', value, '.value:1');
              var INVERT = scope.def('!!', value, '.invert');
              return [VALUE, INVERT];
            });
        }
      });

      return STATE;
    }

    function parseUniforms(uniforms, env) {
      var staticUniforms = uniforms.static;
      var dynamicUniforms = uniforms.dynamic;

      var UNIFORMS = {};

      Object.keys(staticUniforms).forEach(function (name) {
        var value = staticUniforms[name];
        var result;
        if (typeof value === 'number' || typeof value === 'boolean') {
          result = createStaticDecl(function () {
            return value;
          });
        } else if (typeof value === 'function') {
          var reglType = value._reglType;
          if (reglType === 'texture2d' || reglType === 'textureCube') {
            result = createStaticDecl(function (env) {
              return env.link(value);
            });
          } else if (reglType === 'framebuffer' || reglType === 'framebufferCube') {
            check$1.command(value.color.length > 0, 'missing color attachment for framebuffer sent to uniform "' + name + '"', env.commandStr);
            result = createStaticDecl(function (env) {
              return env.link(value.color[0]);
            });
          } else {
            check$1.commandRaise('invalid data for uniform "' + name + '"', env.commandStr);
          }
        } else if (isArrayLike(value)) {
          result = createStaticDecl(function (env) {
            var ITEM = env.global.def('[', loop(value.length, function (i) {
              check$1.command(typeof value[i] === 'number' || typeof value[i] === 'boolean', 'invalid uniform ' + name, env.commandStr);
              return value[i];
            }), ']');
            return ITEM;
          });
        } else {
          check$1.commandRaise('invalid or missing data for uniform "' + name + '"', env.commandStr);
        }
        result.value = value;
        UNIFORMS[name] = result;
      });

      Object.keys(dynamicUniforms).forEach(function (key) {
        var dyn = dynamicUniforms[key];
        UNIFORMS[key] = createDynamicDecl(dyn, function (env, scope) {
          return env.invoke(scope, dyn);
        });
      });

      return UNIFORMS;
    }

    function parseAttributes(attributes, env) {
      var staticAttributes = attributes.static;
      var dynamicAttributes = attributes.dynamic;

      var attributeDefs = {};

      Object.keys(staticAttributes).forEach(function (attribute) {
        var value = staticAttributes[attribute];
        var id = stringStore.id(attribute);

        var record = new AttributeRecord();
        if (isBufferArgs(value)) {
          record.state = ATTRIB_STATE_POINTER;
          record.buffer = bufferState.getBuffer(bufferState.create(value, GL_ARRAY_BUFFER$1, false, true));
          record.type = 0;
        } else {
          var buffer = bufferState.getBuffer(value);
          if (buffer) {
            record.state = ATTRIB_STATE_POINTER;
            record.buffer = buffer;
            record.type = 0;
          } else {
            check$1.command((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value, 'invalid data for attribute ' + attribute, env.commandStr);
            if (value.constant) {
              var constant = value.constant;
              record.buffer = 'null';
              record.state = ATTRIB_STATE_CONSTANT;
              if (typeof constant === 'number') {
                record.x = constant;
              } else {
                check$1.command(isArrayLike(constant) && constant.length > 0 && constant.length <= 4, 'invalid constant for attribute ' + attribute, env.commandStr);
                CUTE_COMPONENTS.forEach(function (c, i) {
                  if (i < constant.length) {
                    record[c] = constant[i];
                  }
                });
              }
            } else {
              if (isBufferArgs(value.buffer)) {
                buffer = bufferState.getBuffer(bufferState.create(value.buffer, GL_ARRAY_BUFFER$1, false, true));
              } else {
                buffer = bufferState.getBuffer(value.buffer);
              }
              check$1.command(!!buffer, 'missing buffer for attribute "' + attribute + '"', env.commandStr);

              var offset = value.offset | 0;
              check$1.command(offset >= 0, 'invalid offset for attribute "' + attribute + '"', env.commandStr);

              var stride = value.stride | 0;
              check$1.command(stride >= 0 && stride < 256, 'invalid stride for attribute "' + attribute + '", must be integer betweeen [0, 255]', env.commandStr);

              var size = value.size | 0;
              check$1.command(!('size' in value) || size > 0 && size <= 4, 'invalid size for attribute "' + attribute + '", must be 1,2,3,4', env.commandStr);

              var normalized = !!value.normalized;

              var type = 0;
              if ('type' in value) {
                check$1.commandParameter(value.type, glTypes, 'invalid type for attribute ' + attribute, env.commandStr);
                type = glTypes[value.type];
              }

              var divisor = value.divisor | 0;
              if ('divisor' in value) {
                check$1.command(divisor === 0 || extInstancing, 'cannot specify divisor for attribute "' + attribute + '", instancing not supported', env.commandStr);
                check$1.command(divisor >= 0, 'invalid divisor for attribute "' + attribute + '"', env.commandStr);
              }

              check$1.optional(function () {
                var command = env.commandStr;

                var VALID_KEYS = ['buffer', 'offset', 'divisor', 'normalized', 'type', 'size', 'stride'];

                Object.keys(value).forEach(function (prop) {
                  check$1.command(VALID_KEYS.indexOf(prop) >= 0, 'unknown parameter "' + prop + '" for attribute pointer "' + attribute + '" (valid parameters are ' + VALID_KEYS + ')', command);
                });
              });

              record.buffer = buffer;
              record.state = ATTRIB_STATE_POINTER;
              record.size = size;
              record.normalized = normalized;
              record.type = type || buffer.dtype;
              record.offset = offset;
              record.stride = stride;
              record.divisor = divisor;
            }
          }
        }

        attributeDefs[attribute] = createStaticDecl(function (env, scope) {
          var cache = env.attribCache;
          if (id in cache) {
            return cache[id];
          }
          var result = {
            isStream: false
          };
          Object.keys(record).forEach(function (key) {
            result[key] = record[key];
          });
          if (record.buffer) {
            result.buffer = env.link(record.buffer);
            result.type = result.type || result.buffer + '.dtype';
          }
          cache[id] = result;
          return result;
        });
      });

      Object.keys(dynamicAttributes).forEach(function (attribute) {
        var dyn = dynamicAttributes[attribute];

        function appendAttributeCode(env, block) {
          var VALUE = env.invoke(block, dyn);

          var shared = env.shared;

          var IS_BUFFER_ARGS = shared.isBufferArgs;
          var BUFFER_STATE = shared.buffer;

          // Perform validation on attribute
          check$1.optional(function () {
            env.assert(block, VALUE + '&&(typeof ' + VALUE + '==="object"||typeof ' + VALUE + '==="function")&&(' + IS_BUFFER_ARGS + '(' + VALUE + ')||' + BUFFER_STATE + '.getBuffer(' + VALUE + ')||' + BUFFER_STATE + '.getBuffer(' + VALUE + '.buffer)||' + IS_BUFFER_ARGS + '(' + VALUE + '.buffer)||' + '("constant" in ' + VALUE + '&&(typeof ' + VALUE + '.constant==="number"||' + shared.isArrayLike + '(' + VALUE + '.constant))))', 'invalid dynamic attribute "' + attribute + '"');
          });

          // allocate names for result
          var result = {
            isStream: block.def(false)
          };
          var defaultRecord = new AttributeRecord();
          defaultRecord.state = ATTRIB_STATE_POINTER;
          Object.keys(defaultRecord).forEach(function (key) {
            result[key] = block.def('' + defaultRecord[key]);
          });

          var BUFFER = result.buffer;
          var TYPE = result.type;
          block('if(', IS_BUFFER_ARGS, '(', VALUE, ')){', result.isStream, '=true;', BUFFER, '=', BUFFER_STATE, '.createStream(', GL_ARRAY_BUFFER$1, ',', VALUE, ');', TYPE, '=', BUFFER, '.dtype;', '}else{', BUFFER, '=', BUFFER_STATE, '.getBuffer(', VALUE, ');', 'if(', BUFFER, '){', TYPE, '=', BUFFER, '.dtype;', '}else if("constant" in ', VALUE, '){', result.state, '=', ATTRIB_STATE_CONSTANT, ';', 'if(typeof ' + VALUE + '.constant === "number"){', result[CUTE_COMPONENTS[0]], '=', VALUE, '.constant;', CUTE_COMPONENTS.slice(1).map(function (n) {
            return result[n];
          }).join('='), '=0;', '}else{', CUTE_COMPONENTS.map(function (name, i) {
            return result[name] + '=' + VALUE + '.constant.length>=' + i + '?' + VALUE + '.constant[' + i + ']:0;';
          }).join(''), '}}else{', 'if(', IS_BUFFER_ARGS, '(', VALUE, '.buffer)){', BUFFER, '=', BUFFER_STATE, '.createStream(', GL_ARRAY_BUFFER$1, ',', VALUE, '.buffer);', '}else{', BUFFER, '=', BUFFER_STATE, '.getBuffer(', VALUE, '.buffer);', '}', TYPE, '="type" in ', VALUE, '?', shared.glTypes, '[', VALUE, '.type]:', BUFFER, '.dtype;', result.normalized, '=!!', VALUE, '.normalized;');
          function emitReadRecord(name) {
            block(result[name], '=', VALUE, '.', name, '|0;');
          }
          emitReadRecord('size');
          emitReadRecord('offset');
          emitReadRecord('stride');
          emitReadRecord('divisor');

          block('}}');

          block.exit('if(', result.isStream, '){', BUFFER_STATE, '.destroyStream(', BUFFER, ');', '}');

          return result;
        }

        attributeDefs[attribute] = createDynamicDecl(dyn, appendAttributeCode);
      });

      return attributeDefs;
    }

    function parseContext(context) {
      var staticContext = context.static;
      var dynamicContext = context.dynamic;
      var result = {};

      Object.keys(staticContext).forEach(function (name) {
        var value = staticContext[name];
        result[name] = createStaticDecl(function (env, scope) {
          if (typeof value === 'number' || typeof value === 'boolean') {
            return '' + value;
          } else {
            return env.link(value);
          }
        });
      });

      Object.keys(dynamicContext).forEach(function (name) {
        var dyn = dynamicContext[name];
        result[name] = createDynamicDecl(dyn, function (env, scope) {
          return env.invoke(scope, dyn);
        });
      });

      return result;
    }

    function parseArguments(options, attributes, uniforms, context, env) {
      var staticOptions = options.static;
      var dynamicOptions = options.dynamic;

      check$1.optional(function () {
        var KEY_NAMES = [S_FRAMEBUFFER, S_VERT, S_FRAG, S_ELEMENTS, S_PRIMITIVE, S_OFFSET, S_COUNT, S_INSTANCES, S_PROFILE].concat(GL_STATE_NAMES);

        function checkKeys(dict) {
          Object.keys(dict).forEach(function (key) {
            check$1.command(KEY_NAMES.indexOf(key) >= 0, 'unknown parameter "' + key + '"', env.commandStr);
          });
        }

        checkKeys(staticOptions);
        checkKeys(dynamicOptions);
      });

      var framebuffer = parseFramebuffer(options, env);
      var viewportAndScissor = parseViewportScissor(options, framebuffer, env);
      var draw = parseDraw(options, env);
      var state = parseGLState(options, env);
      var shader = parseProgram(options, env);

      function copyBox(name) {
        var defn = viewportAndScissor[name];
        if (defn) {
          state[name] = defn;
        }
      }
      copyBox(S_VIEWPORT);
      copyBox(propName(S_SCISSOR_BOX));

      var dirty = Object.keys(state).length > 0;

      var result = {
        framebuffer: framebuffer,
        draw: draw,
        shader: shader,
        state: state,
        dirty: dirty
      };

      result.profile = parseProfile(options, env);
      result.uniforms = parseUniforms(uniforms, env);
      result.attributes = parseAttributes(attributes, env);
      result.context = parseContext(context, env);

      // create VAO if given and supported
      if (Object.keys(result.attributes).length) {
        if (vaoState.hasSupport) {
          result.vao = vaoState.create();
        }
      }
      return result;
    }

    // ===================================================
    // ===================================================
    // COMMON UPDATE FUNCTIONS
    // ===================================================
    // ===================================================
    function emitContext(env, scope, context) {
      var shared = env.shared;
      var CONTEXT = shared.context;

      var contextEnter = env.scope();

      Object.keys(context).forEach(function (name) {
        scope.save(CONTEXT, '.' + name);
        var defn = context[name];
        contextEnter(CONTEXT, '.', name, '=', defn.append(env, scope), ';');
      });

      scope(contextEnter);
    }

    // ===================================================
    // ===================================================
    // COMMON DRAWING FUNCTIONS
    // ===================================================
    // ===================================================
    function emitPollFramebuffer(env, scope, framebuffer, skipCheck) {
      var shared = env.shared;

      var GL = shared.gl;
      var FRAMEBUFFER_STATE = shared.framebuffer;
      var EXT_DRAW_BUFFERS;
      if (extDrawBuffers) {
        EXT_DRAW_BUFFERS = scope.def(shared.extensions, '.webgl_draw_buffers');
      }

      var constants = env.constants;

      var DRAW_BUFFERS = constants.drawBuffer;
      var BACK_BUFFER = constants.backBuffer;

      var NEXT;
      if (framebuffer) {
        NEXT = framebuffer.append(env, scope);
      } else {
        NEXT = scope.def(FRAMEBUFFER_STATE, '.next');
      }

      if (!skipCheck) {
        scope('if(', NEXT, '!==', FRAMEBUFFER_STATE, '.cur){');
      }
      scope('if(', NEXT, '){', GL, '.bindFramebuffer(', GL_FRAMEBUFFER$1, ',', NEXT, '.framebuffer);');
      if (extDrawBuffers) {
        scope(EXT_DRAW_BUFFERS, '.drawBuffersWEBGL(', DRAW_BUFFERS, '[', NEXT, '.colorAttachments.length]);');
      }
      scope('}else{', GL, '.bindFramebuffer(', GL_FRAMEBUFFER$1, ',null);');
      if (extDrawBuffers) {
        scope(EXT_DRAW_BUFFERS, '.drawBuffersWEBGL(', BACK_BUFFER, ');');
      }
      scope('}', FRAMEBUFFER_STATE, '.cur=', NEXT, ';');
      if (!skipCheck) {
        scope('}');
      }
    }

    function emitPollState(env, scope, args) {
      var shared = env.shared;

      var GL = shared.gl;

      var CURRENT_VARS = env.current;
      var NEXT_VARS = env.next;
      var CURRENT_STATE = shared.current;
      var NEXT_STATE = shared.next;

      var block = env.cond(CURRENT_STATE, '.dirty');

      GL_STATE_NAMES.forEach(function (prop) {
        var param = propName(prop);
        if (param in args.state) {
          return;
        }

        var NEXT, CURRENT;
        if (param in NEXT_VARS) {
          NEXT = NEXT_VARS[param];
          CURRENT = CURRENT_VARS[param];
          var parts = loop(currentState[param].length, function (i) {
            return block.def(NEXT, '[', i, ']');
          });
          block(env.cond(parts.map(function (p, i) {
            return p + '!==' + CURRENT + '[' + i + ']';
          }).join('||')).then(GL, '.', GL_VARIABLES[param], '(', parts, ');', parts.map(function (p, i) {
            return CURRENT + '[' + i + ']=' + p;
          }).join(';'), ';'));
        } else {
          NEXT = block.def(NEXT_STATE, '.', param);
          var ifte = env.cond(NEXT, '!==', CURRENT_STATE, '.', param);
          block(ifte);
          if (param in GL_FLAGS) {
            ifte(env.cond(NEXT).then(GL, '.enable(', GL_FLAGS[param], ');').else(GL, '.disable(', GL_FLAGS[param], ');'), CURRENT_STATE, '.', param, '=', NEXT, ';');
          } else {
            ifte(GL, '.', GL_VARIABLES[param], '(', NEXT, ');', CURRENT_STATE, '.', param, '=', NEXT, ';');
          }
        }
      });
      if (Object.keys(args.state).length === 0) {
        block(CURRENT_STATE, '.dirty=false;');
      }
      scope(block);
    }

    function emitSetOptions(env, scope, options, filter) {
      var shared = env.shared;
      var CURRENT_VARS = env.current;
      var CURRENT_STATE = shared.current;
      var GL = shared.gl;
      sortState(Object.keys(options)).forEach(function (param) {
        var defn = options[param];
        if (filter && !filter(defn)) {
          return;
        }
        var variable = defn.append(env, scope);
        if (GL_FLAGS[param]) {
          var flag = GL_FLAGS[param];
          if (isStatic(defn)) {
            if (variable) {
              scope(GL, '.enable(', flag, ');');
            } else {
              scope(GL, '.disable(', flag, ');');
            }
          } else {
            scope(env.cond(variable).then(GL, '.enable(', flag, ');').else(GL, '.disable(', flag, ');'));
          }
          scope(CURRENT_STATE, '.', param, '=', variable, ';');
        } else if (isArrayLike(variable)) {
          var CURRENT = CURRENT_VARS[param];
          scope(GL, '.', GL_VARIABLES[param], '(', variable, ');', variable.map(function (v, i) {
            return CURRENT + '[' + i + ']=' + v;
          }).join(';'), ';');
        } else {
          scope(GL, '.', GL_VARIABLES[param], '(', variable, ');', CURRENT_STATE, '.', param, '=', variable, ';');
        }
      });
    }

    function injectExtensions(env, scope) {
      if (extInstancing) {
        env.instancing = scope.def(env.shared.extensions, '.angle_instanced_arrays');
      }
    }

    function emitProfile(env, scope, args, useScope, incrementCounter) {
      var shared = env.shared;
      var STATS = env.stats;
      var CURRENT_STATE = shared.current;
      var TIMER = shared.timer;
      var profileArg = args.profile;

      function perfCounter() {
        if (typeof performance === 'undefined') {
          return 'Date.now()';
        } else {
          return 'performance.now()';
        }
      }

      var CPU_START, QUERY_COUNTER;
      function emitProfileStart(block) {
        CPU_START = scope.def();
        block(CPU_START, '=', perfCounter(), ';');
        if (typeof incrementCounter === 'string') {
          block(STATS, '.count+=', incrementCounter, ';');
        } else {
          block(STATS, '.count++;');
        }
        if (timer) {
          if (useScope) {
            QUERY_COUNTER = scope.def();
            block(QUERY_COUNTER, '=', TIMER, '.getNumPendingQueries();');
          } else {
            block(TIMER, '.beginQuery(', STATS, ');');
          }
        }
      }

      function emitProfileEnd(block) {
        block(STATS, '.cpuTime+=', perfCounter(), '-', CPU_START, ';');
        if (timer) {
          if (useScope) {
            block(TIMER, '.pushScopeStats(', QUERY_COUNTER, ',', TIMER, '.getNumPendingQueries(),', STATS, ');');
          } else {
            block(TIMER, '.endQuery();');
          }
        }
      }

      function scopeProfile(value) {
        var prev = scope.def(CURRENT_STATE, '.profile');
        scope(CURRENT_STATE, '.profile=', value, ';');
        scope.exit(CURRENT_STATE, '.profile=', prev, ';');
      }

      var USE_PROFILE;
      if (profileArg) {
        if (isStatic(profileArg)) {
          if (profileArg.enable) {
            emitProfileStart(scope);
            emitProfileEnd(scope.exit);
            scopeProfile('true');
          } else {
            scopeProfile('false');
          }
          return;
        }
        USE_PROFILE = profileArg.append(env, scope);
        scopeProfile(USE_PROFILE);
      } else {
        USE_PROFILE = scope.def(CURRENT_STATE, '.profile');
      }

      var start = env.block();
      emitProfileStart(start);
      scope('if(', USE_PROFILE, '){', start, '}');
      var end = env.block();
      emitProfileEnd(end);
      scope.exit('if(', USE_PROFILE, '){', end, '}');
    }

    function emitAttributes(env, scope, args, attributes, filter) {
      var shared = env.shared;
      var VAO = attributes.length && vaoState.hasSupport ? env.link(args.vao) : null;

      function typeLength(x) {
        switch (x) {
          case GL_FLOAT_VEC2:
          case GL_INT_VEC2:
          case GL_BOOL_VEC2:
            return 2;
          case GL_FLOAT_VEC3:
          case GL_INT_VEC3:
          case GL_BOOL_VEC3:
            return 3;
          case GL_FLOAT_VEC4:
          case GL_INT_VEC4:
          case GL_BOOL_VEC4:
            return 4;
          default:
            return 1;
        }
      }

      function emitBindAttribute(ATTRIBUTE, size, record) {
        var GL = shared.gl;

        var LOCATION = scope.def(ATTRIBUTE, '.location');
        var BINDING = scope.def(shared.attributes, '[', LOCATION, ']');

        var STATE = record.state;
        var BUFFER = record.buffer;
        var CONST_COMPONENTS = [record.x, record.y, record.z, record.w];

        var COMMON_KEYS = ['buffer', 'normalized', 'offset', 'stride'];

        function emitBuffer() {
          scope('if(!', BINDING, '.buffer){', GL, '.enableVertexAttribArray(', LOCATION, ');}');

          var TYPE = record.type;
          var SIZE;
          if (!record.size) {
            SIZE = size;
          } else {
            SIZE = scope.def(record.size, '||', size);
          }

          scope('if(', BINDING, '.type!==', TYPE, '||', BINDING, '.size!==', SIZE, '||', COMMON_KEYS.map(function (key) {
            return BINDING + '.' + key + '!==' + record[key];
          }).join('||'), '){', GL, '.bindBuffer(', GL_ARRAY_BUFFER$1, ',', BUFFER, '.buffer);', GL, '.vertexAttribPointer(', [LOCATION, SIZE, TYPE, record.normalized, record.stride, record.offset], ');', BINDING, '.type=', TYPE, ';', BINDING, '.size=', SIZE, ';', COMMON_KEYS.map(function (key) {
            return BINDING + '.' + key + '=' + record[key] + ';';
          }).join(''), '}');

          if (extInstancing) {
            var DIVISOR = record.divisor;
            scope('if(', BINDING, '.divisor!==', DIVISOR, '){', env.instancing, '.vertexAttribDivisorANGLE(', [LOCATION, DIVISOR], ');', BINDING, '.divisor=', DIVISOR, ';}');
          }
        }

        function emitConstant() {
          scope('if(', BINDING, '.buffer){', GL, '.disableVertexAttribArray(', LOCATION, ');', '}if(', CUTE_COMPONENTS.map(function (c, i) {
            return BINDING + '.' + c + '!==' + CONST_COMPONENTS[i];
          }).join('||'), '){', GL, '.vertexAttrib4f(', LOCATION, ',', CONST_COMPONENTS, ');', CUTE_COMPONENTS.map(function (c, i) {
            return BINDING + '.' + c + '=' + CONST_COMPONENTS[i] + ';';
          }).join(''), '}');
        }

        if (STATE === ATTRIB_STATE_POINTER) {
          emitBuffer();
        } else if (STATE === ATTRIB_STATE_CONSTANT) {
          emitConstant();
        } else {
          scope('if(', STATE, '===', ATTRIB_STATE_POINTER, '){');
          emitBuffer();
          scope('}else{');
          emitConstant();
          scope('}');
        }
      }

      if (VAO) {
        scope('if(', VAO, '){', VAO, '.bind(); }');
      }

      attributes.forEach(function (attribute) {
        var name = attribute.name;
        var arg = args.attributes[name];
        var record;
        if (arg) {
          if (!filter(arg)) {
            return;
          }
          record = arg.append(env, scope);
        } else {
          if (!filter(SCOPE_DECL)) {
            return;
          }
          var scopeAttrib = env.scopeAttrib(name);
          check$1.optional(function () {
            env.assert(scope, scopeAttrib + '.state', 'missing attribute ' + name);
          });
          record = {};
          Object.keys(new AttributeRecord()).forEach(function (key) {
            record[key] = scope.def(scopeAttrib, '.', key);
          });
        }
        emitBindAttribute(env.link(attribute), typeLength(attribute.info.type), record);
      });
    }

    function emitUniforms(env, scope, args, uniforms, filter) {
      var shared = env.shared;
      var GL = shared.gl;

      var infix;
      for (var i = 0; i < uniforms.length; ++i) {
        var uniform = uniforms[i];
        var name = uniform.name;
        var type = uniform.info.type;
        var arg = args.uniforms[name];
        var UNIFORM = env.link(uniform);
        var LOCATION = UNIFORM + '.location';

        var VALUE;
        if (arg) {
          if (!filter(arg)) {
            continue;
          }
          if (isStatic(arg)) {
            var value = arg.value;
            check$1.command(value !== null && typeof value !== 'undefined', 'missing uniform "' + name + '"', env.commandStr);
            if (type === GL_SAMPLER_2D || type === GL_SAMPLER_CUBE) {
              check$1.command(typeof value === 'function' && (type === GL_SAMPLER_2D && (value._reglType === 'texture2d' || value._reglType === 'framebuffer') || type === GL_SAMPLER_CUBE && (value._reglType === 'textureCube' || value._reglType === 'framebufferCube')), 'invalid texture for uniform ' + name, env.commandStr);
              var TEX_VALUE = env.link(value._texture || value.color[0]._texture);
              scope(GL, '.uniform1i(', LOCATION, ',', TEX_VALUE + '.bind());');
              scope.exit(TEX_VALUE, '.unbind();');
            } else if (type === GL_FLOAT_MAT2 || type === GL_FLOAT_MAT3 || type === GL_FLOAT_MAT4) {
              check$1.optional(function () {
                check$1.command(isArrayLike(value), 'invalid matrix for uniform ' + name, env.commandStr);
                check$1.command(type === GL_FLOAT_MAT2 && value.length === 4 || type === GL_FLOAT_MAT3 && value.length === 9 || type === GL_FLOAT_MAT4 && value.length === 16, 'invalid length for matrix uniform ' + name, env.commandStr);
              });
              var MAT_VALUE = env.global.def('new Float32Array([' + Array.prototype.slice.call(value) + '])');
              var dim = 2;
              if (type === GL_FLOAT_MAT3) {
                dim = 3;
              } else if (type === GL_FLOAT_MAT4) {
                dim = 4;
              }
              scope(GL, '.uniformMatrix', dim, 'fv(', LOCATION, ',false,', MAT_VALUE, ');');
            } else {
              switch (type) {
                case GL_FLOAT$7:
                  check$1.commandType(value, 'number', 'uniform ' + name, env.commandStr);
                  infix = '1f';
                  break;
                case GL_FLOAT_VEC2:
                  check$1.command(isArrayLike(value) && value.length === 2, 'uniform ' + name, env.commandStr);
                  infix = '2f';
                  break;
                case GL_FLOAT_VEC3:
                  check$1.command(isArrayLike(value) && value.length === 3, 'uniform ' + name, env.commandStr);
                  infix = '3f';
                  break;
                case GL_FLOAT_VEC4:
                  check$1.command(isArrayLike(value) && value.length === 4, 'uniform ' + name, env.commandStr);
                  infix = '4f';
                  break;
                case GL_BOOL:
                  check$1.commandType(value, 'boolean', 'uniform ' + name, env.commandStr);
                  infix = '1i';
                  break;
                case GL_INT$3:
                  check$1.commandType(value, 'number', 'uniform ' + name, env.commandStr);
                  infix = '1i';
                  break;
                case GL_BOOL_VEC2:
                  check$1.command(isArrayLike(value) && value.length === 2, 'uniform ' + name, env.commandStr);
                  infix = '2i';
                  break;
                case GL_INT_VEC2:
                  check$1.command(isArrayLike(value) && value.length === 2, 'uniform ' + name, env.commandStr);
                  infix = '2i';
                  break;
                case GL_BOOL_VEC3:
                  check$1.command(isArrayLike(value) && value.length === 3, 'uniform ' + name, env.commandStr);
                  infix = '3i';
                  break;
                case GL_INT_VEC3:
                  check$1.command(isArrayLike(value) && value.length === 3, 'uniform ' + name, env.commandStr);
                  infix = '3i';
                  break;
                case GL_BOOL_VEC4:
                  check$1.command(isArrayLike(value) && value.length === 4, 'uniform ' + name, env.commandStr);
                  infix = '4i';
                  break;
                case GL_INT_VEC4:
                  check$1.command(isArrayLike(value) && value.length === 4, 'uniform ' + name, env.commandStr);
                  infix = '4i';
                  break;
              }
              scope(GL, '.uniform', infix, '(', LOCATION, ',', isArrayLike(value) ? Array.prototype.slice.call(value) : value, ');');
            }
            continue;
          } else {
            VALUE = arg.append(env, scope);
          }
        } else {
          if (!filter(SCOPE_DECL)) {
            continue;
          }
          VALUE = scope.def(shared.uniforms, '[', stringStore.id(name), ']');
        }

        if (type === GL_SAMPLER_2D) {
          scope('if(', VALUE, '&&', VALUE, '._reglType==="framebuffer"){', VALUE, '=', VALUE, '.color[0];', '}');
        } else if (type === GL_SAMPLER_CUBE) {
          scope('if(', VALUE, '&&', VALUE, '._reglType==="framebufferCube"){', VALUE, '=', VALUE, '.color[0];', '}');
        }

        // perform type validation
        check$1.optional(function () {
          function check(pred, message) {
            env.assert(scope, pred, 'bad data or missing for uniform "' + name + '".  ' + message);
          }

          function checkType(type) {
            check('typeof ' + VALUE + '==="' + type + '"', 'invalid type, expected ' + type);
          }

          function checkVector(n, type) {
            check(shared.isArrayLike + '(' + VALUE + ')&&' + VALUE + '.length===' + n, 'invalid vector, should have length ' + n, env.commandStr);
          }

          function checkTexture(target) {
            check('typeof ' + VALUE + '==="function"&&' + VALUE + '._reglType==="texture' + (target === GL_TEXTURE_2D$2 ? '2d' : 'Cube') + '"', 'invalid texture type', env.commandStr);
          }

          switch (type) {
            case GL_INT$3:
              checkType('number');
              break;
            case GL_INT_VEC2:
              checkVector(2, 'number');
              break;
            case GL_INT_VEC3:
              checkVector(3, 'number');
              break;
            case GL_INT_VEC4:
              checkVector(4, 'number');
              break;
            case GL_FLOAT$7:
              checkType('number');
              break;
            case GL_FLOAT_VEC2:
              checkVector(2, 'number');
              break;
            case GL_FLOAT_VEC3:
              checkVector(3, 'number');
              break;
            case GL_FLOAT_VEC4:
              checkVector(4, 'number');
              break;
            case GL_BOOL:
              checkType('boolean');
              break;
            case GL_BOOL_VEC2:
              checkVector(2, 'boolean');
              break;
            case GL_BOOL_VEC3:
              checkVector(3, 'boolean');
              break;
            case GL_BOOL_VEC4:
              checkVector(4, 'boolean');
              break;
            case GL_FLOAT_MAT2:
              checkVector(4, 'number');
              break;
            case GL_FLOAT_MAT3:
              checkVector(9, 'number');
              break;
            case GL_FLOAT_MAT4:
              checkVector(16, 'number');
              break;
            case GL_SAMPLER_2D:
              checkTexture(GL_TEXTURE_2D$2);
              break;
            case GL_SAMPLER_CUBE:
              checkTexture(GL_TEXTURE_CUBE_MAP$1);
              break;
          }
        });

        var unroll = 1;
        switch (type) {
          case GL_SAMPLER_2D:
          case GL_SAMPLER_CUBE:
            var TEX = scope.def(VALUE, '._texture');
            scope(GL, '.uniform1i(', LOCATION, ',', TEX, '.bind());');
            scope.exit(TEX, '.unbind();');
            continue;

          case GL_INT$3:
          case GL_BOOL:
            infix = '1i';
            break;

          case GL_INT_VEC2:
          case GL_BOOL_VEC2:
            infix = '2i';
            unroll = 2;
            break;

          case GL_INT_VEC3:
          case GL_BOOL_VEC3:
            infix = '3i';
            unroll = 3;
            break;

          case GL_INT_VEC4:
          case GL_BOOL_VEC4:
            infix = '4i';
            unroll = 4;
            break;

          case GL_FLOAT$7:
            infix = '1f';
            break;

          case GL_FLOAT_VEC2:
            infix = '2f';
            unroll = 2;
            break;

          case GL_FLOAT_VEC3:
            infix = '3f';
            unroll = 3;
            break;

          case GL_FLOAT_VEC4:
            infix = '4f';
            unroll = 4;
            break;

          case GL_FLOAT_MAT2:
            infix = 'Matrix2fv';
            break;

          case GL_FLOAT_MAT3:
            infix = 'Matrix3fv';
            break;

          case GL_FLOAT_MAT4:
            infix = 'Matrix4fv';
            break;
        }

        scope(GL, '.uniform', infix, '(', LOCATION, ',');
        if (infix.charAt(0) === 'M') {
          var matSize = Math.pow(type - GL_FLOAT_MAT2 + 2, 2);
          var STORAGE = env.global.def('new Float32Array(', matSize, ')');
          scope('false,(Array.isArray(', VALUE, ')||', VALUE, ' instanceof Float32Array)?', VALUE, ':(', loop(matSize, function (i) {
            return STORAGE + '[' + i + ']=' + VALUE + '[' + i + ']';
          }), ',', STORAGE, ')');
        } else if (unroll > 1) {
          scope(loop(unroll, function (i) {
            return VALUE + '[' + i + ']';
          }));
        } else {
          scope(VALUE);
        }
        scope(');');
      }
    }

    function emitDraw(env, outer, inner, args) {
      var shared = env.shared;
      var GL = shared.gl;
      var DRAW_STATE = shared.draw;

      var drawOptions = args.draw;

      function emitElements() {
        var defn = drawOptions.elements;
        var ELEMENTS;
        var scope = outer;
        if (defn) {
          if (defn.contextDep && args.contextDynamic || defn.propDep) {
            scope = inner;
          }
          ELEMENTS = defn.append(env, scope);
        } else {
          ELEMENTS = scope.def(DRAW_STATE, '.', S_ELEMENTS);
        }
        if (ELEMENTS) {
          scope('if(' + ELEMENTS + ')' + GL + '.bindBuffer(' + GL_ELEMENT_ARRAY_BUFFER$1 + ',' + ELEMENTS + '.buffer.buffer);');
        }
        return ELEMENTS;
      }

      function emitCount() {
        var defn = drawOptions.count;
        var COUNT;
        var scope = outer;
        if (defn) {
          if (defn.contextDep && args.contextDynamic || defn.propDep) {
            scope = inner;
          }
          COUNT = defn.append(env, scope);
          check$1.optional(function () {
            if (defn.MISSING) {
              env.assert(outer, 'false', 'missing vertex count');
            }
            if (defn.DYNAMIC) {
              env.assert(scope, COUNT + '>=0', 'missing vertex count');
            }
          });
        } else {
          COUNT = scope.def(DRAW_STATE, '.', S_COUNT);
          check$1.optional(function () {
            env.assert(scope, COUNT + '>=0', 'missing vertex count');
          });
        }
        return COUNT;
      }

      var ELEMENTS = emitElements();
      function emitValue(name) {
        var defn = drawOptions[name];
        if (defn) {
          if (defn.contextDep && args.contextDynamic || defn.propDep) {
            return defn.append(env, inner);
          } else {
            return defn.append(env, outer);
          }
        } else {
          return outer.def(DRAW_STATE, '.', name);
        }
      }

      var PRIMITIVE = emitValue(S_PRIMITIVE);
      var OFFSET = emitValue(S_OFFSET);

      var COUNT = emitCount();
      if (typeof COUNT === 'number') {
        if (COUNT === 0) {
          return;
        }
      } else {
        inner('if(', COUNT, '){');
        inner.exit('}');
      }

      var INSTANCES, EXT_INSTANCING;
      if (extInstancing) {
        INSTANCES = emitValue(S_INSTANCES);
        EXT_INSTANCING = env.instancing;
      }

      var ELEMENT_TYPE = ELEMENTS + '.type';

      var elementsStatic = drawOptions.elements && isStatic(drawOptions.elements);

      function emitInstancing() {
        function drawElements() {
          inner(EXT_INSTANCING, '.drawElementsInstancedANGLE(', [PRIMITIVE, COUNT, ELEMENT_TYPE, OFFSET + '<<((' + ELEMENT_TYPE + '-' + GL_UNSIGNED_BYTE$7 + ')>>1)', INSTANCES], ');');
        }

        function drawArrays() {
          inner(EXT_INSTANCING, '.drawArraysInstancedANGLE(', [PRIMITIVE, OFFSET, COUNT, INSTANCES], ');');
        }

        if (ELEMENTS) {
          if (!elementsStatic) {
            inner('if(', ELEMENTS, '){');
            drawElements();
            inner('}else{');
            drawArrays();
            inner('}');
          } else {
            drawElements();
          }
        } else {
          drawArrays();
        }
      }

      function emitRegular() {
        function drawElements() {
          inner(GL + '.drawElements(' + [PRIMITIVE, COUNT, ELEMENT_TYPE, OFFSET + '<<((' + ELEMENT_TYPE + '-' + GL_UNSIGNED_BYTE$7 + ')>>1)'] + ');');
        }

        function drawArrays() {
          inner(GL + '.drawArrays(' + [PRIMITIVE, OFFSET, COUNT] + ');');
        }

        if (ELEMENTS) {
          if (!elementsStatic) {
            inner('if(', ELEMENTS, '){');
            drawElements();
            inner('}else{');
            drawArrays();
            inner('}');
          } else {
            drawElements();
          }
        } else {
          drawArrays();
        }
      }

      if (extInstancing && (typeof INSTANCES !== 'number' || INSTANCES >= 0)) {
        if (typeof INSTANCES === 'string') {
          inner('if(', INSTANCES, '>0){');
          emitInstancing();
          inner('}else if(', INSTANCES, '<0){');
          emitRegular();
          inner('}');
        } else {
          emitInstancing();
        }
      } else {
        emitRegular();
      }
    }

    function createBody(emitBody, parentEnv, args, program, count) {
      var env = createREGLEnvironment();
      var scope = env.proc('body', count);
      check$1.optional(function () {
        env.commandStr = parentEnv.commandStr;
        env.command = env.link(parentEnv.commandStr);
      });
      if (extInstancing) {
        env.instancing = scope.def(env.shared.extensions, '.angle_instanced_arrays');
      }
      emitBody(env, scope, args, program);
      return env.compile().body;
    }

    // ===================================================
    // ===================================================
    // DRAW PROC
    // ===================================================
    // ===================================================
    function emitDrawBody(env, draw, args, program) {
      injectExtensions(env, draw);
      emitAttributes(env, draw, args, program.attributes, function () {
        return true;
      });
      emitUniforms(env, draw, args, program.uniforms, function () {
        return true;
      });
      emitDraw(env, draw, draw, args);
    }

    function emitDrawProc(env, args) {
      var draw = env.proc('draw', 1);

      injectExtensions(env, draw);

      emitContext(env, draw, args.context);
      emitPollFramebuffer(env, draw, args.framebuffer);

      emitPollState(env, draw, args);
      emitSetOptions(env, draw, args.state);

      emitProfile(env, draw, args, false, true);

      var program = args.shader.progVar.append(env, draw);
      draw(env.shared.gl, '.useProgram(', program, '.program);');

      if (args.shader.program) {
        emitDrawBody(env, draw, args, args.shader.program);
      } else {
        var drawCache = env.global.def('{}');
        var PROG_ID = draw.def(program, '.id');
        var CACHED_PROC = draw.def(drawCache, '[', PROG_ID, ']');
        draw(env.cond(CACHED_PROC).then(CACHED_PROC, '.call(this,a0);').else(CACHED_PROC, '=', drawCache, '[', PROG_ID, ']=', env.link(function (program) {
          return createBody(emitDrawBody, env, args, program, 1);
        }), '(', program, ');', CACHED_PROC, '.call(this,a0);'));
      }

      if (Object.keys(args.state).length > 0) {
        draw(env.shared.current, '.dirty=true;');
      }
    }

    // ===================================================
    // ===================================================
    // BATCH PROC
    // ===================================================
    // ===================================================

    function emitBatchDynamicShaderBody(env, scope, args, program) {
      env.batchId = 'a1';

      injectExtensions(env, scope);

      function all() {
        return true;
      }

      emitAttributes(env, scope, args, program.attributes, all);
      emitUniforms(env, scope, args, program.uniforms, all);
      emitDraw(env, scope, scope, args);
    }

    function emitBatchBody(env, scope, args, program) {
      injectExtensions(env, scope);

      var contextDynamic = args.contextDep;

      var BATCH_ID = scope.def();
      var PROP_LIST = 'a0';
      var NUM_PROPS = 'a1';
      var PROPS = scope.def();
      env.shared.props = PROPS;
      env.batchId = BATCH_ID;

      var outer = env.scope();
      var inner = env.scope();

      scope(outer.entry, 'for(', BATCH_ID, '=0;', BATCH_ID, '<', NUM_PROPS, ';++', BATCH_ID, '){', PROPS, '=', PROP_LIST, '[', BATCH_ID, '];', inner, '}', outer.exit);

      function isInnerDefn(defn) {
        return defn.contextDep && contextDynamic || defn.propDep;
      }

      function isOuterDefn(defn) {
        return !isInnerDefn(defn);
      }

      if (args.needsContext) {
        emitContext(env, inner, args.context);
      }
      if (args.needsFramebuffer) {
        emitPollFramebuffer(env, inner, args.framebuffer);
      }
      emitSetOptions(env, inner, args.state, isInnerDefn);

      if (args.profile && isInnerDefn(args.profile)) {
        emitProfile(env, inner, args, false, true);
      }

      if (!program) {
        var progCache = env.global.def('{}');
        var PROGRAM = args.shader.progVar.append(env, inner);
        var PROG_ID = inner.def(PROGRAM, '.id');
        var CACHED_PROC = inner.def(progCache, '[', PROG_ID, ']');
        inner(env.shared.gl, '.useProgram(', PROGRAM, '.program);', 'if(!', CACHED_PROC, '){', CACHED_PROC, '=', progCache, '[', PROG_ID, ']=', env.link(function (program) {
          return createBody(emitBatchDynamicShaderBody, env, args, program, 2);
        }), '(', PROGRAM, ');}', CACHED_PROC, '.call(this,a0[', BATCH_ID, '],', BATCH_ID, ');');
      } else {
        emitAttributes(env, outer, args, program.attributes, isOuterDefn);
        emitAttributes(env, inner, args, program.attributes, isInnerDefn);
        emitUniforms(env, outer, args, program.uniforms, isOuterDefn);
        emitUniforms(env, inner, args, program.uniforms, isInnerDefn);
        emitDraw(env, outer, inner, args);
      }
    }

    function emitBatchProc(env, args) {
      var batch = env.proc('batch', 2);
      env.batchId = '0';

      injectExtensions(env, batch);

      // Check if any context variables depend on props
      var contextDynamic = false;
      var needsContext = true;
      Object.keys(args.context).forEach(function (name) {
        contextDynamic = contextDynamic || args.context[name].propDep;
      });
      if (!contextDynamic) {
        emitContext(env, batch, args.context);
        needsContext = false;
      }

      // framebuffer state affects framebufferWidth/height context vars
      var framebuffer = args.framebuffer;
      var needsFramebuffer = false;
      if (framebuffer) {
        if (framebuffer.propDep) {
          contextDynamic = needsFramebuffer = true;
        } else if (framebuffer.contextDep && contextDynamic) {
          needsFramebuffer = true;
        }
        if (!needsFramebuffer) {
          emitPollFramebuffer(env, batch, framebuffer);
        }
      } else {
        emitPollFramebuffer(env, batch, null);
      }

      // viewport is weird because it can affect context vars
      if (args.state.viewport && args.state.viewport.propDep) {
        contextDynamic = true;
      }

      function isInnerDefn(defn) {
        return defn.contextDep && contextDynamic || defn.propDep;
      }

      // set webgl options
      emitPollState(env, batch, args);
      emitSetOptions(env, batch, args.state, function (defn) {
        return !isInnerDefn(defn);
      });

      if (!args.profile || !isInnerDefn(args.profile)) {
        emitProfile(env, batch, args, false, 'a1');
      }

      // Save these values to args so that the batch body routine can use them
      args.contextDep = contextDynamic;
      args.needsContext = needsContext;
      args.needsFramebuffer = needsFramebuffer;

      // determine if shader is dynamic
      var progDefn = args.shader.progVar;
      if (progDefn.contextDep && contextDynamic || progDefn.propDep) {
        emitBatchBody(env, batch, args, null);
      } else {
        var PROGRAM = progDefn.append(env, batch);
        batch(env.shared.gl, '.useProgram(', PROGRAM, '.program);');
        if (args.shader.program) {
          emitBatchBody(env, batch, args, args.shader.program);
        } else {
          var batchCache = env.global.def('{}');
          var PROG_ID = batch.def(PROGRAM, '.id');
          var CACHED_PROC = batch.def(batchCache, '[', PROG_ID, ']');
          batch(env.cond(CACHED_PROC).then(CACHED_PROC, '.call(this,a0,a1);').else(CACHED_PROC, '=', batchCache, '[', PROG_ID, ']=', env.link(function (program) {
            return createBody(emitBatchBody, env, args, program, 2);
          }), '(', PROGRAM, ');', CACHED_PROC, '.call(this,a0,a1);'));
        }
      }

      if (Object.keys(args.state).length > 0) {
        batch(env.shared.current, '.dirty=true;');
      }
    }

    // ===================================================
    // ===================================================
    // SCOPE COMMAND
    // ===================================================
    // ===================================================
    function emitScopeProc(env, args) {
      var scope = env.proc('scope', 3);
      env.batchId = 'a2';

      var shared = env.shared;
      var CURRENT_STATE = shared.current;

      emitContext(env, scope, args.context);

      if (args.framebuffer) {
        args.framebuffer.append(env, scope);
      }

      sortState(Object.keys(args.state)).forEach(function (name) {
        var defn = args.state[name];
        var value = defn.append(env, scope);
        if (isArrayLike(value)) {
          value.forEach(function (v, i) {
            scope.set(env.next[name], '[' + i + ']', v);
          });
        } else {
          scope.set(shared.next, '.' + name, value);
        }
      });

      emitProfile(env, scope, args, true, true);[S_ELEMENTS, S_OFFSET, S_COUNT, S_INSTANCES, S_PRIMITIVE].forEach(function (opt) {
        var variable = args.draw[opt];
        if (!variable) {
          return;
        }
        scope.set(shared.draw, '.' + opt, '' + variable.append(env, scope));
      });

      Object.keys(args.uniforms).forEach(function (opt) {
        scope.set(shared.uniforms, '[' + stringStore.id(opt) + ']', args.uniforms[opt].append(env, scope));
      });

      Object.keys(args.attributes).forEach(function (name) {
        var record = args.attributes[name].append(env, scope);
        var scopeAttrib = env.scopeAttrib(name);
        Object.keys(new AttributeRecord()).forEach(function (prop) {
          scope.set(scopeAttrib, '.' + prop, record[prop]);
        });
      });

      function saveShader(name) {
        var shader = args.shader[name];
        if (shader) {
          scope.set(shared.shader, '.' + name, shader.append(env, scope));
        }
      }
      saveShader(S_VERT);
      saveShader(S_FRAG);

      if (Object.keys(args.state).length > 0) {
        scope(CURRENT_STATE, '.dirty=true;');
        scope.exit(CURRENT_STATE, '.dirty=true;');
      }

      scope('a1(', env.shared.context, ',a0,', env.batchId, ');');
    }

    function isDynamicObject(object) {
      if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) !== 'object' || isArrayLike(object)) {
        return;
      }
      var props = Object.keys(object);
      for (var i = 0; i < props.length; ++i) {
        if (dynamic.isDynamic(object[props[i]])) {
          return true;
        }
      }
      return false;
    }

    function splatObject(env, options, name) {
      var object = options.static[name];
      if (!object || !isDynamicObject(object)) {
        return;
      }

      var globals = env.global;
      var keys = Object.keys(object);
      var thisDep = false;
      var contextDep = false;
      var propDep = false;
      var objectRef = env.global.def('{}');
      keys.forEach(function (key) {
        var value = object[key];
        if (dynamic.isDynamic(value)) {
          if (typeof value === 'function') {
            value = object[key] = dynamic.unbox(value);
          }
          var deps = createDynamicDecl(value, null);
          thisDep = thisDep || deps.thisDep;
          propDep = propDep || deps.propDep;
          contextDep = contextDep || deps.contextDep;
        } else {
          globals(objectRef, '.', key, '=');
          switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
            case 'number':
              globals(value);
              break;
            case 'string':
              globals('"', value, '"');
              break;
            case 'object':
              if (Array.isArray(value)) {
                globals('[', value.join(), ']');
              }
              break;
            default:
              globals(env.link(value));
              break;
          }
          globals(';');
        }
      });

      function appendBlock(env, block) {
        keys.forEach(function (key) {
          var value = object[key];
          if (!dynamic.isDynamic(value)) {
            return;
          }
          var ref = env.invoke(block, value);
          block(objectRef, '.', key, '=', ref, ';');
        });
      }

      options.dynamic[name] = new dynamic.DynamicVariable(DYN_THUNK, {
        thisDep: thisDep,
        contextDep: contextDep,
        propDep: propDep,
        ref: objectRef,
        append: appendBlock
      });
      delete options.static[name];
    }

    // ===========================================================================
    // ===========================================================================
    // MAIN DRAW COMMAND
    // ===========================================================================
    // ===========================================================================
    function compileCommand(options, attributes, uniforms, context, stats) {
      var env = createREGLEnvironment();

      // link stats, so that we can easily access it in the program.
      env.stats = env.link(stats);

      // splat options and attributes to allow for dynamic nested properties
      Object.keys(attributes.static).forEach(function (key) {
        splatObject(env, attributes, key);
      });
      NESTED_OPTIONS.forEach(function (name) {
        splatObject(env, options, name);
      });

      var args = parseArguments(options, attributes, uniforms, context, env);

      emitDrawProc(env, args);
      emitScopeProc(env, args);
      emitBatchProc(env, args);

      return env.compile();
    }

    // ===========================================================================
    // ===========================================================================
    // POLL / REFRESH
    // ===========================================================================
    // ===========================================================================
    return {
      next: nextState,
      current: currentState,
      compile: compileCommand,
      procs: function () {
        var env = createREGLEnvironment();
        var poll = env.proc('poll');
        var refresh = env.proc('refresh');
        var common = env.block();
        poll(common);
        refresh(common);

        var shared = env.shared;
        var GL = shared.gl;
        var NEXT_STATE = shared.next;
        var CURRENT_STATE = shared.current;

        common(CURRENT_STATE, '.dirty=false;');

        emitPollFramebuffer(env, poll);
        emitPollFramebuffer(env, refresh, null, true);

        // Refresh updates all attribute state changes
        var extInstancing = gl.getExtension('angle_instanced_arrays');
        var INSTANCING;
        if (extInstancing) {
          INSTANCING = env.link(extInstancing);
        }
        for (var i = 0; i < limits.maxAttributes; ++i) {
          var BINDING = refresh.def(shared.attributes, '[', i, ']');
          var ifte = env.cond(BINDING, '.buffer');
          ifte.then(GL, '.enableVertexAttribArray(', i, ');', GL, '.bindBuffer(', GL_ARRAY_BUFFER$1, ',', BINDING, '.buffer.buffer);', GL, '.vertexAttribPointer(', i, ',', BINDING, '.size,', BINDING, '.type,', BINDING, '.normalized,', BINDING, '.stride,', BINDING, '.offset);').else(GL, '.disableVertexAttribArray(', i, ');', GL, '.vertexAttrib4f(', i, ',', BINDING, '.x,', BINDING, '.y,', BINDING, '.z,', BINDING, '.w);', BINDING, '.buffer=null;');
          refresh(ifte);
          if (extInstancing) {
            refresh(INSTANCING, '.vertexAttribDivisorANGLE(', i, ',', BINDING, '.divisor);');
          }
        }

        Object.keys(GL_FLAGS).forEach(function (flag) {
          var cap = GL_FLAGS[flag];
          var NEXT = common.def(NEXT_STATE, '.', flag);
          var block = env.block();
          block('if(', NEXT, '){', GL, '.enable(', cap, ')}else{', GL, '.disable(', cap, ')}', CURRENT_STATE, '.', flag, '=', NEXT, ';');
          refresh(block);
          poll('if(', NEXT, '!==', CURRENT_STATE, '.', flag, '){', block, '}');
        });

        Object.keys(GL_VARIABLES).forEach(function (name) {
          var func = GL_VARIABLES[name];
          var init = currentState[name];
          var NEXT, CURRENT;
          var block = env.block();
          block(GL, '.', func, '(');
          if (isArrayLike(init)) {
            var n = init.length;
            NEXT = env.global.def(NEXT_STATE, '.', name);
            CURRENT = env.global.def(CURRENT_STATE, '.', name);
            block(loop(n, function (i) {
              return NEXT + '[' + i + ']';
            }), ');', loop(n, function (i) {
              return CURRENT + '[' + i + ']=' + NEXT + '[' + i + '];';
            }).join(''));
            poll('if(', loop(n, function (i) {
              return NEXT + '[' + i + ']!==' + CURRENT + '[' + i + ']';
            }).join('||'), '){', block, '}');
          } else {
            NEXT = common.def(NEXT_STATE, '.', name);
            CURRENT = common.def(CURRENT_STATE, '.', name);
            block(NEXT, ');', CURRENT_STATE, '.', name, '=', NEXT, ';');
            poll('if(', NEXT, '!==', CURRENT, '){', block, '}');
          }
          refresh(block);
        });

        return env.compile();
      }()
    };
  }

  function stats() {
    return {
      bufferCount: 0,
      vaoCount: 0,
      elementsCount: 0,
      framebufferCount: 0,
      shaderCount: 0,
      textureCount: 0,
      cubeCount: 0,
      renderbufferCount: 0,

      maxTextureUnits: 0
    };
  }

  var GL_QUERY_RESULT_EXT = 0x8866;
  var GL_QUERY_RESULT_AVAILABLE_EXT = 0x8867;
  var GL_TIME_ELAPSED_EXT = 0x88BF;

  var createTimer = function createTimer(gl, extensions) {
    var extTimer = extensions.ext_disjoint_timer_query;

    if (!extTimer) {
      return null;
    }

    // QUERY POOL BEGIN
    var queryPool = [];
    function allocQuery() {
      return queryPool.pop() || extTimer.createQueryEXT();
    }
    function freeQuery(query) {
      queryPool.push(query);
    }
    // QUERY POOL END

    var pendingQueries = [];
    function beginQuery(stats) {
      var query = allocQuery();
      extTimer.beginQueryEXT(GL_TIME_ELAPSED_EXT, query);
      pendingQueries.push(query);
      pushScopeStats(pendingQueries.length - 1, pendingQueries.length, stats);
    }

    function endQuery() {
      extTimer.endQueryEXT(GL_TIME_ELAPSED_EXT);
    }

    //
    // Pending stats pool.
    //
    function PendingStats() {
      this.startQueryIndex = -1;
      this.endQueryIndex = -1;
      this.sum = 0;
      this.stats = null;
    }
    var pendingStatsPool = [];
    function allocPendingStats() {
      return pendingStatsPool.pop() || new PendingStats();
    }
    function freePendingStats(pendingStats) {
      pendingStatsPool.push(pendingStats);
    }
    // Pending stats pool end

    var pendingStats = [];
    function pushScopeStats(start, end, stats) {
      var ps = allocPendingStats();
      ps.startQueryIndex = start;
      ps.endQueryIndex = end;
      ps.sum = 0;
      ps.stats = stats;
      pendingStats.push(ps);
    }

    // we should call this at the beginning of the frame,
    // in order to update gpuTime
    var timeSum = [];
    var queryPtr = [];
    function update() {
      var ptr, i;

      var n = pendingQueries.length;
      if (n === 0) {
        return;
      }

      // Reserve space
      queryPtr.length = Math.max(queryPtr.length, n + 1);
      timeSum.length = Math.max(timeSum.length, n + 1);
      timeSum[0] = 0;
      queryPtr[0] = 0;

      // Update all pending timer queries
      var queryTime = 0;
      ptr = 0;
      for (i = 0; i < pendingQueries.length; ++i) {
        var query = pendingQueries[i];
        if (extTimer.getQueryObjectEXT(query, GL_QUERY_RESULT_AVAILABLE_EXT)) {
          queryTime += extTimer.getQueryObjectEXT(query, GL_QUERY_RESULT_EXT);
          freeQuery(query);
        } else {
          pendingQueries[ptr++] = query;
        }
        timeSum[i + 1] = queryTime;
        queryPtr[i + 1] = ptr;
      }
      pendingQueries.length = ptr;

      // Update all pending stat queries
      ptr = 0;
      for (i = 0; i < pendingStats.length; ++i) {
        var stats = pendingStats[i];
        var start = stats.startQueryIndex;
        var end = stats.endQueryIndex;
        stats.sum += timeSum[end] - timeSum[start];
        var startPtr = queryPtr[start];
        var endPtr = queryPtr[end];
        if (endPtr === startPtr) {
          stats.stats.gpuTime += stats.sum / 1e6;
          freePendingStats(stats);
        } else {
          stats.startQueryIndex = startPtr;
          stats.endQueryIndex = endPtr;
          pendingStats[ptr++] = stats;
        }
      }
      pendingStats.length = ptr;
    }

    return {
      beginQuery: beginQuery,
      endQuery: endQuery,
      pushScopeStats: pushScopeStats,
      update: update,
      getNumPendingQueries: function getNumPendingQueries() {
        return pendingQueries.length;
      },
      clear: function clear() {
        queryPool.push.apply(queryPool, pendingQueries);
        for (var i = 0; i < queryPool.length; i++) {
          extTimer.deleteQueryEXT(queryPool[i]);
        }
        pendingQueries.length = 0;
        queryPool.length = 0;
      },
      restore: function restore() {
        pendingQueries.length = 0;
        queryPool.length = 0;
      }
    };
  };

  var GL_COLOR_BUFFER_BIT = 16384;
  var GL_DEPTH_BUFFER_BIT = 256;
  var GL_STENCIL_BUFFER_BIT = 1024;

  var GL_ARRAY_BUFFER = 34962;

  var CONTEXT_LOST_EVENT = 'webglcontextlost';
  var CONTEXT_RESTORED_EVENT = 'webglcontextrestored';

  var DYN_PROP = 1;
  var DYN_CONTEXT = 2;
  var DYN_STATE = 3;

  function find(haystack, needle) {
    for (var i = 0; i < haystack.length; ++i) {
      if (haystack[i] === needle) {
        return i;
      }
    }
    return -1;
  }

  function wrapREGL(args) {
    var config = parseArgs(args);
    if (!config) {
      return null;
    }

    var gl = config.gl;
    var glAttributes = gl.getContextAttributes();
    var contextLost = gl.isContextLost();

    var extensionState = createExtensionCache(gl, config);
    if (!extensionState) {
      return null;
    }

    var stringStore = createStringStore();
    var stats$$1 = stats();
    var extensions = extensionState.extensions;
    var timer = createTimer(gl, extensions);

    var START_TIME = clock();
    var WIDTH = gl.drawingBufferWidth;
    var HEIGHT = gl.drawingBufferHeight;

    var contextState = {
      tick: 0,
      time: 0,
      viewportWidth: WIDTH,
      viewportHeight: HEIGHT,
      framebufferWidth: WIDTH,
      framebufferHeight: HEIGHT,
      drawingBufferWidth: WIDTH,
      drawingBufferHeight: HEIGHT,
      pixelRatio: config.pixelRatio
    };
    var uniformState = {};
    var drawState = {
      elements: null,
      primitive: 4, // GL_TRIANGLES
      count: -1,
      offset: 0,
      instances: -1
    };

    var limits = wrapLimits(gl, extensions);
    var vaoState = wrapVAOState(gl, extensions, stats$$1, config);
    var bufferState = wrapBufferState(gl, stats$$1, config);
    var elementState = wrapElementsState(gl, extensions, bufferState, stats$$1);
    var attributeState = wrapAttributeState(gl, extensions, limits, bufferState, stringStore);
    var shaderState = wrapShaderState(gl, stringStore, stats$$1, config);
    var textureState = createTextureSet(gl, extensions, limits, function () {
      core.procs.poll();
    }, contextState, stats$$1, config);
    var renderbufferState = wrapRenderbuffers(gl, extensions, limits, stats$$1, config);
    var framebufferState = wrapFBOState(gl, extensions, limits, textureState, renderbufferState, stats$$1);
    var core = reglCore(gl, stringStore, extensions, limits, vaoState, bufferState, elementState, textureState, framebufferState, uniformState, attributeState, shaderState, drawState, contextState, timer, config);
    var readPixels = wrapReadPixels(gl, framebufferState, core.procs.poll, contextState, glAttributes, extensions);

    var nextState = core.next;
    var canvas = gl.canvas;

    var rafCallbacks = [];
    var lossCallbacks = [];
    var restoreCallbacks = [];
    var destroyCallbacks = [config.onDestroy];

    var activeRAF = null;
    function handleRAF() {
      if (rafCallbacks.length === 0) {
        if (timer) {
          timer.update();
        }
        activeRAF = null;
        return;
      }

      // schedule next animation frame
      activeRAF = raf.next(handleRAF);

      // poll for changes
      _poll();

      // fire a callback for all pending rafs
      for (var i = rafCallbacks.length - 1; i >= 0; --i) {
        var cb = rafCallbacks[i];
        if (cb) {
          cb(contextState, null, 0);
        }
      }

      // flush all pending webgl calls
      gl.flush();

      // poll GPU timers *after* gl.flush so we don't delay command dispatch
      if (timer) {
        timer.update();
      }
    }

    function startRAF() {
      if (!activeRAF && rafCallbacks.length > 0) {
        activeRAF = raf.next(handleRAF);
      }
    }

    function stopRAF() {
      if (activeRAF) {
        raf.cancel(handleRAF);
        activeRAF = null;
      }
    }

    function handleContextLoss(event) {
      event.preventDefault();

      // set context lost flag
      contextLost = true;

      // pause request animation frame
      stopRAF();

      // lose context
      lossCallbacks.forEach(function (cb) {
        cb();
      });
    }

    function handleContextRestored(event) {
      // clear error code
      gl.getError();

      // clear context lost flag
      contextLost = false;

      // refresh state
      extensionState.restore();
      shaderState.restore();
      bufferState.restore();
      textureState.restore();
      renderbufferState.restore();
      framebufferState.restore();
      if (timer) {
        timer.restore();
      }

      // refresh state
      core.procs.refresh();

      // restart RAF
      startRAF();

      // restore context
      restoreCallbacks.forEach(function (cb) {
        cb();
      });
    }

    if (canvas) {
      canvas.addEventListener(CONTEXT_LOST_EVENT, handleContextLoss, false);
      canvas.addEventListener(CONTEXT_RESTORED_EVENT, handleContextRestored, false);
    }

    function destroy() {
      rafCallbacks.length = 0;
      stopRAF();

      if (canvas) {
        canvas.removeEventListener(CONTEXT_LOST_EVENT, handleContextLoss);
        canvas.removeEventListener(CONTEXT_RESTORED_EVENT, handleContextRestored);
      }

      shaderState.clear();
      framebufferState.clear();
      renderbufferState.clear();
      textureState.clear();
      elementState.clear();
      bufferState.clear();
      vaoState.clear();

      if (timer) {
        timer.clear();
      }

      destroyCallbacks.forEach(function (cb) {
        cb();
      });
    }

    function compileProcedure(options) {
      check$1(!!options, 'invalid args to regl({...})');
      check$1.type(options, 'object', 'invalid args to regl({...})');

      function flattenNestedOptions(options) {
        var result = extend({}, options);
        delete result.uniforms;
        delete result.attributes;
        delete result.context;

        if ('stencil' in result && result.stencil.op) {
          result.stencil.opBack = result.stencil.opFront = result.stencil.op;
          delete result.stencil.op;
        }

        function merge(name) {
          if (name in result) {
            var child = result[name];
            delete result[name];
            Object.keys(child).forEach(function (prop) {
              result[name + '.' + prop] = child[prop];
            });
          }
        }
        merge('blend');
        merge('depth');
        merge('cull');
        merge('stencil');
        merge('polygonOffset');
        merge('scissor');
        merge('sample');

        return result;
      }

      function separateDynamic(object) {
        var staticItems = {};
        var dynamicItems = {};
        Object.keys(object).forEach(function (option) {
          var value = object[option];
          if (dynamic.isDynamic(value)) {
            dynamicItems[option] = dynamic.unbox(value, option);
          } else {
            staticItems[option] = value;
          }
        });
        return {
          dynamic: dynamicItems,
          static: staticItems
        };
      }

      // Treat context variables separate from other dynamic variables
      var context = separateDynamic(options.context || {});
      var uniforms = separateDynamic(options.uniforms || {});
      var attributes = separateDynamic(options.attributes || {});
      var opts = separateDynamic(flattenNestedOptions(options));

      var stats$$1 = {
        gpuTime: 0.0,
        cpuTime: 0.0,
        count: 0
      };

      var compiled = core.compile(opts, attributes, uniforms, context, stats$$1);

      var draw = compiled.draw;
      var batch = compiled.batch;
      var scope = compiled.scope;

      // FIXME: we should modify code generation for batch commands so this
      // isn't necessary
      var EMPTY_ARRAY = [];
      function reserve(count) {
        while (EMPTY_ARRAY.length < count) {
          EMPTY_ARRAY.push(null);
        }
        return EMPTY_ARRAY;
      }

      function REGLCommand(args, body) {
        var i;
        if (contextLost) {
          check$1.raise('context lost');
        }
        if (typeof args === 'function') {
          return scope.call(this, null, args, 0);
        } else if (typeof body === 'function') {
          if (typeof args === 'number') {
            for (i = 0; i < args; ++i) {
              scope.call(this, null, body, i);
            }
            return;
          } else if (Array.isArray(args)) {
            for (i = 0; i < args.length; ++i) {
              scope.call(this, args[i], body, i);
            }
            return;
          } else {
            return scope.call(this, args, body, 0);
          }
        } else if (typeof args === 'number') {
          if (args > 0) {
            return batch.call(this, reserve(args | 0), args | 0);
          }
        } else if (Array.isArray(args)) {
          if (args.length) {
            return batch.call(this, args, args.length);
          }
        } else {
          return draw.call(this, args);
        }
      }

      return extend(REGLCommand, {
        stats: stats$$1
      });
    }

    var setFBO = framebufferState.setFBO = compileProcedure({
      framebuffer: dynamic.define.call(null, DYN_PROP, 'framebuffer')
    });

    function clearImpl(_, options) {
      var clearFlags = 0;
      core.procs.poll();

      var c = options.color;
      if (c) {
        gl.clearColor(+c[0] || 0, +c[1] || 0, +c[2] || 0, +c[3] || 0);
        clearFlags |= GL_COLOR_BUFFER_BIT;
      }
      if ('depth' in options) {
        gl.clearDepth(+options.depth);
        clearFlags |= GL_DEPTH_BUFFER_BIT;
      }
      if ('stencil' in options) {
        gl.clearStencil(options.stencil | 0);
        clearFlags |= GL_STENCIL_BUFFER_BIT;
      }

      check$1(!!clearFlags, 'called regl.clear with no buffer specified');
      gl.clear(clearFlags);
    }

    function clear(options) {
      check$1((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' && options, 'regl.clear() takes an object as input');
      if ('framebuffer' in options) {
        if (options.framebuffer && options.framebuffer_reglType === 'framebufferCube') {
          for (var i = 0; i < 6; ++i) {
            setFBO(extend({
              framebuffer: options.framebuffer.faces[i]
            }, options), clearImpl);
          }
        } else {
          setFBO(options, clearImpl);
        }
      } else {
        clearImpl(null, options);
      }
    }

    function frame(cb) {
      check$1.type(cb, 'function', 'regl.frame() callback must be a function');
      rafCallbacks.push(cb);

      function cancel() {
        // FIXME:  should we check something other than equals cb here?
        // what if a user calls frame twice with the same callback...
        //
        var i = find(rafCallbacks, cb);
        check$1(i >= 0, 'cannot cancel a frame twice');
        function pendingCancel() {
          var index = find(rafCallbacks, pendingCancel);
          rafCallbacks[index] = rafCallbacks[rafCallbacks.length - 1];
          rafCallbacks.length -= 1;
          if (rafCallbacks.length <= 0) {
            stopRAF();
          }
        }
        rafCallbacks[i] = pendingCancel;
      }

      startRAF();

      return {
        cancel: cancel
      };
    }

    // poll viewport
    function pollViewport() {
      var viewport = nextState.viewport;
      var scissorBox = nextState.scissor_box;
      viewport[0] = viewport[1] = scissorBox[0] = scissorBox[1] = 0;
      contextState.viewportWidth = contextState.framebufferWidth = contextState.drawingBufferWidth = viewport[2] = scissorBox[2] = gl.drawingBufferWidth;
      contextState.viewportHeight = contextState.framebufferHeight = contextState.drawingBufferHeight = viewport[3] = scissorBox[3] = gl.drawingBufferHeight;
    }

    function _poll() {
      contextState.tick += 1;
      contextState.time = now();
      pollViewport();
      core.procs.poll();
    }

    function refresh() {
      pollViewport();
      core.procs.refresh();
      if (timer) {
        timer.update();
      }
    }

    function now() {
      return (clock() - START_TIME) / 1000.0;
    }

    refresh();

    function addListener(event, callback) {
      check$1.type(callback, 'function', 'listener callback must be a function');

      var callbacks;
      switch (event) {
        case 'frame':
          return frame(callback);
        case 'lost':
          callbacks = lossCallbacks;
          break;
        case 'restore':
          callbacks = restoreCallbacks;
          break;
        case 'destroy':
          callbacks = destroyCallbacks;
          break;
        default:
          check$1.raise('invalid event, must be one of frame,lost,restore,destroy');
      }

      callbacks.push(callback);
      return {
        cancel: function cancel() {
          for (var i = 0; i < callbacks.length; ++i) {
            if (callbacks[i] === callback) {
              callbacks[i] = callbacks[callbacks.length - 1];
              callbacks.pop();
              return;
            }
          }
        }
      };
    }

    var regl = extend(compileProcedure, {
      // Clear current FBO
      clear: clear,

      // Short cuts for dynamic variables
      prop: dynamic.define.bind(null, DYN_PROP),
      context: dynamic.define.bind(null, DYN_CONTEXT),
      this: dynamic.define.bind(null, DYN_STATE),

      // executes an empty draw command
      draw: compileProcedure({}),

      // Resources
      buffer: function buffer(options) {
        return bufferState.create(options, GL_ARRAY_BUFFER, false, false);
      },
      elements: function elements(options) {
        return elementState.create(options, false);
      },
      texture: textureState.create2D,
      cube: textureState.createCube,
      renderbuffer: renderbufferState.create,
      framebuffer: framebufferState.create,
      framebufferCube: framebufferState.createCube,

      // Expose context attributes
      attributes: glAttributes,

      // Frame rendering
      frame: frame,
      on: addListener,

      // System limits
      limits: limits,
      hasExtension: function hasExtension(name) {
        return limits.extensions.indexOf(name.toLowerCase()) >= 0;
      },

      // Read pixels
      read: readPixels,

      // Destroy regl and all associated resources
      destroy: destroy,

      // Direct GL state manipulation
      _gl: gl,
      _refresh: refresh,

      poll: function poll() {
        _poll();
        if (timer) {
          timer.update();
        }
      },

      // Current time
      now: now,

      // regl Statistics Information
      stats: stats$$1
    });

    config.onDone(null, regl);

    return regl;
  }

  return wrapREGL;
});


},{}],293:[function(_dereq_,module,exports){
'use strict';

// for compression
var win = window;
var doc = document || {};
var root = doc.documentElement || {};

// detect if we need to use firefox KeyEvents vs KeyboardEvents
var use_key_event = true;
try {
    doc.createEvent('KeyEvents');
} catch (err) {
    use_key_event = false;
}

// Workaround for https://bugs.webkit.org/show_bug.cgi?id=16735
function check_kb(ev, opts) {
    if (ev.ctrlKey != (opts.ctrlKey || false) || ev.altKey != (opts.altKey || false) || ev.shiftKey != (opts.shiftKey || false) || ev.metaKey != (opts.metaKey || false) || ev.keyCode != (opts.keyCode || 0) || ev.charCode != (opts.charCode || 0)) {

        ev = document.createEvent('Event');
        ev.initEvent(opts.type, opts.bubbles, opts.cancelable);
        ev.ctrlKey = opts.ctrlKey || false;
        ev.altKey = opts.altKey || false;
        ev.shiftKey = opts.shiftKey || false;
        ev.metaKey = opts.metaKey || false;
        ev.keyCode = opts.keyCode || 0;
        ev.charCode = opts.charCode || 0;
    }

    return ev;
}

// modern browsers, do a proper dispatchEvent()
var modern = function modern(type, opts) {
    opts = opts || {};

    // which init fn do we use
    var family = typeOf(type);
    var init_fam = family;
    if (family === 'KeyboardEvent' && use_key_event) {
        family = 'KeyEvents';
        init_fam = 'KeyEvent';
    }

    var ev = doc.createEvent(family);
    var init_fn = 'init' + init_fam;
    var init = typeof ev[init_fn] === 'function' ? init_fn : 'initEvent';

    var sig = initSignatures[init];
    var args = [];
    var used = {};

    opts.type = type;
    for (var i = 0; i < sig.length; ++i) {
        var key = sig[i];
        var val = opts[key];
        // if no user specified value, then use event default
        if (val === undefined) {
            val = ev[key];
        }
        used[key] = true;
        args.push(val);
    }
    ev[init].apply(ev, args);

    // webkit key event issue workaround
    if (family === 'KeyboardEvent') {
        ev = check_kb(ev, opts);
    }

    // attach remaining unused options to the object
    for (var key in opts) {
        if (!used[key]) {
            ev[key] = opts[key];
        }
    }

    return ev;
};

var legacy = function legacy(type, opts) {
    opts = opts || {};
    var ev = doc.createEventObject();

    ev.type = type;
    for (var key in opts) {
        if (opts[key] !== undefined) {
            ev[key] = opts[key];
        }
    }

    return ev;
};

// expose either the modern version of event generation or legacy
// depending on what we support
// avoids if statements in the code later
module.exports = doc.createEvent ? modern : legacy;

var initSignatures = _dereq_('./init.json');
var types = _dereq_('./types.json');
var typeOf = function () {
    var typs = {};
    for (var key in types) {
        var ts = types[key];
        for (var i = 0; i < ts.length; i++) {
            typs[ts[i]] = key;
        }
    }

    return function (name) {
        return typs[name] || 'Event';
    };
}();

},{"./init.json":294,"./types.json":295}],294:[function(_dereq_,module,exports){
module.exports={
  "initEvent" : [
    "type",
    "bubbles",
    "cancelable"
  ],
  "initUIEvent" : [
    "type",
    "bubbles",
    "cancelable",
    "view",
    "detail"
  ],
  "initMouseEvent" : [
    "type",
    "bubbles",
    "cancelable",
    "view",
    "detail",
    "screenX",
    "screenY",
    "clientX",
    "clientY",
    "ctrlKey",
    "altKey",
    "shiftKey",
    "metaKey",
    "button",
    "relatedTarget"
  ],
  "initMutationEvent" : [
    "type",
    "bubbles",
    "cancelable",
    "relatedNode",
    "prevValue",
    "newValue",
    "attrName",
    "attrChange"
  ],
  "initKeyboardEvent" : [
    "type",
    "bubbles",
    "cancelable",
    "view",
    "ctrlKey",
    "altKey",
    "shiftKey",
    "metaKey",
    "keyCode",
    "charCode"
  ],
  "initKeyEvent" : [
    "type",
    "bubbles",
    "cancelable",
    "view",
    "ctrlKey",
    "altKey",
    "shiftKey",
    "metaKey",
    "keyCode",
    "charCode"
  ]
}

},{}],295:[function(_dereq_,module,exports){
module.exports={
  "MouseEvent" : [
    "click",
    "mousedown",
    "mouseup",
    "mouseover",
    "mousemove",
    "mouseout"
  ],
  "KeyboardEvent" : [
    "keydown",
    "keyup",
    "keypress"
  ],
  "MutationEvent" : [
    "DOMSubtreeModified",
    "DOMNodeInserted",
    "DOMNodeRemoved",
    "DOMNodeRemovedFromDocument",
    "DOMNodeInsertedIntoDocument",
    "DOMAttrModified",
    "DOMCharacterDataModified"
  ],
  "HTMLEvents" : [
    "load",
    "unload",
    "abort",
    "error",
    "select",
    "change",
    "submit",
    "reset",
    "focus",
    "blur",
    "resize",
    "scroll"
  ],
  "UIEvent" : [
    "DOMFocusIn",
    "DOMFocusOut",
    "DOMActivate"
  ]
}

},{}],296:[function(_dereq_,module,exports){
"use strict";

module.exports = unindex;

function unindex(positions, cells, out) {
  if (positions.positions && positions.cells) {
    out = cells;
    cells = positions.cells;
    positions = positions.positions;
  }

  var dims = positions.length ? positions[0].length : 0;
  var points = cells.length ? cells[0].length : 0;

  out = out || new Float32Array(cells.length * points * dims);

  if (points === 3 && dims === 2) {
    for (var i = 0, n = 0, l = cells.length; i < l; i += 1) {
      var cell = cells[i];
      out[n++] = positions[cell[0]][0];
      out[n++] = positions[cell[0]][1];
      out[n++] = positions[cell[1]][0];
      out[n++] = positions[cell[1]][1];
      out[n++] = positions[cell[2]][0];
      out[n++] = positions[cell[2]][1];
    }
  } else if (points === 3 && dims === 3) {
    for (var i = 0, n = 0, l = cells.length; i < l; i += 1) {
      var cell = cells[i];
      out[n++] = positions[cell[0]][0];
      out[n++] = positions[cell[0]][1];
      out[n++] = positions[cell[0]][2];
      out[n++] = positions[cell[1]][0];
      out[n++] = positions[cell[1]][1];
      out[n++] = positions[cell[1]][2];
      out[n++] = positions[cell[2]][0];
      out[n++] = positions[cell[2]][1];
      out[n++] = positions[cell[2]][2];
    }
  } else {
    for (var i = 0, n = 0, l = cells.length; i < l; i += 1) {
      var cell = cells[i];
      for (var c = 0; c < cell.length; c++) {
        var C = cell[c];
        for (var k = 0; k < dims; k++) {
          out[n++] = positions[C][k];
        }
      }
    }
  }

  return out;
}

},{}],297:[function(_dereq_,module,exports){
"use strict";

module.exports = extend;

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }

    return target;
}

},{}]},{},[58])(58)
});