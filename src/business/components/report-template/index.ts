import { EChartsOptions } from "pao-aop-client/lib/react/components/charts/echarts_helper";
import { createObject, newGuid } from "pao-aop";
import { BaseOptionDataMap, EChartsDataDisplayerControl } from "src/business/report/displayers/echarts/index";

/**
 * 获取ECharts数据显示器创建方法
 * @param option 默认配置
 * @param dataMapClass 对应数据转换器
 */
export function getEChartsDataDisplayerCreateFunction<T extends BaseOptionDataMap>(option: EChartsOptions, dataMapClass: new () => T): (
    /** 数据转换器属性 */
    dataMapAttribute: T,
    /** 数据显示器ID */
    id?: string,
    /** 自定义ECharts配置 */
    customOption?: EChartsOptions) => EChartsDataDisplayerControl {
    return (dataMapAttribute, id, customOption) => {
        // 获取最终ECharts配置
        let merginOption: EChartsOptions = {};
        merginOption = Object.assign(merginOption, option, customOption || {});
        let displayer = new EChartsDataDisplayerControl();
        displayer.id = id || newGuid();
        displayer.option = merginOption;
        displayer.dataMap = createObject(dataMapClass, dataMapAttribute);
        displayer.theme = 'gov-net-thing';
        return displayer;
    };
}