import { reactControl, BaseReactElementControl } from "pao-aop-client";
import React from "react";
import { addon } from "pao-aop";

// 样式
import './index.less';
import { Row } from "antd";

/**
 * 组件：“标题盒（标题+框）样式组件”状态
 */
export class TitleBoxState {
}

/**
 * 组件：标题盒（标题+框）样式组件
 */
export class TitleBox extends React.Component<TitleBoxControl, TitleBoxState> {
    render() {
        let { children, borrder, title } = this.props;
        return (
            (
                <Row className={"nt-title-box"} style={{ position: "relative" }}>
                    <div className="inputs-title">{title}</div>
                    <Row type={"flex"} gutter={30} style={borrder ? { border: "1px solid #CCC", padding: "24px" } : undefined}>
                        {children}
                    </Row>
                </Row>
            )
        );
    }
}

/**
 * 控件：“标题盒（标题+框）样式组件”控制器
 * 描述 标题盒（标题+框）样式组件控制器
 */
@addon('TitleBox', '标题盒（标题+框）样式组件', '标题盒（标题+框）样式组件结构')
@reactControl(TitleBox)
export class TitleBoxControl extends BaseReactElementControl {
    /**
     * 标题
     */
    title?: string;

    /**
     * 标题是否需要边框包裹
     */
    borrder?: boolean;

    constructor() {
        super();
    }
}
