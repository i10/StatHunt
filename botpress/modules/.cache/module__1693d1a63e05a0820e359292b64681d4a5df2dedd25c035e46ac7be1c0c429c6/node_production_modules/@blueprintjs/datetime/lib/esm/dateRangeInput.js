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
import * as tslib_1 from "tslib";
import classNames from "classnames";
import * as React from "react";
import DayPicker from "react-day-picker";
import { polyfill } from "react-lifecycles-compat";
import { AbstractPureComponent2, Boundary, Classes, DISPLAYNAME_PREFIX, InputGroup, Intent, Keys, Popover, Position, Utils, } from "@blueprintjs/core";
import { areSameTime, isDateValid, isDayInRange } from "./common/dateUtils";
import * as Errors from "./common/errors";
import { getFormattedDateString } from "./dateFormat";
import { getDefaultMaxDate, getDefaultMinDate } from "./datePickerCore";
import { DateRangePicker } from "./dateRangePicker";
var DateRangeInput = /** @class */ (function (_super) {
    tslib_1.__extends(DateRangeInput, _super);
    function DateRangeInput(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.refHandlers = {
            endInputRef: function (ref) {
                _this.endInputRef = ref;
                Utils.safeInvoke(_this.props.endInputProps.inputRef, ref);
            },
            startInputRef: function (ref) {
                _this.startInputRef = ref;
                Utils.safeInvoke(_this.props.startInputProps.inputRef, ref);
            },
        };
        _this.renderInputGroup = function (boundary) {
            var inputProps = _this.getInputProps(boundary);
            var handleInputEvent = boundary === Boundary.START ? _this.handleStartInputEvent : _this.handleEndInputEvent;
            return (React.createElement(InputGroup, tslib_1.__assign({ autoComplete: "off", disabled: inputProps.disabled || _this.props.disabled }, inputProps, { intent: _this.isInputInErrorState(boundary) ? Intent.DANGER : inputProps.intent, inputRef: _this.getInputRef(boundary), onBlur: handleInputEvent, onChange: handleInputEvent, onClick: handleInputEvent, onFocus: handleInputEvent, onKeyDown: handleInputEvent, onMouseDown: handleInputEvent, placeholder: _this.getInputPlaceholderString(boundary), value: _this.getInputDisplayString(boundary) })));
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
                    boundaryToModify = Boundary.START;
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
                    boundaryToModify = Boundary.END;
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
                    boundaryToModify = Boundary.END;
                }
            }
            else if (_this.state.lastFocusedField === Boundary.START) {
                // keep the start field focused
                if (_this.props.timePrecision == null) {
                    isStartInputFocused = true;
                    isEndInputFocused = false;
                }
                else {
                    isStartInputFocused = false;
                    isEndInputFocused = false;
                    boundaryToModify = Boundary.START;
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
                boundaryToModify = Boundary.END;
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
            Utils.safeInvoke(_this.props.onChange, selectedRange);
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
                var isEndInputFocused = _this.state.boundaryToModify === Boundary.END;
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
                var isStartInputFocused = hoveredBoundary != null ? hoveredBoundary === Boundary.START : _this.state.isStartInputFocused;
                var isEndInputFocused = hoveredBoundary != null ? hoveredBoundary === Boundary.END : _this.state.isEndInputFocused;
                _this.setState({
                    endHoverString: _this.formatDate(hoveredEnd),
                    isEndInputFocused: isEndInputFocused,
                    isStartInputFocused: isStartInputFocused,
                    lastFocusedField: isStartInputFocused ? Boundary.START : Boundary.END,
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
            _this.handleInputEvent(e, Boundary.START);
        };
        _this.handleEndInputEvent = function (e) {
            _this.handleInputEvent(e, Boundary.END);
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
            Utils.safeInvoke(callbackFn, e);
        };
        // add a keydown listener to persistently change focus when tabbing:
        // - if focused in start field, Tab moves focus to end field
        // - if focused in end field, Shift+Tab moves focus to start field
        _this.handleInputKeyDown = function (e) {
            var isTabPressed = e.which === Keys.TAB;
            var isEnterPressed = e.which === Keys.ENTER;
            var isShiftPressed = e.shiftKey;
            var _a = _this.state, selectedStart = _a.selectedStart, selectedEnd = _a.selectedEnd;
            // order of JS events is our enemy here. when tabbing between fields,
            // this handler will fire in the middle of a focus exchange when no
            // field is currently focused. we work around this by referring to the
            // most recently focused field, rather than the currently focused field.
            var wasStartFieldFocused = _this.state.lastFocusedField === Boundary.START;
            var wasEndFieldFocused = _this.state.lastFocusedField === Boundary.END;
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
            var inputString = getFormattedDateString(values.selectedValue, _this.props, true);
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
                    nextState = tslib_1.__assign({}, nextState, (_b = {}, _b[keys.inputString] = getFormattedDateString(values.controlledValue, _this.props), _b));
                }
                else {
                    nextState = tslib_1.__assign({}, nextState, (_c = {}, _c[keys.inputString] = null, _c[keys.selectedValue] = null, _c));
                }
            }
            else if (!_this.isNextDateRangeValid(maybeNextDate, boundary)) {
                if (!isValueControlled) {
                    nextState = tslib_1.__assign({}, nextState, (_d = {}, _d[keys.inputString] = null, _d[keys.selectedValue] = maybeNextDate, _d));
                }
                Utils.safeInvoke(_this.props.onError, _this.getDateRangeForCallback(maybeNextDate, boundary));
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
                Utils.safeInvoke(_this.props.onChange, _this.getDateRangeForCallback(null, boundary));
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
                    Utils.safeInvoke(_this.props.onChange, _this.getDateRangeForCallback(maybeNextDate, boundary));
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
            Utils.safeInvoke(_this.props.popoverProps.onClose);
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
                if (areSameTime(selectedStart, nextSelectedStart) === true &&
                    areSameTime(selectedEnd, nextSelectedEnd) === true) {
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
            var doBoundaryDatesOverlap = _this.doBoundaryDatesOverlap(selectedStart, Boundary.START);
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
                return getFormattedDateString(selectedValue, _this.props);
            }
        };
        _this.getInputPlaceholderString = function (boundary) {
            var isStartBoundary = boundary === Boundary.START;
            var isEndBoundary = boundary === Boundary.END;
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
            return boundary === Boundary.START ? _this.props.startInputProps : _this.props.endInputProps;
        };
        _this.getInputRef = function (boundary) {
            return boundary === Boundary.START ? _this.refHandlers.startInputRef : _this.refHandlers.endInputRef;
        };
        _this.getStateKeysAndValuesForBoundary = function (boundary) {
            var controlledRange = _this.props.value;
            if (boundary === Boundary.START) {
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
            return currBoundary === Boundary.START ? [currDate, otherDate] : [otherDate, currDate];
        };
        _this.getOtherBoundary = function (boundary) {
            return boundary === Boundary.START ? Boundary.END : Boundary.START;
        };
        _this.doBoundaryDatesOverlap = function (date, boundary) {
            var allowSingleDayRange = _this.props.allowSingleDayRange;
            var otherBoundary = _this.getOtherBoundary(boundary);
            var otherBoundaryDate = _this.getStateKeysAndValuesForBoundary(otherBoundary).values.selectedValue;
            if (date == null || otherBoundaryDate == null) {
                return false;
            }
            if (boundary === Boundary.START) {
                var isAfter = DayPicker.DateUtils.isDayAfter(date, otherBoundaryDate);
                return isAfter || (!allowSingleDayRange && DayPicker.DateUtils.isSameDay(date, otherBoundaryDate));
            }
            else {
                var isBefore = DayPicker.DateUtils.isDayBefore(date, otherBoundaryDate);
                return isBefore || (!allowSingleDayRange && DayPicker.DateUtils.isSameDay(date, otherBoundaryDate));
            }
        };
        /**
         * Returns true if the provided boundary is an END boundary overlapping the
         * selected start date. (If the boundaries overlap, we consider the END
         * boundary to be erroneous.)
         */
        _this.doesEndBoundaryOverlapStartBoundary = function (boundaryDate, boundary) {
            return boundary === Boundary.START ? false : _this.doBoundaryDatesOverlap(boundaryDate, boundary);
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
            return isDateValid(date) && isDayInRange(date, [_this.props.minDate, _this.props.maxDate]);
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
        var popoverContent = (React.createElement(DateRangePicker, tslib_1.__assign({}, this.props, { selectedShortcutIndex: selectedShortcutIndex, boundaryToModify: this.state.boundaryToModify, onChange: this.handleDateRangePickerChange, onShortcutChange: this.handleShortcutChange, onHoverChange: this.handleDateRangePickerHoverChange, value: this.getSelectedRange() })));
        var popoverClassName = classNames(popoverProps.className, this.props.className);
        // allow custom props for the popover and each input group, but pass them in an order that
        // guarantees only some props are overridable.
        return (React.createElement(Popover, tslib_1.__assign({ isOpen: this.state.isOpen, position: Position.BOTTOM_LEFT }, this.props.popoverProps, { autoFocus: false, className: popoverClassName, content: popoverContent, enforceFocus: false, onClose: this.handlePopoverClose }),
            React.createElement("div", { className: Classes.CONTROL_GROUP },
                this.renderInputGroup(Boundary.START),
                this.renderInputGroup(Boundary.END))));
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
        return getFormattedDateString(date === undefined ? defaultDate : date, this.props);
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
        maxDate: getDefaultMaxDate(),
        minDate: getDefaultMinDate(),
        outOfRangeMessage: "Out of range",
        overlappingDatesMessage: "Overlapping dates",
        popoverProps: {},
        selectAllOnFocus: false,
        shortcuts: true,
        singleMonthOnly: false,
        startInputProps: {},
    };
    DateRangeInput.displayName = DISPLAYNAME_PREFIX + ".DateRangeInput";
    DateRangeInput = DateRangeInput_1 = tslib_1.__decorate([
        polyfill
    ], DateRangeInput);
    return DateRangeInput;
}(AbstractPureComponent2));
export { DateRangeInput };
//# sourceMappingURL=dateRangeInput.js.map