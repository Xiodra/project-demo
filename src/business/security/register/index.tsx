/*
 * 版权：Copyright (c) 2018 红网
 * 
 * 创建日期：Saturday September 15th 2018
 * 创建者：胡燕龙(huyl) - y.dragon.hu@hotmail.com
 * 
 * 修改日期: Saturday, 15th September 2018 11:49:25 am
 * 修改者: 胡燕龙(huyl) - y.dragon.hu@hotmail.com
 * 
 * 说明
 *    1、账户注册表单
 */
import * as React from "react";
import { addon, log, call, VerifyCode, UserInfo } from "pao-aop";
import { LoginWithAuthCodeFormControl } from "../login/auth-code";
import { message, Form, } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { BaseUserInfoForm, BaseUserInfoFormControl } from "../base";
import { reactControl, CommonClickCheckbox } from "pao-aop-client";
import { VerifyCodeApi } from "../verify-code/index";
import { NTInput } from "src/business/components/input";
import { NTCountdownInput } from "src/business/components/countdown-input";
import { NTButton } from "src/business/components/button";

/** 提示文本 */
const enum TipText {
    inputTip = '请输入验证码',
    startText = '获取验证码',
    countdownText = '重新获取验证码',
    errorText = '验证码不能为空',
    needRead = '你需同意我们的条款才可注册'
}

/**
 * 状态：手机验证码登陆表单
 */
export interface AccountRegisterState {
    /** 验证码 */
    code?: VerifyCode;
    /** 开启验证码读秒 */
    starting?: boolean;
}

/** 登陆表单值 */
export interface AccountRegisterValues {
    /** 用户名 */
    userName?: string;
    /** 密码 */
    password?: string;
    /** 手机号码 */
    mobile?: string;
    /** 验证码 */
    verifyCode?: string;
}

/**
 * 组件：手机验证码登陆表单
 */
export class AccountRegisterForm extends BaseUserInfoForm<AccountRegisterFormControl, AccountRegisterState> {
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
        this.props.form!.validateFields((err: Error, values: AccountRegisterValues) => {
            if (!err) {
                this.props.onRegister!(new UserInfo(undefined, undefined, undefined, values.mobile))
                    .then(success =>
                        success ?
                            call(this.props.onSuccess) :
                            call(this.props.onFail))
                    .catch(error => this.props.onFail!(error));
            }
        });
    }
    checkAgree = (_: any, value: boolean, cb: any) => {
        if (!value) {
            cb(TipText.needRead);
        }
        cb();
    }
    handleStartCountdown?() {
        log('AccountRegisterForm', 'handleStartCountdown');
        this.setState({ starting: false });
        VerifyCodeApi
            .create()
            .then(code => this.setState({ code, starting: true }))
            .catch(error => {
                message.error(error.message);
            });
    }
    handleExplain?() {
        log('AccountRegisterForm', 'handleExplain');
        if ('onExplain' in this.props) {
            this.props.onExplain!();
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form!;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{
                            required: true,
                            validator: this.checkPhone
                        }],
                    })(
                        <NTInput preText='用户名' radius='radius50' placeholder='请输入用户名' />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true,
                            validator: this.checkPassword
                        }],
                    })(
                        <NTInput preText='密码' radius='radius50' inputType='lock' placeholder='请输入6-15位密码' />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('mobile', {
                        rules: [{
                            required: true,
                            validator: this.checkPhone
                        }],
                    })(
                        <NTInput preText='手机号码' radius='radius50' placeholder="请输入手机号码" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('mobile1', {
                        rules: [{
                            required: true,
                            validator: this.checkPhone
                        }],
                    })(
                        <NTInput preText='手机号码' radius='radius50' placeholder="请输入手机号码" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('mobile2', {
                        rules: [{
                            required: true,
                            validator: this.checkPhone
                        }],
                    })(
                        <NTInput preText='手机号码' radius='radius50' placeholder="请输入手机号码" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('mobile3', {
                        rules: [{
                            required: true,
                            validator: this.checkPhone
                        }],
                    })(
                        <NTInput preText='手机号码' radius='radius50' placeholder="请输入手机号码" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('mobile4', {
                        rules: [{
                            required: true,
                            validator: this.checkPhone
                        }],
                    })(
                        <NTInput preText='手机号码' radius='radius50' placeholder="请输入手机号码" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('mobile5', {
                        rules: [{
                            required: true,
                            validator: this.checkPhone
                        }],
                    })(
                        <NTInput preText='手机号码' radius='radius50' placeholder="请输入手机号码" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('mobile6', {
                        rules: [{
                            required: true,
                            validator: this.checkPhone
                        }],
                    })(
                        <NTInput preText='手机号码7' radius='radius50' placeholder="请输入手机号码" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('mobile8', {
                        rules: [{
                            required: true,
                            validator: this.checkPhone
                        }],
                    })(
                        <NTInput preText='手机号码' radius='radius50' placeholder="请输入手机号码" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('mobile9', {
                        rules: [{
                            required: true,
                            validator: this.checkPhone
                        }],
                    })(
                        <NTInput preText='手机号码' radius='radius50' placeholder="请输入手机号码" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('verifyCode', {
                        rules: [{
                            required: true,
                            message: TipText.errorText
                        }],
                    })(
                        // <Input
                        //     placeholder={TipText.inputTip}
                        //     suffix={
                        //         <Countdown
                        //             startText={TipText.startText}
                        //             countdownText={TipText.countdownText}
                        //             countdownSecond={this.state.code!.expireSeconds}
                        //             starting={this.state.starting}
                        //             onClick={() => this.handleStartCountdown!()}
                        //         />
                        //     }
                        // />
                        <NTCountdownInput prefix='验证码' inputPlaceholder='请输入验证码' inpurRadius='radius50' countDownRadius='radius50' countdownSecond={60} startText='获取验证码' countdownText='秒后重新获取' onClick={function () { }} />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('agree', {
                        valuePropName: 'checked',
                        rules: [{
                            required: true,
                            validator: this.checkAgree
                        }],
                    })(
                        <CommonClickCheckbox onClick={() => this.handleExplain!()}>新用户注册前请仔细阅读</CommonClickCheckbox>
                    )}
                    <NTButton htmlType='submit' radius='radius50' name='注册' />
                </FormItem>
            </Form>
        );
    }
}

/**
 * 控件：手机验证码登陆表单
 */
@addon('AccountRegisterFormControl', '手机验证码登陆表单', '手机验证码登陆表单控件')
@reactControl(Form.create()(AccountRegisterForm as any))
export class AccountRegisterFormControl extends BaseUserInfoFormControl {
    constructor(
        onRegiste?: (userInfo: UserInfo) => Promise<boolean>,
        onSuccess?: () => void,
        onFail?: (error?: Error) => void,
        public onExplain?: () => void) {
        super(undefined, onRegiste, onSuccess, onFail);
    }
}

export default Form.create()(AccountRegisterForm as any);