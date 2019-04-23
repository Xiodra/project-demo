import { Row, Col } from "antd";
import React from "react";
import { addon } from "pao-aop";
import { DisplayerState, BaseDisplayer, BaseDisplayerControl } from "src/business/report";
import { reactControl, BaseReactElementControl } from "pao-aop-client";

/**
 * 组件：自定义图例详情组件状态
 */
export interface CustomLegendDisplayerState extends DisplayerState {
}

/**
 * 组件：自定义图例详情组件
 */
export class CustomLegendDisplayer extends BaseDisplayer<CustomLegendDisplayerControl, CustomLegendDisplayerState> {
    constructor(props: CustomLegendDisplayerControl) {
        super(props);
        this.state = { data: [] };
    }

    render() {
        // 控制两显示器的布局(响应布局)
        const { displayControl, legendControl, align, displayControlClassName, legendControlClassName } = this.props;
        let dir: any;
        switch (align) {
            case 'left':
                dir = 'row-reverse';
                break;
            case 'bottom':
                dir = 'column';
                break;
            case 'top':
                dir = 'column-reverse';
                break;
            case 'right':
            default:
                dir = 'row';
                break;
        }
        return (
            <Row type='flex' style={{ display: 'flex', flexDirection: dir, height: '100%' }}>
                <Col xs={14} sm={14} md={14} lg={14} xl={14} className={displayControlClassName}>
                    {displayControl!.createElement!()}
                </Col>
                <Col xs={10} sm={10} md={10} lg={10} xl={10} className={legendControlClassName}>
                    {legendControl!.createElement!()}
                </Col>
            </Row>
        );

    }

    onSetData(dataView: DataView, data?: any) {
        this.props.displayControl!.onSetData!(dataView, data);
    }
}

/**
 * 控件：自定义图例说明显示组件控制器
 * 自定义图例说明组件
 */
@addon('CustomLegendDisplayerControl', '自定义图例说明显示组件控制器', '自定义图例说明组件')
@reactControl(CustomLegendDisplayer)
export class CustomLegendDisplayerControl extends BaseDisplayerControl {
    /**  自定义图例显示组件对应布局位置 */
    align?: 'left' | 'right' | 'top' | 'bottom';
    /** 自定义图例显示组件自定义布局 */
    displayControlClassName?: string;
    /** 说明信息显示组件自定义布局 */
    legendControlClassName?: string;
    /**
     * 自定义图例说明显示组件控制器
     * @param  自定义图例显示组件控制器
     * @param  说明信息显示组件控制器
     */
    constructor(public displayControl?: BaseDisplayerControl, public legendControl?: BaseReactElementControl) {
        super();
    }
}