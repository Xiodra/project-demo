import { Form, message, Icon, } from "antd";
import { BaseUserInfoForm, BaseUserInfoFormControl } from "../base";
import * as React from "react";
import { addon } from "pao-aop";
import { reactControl } from "pao-aop-client";
import { NTInput } from "src/business/components/input";
import { NTCountdownInput } from "src/business/components/countdown-input";
import { NTButton } from "src/business/components/button";

const FormItem = Form.Item;

/** 密码找回表单值 */
export interface RetrievePasswordFormValues {
    /** 手机号码 */
    mobile?: number;
    /** 新密码 */
    newPassword?: string;
    /** 确认新密码 */
    alginNewPassword?: string;
    /** 验证码 */
    verify_code?: string;
    /** 验证类型 */
    verify_type?: string;
    /** 验证目标 */
    target?: string;
}

/**
 * 组件：密码找回的表单
 */
export class RetrievePasswordFrom extends BaseUserInfoForm<RetrievePasswordFromControl, {}> {
    constructor(props: RetrievePasswordFromControl) {
        super(props);
    }
    /** 确定按钮 */
    handleSubmit = (e: any) => {
        e.preventDefault();
        const { form } = this.props;
        form!.validateFields((err: Error, values: RetrievePasswordFormValues) => {
            console.info(err);
            if (!err) {
                this.props.retrieve_password(values);
            }
        });
    }
    send_verification_code = () => {
        const { form, send_verification_code, verify_type } = this.props;
        form!.validateFields((err: Error, values: RetrievePasswordFormValues) => {

            if (!(typeof (values.target) === "undefined" && err)) {
                send_verification_code(values.target);
            } else {
                if (verify_type === 'mobile') {
                    message.info('请输入手机号码');
                } else {
                    message.info('请输入邮箱账号');
                }
                return;
            }

        });
    }
    changeTarget = () => {

    }
    render() {
        const { getFieldDecorator } = this.props.form!;
        const { verify_type } = this.props;
        return (
            <Form onSubmit={this.handleSubmit} className={'retrieve-password'}>
                <FormItem>
                    {
                        verify_type === 'mobile' ?
                            getFieldDecorator('target', {
                                rules: [{
                                    required: true,
                                    validator: this.checkPhone
                                }],
                            })(
                                <NTInput placeholder='手机号码' prefix={<Icon type="mobile" style={{ color: '#333333', fontSize: '20px' }} />} />
                            ) : getFieldDecorator('target', {
                                rules: [{
                                    required: true,
                                    message: '请输入邮箱'
                                }],
                            })(
                                <NTInput placeholder='邮箱账号' prefix={<Icon type="mail" style={{ color: '#333333', fontSize: '20px' }} />} />
                            )

                    }
                </FormItem>
                <FormItem>
                    {getFieldDecorator('newPassword', {
                        rules: [{
                            required: true,
                            validator: this.checkPassword
                        }],
                    })(
                        <NTInput inputType='lock' placeholder='新密码' prefix={<Icon type="lock" style={{ color: '#333333', fontSize: '20px' }} />} />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('alginNewPassword', {
                        rules: [{
                            required: true,
                            validator: this.checkPassword
                        }],
                    })(
                        <NTInput inputType='lock' placeholder='再次输入新密码' prefix={<Icon type="lock" style={{ color: '#333333', fontSize: '20px' }} />} />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('verify_code', {
                        rules: [{
                            required: true,
                            message: '请输入验证码'
                        }],
                    })(
                        <NTCountdownInput
                            inputPlaceholder='请输入验证码'
                            countdownSecond={60}
                            startText='获取验证码'
                            countdownText='秒后重新获取'
                            onClick={this.send_verification_code}
                            prefix={<Icon type="code" style={{ color: '#333333', fontSize: '20px' }} />}
                        />
                    )}
                </FormItem>
                <FormItem>
                    <NTButton name='确定' radius='radius50' htmlType='submit' />
                </FormItem>
                <FormItem style={{ textAlign: 'center' }}>
                    {
                        verify_type === 'mobile' ?
                            <span style={{ color: '#77669E', fontSize: '14px' }} onClick={this.props.changeTarget!}>更改邮箱验证方式》</span> :
                            <span style={{ color: '#77669E', fontSize: '14px' }} onClick={this.props.changeTarget!}>更改手机验证方式》</span>
                    }
                </FormItem>

            </Form>
        );
    }
}

/**
 * 控件：密码找回的表单
 */
@addon('RetrievePasswordFromControl', '以密码登陆的表单', '描述')
@reactControl(Form.create<RetrievePasswordFromControl>()(RetrievePasswordFrom))
export class RetrievePasswordFromControl extends BaseUserInfoFormControl {
    /** 发送验证码按钮 */
    public send_verification_code?: any;
    /** 提交密码 */
    public retrieve_password?: any;
    /** 验证类型 */
    public verify_type?: string;
    /** 验证方式修改 */
    public changeTarget?: () => void;
}

/** 具有表单API的组件 */
export default Form.create<RetrievePasswordFromControl>()(RetrievePasswordFrom);