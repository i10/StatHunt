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
let DateInput = class DateInput extends AbstractPureComponent2 {
    constructor() {
        super(...arguments);
        this.state = {
            isInputFocused: false,
            isOpen: false,
            value: this.props.value !== undefined ? this.props.value : this.props.defaultValue,
            valueString: null,
        };
        this.inputEl = null;
        this.popoverContentEl = null;
        this.lastElementInPopover = null;
        this.inputRef = (ref) => {
            this.inputEl = ref;
            const { inputProps = {} } = this.props;
            Utils.safeInvoke(inputProps.inputRef, ref);
        };
        this.handleClosePopover = (e) => {
            const { popoverProps = {} } = this.props;
            Utils.safeInvoke(popoverProps.onClose, e);
            this.setState({ isOpen: false });
        };
        this.handleDateChange = (newDate, isUserChange, didSubmitWithEnter = false) => {
            const prevDate = this.state.value;
            // this change handler was triggered by a change in month, day, or (if
            // enabled) time. for UX purposes, we want to close the popover only if
            // the user explicitly clicked a day within the current month.
            const isOpen = !isUserChange ||
                !this.props.closeOnSelection ||
                (prevDate != null && (this.hasMonthChanged(prevDate, newDate) || this.hasTimeChanged(prevDate, newDate)));
            // if selecting a date via click or Tab, the input will already be
            // blurred by now, so sync isInputFocused to false. if selecting via
            // Enter, setting isInputFocused to false won't do anything by itself,
            // plus we want the field to retain focus anyway.
            // (note: spelling out the ternary explicitly reads more clearly.)
            const isInputFocused = didSubmitWithEnter ? true : false;
            if (this.props.value === undefined) {
                const valueString = getFormattedDateString(newDate, this.props);
                this.setState({ isInputFocused, isOpen, value: newDate, valueString });
            }
            else {
                this.setState({ isInputFocused, isOpen });
            }
            Utils.safeInvoke(this.props.onChange, newDate, isUserChange);
        };
        this.handleInputFocus = (e) => {
            const valueString = this.state.value == null ? "" : this.formatDate(this.state.value);
            this.setState({ isInputFocused: true, isOpen: true, valueString });
            this.safeInvokeInputProp("onFocus", e);
        };
        this.handleInputClick = (e) => {
            // stop propagation to the Popover's internal handleTargetClick handler;
            // otherwise, the popover will flicker closed as soon as it opens.
            e.stopPropagation();
            this.safeInvokeInputProp("onClick", e);
        };
        this.handleInputChange = (e) => {
            const valueString = e.target.value;
            const value = this.parseDate(valueString);
            if (isDateValid(value) && this.isDateInRange(value)) {
                if (this.props.value === undefined) {
                    this.setState({ value, valueString });
                }
                else {
                    this.setState({ valueString });
                }
                Utils.safeInvoke(this.props.onChange, value, true);
            }
            else {
                if (valueString.length === 0) {
                    Utils.safeInvoke(this.props.onChange, null, true);
                }
                this.setState({ valueString });
            }
            this.safeInvokeInputProp("onChange", e);
        };
        this.handleInputBlur = (e) => {
            const { valueString } = this.state;
            const date = this.parseDate(valueString);
            if (valueString.length > 0 &&
                valueString !== getFormattedDateString(this.state.value, this.props) &&
                (!isDateValid(date) || !this.isDateInRange(date))) {
                if (this.props.value === undefined) {
                    this.setState({ isInputFocused: false, value: date, valueString: null });
                }
                else {
                    this.setState({ isInputFocused: false });
                }
                if (isNaN(date.valueOf())) {
                    Utils.safeInvoke(this.props.onError, new Date(undefined));
                }
                else if (!this.isDateInRange(date)) {
                    Utils.safeInvoke(this.props.onError, date);
                }
                else {
                    Utils.safeInvoke(this.props.onChange, date, true);
                }
            }
            else {
                if (valueString.length === 0) {
                    this.setState({ isInputFocused: false, value: null, valueString: null });
                }
                else {
                    this.setState({ isInputFocused: false });
                }
            }
            this.registerPopoverBlurHandler();
            this.safeInvokeInputProp("onBlur", e);
        };
        this.handleInputKeyDown = (e) => {
            if (e.which === Keys.ENTER) {
                const nextDate = this.parseDate(this.state.valueString);
                this.handleDateChange(nextDate, true, true);
            }
            else if (e.which === Keys.TAB) {
                this.setState({ isOpen: false });
            }
            else if (e.which === Keys.ESCAPE) {
                this.setState({ isOpen: false });
                this.inputEl.blur();
            }
            this.safeInvokeInputProp("onKeyDown", e);
        };
        // focus DOM event listener (not React event)
        this.handlePopoverBlur = (e) => {
            let relatedTarget = e.relatedTarget;
            if (relatedTarget == null) {
                // Support IE11 (#2924)
                relatedTarget = document.activeElement;
            }
            // Beware: this.popoverContentEl is sometimes null under Chrome
            if (relatedTarget == null ||
                (this.popoverContentEl != null && !this.popoverContentEl.contains(relatedTarget))) {
                this.handleClosePopover();
            }
            else if (relatedTarget != null) {
                this.unregisterPopoverBlurHandler();
                this.lastElementInPopover = relatedTarget;
                this.lastElementInPopover.addEventListener("blur", this.handlePopoverBlur);
            }
        };
        this.registerPopoverBlurHandler = () => {
            if (this.popoverContentEl != null) {
                // If current activeElement exists inside popover content, a month
                // change has triggered and this element should be lastTabbableElement
                let lastTabbableElement = this.popoverContentEl.contains(document.activeElement)
                    ? document.activeElement
                    : undefined;
                // Popover contents are well structured, but the selector will need
                // to be updated if more focusable components are added in the future
                if (lastTabbableElement == null) {
                    const tabbableElements = this.popoverContentEl.querySelectorAll("input, [tabindex]:not([tabindex='-1'])");
                    const numOfElements = tabbableElements.length;
                    if (numOfElements > 0) {
                        // Keep track of the last focusable element in popover and add
                        // a blur handler, so that when:
                        // * user tabs to the next element, popover closes
                        // * focus moves to element within popover, popover stays open
                        lastTabbableElement = tabbableElements[numOfElements - 1];
                    }
                }
                this.unregisterPopoverBlurHandler();
                this.lastElementInPopover = lastTabbableElement;
                this.lastElementInPopover.addEventListener("blur", this.handlePopoverBlur);
            }
        };
        this.unregisterPopoverBlurHandler = () => {
            if (this.lastElementInPopover != null) {
                this.lastElementInPopover.removeEventListener("blur", this.handlePopoverBlur);
            }
        };
        this.handleShortcutChange = (_, selectedShortcutIndex) => {
            this.setState({ selectedShortcutIndex });
        };
    }
    componentWillUnmount() {
        super.componentWillUnmount();
        this.unregisterPopoverBlurHandler();
    }
    render() {
        const { value, valueString } = this.state;
        const dateString = this.state.isInputFocused ? valueString : getFormattedDateString(value, this.props);
        const dateValue = isDateValid(value) ? value : null;
        const dayPickerProps = {
            ...this.props.dayPickerProps,
            // dom elements for the updated month is not available when
            // onMonthChange is called. setTimeout is necessary to wait
            // for the updated month to be rendered
            onMonthChange: (month) => {
                Utils.safeInvoke(this.props.dayPickerProps.onMonthChange, month);
                this.setTimeout(this.registerPopoverBlurHandler);
            },
        };
        const wrappedPopoverContent = (React.createElement("div", { ref: ref => (this.popoverContentEl = ref) },
            React.createElement(DatePicker, Object.assign({}, this.props, { dayPickerProps: dayPickerProps, onChange: this.handleDateChange, value: dateValue, onShortcutChange: this.handleShortcutChange, selectedShortcutIndex: this.state.selectedShortcutIndex }))));
        // assign default empty object here to prevent mutation
        const { inputProps = {}, popoverProps = {} } = this.props;
        const isErrorState = value != null && (!isDateValid(value) || !this.isDateInRange(value));
        return (React.createElement(Popover, Object.assign({ isOpen: this.state.isOpen && !this.props.disabled, fill: this.props.fill }, popoverProps, { autoFocus: false, className: classNames(popoverProps.className, this.props.className), content: wrappedPopoverContent, enforceFocus: false, onClose: this.handleClosePopover, popoverClassName: classNames(Classes.DATEINPUT_POPOVER, popoverProps.popoverClassName) }),
            React.createElement(InputGroup, Object.assign({ autoComplete: "off", intent: isErrorState ? Intent.DANGER : Intent.NONE, placeholder: this.props.placeholder, rightElement: this.props.rightElement, type: "text" }, inputProps, { disabled: this.props.disabled, inputRef: this.inputRef, onBlur: this.handleInputBlur, onChange: this.handleInputChange, onClick: this.handleInputClick, onFocus: this.handleInputFocus, onKeyDown: this.handleInputKeyDown, value: dateString }))));
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        super.componentDidUpdate(prevProps, prevState, snapshot);
        if (prevProps.value !== this.props.value) {
            this.setState({ value: this.props.value });
        }
    }
    isDateInRange(value) {
        return isDayInRange(value, [this.props.minDate, this.props.maxDate]);
    }
    hasMonthChanged(prevDate, nextDate) {
        return (prevDate == null) !== (nextDate == null) || nextDate.getMonth() !== prevDate.getMonth();
    }
    hasTimeChanged(prevDate, nextDate) {
        if (this.props.timePrecision == null) {
            return false;
        }
        return ((prevDate == null) !== (nextDate == null) ||
            nextDate.getHours() !== prevDate.getHours() ||
            nextDate.getMinutes() !== prevDate.getMinutes() ||
            nextDate.getSeconds() !== prevDate.getSeconds() ||
            nextDate.getMilliseconds() !== prevDate.getMilliseconds());
    }
    /** safe wrapper around invoking input props event handler (prop defaults to undefined) */
    safeInvokeInputProp(name, e) {
        const { inputProps = {} } = this.props;
        Utils.safeInvoke(inputProps[name], e);
    }
    parseDate(dateString) {
        if (dateString === this.props.outOfRangeMessage || dateString === this.props.invalidDateMessage) {
            return null;
        }
        const { locale, parseDate } = this.props;
        const newDate = parseDate(dateString, locale);
        return newDate === false ? new Date(undefined) : newDate;
    }
    formatDate(date) {
        if (!isDateValid(date) || !this.isDateInRange(date)) {
            return "";
        }
        const { locale, formatDate } = this.props;
        return formatDate(date, locale);
    }
};
DateInput.displayName = `${DISPLAYNAME_PREFIX}.DateInput`;
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
export { DateInput };
//# sourceMappingURL=dateInput.js.map