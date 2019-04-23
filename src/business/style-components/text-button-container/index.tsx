import React from "react";
import { BaseReactElementControl } from "pao-aop-client";
/**
 * 文本按钮容器
 * @param props 传入子控件
 */
export function TextButtonContainer(props: BaseReactElementControl) {
    return (
        <div style={{ justifyContent: 'center', textAlign: 'center' }}>
            {props.children}
        </div>
    );
}