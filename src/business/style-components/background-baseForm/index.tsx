import { reactControl, BaseReactElementControl } from "pao-aop-client";
import React from "react";
import { addon } from "pao-aop";
import { Row, Button, Form, Input } from "antd";
import { BackgroundContent } from "../background-content/index";
import { FORM_ITEM_LAYOUT } from "src/business/components/commonVar";

/**
 * 组件：“官网后台-基本表单-基本框架”状态
 */
export class BackgroundBaseFormState {
}

/**
 * 组件：官网后台-基本表单-基本框架
 * 描述 官网后台-基本表单-基本框架控件
 */
export class BackgroundBaseForm extends React.Component<BackgroundBaseFormControl, BackgroundBaseFormState> {
    comeBack = () => {
        // window.history.back();
    }

    render() {
        let { formInfo, viewTitle, needCancel } = this.props;

        return (
            <BackgroundContent view_title={viewTitle} title_fontSize={"36px"}>
                <Form style={{ minWidth: "800px" }} >
                    {
                        formInfo ?
                            formInfo.map((e, i) =>
                                <Form.Item
                                    key={i}
                                    label={e.label}
                                    {...FORM_ITEM_LAYOUT}
                                >
                                    <Input />
                                </Form.Item>
                            )
                            :
                            null
                    }
                    <Row type="flex" style={{ flexDirection: "row-reverse" }}>
                        <Button type="primary" htmlType="submit">确认</Button>
                        {needCancel ? <Button type="primary" style={{ marginRight: "20px" }} onClick={this.comeBack}>返回</Button> : null}
                    </Row>
                </Form >
            </BackgroundContent>
        );
    }
}

/**
 * 控件：“官网后台-基本表单-基本框架”控制器
 * 描述 官网后台-基本表单-基本框架控制器
 */
@addon('BackgroundBaseForm', '官网后台-基本表单-基本框架', '官网后台-基本表单-基本框架结构')
@reactControl(BackgroundBaseForm)
export class BackgroundBaseFormControl extends BaseReactElementControl {
    /**
     * 视图标题
     */
    viewTitle: string;

    /**
     * 是否需要取消按钮
     */
    needCancel: boolean;

    /**
     * 表单基本信息
     */
    formInfo: {
        /**
         * 表单label标签
         */
        label: string;
    }[];

    constructor() {
        super();
    }
}