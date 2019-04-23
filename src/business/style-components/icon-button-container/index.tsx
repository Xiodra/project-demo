import React from "react";
import { BaseReactElementControl } from "pao-aop-client";
/**
 * 按钮容器
 * @param props 传入子控件
 */
export function IconButtonContainer(props: BaseReactElementControl) {
    return (
        <div style={{ display: 'flex', height: '59px', justifyContent: 'center', alignItems: 'center' }}>
            {props.children}
        </div>
    );
}