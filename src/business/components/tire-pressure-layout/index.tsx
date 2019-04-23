import { BaseReactElementState, BaseReactElement, reactControl, BaseReactElementControl } from "pao-aop-client";

import React from "react";

import { addon } from "pao-aop";

/**
 * 组件：胎压详情页面布局控件状态
 */
export interface TirePressureLayoutState extends BaseReactElementState {
}

/**
 * 组件：胎压详情页面布局控件
 * 控制胎压详情页面布局
 */
export class TirePressureLayout extends BaseReactElement<TirePressureLayoutControl, TirePressureLayoutState> {
    render() {
        let { height, children, picture_url } = this.props;
        return (
            <div style={{ width: '100%', height: height ? height : '400px', display: 'flex', background: '#ffffff' }}>
                <div style={{ flex: 3.9, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ flex: 1, width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        {children![0]}
                    </div>
                    <div style={{ flex: 1, width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        {children![2]}
                    </div>
                </div>
                {
                    children![4] ?
                        <div style={{ flex: 2.2, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {children![4]}
                        </div>
                        :
                        picture_url ?
                            <div style={{ flex: 2.2, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img src={require('/src/projects/netThings/style/images/car.jpg')} style={{ width: '100%' }} />
                            </div>
                            :
                            ''
                }
                <div style={{ flex: 3.9, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ flex: 1, width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                        {children![1]}
                    </div>
                    <div style={{ flex: 1, width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                        {children![3]}
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * 控件：胎压详情页面布局控件
 * 控制胎压详情页面布局
 */
@addon('TirePressureLayout', '胎压详情页面布局控件', '控制胎压详情页面布局')
@reactControl(TirePressureLayout)
export class TirePressureLayoutControl extends BaseReactElementControl {
    /** 高度 */
    public height?: string;
    /** 图片标签图片地址 */
    public picture_url?: string;
    constructor() {
        super();
    }
}