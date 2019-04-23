/*
 * 版权：Copyright (c) 2019 红网
 * 
 * 创建日期：Thursday January 3rd 2019
 * 创建者：杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 修改日期: Thursday, 3rd January 2019 10:54:19 am
 * 修改者: 杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 说明
 * 		1、富文本显示控件
 */

import React from "react";
import { addon } from "pao-aop";
import { reactControl, BaseReactElementControl } from "pao-aop-client";

/**
 * 组件：富文本显示控件状态
 */
export class NTRichTextDisplayState {

}

/**
 * 组件：富文本显示控件
 */
export class NTRichTextDisplay extends React.Component<NTRichTextDisplayControl, NTRichTextDisplayState> {
    constructor(props: NTRichTextDisplayControl) {
        super(props);
    }

    render() {
        let { rich_html } = this.props;
        return (
            // 有2个{{}}，第一{}代表jsx语法开始，第二个是代表dangerouslySetInnerHTML接收的是一个对象键值对;
            <div dangerouslySetInnerHTML={{ __html: rich_html ? rich_html : '' }} />
        );
    }
}

/**
 * 控件：富文本显示控件
 * 控制富文本显示控件
 */
@addon('NTRichTextDisplayControl', '富文本显示控件', '控制富文本显示控件')
@reactControl(NTRichTextDisplay)
export class NTRichTextDisplayControl extends BaseReactElementControl {
    /** 显示文本内容 */
    public rich_html?: string;
    constructor() {
        super();
    }
}