/*
 * 版权：Copyright (c) 2018 红网
 * 
 * 创建日期：Saturday November 24th 2018
 * 创建者：杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 修改日期: Saturday, 24th November 2018 9:49:01 am
 * 修改者: 杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 说明
 * 		1、ECharts配置
 */

import { EChartsOptions } from "pao-aop-client/lib/react/components/charts/echarts_helper";

export const option: EChartsOptions = {
    tooltip: {
        formatter: "{a} <br/>{b} : {c}%"
    },
    grid: {
        width: 200,
        height: 95
    },
    series: [
        {
            name: '',
            type: 'gauge',
            detail: {
                formatter: '{value}',
                fontSize: 28,
                color: '#ffffff'
            },
            data: [
                { value: 0 }
            ],
            max: 10,
            axisLine: {
                show: true,
                lineStyle: {
                    width: 20,
                    shadowBlur: 0,
                    color: [
                        [0.2, '#00FDE8'],
                        [0.8, '#12D3FF'],
                        [1, '#0082FC']
                    ]
                }
            },
            axisLabel: {
                distance: 13,
                textStyle: {
                    color: '#ffffff',
                    fontSize: 14
                }

            },
            radius: '100%',
            splitLine: {
                lineStyle: {
                    width: 1
                },
                length: 20
            },
            itemStyle: {
                normal: {
                    color: '#14CEFF'
                }
            },
            pointer: {
                width: 4,
                length: '70%'
            },
            axisTick: {
                length: 6
            }
        }
    ]
};
export default option;