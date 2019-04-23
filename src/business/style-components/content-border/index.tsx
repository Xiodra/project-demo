
import { BaseReactElementControl } from "pao-aop-client";
import React from "react";
/** 容器边框 */
export function ContentBorder(props: BaseReactElementControl) {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div className="chart-widget-border-image" />
            <div className="chart-widget-border-bg pb20" >
                {props.children}
            </div>
        </div>
    );
}