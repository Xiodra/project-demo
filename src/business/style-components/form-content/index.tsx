import { BaseReactElementState, BaseReactElement, reactControl, BaseReactElementControl } from "pao-aop-client";
import React from "react";
import { addon } from "pao-aop";
import './index.less';

/**
 * 组件: 表单容器
 */
export interface FormContentState extends BaseReactElementState {
}

/**
 * 组件：表单容器
 */
export class FormContent extends BaseReactElement<FormContentControl, FormContentState> {
    render() {
        return (
            <div className='nt-form-content'>
                <div className='inside-conten'>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

/**
 * 控件：表单容器控制器
 * @description 表单容器
 * @author lhx
 */
@addon('FormContent', '表单容器', '表单容器')
@reactControl(FormContent)
export class FormContentControl extends BaseReactElementControl {
    constructor() {
        super();
    }
}