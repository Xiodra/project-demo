import { BaseReactElementState, BaseReactElement, reactControl, BaseReactElementControl } from "pao-aop-client";
import React from "react";
import { addon } from "pao-aop";
import { Button, Icon } from "antd";
import NTDivStyle from "src/business/style-components/div-style";

/**
 * 组件：展开收起组件
 */
export interface SpreadRetractState extends BaseReactElementState {
    // 用于判断是收起还是展开
    isOpen: boolean;
    // 查询按钮回调事件
    queryBtn: any;
    // 重置按钮回调事件
    resetBtn: any;
}

/**
 * 组件：展开收起组件
 */
export class SpreadRetract extends BaseReactElement<SpreadRetractControl, SpreadRetractState> {
    constructor(props: any) {
        super(props);
        let { isOpen, queryBtn, resetBtn } = this.props;
        this.state = {
            isOpen, queryBtn, resetBtn
        };
    }
    render() {
        let { isOpen, queryBtn, resetBtn } = this.state;
        let { children } = this.props;
        return (
            // <div style={{ height: '100%', width: '100%', position: 'relative' }}>
            <NTDivStyle.NTCountDownContentInside>
                <div>
                    {
                        // 0：收起时显示的值 1：展开时显示的值
                        isOpen ? children![0] : children![1]
                    }
                </div>
                <span style={{ overflow: 'hidden' }}>
                    <div style={{ height: 45, float: 'right', marginBottom: 24, display: 'inline-block' }}>
                        <Button type='primary' onClick={queryBtn} style={{ margin: 5, }}>查询</Button>
                        <Button onClick={resetBtn} style={{ margin: 5, }}>重置</Button>
                        <div style={{ display: 'inline-block', fontSize: 12, marginLeft: 5, }} onClick={() => { this.setState({ isOpen: !this.state.isOpen }); }}>
                            {
                                !isOpen ? <div>
                                    收起<Icon type="up" />
                                </div>
                                    : <div>
                                        展开<Icon type="down" />
                                    </div>}
                        </div>
                    </div>
                </span>
            </NTDivStyle.NTCountDownContentInside>

            // </div >
        );
    }
}

/**
 * 控件：展开收起组件控制器
 * @description 用于展开收起组件
 * @author 作者
 */
@addon('SpreadRetract', '展开收起组件', '展开收起组件')
@reactControl(SpreadRetract)
export class SpreadRetractControl extends BaseReactElementControl {
    // 用于判断是收起还是展开
    public isOpen: boolean;
    // 查询按钮回调事件
    public queryBtn: any;
    // 重置按钮回调事件
    public resetBtn: any;
    constructor() {
        super();
    }
}