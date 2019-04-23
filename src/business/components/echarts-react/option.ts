import { EChartsOptions, EChartsXYAxis, EChartsSeries, EChartsLegend, EChartsAxisData } from "pao-aop-client/lib/react/components/charts/echarts_helper";
// import { lineChartOption } from "src/business/report-template/rectangle-coordinate/option";
import echarts from "echarts";
import { lineChartOption, option, multiAxisLineChartOption } from "src/business/report/template/rectangle-coordinate/option";
import moment from 'moment';

/*
 * 版权：Copyright (c) 2019 红网
 * 
 * 创建日期：Thursday January 24th 2019
 * 创建者：杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 修改日期: Thursday, 24th January 2019 10:01:13 am
 * 修改者: 杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 说明
 * 		1、视图自定义option
 */

// 电流人工智能分析
export let multiline1Option: EChartsOptions = {
    grid: {
        top: '100',
        bottom: '30'
    },
    legend: {
        data: []
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLine: {
            lineStyle: {
                color: '#4c4c4c'
            }
        },
        data: []
    },
    yAxis: {
        type: 'value',
        name: '单位:(安)',
        nameTextStyle: {
            fontSize: 11,

        },
        axisLabel: {
            fontSize: 9
        },
        axisLine: {
            lineStyle: {
                color: '#4c4c4c'
            }
        },
    },
    series: [
    ]
};

// 电器人工智能分析配置
export let artificialIntelligenceOption: EChartsOptions = {
    legend: {
        show: false
    },
    xAxis: {
        type: 'category',
        boundaryGap: true,
        axisLine: {
            lineStyle: {
                color: '#4c4c4c'
            }
        },
        axisLabel: {
            interval: 0,
            // rotate: 40
        }
    },
    yAxis: {
        type: 'value',
        name: '单位：千瓦时',
        nameTextStyle: {
            fontSize: 11,
        },
        splitNumber: 4,
        axisLabel: {
            fontSize: 9
        },
        axisLine: {
            lineStyle: {
                color: '#4c4c4c'
            }
        },
    },
    series: [{
        name: '用电量',
        type: 'bar',
        data: [],
        label: {
            normal: {
                show: true,
                position: 'top',
                color: '#ffffff'
            }
        },
        animationDelay: function (idx: number) {
            return idx * 10;
        },
        itemStyle: {
            color: new (echarts.graphic as any).LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(62,240,247,1)' },
                { offset: 1, color: 'rgba(15,121,203,1)' }
            ])
        },
        barWidth: 32
    }]
};

// 24小时用电趋势图
export let multilineOption: EChartsOptions = {
    legend: {
        show: false
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLine: {
            lineStyle: {
                color: '#4c4c4c'
            }
        }
    },
    yAxis: {
        type: 'value',
        name: '单位：千瓦时',
        nameTextStyle: {
            fontSize: 11,
        },
        axisLabel: {
            fontSize: 9
        },
        axisLine: {
            lineStyle: {
                color: '#4c4c4c'
            }
        },
    },
    series: [{
        name: '用电量',
        type: 'line',
        data: [],
        areaStyle: {},
        itemStyle: {
            color: new (echarts.graphic as any).LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(20,206,255,1)' },
                { offset: 0.2, color: 'rgba(20,206,255,0.6)' },
                { offset: 1, color: 'rgba(20,206,255,0)' }
            ])
        },
        barWidth: 32,
        smooth: true
    }],
};
// 用电情况统计
export let threeLineChartOption: EChartsOptions = {
    color: [
        '#0F92CB',
        '#2A4FCD',
        '#9436F4'
    ],
    title: [{
        text: '单位：千瓦时',
        top: '0%',
        bottom: 0,
        left: '4%',
        right: '5%',
        textStyle: {
            align: 'right',
            fontStyle: 'normal',
            fontSize: 11
        }
    }, {
        text: '单位：千瓦时',
        top: '34%',
        bottom: 0,
        left: '4%',
        right: '5%',
        textStyle: {
            align: 'right',
            fontStyle: 'normal',
            fontSize: 11
        }
    }, {
        text: '单位：千瓦时',
        top: '66%',
        bottom: 0,
        left: '4%',
        right: '5%',
        textStyle: {
            align: 'right',
            fontStyle: 'normal',
            fontSize: 11
        }
    }],
    grid: [{
        top: '5%',
        bottom: 0,
        left: '10%',
        right: '5%',
        height: '20%'
    },
    {
        top: '39%',
        bottom: 0,
        left: '10%',
        right: '5%',
        height: '20%'
    },
    {
        top: '71%',
        bottom: 0,
        left: '10%',
        right: '5%',
        height: '20%'
    }],
    axisPointer: {
        link: [{
            xAxisIndex: [0, 1, 2]
        }]
    },
    xAxis: [{
        type: 'category',
        gridIndex: 0,
        position: 'bottom',
        silent: false,
        splitLine: {
            show: false
        },
        axisLabel: {
            show: true
        },
        data: [],
        axisLine: {
            lineStyle: {
                color: '#4c4c4c'
            }
        },
        boundaryGap: false
    },
    {
        type: 'category',
        gridIndex: 1,
        position: 'bottom',
        silent: false,
        splitLine: {
            show: false
        },
        axisLabel: {
            show: true
        },
        data: [],
        axisLine: {
            lineStyle: {
                color: '#4c4c4c'
            }
        },
        boundaryGap: false
    },
    {
        type: 'category',
        gridIndex: 2,
        position: 'bottom',
        silent: false,
        splitLine: {
            show: false
        },
        axisLabel: {
            show: true
        },
        data: [],
        axisLine: {
            lineStyle: {
                color: '#4c4c4c'
            }
        },
        boundaryGap: false
    }],
    yAxis: [{
        nameTextStyle: {
            fontSize: 8
        },
        gridIndex: 0,
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        },
        axisLine: {
            lineStyle: {
                color: '#4c4c4c'
            }
        },
        position: 'left',
        axisLabel: {
            fontSize: 9
        }
    },
    {
        nameTextStyle: {
            fontSize: 8
        },
        gridIndex: 1,
        inverse: false,
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        },
        axisLine: {
            lineStyle: {
                color: '#4c4c4c'
            }
        },
        axisLabel: {
            fontSize: 9
        }
    },
    {
        nameTextStyle: {
            fontSize: 8
        },
        gridIndex: 2,
        inverse: false,
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        },
        axisLine: {
            lineStyle: {
                color: '#4c4c4c'
            }
        },
        axisLabel: {
            fontSize: 9
        }
    }],
    series: [{
        name: '当周',
        type: 'line',
        itemStyle: {
            normal: {
                color: new (echarts.graphic as any).LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(15,146,203,1)' },
                    { offset: 0.2, color: 'rgba(15,146,203,0.6)' },
                    { offset: 1, color: 'rgba(15,146,203,0)' }
                ])
            }
        },
        data: [],
        yAxisIndex: 0,
        areaStyle: {},
        smooth: true
    },
    {
        name: '月度',
        type: 'line',
        xAxisIndex: 1,
        itemStyle: {
            normal: {
                color: new (echarts.graphic as any).LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(42,79,205,1)' },
                    { offset: 0.2, color: 'rgba(42,79,205,0.6)' },
                    { offset: 1, color: 'rgba(42,79,205,0)' }
                ])
            }
        },
        data: [],
        yAxisIndex: 1,
        areaStyle: {},
        smooth: true
    },
    {
        name: '年度',
        type: 'line',
        xAxisIndex: 2,
        itemStyle: {
            normal: {
                color: new (echarts.graphic as any).LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(148,54,244,1)' },
                    { offset: 0.2, color: 'rgba(148,54,244,0.6)' },
                    { offset: 1, color: 'rgba(148,54,244,0)' }
                ])
            }
        },
        data: [],
        yAxisIndex: 2,
        areaStyle: {},
        smooth: true
    }]
};
export let seriesOption: EChartsSeries = {
    name: '',
    type: 'line',
    areaStyle: { color: 'none' },
    smooth: true,
    symbol: 'circle'

};

/**
 * 饼图配置
 */
export let ePieChartOption: EChartsOptions = {
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
export function stockMapManagement(odiv: any, loc_longitude: string, loc_latitude: string) {
    let myChartToolpie = echarts.init(document.getElementById(odiv) as HTMLDivElement);
    let myChartTool = {
        bmap: {
            center: [loc_longitude, loc_latitude], // 默认南海区政府
            zoom: 17,
            roam: true
        },
        series: [
            {
                name: '',
                type: 'scatter',
                coordinateSystem: 'bmap',
                data: [{
                    value: [
                        loc_longitude,
                        loc_latitude
                    ],
                }],
                symbolSize: 10,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    color: '#FF3030'
                }
            }]
    };
    myChartToolpie.setOption(myChartTool);
}

// 控制台散点图option
export let consoleOption: EChartsOptions = {
    tooltip: {
        trigger: 'item',
        triggerOn: 'click',
        enterable: true,
        confine: true,
        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);background-color: #ffffff;border-radius: 25px;white-space: normal;',
        textStyle: {
            color: 'black',
            decoration: 'none'
        },
        formatter: function (params: any) {
            setTimeout(
                function () {
                    stockMapManagement("tooltip", params.data.row.LONGITUDE, params.data.row.LATITUDE);
                },
                100
            );
            var res = '<div style="display:flex;padding:15px;">';
            res += '<div style="width:210px;">';
            res += '<div style="display: flex;"><p style="white-space: nowrap;"> 紧急程度： </p><p>' + params.data.row.EMERGENT_LEVEL + '</p></div>';
            res += '<div style="display: flex;"><p style="white-space: nowrap;"> 处理状态： </p><p>' + params.data.row.STATE + '</p></div>';
            res += '<div style="display: flex;"><p style="white-space: nowrap;"> 设备ID： </p><p>' + params.data.row.NETTHING_OBJECT_ID + '</p></div>';
            res += '<div style="display: flex;"><p style="white-space: nowrap;"> 设备类型： </p><p>' + params.data.row.OBJECT_TYPE + '</p></div>';
            res += '<div style="display: flex;"><p style="white-space: nowrap;"> 发生时间： </p><p>' + moment(params.data.row.DATE).format("YYYY-MM-DD HH:mm:ss") + '</p></div>';
            res += '<div style="display: flex;"><p style="white-space: nowrap;"> 负责区域： </p><p>' + params.data.row.area + '</p></div>';
            res += '<div style="display: flex;"><p style="white-space: nowrap;"> 详细地址： </p><p>' + params.data.row.ADDRESS + '</p></div>';
            res += '</div>';
            res += '<div style="margin-left:15px;">';
            res += '<div style="width:200px;height:200px;" id="tooltip" class="tooltip"></div>';
            res += '<button style="margin-top:15px;height: 32px;border: 1px solid transparent;border-radius: 4px;border-color: #d9d9d9;background-color: #fff;" onclick="window.location.href = \'/taskEditor/' + params.data.row.device_id + '\'"> 创建任务</button>';
            res += '<button style="margin-left:50px;height: 32px;border: 1px solid transparent;border-radius: 4px;border-color: #d9d9d9;background-color: #fff;" onclick="window.location.href = \'/deviceDetail/' + params.data.row.device_id + '\'"> 查看详情</button>';
            res += '</div>';
            res += '</div>';
            return res;
        }
    },
    bmap: {
        center: [113.14958, 23.035191], // 默认南海区政府
        zoom: 13,
        roam: true,
        // mapStyle: { style: 'midnight' }
        // enableMapClick:false
    },
    // visualMap: [{
    //     show: false,
    //     top: 10,
    //     min: 0,
    //     max: 5,
    //     splitNumber: 10,
    //     inRange: {
    //         color: ['#d94e5d', '#eac736', '#50a3ba'].reverse()
    //     }
    // }],
    series: [
        {
            name: '',
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: [],
            symbolSize: 10,
            // symbolSize: function (val: any[]) {
            //     return val[2] / 5;
            // },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                color: '#FF3030'
            }
        }]
};
export let heatMapOption: EChartsOptions = {
    bmap: {
        center: [113.14958, 23.035191], // 默认南海区政府
        zoom: 13,
        roam: true,
        // mapStyle: { style: 'midnight' } // 夜间模式
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

/**
 * 一个系列的直角坐标系数据绑定option
 * @param data 数据源
 * @param customerOption 自定义option
 * @param xAxisFieldName x轴字段名称
 * @param yAxisFieldNames y轴字段名称
 */
export function singleRectangularCoordinateOptionAssign(data: any[], customerOption: EChartsOptions, xAxisFieldName?: string, yAxisFieldName?: string): any {
    let merginOption: EChartsOptions = {};
    if (data && customerOption) {
        (customerOption.xAxis as EChartsXYAxis).data = data!.map(row => row[xAxisFieldName!]);
        customerOption.series![0].data = data!.map(row => {
            return { value: row[yAxisFieldName!], row: row };
        });
    }
    merginOption = Object.assign(merginOption, option, customerOption);
    return merginOption;
}

/**
 * 多个系列的直角坐标系数据绑定option
 * @param data 数据源
 * @param customerOption 自定义option
 * @param xAxisFieldName x轴字段名称
 * @param yAxisFieldNames y轴字段名称集合
 */
export function multiRectangularCoordinateOptionAssign(data: any[], customerOption: EChartsOptions, xAxisFieldName?: string, yAxisFieldNames?: string[]): any {
    if (data && customerOption) {
        (customerOption.xAxis as EChartsXYAxis).data = data!.map(row => row[xAxisFieldName!]);
        for (let i = 0; i < yAxisFieldNames!.length; i++) {
            // customerOption.series!.push({ data: [] });
            for (let j = 0; j < data!.length; j++) {
                customerOption.series![i].data.push({ value: data![j][yAxisFieldNames![i]] });
            }
        }
    }
    let merginOption: EChartsOptions = {};
    merginOption = Object.assign(merginOption, lineChartOption, customerOption);
    return merginOption;
}

/**
 * 多坐标折线图数据绑定option
 * @param data 数据源(按顺序赋值)
 * @param customerOption 自定义option
 * @param xAxisFieldName x轴字段名称集合
 * @param yAxisFieldNames y轴字段名称集合
 */
export function multiAxisLineChartOptionAssign(data: any[], customerOption: EChartsOptions, xAxisFieldNames?: string[], yAxisFieldNames?: string[]): EChartsOptions {
    if (data && customerOption) {
        for (let index = 0; index < data.length; index++) {
            customerOption!.xAxis![index].data = data![index].map((row: any[]) => row[xAxisFieldNames![index]]);
            customerOption!.series![index].data = data![index].map((row: any[]) => row[yAxisFieldNames![index]]);
        }
    }
    let merginOption: EChartsOptions = {};
    merginOption = Object.assign(merginOption, multiAxisLineChartOption, customerOption);
    return merginOption;
}
/**
 * 多个系列的直角坐标系数据绑定option（根据数据源自适应生成）
 * @param data 数据源
 * @param customerOption 自定义option
 * @param xAxisFieldNames x轴字段名称集合
 * @param yAxisFieldNames y轴字段名称集合
 */
export function autoMultiRectangularCoordinateOptionAssign(data: any[], customerOption: EChartsOptions, legendName?: string, dataSourceFieldName?: string, seriesOption?: EChartsSeries): EChartsOptions {
    if (data && customerOption) {
        (customerOption.legend as EChartsLegend).data = data!.map(row => row[legendName!]);
        const xAxisData: EChartsAxisData[] = [];
        data!.map((row, index) => {
            let temp = { data: [] };
            Object.assign(temp, seriesOption);
            customerOption.series!.push(temp);
            for (let k = 0; k < row[dataSourceFieldName!].length; k++) {
                // 取第一行的data中的总行数
                if (xAxisData.length < row[dataSourceFieldName!].length) {
                    xAxisData.push({ value: k.toString() });
                }
                customerOption.series![index].data.push({ value: row[dataSourceFieldName!][k] });
            }
            customerOption.series![index].name = row[legendName!];
        });
        (customerOption.xAxis as EChartsXYAxis).data = xAxisData;
    }
    let merginOption: EChartsOptions = {};
    merginOption = Object.assign(merginOption, lineChartOption, customerOption);
    return merginOption;
}

/**
 * 散点图数据绑定option
 * @param data 数据源
 * @param customerOption 自定义option
 * @param longitudeFieldName 散点图经度坐标字段名
 * @param latitudeFieldName 散点图纬度坐标字段名
 */
export function scatterDiagramOptionAssign(data: any[], customerOption: EChartsOptions, longitudeFieldName?: string, latitudeFieldName?: string, value?: string): any {
    data && customerOption ?
        customerOption!.series![0].data = data!.map(row => {
            return {
                value: [
                    row[longitudeFieldName!],
                    row[latitudeFieldName!],
                    row[value!]
                ],
                row: row
            };
        })
        : '';
    // console.log(customerOption);
    return customerOption;
}

/**
 * 热力图数据绑定option
 * @param data 数据源
 * @param customerOption 自定义option
 * @param longitudeFieldName 热力图经度坐标字段名
 * @param latitudeFieldName 热力图纬度坐标字段名
 * @param latitudeFieldName 热力图值字段名称
 * @param latitudeFieldName 热力图值名称字段名称
 */
export function thermodynamicChartOptionAssign(data: any[], customerOption: EChartsOptions, longitudeFieldName?: string, latitudeFieldName?: string, valueFieldName?: string, nameFieldName?: string): any {
    data && customerOption ?
        customerOption!.series![0].data = data!.map(row => {
            return {
                value: [
                    row[longitudeFieldName!],
                    row[latitudeFieldName!],
                    row[valueFieldName!]
                ],
                row: row
            };
        })
        : '';
    return customerOption;
}

/**
 * 饼图
 * @param data 数据源
 * @param customerOption 配置项
 * @param valueFileName 值字段名
 * @param nameFileName name字段名
 */
export function ePieChartOptions(data: any[], customerOption: EChartsOptions, valueFileName?: string, nameFileName?: string): any {
    data && customerOption ?
        customerOption!.series![0].data = data!.map(row => {
            return {
                value: row[valueFileName!],
                name: row[nameFileName!],
                row: row
            };
        })
        : '';
    return customerOption;
}