import { Form, Input, Icon, Button } from "antd";
import { BaseUserInfoForm, BaseUserInfoFormControl } from "../base";
import * as React from "react";
import { addon, call, UserInfo } from "pao-aop";
import { reactControl } from "pao-aop-client";
import { LoginType } from "src/business/security";

const FormItem = Form.Item;

/** 登陆表单值 */
interface LoginFormValues {
    /** 密码 */
    password?: string;
}

/**
 * 组件：以手机号码和密码登陆的表单
 */
export class LoginWithPasswordFrom extends BaseUserInfoForm<LoginWithPasswordFormControl, {}> {
    /** 提交按钮 */
    handleSubmit = (e: any) => {
        e.preventDefault();
        const { form, onLogin, onSuccess, onFail } = this.props;
        form!.validateFields((err: Error, values: LoginFormValues) => {
            if (!err) {
                onLogin!(
                    LoginType.UserPassword,
                    {
                        password: values.password
                    })
                    .then(success =>
                        success ?
                            call(onSuccess) :
                            call(onFail))
                    .catch(error => call(onFail, error));
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form!;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true,
                            validator: this.checkPassword
                        }],
                    })(
                        <Input prefix={<Icon type="lock" />} type="password" placeholder="密码" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit">
                        登陆
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

/**
 * 控件：以手机号码和密码登陆的表单
 */
@addon('LoginWithPasswordFormControl', '以密码登陆的表单', '描述')
@reactControl(Form.create()(LoginWithPasswordFrom as any))
export class LoginWithPasswordFormControl extends BaseUserInfoFormControl {
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

/** 具有表单API的组件 */
export default Form.create()(LoginWithPasswordFrom as any);