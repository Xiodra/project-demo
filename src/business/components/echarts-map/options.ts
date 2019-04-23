/*
 * 版权：Copyright (c) 2018 红网
 * 
 * 创建日期：Wednesday November 28th 2018
 * 创建者：杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 修改日期: Wednesday, 28th November 2018 2:48:33 pm
 * 修改者: 杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 说明
 * 		1、ECharts配置
 */

import { EChartsOptions } from "pao-aop-client/lib/react/components/charts/echarts_helper";
// import 'src/statics/assets/map_nanhai.js';
// import 'echarts/extension/bmap/bmap';

export const option: EChartsOptions = {
    bmap: {
        center: [113.14958, 23.035191], // 默认南海区政府
        zoom: 5, // 地图缩放比例
        roam: true, // 开启用户缩放
        mapStyle: { style: 'midnight' } // 控制地图模式
    },
    series: [
        {
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: [],
            symbolSize: function (val: any) {
                return val[2] / 10;
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                },
                emphasis: {
                    show: true
                }
            }
        }
    ]
};
export default option;