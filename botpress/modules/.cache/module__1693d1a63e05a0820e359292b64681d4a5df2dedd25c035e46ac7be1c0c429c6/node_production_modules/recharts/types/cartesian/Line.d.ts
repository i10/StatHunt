import React, { PureComponent, ReactElement } from 'react';
import { CurveType, Props as CurveProps, Point as CurvePoint } from '../shape/Curve';
import { Props as DotProps } from '../shape/Dot';
import { Props as ErrorBarProps } from './ErrorBar';
import { Props as XAxisProps } from './XAxis';
import { Props as YAxisProps } from './YAxis';
import { D3Scale, LegendType, TooltipType, AnimationTiming, ChartOffset, DataKey, TickItem } from '../util/types';
declare type LineDot = ReactElement<SVGElement> | ((props: any) => SVGElement) | DotProps | boolean;
interface LinePointItem extends CurvePoint {
    value?: number;
    payload?: any;
}
interface InternalLineProps {
    top?: number;
    left?: number;
    width?: number;
    height?: number;
    points?: LinePointItem[];
    xAxis?: Omit<XAxisProps, 'scale'> & {
        scale: D3Scale<string | number>;
    };
    yAxis?: Omit<YAxisProps, 'scale'> & {
        scale: D3Scale<string | number>;
    };
}
interface LineProps extends InternalLineProps {
    className?: string;
    type?: CurveType;
    unit?: string | number;
    name?: string | number;
    yAxisId?: string | number;
    xAxisId?: string | number;
    dataKey?: DataKey<any>;
    legendType?: LegendType;
    tooltipType?: TooltipType;
    layout?: 'horizontal' | 'vertical';
    connectNulls?: boolean;
    hide?: boolean;
    activeDot?: LineDot;
    dot?: LineDot;
    onAnimationStart?: () => void;
    onAnimationEnd?: () => void;
    isAnimationActive?: boolean;
    animateNewValues?: boolean;
    animationBegin?: number;
    animationDuration?: number;
    animationEasing?: AnimationTiming;
    animationId?: number;
    id?: string;
}
declare type Props = Omit<CurveProps, 'points' | 'pathRef'> & LineProps;
interface State {
    isAnimationFinished?: boolean;
    totalLength?: number;
    prevPoints?: LinePointItem[];
}
declare class Line extends PureComponent<Props, State> {
    static displayName: string;
    static defaultProps: {
        xAxisId: number;
        yAxisId: number;
        connectNulls: boolean;
        activeDot: boolean;
        dot: boolean;
        legendType: string;
        stroke: string;
        strokeWidth: number;
        fill: string;
        points: LinePointItem[];
        isAnimationActive: boolean;
        animateNewValues: boolean;
        animationBegin: number;
        animationDuration: number;
        animationEasing: string;
        hide: boolean;
    };
    static getComposedData: ({ props, xAxis, yAxis, xAxisTicks, yAxisTicks, dataKey, bandSize, displayedData, offset, }: {
        props: Props;
        xAxis: Pick<XAxisProps, "height" | "name" | "type" | "width" | "orientation" | "dataKey" | "ticks" | "hide" | "tick" | "tickCount" | "axisLine" | "tickLine" | "tickSize" | "tickFormatter" | "allowDataOverflow" | "allowDuplicatedCategory" | "allowDecimals" | "domain" | "unit" | "axisType" | "range" | "AxisComp" | "xAxisId" | "mirror" | "padding" | "minTickGap" | "interval" | "reversed"> & {
            scale: import("d3-scale").ScaleContinuousNumeric<React.ReactText, number>;
        };
        yAxis: Pick<YAxisProps, "height" | "name" | "type" | "width" | "orientation" | "dataKey" | "ticks" | "hide" | "tick" | "tickCount" | "axisLine" | "tickLine" | "tickSize" | "tickFormatter" | "allowDataOverflow" | "allowDuplicatedCategory" | "allowDecimals" | "domain" | "unit" | "axisType" | "range" | "AxisComp" | "mirror" | "padding" | "minTickGap" | "interval" | "reversed" | "yAxisId"> & {
            scale: import("d3-scale").ScaleContinuousNumeric<React.ReactText, number>;
        };
        xAxisTicks: TickItem[];
        yAxisTicks: TickItem[];
        dataKey: DataKey<any>;
        bandSize: number;
        displayedData: any[];
        offset: ChartOffset;
    }) => {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
        width?: number;
        height?: number;
        brushBottom?: number;
        points: ({
            x: any;
            y: number;
            value: any;
            payload: any;
        } | {
            x: number;
            y: any;
            value: any;
            payload: any;
        })[];
        layout: "horizontal" | "vertical";
    };
    mainCurve?: SVGPathElement;
    state: State;
    componentDidMount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: Props): void;
    getTotalLength(): number;
    getStrokeDasharray: (length: number, totalLength: number, lines: number[]) => string;
    id: string;
    cachePrevData: (points: LinePointItem[]) => void;
    pathRef: (node: SVGPathElement) => void;
    static repeat(lines: number[], count: number): number[];
    handleAnimationEnd: () => void;
    handleAnimationStart: () => void;
    renderErrorBar(): React.ReactElement<ErrorBarProps, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>[];
    static renderDotItem(option: LineDot, props: any): SVGElement | JSX.Element;
    renderDots(needClip: boolean, clipPathId: string): JSX.Element;
    renderCurveStatically(points: LinePointItem[], needClip: boolean, clipPathId: string, props?: {
        strokeDasharray: string;
    }): JSX.Element;
    renderCurveWithAnimation(needClip: boolean, clipPathId: string): JSX.Element;
    renderCurve(needClip: boolean, clipPathId: string): JSX.Element;
    render(): JSX.Element;
}
export default Line;
