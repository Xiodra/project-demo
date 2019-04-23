import * as React from "react";
import { Form, Card, message, Button } from "antd";
import { BaseUserInfoForm, BaseUserInfoFormControl } from "../base";
import { addon } from "pao-aop";
import { reactControl } from "pao-aop-client";
import { NTInput } from "src/business/components/input";
import { NTCountdownInput } from "src/business/components/countdown-input";
const FormItem = Form.Item;
/** 表单值 */
export interface ModifyEmailValues {
    /** 新邮箱号码 */
    new_email?: string;
    /** 验证码 */
    identify_code?: string;
}

/**
 * 组件：修改邮箱表单
 */
export class ModifyEmailForm extends BaseUserInfoForm<ModifyEmailFormControl, {}> {
    submitButtonRef?: any;
    constructor(props: ModifyEmailFormControl) {
        super(props);
        this.submitButtonRef = React.createRef();
    }
    handleSubmit = (e: any) => {
        e.preventDefault();
        const { form, } = this.props;
        form!.validateFields((err: Error, values: ModifyEmailValues) => {
            if (!err) {
                this.props.modify_email(values);
            }
        });
    }
    send_verification_code = () => {
        const { form, send_verification_code } = this.props;
        form!.validateFields((err: Error, values: ModifyEmailValues) => {
            if (!(typeof (values.new_email) === "undefined" && err)) {
                send_verification_code!(values.new_email!)!;
            } else {
                message.info('请输入邮箱账户');
                return;
            }

        });
    }
    render() {
        const { getFieldDecorator } = this.props.form!;
        return (

            <Form onSubmit={this.handleSubmit} className={'security_form'}>
                <div>
                    <Card title={this.props.email ? "修改邮箱账号" : "绑定邮箱账号"} style={{ height: 430, margin: 36, }}>
                        {this.props.email ? <div>跟换邮箱账号后，下次登录可使用新邮箱账号登录，当前邮箱账号：{this.props.email}</div> : ""}
                        <div style={{ width: '100%', height: '50px', marginTop: '10px', paddingLeft: '30px' }}>
                            <div style={{ fontSize: '14px', float: 'left', marginTop: '22px', width: '100px', textAlign: 'right' }}>{this.props.email ? "新邮箱账号：" : "邮箱账号："}</div>
                            <div style={{ position: 'relative', float: 'left', width: '350px' }}>
                                {getFieldDecorator('new_email', {
                                    initialValue: '',
                                    rules: [{
                                        required: true,
                                        message: '请输入新邮箱账号'
                                    }],
                                })(
                                    <NTInput placeholder='请输入新邮箱账号' height='small' />
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
 * 控件：修改邮箱表单
 */
@addon('ModifyEmailForm', '修改邮箱表单', '修改邮箱控件')
@reactControl(Form.create<ModifyEmailFormControl>()(ModifyEmailForm))
export class ModifyEmailFormControl extends BaseUserInfoFormControl {
    /** 邮箱账号 */
    email?: string;
    /** 发送验证码 */
    send_verification_code?: (value: string) => void;
    /** 提交 */
    modify_email?: any;
    /** 返回按钮 */
    return_btn?: () => void;
    /**
     * 修改邮箱表单
     */
    constructor() {
        super();
    }
}

export default Form.create<ModifyEmailFormControl>()(ModifyEmailForm);