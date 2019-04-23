import React from "react";
import { BaseReactElementControl } from "pao-aop-client";
/**
 * 组件：表单标题
 * @param props 传入子控件
 */

export function FormTitle(props: BaseReactElementControl) {
    let divStyle = {
        display: 'flex',
        height: '40px',
        justifyContent: 'center',
        marginTop: '10px',
        alignItems: 'center',
        color: '#101010',
        fontSize: '20px',
    };
    return (
        <div style={divStyle}>
            {props.children}
        </div>
    );
}