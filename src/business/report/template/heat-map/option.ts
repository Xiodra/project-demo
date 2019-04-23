import { EChartsOptions } from "pao-aop-client/lib/react/components/charts/echarts_helper";
import 'src/statics/assets/map_nanhai.js';

/*
 * 版权：Copyright (c) 2018 红网
 * 
 * 创建日期：Friday November 23rd 2018
 * 创建者：杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 修改日期: Friday, 23rd November 2018 10:50:08 am
 * 修改者: 杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 说明
 * 		1、ECharts配置
 */
export const option: EChartsOptions = {
    bmap: {
        center: [113.14958, 23.035191], // 默认南海区政府
        zoom: 16,
        roam: true,
        mapStyle: { style: 'midnight' }
    },
    visualMap: [{
        show: false,
        top: 'top',
        min: 0,
        max: 5,
        splitNumber: 10,
        inRange: {
            color: ['#d94e5d', '#eac736', '#50a3ba'].reverse()
        }
    }],
    series: [{
        type: 'heatmap',
        coordinateSystem: 'bmap',
        data: []
    }]
};
export default option;