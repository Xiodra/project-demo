import React from "react";
import { addon } from "pao-aop";
import { reactControl, BaseReactElementControl } from "pao-aop-client";
import './index.less';
import { BaseLayoutControl } from "../base";
/**
 * 组件：上下显示器布局控件many-screen
 */
export class ManyScreenLayout extends React.Component<ManyScreenLayoutControl> {
    constructor(props: any) {
        super(props);
    }
    render() {
        const { childControls } = this.props;
        return (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
                <div style={{ flex: '1', marginBottom: '5px' }}>
                    {childControls![0].createElement!()}
                </div>
                <div style={{ flex: '2' }}>
                    {childControls![1].createElement!()}
                </div>
            </div>
        );
    }
}
/**
 * 控件：上下显示器布局控件
 */
@addon('SituationChartLayoutControl', '多布局控件', '用多布局控件')
@reactControl(ManyScreenLayout)
export class ManyScreenLayoutControl extends BaseLayoutControl {
    /**
     * 控件：上下显示器布局控件
     * @param childControls 子控件列表
     */
    constructor(childControls?: BaseReactElementControl[]) {
        super(childControls);
    }
}