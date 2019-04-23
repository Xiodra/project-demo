/*
 * 版权：Copyright (c) 2018 红网
 * 
 * 创建日期：Wednesday November 28th 2018
 * 创建者：杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 修改日期: Wednesday, 28th November 2018 2:48:26 pm
 * 修改者: 杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 说明
 * 		1、实现ECharts数据显示器图表模块功能
 */

import React from "react";
import { addon } from "pao-aop";
import { reactControl, BaseReactElementControl } from "pao-aop-client";
import { EChartsOptions } from "pao-aop-client/lib/react/components/charts/echarts_helper";
import ReactEcharts from "echarts-for-react";
import option from "./options";
import 'src/business/components/detail/index';

/**
 * 组件：单点地图组件状态
 */
export class MapState {
}

/**
 * 组件：单点地图组件
 */
export class echartsMap extends React.Component<echartsMapControl, MapState> {
    reactEcharts?: any;
    constructor(props: echartsMapControl) {
        super(props);
    }
    componentDidMount() {
        this.props.addEventHandler!(
            'change',
            (_: echartsMapControl, { longitude, latitude }: { longitude?: string, latitude?: string }) => {
                if (longitude && longitude) {
                    let opt: any = {
                        bmap: {
                            zoom: 50,
                            center: []
                        },
                        series: [{ data: [] }]
                    };
                    opt.series![0].data.push({ value: [longitude, latitude, '200'] }); // 原点坐标
                    opt.bmap.center = [longitude, latitude]; // 当前视角的中心点，用经纬度表示
                    let echartsInstance = this.reactEcharts.getEchartsInstance();
                    echartsInstance.setOption(opt);
                }
            });
    }
    render() {
        const { customOption } = this.props;
        // 获取最终ECharts配置
        let merginOption: EChartsOptions = {};
        merginOption = Object.assign(merginOption, option, customOption || {});
        return (
            <div className='div-map'>
                <ReactEcharts
                    ref={ref => {
                        this.reactEcharts = ref;
                    }}
                    option={merginOption}
                    style={{ height: '100%' }}
                />
            </div>
        );
    }
}

/**
 * 控件：单点图显示组件控制器
 * 控制显示单点图详情组件
 */
@addon('echartsMapControl', '单点图显示组件控制器', '控制显示单点图详情组件')
@reactControl(echartsMap)
export class echartsMapControl extends BaseReactElementControl {
    /**
     * 单点图显示组件控制器
     * @param customOption 自定义option配置
     */
    constructor(public customOption?: EChartsOptions) {
        super();
    }
    change?(longitude?: string, latitude?: string) {
        this.fire!('change', this, { longitude, latitude });
    }
}