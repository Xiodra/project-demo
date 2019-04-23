import { reactControl, BaseReactElementControl } from "pao-aop-client";
import { addon } from "pao-aop";
import React from "react";
import './index.less';
import { BaseLayoutControl } from "src/business/report/layout";

/**
 * 组件：数据分析
 */
export class DataAnalusis extends React.Component<DataAnalusisControl> {
    render() {
        const { childControls } = this.props;
        console.info(childControls);
        return (
            <div style={{ width: '100%', padding: '20px', backgroundColor: 'rgba(0, 0, 0, 0.1)', }}>
                <div style={{ display: 'flex', width: '100%', height: '357px', marginBottom: '20px', }}>
                    <div style={{ flex: '1', height: '100%' }}>
                        {childControls![0].createElement!()}
                    </div>
                    <div style={{ flex: '1', height: '100%', marginLeft: '20px' }}>
                        {childControls![1].createElement!()}
                    </div>
                </div>
                <div style={{ display: 'flex', width: '100%', height: '357px', marginBottom: '20px', }}>
                    <div style={{ flex: '1', height: '100%' }}>
                        {childControls![2].createElement!()}
                    </div>
                    <div style={{ flex: '1', height: '100%', marginLeft: '20px' }}>
                        {childControls![3].createElement!()}
                    </div>
                </div>
                <div style={{ display: 'flex', width: '100%', height: '357px', marginBottom: '20px', }}>
                    <div style={{ flex: '1', height: '100%' }}>
                        {childControls![4].createElement!()}
                    </div>
                    <div style={{ flex: '1', height: '100%', marginLeft: '20px' }}>
                        {childControls![5].createElement!()}
                    </div>
                </div>
                <div style={{ display: 'flex', width: '100%', height: '1000px' }}>
                    <div style={{ flex: '1', height: '100%', width: '100%', }}>
                        {childControls![6].createElement!()}
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * 控件：数据分析控制器
 * @description 数据分析
 */
@addon('DataAnalusis', '数据分析', '数据分析')
@reactControl(DataAnalusis)
export class DataAnalusisControl extends BaseLayoutControl {
    /**
     * 数据分析图布局控件
     * @param childControls 子控件列表
     */
    constructor(childControls?: BaseReactElementControl[]) {
        super(childControls);
    }
}