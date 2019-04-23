import React from "react";
import { BaseReactElementControl } from "pao-aop-client";
/**
 * 边距容器
 * @param props 传入子控件 marginLeft: "15px", marginTop: '10px'
 */
export function MaginContainer(props: BaseReactElementControl) {
    return (
        <div {...props} style={{ marginLeft: "15px", marginTop: '10px' }}>
            {props.children}
        </div>
    );
}