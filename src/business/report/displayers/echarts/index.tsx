import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { addon, BaseAddon, DataView } from "pao-aop";
import ReactEcharts, { ReactEchartsPropsTypes, ObjectMap, EventMap, Func, optsMap } from "echarts-for-react";
import { BaseDisplayerControl, BaseDisplayer, DisplayerState } from "../../../report";
import { EChartsOptions } from 'pao-aop-client/lib/react/components/charts/echarts_helper';
import { EChartsUtility, IEChartsAssistSupport } from 'pao-aop-client/lib/utility';
import { reactControl } from 'pao-aop-client';

/*
 * 版权: Copyright (c) 2018 red
 * 
 * 文件: index.tsx
 * 创建日期: Monday November 12th 2018
 * 作者: pao
 * 说明:
 * 1、echarts数据显示器
 */

enum EChartsAssistEvent {
    ChageTheme = 'Change-Theme',
    RefreshAnimation = 'Refresh-Animation',
}

/**
 * 组件：ECharts数据显示器状态
 */
export interface EChartsDataDisplayerState extends DisplayerState {
    /** ECharts配置 */
    option?: EChartsOptions;
    /** 主题 */
    theme?: string;
    /** 自动动画 */
    autoAnimation?: {
        /** 当前系列索引 */
        currentSerieIndex?: number,
        /** 当前数据索引 */
        currentDataIndex?: number,
        /** 上次系列索引 */
        lastSerieIndex?: number,
        /** 上次数据索引 */
        lastDataIndex?: number,
        /** 上次地图数据名称 */
        lastMapDataName?: string,
        /** 自动标签循环对象 */
        autoTip?: any;
    };
}

/**
 * 插件：EChart数据转换图
 * 用于数据转换系列数据
 */
@addon('BaseOptionDataMap', 'EChart数据转换图', '用于数据转换系列数据')
export class BaseOptionDataMap extends BaseAddon {
    /**
     * 创建Option
     * @param data 待转换数据
     */
    createOption?(dataViewID: string, data?: any[]): EChartsOptions | undefined {
        return undefined;
    }
}

/**
 * 组件：ECharts数据显示器
 * 显示ECharts的数据显示器
 */
export class EChartsDataDisplayer extends BaseDisplayer<EChartsDataDisplayerControl, EChartsDataDisplayerState> {
    /** EChartReact实例 */
    echarts_react?: any;
    /** 当前DOM实例 */
    dom?: Element | Text | any;
    /** 是否鼠标进入而触发的暂停动画 */
    isMouseSuspend?: boolean;

    constructor(props: EChartsDataDisplayerControl) {
        super(props);
        this.state = {
            data: props.data!,
            option: props.option,
            theme: EChartsUtility.getCurrentTheme()
        };
    }
    componentWillMount() {
        super.componentWillMount();
        this.props
            .clearEventHandler!(EChartsAssistEvent.ChageTheme)
            .clearEventHandler!(EChartsAssistEvent.RefreshAnimation);
        this.props
            .addEventHandler!(EChartsAssistEvent.ChageTheme, () => this.handleChangeTheme())
            .addEventHandler!(EChartsAssistEvent.RefreshAnimation, () => this.handleRefreshAutoAnimation());
    }
    componentDidMount() {
        EChartsUtility.setEChartsControl(this.props);
    }
    componentWillUnmount() {
        EChartsUtility.clearEChartsControl(this.props);
    }
    resize(height?: number, width?: number) {
        let echartsInstance = this.echarts_react.getEchartsInstance();
        echartsInstance.resize();
    }
    onSetData(dataView: DataView, data?: any) {
        const { dataMap, option: sourceOption } = this.props;
        const option = dataMap!.createOption!(dataView.id!, data), fullOption = {};
        if (option || Object.keys(option!).length > 0) {
            Object.assign(fullOption, sourceOption, option);
            let echartsInstance = this.echarts_react.getEchartsInstance();
            //   设置图表实例的配置项以及数据，万能接口，所有参数和数据的修改都可以通过setOption完成，
            //   ECharts 会合并新的参数和数据，然后刷新图表。
            //   如果开启动画的话，ECharts 找到两组数据之间的差异然后通过合适的动画去表现数据的变化。
            echartsInstance.setOption(fullOption);
        }
    }
    /** 处理主题更新 */
    handleChangeTheme() {
        const { theme } = EChartsUtility;
        this.initAutoAnimation();
        let
            echartsInstance = this.echarts_react.getEchartsInstance(),
            element = echartsInstance.getDom(),
            option = echartsInstance.getOption();
        echartsInstance.clear();
        echartsInstance.dispose();
        echartsInstance = echarts.init(element, theme);
        echartsInstance.setOption(option);
        this.initEChartsEvent();
        this.startAutoAnimation();
    }
    /** 处理刷新自动动画效果 */
    handleRefreshAutoAnimation() {
        if (!this.getVisibleStatus() && this.getAutoAnimationStatus()) {
            this.suspendAutoAnimation();
        } else if (this.getVisibleStatus()) {
            this.startAutoAnimation();
        } else {
            this.suspendAutoAnimation();
        }
    }
    initEChartsEvent() {
        let echartsInstance = this.echarts_react.getEchartsInstance();
        $(echartsInstance.getDom()).mouseenter(() => {
            if (this.getAutoAnimationStatus()) {
                this.suspendAutoAnimation();
                this.isMouseSuspend = true;
            }
        }).mouseleave(() => {
            if (this.isMouseSuspend) {
                this.startAutoAnimation();
                this.isMouseSuspend = undefined;
            }
        });
    }
    /** 初始化自动动画 */
    initAutoAnimation() {
        let
            { autoAnimation } = this.state;
        if (autoAnimation) {
            this.animationSetting(false);
            autoAnimation.autoTip = undefined;
        }
        autoAnimation = {
            currentDataIndex: 0,
            currentSerieIndex: 0,
        };
    }
    animationSetting(showTip: boolean = true) {
        const
            { autoAnimation } = this.state,
            echartsInstance = this.echarts_react.getEchartsInstance();
        /** echarts动作列表 */
        let actionList = [];
        /** 取消高亮动作 */
        let downplayAction = {
            type: 'downplay',
            seriesIndex: autoAnimation!.lastSerieIndex,
            dataIndex: autoAnimation!.lastDataIndex
        };
        /** 高亮动作 */
        let highlightAction = {
            type: 'highlight',
            seriesIndex: autoAnimation!.currentSerieIndex,
            dataIndex: autoAnimation!.currentDataIndex
        };
        /** 显示提示框动 */
        let showTipAction = {
            type: 'showTip',
            seriesIndex: autoAnimation!.currentSerieIndex,
            dataIndex: autoAnimation!.currentDataIndex
        };
        if (autoAnimation!.lastMapDataName) {
            // 如果上一次是地图，则删除dataIndex属性，用name属性
            delete downplayAction.dataIndex;
            downplayAction['name'] = autoAnimation!.lastMapDataName;
            // 将地图取消选中动作加入动作列表
            actionList.push(
                {
                    type: 'geoUnSelect',
                    seriesIndex: autoAnimation!.lastSerieIndex,
                    name: autoAnimation!.lastMapDataName
                }
            );
        }
        // 将取消高亮加入动作列表
        actionList.push(downplayAction);
        if (showTip) {
            /** 配置项 */
            let option = echartsInstance.getOption();
            /** 当前系列 */
            let serie = option.series[autoAnimation!.currentSerieIndex!];
            /** 系列数据 */
            let data = serie.data;
            if (serie.type === 'map') {
                // 如果是地图系列，则将高亮动作和显示提示框动作的 dataIndex 改为 name
                data = option.geo[serie.geoIndex ? serie.geoIndex : 0].regions;
                let dataName = data[autoAnimation!.currentDataIndex!].name;
                delete highlightAction.dataIndex;
                highlightAction['name'] = dataName;
                delete showTipAction.dataIndex;
                showTipAction['name'] = dataName;
                // 加入地图选中动作到动作列表
                actionList.push(
                    {
                        type: 'geoSelect',
                        seriesIndex: autoAnimation!.currentSerieIndex,
                        name: dataName
                    }
                );
                // 将本次地图数据名称保留到下一次
                autoAnimation!.lastMapDataName = dataName;
            } else {
                // 如果本次不是地图则情况上次地图数据名称
                autoAnimation!.lastMapDataName = undefined;
                //  TODO:如果需要在自动动画中联动数据
            }
            // 加入高亮动作到动作列表
            actionList.push(highlightAction);
            // 加入显示提示框动作到动作列表
            actionList.push(showTipAction);
            // 保存当前数据给下次使用
            autoAnimation!.lastDataIndex = autoAnimation!.currentDataIndex;
            autoAnimation!.lastSerieIndex = autoAnimation!.currentSerieIndex;
            // 如果下一个数据索引超出数据长度，则进入下一个系列，否则继续迭代
            if (data && data.length && autoAnimation!.currentDataIndex! + 1 < data.length) {
                autoAnimation!.currentDataIndex!++;
            } else {
                autoAnimation!.currentDataIndex = 0;
                // 如果下一个系列索引超出系列列表长度，则重回第一个系列，否则继续迭代
                if (autoAnimation!.currentSerieIndex! + 1 < option.series.length) {
                    autoAnimation!.currentSerieIndex!++;
                } else {
                    autoAnimation!.currentSerieIndex = 0;
                }
            }
        } else {
            actionList.push({
                type: "hideTip"
            });
        }
        for (let index = 0; index < actionList.length; index++) {
            let action = actionList[index];
            echartsInstance.dispatchAction(action);
        }
    }
    /**
     * 开始自动动画
     */
    startAutoAnimation() {
        const { autoAnimationInterval } = this.props, { autoAnimation } = this.state;
        if (autoAnimationInterval) {
            if (!autoAnimation) {
                this.initAutoAnimation();
            }
            this.animationSetting();
            window.clearInterval(autoAnimation!.autoTip);
            autoAnimation!.autoTip = setInterval(
                () => {
                    this.animationSetting();
                },
                autoAnimationInterval);
        }
    }
    /** 暂停自动动画 */
    suspendAutoAnimation() {
        const { autoAnimation } = this.state;
        if (autoAnimation && autoAnimation.autoTip) {
            window.clearInterval(autoAnimation.autoTip);
            autoAnimation.autoTip = undefined;
            this.animationSetting(false);
        }
    }
    /** 
     * 获取自动动画状态
     * @description 正在自动动画则返回true，暂停则返回false
     */
    getAutoAnimationStatus(): boolean {
        const { autoAnimation } = this.state;
        if (autoAnimation) {
            return autoAnimation.autoTip ? true : false;
        } else {
            return false;
        }
    }
    /** 
     * 获取可见状态
     * @description 可见返回true，否则返回false
     */
    getVisibleStatus(): boolean {
        const echartsInstance = this.echarts_react.getEchartsInstance();
        if (echartsInstance && echartsInstance.getDom && echartsInstance.getDom()) {
            return $(echartsInstance.getDom()).is(':visible');
        } else {
            return false;
        }
    }
    render() {
        const { option, ...rest } = this.props;
        return (
            <ReactEcharts
                ref={ref => {
                    this.dom = ReactDOM.findDOMNode(ref!);
                    this.echarts_react = ref;
                }}
                option={this.state.option!}
                style={{ height: '100%', width: '100%' }}
                {...rest}
                theme={this.state.theme}
            />
        );
    }
}

/**
 * 控件：ECharts数据显示器控制器
 * 显示ECharts的数据显示器
 */
@addon('EChartsDataDisplayer', 'ECharts数据显示器', '显示ECharts的数据显示器')
@reactControl(EChartsDataDisplayer)
export class EChartsDataDisplayerControl extends BaseDisplayerControl implements ReactEchartsPropsTypes, IEChartsAssistSupport {
    public notMerge?: boolean;
    public lazyUpdate?: boolean;
    public style?: ObjectMap;
    public className?: string;
    public theme?: string | null;
    public onChartReady?: Func;
    public showLoading?: boolean;
    public loadingOption?: ObjectMap;
    public onEvents?: EventMap;
    public echarts?: object;
    public opts?: optsMap;
    public shouldSetOption?: Func;
    /** 配置 */
    public option: EChartsOptions;
    /** 数据转换器 */
    public dataMap?: BaseOptionDataMap;
    /** 自动动画时间间隔（单位：毫秒），即选中的两个数据之间的间隔 */
    public autoAnimationInterval?: number;
    /** 切换主题 */
    public changeTheme?= () => {
        this.fire!(EChartsAssistEvent.ChageTheme, this, null);
    }
    /** 开始自动动画 */
    public refreshAutoAnimation?= () => {
        this.fire!(EChartsAssistEvent.RefreshAnimation, this, null);
    }
}