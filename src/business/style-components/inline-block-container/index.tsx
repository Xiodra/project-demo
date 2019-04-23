import React from "react";
import { BaseReactElementControl } from "pao-aop-client";
/**
 * Block布局容器
 * @param props 传入子控件 
 */
export function InLineBlockContainer(props: BaseReactElementControl) {
    return (
        <div {...props} style={{ display: 'inline-block', padding: '10px', textAlign: 'center' }}>
            {props.children}
        </div>
    );
}