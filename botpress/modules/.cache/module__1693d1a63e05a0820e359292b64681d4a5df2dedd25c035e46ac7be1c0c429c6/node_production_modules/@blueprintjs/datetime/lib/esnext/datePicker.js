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
var DatePicker_1;
import * as tslib_1 from "tslib";
import { AbstractPureComponent2, Button, DISPLAYNAME_PREFIX, Divider, Utils } from "@blueprintjs/core";
import classNames from "classnames";
import * as React from "react";
import DayPicker from "react-day-picker";
import { polyfill } from "react-lifecycles-compat";
import * as Classes from "./common/classes";
import * as DateUtils from "./common/dateUtils";
import * as Errors from "./common/errors";
import { DatePickerCaption } from "./datePickerCaption";
import { getDefaultMaxDate, getDefaultMinDate } from "./datePickerCore";
import { DatePickerNavbar } from "./datePickerNavbar";
import { Shortcuts } from "./shortcuts";
import { TimePicker } from "./timePicker";
let DatePicker = DatePicker_1 = class DatePicker extends AbstractPureComponent2 {
    constructor(props, context) {
        super(props, context);
        this.ignoreNextMonthChange = false;
        this.isToday = (date) => DateUtils.areSameDay(date, new Date());
        this.shouldHighlightCurrentDay = (date) => {
            const { highlightCurrentDay } = this.props;
            return highlightCurrentDay && this.isToday(date);
        };
        this.getDatePickerModifiers = () => {
            const { modifiers } = this.props;
            return {
                isToday: this.shouldHighlightCurrentDay,
                ...modifiers,
            };
        };
        this.renderDay = (day) => {
            const date = day.getDate();
            return React.createElement("div", { className: Classes.DATEPICKER_DAY_WRAPPER }, date);
        };
        this.disabledDays = (day) => !DateUtils.isDayInRange(day, [this.props.minDate, this.props.maxDate]);
        this.getDisabledDaysModifier = () => {
            const { dayPickerProps: { disabledDays }, } = this.props;
            return Array.isArray(disabledDays) ? [this.disabledDays, ...disabledDays] : [this.disabledDays, disabledDays];
        };
        this.renderCaption = (props) => (React.createElement(DatePickerCaption, Object.assign({}, props, { maxDate: this.props.maxDate, minDate: this.props.minDate, onDateChange: this.handleMonthChange, reverseMonthAndYearMenus: this.props.reverseMonthAndYearMenus })));
        this.renderNavbar = (props) => (React.createElement(DatePickerNavbar, Object.assign({}, props, { maxDate: this.props.maxDate, minDate: this.props.minDate })));
        this.handleDayClick = (day, modifiers, e) => {
            Utils.safeInvoke(this.props.dayPickerProps.onDayClick, day, modifiers, e);
            if (modifiers.disabled) {
                return;
            }
            this.updateDay(day);
            // allow toggling selected date by clicking it again (if prop enabled)
            const newValue = this.props.canClearSelection && modifiers.selected ? null : DateUtils.getDateTime(day, this.state.value);
            this.updateValue(newValue, true);
        };
        this.handleShortcutClick = (shortcut, selectedShortcutIndex) => {
            const { onShortcutChange, selectedShortcutIndex: currentShortcutIndex } = this.props;
            const { dateRange, includeTime } = shortcut;
            const newDate = dateRange[0];
            const newValue = includeTime ? newDate : DateUtils.getDateTime(newDate, this.state.value);
            this.updateDay(newDate);
            this.updateValue(newValue, true);
            if (currentShortcutIndex === undefined) {
                this.setState({ selectedShortcutIndex });
            }
            const datePickerShortcut = { ...shortcut, date: shortcut.dateRange[0] };
            Utils.safeInvoke(onShortcutChange, datePickerShortcut, selectedShortcutIndex);
        };
        this.updateDay = (day) => {
            if (this.props.value === undefined) {
                // set now if uncontrolled, otherwise they'll be updated in `componentDidUpdate`
                this.setState({
                    displayMonth: day.getMonth(),
                    displayYear: day.getFullYear(),
                    selectedDay: day.getDate(),
                });
            }
            if (this.state.value != null && this.state.value.getMonth() !== day.getMonth()) {
                this.ignoreNextMonthChange = true;
            }
        };
        this.handleClearClick = () => this.updateValue(null, true);
        this.handleMonthChange = (newDate) => {
            const date = this.computeValidDateInSpecifiedMonthYear(newDate.getFullYear(), newDate.getMonth());
            this.setState({ displayMonth: date.getMonth(), displayYear: date.getFullYear() });
            if (this.state.value !== null) {
                // if handleDayClick just got run (so this flag is set), then the
                // user selected a date in a new month, so don't invoke onChange a
                // second time
                this.updateValue(date, false, this.ignoreNextMonthChange);
                this.ignoreNextMonthChange = false;
            }
            Utils.safeInvoke(this.props.dayPickerProps.onMonthChange, date);
        };
        this.handleTodayClick = () => {
            const value = new Date();
            const displayMonth = value.getMonth();
            const displayYear = value.getFullYear();
            const selectedDay = value.getDate();
            this.setState({ displayMonth, displayYear, selectedDay });
            this.updateValue(value, true);
        };
        this.handleTimeChange = (time) => {
            Utils.safeInvoke(this.props.timePickerProps.onChange, time);
            const { value } = this.state;
            const newValue = DateUtils.getDateTime(value != null ? value : new Date(), time);
            this.updateValue(newValue, true);
        };
        const value = getInitialValue(props);
        const initialMonth = getInitialMonth(props, value);
        this.state = {
            displayMonth: initialMonth.getMonth(),
            displayYear: initialMonth.getFullYear(),
            selectedDay: value == null ? null : value.getDate(),
            selectedShortcutIndex: this.props.selectedShortcutIndex !== undefined ? this.props.selectedShortcutIndex : -1,
            value,
        };
    }
    render() {
        const { className, dayPickerProps, locale, localeUtils, maxDate, minDate, showActionsBar } = this.props;
        const { displayMonth, displayYear } = this.state;
        return (React.createElement("div", { className: classNames(Classes.DATEPICKER, className) },
            this.maybeRenderShortcuts(),
            React.createElement("div", null,
                React.createElement(DayPicker, Object.assign({ showOutsideDays: true, locale: locale, localeUtils: localeUtils, modifiers: this.getDatePickerModifiers() }, dayPickerProps, { canChangeMonth: true, captionElement: this.renderCaption, navbarElement: this.renderNavbar, disabledDays: this.getDisabledDaysModifier(), fromMonth: minDate, month: new Date(displayYear, displayMonth), onDayClick: this.handleDayClick, onMonthChange: this.handleMonthChange, selectedDays: this.state.value, toMonth: maxDate, renderDay: this.renderDay })),
                this.maybeRenderTimePicker(),
                showActionsBar && this.renderOptionsBar())));
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        super.componentDidUpdate(prevProps, prevState, snapshot);
        const { value } = this.props;
        if (value === prevProps.value) {
            // no action needed
            return;
        }
        else if (value == null) {
            // clear the value
            this.setState({ value });
        }
        else {
            this.setState({
                displayMonth: value.getMonth(),
                displayYear: value.getFullYear(),
                selectedDay: value.getDate(),
                value,
            });
        }
        if (this.props.selectedShortcutIndex !== prevProps.selectedShortcutIndex) {
            this.setState({ selectedShortcutIndex: this.props.selectedShortcutIndex });
        }
    }
    validateProps(props) {
        const { defaultValue, initialMonth, maxDate, minDate, value } = props;
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
    }
    renderOptionsBar() {
        const { clearButtonText, todayButtonText } = this.props;
        return [
            React.createElement(Divider, { key: "div" }),
            React.createElement("div", { className: Classes.DATEPICKER_FOOTER, key: "footer" },
                React.createElement(Button, { minimal: true, onClick: this.handleTodayClick, text: todayButtonText }),
                React.createElement(Button, { minimal: true, onClick: this.handleClearClick, text: clearButtonText })),
        ];
    }
    maybeRenderTimePicker() {
        const { timePrecision, timePickerProps } = this.props;
        if (timePrecision == null && timePickerProps === DatePicker_1.defaultProps.timePickerProps) {
            return null;
        }
        return (React.createElement(TimePicker, Object.assign({ precision: timePrecision }, timePickerProps, { onChange: this.handleTimeChange, value: this.state.value })));
    }
    maybeRenderShortcuts() {
        const { shortcuts } = this.props;
        if (shortcuts == null || shortcuts === false) {
            return null;
        }
        const { selectedShortcutIndex } = this.state;
        const { maxDate, minDate, timePrecision } = this.props;
        // Reuse the existing date range shortcuts and only care about start date
        const dateRangeShortcuts = shortcuts === true
            ? true
            : shortcuts.map(shortcut => ({
                ...shortcut,
                dateRange: [shortcut.date, undefined],
            }));
        return [
            React.createElement(Shortcuts, Object.assign({ key: "shortcuts" }, {
                allowSingleDayRange: true,
                maxDate,
                minDate,
                selectedShortcutIndex,
                shortcuts: dateRangeShortcuts,
                timePrecision,
            }, { onShortcutClick: this.handleShortcutClick, useSingleDateShortcuts: true })),
            React.createElement(Divider, { key: "div" }),
        ];
    }
    computeValidDateInSpecifiedMonthYear(displayYear, displayMonth) {
        const { minDate, maxDate } = this.props;
        const { selectedDay } = this.state;
        // month is 0-based, date is 1-based. date 0 is last day of previous month.
        const maxDaysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();
        const displayDate = selectedDay == null ? 1 : Math.min(selectedDay, maxDaysInMonth);
        // 12:00 matches the underlying react-day-picker timestamp behavior
        const value = DateUtils.getDateTime(new Date(displayYear, displayMonth, displayDate, 12), this.state.value);
        // clamp between min and max dates
        if (value < minDate) {
            return minDate;
        }
        else if (value > maxDate) {
            return maxDate;
        }
        return value;
    }
    /**
     * Update `value` by invoking `onChange` (always) and setting state (if uncontrolled).
     */
    updateValue(value, isUserChange, skipOnChange = false) {
        if (!skipOnChange) {
            Utils.safeInvoke(this.props.onChange, value, isUserChange);
        }
        if (this.props.value === undefined) {
            this.setState({ value });
        }
    }
};
DatePicker.defaultProps = {
    canClearSelection: true,
    clearButtonText: "Clear",
    dayPickerProps: {},
    highlightCurrentDay: false,
    maxDate: getDefaultMaxDate(),
    minDate: getDefaultMinDate(),
    reverseMonthAndYearMenus: false,
    shortcuts: false,
    showActionsBar: false,
    timePickerProps: {},
    todayButtonText: "Today",
};
DatePicker.displayName = `${DISPLAYNAME_PREFIX}.DatePicker`;
DatePicker = DatePicker_1 = tslib_1.__decorate([
    polyfill
], DatePicker);
export { DatePicker };
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
    const today = new Date();
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