import React from "react";
import { reactControl, ReactViewState, ReactView, ReactViewControl, Authentication, CookieUtil } from "pao-aop-client";
import { addon } from "pao-aop";
import './index.less';
import LoginForm, { RememberPassword } from "src/business/security/login/account";
import { LoginType } from "src/business/security";
import { message } from "antd";
import './index.less';
import { FormContent } from "src/business/style-components/form-content";
import { FormTitle } from "src/business/style-components/form-title";

/**
 * 组件：登录页面状态
 */
export interface LoginViewState extends ReactViewState {
    user_info?: RememberPassword;
}

/**
 * 组件：登录页面组件
 * 描述：登录页面组件
 */
export class LoginView extends ReactView<LoginViewControl, LoginViewState> {
    constructor(props: LoginViewControl) {
        super(props);
        this.onLogin = this.onLogin.bind(this);
    }
    /** 登录 */
    onLogin(LoginType: LoginType, data: any) {
        let loginData = JSON.stringify(data).replace(/"/g, "'");
        return Authentication.login(LoginType, loginData);

    }
    /** 登录成功 */
    onSuccess = (msg: any) => {
        if (msg.code === 1) {
            this.props.history!.push(this.props.home_path!);
        } else if (msg.code === 2) {
            this.props.history!.push(this.props.bind_phone_path!);
        } else if (msg.code === 3) {
            this.props.history!.push(this.props.modify_password_path!);
        } else {
            message.info(msg.msg);
        }
    }
    /** 登录失败 */
    onFail(err: any) {
        console.info(err);
    }
    /** 找回密码 */
    retrieve_password = () => {
        this.props.history!.push(this.props.retrieve_password!);
    }
    /** 记住密码 */
    onRemember = (value: RememberPassword) => {
        if (value.remember) {
            let date = new Date();
            date.setDate(date.getDate() + 1);
            CookieUtil.save("__user_password__", value, { expires: date });
        } else {
            CookieUtil.remove("__user_password__");
        }
    }
    componentDidMount() {
        if (CookieUtil.read("__user_password__") !== undefined) {
            this.setState({
                user_info: CookieUtil.read("__user_password__")
            });
        }

    }
    render() {
        return (
            <FormContent>
                <FormTitle>登录</FormTitle>
                <LoginForm
                    onLogin={this.onLogin}
                    onSuccess={this.onSuccess}
                    onFail={this.onFail}
                    retrieve_password={this.retrieve_password}
                    onRemember={this.onRemember}
                    user_info={this.state.user_info}
                />
            </FormContent>
        );
    }
}

/**
 * 控件：登录页面组件制器
 * 描述 登录页面组件
 */
@addon('Login', '登录页面', '登录页面组件')
@reactControl(LoginView, true)
export class LoginViewControl extends ReactViewControl {
    /** 首页path */
    home_path?: string;
    /** 手机绑定页 */
    bind_phone_path?: string;
    /** 密码更改页 */
    modify_password_path?: string;
    /** 找回密码页 */
    retrieve_password?: string;
    constructor() {
        super();
    }
}