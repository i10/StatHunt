/// <reference types="react" />
import { AbstractPureComponent2, Boundary, IProps } from "@blueprintjs/core";
import { DayPickerProps } from "react-day-picker";
import * as DateUtils from "./common/dateUtils";
import DateRange = DateUtils.DateRange;
import { MonthAndYear } from "./common/monthAndYear";
import { IDatePickerBaseProps } from "./datePickerCore";
import { IDateRangeShortcut } from "./shortcuts";
export interface IDateRangePickerProps extends IDatePickerBaseProps, IProps {
    /**
     * Whether the start and end dates of the range can be the same day.
     * If `true`, clicking a selected date will create a one-day range.
     * If `false`, clicking a selected date will clear the selection.
     * @default false
     */
    allowSingleDayRange?: boolean;
    /**
     * The date-range boundary that the next click should modify.
     * This will be honored unless the next click would overlap the other boundary date.
     * In that case, the two boundary dates will be auto-swapped to keep them in chronological order.
     * If `undefined`, the picker will revert to its default selection behavior.
     */
    boundaryToModify?: Boundary;
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
     * Initial `DateRange` the calendar will display as selected.
     * This should not be set if `value` is set.
     */
    defaultValue?: DateRange;
    /**
     * Called when the user selects a day.
     * If no days are selected, it will pass `[null, null]`.
     * If a start date is selected but not an end date, it will pass `[selectedDate, null]`.
     * If both a start and end date are selected, it will pass `[startDate, endDate]`.
     */
    onChange?: (selectedDates: DateRange) => void;
    /**
     * Called when the user changes the hovered date range, either from mouseenter or mouseleave.
     * When triggered from mouseenter, it will pass the date range that would result from next click.
     * When triggered from mouseleave, it will pass `undefined`.
     */
    onHoverChange?: (hoveredDates: DateRange, hoveredDay: Date, hoveredBoundary: Boundary) => void;
    /**
     * Called when the `shortcuts` props is enabled and the user changes the shortcut.
     */
    onShortcutChange?: (shortcut: IDateRangeShortcut, index: number) => void;
    /**
     * Whether shortcuts to quickly select a range of dates are displayed or not.
     * If `true`, preset shortcuts will be displayed.
     * If `false`, no shortcuts will be displayed.
     * If an array is provided, the custom shortcuts will be displayed.
     * @default true
     */
    shortcuts?: boolean | IDateRangeShortcut[];
    /**
     * The currently selected shortcut.
     * If this prop is provided, the component acts in a controlled manner.
     */
    selectedShortcutIndex?: number;
    /**
     * Whether to show only a single month calendar.
     * @default false
     */
    singleMonthOnly?: boolean;
    /**
     * The currently selected `DateRange`.
     * If this prop is provided, the component acts in a controlled manner.
     */
    value?: DateRange;
}
export interface IDateRangePickerState {
    hoverValue?: DateRange;
    leftView?: MonthAndYear;
    rightView?: MonthAndYear;
    value?: DateRange;
    time?: DateRange;
    selectedShortcutIndex?: number;
}
export declare class DateRangePicker extends AbstractPureComponent2<IDateRangePickerProps, IDateRangePickerState> {
    static defaultProps: IDateRangePickerProps;
    static displayName: string;
    private modifiers;
    constructor(props: IDateRangePickerProps, context?: any);
    render(): JSX.Element;
    componentDidUpdate(prevProps: IDateRangePickerProps, prevState: IDateRangePickerState, snapshot?: {}): void;
    protected validateProps(props: IDateRangePickerProps): void;
    private disabledDays;
    private getDisabledDaysModifier;
    private maybeRenderShortcuts;
    private maybeRenderTimePickers;
    private handleTimeChange;
    private handleTimeChangeLeftCalendar;
    private handleTimeChangeRightCalendar;
    private renderCalendars;
    private renderSingleNavbar;
    private renderLeftNavbar;
    private renderRightNavbar;
    private renderSingleCaption;
    private renderLeftCaption;
    private renderRightCaption;
    private handleDayMouseEnter;
    private handleDayMouseLeave;
    private handleDayClick;
    private handleShortcutClick;
    private handleNextState;
    private handleLeftMonthChange;
    private handleRightMonthChange;
    private handleLeftMonthSelectChange;
    private handleRightMonthSelectChange;
    private updateLeftView;
    private updateRightView;
    private handleLeftYearSelectChange;
    private handleRightYearSelectChange;
    private setViews;
}
