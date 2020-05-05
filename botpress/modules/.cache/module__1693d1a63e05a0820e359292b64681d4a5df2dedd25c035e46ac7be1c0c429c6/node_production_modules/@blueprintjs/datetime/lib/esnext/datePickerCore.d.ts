import { LocaleUtils } from "react-day-picker";
import { ITimePickerProps, TimePrecision } from "./timePicker";
/**
 * Collection of functions that determine which modifier classes get applied to which days.
 * See the [**react-day-picker** documentation](http://react-day-picker.js.org/api/ModifiersUtils) to learn more.
 */
export interface IDatePickerModifiers {
    [name: string]: (date: Date) => boolean;
}
export interface IDatePickerBaseProps {
    /**
     * The initial month the calendar displays.
     */
    initialMonth?: Date;
    /**
     * The locale name, which is passed to the functions in `localeUtils`
     * (and `formatDate` and `parseDate` if supported).
     */
    locale?: string;
    /**
     * Collection of functions that provide internationalization support.
     */
    localeUtils?: typeof LocaleUtils;
    /**
     * The latest date the user can select.
     * @default Dec. 31st of this year.
     */
    maxDate?: Date;
    /**
     * The earliest date the user can select.
     * @default Jan. 1st, 20 years in the past.
     */
    minDate?: Date;
    /**
     * Collection of functions that determine which modifier classes get applied to which days.
     * Each function should accept a `Date` and return a boolean.
     * See the [**react-day-picker** documentation](http://react-day-picker.js.org/api/ModifiersUtils) to learn more.
     */
    modifiers?: IDatePickerModifiers;
    /**
     * If `true`, the month menu will appear to the left of the year menu.
     * Otherwise, the month menu will apear to the right of the year menu.
     * @default false
     */
    reverseMonthAndYearMenus?: boolean;
    /**
     * The precision of time selection that accompanies the calendar. Passing a
     * `TimePrecision` value (or providing `timePickerProps`) shows a
     * `TimePicker` below the calendar. Time is preserved across date changes.
     *
     * This is shorthand for `timePickerProps.precision` and is a quick way to
     * enable time selection.
     */
    timePrecision?: TimePrecision;
    /**
     * Further configure the `TimePicker` that appears beneath the calendar.
     * `onChange` and `value` are ignored in favor of the corresponding
     * top-level props on this component.
     *
     * Passing any defined value to this prop (even `{}`) will cause the
     * `TimePicker` to appear.
     */
    timePickerProps?: ITimePickerProps;
}
export declare const DISABLED_MODIFIER = "disabled";
export declare const HOVERED_RANGE_MODIFIER = "hovered-range";
export declare const OUTSIDE_MODIFIER = "outside";
export declare const SELECTED_MODIFIER = "selected";
export declare const SELECTED_RANGE_MODIFIER = "selected-range";
export declare const DISALLOWED_MODIFIERS: string[];
export declare function getDefaultMaxDate(): Date;
export declare function getDefaultMinDate(): Date;
export declare function combineModifiers(baseModifiers: IDatePickerModifiers, userModifiers: IDatePickerModifiers): IDatePickerModifiers;
