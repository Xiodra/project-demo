/*
 * 版权：Copyright (c) 2018 红网
 * 
 * 创建日期：Friday November 23rd 2018
 * 创建者：杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 修改日期: Friday, 23rd November 2018 10:42:05 am
 * 修改者: 杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 说明
 * 		1、
 */
import { getEChartsDataDisplayerCreateFunction } from "../index";
import option from "./option";
import { addon } from "pao-aop";
import { EChartsOptions } from "pao-aop-client/lib/react/components/charts/echarts_helper";
import { BaseOptionDataMap } from "src/business/report/displayers/echarts/index";

/**
 * 名称:用于生成热力图配置生成器
 * @description 用于生成一个系列的热力图配置生成器
 * @author yangziyi
 */
@addon('HeatmapDataMap', '用于生成热力图配置生成器', '用于生成一个系列的热力图配置生成器')
export class HeatmapDataMap extends BaseOptionDataMap {
    /** 热力图经度坐标字段名 */
    public longitudeFieldName?: string;
    /** 热力图维度坐标字段名 */
    public latitudeFieldName?: string;
    /** 热力图值字段名称 */
    public heatmapValueFieldName?: string;
    /** 热力图值名称字段名称 */
    public heatmapNameFieldName?: string;

    createOption?(dataViewID: string, data?: any[]): EChartsOptions | undefined {
        let option: EChartsOptions = {
            legend: {
                data: []
            },
            series: [
                {
                    data: []
                }
            ]
        };
        if (!this.heatmapValueFieldName) {
            return option;
        }
        option.series![0].data = data!.map(row => {
            return {
                name: row[this.heatmapNameFieldName!]!,
                value: [
                    row[this.longitudeFieldName!],
                    row[this.latitudeFieldName!],
                    row[this.heatmapValueFieldName!]
                ],
                row: row
            };
        });
        return option;
    }
}

/**
 * 创建散点图数据显示器
 */
export const createHeatmapDataDisplayer = getEChartsDataDisplayerCreateFunction(option, HeatmapDataMap);