/** 用户分析大标题容器 */
import { BaseReactElementControl } from "pao-aop-client";
import React from "react";
export function ProprietorHeac(props: BaseReactElementControl) {
    return (
        <div style={{ width: '100%' }}>
            <div className="header-left">
                <img className='logo-font' src={require('src/business/report/layout/style/image/logo_font.png')} style={{ left: '90px' }} />
            </div>
            <div style={{ marginTop: '3%', paddingRight: '6%' }} className="header-right">
                {props.children}
                <div className="rightBg" />
            </div>
        </div>
    );
}