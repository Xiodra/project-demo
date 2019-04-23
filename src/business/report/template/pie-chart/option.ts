/*
 * 版权：Copyright (c) 2018 红网
 * 
 * 创建日期：Thursday November 22nd 2018
 * 创建者：杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 修改日期: Thursday, 22nd November 2018 3:00:44 pm
 * 修改者: 杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 说明
 * 		1、ECharts配置
 */

import { EChartsOptions } from "pao-aop-client/lib/react/components/charts/echarts_helper";

export const option: EChartsOptions = {
    title: {
        text: '',
        subtext: ''
    },
    tooltip: {
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: []
    },
    series: [
        {
            name: '单位属性',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
export default option;