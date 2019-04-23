import { reactControl, BaseReactElementState } from "pao-aop-client";
import { Card, Steps, Button, message, Form } from "antd";
import React from "react";
import { addon } from "pao-aop";
import './index.less';
import { NTCountdownInput } from "src/business/components/countdown-input";
import { NTInput } from "src/business/components/input";
import { BaseUserInfoForm, BaseUserInfoFormControl } from "../base";
const FormItem = Form.Item;

const Step = Steps.Step;
/**
 * 组件：修改密码组件状态对象
 */
export interface ModifyLoginPasswordState extends BaseReactElementState {
    /** 步骤 */
    current: number;
    /** 验证码 */
    verify_code?: string;
    /** 新密码1 */
    new_password1?: string;
    /** 新密码2 */
    new_password2?: string;
    /** 验证类型 */
    target_type?: string;
    /** 验证目标 */
    target?: string;

}
/**
 * 组件：修改密码控件
 */
export class ModifyLoginPassword extends BaseUserInfoForm<ModifyLoginPasswordControl, ModifyLoginPasswordState> {
    constructor(props: ModifyLoginPasswordControl) {
        super(props);
        this.state = {
            current: 0,
            verify_code: '',
            new_password1: '',
            new_password2: '',
            target: '',
            target_type: 'mobile'
        };
    }
    async next() {
        if (this.state.current === 0) {
            if (this.state.verify_code === '') {
                message.info('请输入验证码');
                return;
            }
            let isYes = await this.props.cheak(this.state.target_type, this.state.target_type === 'mobile' ? this.props.mobile : this.props.email, this.state.verify_code);
            if (!isYes) {
                message.info('验证码错误');
                return;
            }
        } else if (this.state.current === 1) {
            if (this.state.new_password1 === '' || this.state.new_password2 === '') {
                message.info('请输入新密码');
                return;
            } else if (this.state.new_password1 !== this.state.new_password2) {
                message.info('两次密码不一致');
                return;
            }
            if (!this.props.modify_password(this.state.new_password1)) {
                return;
            }
        } else if (this.state.current === 2) {
            this.props.ok_btn!();
        }

        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    identify_code_change = (e: any) => {
        this.setState({
            verify_code: e.target.value
        });
    }
    new_password1_change = (e: any) => {
        this.setState({
            new_password1: e.target.value
        });
    }
    new_password2_change = (e: any) => {
        this.setState({
            new_password2: e.target.value
        });
    }
    changeTarget = () => {
        if (this.state.target_type === 'mobile') {
            this.setState({
                target_type: 'email'
            });
        } else {
            this.setState({
                target_type: 'mobile'
            });
        }

    }
    send_verification_code = () => {
        if (this.state.target_type === 'mobile') {
            this.props.send_verification_code(this.state.target_type, this.props.mobile);
        } else if (this.state.target_type === 'email') {
            if (this.props.email === '') {
                message.info('请先绑定邮箱');
                return;
            }
            this.props.send_verification_code(this.state.target_type, this.props.email);
        }

    }
    handleSubmit = (e: any) => {
        e.preventDefault();
        const { form, } = this.props;
        form!.validateFields((err: Error, values: any) => {
            if (!err) {
                if (values.password !== values.password2) {
                    message.info('两次密码不一致');
                    return;
                }
                if (!this.props.modify_password(values.password)) {
                    return;
                }
                const current = this.state.current + 1;
                this.setState({ current });
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form!;
        const { current } = this.state;
        const { mobile, email } = this.props;
        let dom1 = (
            <div>
                {
                    this.state.target_type === 'mobile' ? (<div>
                        <span style={{ marginRight: '12px', color: '#333333', fontSize: '24px' }}>手机验证码验证</span>
                        <span style={{ marginRight: '12px', color: '#333333', fontSize: '14px' }}>为确认是你本人操作，请完成以下验证</span>
                        {this.props.email !== '' ? <span style={{ marginRight: '12px', color: '#77669E', fontSize: '14px' }} onClick={this.changeTarget}>更改邮箱验证方式》</span> : ''}
                        <div style={{ width: '100%', height: '30px', marginTop: '20px' }}>
                            <div style={{ fontSize: '14px', float: 'left', width: '100px', textAlign: 'right' }}>手机号码：</div>
                            <div style={{ position: 'relative', float: 'left', marginLeft: 20, }}>{mobile}</div>
                        </div>
                    </div>) : (<div>
                        <span style={{ marginRight: '12px', color: '#333333', fontSize: '24px' }}>邮箱验证码验证</span>
                        <span style={{ marginRight: '12px', color: '#333333', fontSize: '14px' }}>为确认是你本人操作，请完成以下验证</span>
                        <span style={{ marginRight: '12px', color: '#77669E', fontSize: '14px' }} onClick={this.changeTarget}>更改手机验证方式》</span>
                        <div style={{ width: '100%', height: '30px', marginTop: '20px' }}>
                            <div style={{ fontSize: '14px', float: 'left', width: '100px', textAlign: 'right' }}>电子邮箱：</div>
                            <div style={{ position: 'relative', float: 'left', marginLeft: 20, }}>{email ? email : ''}</div>
                        </div>
                    </div>)
                }
                <div style={{ width: '100%', height: '30px' }}>
                    <div style={{ fontSize: '14px', float: 'left', marginTop: '22px', width: '100px', textAlign: 'right' }}>验证码：</div>
                    <div style={{ position: 'relative', float: 'left', width: '350px' }}>
                        <NTCountdownInput
                            inputPlaceholder='请输入验证码'
                            countdownSecond={60}
                            startText='获取验证码'
                            countdownText='秒后重新获取'
                            onChange={this.identify_code_change}
                            onClick={this.send_verification_code}
                            height='small'
                        />
                    </div>
                </div>
            </div>
        );
        let dom2 = (
            <div>
                <div style={{ width: '100%', height: '50px' }}>
                    <div style={{ fontSize: '14px', float: 'left', marginTop: '22px', width: '100px', textAlign: 'right' }}>新密码：</div>
                    <div style={{ position: 'relative', float: 'left', width: '350px' }}>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true,
                                    validator: this.checkContact
                                }],
                                initialValue: ''
                            })(
                                <NTInput inputType='lock' onChange={this.new_password1_change} height='small' />
                            )}
                        </FormItem>
                    </div>
                </div>
                <div style={{ float: 'left', width: '100%', height: '30px' }}>
                    <div style={{ fontSize: '14px', float: 'left', marginTop: '22px', width: '100px', textAlign: 'right' }}>确认新密码：</div>
                    <div style={{ position: 'relative', float: 'left', width: '350px' }}>

                        <FormItem>
                            {getFieldDecorator('password2', {
                                rules: [{
                                    required: true,
                                    validator: this.checkContact
                                }],
                                initialValue: ''
                            })(
                                <NTInput inputType='lock' onChange={this.new_password2_change} height='small' />
                            )}
                        </FormItem>
                    </div>
                </div>
            </div>
        );
        let dom3 = (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <span>修改成功，请牢记新的登录密码</span>
            </div>
        );
        let steps = [{
            title: '验证身份',
            content: dom1,
        }, {
            title: '修改密码',
            content: dom2,
        }, {
            title: '完成',
            content: dom3,
        }];
        return (
            <Card title="修改密码" style={{ margin: '20px', }}>
                <Form onSubmit={this.handleSubmit}>
                    <Steps current={current}>
                        {steps.map(item => <Step key={item.title} title={item.title} />)}
                    </Steps>
                    <div className="steps-content">{steps[current].content}</div>
                    <div className="steps-action">
                        {
                            current === 0
                            && <Button type="primary" onClick={() => this.next()}>下一步</Button>
                        }
                        {
                            current === 1
                            && <Button type="primary" htmlType='submit' >确定</Button>

                        }
                        {
                            current === steps.length - 1
                            && <Button type="primary" onClick={() => this.next()}>完成</Button>
                        }
                        {
                            current > 0
                            && (
                                <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                                    返回
                                    </Button>
                            )
                        }
                    </div>
                </Form>
            </Card>
        );
    }
}

/**
 * 控件：修改密码
 * @description 修改密码
 * @author
 */
@addon('ModifyLoginPassword', '修改密码控件', '修改密码控件')
@reactControl(Form.create<ModifyLoginPasswordControl>()(ModifyLoginPassword))
export class ModifyLoginPasswordControl extends BaseUserInfoFormControl {
    /** 发送验证码按钮 */
    public send_verification_code?: any;
    /** 验证身份 */
    public cheak?: any;
    /** 修改新密码 */
    public modify_password?: any;
    /** 手机号码 */
    public mobile?: string;
    /** 邮箱 */
    public email?: string;
    /** 完成按钮 */
    public ok_btn?: () => void;
    constructor() {
        super();
    }
}

export default Form.create<ModifyLoginPasswordControl>()(ModifyLoginPassword);
