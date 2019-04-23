import React from "react";
import { reactControl, ReactViewState, ReactView, ReactViewControl, Authentication } from "pao-aop-client";
import { addon } from "pao-aop";
import './index.less';
import PhoneBindFrom from "src/business/security/phone-bind";
import { message } from "antd";
import './index.less';
import { FormContent } from "src/business/style-components/form-content";
import { FormTitle } from "src/business/style-components/form-title";

/**
 * 组件：绑定手机组件
 */
export interface BindPhoneState extends ReactViewState {
}

/**
 * 组件：绑定手机组件
 * 描述：绑定手机组件
 */
export class BindPhone extends ReactView<BindPhoneControl, BindPhoneState> {
    constructor(props: BindPhoneControl) {
        super(props);
    }
    phone_bind_onClick = (err: any, value: any) => {
        Authentication.loginService.bind_mobile!(value.mobile, value.identify_code)!
            .then((data: any) => {
                console.info(data);
                if (data === '绑定成功') {
                    message.info('绑定成功');
                    this.props.history!.push(this.props.link_url!);
                }
            })
            .catch(error => {
                // debugger;
                console.log(error);
            });

    }
    send_verification_code(value: any) {
        Authentication.loginService.preprosess!('mobile', value)!
            .then((data: any) => {
                console.info(data);
            })
            .catch(error => {
                // debugger;
                console.log(error);
            });
    }
    componentDidMount() {
        message.info('登录成功，首次登录请绑定手机号码');
    }
    render() {
        return (
            <FormContent>
                <FormTitle>绑定手机号码</FormTitle>
                <PhoneBindFrom phone_bind_onClick={this.phone_bind_onClick} send_verification_code={this.send_verification_code} />
            </FormContent>
        );
    }
}

/**
 * 控件：绑定手机组件件制器
 * 描述 绑定手机组件
 */
@addon('BindPhone', '绑定手机组件', '绑定手机组件')
@reactControl(BindPhone, true)
export class BindPhoneControl extends ReactViewControl {
    /** 绑定成功后跳转的页面 */
    public link_url?: string;
    constructor() {
        super();
    }
}