/// <reference types="react" />
import { DayPickerProps } from "react-day-picker";
import { AbstractPureComponent2, Boundary, HTMLInputProps, IInputGroupProps, IPopoverProps, IProps } from "@blueprintjs/core";
import { DateRange } from "./common/dateUtils";
import { IDateFormatProps } from "./dateFormat";
import { IDatePickerBaseProps } from "./datePickerCore";
import { IDateRangeShortcut } from "./shortcuts";
export interface IDateRangeInputProps extends IDatePickerBaseProps, IDateFormatProps, IProps {
    /**
     * Whether the start and end dates of the range can be the same day.
     * If `true`, clicking a selected date will create a one-day range.
     * If `false`, clicking a selected date will clear the selection.
     * @default false
     */
    allowSingleDayRange?: boolean;
    /**
     * Whether the calendar popover should close when a date range is fully selected.
     * @default true
     */
    closeOnSelection?: boolean;
    /**
     * Whether displayed months in the calendar are contiguous.
     * If false, each side of the calendar can move independently to non-contiguous months.
     * @default true
     */
    contiguousCalendarMonths?: boolean;
    /**
     * Props to pass to ReactDayPicker. See API documentation
     * [here](http://react-day-picker.js.org/api/DayPicker).
     *
     * The following props are managed by the component and cannot be configured:
     * `canChangeMonth`, `captionElement`, `numberOfMonths`, `fromMonth` (use
     * `minDate`), `month` (use `initialMonth`), `toMonth` (use `maxDate`).
     */
    dayPickerProps?: DayPickerProps;
    /**
     * The default date range to be used in the component when uncontrolled.
     * This will be ignored if `value` is set.
     */
    defaultValue?: DateRange;
    /**
     * Whether the text inputs are non-interactive.
     * @default false
     */
    disabled?: boolean;
    /**
     * Props to pass to the end-date [input group](#core/components/text-inputs.input-group).
     * `disabled` and `value` will be ignored in favor of the top-level props on this component.
     * `ref` is not supported; use `inputRef` instead.
     */
    endInputProps?: HTMLInputProps & IInputGroupProps;
    /**
     * Called when the user selects a day.
     * If no days are selected, it will pass `[null, null]`.
     * If a start date is selected but not an end date, it will pass `[selectedDate, null]`.
     * If both a start and end date are selected, it will pass `[startDate, endDate]`.
     */
    onChange?: (selectedRange: DateRange) => void;
    /**
     * Called when the user finishes typing in a new date and the date causes an error state.
     * If the date is invalid, `new Date(undefined)` will be returned for the corresponding
     * boundary of the date range.
     * If the date is out of range, the out-of-range date will be returned for the corresponding
     * boundary of the date range (`onChange` is not called in this case).
     */
    onError?: (errorRange: DateRange) => void;
    /**
     * The error message to display when the selected dates overlap.
     * This can only happen when typing dates in the input field.
     * @default "Overlapping dates"
     */
    overlappingDatesMessage?: string;
    /**
     * The props to pass to the popover.
     * `autoFocus`, `content`, and `enforceFocus` will be ignored to avoid compromising usability.
     */
    popoverProps?: Partial<IPopoverProps>;
    /**
     * Whether the entire text field should be selected on focus.
     * @default false
     */
    selectAllOnFocus?: boolean;
    /**
     * Whether shortcuts to quickly select a range of dates are displayed or not.
     * If `true`, preset shortcuts will be displayed.
     * If `false`, no shortcuts will be displayed.
     * If an array is provided, the custom shortcuts will be displayed.
     * @default true
     */
    shortcuts?: boolean | IDateRangeShortcut[];
    /**
     * Whether to show only a single month calendar.
     * @default false
     */
    singleMonthOnly?: boolean;
    /**
     * Props to pass to the start-date [input group](#core/components/text-inputs.input-group).
     * `disabled` and `value` will be ignored in favor of the top-level props on this component.
     * `ref` is not supported; use `inputRef` instead.
     */
    startInputProps?: HTMLInputProps & IInputGroupProps;
    /**
     * The currently selected date range.
     * If the prop is strictly `undefined`, the component acts in an uncontrolled manner.
     * If this prop is anything else, the component acts in a controlled manner.
     * To display an empty value in the input fields in a controlled manner, pass `[null, null]`.
     * To display an invalid date error in either input field, pass `new Date(undefined)`
     * for the appropriate date in the value prop.
     */
    value?: DateRange;
}
export interface IDateRangeInputState {
    isOpen?: boolean;
    boundaryToModify?: Boundary;
    lastFocusedField?: Boundary;
    formattedMinDateString?: string;
    formattedMaxDateString?: string;
    isStartInputFocused?: boolean;
    isEndInputFocused?: boolean;
    startInputString?: string;
    endInputString?: string;
    startHoverString?: string;
    endHoverString?: string;
    selectedEnd?: Date;
    selectedStart?: Date;
    shouldSelectAfterUpdate?: boolean;
    wasLastFocusChangeDueToHover?: boolean;
    selectedShortcutIndex?: number;
}
export declare class DateRangeInput extends AbstractPureComponent2<IDateRangeInputProps, IDateRangeInputState> {
    static defaultProps: Partial<IDateRangeInputProps>;
    static displayName: string;
    private startInputRef;
    private endInputRef;
    private refHandlers;
    constructor(props: IDateRangeInputProps, context?: any);
    /**
     * Public method intended for unit testing only. Do not use in feature work!
     */
    reset(props?: IDateRangeInputProps): void;
    componentDidUpdate(prevProps: IDateRangeInputProps, prevState: IDateRangeInputState, snapshot?: {}): void;
    render(): JSX.Element;
    protected validateProps(props: IDateRangeInputProps): void;
    private renderInputGroup;
    private handleDateRangePickerChange;
    private handleShortcutChange;
    private handleDateRangePickerHoverChange;
    private handleStartInputEvent;
    private handleEndInputEvent;
    private handleInputEvent;
    private handleInputKeyDown;
    private handleInputMouseDown;
    private handleInputClick;
    private handleInputFocus;
    private handleInputBlur;
    private handleInputChange;
    private handlePopoverClose;
    private shouldFocusInputRef;
    private getIsOpenValueWhenDateChanges;
    private getInitialRange;
    private getSelectedRange;
    private getInputGroupCallbackForEvent;
    private getInputDisplayString;
    private getInputPlaceholderString;
    private getInputProps;
    private getInputRef;
    private getStateKeysAndValuesForBoundary;
    private getDateRangeForCallback;
    private getOtherBoundary;
    private doBoundaryDatesOverlap;
    /**
     * Returns true if the provided boundary is an END boundary overlapping the
     * selected start date. (If the boundaries overlap, we consider the END
     * boundary to be erroneous.)
     */
    private doesEndBoundaryOverlapStartBoundary;
    private isControlled;
    private isInputEmpty;
    private isInputInErrorState;
    private isDateValidAndInRange;
    private isNextDateRangeValid;
    private getFormattedMinMaxDateString;
    private parseDate;
    private formatDate;
}
