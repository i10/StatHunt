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
var DateRangePicker_1;
import * as tslib_1 from "tslib";
import { AbstractPureComponent2, Boundary, DISPLAYNAME_PREFIX, Divider, Utils } from "@blueprintjs/core";
import classNames from "classnames";
import * as React from "react";
import DayPicker from "react-day-picker";
import { polyfill } from "react-lifecycles-compat";
import * as DateClasses from "./common/classes";
import * as DateUtils from "./common/dateUtils";
import * as Errors from "./common/errors";
import { MonthAndYear } from "./common/monthAndYear";
import { DatePickerCaption } from "./datePickerCaption";
import { combineModifiers, getDefaultMaxDate, getDefaultMinDate, HOVERED_RANGE_MODIFIER, SELECTED_RANGE_MODIFIER, } from "./datePickerCore";
import { DatePickerNavbar } from "./datePickerNavbar";
import { DateRangeSelectionStrategy } from "./dateRangeSelectionStrategy";
import { Shortcuts } from "./shortcuts";
import { TimePicker } from "./timePicker";
let DateRangePicker = DateRangePicker_1 = class DateRangePicker extends AbstractPureComponent2 {
    constructor(props, context) {
        super(props, context);
        // these will get merged with the user's own
        this.modifiers = {
            [SELECTED_RANGE_MODIFIER]: day => {
                const { value } = this.state;
                return value[0] != null && value[1] != null && DateUtils.isDayInRange(day, value, true);
            },
            [`${SELECTED_RANGE_MODIFIER}-start`]: day => DateUtils.areSameDay(this.state.value[0], day),
            [`${SELECTED_RANGE_MODIFIER}-end`]: day => DateUtils.areSameDay(this.state.value[1], day),
            [HOVERED_RANGE_MODIFIER]: day => {
                const { hoverValue, value: [selectedStart, selectedEnd], } = this.state;
                if (selectedStart == null && selectedEnd == null) {
                    return false;
                }
                if (hoverValue == null || hoverValue[0] == null || hoverValue[1] == null) {
                    return false;
                }
                return DateUtils.isDayInRange(day, hoverValue, true);
            },
            [`${HOVERED_RANGE_MODIFIER}-start`]: day => {
                const { hoverValue } = this.state;
                if (hoverValue == null || hoverValue[0] == null) {
                    return false;
                }
                return DateUtils.areSameDay(hoverValue[0], day);
            },
            [`${HOVERED_RANGE_MODIFIER}-end`]: day => {
                const { hoverValue } = this.state;
                if (hoverValue == null || hoverValue[1] == null) {
                    return false;
                }
                return DateUtils.areSameDay(hoverValue[1], day);
            },
        };
        this.disabledDays = (day) => !DateUtils.isDayInRange(day, [this.props.minDate, this.props.maxDate]);
        this.getDisabledDaysModifier = () => {
            const { dayPickerProps: { disabledDays }, } = this.props;
            return disabledDays instanceof Array ? [this.disabledDays, ...disabledDays] : [this.disabledDays, disabledDays];
        };
        this.handleTimeChange = (newTime, dateIndex) => {
            Utils.safeInvoke(this.props.timePickerProps.onChange, newTime);
            const { value, time } = this.state;
            const newValue = DateUtils.getDateTime(value[dateIndex] != null ? DateUtils.clone(value[dateIndex]) : new Date(), newTime);
            const newDateRange = [value[0], value[1]];
            newDateRange[dateIndex] = newValue;
            const newTimeRange = [time[0], time[1]];
            newTimeRange[dateIndex] = newTime;
            Utils.safeInvoke(this.props.onChange, newDateRange);
            this.setState({ value: newDateRange, time: newTimeRange });
        };
        this.handleTimeChangeLeftCalendar = (time) => {
            this.handleTimeChange(time, 0);
        };
        this.handleTimeChangeRightCalendar = (time) => {
            this.handleTimeChange(time, 1);
        };
        this.renderSingleNavbar = (navbarProps) => (React.createElement(DatePickerNavbar, Object.assign({}, navbarProps, { maxDate: this.props.maxDate, minDate: this.props.minDate })));
        this.renderLeftNavbar = (navbarProps) => (React.createElement(DatePickerNavbar, Object.assign({}, navbarProps, { hideRightNavButton: this.props.contiguousCalendarMonths, maxDate: this.props.maxDate, minDate: this.props.minDate })));
        this.renderRightNavbar = (navbarProps) => (React.createElement(DatePickerNavbar, Object.assign({}, navbarProps, { hideLeftNavButton: this.props.contiguousCalendarMonths, maxDate: this.props.maxDate, minDate: this.props.minDate })));
        this.renderSingleCaption = (captionProps) => (React.createElement(DatePickerCaption, Object.assign({}, captionProps, { maxDate: this.props.maxDate, minDate: this.props.minDate, onMonthChange: this.handleLeftMonthSelectChange, onYearChange: this.handleLeftYearSelectChange, reverseMonthAndYearMenus: this.props.reverseMonthAndYearMenus })));
        this.renderLeftCaption = (captionProps) => (React.createElement(DatePickerCaption, Object.assign({}, captionProps, { maxDate: DateUtils.getDatePreviousMonth(this.props.maxDate), minDate: this.props.minDate, onMonthChange: this.handleLeftMonthSelectChange, onYearChange: this.handleLeftYearSelectChange, reverseMonthAndYearMenus: this.props.reverseMonthAndYearMenus })));
        this.renderRightCaption = (captionProps) => (React.createElement(DatePickerCaption, Object.assign({}, captionProps, { maxDate: this.props.maxDate, minDate: DateUtils.getDateNextMonth(this.props.minDate), onMonthChange: this.handleRightMonthSelectChange, onYearChange: this.handleRightYearSelectChange, reverseMonthAndYearMenus: this.props.reverseMonthAndYearMenus })));
        this.handleDayMouseEnter = (day, modifiers, e) => {
            Utils.safeInvoke(this.props.dayPickerProps.onDayMouseEnter, day, modifiers, e);
            if (modifiers.disabled) {
                return;
            }
            const { dateRange, boundary } = DateRangeSelectionStrategy.getNextState(this.state.value, day, this.props.allowSingleDayRange, this.props.boundaryToModify);
            this.setState({ hoverValue: dateRange });
            Utils.safeInvoke(this.props.onHoverChange, dateRange, day, boundary);
        };
        this.handleDayMouseLeave = (day, modifiers, e) => {
            Utils.safeInvoke(this.props.dayPickerProps.onDayMouseLeave, day, modifiers, e);
            if (modifiers.disabled) {
                return;
            }
            this.setState({ hoverValue: undefined });
            Utils.safeInvoke(this.props.onHoverChange, undefined, day, undefined);
        };
        this.handleDayClick = (day, modifiers, e) => {
            Utils.safeInvoke(this.props.dayPickerProps.onDayClick, day, modifiers, e);
            if (modifiers.disabled) {
                // rerender base component to get around bug where you can navigate past bounds by clicking days
                this.forceUpdate();
                return;
            }
            const nextValue = DateRangeSelectionStrategy.getNextState(this.state.value, day, this.props.allowSingleDayRange, this.props.boundaryToModify).dateRange;
            // update the hovered date range after click to show the newly selected
            // state, at leasts until the mouse moves again
            this.handleDayMouseEnter(day, modifiers, e);
            this.handleNextState(nextValue);
        };
        this.handleShortcutClick = (shortcut, selectedShortcutIndex) => {
            const { onChange, contiguousCalendarMonths, onShortcutChange } = this.props;
            const { dateRange, includeTime } = shortcut;
            if (includeTime) {
                const newDateRange = [dateRange[0], dateRange[1]];
                const newTimeRange = [dateRange[0], dateRange[1]];
                const nextState = getStateChange(this.state.value, dateRange, this.state, contiguousCalendarMonths);
                this.setState({ ...nextState, time: newTimeRange });
                Utils.safeInvoke(onChange, newDateRange);
            }
            else {
                this.handleNextState(dateRange);
            }
            if (this.props.selectedShortcutIndex === undefined) {
                this.setState({ selectedShortcutIndex });
            }
            Utils.safeInvoke(onShortcutChange, shortcut, selectedShortcutIndex);
        };
        this.handleNextState = (nextValue) => {
            const { value } = this.state;
            nextValue[0] = DateUtils.getDateTime(nextValue[0], this.state.time[0]);
            nextValue[1] = DateUtils.getDateTime(nextValue[1], this.state.time[1]);
            const nextState = getStateChange(value, nextValue, this.state, this.props.contiguousCalendarMonths);
            if (this.props.value == null) {
                this.setState(nextState);
            }
            Utils.safeInvoke(this.props.onChange, nextValue);
        };
        this.handleLeftMonthChange = (newDate) => {
            const leftView = MonthAndYear.fromDate(newDate);
            Utils.safeInvoke(this.props.dayPickerProps.onMonthChange, leftView.getFullDate());
            this.updateLeftView(leftView);
        };
        this.handleRightMonthChange = (newDate) => {
            const rightView = MonthAndYear.fromDate(newDate);
            Utils.safeInvoke(this.props.dayPickerProps.onMonthChange, rightView.getFullDate());
            this.updateRightView(rightView);
        };
        this.handleLeftMonthSelectChange = (leftMonth) => {
            const leftView = new MonthAndYear(leftMonth, this.state.leftView.getYear());
            Utils.safeInvoke(this.props.dayPickerProps.onMonthChange, leftView.getFullDate());
            this.updateLeftView(leftView);
        };
        this.handleRightMonthSelectChange = (rightMonth) => {
            const rightView = new MonthAndYear(rightMonth, this.state.rightView.getYear());
            Utils.safeInvoke(this.props.dayPickerProps.onMonthChange, rightView.getFullDate());
            this.updateRightView(rightView);
        };
        /*
         * The min / max months are offset by one because we are showing two months.
         * We do a comparison check to see if
         *   a) the proposed [Month, Year] change throws the two calendars out of order
         *   b) the proposed [Month, Year] goes beyond the min / max months
         * and rectify appropriately.
         */
        this.handleLeftYearSelectChange = (leftDisplayYear) => {
            let leftView = new MonthAndYear(this.state.leftView.getMonth(), leftDisplayYear);
            Utils.safeInvoke(this.props.dayPickerProps.onMonthChange, leftView.getFullDate());
            const { minDate, maxDate } = this.props;
            const adjustedMaxDate = DateUtils.getDatePreviousMonth(maxDate);
            const minMonthAndYear = new MonthAndYear(minDate.getMonth(), minDate.getFullYear());
            const maxMonthAndYear = new MonthAndYear(adjustedMaxDate.getMonth(), adjustedMaxDate.getFullYear());
            if (leftView.isBefore(minMonthAndYear)) {
                leftView = minMonthAndYear;
            }
            else if (leftView.isAfter(maxMonthAndYear)) {
                leftView = maxMonthAndYear;
            }
            let rightView = this.state.rightView.clone();
            if (!leftView.isBefore(rightView) || this.props.contiguousCalendarMonths) {
                rightView = leftView.getNextMonth();
            }
            this.setViews(leftView, rightView);
        };
        this.handleRightYearSelectChange = (rightDisplayYear) => {
            let rightView = new MonthAndYear(this.state.rightView.getMonth(), rightDisplayYear);
            Utils.safeInvoke(this.props.dayPickerProps.onMonthChange, rightView.getFullDate());
            const { minDate, maxDate } = this.props;
            const adjustedMinDate = DateUtils.getDateNextMonth(minDate);
            const minMonthAndYear = MonthAndYear.fromDate(adjustedMinDate);
            const maxMonthAndYear = MonthAndYear.fromDate(maxDate);
            if (rightView.isBefore(minMonthAndYear)) {
                rightView = minMonthAndYear;
            }
            else if (rightView.isAfter(maxMonthAndYear)) {
                rightView = maxMonthAndYear;
            }
            let leftView = this.state.leftView.clone();
            if (!rightView.isAfter(leftView) || this.props.contiguousCalendarMonths) {
                leftView = rightView.getPreviousMonth();
            }
            this.setViews(leftView, rightView);
        };
        const value = getInitialValue(props);
        const time = value;
        const initialMonth = getInitialMonth(props, value);
        // if the initial month is the last month of the picker's
        // allowable range, the react-day-picker library will show
        // the max month on the left and the *min* month on the right.
        // subtracting one avoids that weird, wraparound state (#289).
        const initialMonthEqualsMinMonth = DateUtils.areSameMonth(initialMonth, props.minDate);
        const initalMonthEqualsMaxMonth = DateUtils.areSameMonth(initialMonth, props.maxDate);
        if (!props.singleMonthOnly && !initialMonthEqualsMinMonth && initalMonthEqualsMaxMonth) {
            initialMonth.setMonth(initialMonth.getMonth() - 1);
        }
        // show the selected end date's encompassing month in the right view if
        // the calendars don't have to be contiguous.
        // if left view and right view months are the same, show next month in the right view.
        const leftView = MonthAndYear.fromDate(initialMonth);
        const rightDate = value[1];
        const rightView = !props.contiguousCalendarMonths && rightDate != null && !DateUtils.areSameMonth(initialMonth, rightDate)
            ? MonthAndYear.fromDate(rightDate)
            : leftView.getNextMonth();
        this.state = {
            hoverValue: [null, null],
            leftView,
            rightView,
            selectedShortcutIndex: this.props.selectedShortcutIndex !== undefined ? this.props.selectedShortcutIndex : -1,
            time,
            value,
        };
    }
    render() {
        const { className, contiguousCalendarMonths, singleMonthOnly } = this.props;
        const isShowingOneMonth = singleMonthOnly || DateUtils.areSameMonth(this.props.minDate, this.props.maxDate);
        const classes = classNames(DateClasses.DATEPICKER, DateClasses.DATERANGEPICKER, className, {
            [DateClasses.DATERANGEPICKER_CONTIGUOUS]: contiguousCalendarMonths,
            [DateClasses.DATERANGEPICKER_SINGLE_MONTH]: isShowingOneMonth,
        });
        // use the left DayPicker when we only need one
        return (React.createElement("div", { className: classes },
            this.maybeRenderShortcuts(),
            React.createElement("div", null,
                this.renderCalendars(isShowingOneMonth),
                this.maybeRenderTimePickers())));
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        super.componentDidUpdate(prevProps, prevState, snapshot);
        if (!DateUtils.areRangesEqual(prevProps.value, this.props.value) ||
            prevProps.contiguousCalendarMonths !== this.props.contiguousCalendarMonths) {
            const nextState = getStateChange(prevProps.value, this.props.value, this.state, prevProps.contiguousCalendarMonths);
            this.setState(nextState);
        }
        if (this.props.selectedShortcutIndex !== prevProps.selectedShortcutIndex) {
            this.setState({ selectedShortcutIndex: this.props.selectedShortcutIndex });
        }
    }
    validateProps(props) {
        const { defaultValue, initialMonth, maxDate, minDate, boundaryToModify, value } = props;
        const dateRange = [minDate, maxDate];
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
        if (boundaryToModify != null && boundaryToModify !== Boundary.START && boundaryToModify !== Boundary.END) {
            throw new Error(Errors.DATERANGEPICKER_PREFERRED_BOUNDARY_TO_MODIFY_INVALID);
        }
    }
    maybeRenderShortcuts() {
        const { shortcuts } = this.props;
        if (shortcuts == null || shortcuts === false) {
            return null;
        }
        const { selectedShortcutIndex } = this.state;
        const { allowSingleDayRange, maxDate, minDate, timePrecision } = this.props;
        return [
            React.createElement(Shortcuts, Object.assign({ key: "shortcuts" }, { allowSingleDayRange, maxDate, minDate, shortcuts, timePrecision, selectedShortcutIndex }, { onShortcutClick: this.handleShortcutClick })),
            React.createElement(Divider, { key: "div" }),
        ];
    }
    maybeRenderTimePickers() {
        const { timePrecision, timePickerProps } = this.props;
        if (timePrecision == null && timePickerProps === DateRangePicker_1.defaultProps.timePickerProps) {
            return null;
        }
        return (React.createElement("div", { className: DateClasses.DATERANGEPICKER_TIMEPICKERS },
            React.createElement(TimePicker, Object.assign({ precision: timePrecision }, timePickerProps, { onChange: this.handleTimeChangeLeftCalendar, value: this.state.time[0] })),
            React.createElement(TimePicker, Object.assign({ precision: timePrecision }, timePickerProps, { onChange: this.handleTimeChangeRightCalendar, value: this.state.time[1] }))));
    }
    renderCalendars(isShowingOneMonth) {
        const { dayPickerProps, locale, localeUtils, maxDate, minDate } = this.props;
        const dayPickerBaseProps = {
            locale,
            localeUtils,
            modifiers: combineModifiers(this.modifiers, this.props.modifiers),
            showOutsideDays: true,
            ...dayPickerProps,
            disabledDays: this.getDisabledDaysModifier(),
            onDayClick: this.handleDayClick,
            onDayMouseEnter: this.handleDayMouseEnter,
            onDayMouseLeave: this.handleDayMouseLeave,
            selectedDays: this.state.value,
        };
        if (isShowingOneMonth) {
            return (React.createElement(DayPicker, Object.assign({}, dayPickerBaseProps, { captionElement: this.renderSingleCaption, navbarElement: this.renderSingleNavbar, fromMonth: minDate, month: this.state.leftView.getFullDate(), numberOfMonths: 1, onMonthChange: this.handleLeftMonthChange, toMonth: maxDate })));
        }
        else {
            return [
                React.createElement(DayPicker, Object.assign({ key: "left" }, dayPickerBaseProps, { canChangeMonth: true, captionElement: this.renderLeftCaption, navbarElement: this.renderLeftNavbar, fromMonth: minDate, month: this.state.leftView.getFullDate(), numberOfMonths: 1, onMonthChange: this.handleLeftMonthChange, toMonth: DateUtils.getDatePreviousMonth(maxDate) })),
                React.createElement(DayPicker, Object.assign({ key: "right" }, dayPickerBaseProps, { canChangeMonth: true, captionElement: this.renderRightCaption, navbarElement: this.renderRightNavbar, fromMonth: DateUtils.getDateNextMonth(minDate), month: this.state.rightView.getFullDate(), numberOfMonths: 1, onMonthChange: this.handleRightMonthChange, toMonth: maxDate })),
            ];
        }
    }
    updateLeftView(leftView) {
        let rightView = this.state.rightView.clone();
        if (!leftView.isBefore(rightView) || this.props.contiguousCalendarMonths) {
            rightView = leftView.getNextMonth();
        }
        this.setViews(leftView, rightView);
    }
    updateRightView(rightView) {
        let leftView = this.state.leftView.clone();
        if (!rightView.isAfter(leftView) || this.props.contiguousCalendarMonths) {
            leftView = rightView.getPreviousMonth();
        }
        this.setViews(leftView, rightView);
    }
    setViews(leftView, rightView) {
        this.setState({ leftView, rightView });
    }
};
DateRangePicker.defaultProps = {
    allowSingleDayRange: false,
    contiguousCalendarMonths: true,
    dayPickerProps: {},
    maxDate: getDefaultMaxDate(),
    minDate: getDefaultMinDate(),
    reverseMonthAndYearMenus: false,
    shortcuts: true,
    singleMonthOnly: false,
    timePickerProps: {},
};
DateRangePicker.displayName = `${DISPLAYNAME_PREFIX}.DateRangePicker`;
DateRangePicker = DateRangePicker_1 = tslib_1.__decorate([
    polyfill
], DateRangePicker);
export { DateRangePicker };
function getStateChange(value, nextValue, state, contiguousCalendarMonths) {
    if (value != null && nextValue == null) {
        return { value: [null, null] };
    }
    else if (nextValue != null) {
        let leftView = state.leftView.clone();
        let rightView = state.rightView.clone();
        const nextValueStartView = MonthAndYear.fromDate(nextValue[0]);
        const nextValueEndView = MonthAndYear.fromDate(nextValue[1]);
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
            leftView,
            rightView,
            value: nextValue,
        };
    }
    else if (contiguousCalendarMonths === true) {
        // contiguousCalendarMonths is toggled on.
        // If the previous leftView and rightView are not contiguous, then set the right DayPicker to left + 1
        if (!state.leftView.getNextMonth().isSameMonth(state.rightView)) {
            const nextRightView = state.leftView.getNextMonth();
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
    const today = new Date();
    // != because we must have a real `Date` to begin the calendar on.
    if (props.initialMonth != null) {
        return props.initialMonth;
    }
    else if (value[0] != null) {
        return DateUtils.clone(value[0]);
    }
    else if (value[1] != null) {
        const month = DateUtils.clone(value[1]);
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