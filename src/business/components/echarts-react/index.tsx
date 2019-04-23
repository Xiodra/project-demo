/*
 * 版权：Copyright (c) 2019 红网
 * 
 * 创建日期：Wednesday February 13th 2019
 * 创建者：杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 修改日期: Wednesday, 13th February 2019 4:16:50 pm
 * 修改者: 杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 说明
 * 		1、自定义的echart for react控件
 *      2、创建原因是由于ReactEcharts在实现散点图的时候存在bug,点出不来
 */

import { BaseReactElementState, BaseReactElement, reactControl, BaseReactElementControl } from "pao-aop-client";

import React from "react";

import { addon } from "pao-aop";
import { scatterDiagramOptionAssign, thermodynamicChartOptionAssign, singleRectangularCoordinateOptionAssign } from "./option";
import echarts from "echarts";

/**
 * 组件：echart图表组件状态
 */
export interface EchartsReactState extends BaseReactElementState {
}

/**
 * 组件：echart图表组件
 */
export class EchartsReact extends BaseReactElement<EchartsReactControl, EchartsReactState> {
    myChart?: echarts.ECharts;
    chartResize = () => {
        if (this.myChart) {
            this.myChart!.resize();
        }
    }
    componentDidMount() {
        window.addEventListener('resize', this.chartResize, false);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.chartResize, false);
    }
    render() {
        let { theme, echart_id, data, option, map_type, value_field_name, latitude_field_name, longitude_field_name, x_field_name, y_field_name } = this.props;
        let thiz = this;
        setTimeout(
            function () {
                // 把存在的tooltip节点去掉
                let exbox = document.getElementById(echart_id!) as HTMLDivElement;
                if (exbox) {
                    let tooltip = exbox.querySelector('#tooltip');
                    if (tooltip) {
                        tooltip.remove();
                    }
                    thiz.myChart = echarts.init(document.getElementById(echart_id!) as HTMLDivElement, theme);
                    if (map_type === 'scatter') {
                        thiz.myChart.setOption(scatterDiagramOptionAssign(data!, option, longitude_field_name, latitude_field_name, value_field_name), true);
                    }
                    if (map_type === 'heat') {
                        thiz.myChart.setOption(thermodynamicChartOptionAssign(data!, option, longitude_field_name, latitude_field_name, value_field_name), true);
                    }
                    if (map_type === 'bar' || map_type === 'line') {
                        thiz.myChart.setOption(singleRectangularCoordinateOptionAssign(data!, option, x_field_name, y_field_name), true);
                    }
                }
            },
            100
        );
        return (
            <div style={{ width: '100%', height: '100%' }} id={echart_id} />
        );
    }
}

/**
 * 控件：echart图表组件
 * @description 控制echart图表组件
 * @author yzy
 */
@addon('EchartsReact', 'echart图表组件', '控制echart图表组件')
@reactControl(EchartsReact)
export class EchartsReactControl extends BaseReactElementControl {
    /** 数据源 */
    data?: any[];
    /** 自定义option */
    option?: any;
    /** 控制显示地图 scatter:散点图 heat：热力图 line: 折线图 bar：柱状图 */
    map_type?: 'scatter' | 'heat' | 'line' | 'bar';
    /** 值字段名 */
    value_field_name?: string;
    /** 经度字段名 */
    latitude_field_name?: string;
    /** 纬度字段名 */
    longitude_field_name?: string;
    /** X坐标字段名 */
    x_field_name?: string;
    /** y坐标字段名 */
    y_field_name?: string;
    /** 组件唯一id */
    echart_id?: string = 'ebox';
    /** 主题名称 */
    theme?: string;
    constructor() {
        super();
    }
}