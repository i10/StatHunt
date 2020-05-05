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
import * as tslib_1 from "tslib";
import { AbstractPureComponent2, Divider, HTMLSelect, Icon, Utils } from "@blueprintjs/core";
import * as React from "react";
import { polyfill } from "react-lifecycles-compat";
import * as Classes from "./common/classes";
import { clone } from "./common/dateUtils";
import { measureTextWidth } from "./common/utils";
var DatePickerCaption = /** @class */ (function (_super) {
    tslib_1.__extends(DatePickerCaption, _super);
    function DatePickerCaption() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { monthRightOffset: 0 };
        _this.handleMonthSelectChange = _this.dateChangeHandler(function (d, month) { return d.setMonth(month); }, _this.props.onMonthChange);
        _this.handleYearSelectChange = _this.dateChangeHandler(function (d, year) { return d.setFullYear(year); }, _this.props.onYearChange);
        return _this;
    }
    DatePickerCaption.prototype.render = function () {
        var _this = this;
        var _a = this.props, date = _a.date, locale = _a.locale, localeUtils = _a.localeUtils, minDate = _a.minDate, maxDate = _a.maxDate, _b = _a.months, months = _b === void 0 ? localeUtils.getMonths(locale) : _b;
        var minYear = minDate.getFullYear();
        var maxYear = maxDate.getFullYear();
        var displayMonth = date.getMonth();
        var displayYear = date.getFullYear();
        // build the list of available months, limiting based on minDate and maxDate as necessary
        var startMonth = displayYear === minYear ? minDate.getMonth() : 0;
        var endMonth = displayYear === maxYear ? maxDate.getMonth() + 1 : undefined;
        var monthOptionElements = months
            .map(function (month, i) { return ({ label: month, value: i }); })
            .slice(startMonth, endMonth);
        var years = [minYear];
        for (var year = minYear + 1; year <= maxYear; ++year) {
            years.push(year);
        }
        // allow out-of-bounds years but disable the option. this handles the Dec 2016 case in #391.
        if (displayYear > maxYear) {
            years.push({ value: displayYear, disabled: true });
        }
        this.displayedMonthText = months[displayMonth];
        var monthSelect = (React.createElement(HTMLSelect, { iconProps: { style: { right: this.state.monthRightOffset } }, className: Classes.DATEPICKER_MONTH_SELECT, key: "month", minimal: true, onChange: this.handleMonthSelectChange, value: displayMonth, options: monthOptionElements }));
        var yearSelect = (React.createElement(HTMLSelect, { className: Classes.DATEPICKER_YEAR_SELECT, key: "year", minimal: true, onChange: this.handleYearSelectChange, value: displayYear, options: years }));
        var orderedSelects = this.props.reverseMonthAndYearMenus
            ? [yearSelect, monthSelect]
            : [monthSelect, yearSelect];
        return (React.createElement("div", { className: this.props.classNames.caption },
            React.createElement("div", { className: Classes.DATEPICKER_CAPTION, ref: function (ref) { return (_this.containerElement = ref); } }, orderedSelects),
            React.createElement(Divider, null)));
    };
    DatePickerCaption.prototype.componentDidMount = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.positionArrows(); });
    };
    DatePickerCaption.prototype.componentDidUpdate = function () {
        this.positionArrows();
    };
    DatePickerCaption.prototype.positionArrows = function () {
        // measure width of text as rendered inside our container element.
        var monthTextWidth = measureTextWidth(this.displayedMonthText, Classes.DATEPICKER_CAPTION_MEASURE, this.containerElement);
        var monthSelectWidth = this.containerElement == null ? 0 : this.containerElement.firstElementChild.clientWidth;
        var rightOffset = Math.max(2, monthSelectWidth - monthTextWidth - Icon.SIZE_STANDARD - 2);
        this.setState({ monthRightOffset: rightOffset });
    };
    DatePickerCaption.prototype.dateChangeHandler = function (updater, handler) {
        var _this = this;
        return function (e) {
            var value = parseInt(e.target.value, 10);
            var newDate = clone(_this.props.date);
            updater(newDate, value);
            Utils.safeInvoke(_this.props.onDateChange, newDate);
            Utils.safeInvoke(handler, value);
        };
    };
    DatePickerCaption = tslib_1.__decorate([
        polyfill
    ], DatePickerCaption);
    return DatePickerCaption;
}(AbstractPureComponent2));
export { DatePickerCaption };
//# sourceMappingURL=datePickerCaption.js.map