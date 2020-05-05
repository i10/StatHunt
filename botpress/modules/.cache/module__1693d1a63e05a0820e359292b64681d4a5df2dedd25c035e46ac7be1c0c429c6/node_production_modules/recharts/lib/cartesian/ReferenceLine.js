"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _some2 = _interopRequireDefault(require("lodash/some"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Layer = _interopRequireDefault(require("../container/Layer"));

var _Label = _interopRequireDefault(require("../component/Label"));

var _IfOverflowMatches = require("../util/IfOverflowMatches");

var _DataUtils = require("../util/DataUtils");

var _CartesianUtils = require("../util/CartesianUtils");

var _LogUtils = require("../util/LogUtils");

var _types = require("../util/types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var renderLine = function renderLine(option, props) {
  var line;

  if (_react["default"].isValidElement(option)) {
    line = _react["default"].cloneElement(option, props);
  } else if ((0, _isFunction2["default"])(option)) {
    line = option(props);
  } else {
    line = _react["default"].createElement("line", _extends({}, props, {
      className: "recharts-reference-line-line"
    }));
  }

  return line;
}; // TODO: ScaleHelper


var getEndPoints = function getEndPoints(scales, isFixedX, isFixedY, isSegment, props) {
  var _props$viewBox = props.viewBox,
      x = _props$viewBox.x,
      y = _props$viewBox.y,
      width = _props$viewBox.width,
      height = _props$viewBox.height,
      position = props.position;

  if (isFixedY) {
    var yCoord = props.y,
        orientation = props.yAxis.orientation;
    var coord = scales.y.apply(yCoord, {
      position: position
    });

    if ((0, _IfOverflowMatches.ifOverflowMatches)(props, 'discard') && !scales.y.isInRange(coord)) {
      return null;
    }

    var points = [{
      x: x + width,
      y: coord
    }, {
      x: x,
      y: coord
    }];
    return orientation === 'left' ? points.reverse() : points;
  }

  if (isFixedX) {
    var xCoord = props.x,
        _orientation = props.xAxis.orientation;

    var _coord = scales.x.apply(xCoord, {
      position: position
    });

    if ((0, _IfOverflowMatches.ifOverflowMatches)(props, 'discard') && !scales.x.isInRange(_coord)) {
      return null;
    }

    var _points = [{
      x: _coord,
      y: y + height
    }, {
      x: _coord,
      y: y
    }];
    return _orientation === 'top' ? _points.reverse() : _points;
  }

  if (isSegment) {
    var segment = props.segment;

    var _points2 = segment.map(function (p) {
      return scales.apply(p, {
        position: position
      });
    });

    if ((0, _IfOverflowMatches.ifOverflowMatches)(props, 'discard') && (0, _some2["default"])(_points2, function (p) {
      return !scales.isInRange(p);
    })) {
      return null;
    }

    return _points2;
  }

  return null;
};

function ReferenceLine(props) {
  var fixedX = props.x,
      fixedY = props.y,
      segment = props.segment,
      xAxis = props.xAxis,
      yAxis = props.yAxis,
      shape = props.shape,
      className = props.className,
      alwaysShow = props.alwaysShow,
      clipPathId = props.clipPathId;
  (0, _LogUtils.warn)(alwaysShow === undefined, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
  var scales = (0, _CartesianUtils.createLabeldScales)({
    x: xAxis.scale,
    y: yAxis.scale
  });
  var isX = (0, _DataUtils.isNumOrStr)(fixedX);
  var isY = (0, _DataUtils.isNumOrStr)(fixedY);
  var isSegment = segment && segment.length === 2;
  var endPoints = getEndPoints(scales, isX, isY, isSegment, props);

  if (!endPoints) {
    return null;
  }

  var _endPoints = _slicedToArray(endPoints, 2),
      _endPoints$ = _endPoints[0],
      x1 = _endPoints$.x,
      y1 = _endPoints$.y,
      _endPoints$2 = _endPoints[1],
      x2 = _endPoints$2.x,
      y2 = _endPoints$2.y;

  var clipPath = (0, _IfOverflowMatches.ifOverflowMatches)(props, 'hidden') ? "url(#".concat(clipPathId, ")") : undefined;

  var lineProps = _objectSpread({
    clipPath: clipPath
  }, (0, _types.filterProps)(props, true), {
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2
  });

  return _react["default"].createElement(_Layer["default"], {
    className: (0, _classnames["default"])('recharts-reference-line', className)
  }, renderLine(shape, lineProps), _Label["default"].renderCallByParent(props, (0, _CartesianUtils.rectWithCoords)({
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2
  })));
}

ReferenceLine.displayName = 'ReferenceLine';
ReferenceLine.defaultProps = {
  isFront: false,
  ifOverflow: 'discard',
  xAxisId: 0,
  yAxisId: 0,
  fill: 'none',
  stroke: '#ccc',
  fillOpacity: 1,
  strokeWidth: 1,
  position: 'middle'
};
var _default = ReferenceLine;
exports["default"] = _default;