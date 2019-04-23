import { Form, message, Icon } from "antd";
import { BaseUserInfoForm, BaseUserInfoFormControl } from "../base";
import * as React from "react";
import { addon } from "pao-aop";
import { reactControl } from "pao-aop-client";
import { NTInput } from "src/business/components/input";
import { NTCountdownInput } from "src/business/components/countdown-input";
import { NTButton } from "src/business/components/button";

const FormItem = Form.Item;

/** 手机绑定表单值 */
export interface PhoneBindFormValues {
    /** 手机号码 */
    mobile?: number;
    /** 验证码 */
    identify_code?: string;
}
/**
 * 组件：手机绑定的表单
 */
export class PhoneBindFrom extends BaseUserInfoForm<PhoneBindFromControl, {}> {
    /** 确定按钮 */
    handleSubmit = (e: any) => {
        e.preventDefault();
        const { form } = this.props;
        form!.validateFields((err: Error, values: PhoneBindFormValues) => {
            if (!err) {
                this.props.phone_bind_onClick(err, values);
            }
        });
    }
    send_verification_code = () => {
        const { form, send_verification_code } = this.props;
        form!.validateFields((err: Error, values: PhoneBindFormValues) => {
            if (!(typeof (values.mobile) === "undefined" && err)) {
                send_verification_code(values.mobile);
            } else {
                message.info('请输入手机号码');
                return;
            }

        });

    }
    render() {
        const { getFieldDecorator } = this.props.form!;
        return (
            <Form onSubmit={this.handleSubmit} className={'phone-bind'}>
                <FormItem>
                    {getFieldDecorator('mobile', {
                        rules: [{
                            required: true,
                            validator: this.checkPhone
                        }],
                    })(
                        <NTInput placeholder='手机号码' prefix={<Icon type="mobile" style={{ color: '#333333', fontSize: '20px' }} />} />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('identify_code', {
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
                    <NTButton style={{ width: '100%' }} name='确认' radius='radius50' htmlType='submit' />
                </FormItem>
            </Form>
        );
    }
}

/**
 * 控件：手机绑定表单
 */
@addon('PhoneBindFromControl', '手机绑定表单', '控制手机绑定表单')
@reactControl(Form.create()(PhoneBindFrom as any))
export class PhoneBindFromControl extends BaseUserInfoFormControl {
    /** 确定按钮回调事件 */
    public phone_bind_onClick?: React.MouseEventHandler<any> | any;
    /** 发送验证码按钮 */
    public send_verification_code?: any;
}

/** 具有表单API的组件 */
export default Form.create<PhoneBindFromControl>()(PhoneBindFrom);