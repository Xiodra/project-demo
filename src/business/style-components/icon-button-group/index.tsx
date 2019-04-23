import React from "react";
import { BaseReactElementControl } from "pao-aop-client";
/**
 * 图标按钮组
 * @param props 传入子控件
 */
export function IconButtonGroup(props: BaseReactElementControl) {
    return (
        <div style={{ flex: 1, justifyContent: 'center', textAlign: 'center' }}>
            {props.children}
        </div>
    );
}