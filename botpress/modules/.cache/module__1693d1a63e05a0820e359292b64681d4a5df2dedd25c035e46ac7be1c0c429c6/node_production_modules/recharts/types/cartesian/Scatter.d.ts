import React, { PureComponent, ReactElement } from 'react';
import { Props as ZAxisProps } from './ZAxis';
import { Props as CurveProps, CurveType } from '../shape/Curve';
import { Props as SymbolsProps } from '../shape/Symbols';
import { Props as ErrorBarProps } from './ErrorBar';
import { LegendType, PresentationAttributes, SymbolType, AnimationTiming, D3Scale, ChartOffset, DataKey, TickItem } from '../util/types';
import { TooltipType } from '../component/DefaultTooltipContent';
import { Props as XAxisProps } from './XAxis';
import { Props as YAxisProps } from './YAxis';
interface ScattterPointNode {
    x?: number | string;
    y?: number | string;
    z?: number | string;
}
interface ScatterPointItem {
    cx?: number;
    cy?: number;
    size?: number;
    node?: ScattterPointNode;
    payload?: any;
}
interface ScatterProps {
    data?: any[];
    xAxisId?: string | number;
    yAxisId?: string | number;
    zAxisId?: string | number;
    left?: number;
    top?: number;
    yAxis?: Omit<XAxisProps, 'scale'> & {
        scale: D3Scale<string | number>;
    };
    xAxis?: Omit<YAxisProps, 'scale'> & {
        scale: D3Scale<string | number>;
    };
    zAxis?: Omit<ZAxisProps, 'scale'> & {
        scale: D3Scale<string | number>;
    };
    dataKey?: DataKey<any>;
    line?: ReactElement<SVGElement> | ((props: any) => SVGElement) | CurveProps | boolean;
    lineType?: 'fitting' | 'joint';
    lineJointType?: CurveType;
    legendType?: LegendType;
    tooltipType?: TooltipType;
    className: string;
    name?: string | number;
    activeIndex?: number;
    activeShape?: ReactElement<SVGElement> | ((props: any) => SVGElement) | SymbolsProps;
    shape?: SymbolType | ReactElement<SVGElement> | ((props: any) => SVGElement);
    points?: ScatterPointItem[];
    hide?: boolean;
    isAnimationActive?: boolean;
    animationId?: number;
    animationBegin?: number;
    animationDuration?: number;
    animationEasing?: AnimationTiming;
}
declare type Props = PresentationAttributes<SVGElement> & ScatterProps;
interface State {
    isAnimationFinished?: boolean;
    prevPoints?: ScatterPointItem[];
}
declare class Scatter extends PureComponent<Props, State> {
    static displayName: string;
    static defaultProps: {
        xAxisId: number;
        yAxisId: number;
        zAxisId: number;
        legendType: string;
        lineType: string;
        lineJointType: string;
        data: any[];
        shape: string;
        hide: boolean;
        isAnimationActive: boolean;
        animationBegin: number;
        animationDuration: number;
        animationEasing: string;
    };
    static getComposedData: ({ xAxis, yAxis, zAxis, item, displayedData, onItemMouseLeave, onItemMouseEnter, onItemClick, xAxisTicks, yAxisTicks, offset, }: {
        props: Props;
        xAxis: Pick<YAxisProps, "height" | "name" | "type" | "width" | "orientation" | "dataKey" | "ticks" | "hide" | "tick" | "tickCount" | "axisLine" | "tickLine" | "tickSize" | "tickFormatter" | "allowDataOverflow" | "allowDuplicatedCategory" | "allowDecimals" | "domain" | "unit" | "axisType" | "range" | "AxisComp" | "mirror" | "padding" | "minTickGap" | "interval" | "reversed" | "yAxisId"> & {
            scale: import("d3-scale").ScaleContinuousNumeric<React.ReactText, number>;
        };
        yAxis: Pick<XAxisProps, "height" | "name" | "type" | "width" | "orientation" | "dataKey" | "ticks" | "hide" | "tick" | "tickCount" | "axisLine" | "tickLine" | "tickSize" | "tickFormatter" | "allowDataOverflow" | "allowDuplicatedCategory" | "allowDecimals" | "domain" | "unit" | "axisType" | "range" | "AxisComp" | "xAxisId" | "mirror" | "padding" | "minTickGap" | "interval" | "reversed"> & {
            scale: import("d3-scale").ScaleContinuousNumeric<React.ReactText, number>;
        };
        zAxis: Pick<ZAxisProps, "name" | "type" | "dataKey" | "unit" | "range" | "zAxisId"> & {
            scale: import("d3-scale").ScaleContinuousNumeric<React.ReactText, number>;
        };
        xAxisTicks: TickItem[];
        yAxisTicks: TickItem[];
        item: Scatter;
        onItemMouseLeave?: (event: React.MouseEvent<SVGElement, MouseEvent>) => void;
        onItemMouseEnter?: (event: React.MouseEvent<SVGElement, MouseEvent>) => void;
        onItemClick?: (event: React.MouseEvent<SVGElement, MouseEvent>) => void;
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
        onMouseLeave: (...args: any[]) => any;
        onMouseEnter: (...args: any[]) => any;
        onClick: (...args: any[]) => any;
        points: any[];
    };
    state: State;
    UNSAFE_componentWillReceiveProps(nextProps: Props): void;
    cachePrevPoints: (points: ScatterPointItem[]) => void;
    handleAnimationEnd: () => void;
    handleAnimationStart: () => void;
    id: string;
    static renderSymbolItem(option: Props['activeShape'] | Props['shape'], props: any): SVGElement | JSX.Element;
    renderSymbolsStatically(points: ScatterPointItem[]): JSX.Element[];
    renderSymbolsWithAnimation(): JSX.Element;
    renderSymbols(): JSX.Element | JSX.Element[];
    renderErrorBar(): React.ReactElement<ErrorBarProps, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>[];
    renderLine(): JSX.Element;
    render(): JSX.Element;
}
export default Scatter;
