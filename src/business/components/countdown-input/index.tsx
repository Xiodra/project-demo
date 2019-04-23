/*
 * 版权：Copyright (c) 2018 红网
 * 
 * 创建日期：Wednesday December 26th 2018
 * 创建者：杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 修改日期: Wednesday, 26th December 2018 8:00:45 pm
 * 修改者: 杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 说明
 * 		1、倒计时输入控件
 */

import { BaseReactElementState, BaseReactElement, reactControl, BaseReactElementControl, Countdown } from "pao-aop-client";

import React from "react";

import { addon } from "pao-aop";
import { Input } from "antd";
import './index.less';
import { InputProps } from "antd/lib/input";
import NTDivStyle from "src/business/style-components/div-style";

/**
 * 组件：倒计时输入控件状态
 */
export interface NTCountdownInputState extends BaseReactElementState {
}

/**
 * 组件：倒计时输入控件
 * 描述 控制倒计时输入控件
 */
export class NTCountdownInput extends BaseReactElement<NTCountdownInputControl, NTCountdownInputState> {
    constructor(props: NTCountdownInputControl) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    /** 点击触发回调 */
    handleClick() {
        this.props.onClick!();
    }
    render() {
        let { inputPlaceholder, inpurRadius, countDownRadius, countdownSecond, startText, countdownText, height, prefix, onClick, ...rest } = this.props;
        let className = '';
        let heightType = '';
        let classNameCountDown = '';
        switch (inpurRadius) {
            case 'radius50': className = prefix ? 'inputPrefixRadius50' : 'inputRadius50'; break;
            case 'radiusCenter50': className = 'inputRadiusCenter50'; break;
            default: className = prefix ? 'inputPrefixRadiusDefault' : 'inputRadiusDefault'; break;
        }
        switch (height) {
            case 'small': heightType = '30px'; break;
            case 'large': heightType = '80px'; break;
            default: heightType = '50px'; break;
        }
        switch (countDownRadius) {
            case 'radius50': classNameCountDown = 'countDownRadius50'; break;
            default: classNameCountDown = 'countDownDefault'; break;
        }
        return (
            <div style={{ position: 'relative', height: heightType }} className={className}>
                <Input prefix={prefix} placeholder={inputPlaceholder} {...rest} />
                {/* <div style={{ height: '100%', padding: '0 10px', position: 'absolute', float: 'right', top: '0px', right: '20px' }} className={classNameCountDown}> */}
                <NTDivStyle.NTCountDownContent className={classNameCountDown}>
                    {/* <div style={{ height: '100%', width: '100%', position: 'relative' }}> */}
                    <NTDivStyle.NTCountDownContentInside>
                        <Countdown startText={startText} countdownText={countdownText} countdownSecond={countdownSecond} onClick={() => this.handleClick()} />
                    </NTDivStyle.NTCountDownContentInside>

                    {/* </div> */}
                </NTDivStyle.NTCountDownContent>

                {/* </div> */}
            </div>
        );
    }
}

/**
 * 控件：倒计时输入控件
 * 描述 控制倒计时输入控件
 */
@addon('NTCountdownInput', '倒计时输入控件', '控制倒计时输入控件')
@reactControl(NTCountdownInput)
export class NTCountdownInputControl extends BaseReactElementControl implements InputProps {
    public prefixCls?: string;
    public size?: 'large' | 'default' | 'small' | any;
    public onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
    public addonBefore?: React.ReactNode;
    public addonAfter?: React.ReactNode;
    public suffix?: React.ReactNode | any;
    /** 输入框提示显示文本 */
    public inputPlaceholder?: string;
    /** 输入框弧度样式 */
    public inpurRadius?: 'radius50' | 'radiusCenter50';
    /** 倒计时框弧度样式 */
    public countDownRadius?: 'radius50';
    /** 倒计时（秒） */
    countdownSecond?: number;
    /** 开始显示文本 */
    startText?: string;
    /** 倒计时时显示文本 */
    countdownText?: string;
    /** 按钮事件 */
    public onClick?: () => void;
    /** 高 */
    public height?: 'small' | 'large';
    /** 前置显示文本 */
    public prefix?: any;
    constructor() {
        super();
    }
}