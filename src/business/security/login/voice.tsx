import * as React from "react";
import { addon } from "pao-aop";
import { reactControl } from "pao-aop-client";
import { BaseUserInfoForm, BaseUserInfoFormControl } from "../base";

/*
 * 版权：Copyright (c) 2018 红网
 * 
 * 创建日期：Saturday September 15th 2018
 * 创建者：胡燕龙(huyl) - y.dragon.hu@hotmail.com
 * 
 * 修改日期: Saturday, 15th September 2018 11:48:29 am
 * 修改者: 胡燕龙(huyl) - y.dragon.hu@hotmail.com
 * 
 * 说明
 *    1、语音锁登陆表单
 */

/**
 * 组件：名称
 */
export class LoginWithVoiceForm extends BaseUserInfoForm<LoginWithVoiceFormControl, {}> {
    render() {
        // TODO:Voice login form
        return (
            <div style={{ height: 200 }}>语音锁登陆表单，该功能暂未实现</div>
        );
    }
}

/**
 * 控件：名称
 */
@addon('LoginWithVoiceFormControl', '语音锁登陆表单', '语音锁登陆表单控件')
@reactControl(LoginWithVoiceForm)
export class LoginWithVoiceFormControl extends BaseUserInfoFormControl {

}