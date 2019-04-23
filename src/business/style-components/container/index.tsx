import React from "react";
import { BaseReactElementControl } from "pao-aop-client";
/**
 * 容器
 * @param props 传入子控件 
 */
export function Container(props: BaseReactElementControl) {
    return (
        <div className={props.className!} style={{ display: 'flex', fontSize: '14px', flexDirection: 'column' }}>
            {props.children}
        </div>
    );
}