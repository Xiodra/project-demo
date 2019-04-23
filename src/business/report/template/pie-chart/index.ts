/*
 * 版权：Copyright (c) 2018 红网
 * 
 * 创建日期：Thursday November 22nd 2018
 * 创建者：杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 修改日期: Thursday, 22nd November 2018 2:59:54 pm
 * 修改者: 杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 说明
 * 		1、实现ECharts数据显示器图表模块功能
 */

import { addon } from "pao-aop";
import { EChartsOptions, EChartsLegend } from "pao-aop-client/lib/react/components/charts/echarts_helper";
import { getEChartsDataDisplayerCreateFunction } from "../index";
import option from "./option";
import { BaseOptionDataMap } from "src/business/report/displayers/echarts/index";

/**
 * 插件：饼图配置生成器
 * 描述:用于生成饼图配置生成器
 * @author yangziyi
 */
@addon('PieChartSerieDataMap', '饼图配置生成器', '用于生成饼图配置生成器')
export class PieChartSerieDataMap extends BaseOptionDataMap {
    /** 饼图值字段名 */
    public pieValueFieldName?: string;
    /** 饼图值名称字段名称 */
    public pieNameFieldName?: string;
    /** 饼图名称 */
    public pieName?: string;

    createOption?(dataViewID: string, data?: any[]): EChartsOptions | undefined {
        let option: EChartsOptions = {
            title: {
                subtextSTyle: {
                    color: '#14ceff',
                    fontSize: 12
                }
            },
            legend: {
                data: []
            },
            series: [
                {
                    name: this.pieName!,
                    // roseType: 'radius',
                    // label: {
                    //     normal: {
                    //         formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                    //         borderColor: 'RGBA(86, 180, 211, 1)',
                    //         borderWidth: 1,
                    //         borderRadius: 4,
                    //         rich: {
                    //             a: {
                    //                 lineHeight: 22,
                    //                 align: 'center',
                    //                 padding: [0, 10]
                    //             },
                    //             b: {
                    //                 lineHeight: 22,
                    //                 align: 'center',
                    //                 padding: [0, 10]

                    //             },
                    //             hr: {
                    //                 borderColor: 'RGBA(86, 180, 211, 1)',
                    //                 width: '100%',
                    //                 borderWidth: 0.5,
                    //                 height: 0
                    //             }
                    //         }
                    //     }
                    // },
                    data: []
                }
            ]
        };
        (option.legend as EChartsLegend).data = data!.map(row => row[this.pieNameFieldName!]);
        option.series![0].data = data!.map(row => {
            return { value: row[this.pieValueFieldName!], name: row[this.pieNameFieldName!], row: row };
        });
        return option;
    }
}

/**
 * 创建饼图数据显示器
 */
export const createPieChartDataDisplayer = getEChartsDataDisplayerCreateFunction(option, PieChartSerieDataMap);