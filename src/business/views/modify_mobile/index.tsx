import { ReactViewState, ReactView, reactControl, ReactViewControl, Authentication } from "pao-aop-client";
import React from "react";
import { addon, Ref, getObject, } from "pao-aop";
import ModifyMobileForm from "src/business/security/modify_mobile";
import { IUserService } from "src/business/models/user";
import { message } from "antd";

/**
 * 组件：修改手机号码视图控件状态
 */
export interface ModifyMobileViewState extends ReactViewState {
    /** 手机号码 */
    mobile?: string;
}

/**
 * 组件：修改手机号码视图控件
 */
export class ModifyMobileView extends ReactView<ModifyMobileViewControl, ModifyMobileViewState> {
    /** 初始化服务 */
    userService?() {
        return getObject(this.props.userService_Fac!);
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
    modify_mobile = (values: any) => {
        Authentication.loginService.bind_mobile!(values.new_mobile, values.identify_code)!
            .then((data: any) => {
                console.info(data);
                if (data === '绑定成功') {
                    message.info(data);
                    this.props.history!.push('/securitySettings');
                }
            })
            .catch(error => {
                // debugger;
                console.log(error);
            });
    }
    componentDidMount() {
        /** 获取当前用户 */
        this.userService!()!.get_current_user!()!
            .then((data: any) => {
                this.setState({
                    mobile: data[0].mobile
                });

            })
            .catch(error => {
                // debugger;
                console.log(error);
            });
    }
    render() {
        return (
            <ModifyMobileForm
                mobile={this.state.mobile}
                send_verification_code={this.send_verification_code}
                modify_mobile={this.modify_mobile}
                return_btn={() => { this.props.history!.push('/securitySettings'); }}
            />
        );
    }
}

/**
 * 控件：修改手机号码视图控件
 * @description 修改登录密码视图控件
 * @author
 */
@addon('ModifyMobileView', '修改手机号码视图控件', '修改手机号码视图控件')
@reactControl(ModifyMobileView, true)
export class ModifyMobileViewControl extends ReactViewControl {
    /** 用户服务 */
    public userService_Fac?: Ref<IUserService>;
}