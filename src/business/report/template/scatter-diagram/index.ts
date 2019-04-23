/*
 * 版权：Copyright (c) 2018 红网
 * 
 * 创建日期：Thursday November 22nd 2018
 * 创建者：杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 修改日期: Thursday, 22nd November 2018 4:42:38 pm
 * 修改者: 杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 说明
 * 		1、实现ECharts数据显示器图表模块功能
 */

import { addon } from "pao-aop";
import { EChartsOptions } from "pao-aop-client/lib/react/components/charts/echarts_helper";
import { getEChartsDataDisplayerCreateFunction } from "../index";
import option from "./option";
import { BaseOptionDataMap } from "src/business/report/displayers/echarts/index";

/**
 * 插件：用于生成散点图配置生成器
 * 描述:用于生成一个系列的散点图配置生成器
 * @author yangziyi
 */
@addon('ScatterDiagramDataMap', '用于生成散点图配置生成器', '用于生成一个系列的散点图配置生成器')
export class ScatterDiagramDataMap extends BaseOptionDataMap {
    /** 散点图经度坐标字段名 */
    public longitudeFieldName?: string;
    /** 散点图维度坐标字段名 */
    public latitudeFieldName?: string;
    /** 散点图值字段名称 */
    public scatterValueFieldName?: string;
    /** 散点图值名称字段名称 */
    public scatterNameFieldName?: string;
    /** 散点图数据源ID集合字段 */
    public dataViewIDs?: string[];
    /** 散点图默认Option配置 */
    private defaultDataOption?: EChartsOptions = { series: [] };
    /** 散点图判断是否返回option标识 */
    private isSetData?: number[] = [];

    createOption?(dataViewID: string, data?: any[]): EChartsOptions | undefined {
        if (!this.scatterValueFieldName || !this.scatterNameFieldName) {
            return this.defaultDataOption;
        }
        const index = this.dataViewIDs!.indexOf(dataViewID);

        if (!this.defaultDataOption!.series![index]) {
            this.defaultDataOption!.series![index] = { data: [] };
            this.isSetData!.push(index);
        }
        this.defaultDataOption!.series![index].data = data!.map(row => {
            return {
                name: row[this.scatterNameFieldName!],
                value: [
                    row[this.longitudeFieldName!],
                    row[this.latitudeFieldName!],
                    row[this.scatterValueFieldName!]
                ],
                row: row
            };
        });
        if (this.isSetData!.length === this.dataViewIDs!.length) {
            this.isSetData = [];
            let temp = {};
            Object.assign(temp, this.defaultDataOption);
            this.defaultDataOption = { series: [] };// 清空
            return temp;
        }
        return {};
    }
}
/**
 * 创建散点图数据显示器
 */
export const createScatterDiagramDataDisplayer = getEChartsDataDisplayerCreateFunction(option, ScatterDiagramDataMap);