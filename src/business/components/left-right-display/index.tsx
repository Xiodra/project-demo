import { BaseReactElementState, BaseReactElement, BaseReactElementControl, reactControl } from "pao-aop-client";
import React from "react";
import { addon } from "pao-aop";
import { Card } from "antd";

/**
 * 组件：左右显示控件状态
 */
export interface LeftRightDisplayState extends BaseReactElementState {
}

/**
 * 组件：左右显示控件
 * 描述：左右显示
 */
export class LeftRightDisplay extends BaseReactElement<LeftRightDisplayControl, LeftRightDisplayState> {
    render() {
        let { left_up, left_down, right, text_click } = this.props;
        return (
            <Card.Grid style={{ width: '100%' }}>
                <div style={{ display: 'flex' }}>
                    <div style={{ flex: '1', }}>
                        <p>{left_up}</p>
                        <p>{left_down}</p>
                    </div>
                    <div onClick={text_click!} style={{ lineHeight: '70px' }}>{right}</div>
                </div>
            </Card.Grid>
        );
    }
}

/**
 * 控件：左右显示控件控制器
 * 描述 左右显示
 */
@addon('LeftRightDisplay', '左右显示', '左右显示')
@reactControl(LeftRightDisplay)
export class LeftRightDisplayControl extends BaseReactElementControl {
    /** 左上显示的文字 */
    public left_up?: string;
    /** 左下显示的文字 */
    public left_down?: string;
    /** 右显示的文字 */
    public right?: string;
    /** 右边文字点击回调 */
    public text_click?: () => void;
    constructor() {
        super();
    }
}