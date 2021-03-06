import React, { PureComponent, ReactElement } from 'react';
import { Props as RectangleProps } from '../shape/Rectangle';
import { Props as ErrorBarProps } from './ErrorBar';
import { Props as XAxisProps } from './XAxis';
import { Props as YAxisProps } from './YAxis';
import { D3Scale, TooltipType, LegendType, AnimationTiming, PresentationAttributes, ChartOffset, DataKey, TickItem } from '../util/types';
interface BarRectangleItem extends RectangleProps {
    value?: number;
    background?: {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
    };
}
interface InternalBarProps {
    xAxis?: Omit<XAxisProps, 'scale'> & {
        scale: D3Scale<string | number>;
        x?: number;
        width?: number;
    };
    yAxis?: Omit<YAxisProps, 'scale'> & {
        scale: D3Scale<string | number>;
        y?: number;
        height?: number;
    };
    data?: BarRectangleItem[];
    top?: number;
    left?: number;
}
declare type RectangleShapeType = ReactElement<SVGElement> | ((props: any) => SVGElement) | RectangleProps | boolean;
interface BarProps extends InternalBarProps {
    className?: string;
    layout?: 'horizontal' | 'vertical';
    xAxisId?: string | number;
    yAxisId?: string | number;
    stackId?: string | number;
    barSize?: number;
    unit?: string | number;
    name?: string | number;
    dataKey: DataKey<any>;
    tooltipType?: TooltipType;
    legendType?: LegendType;
    minPointSize?: number;
    maxBarSize?: number;
    hide?: boolean;
    shape?: ReactElement<SVGElement> | ((props: any) => SVGElement);
    background?: RectangleShapeType;
    onAnimationStart?: () => void;
    onAnimationEnd?: () => void;
    isAnimationActive?: boolean;
    animationBegin?: number;
    animationDuration?: number;
    animationEasing?: AnimationTiming;
    animationId?: number;
    id?: string;
}
declare type Props = PresentationAttributes<SVGPathElement> & BarProps;
interface State {
    readonly isAnimationFinished?: boolean;
    readonly prevData?: BarRectangleItem[];
}
declare class Bar extends PureComponent<Props, State> {
    static displayName: string;
    static defaultProps: {
        xAxisId: number;
        yAxisId: number;
        legendType: string;
        minPointSize: number;
        hide: boolean;
        data: BarRectangleItem[];
        layout: string;
        isAnimationActive: boolean;
        animationBegin: number;
        animationDuration: number;
        animationEasing: string;
    };
    static getComposedData: ({ props, item, barPosition, bandSize, xAxis, yAxis, xAxisTicks, yAxisTicks, stackedData, dataStartIndex, displayedData, offset, }: {
        props: Props;
        item: Bar;
        barPosition: any;
        bandSize: number;
        xAxis: Pick<XAxisProps, "height" | "name" | "type" | "width" | "orientation" | "dataKey" | "ticks" | "hide" | "tick" | "tickCount" | "axisLine" | "tickLine" | "tickSize" | "tickFormatter" | "allowDataOverflow" | "allowDuplicatedCategory" | "allowDecimals" | "domain" | "unit" | "axisType" | "range" | "AxisComp" | "xAxisId" | "mirror" | "padding" | "minTickGap" | "interval" | "reversed"> & {
            scale: import("d3-scale").ScaleContinuousNumeric<React.ReactText, number>;
            x?: number;
            width?: number;
        };
        yAxis: Pick<YAxisProps, "height" | "name" | "type" | "width" | "orientation" | "dataKey" | "ticks" | "hide" | "tick" | "tickCount" | "axisLine" | "tickLine" | "tickSize" | "tickFormatter" | "allowDataOverflow" | "allowDuplicatedCategory" | "allowDecimals" | "domain" | "unit" | "axisType" | "range" | "AxisComp" | "mirror" | "padding" | "minTickGap" | "interval" | "reversed" | "yAxisId"> & {
            scale: import("d3-scale").ScaleContinuousNumeric<React.ReactText, number>;
            y?: number;
            height?: number;
        };
        xAxisTicks: TickItem[];
        yAxisTicks: TickItem[];
        stackedData: number[][];
        dataStartIndex: number;
        offset: ChartOffset;
        displayedData: any[];
    }) => {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
        width?: number;
        height?: number;
        brushBottom?: number;
        data: any[];
        layout: "horizontal" | "vertical";
    };
    state: State;
    UNSAFE_componentWillReceiveProps(nextProps: Props): void;
    id: string;
    cachePrevData: (data: BarRectangleItem[]) => void;
    handleAnimationEnd: () => void;
    handleAnimationStart: () => void;
    static renderRectangle(option: RectangleShapeType, props: any): SVGElement | JSX.Element;
    renderRectanglesStatically(data: BarRectangleItem[]): JSX.Element[];
    renderRectanglesWithAnimation(): JSX.Element;
    renderRectangles(): JSX.Element | JSX.Element[];
    renderBackground(): (SVGElement | JSX.Element)[];
    renderErrorBar(): React.ReactElement<ErrorBarProps, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>[];
    render(): JSX.Element;
}
export default Bar;
