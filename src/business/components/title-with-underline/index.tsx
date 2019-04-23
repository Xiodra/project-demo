import { reactControl, BaseReactElementControl } from "pao-aop-client";
import React from "react";
import { addon } from "pao-aop";

// 样式
import './index.less';

/**
 * 组件：“标题（带下划线）”状态
 */
export interface TitleWithUnderlineState {
}

/**
 * 组件：标题（带下划线）
 * 描述
 */
export class TitleWithUnderline extends React.Component<TitleWithUnderlineControl, TitleWithUnderlineState> {
    render() {
        let { title, line_position, title_font_size, line_color, title_color } = this.props;

        let class_name = "line";

        if (line_position === "left") {
            class_name += "-left";
        } else {
            class_name += "-middle";
        }

        if (line_color === "blue") {
            class_name += "-blue";
        }

        return (
            <div className="nt-title-with-underline" style={{ position: "relative" }}>
                <h2
                    className={class_name}
                    style={
                        {
                            color: title_color,
                            fontSize: title_font_size
                        }
                    }
                >
                    {title}
                </h2>
            </div>
        );
    }
}

/**
 * 控件：“标题（带下划线）”控制器
 * 描述
 */
@addon('TitleWithUnderline', '标题（带下划线）', '标题（带下划线）视图结构')
@reactControl(TitleWithUnderline)
export class TitleWithUnderlineControl extends BaseReactElementControl {
    /**
     * 标题
     */
    title?: string;

    /**
     * 标题颜色
     */
    title_color?: "white" | "black" = "black";

    /**
     * 下划线位置
     */
    line_position: "left" | "middle" = "left";

    /**
     * 下划线颜色
     */
    line_color?: "deep_blue" | "blue" = "blue";

    /**
     * 标题字体大小
     */
    title_font_size?: string | number;

    constructor() {
        super();
    }
}