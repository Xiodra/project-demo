import React from "react";
import { BaseReactElementControl, reactControl } from "pao-aop-client";
import { addon } from "pao-aop";
import { Col } from "antd";
import NTRow from "src/business/style-components/row";
import NTCol from "src/business/style-components/col";

/**
 * 组件：表格标题状态
 */
export class TableTitleState {
}

/**
 * 组件：表格标题
 * 描述 用来给表格的标题添加内容
 */
export class TableTitle extends React.Component<TableTitleControl, TableTitleState> {
    constructor(props: TableTitleControl) {
        super(props);
    }
    render() {
        const { titleLeft, titleRight, dataLen } = this.props;
        let zLIt;
        if (dataLen) {
            zLIt = dataLen.length.toString().padStart(4, '0').split('');
        } else {
            zLIt = '0'.toString().padStart(4, '0').split('');
        }

        let abnormalList = zLIt.map(function (value: any, key: any) {
            return <Col style={{ marginLeft: '10px', width: '9.33333%', }} className="screen-content" span={2} key={key}>{value}</Col>;
        });
        return (
            // <Row type="flex" justify="center" align="bottom" style={{ marginBottom: '20px' }}>
            <NTRow.NTBottomRow >
                {/* <Col className="table-title" span={6} style={{ textAlign: 'center' }}>{titleLeft}</Col> */}
                <NTCol.NTSituationColTableTitle>{titleLeft}</NTCol.NTSituationColTableTitle>
                {abnormalList}
                <NTCol.NTSituationColTableTitle>{titleRight}</NTCol.NTSituationColTableTitle>
                {/* <Col className="table-title" span={6} style={{ textAlign: 'center' }}>{titleRight}</Col> */}

            </NTRow.NTBottomRow>
            // </Row>
        );
    }
}

/**
 * 控件：表格标题控制器
 * 描述 用来控制表格标题
 */
@addon('TableTitle', '表格标题', '用来控制表格标题')
@reactControl(TableTitle)
export class TableTitleControl extends BaseReactElementControl {

    public dataLen?: any;

    /**
     * 控件：表格标题控制器
     * @param titleLeft 标题左边文字
     * @param titleRight 标题右边文字
     */
    constructor(
        public titleLeft?: string,
        public titleRight?: string) {
        super();
    }
}