import * as React from "react";
import { Form, Checkbox, Icon } from "antd";
import { BaseUserInfoForm, BaseUserInfoFormControl } from "../base";
import { addon } from "pao-aop";
import { reactControl } from "pao-aop-client";
import { NTInput } from "src/business/components/input";
import { NTButton } from "src/business/components/button";
import { LoginType } from "src/business/security";
import { NTTextButtom } from "src/business/components/text-button";
const FormItem = Form.Item;
/*
 * 版权：Copyright (c) 2018 红网
 * 
 * 创建日期：Saturday September 15th 2018
 * 创建者：胡燕龙(huyl) - y.dragon.hu@hotmail.com
 * 
 * 修改日期: Saturday, 15th September 2018 11:49:53 am
 * 修改者: 胡燕龙(huyl) - y.dragon.hu@hotmail.com
 * 
 * 说明
 *    1、账户及密码登陆表单
 */

/** 表单值 */
export interface LoginFormValues {
    /** 用户名 */
    userName?: string;
    /** 密码 */
    password?: string;
    /** 记住我 */
    remember?: boolean;
}
/** 记住密码字段 */
export class RememberPassword {
    /** 用户名 */
    userName?: string;
    /** 密码 */
    password?: string;
    /** 记住我 */
    remember?: boolean;
}
/**
 * 组件：账户或者手机号码及密码登陆表单
 */
export class LoginForm extends BaseUserInfoForm<LoginFormControl, {}> {
    constructor(props: LoginFormControl) {
        super(props);
    }
    handleSubmit = (e: any) => {
        e.preventDefault();
        const { form, onLogin, onSuccess, onFail, onRemember } = this.props;
        form!.validateFields((err: Error, values: LoginFormValues) => {
            if (!err) {
                onLogin!(
                    LoginType.UserPassword,
                    {
                        'account': values.userName,
                        'password': values.password
                    })
                    .then(success => {
                        if (success) {
                            onSuccess!(success);
                            // tslint:disable-next-line:no-unused-expression
                            if (onRemember) {
                                let rememberUser = new RememberPassword();
                                rememberUser.userName = values.userName;
                                rememberUser.password = values.password;
                                rememberUser.remember = values.remember;
                                onRemember(rememberUser);
                            }
                        } else {
                            onFail!();
                        }
                    })
                    .catch(error => onFail!(error));
            }
        });
    }
    retrieve_password = () => {
        this.props.retrieve_password!();
    }
    render() {
        const { getFieldDecorator } = this.props.form!;
        const { user_info } = this.props;
        return (
            <Form onSubmit={this.handleSubmit} className={'login-form'}>
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{
                            required: true,
                            message: '请输入用户名'
                        }],
                        initialValue: user_info ? user_info.userName : ''
                    })(
                        <NTInput placeholder='用户名' prefix={<Icon type="user" style={{ color: '#333333', fontSize: '20px' }} />} />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true,
                            validator: this.checkPassword
                        }],
                        initialValue: user_info ? user_info.password : ''
                    })(
                        <NTInput inputType='lock' placeholder='密码' prefix={<Icon type="lock" style={{ color: '#333333', fontSize: '20px' }} />} />
                    )}
                </FormItem>
                <FormItem>
                    <NTButton style={{ width: '100%' }} name='登录' radius='radius50' htmlType='submit' />
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: user_info ? user_info.remember : false,
                    })(
                        <Checkbox>记住密码</Checkbox>
                    )}
                    <NTTextButtom text='忘记密码' onClick={this.retrieve_password} />
                </FormItem>
            </Form>
        );
    }
}

/**
 * 控件：账户或者手机号码及密码登陆表单
 */
@addon('LoginForm', '账户或者手机号码及密码登陆表单', '使用账户或者手机号码级密码登陆的表单控件')
@reactControl(Form.create<LoginFormControl>()(LoginForm))
export class LoginFormControl extends BaseUserInfoFormControl {
    /**
     * 账户或者手机号码及密码登陆表单
     * @param onLogin 登录回调
     * @param onSuccess 成功回调
     * @param onFail 失败回调
     * @param onRemember 记住密码
     */
    constructor(
        onLogin?: (loginType: LoginType, loginData?: any) => Promise<{
            code: number;
            message: string;
        }>,
        onSuccess?: (msg: {
            code: number;
            message: string;
        }) => void,
        onFail?: (error?: Error) => void,
        public retrieve_password?: () => void,
        public user_info?: RememberPassword,
        public onRemember?: (userInfo: RememberPassword) => void) {
        super(onLogin, undefined, onSuccess, onFail);
    }
}

export default Form.create<LoginFormControl>()(LoginForm);