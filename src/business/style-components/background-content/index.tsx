import { reactControl, BaseReactElementControl } from "pao-aop-client";
import React from "react";
import { addon } from "pao-aop";

// 样式
import './index.less';
import { TitleWithUnderline } from "src/business/components/title-with-underline";

/**
 * 组件：后台管理视图基本外围框状态
 */
export class BackgroundContentState {
}

/**
 * 组件：后台管理视图基本外围框
 * 描述
 */
export class BackgroundContent extends React.Component<BackgroundContentControl, BackgroundContentState> {
    render() {
        let { view_title, title_fontSize } = this.props;
        return (
            <div>
                <TitleWithUnderline title={view_title} line_position={"left"} title_font_size={title_fontSize} />
                <div className="nt-background-content">
                    {
                        this.props.children
                    }
                </div>
            </div>
        );
    }
}

/**
 * 控件：“后台管理视图基本外围框”控制器
 * 描述
 */
@addon('BackgroundContent', '后台管理视图基本外围框', '后台管理视图基本外围框视图结构')
@reactControl(BackgroundContent)
export class BackgroundContentControl extends BaseReactElementControl {

    /**
     * 视图标题
     */
    view_title?: string;

    /**
     * 视图标题字体大小
     */
    title_fontSize: string | number | undefined;

    constructor() {
        super();
    }
}