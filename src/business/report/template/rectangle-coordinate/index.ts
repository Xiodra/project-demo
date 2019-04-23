/*
 * 版权：Copyright (c) 2018 红网
 * 
 * 创建日期：Wednesday November 14th 2018
 * 创建者：胡燕龙(huyl) - y.dragon.hu@hotmail.com
 * 
 * 修改日期: Thursday, 15th November 2018 9:41:42 am
 * 修改者: 胡燕龙(huyl) - y.dragon.hu@hotmail.com
 * 
 * 说明
 * 		1、实现ECharts数据显示器图表模块功能
 */
import { addon } from "pao-aop";
import { EChartsOptions, EChartsXYAxis, EChartsLegend, EChartsAxisData, EChartsSeries } from "pao-aop-client/lib/react/components/charts/echarts_helper";
import { getEChartsDataDisplayerCreateFunction } from "../index";
import { option } from "./option";
import { lineChartOption } from "./option";
import { multiAxisLineChartOption } from "./option";
import { BaseOptionDataMap } from "src/business/report/displayers/echarts/index";

/**
 * 名称:一个系列的直角坐标系配置生成器
 * @description 用于生成一个系列的直角坐标系配置生成器，一行数据中仅有一个坐标点[x,y]
 * @author huyl
 */
@addon('SingleRectangularCoordinateSerieDataMap', '一个系列的直角坐标系配置生成器', '用于生成一个系列的直角坐标系配置生成器')
export class SingleRectangularCoordinateSerieDataMap extends BaseOptionDataMap {
    /** x轴字段名称 */
    public xAxisFieldName?: string;
    /** y轴字段名称 */
    public yAxisFieldName?: string;

    /**
     * 
     * @param data 
     * 创建数据集
     */
    createOption?(dataViewID: string, data?: any[]): EChartsOptions | undefined {
        let option: EChartsOptions = {
            xAxis: {
                data: []
            },
            series: [
                {
                    data: []
                }
            ]
        };
        if (!this.xAxisFieldName || !this.yAxisFieldName) {
            return option;
        }

        (option.xAxis as EChartsXYAxis).data = data!.map(row => row[this.xAxisFieldName!]);
        option.series![0].data = data!.map(row => {
            return { value: row[this.yAxisFieldName!], row: row };
        });
        return option;
    }
}

/**
 * 创建一个系列的直角坐标系数据显示器
 */
export const createSingleRectangularCoordinateDataDisplayer =
    getEChartsDataDisplayerCreateFunction(option, SingleRectangularCoordinateSerieDataMap);

/**
 * 名称:多个系列的直角坐标系配置生成器
 * @description 用于生成多个系列的直角坐标系配置生成器，一行数据中有多分坐标点[x,y]
 * @author liuhx
 */
@addon('MultiRectangularCoordinate', '多个系列的直角坐标系配置生成器', '用于生成多个系列的直角坐标系配置生成器')
export class MultiRectangularCoordinate extends BaseOptionDataMap {
    /** x轴字段名称 */
    public xAxisFieldName?: string;
    /** y轴字段名称 */
    public yAxisFieldNames?: string[];

    /**
     * 
     * @param data 
     * 创建数据集
     */
    createOption?(dataViewID: string, data?: any[]): EChartsOptions | undefined {
        let option: EChartsOptions = {
            xAxis: {
                data: []
            },
            series: [
            ]
        };
        if (!this.xAxisFieldName || !this.yAxisFieldNames) {
            return option;
        }

        (option.xAxis as EChartsXYAxis).data = data!.map(row => row[this.xAxisFieldName!]);
        for (let i = 0; i < this.yAxisFieldNames.length; i++) {
            option.series!.push({ data: [] });
            for (let j = 0; j < data!.length; j++) {
                // se.value = data![j][this.yAxisFieldNames[i]];
                option.series![i].data.push({ value: data![j][this.yAxisFieldNames[i]] });
            }
        }
        return option;
    }
}

/**
 * 创建多个系列的直角坐标系数据显示器
 */
export const createMultiRectangularCoordinateDataDisplayer =
    getEChartsDataDisplayerCreateFunction(lineChartOption, MultiRectangularCoordinate);

/**
 * 插件：用于生成多坐标折线图配置生成器
 * 多坐标折线图配置生成器
 * @author yangziyi
 */
@addon('MultiAxisLineChartDataMap', '多坐标折线图配置生成器', '用于生成坐标条折线图配置生成器')
export class MultiAxisLineChartDataMap extends BaseOptionDataMap {
    /** x轴字段名称集合 */
    public xAxisFieldName?: string[];
    /** y轴字段名称集合 */
    public yAxisFieldName?: string[];
    /** 折线图数据源ID集合字段 */
    public dataViewIDs?: string[];
    /** 折线图默认Option配置 */
    private defaultDataOption?: EChartsOptions = { xAxis: [], series: [] };
    /** 折线图判断是否返回option标识 */
    private isSetData?: number[] = [];
    createOption?(dataViewID: string, data?: any[]): EChartsOptions | undefined {
        if (!this.xAxisFieldName || !this.yAxisFieldName) {
            return this.defaultDataOption;
        }
        const index = this.dataViewIDs!.indexOf(dataViewID);
        if (!this.defaultDataOption!.series![index]) {
            this.defaultDataOption!.xAxis![index] = { data: [] };
            this.defaultDataOption!.series![index] = { data: [] };
            this.isSetData!.push(index);
        }
        this.defaultDataOption!.xAxis![index].data = data!.map(row => row[this.xAxisFieldName![index]]);
        this.defaultDataOption!.series![index].data = data!.map(row => row[this.yAxisFieldName![index]]);
        if (this.isSetData!.length === this.dataViewIDs!.length) {
            this.isSetData = [];
            let temp = {};
            Object.assign(temp, this.defaultDataOption);
            this.defaultDataOption = { xAxis: [], series: [] };// 清空
            return temp;
        }
        return {};
    }
}
/**
 * 创建折线图数据显示器
 */
export const createMultiAxisLineChartDataDisplayer = getEChartsDataDisplayerCreateFunction(multiAxisLineChartOption, MultiAxisLineChartDataMap);

/**
 * 名称:多个系列的直角坐标系配置生成器(根据数据源生成折线/柱子数)
 * @description 用于自适应生成多个系列的直角坐标系配置生成器，一行数据中有多分坐标点[x,y]
 * @author yangziyi
 */
@addon('AutoMultiRectangularCoordinate', '多个系列的直角坐标系配置生成器(根据数据源生成折线/柱子数)', '用于自适应生成多个系列的直角坐标系配置生成器，一行数据中有多分坐标点[x,y]')
export class AutoMultiRectangularCoordinate extends BaseOptionDataMap {
    /** legend字段名称 */
    public legendName?: string;
    /** 数据集合字段名称 */
    public dataSourceFieldName?: string;
    /** series的配置 */
    public seriesOption?: EChartsSeries;

    /**
     * 创建数据集
     * @param data 
     */
    createOption?(dataViewID: string, data?: any[]): EChartsOptions | undefined {
        let option: EChartsOptions = {
            legend: {
                data: []
            },
            xAxis: {
                data: []
            },
            series: [
            ]
        };
        (option.legend as EChartsLegend).data = data!.map(row => row[this.legendName!]);
        const xAxisData: EChartsAxisData[] = [];
        data!.map((row, index) => {
            let temp = { data: [] };
            Object.assign(temp, this.seriesOption);
            option.series!.push(temp);
            for (let k = 0; k < row[this.dataSourceFieldName!].length; k++) {
                // 取第一行的data中的总行数
                if (xAxisData.length < row[this.dataSourceFieldName!].length) {
                    xAxisData.push({ value: k.toString() });
                }
                option.series![index].data.push({ value: row[this.dataSourceFieldName!][k] });
            }
            option.series![index].name = row[this.legendName!];
        });
        (option.xAxis as EChartsXYAxis).data = xAxisData;
        console.log('option----', option);
        return option;
    }
}

/**
 * 创建多个系列的直角坐标系数据显示器
 */
export const createAutoMultiRectangularCoordinateDataDisplayer =
    getEChartsDataDisplayerCreateFunction(lineChartOption, AutoMultiRectangularCoordinate);
