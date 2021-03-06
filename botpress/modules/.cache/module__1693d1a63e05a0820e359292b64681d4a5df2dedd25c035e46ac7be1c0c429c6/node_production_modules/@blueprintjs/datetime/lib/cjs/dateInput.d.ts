/// <reference types="react" />
import { DayPickerProps } from "react-day-picker";
import { AbstractPureComponent2, HTMLInputProps, IInputGroupProps, IPopoverProps, IProps } from "@blueprintjs/core";
import { IDateFormatProps } from "./dateFormat";
import { IDatePickerBaseProps } from "./datePickerCore";
import { IDatePickerShortcut } from "./shortcuts";
export interface IDateInputProps extends IDatePickerBaseProps, IDateFormatProps, IProps {
    /**
     * Allows the user to clear the selection by clicking the currently selected day.
     * Passed to `DatePicker` component.
     * @default true
     */
    canClearSelection?: boolean;
    /**
     * Text for the reset button in the date picker action bar.
     * Passed to `DatePicker` component.
     * @default "Clear"
     */
    clearButtonText?: string;
    /**
     * Whether the calendar popover should close when a date is selected.
     * @default true
     */
    closeOnSelection?: boolean;
    /**
     * Props to pass to ReactDayPicker. See API documentation
     * [here](http://react-day-picker.js.org/api/DayPicker).
     *
     * The following props are managed by the component and cannot be configured:
     * `canChangeMonth`, `captionElement`, `fromMonth` (use `minDate`), `month` (use
     * `initialMonth`), `toMonth` (use `maxDate`).
     */
    dayPickerProps?: DayPickerProps;
    /**
     * Whether the date input is non-interactive.
     * @default false
     */
    disabled?: boolean;
    /**
     * The default date to be used in the component when uncontrolled.
     */
    defaultValue?: Date;
    /**
     * Whether the component should take up the full width of its container.
     */
    fill?: boolean;
    /**
     * Props to pass to the [input group](#core/components/text-inputs.input-group).
     * `disabled` and `value` will be ignored in favor of the top-level props on this component.
     * `type` is fixed to "text" and `ref` is not supported; use `inputRef` instead.
     */
    inputProps?: HTMLInputProps & IInputGroupProps;
    /**
     * Called when the user selects a new valid date through the `DatePicker` or by typing
     * in the input. The second argument is true if the user clicked on a date in the
     * calendar, changed the input value, or cleared the selection; it will be false if the date
     * was changed by choosing a new month or year.
     */
    onChange?: (selectedDate: Date, isUserChange: boolean) => void;
    /**
     * Called when the user finishes typing in a new date and the date causes an error state.
     * If the date is invalid, `new Date(undefined)` will be returned. If the date is out of range,
     * the out of range date will be returned (`onChange` is not called in this case).
     */
    onError?: (errorDate: Date) => void;
    /**
     * Props to pass to the `Popover`.
     * Note that `content`, `autoFocus`, and `enforceFocus` cannot be changed.
     */
    popoverProps?: Partial<IPopoverProps> & object;
    /**
     * Element to render on right side of input.
     */
    rightElement?: JSX.Element;
    /**
     * Whether the bottom bar displaying "Today" and "Clear" buttons should be shown below the calendar.
     * @default false
     */
    showActionsBar?: boolean;
    /**
     * Whether shortcuts to quickly select a date are displayed or not.
     * If `true`, preset shortcuts will be displayed.
     * If `false`, no shortcuts will be displayed.
     * If an array is provided, the custom shortcuts will be displayed.
     * @default false
     */
    shortcuts?: boolean | IDatePickerShortcut[];
    /**
     * The currently selected day. If this prop is provided, the component acts in a controlled manner.
     * To display no date in the input field, pass `null` to the value prop. To display an invalid date error
     * in the input field, pass `new Date(undefined)` to the value prop.
     */
    value?: Date | null;
    /**
     * Text for the today button in the date picker action bar.
     * Passed to `DatePicker` component.
     * @default "Today"
     */
    todayButtonText?: string;
}
export interface IDateInputState {
    value: Date;
    valueString: string;
    isInputFocused: boolean;
    isOpen: boolean;
    selectedShortcutIndex?: number;
}
export declare class DateInput extends AbstractPureComponent2<IDateInputProps, IDateInputState> {
    static displayName: string;
    static defaultProps: Partial<IDateInputProps>;
    state: IDateInputState;
    private inputEl;
    private popoverContentEl;
    private lastElementInPopover;
    componentWillUnmount(): void;
    render(): JSX.Element;
    componentDidUpdate(prevProps: IDateInputProps, prevState: IDateInputState, snapshot?: {}): void;
    private inputRef;
    private isDateInRange;
    private handleClosePopover;
    private handleDateChange;
    private hasMonthChanged;
    private hasTimeChanged;
    private handleInputFocus;
    private handleInputClick;
    private handleInputChange;
    private handleInputBlur;
    private handleInputKeyDown;
    private handlePopoverBlur;
    private registerPopoverBlurHandler;
    private unregisterPopoverBlurHandler;
    private handleShortcutChange;
    /** safe wrapper around invoking input props event handler (prop defaults to undefined) */
    private safeInvokeInputProp;
    private parseDate;
    private formatDate;
}
