import * as React from "react";
import { addon, VerifyCode, call, UserInfo } from "pao-aop";
import { reactControl } from "pao-aop-client";
import { Form } from "antd";
import { BaseUserInfoForm, BaseUserInfoFormControl } from "../base";
// import { VerifyCodeApi } from "../verify-code";
import { NTInput } from "src/business/components/input";
import { NTCountdownInput } from "src/business/components/countdown-input";
import { NTButton } from "src/business/components/button";
import { LoginType } from "src/business/security";
const FormItem = Form.Item;

/*
 * 版权：Copyright (c) 2018 红网
 * 
 * 创建日期：Saturday September 15th 2018
 * 创建者：胡燕龙(huyl) - y.dragon.hu@hotmail.com
 * 
 * 修改日期: Saturday, 15th September 2018 11:48:11 am
 * 修改者: 胡燕龙(huyl) - y.dragon.hu@hotmail.com
 * 
 * 说明
 *    1、手机验证码登陆表单
 */

/** 提示文本 */
const enum TipText {
    InputTip = '请输入验证码',
    StartText = '获取验证码',
    CountdownText = '重新获取验证码',
    ErrorText = '验证码不能为空'
}

export interface LoginWithAuthCodeState {
    code?: VerifyCode;
    starting?: boolean;
}

/** 登陆表单值 */
export interface LoginFormValues {
    /** 手机号码 */
    phoneNUm?: string;
    /** 验证码 */
    verifyCode?: string;
}

/**
 * 组件：手机验证码登陆表单
 */
export class LoginWithAuthCodeForm extends BaseUserInfoForm<LoginWithAuthCodeFormControl, LoginWithAuthCodeState> {
    constructor(props: LoginWithAuthCodeFormControl) {
        super(props);
        let code = new VerifyCode();
        code.expireSeconds = 5;
        this.state = {
            code,
            starting: false
        };
    }

    /** 提交按钮 */
    handleSubmit = (e: any) => {
        e.preventDefault();
        this.setState({ starting: false });
        const { form, onLogin, onSuccess, onFail } = this.props;
        form!.validateFields((err: Error, values: LoginFormValues) => {
            if (!err) {
                onLogin!(
                    LoginType.Mobile,
                    {
                        verifyCode: values.verifyCode
                    })
                    .then(success =>
                        success ?
                            call(onSuccess) :
                            call(onFail))
                    .catch(error => onFail!(error));
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form!;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem>
                    {getFieldDecorator('phoneNUm', {
                        rules: [{
                            required: true,
                            validator: this.checkPhone
                        }],
                    })(
                        <NTInput prefix='手机号码' radius='radiusCenter50' placeholder='手机号码' />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('verifyCode', {
                        rules: [{
                            required: true,
                            message: TipText.ErrorText
                        }],
                    })(
                        <NTCountdownInput
                            prefix='验证码'
                            inputPlaceholder='请输入验证码'
                            inpurRadius='radiusCenter50'
                            countdownSecond={60}
                            startText='获取验证码'
                            countdownText='秒后重新获取'
                            onClick={function () { }}
                        />
                    )}
                </FormItem>
                <FormItem>
                    <NTButton name='确定' radius='radius0' onClick={this.handleSubmit} />
                </FormItem>
            </Form>
        );
    }
}

/**
 * 控件：手机验证码登陆表单
 */
@addon('LoginWithAuthCodeFormControl', '手机验证码登陆表单', '手机验证码登陆表单控件')
@reactControl(Form.create<LoginWithAuthCodeFormControl>()(LoginWithAuthCodeForm))
export class LoginWithAuthCodeFormControl extends BaseUserInfoFormControl {
    /**
     * 账户或者手机号码及密码登陆表单
     * @param onLogin 
     * @param onSuccess 
     * @param onFail 
     * @param onRemember 
     */
    constructor(
        onLogin?: (loginType: LoginType, loginData?: any) => Promise<{
            code: number;
            message: string;
        }>,
        onSuccess?: () => void,
        onFail?: (error?: Error) => void,
        public onRemember?: (userInfo: UserInfo) => void) {
        super(onLogin, undefined, onSuccess, onFail);
    }
}

export default Form.create<LoginWithAuthCodeFormControl>()(LoginWithAuthCodeForm);