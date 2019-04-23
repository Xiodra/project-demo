import { ReactViewState, ReactView, reactControl, ReactViewControl, Authentication } from "pao-aop-client";
import React from "react";
import { addon, Ref, getObject, } from "pao-aop";
import ModifyEmailForm from "src/business/security/modify_email";
import { IUserService } from "src/business/models/user";
import { message } from "antd";

/**
 * 组件：修改邮箱视图控件状态
 */
export interface ModifyEmailViewState extends ReactViewState {
    /** 邮箱账号 */
    email?: string;
}

/**
 * 组件：修改邮箱视图控件
 */
export class ModifyEmailView extends ReactView<ModifyEmailViewControl, ModifyEmailViewState> {
    /** 初始化服务 */
    userService?() {
        return getObject(this.props.userService_Fac!);
    }
    componentDidMount() {
        /** 获取当前用户 */
        this.userService!()!.get_current_user!()!
            .then((data: any) => {
                this.setState({
                    email: data[0].email
                });
            })
            .catch(error => {
                // debugger;
                console.log(error);
            });
    }
    send_verification_code(value: any) {
        Authentication.loginService.preprosess!('email', value)!
            .then((data: any) => {
                console.info(data);
            })
            .catch(error => {
                // debugger;
                console.log(error);
            });
    }
    modify_email = async (value: any) => {
        Authentication.loginService.modify_email!(value.new_email, value.identify_code)!
            .then((data: any) => {
                console.info(data);
                if (data === '绑定成功') {
                    message.info(data);
                    this.props.history!.push('/securitySettings');
                } else {
                    message.info(data);
                }
            })
            .catch(error => {
                // debugger;
                console.log(error);
            });

    }
    render() {
        return (
            <ModifyEmailForm
                email={this.state.email}
                send_verification_code={this.send_verification_code}
                modify_email={this.modify_email}
                return_btn={() => { this.props.history!.push('/securitySettings'); }}
            />
        );
    }
}

/**
 * 控件：修改邮箱视图控件
 * @description 修改邮箱视图控件
 * @author
 */
@addon('ModifyEmailView', '修改邮箱视图控件', '修改邮箱视图控件')
@reactControl(ModifyEmailView, true)
export class ModifyEmailViewControl extends ReactViewControl {
    /** 用户服务 */
    public userService_Fac?: Ref<IUserService>;
}