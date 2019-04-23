/** 大标题容器 */
import { BaseReactElementControl } from "pao-aop-client";
import React from "react";
export function HeadLeftRight(props: BaseReactElementControl) {
    return (
        <div style={{ width: '100%' }}>
            <div className="header-left">
                <img className='header-left-bg' src={require('../../report/layout/style/image/top_left.png')} />
                <img className='logo-font' src={require('../../report/layout/style/image/logo_font.png')} />
            </div>
            <div className="header-right">
                {props.children}
                <div className="right-background">
                    <img src={require('../../report/layout/style/image/top_right.png')} />
                </div>
            </div>
        </div>
    );
}