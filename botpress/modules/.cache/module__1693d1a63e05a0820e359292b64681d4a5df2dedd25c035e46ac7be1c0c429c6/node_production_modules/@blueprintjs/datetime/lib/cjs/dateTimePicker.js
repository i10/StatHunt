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
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var react_lifecycles_compat_1 = require("react-lifecycles-compat");
var core_1 = require("@blueprintjs/core");
var Classes = tslib_1.__importStar(require("./common/classes"));
var DateUtils = tslib_1.__importStar(require("./common/dateUtils"));
var datePicker_1 = require("./datePicker");
var timePicker_1 = require("./timePicker");
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
            core_1.Utils.safeInvoke(_this.props.onChange, value, isUserChange);
        };
        _this.handleTimeChange = function (timeValue) {
            if (_this.props.value === undefined) {
                _this.setState({ timeValue: timeValue });
            }
            var value = DateUtils.getDateTime(_this.state.dateValue, timeValue);
            core_1.Utils.safeInvoke(_this.props.onChange, value, true);
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
        return (React.createElement("div", { className: classnames_1.default(Classes.DATETIMEPICKER, this.props.className) },
            React.createElement(datePicker_1.DatePicker, tslib_1.__assign({}, this.props.datePickerProps, { canClearSelection: this.props.canClearSelection, onChange: this.handleDateChange, value: value })),
            React.createElement(timePicker_1.TimePicker, tslib_1.__assign({}, this.props.timePickerProps, { onChange: this.handleTimeChange, value: value }))));
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
    DateTimePicker.displayName = core_1.DISPLAYNAME_PREFIX + ".DateTimePicker";
    DateTimePicker = tslib_1.__decorate([
        react_lifecycles_compat_1.polyfill
    ], DateTimePicker);
    return DateTimePicker;
}(core_1.AbstractPureComponent2));
exports.DateTimePicker = DateTimePicker;
//# sourceMappingURL=dateTimePicker.js.map