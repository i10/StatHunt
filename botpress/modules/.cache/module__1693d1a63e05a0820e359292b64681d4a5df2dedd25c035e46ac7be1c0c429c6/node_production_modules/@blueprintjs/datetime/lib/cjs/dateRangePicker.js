"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@blueprintjs/core");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var react_day_picker_1 = tslib_1.__importDefault(require("react-day-picker"));
var react_lifecycles_compat_1 = require("react-lifecycles-compat");
var DateClasses = tslib_1.__importStar(require("./common/classes"));
var DateUtils = tslib_1.__importStar(require("./common/dateUtils"));
var Errors = tslib_1.__importStar(require("./common/errors"));
var monthAndYear_1 = require("./common/monthAndYear");
var datePickerCaption_1 = require("./datePickerCaption");
var datePickerCore_1 = require("./datePickerCore");
var datePickerNavbar_1 = require("./datePickerNavbar");
var dateRangeSelectionStrategy_1 = require("./dateRangeSelectionStrategy");
var shortcuts_1 = require("./shortcuts");
var timePicker_1 = require("./timePicker");
var DateRangePicker = /** @class */ (function (_super) {
    tslib_1.__extends(DateRangePicker, _super);
    function DateRangePicker(props, context) {
        var _a;
        var _this = _super.call(this, props, context) || this;
        // these will get merged with the user's own
        _this.modifiers = (_a = {},
            _a[datePickerCore_1.SELECTED_RANGE_MODIFIER] = function (day) {
                var value = _this.state.value;
                return value[0] != null && value[1] != null && DateUtils.isDayInRange(day, value, true);
            },
            _a[datePickerCore_1.SELECTED_RANGE_MODIFIER + "-start"] = function (day) { return DateUtils.areSameDay(_this.state.value[0], day); },
            _a[datePickerCore_1.SELECTED_RANGE_MODIFIER + "-end"] = function (day) { return DateUtils.areSameDay(_this.state.value[1], day); },
            _a[datePickerCore_1.HOVERED_RANGE_MODIFIER] = function (day) {
                var _a = _this.state, hoverValue = _a.hoverValue, _b = _a.value, selectedStart = _b[0], selectedEnd = _b[1];
                if (selectedStart == null && selectedEnd == null) {
                    return false;
                }
                if (hoverValue == null || hoverValue[0] == null || hoverValue[1] == null) {
                    return false;
                }
                return DateUtils.isDayInRange(day, hoverValue, true);
            },
            _a[datePickerCore_1.HOVERED_RANGE_MODIFIER + "-start"] = function (day) {
                var hoverValue = _this.state.hoverValue;
                if (hoverValue == null || hoverValue[0] == null) {
                    return false;
                }
                return DateUtils.areSameDay(hoverValue[0], day);
            },
            _a[datePickerCore_1.HOVERED_RANGE_MODIFIER + "-end"] = function (day) {
                var hoverValue = _this.state.hoverValue;
                if (hoverValue == null || hoverValue[1] == null) {
                    return false;
                }
                return DateUtils.areSameDay(hoverValue[1], day);
            },
            _a);
        _this.disabledDays = function (day) { return !DateUtils.isDayInRange(day, [_this.props.minDate, _this.props.maxDate]); };
        _this.getDisabledDaysModifier = function () {
            var disabledDays = _this.props.dayPickerProps.disabledDays;
            return disabledDays instanceof Array ? [_this.disabledDays].concat(disabledDays) : [_this.disabledDays, disabledDays];
        };
        _this.handleTimeChange = function (newTime, dateIndex) {
            core_1.Utils.safeInvoke(_this.props.timePickerProps.onChange, newTime);
            var _a = _this.state, value = _a.value, time = _a.time;
            var newValue = DateUtils.getDateTime(value[dateIndex] != null ? DateUtils.clone(value[dateIndex]) : new Date(), newTime);
            var newDateRange = [value[0], value[1]];
            newDateRange[dateIndex] = newValue;
            var newTimeRange = [time[0], time[1]];
            newTimeRange[dateIndex] = newTime;
            core_1.Utils.safeInvoke(_this.props.onChange, newDateRange);
            _this.setState({ value: newDateRange, time: newTimeRange });
        };
        _this.handleTimeChangeLeftCalendar = function (time) {
            _this.handleTimeChange(time, 0);
        };
        _this.handleTimeChangeRightCalendar = function (time) {
            _this.handleTimeChange(time, 1);
        };
        _this.renderSingleNavbar = function (navbarProps) { return (React.createElement(datePickerNavbar_1.DatePickerNavbar, tslib_1.__assign({}, navbarProps, { maxDate: _this.props.maxDate, minDate: _this.props.minDate }))); };
        _this.renderLeftNavbar = function (navbarProps) { return (React.createElement(datePickerNavbar_1.DatePickerNavbar, tslib_1.__assign({}, navbarProps, { hideRightNavButton: _this.props.contiguousCalendarMonths, maxDate: _this.props.maxDate, minDate: _this.props.minDate }))); };
        _this.renderRightNavbar = function (navbarProps) { return (React.createElement(datePickerNavbar_1.DatePickerNavbar, tslib_1.__assign({}, navbarProps, { hideLeftNavButton: _this.props.contiguousCalendarMonths, maxDate: _this.props.maxDate, minDate: _this.props.minDate }))); };
        _this.renderSingleCaption = function (captionProps) { return (React.createElement(datePickerCaption_1.DatePickerCaption, tslib_1.__assign({}, captionProps, { maxDate: _this.props.maxDate, minDate: _this.props.minDate, onMonthChange: _this.handleLeftMonthSelectChange, onYearChange: _this.handleLeftYearSelectChange, reverseMonthAndYearMenus: _this.props.reverseMonthAndYearMenus }))); };
        _this.renderLeftCaption = function (captionProps) { return (React.createElement(datePickerCaption_1.DatePickerCaption, tslib_1.__assign({}, captionProps, { maxDate: DateUtils.getDatePreviousMonth(_this.props.maxDate), minDate: _this.props.minDate, onMonthChange: _this.handleLeftMonthSelectChange, onYearChange: _this.handleLeftYearSelectChange, reverseMonthAndYearMenus: _this.props.reverseMonthAndYearMenus }))); };
        _this.renderRightCaption = function (captionProps) { return (React.createElement(datePickerCaption_1.DatePickerCaption, tslib_1.__assign({}, captionProps, { maxDate: _this.props.maxDate, minDate: DateUtils.getDateNextMonth(_this.props.minDate), onMonthChange: _this.handleRightMonthSelectChange, onYearChange: _this.handleRightYearSelectChange, reverseMonthAndYearMenus: _this.props.reverseMonthAndYearMenus }))); };
        _this.handleDayMouseEnter = function (day, modifiers, e) {
            core_1.Utils.safeInvoke(_this.props.dayPickerProps.onDayMouseEnter, day, modifiers, e);
            if (modifiers.disabled) {
                return;
            }
            var _a = dateRangeSelectionStrategy_1.DateRangeSelectionStrategy.getNextState(_this.state.value, day, _this.props.allowSingleDayRange, _this.props.boundaryToModify), dateRange = _a.dateRange, boundary = _a.boundary;
            _this.setState({ hoverValue: dateRange });
            core_1.Utils.safeInvoke(_this.props.onHoverChange, dateRange, day, boundary);
        };
        _this.handleDayMouseLeave = function (day, modifiers, e) {
            core_1.Utils.safeInvoke(_this.props.dayPickerProps.onDayMouseLeave, day, modifiers, e);
            if (modifiers.disabled) {
                return;
            }
            _this.setState({ hoverValue: undefined });
            core_1.Utils.safeInvoke(_this.props.onHoverChange, undefined, day, undefined);
        };
        _this.handleDayClick = function (day, modifiers, e) {
            core_1.Utils.safeInvoke(_this.props.dayPickerProps.onDayClick, day, modifiers, e);
            if (modifiers.disabled) {
                // rerender base component to get around bug where you can navigate past bounds by clicking days
                _this.forceUpdate();
                return;
            }
            var nextValue = dateRangeSelectionStrategy_1.DateRangeSelectionStrategy.getNextState(_this.state.value, day, _this.props.allowSingleDayRange, _this.props.boundaryToModify).dateRange;
            // update the hovered date range after click to show the newly selected
            // state, at leasts until the mouse moves again
            _this.handleDayMouseEnter(day, modifiers, e);
            _this.handleNextState(nextValue);
        };
        _this.handleShortcutClick = function (shortcut, selectedShortcutIndex) {
            var _a = _this.props, onChange = _a.onChange, contiguousCalendarMonths = _a.contiguousCalendarMonths, onShortcutChange = _a.onShortcutChange;
            var dateRange = shortcut.dateRange, includeTime = shortcut.includeTime;
            if (includeTime) {
                var newDateRange = [dateRange[0], dateRange[1]];
                var newTimeRange = [dateRange[0], dateRange[1]];
                var nextState = getStateChange(_this.state.value, dateRange, _this.state, contiguousCalendarMonths);
                _this.setState(tslib_1.__assign({}, nextState, { time: newTimeRange }));
                core_1.Utils.safeInvoke(onChange, newDateRange);
            }
            else {
                _this.handleNextState(dateRange);
            }
            if (_this.props.selectedShortcutIndex === undefined) {
                _this.setState({ selectedShortcutIndex: selectedShortcutIndex });
            }
            core_1.Utils.safeInvoke(onShortcutChange, shortcut, selectedShortcutIndex);
        };
        _this.handleNextState = function (nextValue) {
            var value = _this.state.value;
            nextValue[0] = DateUtils.getDateTime(nextValue[0], _this.state.time[0]);
            nextValue[1] = DateUtils.getDateTime(nextValue[1], _this.state.time[1]);
            var nextState = getStateChange(value, nextValue, _this.state, _this.props.contiguousCalendarMonths);
            if (_this.props.value == null) {
                _this.setState(nextState);
            }
            core_1.Utils.safeInvoke(_this.props.onChange, nextValue);
        };
        _this.handleLeftMonthChange = function (newDate) {
            var leftView = monthAndYear_1.MonthAndYear.fromDate(newDate);
            core_1.Utils.safeInvoke(_this.props.dayPickerProps.onMonthChange, leftView.getFullDate());
            _this.updateLeftView(leftView);
        };
        _this.handleRightMonthChange = function (newDate) {
            var rightView = monthAndYear_1.MonthAndYear.fromDate(newDate);
            core_1.Utils.safeInvoke(_this.props.dayPickerProps.onMonthChange, rightView.getFullDate());
            _this.updateRightView(rightView);
        };
        _this.handleLeftMonthSelectChange = function (leftMonth) {
            var leftView = new monthAndYear_1.MonthAndYear(leftMonth, _this.state.leftView.getYear());
            core_1.Utils.safeInvoke(_this.props.dayPickerProps.onMonthChange, leftView.getFullDate());
            _this.updateLeftView(leftView);
        };
        _this.handleRightMonthSelectChange = function (rightMonth) {
            var rightView = new monthAndYear_1.MonthAndYear(rightMonth, _this.state.rightView.getYear());
            core_1.Utils.safeInvoke(_this.props.dayPickerProps.onMonthChange, rightView.getFullDate());
            _this.updateRightView(rightView);
        };
        /*
         * The min / max months are offset by one because we are showing two months.
         * We do a comparison check to see if
         *   a) the proposed [Month, Year] change throws the two calendars out of order
         *   b) the proposed [Month, Year] goes beyond the min / max months
         * and rectify appropriately.
         */
        _this.handleLeftYearSelectChange = function (leftDisplayYear) {
            var leftView = new monthAndYear_1.MonthAndYear(_this.state.leftView.getMonth(), leftDisplayYear);
            core_1.Utils.safeInvoke(_this.props.dayPickerProps.onMonthChange, leftView.getFullDate());
            var _a = _this.props, minDate = _a.minDate, maxDate = _a.maxDate;
            var adjustedMaxDate = DateUtils.getDatePreviousMonth(maxDate);
            var minMonthAndYear = new monthAndYear_1.MonthAndYear(minDate.getMonth(), minDate.getFullYear());
            var maxMonthAndYear = new monthAndYear_1.MonthAndYear(adjustedMaxDate.getMonth(), adjustedMaxDate.getFullYear());
            if (leftView.isBefore(minMonthAndYear)) {
                leftView = minMonthAndYear;
            }
            else if (leftView.isAfter(maxMonthAndYear)) {
                leftView = maxMonthAndYear;
            }
            var rightView = _this.state.rightView.clone();
            if (!leftView.isBefore(rightView) || _this.props.contiguousCalendarMonths) {
                rightView = leftView.getNextMonth();
            }
            _this.setViews(leftView, rightView);
        };
        _this.handleRightYearSelectChange = function (rightDisplayYear) {
            var rightView = new monthAndYear_1.MonthAndYear(_this.state.rightView.getMonth(), rightDisplayYear);
            core_1.Utils.safeInvoke(_this.props.dayPickerProps.onMonthChange, rightView.getFullDate());
            var _a = _this.props, minDate = _a.minDate, maxDate = _a.maxDate;
            var adjustedMinDate = DateUtils.getDateNextMonth(minDate);
            var minMonthAndYear = monthAndYear_1.MonthAndYear.fromDate(adjustedMinDate);
            var maxMonthAndYear = monthAndYear_1.MonthAndYear.fromDate(maxDate);
            if (rightView.isBefore(minMonthAndYear)) {
                rightView = minMonthAndYear;
            }
            else if (rightView.isAfter(maxMonthAndYear)) {
                rightView = maxMonthAndYear;
            }
            var leftView = _this.state.leftView.clone();
            if (!rightView.isAfter(leftView) || _this.props.contiguousCalendarMonths) {
                leftView = rightView.getPreviousMonth();
            }
            _this.setViews(leftView, rightView);
        };
        var value = getInitialValue(props);
        var time = value;
        var initialMonth = getInitialMonth(props, value);
        // if the initial month is the last month of the picker's
        // allowable range, the react-day-picker library will show
        // the max month on the left and the *min* month on the right.
        // subtracting one avoids that weird, wraparound state (#289).
        var initialMonthEqualsMinMonth = DateUtils.areSameMonth(initialMonth, props.minDate);
        var initalMonthEqualsMaxMonth = DateUtils.areSameMonth(initialMonth, props.maxDate);
        if (!props.singleMonthOnly && !initialMonthEqualsMinMonth && initalMonthEqualsMaxMonth) {
            initialMonth.setMonth(initialMonth.getMonth() - 1);
        }
        // show the selected end date's encompassing month in the right view if
        // the calendars don't have to be contiguous.
        // if left view and right view months are the same, show next month in the right view.
        var leftView = monthAndYear_1.MonthAndYear.fromDate(initialMonth);
        var rightDate = value[1];
        var rightView = !props.contiguousCalendarMonths && rightDate != null && !DateUtils.areSameMonth(initialMonth, rightDate)
            ? monthAndYear_1.MonthAndYear.fromDate(rightDate)
            : leftView.getNextMonth();
        _this.state = {
            hoverValue: [null, null],
            leftView: leftView,
            rightView: rightView,
            selectedShortcutIndex: _this.props.selectedShortcutIndex !== undefined ? _this.props.selectedShortcutIndex : -1,
            time: time,
            value: value,
        };
        return _this;
    }
    DateRangePicker_1 = DateRangePicker;
    DateRangePicker.prototype.render = function () {
        var _a;
        var _b = this.props, className = _b.className, contiguousCalendarMonths = _b.contiguousCalendarMonths, singleMonthOnly = _b.singleMonthOnly;
        var isShowingOneMonth = singleMonthOnly || DateUtils.areSameMonth(this.props.minDate, this.props.maxDate);
        var classes = classnames_1.default(DateClasses.DATEPICKER, DateClasses.DATERANGEPICKER, className, (_a = {},
            _a[DateClasses.DATERANGEPICKER_CONTIGUOUS] = contiguousCalendarMonths,
            _a[DateClasses.DATERANGEPICKER_SINGLE_MONTH] = isShowingOneMonth,
            _a));
        // use the left DayPicker when we only need one
        return (React.createElement("div", { className: classes },
            this.maybeRenderShortcuts(),
            React.createElement("div", null,
                this.renderCalendars(isShowingOneMonth),
                this.maybeRenderTimePickers())));
    };
    DateRangePicker.prototype.componentDidUpdate = function (prevProps, prevState, snapshot) {
        _super.prototype.componentDidUpdate.call(this, prevProps, prevState, snapshot);
        if (!DateUtils.areRangesEqual(prevProps.value, this.props.value) ||
            prevProps.contiguousCalendarMonths !== this.props.contiguousCalendarMonths) {
            var nextState = getStateChange(prevProps.value, this.props.value, this.state, prevProps.contiguousCalendarMonths);
            this.setState(nextState);
        }
        if (this.props.selectedShortcutIndex !== prevProps.selectedShortcutIndex) {
            this.setState({ selectedShortcutIndex: this.props.selectedShortcutIndex });
        }
    };
    DateRangePicker.prototype.validateProps = function (props) {
        var defaultValue = props.defaultValue, initialMonth = props.initialMonth, maxDate = props.maxDate, minDate = props.minDate, boundaryToModify = props.boundaryToModify, value = props.value;
        var dateRange = [minDate, maxDate];
        if (defaultValue != null && !DateUtils.isDayRangeInRange(defaultValue, dateRange)) {
            throw new Error(Errors.DATERANGEPICKER_DEFAULT_VALUE_INVALID);
        }
        if (initialMonth != null && !DateUtils.isMonthInRange(initialMonth, dateRange)) {
            throw new Error(Errors.DATERANGEPICKER_INITIAL_MONTH_INVALID);
        }
        if (maxDate != null && minDate != null && maxDate < minDate && !DateUtils.areSameDay(maxDate, minDate)) {
            throw new Error(Errors.DATERANGEPICKER_MAX_DATE_INVALID);
        }
        if (value != null && !DateUtils.isDayRangeInRange(value, dateRange)) {
            throw new Error(Errors.DATERANGEPICKER_VALUE_INVALID);
        }
        if (boundaryToModify != null && boundaryToModify !== core_1.Boundary.START && boundaryToModify !== core_1.Boundary.END) {
            throw new Error(Errors.DATERANGEPICKER_PREFERRED_BOUNDARY_TO_MODIFY_INVALID);
        }
    };
    DateRangePicker.prototype.maybeRenderShortcuts = function () {
        var shortcuts = this.props.shortcuts;
        if (shortcuts == null || shortcuts === false) {
            return null;
        }
        var selectedShortcutIndex = this.state.selectedShortcutIndex;
        var _a = this.props, allowSingleDayRange = _a.allowSingleDayRange, maxDate = _a.maxDate, minDate = _a.minDate, timePrecision = _a.timePrecision;
        return [
            React.createElement(shortcuts_1.Shortcuts, tslib_1.__assign({ key: "shortcuts" }, { allowSingleDayRange: allowSingleDayRange, maxDate: maxDate, minDate: minDate, shortcuts: shortcuts, timePrecision: timePrecision, selectedShortcutIndex: selectedShortcutIndex }, { onShortcutClick: this.handleShortcutClick })),
            React.createElement(core_1.Divider, { key: "div" }),
        ];
    };
    DateRangePicker.prototype.maybeRenderTimePickers = function () {
        var _a = this.props, timePrecision = _a.timePrecision, timePickerProps = _a.timePickerProps;
        if (timePrecision == null && timePickerProps === DateRangePicker_1.defaultProps.timePickerProps) {
            return null;
        }
        return (React.createElement("div", { className: DateClasses.DATERANGEPICKER_TIMEPICKERS },
            React.createElement(timePicker_1.TimePicker, tslib_1.__assign({ precision: timePrecision }, timePickerProps, { onChange: this.handleTimeChangeLeftCalendar, value: this.state.time[0] })),
            React.createElement(timePicker_1.TimePicker, tslib_1.__assign({ precision: timePrecision }, timePickerProps, { onChange: this.handleTimeChangeRightCalendar, value: this.state.time[1] }))));
    };
    DateRangePicker.prototype.renderCalendars = function (isShowingOneMonth) {
        var _a = this.props, dayPickerProps = _a.dayPickerProps, locale = _a.locale, localeUtils = _a.localeUtils, maxDate = _a.maxDate, minDate = _a.minDate;
        var dayPickerBaseProps = tslib_1.__assign({ locale: locale,
            localeUtils: localeUtils, modifiers: datePickerCore_1.combineModifiers(this.modifiers, this.props.modifiers), showOutsideDays: true }, dayPickerProps, { disabledDays: this.getDisabledDaysModifier(), onDayClick: this.handleDayClick, onDayMouseEnter: this.handleDayMouseEnter, onDayMouseLeave: this.handleDayMouseLeave, selectedDays: this.state.value });
        if (isShowingOneMonth) {
            return (React.createElement(react_day_picker_1.default, tslib_1.__assign({}, dayPickerBaseProps, { captionElement: this.renderSingleCaption, navbarElement: this.renderSingleNavbar, fromMonth: minDate, month: this.state.leftView.getFullDate(), numberOfMonths: 1, onMonthChange: this.handleLeftMonthChange, toMonth: maxDate })));
        }
        else {
            return [
                React.createElement(react_day_picker_1.default, tslib_1.__assign({ key: "left" }, dayPickerBaseProps, { canChangeMonth: true, captionElement: this.renderLeftCaption, navbarElement: this.renderLeftNavbar, fromMonth: minDate, month: this.state.leftView.getFullDate(), numberOfMonths: 1, onMonthChange: this.handleLeftMonthChange, toMonth: DateUtils.getDatePreviousMonth(maxDate) })),
                React.createElement(react_day_picker_1.default, tslib_1.__assign({ key: "right" }, dayPickerBaseProps, { canChangeMonth: true, captionElement: this.renderRightCaption, navbarElement: this.renderRightNavbar, fromMonth: DateUtils.getDateNextMonth(minDate), month: this.state.rightView.getFullDate(), numberOfMonths: 1, onMonthChange: this.handleRightMonthChange, toMonth: maxDate })),
            ];
        }
    };
    DateRangePicker.prototype.updateLeftView = function (leftView) {
        var rightView = this.state.rightView.clone();
        if (!leftView.isBefore(rightView) || this.props.contiguousCalendarMonths) {
            rightView = leftView.getNextMonth();
        }
        this.setViews(leftView, rightView);
    };
    DateRangePicker.prototype.updateRightView = function (rightView) {
        var leftView = this.state.leftView.clone();
        if (!rightView.isAfter(leftView) || this.props.contiguousCalendarMonths) {
            leftView = rightView.getPreviousMonth();
        }
        this.setViews(leftView, rightView);
    };
    DateRangePicker.prototype.setViews = function (leftView, rightView) {
        this.setState({ leftView: leftView, rightView: rightView });
    };
    var DateRangePicker_1;
    DateRangePicker.defaultProps = {
        allowSingleDayRange: false,
        contiguousCalendarMonths: true,
        dayPickerProps: {},
        maxDate: datePickerCore_1.getDefaultMaxDate(),
        minDate: datePickerCore_1.getDefaultMinDate(),
        reverseMonthAndYearMenus: false,
        shortcuts: true,
        singleMonthOnly: false,
        timePickerProps: {},
    };
    DateRangePicker.displayName = core_1.DISPLAYNAME_PREFIX + ".DateRangePicker";
    DateRangePicker = DateRangePicker_1 = tslib_1.__decorate([
        react_lifecycles_compat_1.polyfill
    ], DateRangePicker);
    return DateRangePicker;
}(core_1.AbstractPureComponent2));
exports.DateRangePicker = DateRangePicker;
function getStateChange(value, nextValue, state, contiguousCalendarMonths) {
    if (value != null && nextValue == null) {
        return { value: [null, null] };
    }
    else if (nextValue != null) {
        var leftView = state.leftView.clone();
        var rightView = state.rightView.clone();
        var nextValueStartView = monthAndYear_1.MonthAndYear.fromDate(nextValue[0]);
        var nextValueEndView = monthAndYear_1.MonthAndYear.fromDate(nextValue[1]);
        // Only end date selected.
        // If the newly selected end date isn't in either of the displayed months, then
        //   - set the right DayPicker to the month of the selected end date
        //   - ensure the left DayPicker is before the right, changing if needed
        if (nextValueStartView == null && nextValueEndView != null) {
            if (!nextValueEndView.isSame(leftView) && !nextValueEndView.isSame(rightView)) {
                rightView = nextValueEndView;
                if (!leftView.isBefore(rightView)) {
                    leftView = rightView.getPreviousMonth();
                }
            }
        }
        else if (nextValueStartView != null && nextValueEndView == null) {
            // Only start date selected.
            // If the newly selected start date isn't in either of the displayed months, then
            //   - set the left DayPicker to the month of the selected start date
            //   - ensure the right DayPicker is before the left, changing if needed
            if (!nextValueStartView.isSame(leftView) && !nextValueStartView.isSame(rightView)) {
                leftView = nextValueStartView;
                if (!rightView.isAfter(leftView)) {
                    rightView = leftView.getNextMonth();
                }
            }
        }
        else if (nextValueStartView != null && nextValueEndView != null) {
            // Both start and end date months are identical
            // If the selected month isn't in either of the displayed months, then
            //   - set the left DayPicker to be the selected month
            //   - set the right DayPicker to +1
            if (nextValueStartView.isSameMonth(nextValueEndView)) {
                if (leftView.isSame(nextValueStartView) || rightView.isSame(nextValueStartView)) {
                    // do nothing
                }
                else {
                    leftView = nextValueStartView;
                    rightView = nextValueStartView.getNextMonth();
                }
            }
            else {
                // Different start and end date months, adjust display months.
                if (!leftView.isSame(nextValueStartView)) {
                    leftView = nextValueStartView;
                    rightView = nextValueStartView.getNextMonth();
                }
                if (contiguousCalendarMonths === false && !rightView.isSame(nextValueEndView)) {
                    rightView = nextValueEndView;
                }
            }
        }
        return {
            leftView: leftView,
            rightView: rightView,
            value: nextValue,
        };
    }
    else if (contiguousCalendarMonths === true) {
        // contiguousCalendarMonths is toggled on.
        // If the previous leftView and rightView are not contiguous, then set the right DayPicker to left + 1
        if (!state.leftView.getNextMonth().isSameMonth(state.rightView)) {
            var nextRightView = state.leftView.getNextMonth();
            return { rightView: nextRightView };
        }
    }
    return {};
}
function getInitialValue(props) {
    if (props.value != null) {
        return props.value;
    }
    if (props.defaultValue != null) {
        return props.defaultValue;
    }
    return [null, null];
}
function getInitialMonth(props, value) {
    var today = new Date();
    // != because we must have a real `Date` to begin the calendar on.
    if (props.initialMonth != null) {
        return props.initialMonth;
    }
    else if (value[0] != null) {
        return DateUtils.clone(value[0]);
    }
    else if (value[1] != null) {
        var month = DateUtils.clone(value[1]);
        if (!DateUtils.areSameMonth(month, props.minDate)) {
            month.setMonth(month.getMonth() - 1);
        }
        return month;
    }
    else if (DateUtils.isDayInRange(today, [props.minDate, props.maxDate])) {
        return today;
    }
    else {
        return DateUtils.getDateBetween([props.minDate, props.maxDate]);
    }
}
//# sourceMappingURL=dateRangePicker.js.map