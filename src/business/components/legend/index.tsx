/*
 * 版权：Copyright (c) 2018 红网
 * 
 * 创建日期：Monday December 3rd 2018
 * 创建者：杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 修改日期: Wednesday, 5th December 2018 11:44:30 am
 * 修改者: 杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 说明
 * 		1、实现ECharts数据显示器说明信息模块功能
 */

import React from "react";

import { addon } from "pao-aop";

import { reactControl, BaseReactElementControl } from "pao-aop-client";

import '../legend/index.less';
/**
 * 组件：说明信息组件状态
 */
export class LegendState {
}

/**
 * 组件：说明信息组件
 */
export class Legend extends React.Component<LegendControl, LegendState> {
    constructor(props: LegendControl) {
        super(props);
    }
    render() {
        const { columns } = this.props;
        return (
            <dl className='dl-h'>
                {
                    columns ?
                        columns.map(({ title, color }: LegendConfig, index: number) => {
                            return (
                                <div key={index}>
                                    <dt style={{ backgroundColor: color }} />
                                    <dd> {title}</dd>
                                </div>
                            );
                        })
                        :
                        <div />
                }
            </dl>
        );
    }
}
/**
 * 备注标题和颜色配置
 */
export interface LegendConfig {
    /** 标题名称 */
    title?: string;
    /** 颜色 */
    color?: string;
}

/**
 * 控件：说明信息显示组件控制器
 * 控制显示说明信息组件
 */
@addon('Legend', '说明信息显示组件控制器', '控制显示说明信息组件')
@reactControl(Legend)
export class LegendControl extends BaseReactElementControl {

    /**
     * 说明信息显示组件控制器
     * @param columns 显示说明配置列表
     */
    constructor(public columns?: LegendConfig[]) {
        super();
    }
}