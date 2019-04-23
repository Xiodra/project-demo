/*
 * 版权：Copyright (c) 2018 红网
 * 
 * 创建日期：Thursday November 22nd 2018
 * 创建者：杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 修改日期: Thursday, 22nd November 2018 3:08:37 pm
 * 修改者: 杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 说明
 * 		1、ECharts配置
 */
import { EChartsOptions } from "pao-aop-client/lib/react/components/charts/echarts_helper";
// import 'src/statics/assets/map_nanhai.js';
import 'echarts/extension/bmap/bmap';
export const option: EChartsOptions = {
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: [],
        textStyle: {}
    },
    // geo: {
    //     map: 'nanhai',
    //     label: {},
    //     roam: true,
    //     itemStyle: {
    //         areaColor: 'rgba(48,56,69,0.8)' // 地图触发地区的背景颜色
    //     }
    // },
    series: []
};
export default option;