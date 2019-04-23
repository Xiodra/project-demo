import React from "react";
import { BaseReactElementControl } from "pao-aop-client";
import { Row } from "antd";
/**
 * 首页-关于-基本框架
 * @param props 传入子控件
 */
export function AboutFrame(props: BaseReactElementControl) {
    return (
        <Row type="flex" style={{ flexDirection: "column", alignItems: "center" }}>
            <div
                style={
                    {
                        display: "flex",
                        flexDirection: "column",
                        width: "1200px",
                    }
                }
            >
                {props.children}
            </div>
        </Row>

    );
}