import React from "react";
import { reactControl } from "pao-aop-client";
import { addon } from "pao-aop";
import { Col, Row } from "antd";
import '../number-display/index.less';
import { DisplayerState, BaseDisplayer, BaseDisplayerControl } from "src/business/report";
/**
 * 组件：数值显示状态
 */

export interface NumberDisplayState extends DisplayerState {
    // 数字字符串数组
    numStr: string[];
}

/**
 * 组件：数值显示标题
 * 描述 用来给数值显示添加内容
 */
export class NumberDisplay extends BaseDisplayer<NumberDisplayControl, NumberDisplayState> {
    constructor(props: NumberDisplayControl) {
        super(props);
        this.state = {
            numStr: [],
            data: []
        };
    }
    onSetData(_: DataView, datas?: any) {
        let { fieldName, len } = this.props, numStr: string[] = [];
        if (!datas || datas.length === 0) {
            numStr = '0'.toString().padStart(len!, '0').split('');
        } else {
            numStr = datas[0][fieldName!].toString().padStart(len, '0').split('');
        }
        this.setState({ numStr });
    }
    render() {
        let { title, unit } = this.props;
        return (
            <div className="number-content">
                <div className="num-tilte-contene"><span className="screen-title">{title}</span></div>
                <div className="num-unit">{unit}</div>
                <Row type="flex" justify="center" align="bottom" className="unm-row">
                    {
                        this.state.numStr.map(function (value: any, key: any) {
                            return <Col className="screen-content res-col" span={2} key={key}>{value}</Col>;
                        })
                    }
                </Row>
            </div>

        );
    }
}

/**
 * 控件：数值显示控制器
 * 描述 用来控制数值显示
 */
@addon('NumberDisplay', '电流值', '用来控制电流值')
@reactControl(NumberDisplay)
export class NumberDisplayControl extends BaseDisplayerControl {
    /**
     * 控件：数值显示控件
     * @param id 控件id
     * @param title 标题
     * @param unit 单位
     * @param len 显示的长度
     * @param fieldName 数据源字段名称
     */
    constructor(id?: string, public title?: string, public unit?: string, public len?: number, public fieldName?: string) {
        super(id);
    }
}