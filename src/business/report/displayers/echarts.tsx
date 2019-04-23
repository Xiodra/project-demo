/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 项目: 红网（Red Web）
 * 
 * 创建日期: Tue, 2018-04-10 4:19:37 pm
 * 作者: 胡燕龙（huyl） (y.dragon.hu@hotmail.com)
 * 
 * 说明: 
 * 1. 使用echarts-for-react进行封装的ECharts数据显示器控件
 * 
 * 版权: Copyright © 2017 - 2018
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseDisplayerControl, BaseDisplayer, ReportModuleEvent, DisplayerState } from '../index';
import ReactEcharts from 'echarts-for-react';
import { isArray, log, addon } from 'pao-aop';
import { reactControl } from 'pao-aop-client';

/** EChart配置 */
export interface EChartOption {
    /** 配置项 */
    [key: string]: any;
}

export interface BaseEChartState extends DisplayerState {
    option?: EChartOption;
}

/**
 * 组件：EChart图表显示器基类
 */
export class BaseEChart<
    T extends BaseEChartsDisplayerControl = BaseEChartsDisplayerControl,
    P extends BaseEChartState = BaseEChartState> extends BaseDisplayer<T, P> {
    /** EChartReact实例 */
    echarts_react?: any;
    /** 当前DOM实例 */
    dom?: Element | Text | any;

    constructor(props: T) {
        super(props);
        // this.state = {
        //     data: props.data!
        // };
    }

    componentWillMount() {
        {
            // 事件清空和初始化
            super.componentWillMount();
            this.props.addEventHandler!(
                ReportModuleEvent.SetData,
                (sender: any, data: any) => this.onSetData!(data));
        }
        {
            const option = this.generateOption(this.props.data);
            this.setState({ option });
        }
    }
    onSetData(data: any) {
        const option = this.generateOption(data);
        let echartsInstance = this.echarts_react.getEchartsInstance();
        echartsInstance.setOption(option);
        // const option = this.generateOption(data);
        // this.setState({ data, option });
    }
    /** 
     * 生成配置
     * @param data 数据
     */
    generateOption(data?: any[]) {
        // TODO: 派生类实现各自的根据数据生成配置对象
        return this.props.option;
    }
    // 重置大小
    resize(height: number, width: number) {
        // TODO: 派生类实现各自的重置大小方法
        log("BaseEChart", "resize");
        // $(this.dom).css({ height, width });
        let echartsInstance = this.echarts_react.getEchartsInstance();
        echartsInstance.resize();
    }
    /** 设置系列数据 */
    setSeriesData(data: any, option: EChartOption, index: number) {
        if (!option.series[index].data) {
            option.series[index].data = [];
        }
        option.series[index].data.push(data);
    }
    setDataEmpty(option: EChartOption) {
        if (option.series) {
            for (let index = 0, len = option.series.length;
                index < len; index++) {
                option.series[index].data = [];
            }
        }
        if (option.xAxis) {
            if (isArray(option.xAxis)) {
                for (let index = 0, len = option.xAxis.length;
                    index < len; index++) {
                    if (option.xAxis[index].type === "category") {
                        if (option.xAxis[index].data) { option.xAxis[index].data = []; }
                    }
                }
            } else {
                if (option.xAxis.data) { option.xAxis.data = []; }
            }
        }
        if (option.yAxis) {
            if (isArray(option.yAxis)) {
                for (let index = 0, len = option.yAxis.length;
                    index < len; index++) {
                    if (option.yAxis[index].type === "category") {
                        if (option.yAxis[index].data) { option.yAxis[index].data = []; }
                    }
                }
            } else {
                if (option.yAxis.data) { option.yAxis.data = []; }
            }
        }
        if (option.radiusAxis) {
            for (let index = 0, len = option.radiusAxis.length;
                index < len; index++) {
                if (option.radiusAxis[index].type === "category") {
                    option.radiusAxis[index].data = [];
                }
            }
        }
        if (option.angleAxis) {
            for (let index = 0, len = option.angleAxis.length;
                index < len; index++) {
                if (option.angleAxis[index].type === "category") {
                    option.angleAxis[index].data = [];
                }
            }
        }
        return this;
    }
    render() {
        return (
            <ReactEcharts
                ref={ref => {
                    this.dom = ReactDOM.findDOMNode(ref!);
                    this.echarts_react = ref;
                }}
                option={this.state.option!}
                style={{ height: '100%', width: '100%' }}
            />
        );
    }
}

/**
 * 控件：EChart图表显示器基类
 */
@addon('BaseEChartsDisplayerControl', 'EChart图表显示器基类', '所有ECharts图表显示器的基类')
@reactControl(BaseEChart)
export class BaseEChartsDisplayerControl extends BaseDisplayerControl {
    /**
     * 基础柱状图，折线图显示器
     * @param option ECharts配置
     */
    constructor(public option?: EChartOption) {
        super();
    }
}

/** 轴配置 */
export interface AxisOption {
    /** 维度字段 */
    xFields?: string | string[2];
    /** 数值字段 */
    yFields?: string | string[2];
    /** 是否倒置 */
    inversion?: boolean;
}

/**
 * 组件：基础柱状图，折线图显示器
 */
export class BarLineChart extends BaseEChart<BarLineChartDisplayerControl> {
    /** 
     * 生成配置
     * @param data 数据
     */
    generateOption(data?: any[]) {
        const { option, axisOption } = this.props;
        const axis = { ...axisOption } as AxisOption;
        // 数据为空
        if (!data || data.length === 0) {
            return option;
        }
        // 清空数据
        this.setDataEmpty!(option!);
        // props属性是只读，必须实例新的对象
        let opt = Object.assign({}, option);
        let xFields: string[] = [], yFields: string[] = [];
        // 处理轴配置中字段配置是否数组，并重新赋值于对应的轴数组中
        // 将轴字段配置以数组进行处理
        if (isArray(axis.xFields)) {
            for (let i = 0; i < axis.xFields!.length; i++) {
                xFields.push(axis.xFields![i]);
            }
        } else {
            xFields.push(axis.xFields!);
        }
        if (isArray(axis.yFields)) {
            for (let i = 0; i < axis.yFields!.length; i++) {
                yFields.push(axis.yFields![i]);
            }
        } else {
            yFields.push(axis.yFields!);
        }
        // 遍历数据
        data.forEach((row, index) => {
            // x轴处理，首先倒置判断，没有倒置直接加入轴数据，倒置加入系列数据
            for (let i = 0; i < xFields.length; i++) {
                const xField = xFields[i]!;
                if (typeof row[xField] !== 'undefined') {
                    // 是否倒置
                    if (!axis.inversion) {
                        if (isArray(opt.xAxis)) {
                            if (!opt.xAxis[i].data) {
                                opt.xAxis[i].data = [];
                            }
                            opt.xAxis[i].data.push(row[xField]);
                        } else {
                            if (!opt.xAxis.data) {
                                opt.xAxis.data = [];
                            }
                            opt.xAxis.data.push(row[xField]);
                        }
                    } else {
                        // 系列数据
                        const d = { value: row[xField], rowValue: row };
                        this.setSeriesData(d, opt, i);
                    }
                }
            }
            // y轴处理，首先倒置判断，没有倒置直接加入轴数据，倒置加入系列数据
            for (let i = 0; i < yFields.length; i++) {
                const yField = yFields[i]!;
                if (typeof row[yField] !== 'undefined') {
                    // 是否倒置
                    if (axis.inversion) {
                        if (isArray(opt.yAxis)) {
                            if (!opt.yAxis[i].data) {
                                opt.yAxis[i].data = [];
                            }
                            opt.yAxis[i].data.push(row[yField]);
                        } else {
                            if (!opt.yAxis.data) {
                                opt.yAxis.data = [];
                            }
                            opt.yAxis.data.push(row[yField]);
                        }
                    } else {
                        // 系列数据
                        const d = { value: row[yField], rowValue: row };
                        this.setSeriesData(d, opt, i);
                    }
                }
            }
        });
        return opt;
    }
}

/**
 * 控件：基础柱状图，折线图显示器
 */
@addon('BarLineChartDisplayerControl', '基础柱状图，折线图显示器', '使用EChart，柱状图，折线图封装的数据显示器')
@reactControl(BarLineChart)
export class BarLineChartDisplayerControl extends BaseEChartsDisplayerControl {
    /**
     * 基础柱状图，折线图显示器
     * @param option ECharts配置
     * @param axisOption 轴配置
     */
    constructor(
        public option?: EChartOption,
        public axisOption?: AxisOption) {
        super(option);
    }
}