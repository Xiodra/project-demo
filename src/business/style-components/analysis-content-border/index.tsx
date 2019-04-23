
import { BaseReactElementControl } from "pao-aop-client";
import React from "react";
/** 分析页面容器边框 */
export function AnalysisContentBorder(props: BaseReactElementControl) {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div className="chart-widget-border-image" />
            <div className="chart-widget-border-bg rest-height-width">
                {props.children}
            </div>
        </div>
    );
}