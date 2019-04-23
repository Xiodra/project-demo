import React from "react";
import { BaseReactElementControl } from "pao-aop-client";
/**
 * Block布局容器
 * @param props 传入子控件 
 */
export function BlockContainer(props: BaseReactElementControl) {
    return (
        <div {...props} style={{ display: "block", paddingLeft: '10px', paddingRight: '10px', cursor: 'pointer' }}>
            {props.children}
        </div>
    );
}