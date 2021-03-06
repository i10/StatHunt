"use strict";
/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@blueprintjs/core");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var Classes = tslib_1.__importStar(require("./common/classes"));
var DateUtils = tslib_1.__importStar(require("./common/dateUtils"));
var timeUnit_1 = require("./common/timeUnit");
var Utils = tslib_1.__importStar(require("./common/utils"));
exports.TimePrecision = {
    MILLISECOND: "millisecond",
    MINUTE: "minute",
    SECOND: "second",
};
var TimePicker = /** @class */ (function (_super) {
    tslib_1.__extends(TimePicker, _super);
    function TimePicker(props, context) {
        var _this = _super.call(this, props, context) || this;
        // begin method definitions: event handlers
        _this.getInputChangeHandler = function (unit) { return function (e) {
            var text = getStringValueFromInputEvent(e);
            switch (unit) {
                case timeUnit_1.TimeUnit.HOUR_12:
                case timeUnit_1.TimeUnit.HOUR_24:
                    _this.setState({ hourText: text });
                    break;
                case timeUnit_1.TimeUnit.MINUTE:
                    _this.setState({ minuteText: text });
                    break;
                case timeUnit_1.TimeUnit.SECOND:
                    _this.setState({ secondText: text });
                    break;
                case timeUnit_1.TimeUnit.MS:
                    _this.setState({ millisecondText: text });
                    break;
            }
        }; };
        _this.getInputBlurHandler = function (unit) { return function (e) {
            var text = getStringValueFromInputEvent(e);
            _this.updateTime(parseInt(text, 10), unit);
        }; };
        _this.getInputKeyDownHandler = function (unit) { return function (e) {
            var _a;
            handleKeyEvent(e, (_a = {},
                _a[core_1.Keys.ARROW_UP] = function () { return _this.incrementTime(unit); },
                _a[core_1.Keys.ARROW_DOWN] = function () { return _this.decrementTime(unit); },
                _a[core_1.Keys.ENTER] = function () {
                    e.currentTarget.blur();
                },
                _a));
        }; };
        _this.handleFocus = function (e) {
            if (_this.props.selectAllOnFocus) {
                e.currentTarget.select();
            }
        };
        _this.handleAmPmChange = function (e) {
            var isNextPm = e.currentTarget.value === "pm";
            if (isNextPm !== _this.state.isPm) {
                var hour_1 = DateUtils.convert24HourMeridiem(_this.state.value.getHours(), isNextPm);
                _this.setState({ isPm: isNextPm }, function () { return _this.updateTime(hour_1, timeUnit_1.TimeUnit.HOUR_24); });
            }
        };
        _this.incrementTime = function (unit) { return _this.shiftTime(unit, 1); };
        _this.decrementTime = function (unit) { return _this.shiftTime(unit, -1); };
        var value = props.minTime;
        if (props.value != null) {
            value = props.value;
        }
        else if (props.defaultValue != null) {
            value = props.defaultValue;
        }
        _this.state = _this.getFullStateFromValue(value, props.useAmPm);
        return _this;
    }
    TimePicker.prototype.render = function () {
        var _a;
        var shouldRenderMilliseconds = this.props.precision === exports.TimePrecision.MILLISECOND;
        var shouldRenderSeconds = shouldRenderMilliseconds || this.props.precision === exports.TimePrecision.SECOND;
        var hourUnit = this.props.useAmPm ? timeUnit_1.TimeUnit.HOUR_12 : timeUnit_1.TimeUnit.HOUR_24;
        var classes = classnames_1.default(Classes.TIMEPICKER, this.props.className, (_a = {},
            _a[core_1.Classes.DISABLED] = this.props.disabled,
            _a));
        /* tslint:disable:max-line-length */
        return (React.createElement("div", { className: classes },
            React.createElement("div", { className: Classes.TIMEPICKER_ARROW_ROW },
                this.maybeRenderArrowButton(true, hourUnit),
                this.maybeRenderArrowButton(true, timeUnit_1.TimeUnit.MINUTE),
                shouldRenderSeconds && this.maybeRenderArrowButton(true, timeUnit_1.TimeUnit.SECOND),
                shouldRenderMilliseconds && this.maybeRenderArrowButton(true, timeUnit_1.TimeUnit.MS)),
            React.createElement("div", { className: Classes.TIMEPICKER_INPUT_ROW },
                this.renderInput(Classes.TIMEPICKER_HOUR, hourUnit, this.state.hourText),
                this.renderDivider(),
                this.renderInput(Classes.TIMEPICKER_MINUTE, timeUnit_1.TimeUnit.MINUTE, this.state.minuteText),
                shouldRenderSeconds && this.renderDivider(),
                shouldRenderSeconds &&
                    this.renderInput(Classes.TIMEPICKER_SECOND, timeUnit_1.TimeUnit.SECOND, this.state.secondText),
                shouldRenderMilliseconds && this.renderDivider("."),
                shouldRenderMilliseconds &&
                    this.renderInput(Classes.TIMEPICKER_MILLISECOND, timeUnit_1.TimeUnit.MS, this.state.millisecondText)),
            this.maybeRenderAmPm(),
            React.createElement("div", { className: Classes.TIMEPICKER_ARROW_ROW },
                this.maybeRenderArrowButton(false, hourUnit),
                this.maybeRenderArrowButton(false, timeUnit_1.TimeUnit.MINUTE),
                shouldRenderSeconds && this.maybeRenderArrowButton(false, timeUnit_1.TimeUnit.SECOND),
                shouldRenderMilliseconds && this.maybeRenderArrowButton(false, timeUnit_1.TimeUnit.MS))));
        /* tslint:enable:max-line-length */
    };
    TimePicker.prototype.componentDidUpdate = function (prevProps) {
        var didMinTimeChange = prevProps.minTime !== this.props.minTime;
        var didMaxTimeChange = prevProps.maxTime !== this.props.maxTime;
        var didBoundsChange = didMinTimeChange || didMaxTimeChange;
        var didPropValueChange = prevProps.value !== this.props.value;
        var shouldStateUpdate = didMinTimeChange || didMaxTimeChange || didBoundsChange || didPropValueChange;
        var value = this.state.value;
        if (didBoundsChange) {
            value = DateUtils.getTimeInRange(this.state.value, this.props.minTime, this.props.maxTime);
        }
        if (this.props.value != null && !DateUtils.areSameTime(this.props.value, prevProps.value)) {
            value = this.props.value;
        }
        if (shouldStateUpdate) {
            this.setState(this.getFullStateFromValue(value, this.props.useAmPm));
        }
    };
    // begin method definitions: rendering
    TimePicker.prototype.maybeRenderArrowButton = function (isDirectionUp, timeUnit) {
        var _this = this;
        if (!this.props.showArrowButtons) {
            return null;
        }
        var classes = classnames_1.default(Classes.TIMEPICKER_ARROW_BUTTON, timeUnit_1.getTimeUnitClassName(timeUnit));
        var onClick = function () { return (isDirectionUp ? _this.incrementTime : _this.decrementTime)(timeUnit); };
        return (React.createElement("span", { className: classes, onClick: onClick },
            React.createElement(core_1.Icon, { icon: isDirectionUp ? "chevron-up" : "chevron-down" })));
    };
    TimePicker.prototype.renderDivider = function (text) {
        if (text === void 0) { text = ":"; }
        return React.createElement("span", { className: Classes.TIMEPICKER_DIVIDER_TEXT }, text);
    };
    TimePicker.prototype.renderInput = function (className, unit, value) {
        var _a;
        var isValid = timeUnit_1.isTimeUnitValid(unit, parseInt(value, 10));
        return (React.createElement("input", { className: classnames_1.default(Classes.TIMEPICKER_INPUT, (_a = {}, _a[core_1.Classes.intentClass(core_1.Intent.DANGER)] = !isValid, _a), className), onBlur: this.getInputBlurHandler(unit), onChange: this.getInputChangeHandler(unit), onFocus: this.handleFocus, onKeyDown: this.getInputKeyDownHandler(unit), value: value, disabled: this.props.disabled }));
    };
    TimePicker.prototype.maybeRenderAmPm = function () {
        if (!this.props.useAmPm) {
            return null;
        }
        return (React.createElement(core_1.HTMLSelect, { className: Classes.TIMEPICKER_AMPM_SELECT, disabled: this.props.disabled, onChange: this.handleAmPmChange, value: this.state.isPm ? "pm" : "am" },
            React.createElement("option", { value: "am" }, "AM"),
            React.createElement("option", { value: "pm" }, "PM")));
    };
    // begin method definitions: state modification
    /**
     * Generates a full ITimePickerState object with all text fields set to formatted strings based on value
     */
    TimePicker.prototype.getFullStateFromValue = function (value, useAmPm) {
        var timeInRange = DateUtils.getTimeInRange(value, this.props.minTime, this.props.maxTime);
        var hourUnit = useAmPm ? timeUnit_1.TimeUnit.HOUR_12 : timeUnit_1.TimeUnit.HOUR_24;
        /* tslint:disable:object-literal-sort-keys */
        return {
            hourText: formatTime(timeInRange.getHours(), hourUnit),
            minuteText: formatTime(timeInRange.getMinutes(), timeUnit_1.TimeUnit.MINUTE),
            secondText: formatTime(timeInRange.getSeconds(), timeUnit_1.TimeUnit.SECOND),
            millisecondText: formatTime(timeInRange.getMilliseconds(), timeUnit_1.TimeUnit.MS),
            value: timeInRange,
            isPm: DateUtils.getIsPmFrom24Hour(timeInRange.getHours()),
        };
        /* tslint:enable:object-literal-sort-keys */
    };
    TimePicker.prototype.shiftTime = function (unit, amount) {
        if (this.props.disabled) {
            return;
        }
        var newTime = timeUnit_1.getTimeUnit(unit, this.state.value) + amount;
        this.updateTime(timeUnit_1.wrapTimeAtUnit(unit, newTime), unit);
    };
    TimePicker.prototype.updateTime = function (time, unit) {
        var newValue = DateUtils.clone(this.state.value);
        if (timeUnit_1.isTimeUnitValid(unit, time)) {
            timeUnit_1.setTimeUnit(unit, time, newValue, this.state.isPm);
            if (DateUtils.isTimeInRange(newValue, this.props.minTime, this.props.maxTime)) {
                this.updateState({ value: newValue });
            }
            else {
                this.updateState(this.getFullStateFromValue(this.state.value, this.props.useAmPm));
            }
        }
        else {
            this.updateState(this.getFullStateFromValue(this.state.value, this.props.useAmPm));
        }
    };
    TimePicker.prototype.updateState = function (state) {
        var newState = state;
        var hasNewValue = newState.value != null && !DateUtils.areSameTime(newState.value, this.state.value);
        if (this.props.value == null) {
            // component is uncontrolled
            if (hasNewValue) {
                newState = this.getFullStateFromValue(newState.value, this.props.useAmPm);
            }
            this.setState(newState);
        }
        else {
            // component is controlled, and there's a new value
            // so set inputs' text based off of _old_ value and later fire onChange with new value
            if (hasNewValue) {
                this.setState(this.getFullStateFromValue(this.state.value, this.props.useAmPm));
            }
            else {
                // no new value, this means only text has changed (from user typing)
                // we want inputs to change, so update state with new text for the inputs
                // but don't change actual value
                this.setState(tslib_1.__assign({}, newState, { value: DateUtils.clone(this.state.value) }));
            }
        }
        if (hasNewValue) {
            core_1.Utils.safeInvoke(this.props.onChange, newState.value);
        }
    };
    TimePicker.defaultProps = {
        disabled: false,
        maxTime: timeUnit_1.getDefaultMaxTime(),
        minTime: timeUnit_1.getDefaultMinTime(),
        precision: exports.TimePrecision.MINUTE,
        selectAllOnFocus: false,
        showArrowButtons: false,
        useAmPm: false,
    };
    TimePicker.displayName = core_1.DISPLAYNAME_PREFIX + ".TimePicker";
    return TimePicker;
}(React.Component));
exports.TimePicker = TimePicker;
function formatTime(time, unit) {
    switch (unit) {
        case timeUnit_1.TimeUnit.HOUR_24:
            return time.toString();
        case timeUnit_1.TimeUnit.HOUR_12:
            return DateUtils.get12HourFrom24Hour(time).toString();
        case timeUnit_1.TimeUnit.MINUTE:
        case timeUnit_1.TimeUnit.SECOND:
            return Utils.padWithZeroes(time.toString(), 2);
        case timeUnit_1.TimeUnit.MS:
            return Utils.padWithZeroes(time.toString(), 3);
        default:
            throw Error("Invalid TimeUnit");
    }
}
function getStringValueFromInputEvent(e) {
    return e.target.value;
}
function handleKeyEvent(e, actions, preventDefault) {
    if (preventDefault === void 0) { preventDefault = true; }
    for (var _i = 0, _a = Object.keys(actions); _i < _a.length; _i++) {
        var k = _a[_i];
        var key = Number(k);
        if (e.which === key) {
            if (preventDefault) {
                e.preventDefault();
            }
            actions[key]();
        }
    }
}
//# sourceMappingURL=timePicker.js.map