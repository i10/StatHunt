/// <reference types="react" />
import { AbstractPureComponent2, IProps } from "../../common";
export interface IHotkeyProps extends IProps {
    /**
     * Whether the hotkey should be triggerable when focused in a text input.
     * @default false
     */
    allowInInput?: boolean;
    /**
     * Hotkey combination string, such as "space" or "cmd+n".
     */
    combo: string;
    /**
     * Whether the hotkey cannot be triggered.
     * @default false
     */
    disabled?: boolean;
    /**
     * Human-friendly label for the hotkey.
     */
    label: string;
    /**
     * If `false`, the hotkey is active only when the target is focused. If
     * `true`, the hotkey can be triggered regardless of what component is
     * focused.
     * @default false
     */
    global?: boolean;
    /**
     * Unless the hotkey is global, you must specify a group where the hotkey
     * will be displayed in the hotkeys dialog. This string will be displayed
     * in a header at the start of the group of hotkeys.
     */
    group?: string;
    /**
     * When `true`, invokes `event.preventDefault()` before the respective `onKeyDown` and
     * `onKeyUp` callbacks are invoked. Enabling this can simplify handler implementations.
     * @default false
     */
    preventDefault?: boolean;
    /**
     * When `true`, invokes `event.stopPropagation()` before the respective `onKeyDown` and
     * `onKeyUp` callbacks are invoked. Enabling this can simplify handler implementations.
     * @default false
     */
    stopPropagation?: boolean;
    /**
     * `keydown` event handler.
     */
    onKeyDown?(e: KeyboardEvent): any;
    /**
     * `keyup` event handler.
     */
    onKeyUp?(e: KeyboardEvent): any;
}
export declare class Hotkey extends AbstractPureComponent2<IHotkeyProps, {}> {
    static displayName: string;
    static defaultProps: {
        allowInInput: boolean;
        disabled: boolean;
        global: boolean;
        preventDefault: boolean;
        stopPropagation: boolean;
    };
    render(): JSX.Element;
    protected validateProps(props: IHotkeyProps): void;
}
