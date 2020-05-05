/// <reference types="react" />
import { AbstractPureComponent2, IProps } from "@blueprintjs/core";
import { DayPickerProps } from "react-day-picker";
import { IDatePickerBaseProps } from "./datePickerCore";
import { IDatePickerShortcut } from "./shortcuts";
export interface IDatePickerProps extends IDatePickerBaseProps, IProps {
    /**
     * Allows the user to clear the selection by clicking the currently selected day.
     * @default true
     */
    canClearSelection?: boolean;
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
     * Initial day the calendar will display as selected.
     * This should not be set if `value` is set.
     */
    defaultValue?: Date;
    /**
     * Whether the current day should be highlighted in the calendar.
     * @default false
     */
    highlightCurrentDay?: boolean;
    /**
     * Called when the user selects a day.
     * If being used in an uncontrolled manner, `selectedDate` will be `null` if the user clicks the currently selected
     * day. If being used in a controlled manner, `selectedDate` will contain the day clicked no matter what.
     * `isUserChange` is true if the user selected a day, and false if the date was automatically changed
     * by the user navigating to a new month or year rather than explicitly clicking on a date in the calendar.
     */
    onChange?: (selectedDate: Date, isUserChange: boolean) => void;
    /**
     * Called when the `shortcuts` props is enabled and the user changes the shortcut.
     */
    onShortcutChange?: (shortcut: IDatePickerShortcut, index: number) => void;
    /**
     * Whether the bottom bar displaying "Today" and "Clear" buttons should be shown.
     * @default false
     */
    showActionsBar?: boolean;
    /**
     * Whether shortcuts to quickly select a date are displayed or not.
     * If `true`, preset shortcuts will be displayed.
     * If `false`, no shortcuts will be displayed.
     * If an array is provided, the custom shortcuts will be displayed.
     */
    shortcuts?: boolean | IDatePickerShortcut[];
    /**
     * The currently selected shortcut.
     * If this prop is provided, the component acts in a controlled manner.
     */
    selectedShortcutIndex?: number;
    /**
     * Text for the today button in the action bar.
     * @default "Today"
     */
    todayButtonText?: string;
    /**
     * Text for the reset button in the action bar.
     * @default "Clear"
     */
    clearButtonText?: string;
    /**
     * The currently selected day. If this prop is provided, the component acts in a controlled manner.
     */
    value?: Date;
}
export interface IDatePickerState {
    displayMonth: number;
    displayYear: number;
    selectedDay: number | null;
    value: Date | null;
    selectedShortcutIndex?: number;
}
export declare class DatePicker extends AbstractPureComponent2<IDatePickerProps, IDatePickerState> {
    static defaultProps: IDatePickerProps;
    static displayName: string;
    private ignoreNextMonthChange;
    constructor(props: IDatePickerProps, context?: any);
    render(): JSX.Element;
    componentDidUpdate(prevProps: IDatePickerProps, prevState: IDatePickerState, snapshot?: {}): void;
    protected validateProps(props: IDatePickerProps): void;
    private isToday;
    private shouldHighlightCurrentDay;
    private getDatePickerModifiers;
    private renderDay;
    private disabledDays;
    private getDisabledDaysModifier;
    private renderCaption;
    private renderNavbar;
    private renderOptionsBar;
    private maybeRenderTimePicker;
    private maybeRenderShortcuts;
    private handleDayClick;
    private handleShortcutClick;
    private updateDay;
    private computeValidDateInSpecifiedMonthYear;
    private handleClearClick;
    private handleMonthChange;
    private handleTodayClick;
    private handleTimeChange;
    /**
     * Update `value` by invoking `onChange` (always) and setting state (if uncontrolled).
     */
    private updateValue;
}