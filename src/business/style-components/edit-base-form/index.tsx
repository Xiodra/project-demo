import { reactControl, BaseReactElementControl } from "pao-aop-client";
import React from "react";
import { addon } from "pao-aop";

// 样式
import './index.less';
import { Card } from "antd";

/**
 * 组件：“编辑模板样式组件”状态
 */
export class EditBaseFrameState {
}

/**
 * 组件：编辑模板样式组件
 */
export class EditBaseFrame extends React.Component<EditBaseFrameControl, EditBaseFrameState> {
    render() {
        let { children, title, need_card } = this.props;
        return (
            need_card ?
                (
                    <Card title={title} bordered={false} style={{ margin: '20px 20px 0px 20px' }}>
                        {children}
                    </Card>
                )
                :
                (
                    <div>
                        {children}
                    </div>
                )
        );
    }
}

/**
 * 控件：“编辑模板样式组件”控制器
 * 描述 编辑模板样式组件控制器
 */
@addon('EditBaseFrame', '编辑模板样式组件', '编辑模板样式组件结构')
@reactControl(EditBaseFrame)
export class EditBaseFrameControl extends BaseReactElementControl {
    /**
     * 该卡片标题
     */
    title?: string;

    /**
     * 是否需要卡片包裹
     */
    need_card?: boolean = true;

    constructor() {
        super();
    }
}
