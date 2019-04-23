import { ReactViewState, ReactView, reactControl, ReactViewControl, Authentication } from "pao-aop-client";
import React from "react";
import { addon, Ref, getObject, } from "pao-aop";
import ModifyLoginPassword from "src/business/security/modify-login-password";
import { IUserService } from "src/business/models/user";

/**
 * 组件：修改登录密码视图控件状态
 */
export interface ModifyLoginPasswordViewState extends ReactViewState {
    /** 手机号码 */
    mobile?: string;
    /** email */
    email: string;
}

/**
 * 组件：修改登录密码视图控件
 */
export class ModifyLoginPasswordView extends ReactView<ModifyLoginPasswordViewControl, ModifyLoginPasswordViewState> {
    /** 初始化服务 */
    userService?() {
        return getObject(this.props.userService_Fac!);
    }
    componentDidMount() {
        /** 获取当前用户 */
        this.userService!()!.get_current_user!()!
            .then((data: any) => {
                this.setState({
                    mobile: data[0].mobile,
                    email: data[0].email
                });

            })
            .catch(error => {
                // debugger;
                console.log(error);
            });
    }
    /** 发送验证码 */
    send_verification_code(target_type: string, verify_code: string) {
        Authentication.loginService.preprosess!(target_type, verify_code)!
            .then((data: any) => {
                console.info(data);
            })
            .catch(error => {
                // debugger;
                console.log(error);
            });

    }
    /** 验证 */
    async check(target_type: any, target: any, verify_code: any) {
        const result = await Authentication.loginService.check!(target, target_type, verify_code);
        return result;
    }
    /** 修改密码 */
    async modify_password(new_password: any) {
        const result = await Authentication.loginService.modify_password!(new_password)!;
        return result;

    }
    render() {
        return (
            <ModifyLoginPassword
                send_verification_code={this.send_verification_code}
                cheak={this.check}
                modify_password={this.modify_password}
                mobile={this.state.mobile}
                email={this.state.email}
                ok_btn={() => { this.props.history!.push('/statistical-analysis'); }}
            />
        );
    }
}

/**
 * 控件：修改登录密码视图控件
 * @description 修改登录密码视图控件
 * @author
 */
@addon('ModifyLoginPasswordView', '安全设置视图控件', '安全设置视图控件')
@reactControl(ModifyLoginPasswordView, true)
export class ModifyLoginPasswordViewControl extends ReactViewControl {
    /** 用户服务 */
    public userService_Fac?: Ref<IUserService>;
}