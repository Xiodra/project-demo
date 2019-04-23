import React from "react";
import { BaseReactElementControl } from "pao-aop-client";
/**
 * 头像容器
 * @param props 传入子控件
 */
export function AvatarContainer(props: BaseReactElementControl) {
    return (
        <div style={{ height: '170px', textAlign: 'center', lineHeight: '210px', justifyContent: 'center', alignItems: 'center' }}>
            {props.children}
        </div>
    );
}