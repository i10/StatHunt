import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { IProps } from "../../common/props";
export interface IDividerProps extends IProps, React.HTMLAttributes<HTMLElement> {
    /**
     * HTML tag to use for element.
     * @default "div"
     */
    tagName?: keyof JSX.IntrinsicElements;
}
export declare class Divider extends AbstractPureComponent2<IDividerProps> {
    static displayName: string;
    render(): React.DOMElement<{
        className: string;
        defaultChecked?: boolean;
        defaultValue?: string | number | string[];
        suppressContentEditableWarning?: boolean;
        suppressHydrationWarning?: boolean;
        accessKey?: string;
        contentEditable?: boolean | "inherit" | "false" | "true";
        contextMenu?: string;
        dir?: string;
        draggable?: boolean | "false" | "true";
        hidden?: boolean;
        id?: string;
        lang?: string;
        placeholder?: string;
        slot?: string;
        spellCheck?: boolean | "false" | "true";
        style?: React.CSSProperties;
        tabIndex?: number;
        title?: string;
        translate?: "yes" | "no";
        radioGroup?: string;
        role?: string;
        about?: string;
        datatype?: string;
        inlist?: any;
        prefix?: string;
        property?: string;
        resource?: string;
        typeof?: string;
        vocab?: string;
        autoCapitalize?: string;
        autoCorrect?: string;
        autoSave?: string;
        color?: string;
        itemProp?: string;
        itemScope?: boolean;
        itemType?: string;
        itemID?: string;
        itemRef?: string;
        results?: number;
        security?: string;
        unselectable?: "on" | "off";
        inputMode?: "search" | "none" | "text" | "decimal" | "numeric" | "tel" | "url" | "email";
        is?: string;
        'aria-activedescendant'?: string;
        'aria-atomic'?: boolean | "false" | "true";
        'aria-autocomplete'?: "none" | "both" | "inline" | "list";
        'aria-busy'?: boolean | "false" | "true";
        'aria-checked'?: boolean | "mixed" | "false" | "true";
        'aria-colcount'?: number;
        'aria-colindex'?: number;
        'aria-colspan'?: number;
        'aria-controls'?: string;
        'aria-current'?: boolean | "time" | "page" | "false" | "true" | "step" | "location" | "date";
        'aria-describedby'?: string;
        'aria-details'?: string;
        'aria-disabled'?: boolean | "false" | "true";
        'aria-dropeffect'?: "link" | "none" | "copy" | "move" | "execute" | "popup";
        'aria-errormessage'?: string;
        'aria-expanded'?: boolean | "false" | "true";
        'aria-flowto'?: string;
        'aria-grabbed'?: boolean | "false" | "true";
        'aria-haspopup'?: boolean | "dialog" | "menu" | "listbox" | "grid" | "false" | "true" | "tree";
        'aria-hidden'?: boolean | "false" | "true";
        'aria-invalid'?: boolean | "false" | "true" | "grammar" | "spelling";
        'aria-keyshortcuts'?: string;
        'aria-label'?: string;
        'aria-labelledby'?: string;
        'aria-level'?: number;
        'aria-live'?: "off" | "assertive" | "polite";
        'aria-modal'?: boolean | "false" | "true";
        'aria-multiline'?: boolean | "false" | "true";
        'aria-multiselectable'?: boolean | "false" | "true";
        'aria-orientation'?: "horizontal" | "vertical";
        'aria-owns'?: string;
        'aria-placeholder'?: string;
        'aria-posinset'?: number;
        'aria-pressed'?: boolean | "mixed" | "false" | "true";
        'aria-readonly'?: boolean | "false" | "true";
        'aria-relevant'?: "all" | "text" | "additions" | "additions text" | "removals";
        'aria-required'?: boolean | "false" | "true";
        'aria-roledescription'?: string;
        'aria-rowcount'?: number;
        'aria-rowindex'?: number;
        'aria-rowspan'?: number;
        'aria-selected'?: boolean | "false" | "true";
        'aria-setsize'?: number;
        'aria-sort'?: "none" | "ascending" | "descending" | "other";
        'aria-valuemax'?: number;
        'aria-valuemin'?: number;
        'aria-valuenow'?: number;
        'aria-valuetext'?: string;
        children?: React.ReactNode;
        dangerouslySetInnerHTML?: {
            __html: string;
        };
        onCopy?: (event: React.ClipboardEvent<HTMLElement>) => void;
        onCopyCapture?: (event: React.ClipboardEvent<HTMLElement>) => void;
        onCut?: (event: React.ClipboardEvent<HTMLElement>) => void;
        onCutCapture?: (event: React.ClipboardEvent<HTMLElement>) => void;
        onPaste?: (event: React.ClipboardEvent<HTMLElement>) => void;
        onPasteCapture?: (event: React.ClipboardEvent<HTMLElement>) => void;
        onCompositionEnd?: (event: React.CompositionEvent<HTMLElement>) => void;
        onCompositionEndCapture?: (event: React.CompositionEvent<HTMLElement>) => void;
        onCompositionStart?: (event: React.CompositionEvent<HTMLElement>) => void;
        onCompositionStartCapture?: (event: React.CompositionEvent<HTMLElement>) => void;
        onCompositionUpdate?: (event: React.CompositionEvent<HTMLElement>) => void;
        onCompositionUpdateCapture?: (event: React.CompositionEvent<HTMLElement>) => void;
        onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
        onFocusCapture?: (event: React.FocusEvent<HTMLElement>) => void;
        onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
        onBlurCapture?: (event: React.FocusEvent<HTMLElement>) => void;
        onChange?: (event: React.FormEvent<HTMLElement>) => void;
        onChangeCapture?: (event: React.FormEvent<HTMLElement>) => void;
        onBeforeInput?: (event: React.FormEvent<HTMLElement>) => void;
        onBeforeInputCapture?: (event: React.FormEvent<HTMLElement>) => void;
        onInput?: (event: React.FormEvent<HTMLElement>) => void;
        onInputCapture?: (event: React.FormEvent<HTMLElement>) => void;
        onReset?: (event: React.FormEvent<HTMLElement>) => void;
        onResetCapture?: (event: React.FormEvent<HTMLElement>) => void;
        onSubmit?: (event: React.FormEvent<HTMLElement>) => void;
        onSubmitCapture?: (event: React.FormEvent<HTMLElement>) => void;
        onInvalid?: (event: React.FormEvent<HTMLElement>) => void;
        onInvalidCapture?: (event: React.FormEvent<HTMLElement>) => void;
        onLoad?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onLoadCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onError?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onErrorCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
        onKeyDownCapture?: (event: React.KeyboardEvent<HTMLElement>) => void;
        onKeyPress?: (event: React.KeyboardEvent<HTMLElement>) => void;
        onKeyPressCapture?: (event: React.KeyboardEvent<HTMLElement>) => void;
        onKeyUp?: (event: React.KeyboardEvent<HTMLElement>) => void;
        onKeyUpCapture?: (event: React.KeyboardEvent<HTMLElement>) => void;
        onAbort?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onAbortCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onCanPlay?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onCanPlayCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onCanPlayThrough?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onCanPlayThroughCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onDurationChange?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onDurationChangeCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onEmptied?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onEmptiedCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onEncrypted?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onEncryptedCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onEnded?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onEndedCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onLoadedData?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onLoadedDataCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onLoadedMetadata?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onLoadedMetadataCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onLoadStart?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onLoadStartCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onPause?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onPauseCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onPlay?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onPlayCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onPlaying?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onPlayingCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onProgress?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onProgressCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onRateChange?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onRateChangeCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onSeeked?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onSeekedCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onSeeking?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onSeekingCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onStalled?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onStalledCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onSuspend?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onSuspendCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onTimeUpdate?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onTimeUpdateCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onVolumeChange?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onVolumeChangeCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onWaiting?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onWaitingCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onAuxClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onAuxClickCapture?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onClickCapture?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onContextMenu?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onContextMenuCapture?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onDoubleClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onDoubleClickCapture?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onDrag?: (event: React.DragEvent<HTMLElement>) => void;
        onDragCapture?: (event: React.DragEvent<HTMLElement>) => void;
        onDragEnd?: (event: React.DragEvent<HTMLElement>) => void;
        onDragEndCapture?: (event: React.DragEvent<HTMLElement>) => void;
        onDragEnter?: (event: React.DragEvent<HTMLElement>) => void;
        onDragEnterCapture?: (event: React.DragEvent<HTMLElement>) => void;
        onDragExit?: (event: React.DragEvent<HTMLElement>) => void;
        onDragExitCapture?: (event: React.DragEvent<HTMLElement>) => void;
        onDragLeave?: (event: React.DragEvent<HTMLElement>) => void;
        onDragLeaveCapture?: (event: React.DragEvent<HTMLElement>) => void;
        onDragOver?: (event: React.DragEvent<HTMLElement>) => void;
        onDragOverCapture?: (event: React.DragEvent<HTMLElement>) => void;
        onDragStart?: (event: React.DragEvent<HTMLElement>) => void;
        onDragStartCapture?: (event: React.DragEvent<HTMLElement>) => void;
        onDrop?: (event: React.DragEvent<HTMLElement>) => void;
        onDropCapture?: (event: React.DragEvent<HTMLElement>) => void;
        onMouseDown?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onMouseDownCapture?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onMouseEnter?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onMouseLeave?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onMouseMove?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onMouseMoveCapture?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onMouseOut?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onMouseOutCapture?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onMouseOver?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onMouseOverCapture?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onMouseUp?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onMouseUpCapture?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onSelect?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onSelectCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onTouchCancel?: (event: React.TouchEvent<HTMLElement>) => void;
        onTouchCancelCapture?: (event: React.TouchEvent<HTMLElement>) => void;
        onTouchEnd?: (event: React.TouchEvent<HTMLElement>) => void;
        onTouchEndCapture?: (event: React.TouchEvent<HTMLElement>) => void;
        onTouchMove?: (event: React.TouchEvent<HTMLElement>) => void;
        onTouchMoveCapture?: (event: React.TouchEvent<HTMLElement>) => void;
        onTouchStart?: (event: React.TouchEvent<HTMLElement>) => void;
        onTouchStartCapture?: (event: React.TouchEvent<HTMLElement>) => void;
        onPointerDown?: (event: React.PointerEvent<HTMLElement>) => void;
        onPointerDownCapture?: (event: React.PointerEvent<HTMLElement>) => void;
        onPointerMove?: (event: React.PointerEvent<HTMLElement>) => void;
        onPointerMoveCapture?: (event: React.PointerEvent<HTMLElement>) => void;
        onPointerUp?: (event: React.PointerEvent<HTMLElement>) => void;
        onPointerUpCapture?: (event: React.PointerEvent<HTMLElement>) => void;
        onPointerCancel?: (event: React.PointerEvent<HTMLElement>) => void;
        onPointerCancelCapture?: (event: React.PointerEvent<HTMLElement>) => void;
        onPointerEnter?: (event: React.PointerEvent<HTMLElement>) => void;
        onPointerEnterCapture?: (event: React.PointerEvent<HTMLElement>) => void;
        onPointerLeave?: (event: React.PointerEvent<HTMLElement>) => void;
        onPointerLeaveCapture?: (event: React.PointerEvent<HTMLElement>) => void;
        onPointerOver?: (event: React.PointerEvent<HTMLElement>) => void;
        onPointerOverCapture?: (event: React.PointerEvent<HTMLElement>) => void;
        onPointerOut?: (event: React.PointerEvent<HTMLElement>) => void;
        onPointerOutCapture?: (event: React.PointerEvent<HTMLElement>) => void;
        onGotPointerCapture?: (event: React.PointerEvent<HTMLElement>) => void;
        onGotPointerCaptureCapture?: (event: React.PointerEvent<HTMLElement>) => void;
        onLostPointerCapture?: (event: React.PointerEvent<HTMLElement>) => void;
        onLostPointerCaptureCapture?: (event: React.PointerEvent<HTMLElement>) => void;
        onScroll?: (event: React.UIEvent<HTMLElement>) => void;
        onScrollCapture?: (event: React.UIEvent<HTMLElement>) => void;
        onWheel?: (event: React.WheelEvent<HTMLElement>) => void;
        onWheelCapture?: (event: React.WheelEvent<HTMLElement>) => void;
        onAnimationStart?: (event: React.AnimationEvent<HTMLElement>) => void;
        onAnimationStartCapture?: (event: React.AnimationEvent<HTMLElement>) => void;
        onAnimationEnd?: (event: React.AnimationEvent<HTMLElement>) => void;
        onAnimationEndCapture?: (event: React.AnimationEvent<HTMLElement>) => void;
        onAnimationIteration?: (event: React.AnimationEvent<HTMLElement>) => void;
        onAnimationIterationCapture?: (event: React.AnimationEvent<HTMLElement>) => void;
        onTransitionEnd?: (event: React.TransitionEvent<HTMLElement>) => void;
        onTransitionEndCapture?: (event: React.TransitionEvent<HTMLElement>) => void;
    }, Element>;
}
