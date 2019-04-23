/*
 * 版权：Copyright (c) 2018 红网
 * 
 * 创建日期：Wednesday November 14th 2018
 * 创建者：胡燕龙(huyl) - y.dragon.hu@hotmail.com
 * 
 * 修改日期: Wednesday, 14th November 2018 4:52:56 pm
 * 修改者: 胡燕龙(huyl) - y.dragon.hu@hotmail.com
 * 
 * 说明
 * 		1、ECharts配置
 */

import { EChartsOptions } from "pao-aop-client/lib/react/components/charts/echarts_helper";
/**
 * 定义报表样式，动画等。
 */
export const option: EChartsOptions = {
    tooltip: {},
    xAxis: {
        type: 'category',
        data: []
    },
    yAxis: {
        type: 'value',
        data: []
    },
    series: [{
        name: 'bar',
        type: 'bar',
        data: [],
        animationDelay: function (idx: number) {
            return idx * 10;
        }
    }, {
        name: 'bar1',
        type: 'bar',
        data: [],
        animationDelay: function (idx: number) {
            return idx * 10 + 100;
        }
    }, {
        name: 'bar2',
        type: 'bar',
        data: [],
        animationDelay: function (idx: number) {
            return idx * 10 + 100;
        }
    }],
    animationEasing: 'elasticOut',
    animationDelayUpdate: function (idx: number) {
        return idx * 5;
    }
};

export const lineChartOption: EChartsOptions = {
    title: {
        text: ''
    },
    legend: {
        data: ['lineChar', 'lineChar1'],
        align: 'left'
    },
    tooltip: {},
    xAxis: {
        type: 'category',
        data: [],
        silent: false,
        splitLine: {
            show: false
        }
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            color: '#EFEFEF',
            fontSize: 9
        }
    },
    series: [{
        name: 'lineChar',
        type: 'line',
        data: [],
        areaStyle: {},
        animationDelay: function (idx: number) {
            return idx * 10;
        }
    }, {
        name: 'lineChar1',
        type: 'line',
        data: [],
        areaStyle: {},
        animationDelay: function (idx: number) {
            return idx * 10 + 100;
        }
    }],
    animationEasing: 'elasticOut',
    animationDelayUpdate: function (idx: number) {
        return idx * 5;
    }
};

export const multiAxisLineChartOption: EChartsOptions = {
    color: [],
    title: {},
    grid: [],
    axisPointer: {
        link: [{
            xAxisIndex: []
        }]
    },
    legend: {
        data: []
    },
    tooltip: {
        trigger: 'item',
        show: true,
        showContent: true
    },
    xAxis: [],
    yAxis: [],
    series: [],
    animationEasing: 'elasticOut',
    animationDelayUpdate: function (idx: number) {
        return idx * 5;
    }
};

export default option;