import React from "react";
import { reactControl, ReactViewState, ReactView, ReactViewControl, Authentication } from "pao-aop-client";
import { addon } from "pao-aop";
import './index.less';
import RetrievePasswordFrom from "src/business/security/retrieve-password";
import { message } from "antd";
import './index.less';
import { FormContent } from "src/business/style-components/form-content";
import { FormTitle } from "src/business/style-components/form-title";

/**
 * 组件：找回密码
 */
export interface RetrievePasswordState extends ReactViewState {
    /** 验证类型 */
    verify_type?: string;
}

/**
 * 组件：找回密码
 * 描述：找回密码
 */
export class RetrievePassword extends ReactView<RetrievePasswordControl, RetrievePasswordState> {
    constructor(props: RetrievePasswordControl) {
        super(props);
        this.state = {
            verify_type: 'mobile'
        };
    }
    send_verification_code = (value: any) => {
        Authentication.loginService.preprosess!(this.state.verify_type, value)!
            .then((data: any) => {
                console.info(data);
            })
            .catch(error => {
                // debugger;
                console.log(error);
            });
    }
    retrieve_password = async (values: any) => {
        if (values.newPassword !== values.alginNewPassword) {
            message.info('两次密码不一致');
            return;
        }
        Authentication.loginService.retrieve_password!(this.state.verify_type, values.target, values.newPassword, values.verify_code)!
            .then((data: any) => {
                if (data === '重设密码成功') {
                    message.info('重设密码成功');
                    this.props.history!.push('/Login');
                } else {
                    message.info(data);
                }
            })
            .catch(error => {
                // debugger;
                console.log(error);
            });

    }
    changeTarget = () => {
        this.state.verify_type === 'mobile' ?
            this.setState({
                verify_type: 'email'
            }) :
            this.setState({
                verify_type: 'mobile'
            });
    }
    render() {
        return (
            <FormContent>
                <FormTitle>找回密码</FormTitle>
                <RetrievePasswordFrom
                    send_verification_code={this.send_verification_code}
                    retrieve_password={this.retrieve_password}
                    verify_type={this.state.verify_type}
                    changeTarget={this.changeTarget}
                />
            </FormContent>
        );
    }
}

/**
 * 控件：找回密码
 * 描述 找回密码
 */
@addon('RetrievePassword', '找回密码', '找回密码')
@reactControl(RetrievePassword, true)
export class RetrievePasswordControl extends ReactViewControl {
    constructor() {
        super();
    }
}