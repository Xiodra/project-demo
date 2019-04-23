import * as React from "react";
import { Form, Card, message, Button } from "antd";
import { BaseUserInfoForm, BaseUserInfoFormControl } from "../base";
import { addon } from "pao-aop";
import { reactControl } from "pao-aop-client";
import { NTInput } from "src/business/components/input";
import { NTCountdownInput } from "src/business/components/countdown-input";
// import { RowLayout } from "src/business/components/device-editor/row-layout";
const FormItem = Form.Item;
/** 表单值 */
export interface ModifyMobileFormValues {
    /** 新手机号码 */
    new_mobile?: string;
    /** 验证码 */
    identify_code?: string;
}

/**
 * 组件：修改手机号码表单
 */
export class ModifyMobileForm extends BaseUserInfoForm<ModifyMobileFormControl, {}> {
    submitButtonRef?: any;
    constructor(props: ModifyMobileFormControl) {
        super(props);
        this.submitButtonRef = React.createRef();
    }
    handleSubmit = (e: any) => {
        e.preventDefault();
        const { form, } = this.props;
        form!.validateFields((err: Error, values: ModifyMobileFormValues) => {
            if (!err) {
                this.props.modify_mobile(values);
            }
        });
    }
    send_verification_code = () => {
        const { form, send_verification_code } = this.props;
        form!.validateFields((err: Error, values: ModifyMobileFormValues) => {
            if (!(typeof (values.new_mobile) === "undefined" && err)) {
                send_verification_code(values.new_mobile);
            } else {
                message.info('请输入手机号码');
                return;
            }

        });
    }
    render() {
        const { getFieldDecorator } = this.props.form!;
        return (

            <Form onSubmit={this.handleSubmit} className={'security_form'}>
                <div>
                    <Card title="修改手机号码" style={{ height: 430, margin: 36, }}>
                        <div>跟换手机号码后，下次登录可使用新手机号码登录，当前手机号码：{this.props.mobile}</div>
                        <div style={{ width: '100%', height: '50px', marginTop: '10px', paddingLeft: '30px' }}>
                            <div style={{ fontSize: '14px', float: 'left', marginTop: '22px', width: '100px', textAlign: 'right' }}>新手机号码：</div>
                            <div style={{ position: 'relative', float: 'left', width: '350px' }}>
                                {getFieldDecorator('new_mobile', {
                                    initialValue: '',
                                    rules: [{
                                        required: true,
                                        message: '请输手机号码'
                                    }],
                                })(
                                    <NTInput placeholder='请输入手机号码' height='small' />
                                )}
                            </div>
                        </div>
                        <div style={{ width: '100%', height: '50px', marginTop: '10px', paddingLeft: '30px' }}>
                            <div style={{ fontSize: '14px', float: 'left', marginTop: '22px', width: '100px', textAlign: 'right' }}>验证码：</div>
                            <div style={{ position: 'relative', float: 'left', width: '350px' }}>
                                {getFieldDecorator('identify_code', {
                                    rules: [{
                                        required: true,
                                        message: '请输入验证码'
                                    }],
                                })(
                                    <NTCountdownInput
                                        placeholder='请输入验证码'
                                        countdownSecond={60}
                                        startText='获取验证码'
                                        countdownText='秒后重新获取'
                                        onClick={this.send_verification_code}
                                        height='small'
                                    />
                                )}
                            </div>
                        </div>
                    </Card>
                </div>
                <FormItem style={{ textAlign: 'center', marginTop: 24 }}>
                    <Button type='primary' name='提交' htmlType='submit' style={{ marginRight: '8px' }}>确定</Button>
                    <Button onClick={() => { this.props.return_btn!(); }}>返回</Button>
                </FormItem>
            </Form>
        );
    }
}

/**
 * 控件：修改手机号码表单
 */
@addon('ModifyMobileForm', '修改手机号表单', '修改手机号控件')
@reactControl(Form.create<ModifyMobileFormControl>()(ModifyMobileForm))
export class ModifyMobileFormControl extends BaseUserInfoFormControl {
    /** 手机号码 */
    mobile?: string;
    /** 发送验证码 */
    send_verification_code?: any;
    /** 提交修改 */
    modify_mobile?: any;
    /** 返回按钮 */
    return_btn?: () => void;
    /**
     * 修改手机号码表单
     */
    constructor() {
        super();
    }
}

export default Form.create<ModifyMobileFormControl>()(ModifyMobileForm);