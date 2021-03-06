"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _filter2 = _interopRequireDefault(require("lodash/filter"));

var _raf = _interopRequireWildcard(require("raf"));

var _util = require("./util");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var alpha = function alpha(begin, end, k) {
  return begin + (end - begin) * k;
};

var needContinue = function needContinue(_ref) {
  var from = _ref.from,
      to = _ref.to;
  return from !== to;
};
/*
 * @description: cal new from value and velocity in each stepper
 * @return: { [styleProperty]: { from, to, velocity } }
 */


var calStepperVals = function calStepperVals(easing, preVals, steps) {
  var nextStepVals = (0, _util.mapObject)(function (key, val) {
    if (needContinue(val)) {
      var _easing = easing(val.from, val.to, val.velocity),
          _easing2 = _slicedToArray(_easing, 2),
          newX = _easing2[0],
          newV = _easing2[1];

      return _objectSpread({}, val, {
        from: newX,
        velocity: newV
      });
    }

    return val;
  }, preVals);

  if (steps < 1) {
    return (0, _util.mapObject)(function (key, val) {
      if (needContinue(val)) {
        return _objectSpread({}, val, {
          velocity: alpha(val.velocity, nextStepVals[key].velocity, steps),
          from: alpha(val.from, nextStepVals[key].from, steps)
        });
      }

      return val;
    }, preVals);
  }

  return calStepperVals(easing, nextStepVals, steps - 1);
}; // configure update function


var _default = function _default(from, to, easing, duration, render) {
  var interKeys = (0, _util.getIntersectionKeys)(from, to);
  var timingStyle = interKeys.reduce(function (res, key) {
    return _objectSpread({}, res, _defineProperty({}, key, [from[key], to[key]]));
  }, {});
  var stepperStyle = interKeys.reduce(function (res, key) {
    return _objectSpread({}, res, _defineProperty({}, key, {
      from: from[key],
      velocity: 0,
      to: to[key]
    }));
  }, {});
  var cafId = -1;
  var preTime;
  var beginTime;

  var update = function update() {
    return null;
  };

  var getCurrStyle = function getCurrStyle() {
    return (0, _util.mapObject)(function (key, val) {
      return val.from;
    }, stepperStyle);
  };

  var shouldStopAnimation = function shouldStopAnimation() {
    return !(0, _filter2.default)(stepperStyle, needContinue).length;
  }; // stepper timing function like spring


  var stepperUpdate = function stepperUpdate(now) {
    if (!preTime) {
      preTime = now;
    }

    var deltaTime = now - preTime;
    var steps = deltaTime / easing.dt;
    stepperStyle = calStepperVals(easing, stepperStyle, steps); // get union set and add compatible prefix

    render(_objectSpread({}, from, to, getCurrStyle(stepperStyle)));
    preTime = now;

    if (!shouldStopAnimation()) {
      cafId = (0, _raf.default)(update);
    }
  }; // t => val timing function like cubic-bezier


  var timingUpdate = function timingUpdate(now) {
    if (!beginTime) {
      beginTime = now;
    }

    var t = (now - beginTime) / duration;
    var currStyle = (0, _util.mapObject)(function (key, val) {
      return alpha.apply(void 0, _toConsumableArray(val).concat([easing(t)]));
    }, timingStyle); // get union set and add compatible prefix

    render(_objectSpread({}, from, to, currStyle));

    if (t < 1) {
      cafId = (0, _raf.default)(update);
    } else {
      var finalStyle = (0, _util.mapObject)(function (key, val) {
        return alpha.apply(void 0, _toConsumableArray(val).concat([easing(1)]));
      }, timingStyle);
      render(_objectSpread({}, from, to, finalStyle));
    }
  };

  update = easing.isStepper ? stepperUpdate : timingUpdate; // return start animation method

  return function () {
    (0, _raf.default)(update); // return stop animation method

    return function () {
      (0, _raf.cancel)(cafId);
    };
  };
};

exports.default = _default;