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
import classNames from "classnames";
import * as React from "react";
import { polyfill } from "react-lifecycles-compat";
import { AbstractPureComponent2, DISPLAYNAME_PREFIX, Utils } from "@blueprintjs/core";
import * as Classes from "./common/classes";
import * as DateUtils from "./common/dateUtils";
import { DatePicker } from "./datePicker";
import { TimePicker } from "./timePicker";
/** @deprecated since 3.4.0. Prefer `<DatePicker>` with `timePrecision` and `timePickerProps`. */
var DateTimePicker = /** @class */ (function (_super) {
    tslib_1.__extends(DateTimePicker, _super);
    function DateTimePicker(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.handleDateChange = function (dateValue, isUserChange) {
            if (_this.props.value === undefined) {
                _this.setState({ dateValue: dateValue });
            }
            var value = DateUtils.getDateTime(dateValue, _this.state.timeValue);
            Utils.safeInvoke(_this.props.onChange, value, isUserChange);
        };
        _this.handleTimeChange = function (timeValue) {
            if (_this.props.value === undefined) {
                _this.setState({ timeValue: timeValue });
            }
            var value = DateUtils.getDateTime(_this.state.dateValue, timeValue);
            Utils.safeInvoke(_this.props.onChange, value, true);
        };
        var initialValue = _this.props.value !== undefined ? _this.props.value : _this.props.defaultValue;
        _this.state = {
            dateValue: initialValue,
            timeValue: initialValue,
        };
        return _this;
    }
    DateTimePicker.prototype.render = function () {
        var value = DateUtils.getDateTime(this.state.dateValue, this.state.timeValue);
        return (React.createElement("div", { className: classNames(Classes.DATETIMEPICKER, this.props.className) },
            React.createElement(DatePicker, tslib_1.__assign({}, this.props.datePickerProps, { canClearSelection: this.props.canClearSelection, onChange: this.handleDateChange, value: value })),
            React.createElement(TimePicker, tslib_1.__assign({}, this.props.timePickerProps, { onChange: this.handleTimeChange, value: value }))));
    };
    DateTimePicker.prototype.componentDidUpdate = function (prevProps) {
        if (this.props.value === prevProps.value) {
            return;
        }
        else if (this.props.value != null) {
            this.setState({
                dateValue: this.props.value,
                timeValue: this.props.value,
            });
        }
        else {
            // clear only the date to remove the selected-date style in the calendar
            this.setState({ dateValue: null });
        }
    };
    DateTimePicker.defaultProps = {
        canClearSelection: true,
        defaultValue: new Date(),
    };
    DateTimePicker.displayName = DISPLAYNAME_PREFIX + ".DateTimePicker";
    DateTimePicker = tslib_1.__decorate([
        polyfill
    ], DateTimePicker);
    return DateTimePicker;
}(AbstractPureComponent2));
export { DateTimePicker };
//# sourceMappingURL=dateTimePicker.js.map