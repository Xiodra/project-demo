import React from "react";
import { addon } from "pao-aop";
import { Skeleton, Col } from "antd";
import { reactControl, BaseReactElementControl } from "pao-aop-client";
import { BaseLayoutControl } from "src/business/report/layout";
import NTRow from "src/business/style-components/row";
import NTCol from "src/business/style-components/col";

/**
 * 组件：胎压历史数据布局控件analysis-chart
 */
export class TireHistoryDataLayout extends React.Component<TireHistoryDataLayoutControl, { time: string }> {
    interval?: any;
    constructor(props: any) {
        super(props);
    }
    render() {
        const { childControls } = this.props;
        return (
            !childControls ?
                null :
                (
                    // <Row type="flex" gutter={24} style={{ flex: 1, marginLeft: 0, marginRight: 0, flexDirection: 'column' }}>
                    <NTRow.NTColumnRow>
                        // <Col className="col-border-none" style={{ flex: 1, margin: '12px 0', minHeight: 400, textAlign: 'center' }}>
                        <NTCol.NTSituationColBorderNone>
                            {
                                childControls[0] ? childControls[0].createElement!() : <Skeleton />
                            }
                        </NTCol.NTSituationColBorderNone>
                            
                        // </Col>
                        // <Col className="col-border-none" style={{ flex: 1, margin: '12px 0', minHeight: 400, textAlign: 'center' }}>
                        <NTCol.NTSituationColBorderNone>
                            {
                                childControls[1] ? childControls[1].createElement!() : <Skeleton />
                            }
                        </NTCol.NTSituationColBorderNone>
                           
                        // </Col>
                    </NTRow.NTColumnRow>
                )
        );
    }
}
/**
 * 控件：胎压历史数据布局控件
 */
@addon('TireHistoryDataLayoutControl', '胎压历史数据布局控件', '用于胎压历史数据布局的控件')
@reactControl(TireHistoryDataLayout)
export class TireHistoryDataLayoutControl extends BaseLayoutControl {
    /**
     * 控件：胎压历史数据布局控件
     * @param childControls 子控件列表
     */
    constructor(childControls?: BaseReactElementControl[]) {
        super(childControls);
    }
}