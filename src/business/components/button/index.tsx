import { BaseReactElementState, BaseReactElement, reactControl, BaseReactElementControl } from "pao-aop-client";

import React from "react";

import { addon } from "pao-aop";
import { Button } from "antd";
import './index.less';

/*
 * 版权：Copyright (c) 2018 红网
 * 
 * 创建日期：Wednesday December 26th 2018
 * 创建者：杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 修改日期: Wednesday, 26th December 2018 11:32:45 am
 * 修改者: 杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 说明
 * 		1、按钮的控件
 */

/**
 * 组件：按钮控件状态
 */
export interface NTButtonState extends BaseReactElementState {
}

/**
 * 组件：按钮控件
 * 控制按钮的控件
 */
export class NTButton extends BaseReactElement<NTButtonControl, NTButtonState> {
    constructor(props: NTButtonControl) {
        super(props);
    }
    render() {
        let { radius, height, icon } = this.props;
        let className = '';
        let heightType = '';
        switch (radius) {
            case 'radius50': className = 'radius50'; break;
            case 'radius0': className = 'radius0'; break;
            default: className = ''; break;
        }
        switch (height) {
            case 'small': heightType = '30px'; break;
            case 'large': heightType = '80px'; break;
            default: heightType = '50px'; break;
        }
        return (
            <div className={className} style={{ height: heightType }} >
                <Button htmlType={this.props.htmlType} type={this.props.type ? this.props.type : 'primary'} size={this.props.button_size} onClick={this.props.onClick} icon={icon}>{this.props.name}</Button>
            </div>
        );
    }
}

/**
 * 控件：按钮控件
 * 控制按钮的控件
 */
@addon('NTButtonControl', '按钮控件', '控制按钮的控件')
@reactControl(NTButton)
export class NTButtonControl extends BaseReactElementControl {
    /** 按钮属性 */
    public type?: 'primary' | 'ghost' = 'primary';
    /** 按钮显示字 */
    public name?: string;
    /** 按钮尺寸 */
    public button_size?: 'large' | 'small';
    /** 弧度样式 */
    public radius?: 'radius50' | 'radius0';
    /** 高 */
    public height?: 'small' | 'large';
    /** 按钮文档类型 */
    public htmlType?: "submit" | "button" | "reset" = 'button';
    /** 按钮图标 */
    public icon?: string;
    constructor() {
        super();
    }
}