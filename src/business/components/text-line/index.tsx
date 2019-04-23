/*
 * 版权：Copyright (c) 2018 红网
 * 
 * 创建日期：Wednesday December 26th 2018
 * 创建者：杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 修改日期: Wednesday, 26th December 2018 8:01:48 pm
 * 修改者: 杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 说明
 * 		1、文本链接控件
 */

import { BaseReactElementState, reactControl, BaseReactElementControl, BaseReactElement } from "pao-aop-client";

import React from "react";

import { addon } from "pao-aop";
import { Icon } from "antd-mobile";
import { BlockContainer } from "src/business/style-components/block-container";

/**
 * 组件：文本链接控件状态
 */
export interface NTTextLinkState extends BaseReactElementState {
}

/**
 * 组件：文本链接控件
 * 控制文本链接
 */
export class NTTextLink extends BaseReactElement<NTTextLinkControl, NTTextLinkState> {
    render() {
        return (
            <BlockContainer onClick={() => { this.props.is_link ? this.props.history!.push(this.props.href!) : null; }}>
                {/* <div onClick={() => { this.props.is_link ? this.props.history!.push(this.props.href!) : null; }} style={{ display: "block", paddingLeft: '10px', paddingRight: '10px', cursor: 'pointer' }} > */}
                {this.props.placeholder}
                <Icon type="right" style={{ float: "right" }} />
                {/* </div> */}
            </BlockContainer>
        );
    }
}

/**
 * 控件：文本链接控件
 * 控制文本链接
 */
@addon('NTTextLink', '文本链接控件', '控制文本链接')
@reactControl(NTTextLink)
export class NTTextLinkControl extends BaseReactElementControl {
    /** 是否链接 */
    public is_link?: boolean;
    /** 跳转链接 */
    public href?: string;
    /** 显示文本 */
    public placeholder?: string;
    constructor() {
        super();
    }
}