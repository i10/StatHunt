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
var react_day_picker_1 = tslib_1.__importDefault(require("react-day-picker"));
var react_lifecycles_compat_1 = require("react-lifecycles-compat");
var Classes = tslib_1.__importStar(require("./common/classes"));
var DateUtils = tslib_1.__importStar(require("./common/dateUtils"));
var Errors = tslib_1.__importStar(require("./common/errors"));
var datePickerCaption_1 = require("./datePickerCaption");
var datePickerCore_1 = require("./datePickerCore");
var datePickerNavbar_1 = require("./datePickerNavbar");
var shortcuts_1 = require("./shortcuts");
var timePicker_1 = require("./timePicker");
var DatePicker = /** @class */ (function (_super) {
    tslib_1.__extends(DatePicker, _super);
    function DatePicker(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.ignoreNextMonthChange = false;
        _this.isToday = function (date) { return DateUtils.areSameDay(date, new Date()); };
        _this.shouldHighlightCurrentDay = function (date) {
            var highlightCurrentDay = _this.props.highlightCurrentDay;
            return highlightCurrentDay && _this.isToday(date);
        };
        _this.getDatePickerModifiers = function () {
            var modifiers = _this.props.modifiers;
            return tslib_1.__assign({ isToday: _this.shouldHighlightCurrentDay }, modifiers);
        };
        _this.renderDay = function (day) {
            var date = day.getDate();
            return React.createElement("div", { className: Classes.DATEPICKER_DAY_WRAPPER }, date);
        };
        _this.disabledDays = function (day) { return !DateUtils.isDayInRange(day, [_this.props.minDate, _this.props.maxDate]); };
        _this.getDisabledDaysModifier = function () {
            var disabledDays = _this.props.dayPickerProps.disabledDays;
            return Array.isArray(disabledDays) ? [_this.disabledDays].concat(disabledDays) : [_this.disabledDays, disabledDays];
        };
        _this.renderCaption = function (props) { return (React.createElement(datePickerCaption_1.DatePickerCaption, tslib_1.__assign({}, props, { maxDate: _this.props.maxDate, minDate: _this.props.minDate, onDateChange: _this.handleMonthChange, reverseMonthAndYearMenus: _this.props.reverseMonthAndYearMenus }))); };
        _this.renderNavbar = function (props) { return (React.createElement(datePickerNavbar_1.DatePickerNavbar, tslib_1.__assign({}, props, { maxDate: _this.props.maxDate, minDate: _this.props.minDate }))); };
        _this.handleDayClick = function (day, modifiers, e) {
            core_1.Utils.safeInvoke(_this.props.dayPickerProps.onDayClick, day, modifiers, e);
            if (modifiers.disabled) {
                return;
            }
            _this.updateDay(day);
            // allow toggling selected date by clicking it again (if prop enabled)
            var newValue = _this.props.canClearSelection && modifiers.selected ? null : DateUtils.getDateTime(day, _this.state.value);
            _this.updateValue(newValue, true);
        };
        _this.handleShortcutClick = function (shortcut, selectedShortcutIndex) {
            var _a = _this.props, onShortcutChange = _a.onShortcutChange, currentShortcutIndex = _a.selectedShortcutIndex;
            var dateRange = shortcut.dateRange, includeTime = shortcut.includeTime;
            var newDate = dateRange[0];
            var newValue = includeTime ? newDate : DateUtils.getDateTime(newDate, _this.state.value);
            _this.updateDay(newDate);
            _this.updateValue(newValue, true);
            if (currentShortcutIndex === undefined) {
                _this.setState({ selectedShortcutIndex: selectedShortcutIndex });
            }
            var datePickerShortcut = tslib_1.__assign({}, shortcut, { date: shortcut.dateRange[0] });
            core_1.Utils.safeInvoke(onShortcutChange, datePickerShortcut, selectedShortcutIndex);
        };
        _this.updateDay = function (day) {
            if (_this.props.value === undefined) {
                // set now if uncontrolled, otherwise they'll be updated in `componentDidUpdate`
                _this.setState({
                    displayMonth: day.getMonth(),
                    displayYear: day.getFullYear(),
                    selectedDay: day.getDate(),
                });
            }
            if (_this.state.value != null && _this.state.value.getMonth() !== day.getMonth()) {
                _this.ignoreNextMonthChange = true;
            }
        };
        _this.handleClearClick = function () { return _this.updateValue(null, true); };
        _this.handleMonthChange = function (newDate) {
            var date = _this.computeValidDateInSpecifiedMonthYear(newDate.getFullYear(), newDate.getMonth());
            _this.setState({ displayMonth: date.getMonth(), displayYear: date.getFullYear() });
            if (_this.state.value !== null) {
                // if handleDayClick just got run (so this flag is set), then the
                // user selected a date in a new month, so don't invoke onChange a
                // second time
                _this.updateValue(date, false, _this.ignoreNextMonthChange);
                _this.ignoreNextMonthChange = false;
            }
            core_1.Utils.safeInvoke(_this.props.dayPickerProps.onMonthChange, date);
        };
        _this.handleTodayClick = function () {
            var value = new Date();
            var displayMonth = value.getMonth();
            var displayYear = value.getFullYear();
            var selectedDay = value.getDate();
            _this.setState({ displayMonth: displayMonth, displayYear: displayYear, selectedDay: selectedDay });
            _this.updateValue(value, true);
        };
        _this.handleTimeChange = function (time) {
            core_1.Utils.safeInvoke(_this.props.timePickerProps.onChange, time);
            var value = _this.state.value;
            var newValue = DateUtils.getDateTime(value != null ? value : new Date(), time);
            _this.updateValue(newValue, true);
        };
        var value = getInitialValue(props);
        var initialMonth = getInitialMonth(props, value);
        _this.state = {
            displayMonth: initialMonth.getMonth(),
            displayYear: initialMonth.getFullYear(),
            selectedDay: value == null ? null : value.getDate(),
            selectedShortcutIndex: _this.props.selectedShortcutIndex !== undefined ? _this.props.selectedShortcutIndex : -1,
            value: value,
        };
        return _this;
    }
    DatePicker_1 = DatePicker;
    DatePicker.prototype.render = function () {
        var _a = this.props, className = _a.className, dayPickerProps = _a.dayPickerProps, locale = _a.locale, localeUtils = _a.localeUtils, maxDate = _a.maxDate, minDate = _a.minDate, showActionsBar = _a.showActionsBar;
        var _b = this.state, displayMonth = _b.displayMonth, displayYear = _b.displayYear;
        return (React.createElement("div", { className: classnames_1.default(Classes.DATEPICKER, className) },
            this.maybeRenderShortcuts(),
            React.createElement("div", null,
                React.createElement(react_day_picker_1.default, tslib_1.__assign({ showOutsideDays: true, locale: locale, localeUtils: localeUtils, modifiers: this.getDatePickerModifiers() }, dayPickerProps, { canChangeMonth: true, captionElement: this.renderCaption, navbarElement: this.renderNavbar, disabledDays: this.getDisabledDaysModifier(), fromMonth: minDate, month: new Date(displayYear, displayMonth), onDayClick: this.handleDayClick, onMonthChange: this.handleMonthChange, selectedDays: this.state.value, toMonth: maxDate, renderDay: this.renderDay })),
                this.maybeRenderTimePicker(),
                showActionsBar && this.renderOptionsBar())));
    };
    DatePicker.prototype.componentDidUpdate = function (prevProps, prevState, snapshot) {
        _super.prototype.componentDidUpdate.call(this, prevProps, prevState, snapshot);
        var value = this.props.value;
        if (value === prevProps.value) {
            // no action needed
            return;
        }
        else if (value == null) {
            // clear the value
            this.setState({ value: value });
        }
        else {
            this.setState({
                displayMonth: value.getMonth(),
                displayYear: value.getFullYear(),
                selectedDay: value.getDate(),
                value: value,
            });
        }
        if (this.props.selectedShortcutIndex !== prevProps.selectedShortcutIndex) {
            this.setState({ selectedShortcutIndex: this.props.selectedShortcutIndex });
        }
    };
    DatePicker.prototype.validateProps = function (props) {
        var defaultValue = props.defaultValue, initialMonth = props.initialMonth, maxDate = props.maxDate, minDate = props.minDate, value = props.value;
        if (defaultValue != null && !DateUtils.isDayInRange(defaultValue, [minDate, maxDate])) {
            throw new Error(Errors.DATEPICKER_DEFAULT_VALUE_INVALID);
        }
        if (initialMonth != null && !DateUtils.isMonthInRange(initialMonth, [minDate, maxDate])) {
            throw new Error(Errors.DATEPICKER_INITIAL_MONTH_INVALID);
        }
        if (maxDate != null && minDate != null && maxDate < minDate && !DateUtils.areSameDay(maxDate, minDate)) {
            throw new Error(Errors.DATEPICKER_MAX_DATE_INVALID);
        }
        if (value != null && !DateUtils.isDayInRange(value, [minDate, maxDate])) {
            throw new Error(Errors.DATEPICKER_VALUE_INVALID);
        }
    };
    DatePicker.prototype.renderOptionsBar = function () {
        var _a = this.props, clearButtonText = _a.clearButtonText, todayButtonText = _a.todayButtonText;
        return [
            React.createElement(core_1.Divider, { key: "div" }),
            React.createElement("div", { className: Classes.DATEPICKER_FOOTER, key: "footer" },
                React.createElement(core_1.Button, { minimal: true, onClick: this.handleTodayClick, text: todayButtonText }),
                React.createElement(core_1.Button, { minimal: true, onClick: this.handleClearClick, text: clearButtonText })),
        ];
    };
    DatePicker.prototype.maybeRenderTimePicker = function () {
        var _a = this.props, timePrecision = _a.timePrecision, timePickerProps = _a.timePickerProps;
        if (timePrecision == null && timePickerProps === DatePicker_1.defaultProps.timePickerProps) {
            return null;
        }
        return (React.createElement(timePicker_1.TimePicker, tslib_1.__assign({ precision: timePrecision }, timePickerProps, { onChange: this.handleTimeChange, value: this.state.value })));
    };
    DatePicker.prototype.maybeRenderShortcuts = function () {
        var shortcuts = this.props.shortcuts;
        if (shortcuts == null || shortcuts === false) {
            return null;
        }
        var selectedShortcutIndex = this.state.selectedShortcutIndex;
        var _a = this.props, maxDate = _a.maxDate, minDate = _a.minDate, timePrecision = _a.timePrecision;
        // Reuse the existing date range shortcuts and only care about start date
        var dateRangeShortcuts = shortcuts === true
            ? true
            : shortcuts.map(function (shortcut) { return (tslib_1.__assign({}, shortcut, { dateRange: [shortcut.date, undefined] })); });
        return [
            React.createElement(shortcuts_1.Shortcuts, tslib_1.__assign({ key: "shortcuts" }, {
                allowSingleDayRange: true,
                maxDate: maxDate,
                minDate: minDate,
                selectedShortcutIndex: selectedShortcutIndex,
                shortcuts: dateRangeShortcuts,
                timePrecision: timePrecision,
            }, { onShortcutClick: this.handleShortcutClick, useSingleDateShortcuts: true })),
            React.createElement(core_1.Divider, { key: "div" }),
        ];
    };
    DatePicker.prototype.computeValidDateInSpecifiedMonthYear = function (displayYear, displayMonth) {
        var _a = this.props, minDate = _a.minDate, maxDate = _a.maxDate;
        var selectedDay = this.state.selectedDay;
        // month is 0-based, date is 1-based. date 0 is last day of previous month.
        var maxDaysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();
        var displayDate = selectedDay == null ? 1 : Math.min(selectedDay, maxDaysInMonth);
        // 12:00 matches the underlying react-day-picker timestamp behavior
        var value = DateUtils.getDateTime(new Date(displayYear, displayMonth, displayDate, 12), this.state.value);
        // clamp between min and max dates
        if (value < minDate) {
            return minDate;
        }
        else if (value > maxDate) {
            return maxDate;
        }
        return value;
    };
    /**
     * Update `value` by invoking `onChange` (always) and setting state (if uncontrolled).
     */
    DatePicker.prototype.updateValue = function (value, isUserChange, skipOnChange) {
        if (skipOnChange === void 0) { skipOnChange = false; }
        if (!skipOnChange) {
            core_1.Utils.safeInvoke(this.props.onChange, value, isUserChange);
        }
        if (this.props.value === undefined) {
            this.setState({ value: value });
        }
    };
    var DatePicker_1;
    DatePicker.defaultProps = {
        canClearSelection: true,
        clearButtonText: "Clear",
        dayPickerProps: {},
        highlightCurrentDay: false,
        maxDate: datePickerCore_1.getDefaultMaxDate(),
        minDate: datePickerCore_1.getDefaultMinDate(),
        reverseMonthAndYearMenus: false,
        shortcuts: false,
        showActionsBar: false,
        timePickerProps: {},
        todayButtonText: "Today",
    };
    DatePicker.displayName = core_1.DISPLAYNAME_PREFIX + ".DatePicker";
    DatePicker = DatePicker_1 = tslib_1.__decorate([
        react_lifecycles_compat_1.polyfill
    ], DatePicker);
    return DatePicker;
}(core_1.AbstractPureComponent2));
exports.DatePicker = DatePicker;
function getInitialValue(props) {
    // !== because `null` is a valid value (no date)
    if (props.value !== undefined) {
        return props.value;
    }
    if (props.defaultValue !== undefined) {
        return props.defaultValue;
    }
    return null;
}
function getInitialMonth(props, value) {
    var today = new Date();
    // != because we must have a real `Date` to begin the calendar on.
    if (props.initialMonth != null) {
        return props.initialMonth;
    }
    else if (value != null) {
        return value;
    }
    else if (DateUtils.isDayInRange(today, [props.minDate, props.maxDate])) {
        return today;
    }
    else {
        return DateUtils.getDateBetween([props.minDate, props.maxDate]);
    }
}
//# sourceMappingURL=datePicker.js.map