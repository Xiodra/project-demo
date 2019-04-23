import { reactControl, BaseReactElementState, BaseReactElement, BaseReactElementControl } from "pao-aop-client";
import { Card, } from "antd";
import React from "react";

import { addon } from "pao-aop";
/**
 * 组件：安全设置对象
 */
export interface SecuritySettingState extends BaseReactElementState {
}
/**
 * 组件：安全设置控件
 */
export class SecuritySetting extends BaseReactElement<SecuritySettingControl, SecuritySettingState> {
    render() {
        return (
            <div>
                <Card title="安全设置" style={{ margin: '20px', }}>
                    <Card.Grid style={{ width: '100%' }}>
                        <div style={{ display: 'flex' }}>
                            <div style={{ flex: '1', }}>
                                <p>登录密码</p>
                            </div>
                            <div onClick={this.props.link_password!} style={{ lineHeight: '70px' }}>修改</div>
                        </div>
                    </Card.Grid>
                    <Card.Grid style={{ width: '100%' }}>
                        <div style={{ display: 'flex' }}>
                            <div style={{ flex: '1' }}>
                                <p>密保手机</p>
                                <p>已绑定收手机：{this.props.user_info.mobile ? this.props.user_info.mobile : ''}</p>
                            </div>
                            <div onClick={this.props.link_mobile!} style={{ lineHeight: '70px' }}>修改</div>
                        </div>
                    </Card.Grid>
                    <Card.Grid style={{ width: '100%' }}>
                        <div style={{ display: 'flex' }}>
                            <div style={{ flex: '1' }}>
                                <p>备用邮箱：</p>
                                <p>{this.props.user_info.email ? '已绑定邮箱：' + this.props.user_info.email : '未绑定邮箱'}</p>
                            </div>
                            <div onClick={this.props.link_eamil!} style={{ lineHeight: '70px' }}>{this.props.user_info.email ? '修改' : '绑定'}</div>
                        </div>
                    </Card.Grid>
                </Card>
            </div>
        );
    }
}

/**
 * 控件：安全设置
 * @description 安全设置
 * @author
 */
@addon('SecuritySetting', '安全设置控件', '安全设置控件')
@reactControl(SecuritySetting)
export class SecuritySettingControl extends BaseReactElementControl {
    /** 跳转修改登录密码 */
    link_password?: () => void;
    /** 跳转修改手机 */
    link_mobile?: () => void;
    /** 跳转修改邮箱 */
    link_eamil?: () => void;
    /** 用户详情 */
    user_info?: any;
    constructor() {
        super();
    }
}
