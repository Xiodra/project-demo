
import React from "react";
import { BaseReactElementControl } from "pao-aop-client";
/**
 * 组件：登录视图底部状态
 * @param props 传入子控件
 */
export function LoginBottom(props: BaseReactElementControl) {
    return (
        <div style={{ display: 'flex', height: '40px', marginTop: '16px', justifyContent: 'space-between', alignItems: 'center', padding: '0 25px' }}>
            {props.children}
        </div>
    );
}