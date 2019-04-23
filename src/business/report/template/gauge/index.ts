/**
 * 名称:用于生成仪表盘图配置生成器
 * @description 用于生成一个系列的仪表盘图配置生成器
 * @author yangziyi
 */

import { addon } from "pao-aop";
import { BaseOptionDataMap } from "src/business/report/displayers/echarts/index";
import { EChartsOptions } from "pao-aop-client/lib/react/components/charts/echarts_helper";
import { getEChartsDataDisplayerCreateFunction } from "../index";
import option from "./option";

@addon('gaugeDataMap', '用于生成仪表盘图配置生成器', '用于生成一个系列的仪表盘图配置生成器')
export class GaugeDataMap extends BaseOptionDataMap {
    /** 仪表盘图值字段名称 */
    public gaugeValueFieldName?: string;

    createOption?(dataViewID: string, data?: any[]): EChartsOptions | undefined {
        let option: EChartsOptions = {
            series: [
                {
                    data: [
                        { value: 0 }
                    ]
                }
            ]
        };
        if (!this.gaugeValueFieldName) {
            return option;
        }
        if (!data || data.length === 0) {
            return option;
        }
        option.series![0].data = data!.map(row => {
            return {
                value: row[this.gaugeValueFieldName!],
                row: row
            };
        });
        return option;
    }
}

/**
 * 创建仪表盘图数据显示器
 */
export const createGaugeDataDisplayer = getEChartsDataDisplayerCreateFunction(option, GaugeDataMap);
