import React from "react";
import { BaseReactElementControl } from "pao-aop-client";
/**
 * 视图底部
 * @param props 传入子控件
 */
export function ViewBottom(props: BaseReactElementControl) {
    return (
        <div style={{ marginTop: '20px', display: 'flex', height: '23px', width: '100%' }}>
            {props.children}
        </div>
    );
}