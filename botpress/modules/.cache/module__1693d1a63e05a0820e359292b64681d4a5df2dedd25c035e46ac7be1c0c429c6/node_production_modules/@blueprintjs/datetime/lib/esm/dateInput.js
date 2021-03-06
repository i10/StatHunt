/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
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
import { polyfill } from "react-lifecycles-compat";
import { AbstractPureComponent2, DISPLAYNAME_PREFIX, InputGroup, Intent, Keys, Popover, Utils, } from "@blueprintjs/core";
import * as Classes from "./common/classes";
import { isDateValid, isDayInRange } from "./common/dateUtils";
import { getFormattedDateString } from "./dateFormat";
import { DatePicker } from "./datePicker";
import { getDefaultMaxDate, getDefaultMinDate } from "./datePickerCore";
var DateInput = /** @class */ (function (_super) {
    tslib_1.__extends(DateInput, _super);
    function DateInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isInputFocused: false,
            isOpen: false,
            value: _this.props.value !== undefined ? _this.props.value : _this.props.defaultValue,
            valueString: null,
        };
        _this.inputEl = null;
        _this.popoverContentEl = null;
        _this.lastElementInPopover = null;
        _this.inputRef = function (ref) {
            _this.inputEl = ref;
            var _a = _this.props.inputProps, inputProps = _a === void 0 ? {} : _a;
            Utils.safeInvoke(inputProps.inputRef, ref);
        };
        _this.handleClosePopover = function (e) {
            var _a = _this.props.popoverProps, popoverProps = _a === void 0 ? {} : _a;
            Utils.safeInvoke(popoverProps.onClose, e);
            _this.setState({ isOpen: false });
        };
        _this.handleDateChange = function (newDate, isUserChange, didSubmitWithEnter) {
            if (didSubmitWithEnter === void 0) { didSubmitWithEnter = false; }
            var prevDate = _this.state.value;
            // this change handler was triggered by a change in month, day, or (if
            // enabled) time. for UX purposes, we want to close the popover only if
            // the user explicitly clicked a day within the current month.
            var isOpen = !isUserChange ||
                !_this.props.closeOnSelection ||
                (prevDate != null && (_this.hasMonthChanged(prevDate, newDate) || _this.hasTimeChanged(prevDate, newDate)));
            // if selecting a date via click or Tab, the input will already be
            // blurred by now, so sync isInputFocused to false. if selecting via
            // Enter, setting isInputFocused to false won't do anything by itself,
            // plus we want the field to retain focus anyway.
            // (note: spelling out the ternary explicitly reads more clearly.)
            var isInputFocused = didSubmitWithEnter ? true : false;
            if (_this.props.value === undefined) {
                var valueString = getFormattedDateString(newDate, _this.props);
                _this.setState({ isInputFocused: isInputFocused, isOpen: isOpen, value: newDate, valueString: valueString });
            }
            else {
                _this.setState({ isInputFocused: isInputFocused, isOpen: isOpen });
            }
            Utils.safeInvoke(_this.props.onChange, newDate, isUserChange);
        };
        _this.handleInputFocus = function (e) {
            var valueString = _this.state.value == null ? "" : _this.formatDate(_this.state.value);
            _this.setState({ isInputFocused: true, isOpen: true, valueString: valueString });
            _this.safeInvokeInputProp("onFocus", e);
        };
        _this.handleInputClick = function (e) {
            // stop propagation to the Popover's internal handleTargetClick handler;
            // otherwise, the popover will flicker closed as soon as it opens.
            e.stopPropagation();
            _this.safeInvokeInputProp("onClick", e);
        };
        _this.handleInputChange = function (e) {
            var valueString = e.target.value;
            var value = _this.parseDate(valueString);
            if (isDateValid(value) && _this.isDateInRange(value)) {
                if (_this.props.value === undefined) {
                    _this.setState({ value: value, valueString: valueString });
                }
                else {
                    _this.setState({ valueString: valueString });
                }
                Utils.safeInvoke(_this.props.onChange, value, true);
            }
            else {
                if (valueString.length === 0) {
                    Utils.safeInvoke(_this.props.onChange, null, true);
                }
                _this.setState({ valueString: valueString });
            }
            _this.safeInvokeInputProp("onChange", e);
        };
        _this.handleInputBlur = function (e) {
            var valueString = _this.state.valueString;
            var date = _this.parseDate(valueString);
            if (valueString.length > 0 &&
                valueString !== getFormattedDateString(_this.state.value, _this.props) &&
                (!isDateValid(date) || !_this.isDateInRange(date))) {
                if (_this.props.value === undefined) {
                    _this.setState({ isInputFocused: false, value: date, valueString: null });
                }
                else {
                    _this.setState({ isInputFocused: false });
                }
                if (isNaN(date.valueOf())) {
                    Utils.safeInvoke(_this.props.onError, new Date(undefined));
                }
                else if (!_this.isDateInRange(date)) {
                    Utils.safeInvoke(_this.props.onError, date);
                }
                else {
                    Utils.safeInvoke(_this.props.onChange, date, true);
                }
            }
            else {
                if (valueString.length === 0) {
                    _this.setState({ isInputFocused: false, value: null, valueString: null });
                }
                else {
                    _this.setState({ isInputFocused: false });
                }
            }
            _this.registerPopoverBlurHandler();
            _this.safeInvokeInputProp("onBlur", e);
        };
        _this.handleInputKeyDown = function (e) {
            if (e.which === Keys.ENTER) {
                var nextDate = _this.parseDate(_this.state.valueString);
                _this.handleDateChange(nextDate, true, true);
            }
            else if (e.which === Keys.TAB) {
                _this.setState({ isOpen: false });
            }
            else if (e.which === Keys.ESCAPE) {
                _this.setState({ isOpen: false });
                _this.inputEl.blur();
            }
            _this.safeInvokeInputProp("onKeyDown", e);
        };
        // focus DOM event listener (not React event)
        _this.handlePopoverBlur = function (e) {
            var relatedTarget = e.relatedTarget;
            if (relatedTarget == null) {
                // Support IE11 (#2924)
                relatedTarget = document.activeElement;
            }
            // Beware: this.popoverContentEl is sometimes null under Chrome
            if (relatedTarget == null ||
                (_this.popoverContentEl != null && !_this.popoverContentEl.contains(relatedTarget))) {
                _this.handleClosePopover();
            }
            else if (relatedTarget != null) {
                _this.unregisterPopoverBlurHandler();
                _this.lastElementInPopover = relatedTarget;
                _this.lastElementInPopover.addEventListener("blur", _this.handlePopoverBlur);
            }
        };
        _this.registerPopoverBlurHandler = function () {
            if (_this.popoverContentEl != null) {
                // If current activeElement exists inside popover content, a month
                // change has triggered and this element should be lastTabbableElement
                var lastTabbableElement = _this.popoverContentEl.contains(document.activeElement)
                    ? document.activeElement
                    : undefined;
                // Popover contents are well structured, but the selector will need
                // to be updated if more focusable components are added in the future
                if (lastTabbableElement == null) {
                    var tabbableElements = _this.popoverContentEl.querySelectorAll("input, [tabindex]:not([tabindex='-1'])");
                    var numOfElements = tabbableElements.length;
                    if (numOfElements > 0) {
                        // Keep track of the last focusable element in popover and add
                        // a blur handler, so that when:
                        // * user tabs to the next element, popover closes
                        // * focus moves to element within popover, popover stays open
                        lastTabbableElement = tabbableElements[numOfElements - 1];
                    }
                }
                _this.unregisterPopoverBlurHandler();
                _this.lastElementInPopover = lastTabbableElement;
                _this.lastElementInPopover.addEventListener("blur", _this.handlePopoverBlur);
            }
        };
        _this.unregisterPopoverBlurHandler = function () {
            if (_this.lastElementInPopover != null) {
                _this.lastElementInPopover.removeEventListener("blur", _this.handlePopoverBlur);
            }
        };
        _this.handleShortcutChange = function (_, selectedShortcutIndex) {
            _this.setState({ selectedShortcutIndex: selectedShortcutIndex });
        };
        return _this;
    }
    DateInput.prototype.componentWillUnmount = function () {
        _super.prototype.componentWillUnmount.call(this);
        this.unregisterPopoverBlurHandler();
    };
    DateInput.prototype.render = function () {
        var _this = this;
        var _a = this.state, value = _a.value, valueString = _a.valueString;
        var dateString = this.state.isInputFocused ? valueString : getFormattedDateString(value, this.props);
        var dateValue = isDateValid(value) ? value : null;
        var dayPickerProps = tslib_1.__assign({}, this.props.dayPickerProps, { 
            // dom elements for the updated month is not available when
            // onMonthChange is called. setTimeout is necessary to wait
            // for the updated month to be rendered
            onMonthChange: function (month) {
                Utils.safeInvoke(_this.props.dayPickerProps.onMonthChange, month);
                _this.setTimeout(_this.registerPopoverBlurHandler);
            } });
        var wrappedPopoverContent = (React.createElement("div", { ref: function (ref) { return (_this.popoverContentEl = ref); } },
            React.createElement(DatePicker, tslib_1.__assign({}, this.props, { dayPickerProps: dayPickerProps, onChange: this.handleDateChange, value: dateValue, onShortcutChange: this.handleShortcutChange, selectedShortcutIndex: this.state.selectedShortcutIndex }))));
        // assign default empty object here to prevent mutation
        var _b = this.props, _c = _b.inputProps, inputProps = _c === void 0 ? {} : _c, _d = _b.popoverProps, popoverProps = _d === void 0 ? {} : _d;
        var isErrorState = value != null && (!isDateValid(value) || !this.isDateInRange(value));
        return (React.createElement(Popover, tslib_1.__assign({ isOpen: this.state.isOpen && !this.props.disabled, fill: this.props.fill }, popoverProps, { autoFocus: false, className: classNames(popoverProps.className, this.props.className), content: wrappedPopoverContent, enforceFocus: false, onClose: this.handleClosePopover, popoverClassName: classNames(Classes.DATEINPUT_POPOVER, popoverProps.popoverClassName) }),
            React.createElement(InputGroup, tslib_1.__assign({ autoComplete: "off", intent: isErrorState ? Intent.DANGER : Intent.NONE, placeholder: this.props.placeholder, rightElement: this.props.rightElement, type: "text" }, inputProps, { disabled: this.props.disabled, inputRef: this.inputRef, onBlur: this.handleInputBlur, onChange: this.handleInputChange, onClick: this.handleInputClick, onFocus: this.handleInputFocus, onKeyDown: this.handleInputKeyDown, value: dateString }))));
    };
    DateInput.prototype.componentDidUpdate = function (prevProps, prevState, snapshot) {
        _super.prototype.componentDidUpdate.call(this, prevProps, prevState, snapshot);
        if (prevProps.value !== this.props.value) {
            this.setState({ value: this.props.value });
        }
    };
    DateInput.prototype.isDateInRange = function (value) {
        return isDayInRange(value, [this.props.minDate, this.props.maxDate]);
    };
    DateInput.prototype.hasMonthChanged = function (prevDate, nextDate) {
        return (prevDate == null) !== (nextDate == null) || nextDate.getMonth() !== prevDate.getMonth();
    };
    DateInput.prototype.hasTimeChanged = function (prevDate, nextDate) {
        if (this.props.timePrecision == null) {
            return false;
        }
        return ((prevDate == null) !== (nextDate == null) ||
            nextDate.getHours() !== prevDate.getHours() ||
            nextDate.getMinutes() !== prevDate.getMinutes() ||
            nextDate.getSeconds() !== prevDate.getSeconds() ||
            nextDate.getMilliseconds() !== prevDate.getMilliseconds());
    };
    /** safe wrapper around invoking input props event handler (prop defaults to undefined) */
    DateInput.prototype.safeInvokeInputProp = function (name, e) {
        var _a = this.props.inputProps, inputProps = _a === void 0 ? {} : _a;
        Utils.safeInvoke(inputProps[name], e);
    };
    DateInput.prototype.parseDate = function (dateString) {
        if (dateString === this.props.outOfRangeMessage || dateString === this.props.invalidDateMessage) {
            return null;
        }
        var _a = this.props, locale = _a.locale, parseDate = _a.parseDate;
        var newDate = parseDate(dateString, locale);
        return newDate === false ? new Date(undefined) : newDate;
    };
    DateInput.prototype.formatDate = function (date) {
        if (!isDateValid(date) || !this.isDateInRange(date)) {
            return "";
        }
        var _a = this.props, locale = _a.locale, formatDate = _a.formatDate;
        return formatDate(date, locale);
    };
    DateInput.displayName = DISPLAYNAME_PREFIX + ".DateInput";
    DateInput.defaultProps = {
        closeOnSelection: true,
        dayPickerProps: {},
        disabled: false,
        invalidDateMessage: "Invalid date",
        maxDate: getDefaultMaxDate(),
        minDate: getDefaultMinDate(),
        outOfRangeMessage: "Out of range",
        reverseMonthAndYearMenus: false,
    };
    DateInput = tslib_1.__decorate([
        polyfill
    ], DateInput);
    return DateInput;
}(AbstractPureComponent2));
export { DateInput };
//# sourceMappingURL=dateInput.js.map