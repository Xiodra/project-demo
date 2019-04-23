import { ReactViewState, ReactView, reactControl, ReactViewControl } from "pao-aop-client";
import React from "react";
import { addon, Ref, getObject, } from "pao-aop";
import { SecuritySetting } from "src/business/components/security-setting";
import { IUserService } from "src/business/models/user";
import './index.less';
/**
 * 组件：安全设置视图控件状态
 */
export interface SecuritySettingsViewState extends ReactViewState {
    /** 用户详情 */
    user_info?: any;
}

/**
 * 组件：安全设置视图控件
 */
export class SecuritySettingsView extends ReactView<SecuritySettingsViewControl, SecuritySettingsViewState> {
    constructor(props: SecuritySettingsViewControl) {
        super(props);
        this.state = {
            user_info: {
                mobile: '',
                email: '',
            }
        };
    }
    /** 初始化服务 */
    userService?() {
        return getObject(this.props.userService_Fac!);
    }
    componentDidMount() {
        /** 获取当前用户 */
        this.userService!()!.get_current_user!()!
            .then((data: any) => {
                this.setState({
                    user_info: data[0]
                });
            })
            .catch(error => {
                // debugger;
                console.log(error);
            });
    }
    link_password = () => {
        this.props.history!.push(this.props.modify_password!);
    }
    link_mobile = () => {
        this.props.history!.push(this.props.modify_mobile!);
    }
    link_eamil = () => {
        this.props.history!.push(this.props.modify_email!);
    }
    render() {
        return (
            <SecuritySetting
                link_password={this.link_password}
                link_mobile={this.link_mobile}
                link_eamil={this.link_eamil}
                user_info={this.state.user_info}
            />
        );
    }
}

/**
 * 控件：安全设置视图控件
 * @description 控制安全设置视图控件
 * @author
 */
@addon('PersonalSettingsView', '安全设置视图控件', '安全设置视图控件')
@reactControl(SecuritySettingsView, true)
export class SecuritySettingsViewControl extends ReactViewControl {
    /** 用户服务 */
    public userService_Fac?: Ref<IUserService>;
    /** 修改密码页面 */
    public modify_password?: string;
    /** 修改绑定手机页面 */
    public modify_mobile?: string;
    /** 修改邮箱页面 */
    public modify_email?: string;
}