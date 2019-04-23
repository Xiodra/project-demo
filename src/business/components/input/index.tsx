import React from "react";
import './index.less';
import { BaseReactElementState, BaseReactElement, reactControl, BaseReactElementControl, CommonIcon } from "pao-aop-client";
import { addon } from "pao-aop";
import { Input } from "antd";
import { InputProps } from "antd/lib/input";

/*
 * 版权：Copyright (c) 2018 红网
 * 
 * 创建日期：Tuesday December 25th 2018
 * 创建者：杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 修改日期: Tuesday, 25th December 2018 11:25:48 am
 * 修改者: 杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 说明
 * 		1、输入框控件
 */
/**
 * 组件：输入框控件状态
 */
export interface NTInputState extends BaseReactElementState {
    enable?: Boolean;
    ip_type?: string;
    suffix?: string;
}

/**
 * 组件：输入框控件
 */
export class NTInput extends BaseReactElement<NTInputControl, NTInputState> {

    constructor(prop: any) {
        super(prop);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            enable: false,
            ip_type: 'password',
            suffix: this.props.suffix
        };
    }
    // componentWillUnmount() {

    // }
    handleClick() {
        if (this.state.enable) {
            // 把图片换成可视图片(第一张)，type改成密码
            this.setState(
                {
                    enable: false,
                    suffix: this.props.suffix,
                    ip_type: "password"
                }
            );
        } else {
            // 把图片换成可视图片(第二张)，type改成非密码
            this.setState(
                {
                    enable: true,
                    suffix: this.props.suffix_second ? this.props.suffix_second : this.props.suffix,
                    ip_type: ""
                }
            );

        }
    }

    render() {
        let { suffix, suffix_second, inputType, radius, placeholder, height, preText, prefix, default_value, ...rest } = this.props;
        let className = '';
        let heightType = '';
        if (typeof prefix === "string") {
            if (prefix.indexOf('@') > 0) {
                prefix = <CommonIcon icon={this.state.suffix} onClick={() => this.handleClick()} />;
            } else {
                prefix = <span>{prefix}</span>;
            }
        }
        switch (radius) {
            case 'radius50': className = prefix ? 'inputPrefixRadius50' : 'inputRadius50'; break;
            case 'radiusCenter50': className = 'inputRadiusCenter50'; break;
            case 'inputDefault': className = 'inputDefault'; break;
            default: className = prefix ? 'inputPrefixRadiusDefault' : 'inputRadiusDefault'; break;
        }
        switch (height) {
            case 'small': heightType = '30px'; break;
            case 'large': heightType = '80px'; break;
            default: heightType = '50px'; break;
        }
        return suffix_second || inputType ?
            (
                suffix ?
                    (
                        <div className={className} >
                            {/* <span className='spanTextDefault'>{preText}</span> */}
                            <Input style={{ height: heightType }} placeholder={placeholder} type={this.state.ip_type} prefix={prefix} suffix={<CommonIcon icon={this.state.suffix} onClick={() => this.handleClick()} {...rest} defaultValue={default_value} />} />
                        </div>
                    ) :
                    (
                        <div className={className} >
                            {/* <span className='spanTextDefault'>{preText}</span> */}
                            <Input style={{ height: heightType }} placeholder={placeholder} type={this.state.ip_type} prefix={prefix} {...rest} defaultValue={default_value} />
                        </div>
                    )
            ) : (
                <div className={className} >
                    {/* <span className='spanTextDefault'>{preText}</span> */}
                    <Input style={{ height: heightType }} placeholder={placeholder} prefix={prefix}  {...rest} defaultValue={default_value} />
                </div>
            );
    }
}

/**
 * 控件：输入框控件
 * @description 控制输入框控件
 * @author yzy
 */
@addon('NTInput', '输入框控件', '控制输入框控件')
@reactControl(NTInput)
export class NTInputControl extends BaseReactElementControl implements InputProps {
    public prefixCls?: string;
    public size?: 'large' | 'default' | 'small' | any;
    public onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
    public addonBefore?: React.ReactNode;
    public addonAfter?: React.ReactNode;
    public prefix?: React.ReactNode | any;
    public suffix?: React.ReactNode | any;
    public onClick?: () => void;
    // /** 前缀图标 */
    // public prefix?: string;
    /** 后缀图标 */
    // public suffix?: string;
    /** 后缀图标2 */
    public suffix_second?: string;
    /**  输入框类别 */
    public inputType?: 'lock';
    /** 弧度样式 */
    public radius?: 'radius50' | 'radiusCenter50' | 'inputDefault';
    /** 高度规格 */
    public height?: 'small' | 'large';
    /** 前置显示文本 */
    public preText?: string;
    /** 初始化值 */
    public default_value?: string;
    constructor() {
        super();
    }
}