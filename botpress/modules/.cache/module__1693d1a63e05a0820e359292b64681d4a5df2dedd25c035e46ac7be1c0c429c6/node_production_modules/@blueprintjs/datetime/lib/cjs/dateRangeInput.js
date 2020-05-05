"use strict";
/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
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
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var react_day_picker_1 = tslib_1.__importDefault(require("react-day-picker"));
var react_lifecycles_compat_1 = require("react-lifecycles-compat");
var core_1 = require("@blueprintjs/core");
var dateUtils_1 = require("./common/dateUtils");
var Errors = tslib_1.__importStar(require("./common/errors"));
var dateFormat_1 = require("./dateFormat");
var datePickerCore_1 = require("./datePickerCore");
var dateRangePicker_1 = require("./dateRangePicker");
var DateRangeInput = /** @class */ (function (_super) {
    tslib_1.__extends(DateRangeInput, _super);
    function DateRangeInput(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.refHandlers = {
            endInputRef: function (ref) {
                _this.endInputRef = ref;
                core_1.Utils.safeInvoke(_this.props.endInputProps.inputRef, ref);
            },
            startInputRef: function (ref) {
                _this.startInputRef = ref;
                core_1.Utils.safeInvoke(_this.props.startInputProps.inputRef, ref);
            },
        };
        _this.renderInputGroup = function (boundary) {
            var inputProps = _this.getInputProps(boundary);
            var handleInputEvent = boundary === core_1.Boundary.START ? _this.handleStartInputEvent : _this.handleEndInputEvent;
            return (React.createElement(core_1.InputGroup, tslib_1.__assign({ autoComplete: "off", disabled: inputProps.disabled || _this.props.disabled }, inputProps, { intent: _this.isInputInErrorState(boundary) ? core_1.Intent.DANGER : inputProps.intent, inputRef: _this.getInputRef(boundary), onBlur: handleInputEvent, onChange: handleInputEvent, onClick: handleInputEvent, onFocus: handleInputEvent, onKeyDown: handleInputEvent, onMouseDown: handleInputEvent, placeholder: _this.getInputPlaceholderString(boundary), value: _this.getInputDisplayString(boundary) })));
        };
        // Callbacks - DateRangePicker
        // ===========================
        _this.handleDateRangePickerChange = function (selectedRange, didSubmitWithEnter) {
            if (didSubmitWithEnter === void 0) { didSubmitWithEnter = false; }
            // ignore mouse events in the date-range picker if the popover is animating closed.
            if (!_this.state.isOpen) {
                return;
            }
            var selectedStart = selectedRange[0], selectedEnd = selectedRange[1];
            var isOpen = true;
            var isStartInputFocused;
            var isEndInputFocused;
            var startHoverString;
            var endHoverString;
            var boundaryToModify;
            if (selectedStart == null) {
                // focus the start field by default or if only an end date is specified
                if (_this.props.timePrecision == null) {
                    isStartInputFocused = true;
                    isEndInputFocused = false;
                }
                else {
                    isStartInputFocused = false;
                    isEndInputFocused = false;
                    boundaryToModify = core_1.Boundary.START;
                }
                // for clarity, hide the hover string until the mouse moves over a different date
                startHoverString = null;
            }
            else if (selectedEnd == null) {
                // focus the end field if a start date is specified
                if (_this.props.timePrecision == null) {
                    isStartInputFocused = false;
                    isEndInputFocused = true;
                }
                else {
                    isStartInputFocused = false;
                    isEndInputFocused = false;
                    boundaryToModify = core_1.Boundary.END;
                }
                endHoverString = null;
            }
            else if (_this.props.closeOnSelection) {
                isOpen = _this.getIsOpenValueWhenDateChanges(selectedStart, selectedEnd);
                isStartInputFocused = false;
                if (_this.props.timePrecision == null && didSubmitWithEnter) {
                    // if we submit via click or Tab, the focus will have moved already.
                    // it we submit with Enter, the focus won't have moved, and setting
                    // the flag to false won't have an effect anyway, so leave it true.
                    isEndInputFocused = true;
                }
                else {
                    isEndInputFocused = false;
                    boundaryToModify = core_1.Boundary.END;
                }
            }
            else if (_this.state.lastFocusedField === core_1.Boundary.START) {
                // keep the start field focused
                if (_this.props.timePrecision == null) {
                    isStartInputFocused = true;
                    isEndInputFocused = false;
                }
                else {
                    isStartInputFocused = false;
                    isEndInputFocused = false;
                    boundaryToModify = core_1.Boundary.START;
                }
            }
            else if (_this.props.timePrecision == null) {
                // keep the end field focused
                isStartInputFocused = false;
                isEndInputFocused = true;
            }
            else {
                isStartInputFocused = false;
                isEndInputFocused = false;
                boundaryToModify = core_1.Boundary.END;
            }
            var baseStateChange = {
                boundaryToModify: boundaryToModify,
                endHoverString: endHoverString,
                endInputString: _this.formatDate(selectedEnd),
                isEndInputFocused: isEndInputFocused,
                isOpen: isOpen,
                isStartInputFocused: isStartInputFocused,
                startHoverString: startHoverString,
                startInputString: _this.formatDate(selectedStart),
                wasLastFocusChangeDueToHover: false,
            };
            if (_this.isControlled()) {
                _this.setState(baseStateChange);
            }
            else {
                _this.setState(tslib_1.__assign({}, baseStateChange, { selectedEnd: selectedEnd, selectedStart: selectedStart }));
            }
            core_1.Utils.safeInvoke(_this.props.onChange, selectedRange);
        };
        _this.handleShortcutChange = function (_, selectedShortcutIndex) {
            _this.setState({ selectedShortcutIndex: selectedShortcutIndex });
        };
        _this.handleDateRangePickerHoverChange = function (hoveredRange, _hoveredDay, hoveredBoundary) {
            // ignore mouse events in the date-range picker if the popover is animating closed.
            if (!_this.state.isOpen) {
                return;
            }
            if (hoveredRange == null) {
                // undo whatever focus changes we made while hovering over various calendar dates
                var isEndInputFocused = _this.state.boundaryToModify === core_1.Boundary.END;
                _this.setState({
                    endHoverString: null,
                    isEndInputFocused: isEndInputFocused,
                    isStartInputFocused: !isEndInputFocused,
                    lastFocusedField: _this.state.boundaryToModify,
                    startHoverString: null,
                });
            }
            else {
                var hoveredStart = hoveredRange[0], hoveredEnd = hoveredRange[1];
                var isStartInputFocused = hoveredBoundary != null ? hoveredBoundary === core_1.Boundary.START : _this.state.isStartInputFocused;
                var isEndInputFocused = hoveredBoundary != null ? hoveredBoundary === core_1.Boundary.END : _this.state.isEndInputFocused;
                _this.setState({
                    endHoverString: _this.formatDate(hoveredEnd),
                    isEndInputFocused: isEndInputFocused,
                    isStartInputFocused: isStartInputFocused,
                    lastFocusedField: isStartInputFocused ? core_1.Boundary.START : core_1.Boundary.END,
                    shouldSelectAfterUpdate: _this.props.selectAllOnFocus,
                    startHoverString: _this.formatDate(hoveredStart),
                    wasLastFocusChangeDueToHover: true,
                });
            }
        };
        // Callbacks - Input
        // =================
        // instantiate these two functions once so we don't have to for each callback on each render.
        _this.handleStartInputEvent = function (e) {
            _this.handleInputEvent(e, core_1.Boundary.START);
        };
        _this.handleEndInputEvent = function (e) {
            _this.handleInputEvent(e, core_1.Boundary.END);
        };
        _this.handleInputEvent = function (e, boundary) {
            switch (e.type) {
                case "blur":
                    _this.handleInputBlur(e, boundary);
                    break;
                case "change":
                    _this.handleInputChange(e, boundary);
                    break;
                case "click":
                    _this.handleInputClick(e);
                    break;
                case "focus":
                    _this.handleInputFocus(e, boundary);
                    break;
                case "keydown":
                    _this.handleInputKeyDown(e);
                    break;
                case "mousedown":
                    _this.handleInputMouseDown();
                    break;
                default:
                    break;
            }
            var inputProps = _this.getInputProps(boundary);
            var callbackFn = _this.getInputGroupCallbackForEvent(e, inputProps);
            core_1.Utils.safeInvoke(callbackFn, e);
        };
        // add a keydown listener to persistently change focus when tabbing:
        // - if focused in start field, Tab moves focus to end field
        // - if focused in end field, Shift+Tab moves focus to start field
        _this.handleInputKeyDown = function (e) {
            var isTabPressed = e.which === core_1.Keys.TAB;
            var isEnterPressed = e.which === core_1.Keys.ENTER;
            var isShiftPressed = e.shiftKey;
            var _a = _this.state, selectedStart = _a.selectedStart, selectedEnd = _a.selectedEnd;
            // order of JS events is our enemy here. when tabbing between fields,
            // this handler will fire in the middle of a focus exchange when no
            // field is currently focused. we work around this by referring to the
            // most recently focused field, rather than the currently focused field.
            var wasStartFieldFocused = _this.state.lastFocusedField === core_1.Boundary.START;
            var wasEndFieldFocused = _this.state.lastFocusedField === core_1.Boundary.END;
            // move focus to the other field
            if (isTabPressed) {
                var isEndInputFocused = void 0;
                var isStartInputFocused = void 0;
                var isOpen = true;
                if (wasStartFieldFocused && !isShiftPressed) {
                    isStartInputFocused = false;
                    isEndInputFocused = true;
                    // prevent the default focus-change behavior to avoid race conditions;
                    // we'll handle the focus change ourselves in componentDidUpdate.
                    e.preventDefault();
                }
                else if (wasEndFieldFocused && isShiftPressed) {
                    isStartInputFocused = true;
                    isEndInputFocused = false;
                    e.preventDefault();
                }
                else {
                    // don't prevent default here, otherwise Tab won't do anything.
                    isStartInputFocused = false;
                    isEndInputFocused = false;
                    isOpen = false;
                }
                _this.setState({
                    isEndInputFocused: isEndInputFocused,
                    isOpen: isOpen,
                    isStartInputFocused: isStartInputFocused,
                    wasLastFocusChangeDueToHover: false,
                });
            }
            else if (wasStartFieldFocused && isEnterPressed) {
                var nextStartDate = _this.parseDate(_this.state.startInputString);
                _this.handleDateRangePickerChange([nextStartDate, selectedEnd], true);
            }
            else if (wasEndFieldFocused && isEnterPressed) {
                var nextEndDate = _this.parseDate(_this.state.endInputString);
                _this.handleDateRangePickerChange([selectedStart, nextEndDate], true);
            }
            else {
                // let the default keystroke happen without side effects
                return;
            }
        };
        _this.handleInputMouseDown = function () {
            // clicking in the field constitutes an explicit focus change. we update
            // the flag on "mousedown" instead of on "click", because it needs to be
            // set before onFocus is called ("click" triggers after "focus").
            _this.setState({ wasLastFocusChangeDueToHover: false });
        };
        _this.handleInputClick = function (e) {
            // unless we stop propagation on this event, a click within an input
            // will close the popover almost as soon as it opens.
            e.stopPropagation();
        };
        _this.handleInputFocus = function (_e, boundary) {
            var _a;
            var _b = _this.getStateKeysAndValuesForBoundary(boundary), keys = _b.keys, values = _b.values;
            var inputString = dateFormat_1.getFormattedDateString(values.selectedValue, _this.props, true);
            // change the boundary only if the user explicitly focused in the field.
            // focus changes from hovering don't count; they're just temporary.
            var boundaryToModify = _this.state.wasLastFocusChangeDueToHover ? _this.state.boundaryToModify : boundary;
            _this.setState((_a = {},
                _a[keys.inputString] = inputString,
                _a[keys.isInputFocused] = true,
                _a.boundaryToModify = boundaryToModify,
                _a.isOpen = true,
                _a.lastFocusedField = boundary,
                _a.shouldSelectAfterUpdate = _this.props.selectAllOnFocus,
                _a.wasLastFocusChangeDueToHover = false,
                _a));
        };
        _this.handleInputBlur = function (_e, boundary) {
            var _a, _b, _c, _d;
            var _f = _this.getStateKeysAndValuesForBoundary(boundary), keys = _f.keys, values = _f.values;
            var maybeNextDate = _this.parseDate(values.inputString);
            var isValueControlled = _this.isControlled();
            var nextState = (_a = {},
                _a[keys.isInputFocused] = false,
                _a.shouldSelectAfterUpdate = false,
                _a);
            if (_this.isInputEmpty(values.inputString)) {
                if (isValueControlled) {
                    nextState = tslib_1.__assign({}, nextState, (_b = {}, _b[keys.inputString] = dateFormat_1.getFormattedDateString(values.controlledValue, _this.props), _b));
                }
                else {
                    nextState = tslib_1.__assign({}, nextState, (_c = {}, _c[keys.inputString] = null, _c[keys.selectedValue] = null, _c));
                }
            }
            else if (!_this.isNextDateRangeValid(maybeNextDate, boundary)) {
                if (!isValueControlled) {
                    nextState = tslib_1.__assign({}, nextState, (_d = {}, _d[keys.inputString] = null, _d[keys.selectedValue] = maybeNextDate, _d));
                }
                core_1.Utils.safeInvoke(_this.props.onError, _this.getDateRangeForCallback(maybeNextDate, boundary));
            }
            _this.setState(nextState);
        };
        _this.handleInputChange = function (e, boundary) {
            var _a, _b, _c, _d, _f;
            var inputString = e.target.value;
            var keys = _this.getStateKeysAndValuesForBoundary(boundary).keys;
            var maybeNextDate = _this.parseDate(inputString);
            var isValueControlled = _this.isControlled();
            var nextState = { shouldSelectAfterUpdate: false };
            if (inputString.length === 0) {
                // this case will be relevant when we start showing the hovered range in the input
                // fields. goal is to show an empty field for clarity until the mouse moves over a
                // different date.
                var baseState = tslib_1.__assign({}, nextState, (_a = {}, _a[keys.inputString] = "", _a));
                if (isValueControlled) {
                    nextState = baseState;
                }
                else {
                    nextState = tslib_1.__assign({}, baseState, (_b = {}, _b[keys.selectedValue] = null, _b));
                }
                core_1.Utils.safeInvoke(_this.props.onChange, _this.getDateRangeForCallback(null, boundary));
            }
            else if (_this.isDateValidAndInRange(maybeNextDate)) {
                // note that error cases that depend on both fields (e.g. overlapping dates) should fall
                // through into this block so that the UI can update immediately, possibly with an error
                // message on the other field.
                // also, clear the hover string to ensure the most recent keystroke appears.
                var baseState = tslib_1.__assign({}, nextState, (_c = {}, _c[keys.hoverString] = null, _c[keys.inputString] = inputString, _c));
                if (isValueControlled) {
                    nextState = baseState;
                }
                else {
                    nextState = tslib_1.__assign({}, baseState, (_d = {}, _d[keys.selectedValue] = maybeNextDate, _d));
                }
                if (_this.isNextDateRangeValid(maybeNextDate, boundary)) {
                    core_1.Utils.safeInvoke(_this.props.onChange, _this.getDateRangeForCallback(maybeNextDate, boundary));
                }
            }
            else {
                // again, clear the hover string to ensure the most recent keystroke appears
                nextState = tslib_1.__assign({}, nextState, (_f = {}, _f[keys.inputString] = inputString, _f[keys.hoverString] = null, _f));
            }
            _this.setState(nextState);
        };
        // Callbacks - Popover
        // ===================
        _this.handlePopoverClose = function () {
            _this.setState({ isOpen: false });
            core_1.Utils.safeInvoke(_this.props.popoverProps.onClose);
        };
        _this.getIsOpenValueWhenDateChanges = function (nextSelectedStart, nextSelectedEnd) {
            if (_this.props.closeOnSelection) {
                // trivial case when TimePicker is not shown
                if (_this.props.timePrecision == null) {
                    return false;
                }
                var fallbackDate = new Date(new Date().setHours(0, 0, 0, 0));
                var _a = _this.getSelectedRange([fallbackDate, fallbackDate]), selectedStart = _a[0], selectedEnd = _a[1];
                // case to check if the user has changed TimePicker values
                if (dateUtils_1.areSameTime(selectedStart, nextSelectedStart) === true &&
                    dateUtils_1.areSameTime(selectedEnd, nextSelectedEnd) === true) {
                    return false;
                }
                return true;
            }
            return true;
        };
        _this.getInitialRange = function (props) {
            if (props === void 0) { props = _this.props; }
            var defaultValue = props.defaultValue, value = props.value;
            if (value != null) {
                return value;
            }
            else if (defaultValue != null) {
                return defaultValue;
            }
            else {
                return [null, null];
            }
        };
        _this.getSelectedRange = function (fallbackRange) {
            var _a;
            var selectedStart;
            var selectedEnd;
            if (_this.isControlled()) {
                _a = _this.props.value, selectedStart = _a[0], selectedEnd = _a[1];
            }
            else {
                selectedStart = _this.state.selectedStart;
                selectedEnd = _this.state.selectedEnd;
            }
            // this helper function checks if the provided boundary date *would* overlap the selected
            // other boundary date. providing the already-selected start date simply tells us if we're
            // currently in an overlapping state.
            var doBoundaryDatesOverlap = _this.doBoundaryDatesOverlap(selectedStart, core_1.Boundary.START);
            var dateRange = [selectedStart, doBoundaryDatesOverlap ? undefined : selectedEnd];
            return dateRange.map(function (selectedBound, index) {
                var fallbackDate = fallbackRange != null ? fallbackRange[index] : undefined;
                return _this.isDateValidAndInRange(selectedBound) ? selectedBound : fallbackDate;
            });
        };
        _this.getInputGroupCallbackForEvent = function (e, inputProps) {
            // use explicit switch cases to ensure callback function names remain grep-able in the codebase.
            switch (e.type) {
                case "blur":
                    return inputProps.onBlur;
                case "change":
                    return inputProps.onChange;
                case "click":
                    return inputProps.onClick;
                case "focus":
                    return inputProps.onFocus;
                case "keydown":
                    return inputProps.onKeyDown;
                case "mousedown":
                    return inputProps.onMouseDown;
                default:
                    return undefined;
            }
        };
        _this.getInputDisplayString = function (boundary) {
            var values = _this.getStateKeysAndValuesForBoundary(boundary).values;
            var isInputFocused = values.isInputFocused, inputString = values.inputString, selectedValue = values.selectedValue, hoverString = values.hoverString;
            if (hoverString != null) {
                return hoverString;
            }
            else if (isInputFocused) {
                return inputString == null ? "" : inputString;
            }
            else if (selectedValue == null) {
                return "";
            }
            else if (_this.doesEndBoundaryOverlapStartBoundary(selectedValue, boundary)) {
                return _this.props.overlappingDatesMessage;
            }
            else {
                return dateFormat_1.getFormattedDateString(selectedValue, _this.props);
            }
        };
        _this.getInputPlaceholderString = function (boundary) {
            var isStartBoundary = boundary === core_1.Boundary.START;
            var isEndBoundary = boundary === core_1.Boundary.END;
            var inputProps = _this.getInputProps(boundary);
            var isInputFocused = _this.getStateKeysAndValuesForBoundary(boundary).values.isInputFocused;
            // use the custom placeholder text for the input, if providied
            if (inputProps.placeholder != null) {
                return inputProps.placeholder;
            }
            else if (isStartBoundary) {
                return isInputFocused ? _this.state.formattedMinDateString : "Start date";
            }
            else if (isEndBoundary) {
                return isInputFocused ? _this.state.formattedMaxDateString : "End date";
            }
            else {
                return "";
            }
        };
        _this.getInputProps = function (boundary) {
            return boundary === core_1.Boundary.START ? _this.props.startInputProps : _this.props.endInputProps;
        };
        _this.getInputRef = function (boundary) {
            return boundary === core_1.Boundary.START ? _this.refHandlers.startInputRef : _this.refHandlers.endInputRef;
        };
        _this.getStateKeysAndValuesForBoundary = function (boundary) {
            var controlledRange = _this.props.value;
            if (boundary === core_1.Boundary.START) {
                return {
                    keys: {
                        hoverString: "startHoverString",
                        inputString: "startInputString",
                        isInputFocused: "isStartInputFocused",
                        selectedValue: "selectedStart",
                    },
                    values: {
                        controlledValue: controlledRange != null ? controlledRange[0] : undefined,
                        hoverString: _this.state.startHoverString,
                        inputString: _this.state.startInputString,
                        isInputFocused: _this.state.isStartInputFocused,
                        selectedValue: _this.state.selectedStart,
                    },
                };
            }
            else {
                return {
                    keys: {
                        hoverString: "endHoverString",
                        inputString: "endInputString",
                        isInputFocused: "isEndInputFocused",
                        selectedValue: "selectedEnd",
                    },
                    values: {
                        controlledValue: controlledRange != null ? controlledRange[1] : undefined,
                        hoverString: _this.state.endHoverString,
                        inputString: _this.state.endInputString,
                        isInputFocused: _this.state.isEndInputFocused,
                        selectedValue: _this.state.selectedEnd,
                    },
                };
            }
        };
        _this.getDateRangeForCallback = function (currDate, currBoundary) {
            var otherBoundary = _this.getOtherBoundary(currBoundary);
            var otherDate = _this.getStateKeysAndValuesForBoundary(otherBoundary).values.selectedValue;
            return currBoundary === core_1.Boundary.START ? [currDate, otherDate] : [otherDate, currDate];
        };
        _this.getOtherBoundary = function (boundary) {
            return boundary === core_1.Boundary.START ? core_1.Boundary.END : core_1.Boundary.START;
        };
        _this.doBoundaryDatesOverlap = function (date, boundary) {
            var allowSingleDayRange = _this.props.allowSingleDayRange;
            var otherBoundary = _this.getOtherBoundary(boundary);
            var otherBoundaryDate = _this.getStateKeysAndValuesForBoundary(otherBoundary).values.selectedValue;
            if (date == null || otherBoundaryDate == null) {
                return false;
            }
            if (boundary === core_1.Boundary.START) {
                var isAfter = react_day_picker_1.default.DateUtils.isDayAfter(date, otherBoundaryDate);
                return isAfter || (!allowSingleDayRange && react_day_picker_1.default.DateUtils.isSameDay(date, otherBoundaryDate));
            }
            else {
                var isBefore = react_day_picker_1.default.DateUtils.isDayBefore(date, otherBoundaryDate);
                return isBefore || (!allowSingleDayRange && react_day_picker_1.default.DateUtils.isSameDay(date, otherBoundaryDate));
            }
        };
        /**
         * Returns true if the provided boundary is an END boundary overlapping the
         * selected start date. (If the boundaries overlap, we consider the END
         * boundary to be erroneous.)
         */
        _this.doesEndBoundaryOverlapStartBoundary = function (boundaryDate, boundary) {
            return boundary === core_1.Boundary.START ? false : _this.doBoundaryDatesOverlap(boundaryDate, boundary);
        };
        _this.isControlled = function () { return _this.props.value !== undefined; };
        _this.isInputEmpty = function (inputString) { return inputString == null || inputString.length === 0; };
        _this.isInputInErrorState = function (boundary) {
            var values = _this.getStateKeysAndValuesForBoundary(boundary).values;
            var isInputFocused = values.isInputFocused, hoverString = values.hoverString, inputString = values.inputString, selectedValue = values.selectedValue;
            if (hoverString != null || _this.isInputEmpty(inputString)) {
                // don't show an error state while we're hovering over a valid date.
                return false;
            }
            var boundaryValue = isInputFocused ? _this.parseDate(inputString) : selectedValue;
            return (boundaryValue != null &&
                (!_this.isDateValidAndInRange(boundaryValue) ||
                    _this.doesEndBoundaryOverlapStartBoundary(boundaryValue, boundary)));
        };
        _this.isDateValidAndInRange = function (date) {
            return dateUtils_1.isDateValid(date) && dateUtils_1.isDayInRange(date, [_this.props.minDate, _this.props.maxDate]);
        };
        _this.reset(props);
        return _this;
    }
    DateRangeInput_1 = DateRangeInput;
    /**
     * Public method intended for unit testing only. Do not use in feature work!
     */
    DateRangeInput.prototype.reset = function (props) {
        if (props === void 0) { props = this.props; }
        var _a = this.getInitialRange(), selectedStart = _a[0], selectedEnd = _a[1];
        this.state = {
            formattedMaxDateString: this.getFormattedMinMaxDateString(props, "maxDate"),
            formattedMinDateString: this.getFormattedMinMaxDateString(props, "minDate"),
            isOpen: false,
            selectedEnd: selectedEnd,
            selectedShortcutIndex: -1,
            selectedStart: selectedStart,
        };
    };
    DateRangeInput.prototype.componentDidUpdate = function (prevProps, prevState, snapshot) {
        _super.prototype.componentDidUpdate.call(this, prevProps, prevState, snapshot);
        var _a = this.state, isStartInputFocused = _a.isStartInputFocused, isEndInputFocused = _a.isEndInputFocused, shouldSelectAfterUpdate = _a.shouldSelectAfterUpdate;
        var shouldFocusStartInput = this.shouldFocusInputRef(isStartInputFocused, this.startInputRef);
        var shouldFocusEndInput = this.shouldFocusInputRef(isEndInputFocused, this.endInputRef);
        if (shouldFocusStartInput) {
            this.startInputRef.focus();
        }
        else if (shouldFocusEndInput) {
            this.endInputRef.focus();
        }
        if (isStartInputFocused && shouldSelectAfterUpdate) {
            this.startInputRef.select();
        }
        else if (isEndInputFocused && shouldSelectAfterUpdate) {
            this.endInputRef.select();
        }
        var nextState = {};
        if (this.props.value !== prevProps.value) {
            var _b = this.getInitialRange(this.props), selectedStart = _b[0], selectedEnd = _b[1];
            nextState = tslib_1.__assign({}, nextState, { selectedStart: selectedStart, selectedEnd: selectedEnd });
        }
        // cache the formatted date strings to avoid computing on each render.
        if (this.props.minDate !== prevProps.minDate) {
            var formattedMinDateString = this.getFormattedMinMaxDateString(this.props, "minDate");
            nextState = tslib_1.__assign({}, nextState, { formattedMinDateString: formattedMinDateString });
        }
        if (this.props.maxDate !== prevProps.maxDate) {
            var formattedMaxDateString = this.getFormattedMinMaxDateString(this.props, "maxDate");
            nextState = tslib_1.__assign({}, nextState, { formattedMaxDateString: formattedMaxDateString });
        }
        this.setState(nextState);
    };
    DateRangeInput.prototype.render = function () {
        var selectedShortcutIndex = this.state.selectedShortcutIndex;
        var _a = this.props.popoverProps, popoverProps = _a === void 0 ? {} : _a;
        var popoverContent = (React.createElement(dateRangePicker_1.DateRangePicker, tslib_1.__assign({}, this.props, { selectedShortcutIndex: selectedShortcutIndex, boundaryToModify: this.state.boundaryToModify, onChange: this.handleDateRangePickerChange, onShortcutChange: this.handleShortcutChange, onHoverChange: this.handleDateRangePickerHoverChange, value: this.getSelectedRange() })));
        var popoverClassName = classnames_1.default(popoverProps.className, this.props.className);
        // allow custom props for the popover and each input group, but pass them in an order that
        // guarantees only some props are overridable.
        return (React.createElement(core_1.Popover, tslib_1.__assign({ isOpen: this.state.isOpen, position: core_1.Position.BOTTOM_LEFT }, this.props.popoverProps, { autoFocus: false, className: popoverClassName, content: popoverContent, enforceFocus: false, onClose: this.handlePopoverClose }),
            React.createElement("div", { className: core_1.Classes.CONTROL_GROUP },
                this.renderInputGroup(core_1.Boundary.START),
                this.renderInputGroup(core_1.Boundary.END))));
    };
    DateRangeInput.prototype.validateProps = function (props) {
        if (props.value === null) {
            throw new Error(Errors.DATERANGEINPUT_NULL_VALUE);
        }
    };
    // Helpers
    // =======
    DateRangeInput.prototype.shouldFocusInputRef = function (isFocused, inputRef) {
        return isFocused && inputRef !== undefined && document.activeElement !== inputRef;
    };
    DateRangeInput.prototype.isNextDateRangeValid = function (nextDate, boundary) {
        return this.isDateValidAndInRange(nextDate) && !this.doBoundaryDatesOverlap(nextDate, boundary);
    };
    // this is a slightly kludgy function, but it saves us a good amount of repeated code between
    // the constructor and componentDidUpdate.
    DateRangeInput.prototype.getFormattedMinMaxDateString = function (props, propName) {
        var date = props[propName];
        var defaultDate = DateRangeInput_1.defaultProps[propName];
        // default values are applied only if a prop is strictly `undefined`
        // See: https://facebook.github.io/react/docs/react-component.html#defaultprops
        return dateFormat_1.getFormattedDateString(date === undefined ? defaultDate : date, this.props);
    };
    DateRangeInput.prototype.parseDate = function (dateString) {
        if (dateString === this.props.outOfRangeMessage || dateString === this.props.invalidDateMessage) {
            return null;
        }
        var _a = this.props, locale = _a.locale, parseDate = _a.parseDate;
        var newDate = parseDate(dateString, locale);
        return newDate === false ? new Date(undefined) : newDate;
    };
    DateRangeInput.prototype.formatDate = function (date) {
        if (!this.isDateValidAndInRange(date)) {
            return "";
        }
        var _a = this.props, locale = _a.locale, formatDate = _a.formatDate;
        return formatDate(date, locale);
    };
    var DateRangeInput_1;
    DateRangeInput.defaultProps = {
        allowSingleDayRange: false,
        closeOnSelection: true,
        contiguousCalendarMonths: true,
        dayPickerProps: {},
        disabled: false,
        endInputProps: {},
        invalidDateMessage: "Invalid date",
        maxDate: datePickerCore_1.getDefaultMaxDate(),
        minDate: datePickerCore_1.getDefaultMinDate(),
        outOfRangeMessage: "Out of range",
        overlappingDatesMessage: "Overlapping dates",
        popoverProps: {},
        selectAllOnFocus: false,
        shortcuts: true,
        singleMonthOnly: false,
        startInputProps: {},
    };
    DateRangeInput.displayName = core_1.DISPLAYNAME_PREFIX + ".DateRangeInput";
    DateRangeInput = DateRangeInput_1 = tslib_1.__decorate([
        react_lifecycles_compat_1.polyfill
    ], DateRangeInput);
    return DateRangeInput;
}(core_1.AbstractPureComponent2));
exports.DateRangeInput = DateRangeInput;
//# sourceMappingURL=dateRangeInput.js.map