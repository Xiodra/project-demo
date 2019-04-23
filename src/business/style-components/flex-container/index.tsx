import React from "react";
import { BaseReactElementControl } from "pao-aop-client";
/**
 * Block布局容器
 * @param props 传入子控件 display: 'flex', fontSize: '16px', justifyContent: 'center', alignItems: 'center'
 */
export function FlexContainer(props: BaseReactElementControl) {
    return (
        <div {...props} style={{ display: 'flex', fontSize: '16px', justifyContent: 'center', alignItems: 'center' }}>
            {props.children}
        </div>
    );
}