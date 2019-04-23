import React from "react";
import { BaseReactElementState, BaseReactElement, reactControl, BaseReactElementControl } from "pao-aop-client";
import { addon } from "pao-aop";
import { InLineBlockContainer } from "src/business/style-components/inline-block-container";

/**
 * 组件：文本按钮状态
 */
export interface NTTextButtomState extends BaseReactElementState {
}

/**
 * 组件：文本按钮
 * 描述：可以给文本添加点击事件
 */
export class NTTextButtom extends BaseReactElement<NTTextButtomControl, NTTextButtomState> {
    render() {
        let { text, onClick } = this.props;
        return (
            // <div className={'text_btn'} onClick={onClick} style={{ display: 'inline-block', padding: '10px', textAlign: 'center' }}>
            <InLineBlockContainer className={'text_btn'} onClick={onClick}>
                {text}
            </InLineBlockContainer>
        );
    }
}

/**
 * 控件：文本按钮控制器
 * 描述：控制文本内容和事件
 */
@addon('TextButtom', '文本按钮控', '控制文本内容和事件')
@reactControl(NTTextButtom)
export class NTTextButtomControl extends BaseReactElementControl {
    /** 文字 */
    public text?: string;
    constructor() {
        super();
    }
}