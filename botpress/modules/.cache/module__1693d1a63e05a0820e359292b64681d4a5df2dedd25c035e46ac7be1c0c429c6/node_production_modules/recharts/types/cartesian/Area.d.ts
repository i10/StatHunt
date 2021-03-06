import React, { PureComponent, ReactElement } from 'react';
import { CurveType, Point as CurvePoint } from '../shape/Curve';
import { Props as DotProps } from '../shape/Dot';
import { Props as XAxisProps } from './XAxis';
import { Props as YAxisProps } from './YAxis';
import { D3Scale, LegendType, TooltipType, AnimationTiming, PresentationAttributes, ChartOffset, Coordinate, DataKey, TickItem } from '../util/types';
declare type AreaDot = ReactElement<SVGElement> | ((props: any) => SVGElement) | DotProps | boolean;
interface AreaPointItem extends CurvePoint {
    value?: number | number[];
    payload?: any;
}
interface InternalAreaProps {
    xAxis?: Omit<XAxisProps, 'scale'> & {
        scale: D3Scale<string | number>;
    };
    yAxis?: Omit<YAxisProps, 'scale'> & {
        scale: D3Scale<string | number>;
    };
    top?: number;
    left?: number;
    width?: number;
    height?: number;
    points?: AreaPointItem[];
    baseLine?: number | Coordinate[];
}
interface AreaProps extends InternalAreaProps {
    className?: string;
    dataKey: DataKey<any>;
    type?: CurveType;
    unit?: string | number;
    name?: string | number;
    xAxisId?: string | number;
    yAxisId?: string | number;
    stackId?: string | number;
    legendType?: LegendType;
    tooltipType?: TooltipType;
    connectNulls?: boolean;
    activeDot?: AreaDot;
    dot?: AreaDot;
    label?: any;
    layout?: 'horizontal' | 'vertical';
    hide?: boolean;
    baseValue?: number | 'dataMin' | 'dataMax';
    isRange?: boolean;
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
declare type Props = PresentationAttributes<SVGElement> & AreaProps;
interface State {
    prevPoints?: AreaPointItem[];
    prevBaseLine?: number | Coordinate[];
    isAnimationFinished?: boolean;
    totalLength?: number;
}
declare class Area extends PureComponent<Props, State> {
    static displayName: string;
    static defaultProps: {
        stroke: string;
        fill: string;
        fillOpacity: number;
        xAxisId: number;
        yAxisId: number;
        legendType: string;
        connectNulls: boolean;
        points: AreaPointItem[];
        dot: boolean;
        activeDot: boolean;
        hide: boolean;
        isAnimationActive: boolean;
        animationBegin: number;
        animationDuration: number;
        animationEasing: string;
    };
    static getBaseValue: (props: Props, xAxis: Pick<XAxisProps, "height" | "name" | "type" | "width" | "orientation" | "dataKey" | "ticks" | "hide" | "tick" | "tickCount" | "axisLine" | "tickLine" | "tickSize" | "tickFormatter" | "allowDataOverflow" | "allowDuplicatedCategory" | "allowDecimals" | "domain" | "unit" | "axisType" | "range" | "AxisComp" | "xAxisId" | "mirror" | "padding" | "minTickGap" | "interval" | "reversed"> & {
        scale: import("d3-scale").ScaleContinuousNumeric<React.ReactText, number>;
    }, yAxis: Pick<YAxisProps, "height" | "name" | "type" | "width" | "orientation" | "dataKey" | "ticks" | "hide" | "tick" | "tickCount" | "axisLine" | "tickLine" | "tickSize" | "tickFormatter" | "allowDataOverflow" | "allowDuplicatedCategory" | "allowDecimals" | "domain" | "unit" | "axisType" | "range" | "AxisComp" | "mirror" | "padding" | "minTickGap" | "interval" | "reversed" | "yAxisId"> & {
        scale: import("d3-scale").ScaleContinuousNumeric<React.ReactText, number>;
    }) => number;
    static getComposedData: ({ props, xAxis, yAxis, xAxisTicks, yAxisTicks, bandSize, dataKey, stackedData, dataStartIndex, displayedData, offset, }: {
        props: Props;
        item: Area;
        bandSize: number;
        xAxis: Pick<XAxisProps, "height" | "name" | "type" | "width" | "orientation" | "dataKey" | "ticks" | "hide" | "tick" | "tickCount" | "axisLine" | "tickLine" | "tickSize" | "tickFormatter" | "allowDataOverflow" | "allowDuplicatedCategory" | "allowDecimals" | "domain" | "unit" | "axisType" | "range" | "AxisComp" | "xAxisId" | "mirror" | "padding" | "minTickGap" | "interval" | "reversed"> & {
            scale: import("d3-scale").ScaleContinuousNumeric<React.ReactText, number>;
        };
        yAxis: Pick<YAxisProps, "height" | "name" | "type" | "width" | "orientation" | "dataKey" | "ticks" | "hide" | "tick" | "tickCount" | "axisLine" | "tickLine" | "tickSize" | "tickFormatter" | "allowDataOverflow" | "allowDuplicatedCategory" | "allowDecimals" | "domain" | "unit" | "axisType" | "range" | "AxisComp" | "mirror" | "padding" | "minTickGap" | "interval" | "reversed" | "yAxisId"> & {
            scale: import("d3-scale").ScaleContinuousNumeric<React.ReactText, number>;
        };
        xAxisTicks: TickItem[];
        yAxisTicks: TickItem[];
        stackedData: number[][];
        dataStartIndex: number;
        offset: ChartOffset;
        displayedData: any[];
        dataKey: DataKey<any>;
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
            value: any[];
            payload: any;
        } | {
            x: number;
            y: any;
            value: any[];
            payload: any;
        })[];
        baseLine: number | ({
            x: any;
            y: number;
        } | {
            x: number;
            y: any;
        })[];
        layout: "horizontal" | "vertical";
        isRange: boolean;
    };
    static renderDotItem: (option: AreaDot, props: any) => SVGElement | JSX.Element;
    state: State;
    UNSAFE_componentWillReceiveProps(nextProps: Props): void;
    id: string;
    cachePrevData: (points: AreaPointItem[], baseLine: number | Coordinate[]) => void;
    handleAnimationEnd: () => void;
    handleAnimationStart: () => void;
    renderDots(needClip: boolean, clipPathId: string): JSX.Element;
    renderHorizontalRect(alpha: number): JSX.Element;
    renderVerticalRect(alpha: number): JSX.Element;
    renderClipRect(alpha: number): JSX.Element;
    renderAreaStatically(points: AreaPointItem[], baseLine: Props['baseLine'], needClip: boolean, clipPathId: string): JSX.Element;
    renderAreaWithAnimation(needClip: boolean, clipPathId: string): JSX.Element;
    renderArea(needClip: boolean, clipPathId: string): JSX.Element;
    render(): JSX.Element;
}
export default Area;
