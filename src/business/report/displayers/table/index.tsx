import { reactControl } from "pao-aop-client";
import React from "react";
import { addon } from "pao-aop";
import { Table } from "antd";
import { TableTitleControl } from "src/business/components/table-title";
import { DisplayerState, BaseDisplayer, BaseDisplayerControl } from "src/business/report";

/**
 * 组件：表格状态
 */
export interface CurrencyTableState extends DisplayerState {
    data: any[];
}
/**
 * 组件：表格组建
 * 描述 用于显示表格
 */
export class CurrencyTable extends BaseDisplayer<CurrencyTableControl, CurrencyTableState> {
    constructor(props: CurrencyTableControl) {
        super(props);
        this.state = {
            data: []
        };
    }
    onSetData(dataView: DataView, data: any[]) {
        this.setState({
            data
        });
    }
    render() {
        const { titleControl } = this.props;
        titleControl!.dataLen = this.state.data;
        return (
            <Table
                title={() => this.props.titleControl!.createElement!()}
                columns={this.props.config}
                dataSource={this.state.data}
            />
        );
    }
}

/**
 * 列表配置
 */
export interface ColumnsConfig {
    /** 头部标题 */
    title: string;
    /** 对应字段 */
    dataIndex: string;
    /** 列表内容对齐方式 */
    align: 'left' | 'right' | 'center';
}
/**
 * 控件：表格控制器
 * 描述: 用来控制表格
 */
@addon('CurrencyTable', '表格配置', '表格')
@reactControl(CurrencyTable)
export class CurrencyTableControl extends BaseDisplayerControl {
    /**
     * 控件：表格控制器
     * @param config 表格列控制数组
     * @param titleControl 表格标题组件
     */
    constructor(public config?: ColumnsConfig[], public titleControl?: TableTitleControl) {
        super();
    }
}