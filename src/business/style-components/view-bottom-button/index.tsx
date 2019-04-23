import React from "react";
import { BaseReactElementControl } from "pao-aop-client";
/**
 * 视图底部按钮容器
 * @param props 传入子控件
 */
export function ViewBottomButtom(props: BaseReactElementControl) {
    return (
        <div style={{ flex: 1, textAlign: 'center' }}>
            {props.children}
        </div>
    );
}