/*
 * 版权：Copyright (c) 2019 红网
 * 
 * 创建日期：Wednesday January 9th 2019
 * 创建者：杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 修改日期: Wednesday, 9th January 2019 2:26:06 pm
 * 修改者: 杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 说明
 * 		1、操作表格控件
 */

import { BaseReactElementState, BaseReactElement, reactControl, BaseReactElementControl, CommonIcon } from "pao-aop-client";

import React from "react";

import { addon } from "pao-aop";
import { Table, Icon, Button, Modal, LocaleProvider } from "antd";
import './index.less';
import { ColumnProps } from "antd/lib/table";
import zhCN from 'antd/lib/locale-provider/zh_CN';

/**
 * 组件：操作表格控件状态
 */
export interface NTOperationTableState extends BaseReactElementState {
    dowmIsHidden?: string;
    upIsHidden?: string;
    /** 是否显示提示框 */
    visible?: boolean;
    /** 暂存数据 */
    data?: any;
    /** 当前页 */
    current_page?: number;
    /** 总页数 */
    total_pages?: number;
}

/**
 * 组件：操作表格控件
 */
export class NTOperationTable extends BaseReactElement<NTOperationTableControl, NTOperationTableState> {
    constructor(props: NTOperationTableControl) {
        super(props);
        let { on_click_del, other_label_type, columns_data_source, is_hidden } = this.props;
        if (on_click_del || other_label_type) {
            if (is_hidden === 'none') {
                this.state = { dowmIsHidden: 'inline', upIsHidden: 'none' };
            }
            if (columns_data_source) {
                const obj = columns_data_source![columns_data_source!.length - 1];
                if (obj) {
                    if (obj['key'] !== 'action' && obj['title'] !== '操作') {
                        columns_data_source!.push({
                            title: '操作',
                            key: 'action',
                            width: 80,
                            render: (text: string, record: any) => (
                                <span>
                                    {
                                        // 需要隐藏按钮
                                        is_hidden === 'none' ?
                                            <span style={{ marginRight: '10px', cursor: 'pointer' }}>
                                                <div style={{ display: this.state.dowmIsHidden }}>
                                                    <Icon type='down' onClick={this.changeDisplay} />
                                                </div>
                                                <div style={{ display: this.state.upIsHidden }}>
                                                    <Icon type='up' onClick={this.changeDisplay} />
                                                </div>
                                            </span>
                                            : ''
                                    }
                                    {
                                        other_label_type ?
                                            other_label_type!.map((row: LabelType, index) => {
                                                let { ...react } = row.label_parameter;
                                                if (row.type === 'icon') {
                                                    return (
                                                        <CommonIcon style={{ marginRight: '10px', cursor: 'pointer', display: this.state.upIsHidden }} key={index} onClick={() => { this.onClickOther(row.label_key!, record); }} {...react} />
                                                    );
                                                }
                                                if (row.type === 'button') {
                                                    return (
                                                        <Button style={{ marginRight: '10px', cursor: 'pointer', display: this.state.upIsHidden }} key={index} onClick={() => { this.onClickOther(row.label_key!, record); }} {...react} >{row.label_text}</Button>
                                                    );
                                                }
                                                if (row.type === 'link') {
                                                    return (
                                                        <a style={{ marginRight: '10px', cursor: 'pointer', display: this.state.upIsHidden }} key={index} onClick={() => { this.onClickOther(row.label_key!, record); }} {...react} >{row.label_text}</a>
                                                    );
                                                } else {
                                                    return '';
                                                }
                                            })
                                            : ''
                                    }
                                    {
                                        on_click_del ?
                                            <Icon style={{ cursor: 'pointer' }} type="delete" onClick={() => { this.onClickDel(record); }} />
                                            : ''
                                    }
                                </span>
                            ),
                        });
                    }
                }
            }
        }
    }
    changeDisplay = () => {
        if (this.state.dowmIsHidden === 'none') {
            this.setState({ dowmIsHidden: 'inline', upIsHidden: 'none' });
        }
        if (this.state.dowmIsHidden === 'inline') {
            this.setState({ dowmIsHidden: 'none', upIsHidden: 'inline' });
        }
    }
    onClickOther = (row: string, content: any) => {
        if (this.props.on_icon_click) {
            this.props.on_icon_click(row, content);
        }
    }
    onClickDel = (content: any) => {
        this.setState({
            visible: true,
            data: content
        });
    }
    /** 点击某行事件 */
    onClickRow = (content: any) => {
        return {
            onClick: () => {
                this.props.onClick && this.props.onClick(content);
            },
        };
    }
    onSelectChange = (selectedRowKeys: string, selectedRows: any) => {
        if (this.props.on_row_selection) {
            this.props.on_row_selection(selectedRows);
        }
    }
    /** 分页改变回调事件 */
    pageOnClick = (page: any, pageSize: any) => {
        if (this.props.page_on_click) {
            this.props.page_on_click(page);
            this.setState({
                current_page: page
            });
        }
    }
    /** 改变分页数量回调事件 */
    onShowSizeChange = (current: number, pageSize: number) => {
        if (this.props.show_size_change) {
            this.props.show_size_change(current, pageSize);
            this.setState({
                current_page: current,
                total_pages: Math.ceil((this.props.total ? this.props.total : 0) / pageSize)
            });
        }
    }

    /** 确定回调事件 */
    handleOk = (e: any) => {
        this.setState({
            visible: false,
        });
        /** 返回回调 */
        if (this.props.on_click_del) {
            this.props.on_click_del(this.state.data);
        }
    }
    /** 取消事件 */
    handleCancel = (e: any) => {
        this.setState({
            visible: false,
            data: ''
        });
    }
    footer = () => this.props.show_footer ? '当前 ' + this.state.current_page + ' / ' + (this.state.total_pages ? this.state.total_pages : this.props.total_pages) + '，共 ' + this.props.total + ' 条' : '';
    componentWillMount() {
        this.setState({
            current_page: 1,
            // total_pages: Math.ceil((this.props.total ? this.props.total : 0) / (this.props.default_page_size! ? this.props.default_page_size! : 10))
        });
    }
    render() {
        let {
            data_source,
            columns_data_source,
            on_row_selection,
            bordered,
            table_size,
            table_title,
            expandedRowRender,
            showHeader,
            is_pagination,
            default_page_size
        } = this.props;
        /** 给所有数据增加key，供表格使用 */
        // if (data_source) {
        //     for (const key in data_source) {
        //         if (data_source.hasOwnProperty(key)) {
        //             const e = data_source[key];
        //             e.key = e.id;
        //         }
        //     }
        // }
        /** 判断是否需要选择框 */
        const rowSelection: any =
            on_row_selection ?
                {
                    onChange: this.onSelectChange,
                    hideDefaultSelections: true,
                    // selectedRowKeys: this.props.clear_all_select ? [] : undefined
                }
                : undefined;
        return (
            <div><Modal
                title="注意！"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <p>是否删除该行信息</p>
            </Modal>
                <LocaleProvider locale={zhCN}>
                    <Table
                        rowKey={this.props.rowKey ? this.props.rowKey : 'id'}
                        rowSelection={rowSelection}
                        onRow={this.onClickRow}
                        columns={columns_data_source}
                        dataSource={data_source}
                        bordered={bordered}
                        size={table_size}
                        expandedRowRender={expandedRowRender}
                        title={table_title}
                        footer={this.footer}
                        showHeader={showHeader}
                        pagination={is_pagination === false ? false
                            : {
                                showQuickJumper: true,
                                showSizeChanger: true,
                                onShowSizeChange: this.onShowSizeChange,
                                onChange: this.pageOnClick,
                                defaultPageSize: default_page_size ? default_page_size : 10,
                                defaultCurrent: 1,
                                total: this.props.total
                            }}
                        className="table-footer"
                    />
                </LocaleProvider>
            </div>
        );
    }
}

/**
 * 控件：操作表格控件控制器
 * 控制操作表格控件
 */
@addon('NTOperationTable', '操作表格控件控制器', '控制操作表格控件')
@reactControl(NTOperationTable)
export class NTOperationTableControl extends BaseReactElementControl {
    /** 是否显示边框 */
    bordered?: boolean;
    /** 标题大小 */
    table_size?: "small" | "default" | "middle" | undefined;
    /** 二级表体 */
    expandedRowRender?: (record: any, index: number, indent: number, expanded: boolean) => React.ReactNode;
    /** 标题显示 */
    table_title?: (currentPageData: Object[]) => React.ReactNode;
    /** 是否显示列名 */
    showHeader?: boolean;
    /** 是否显示滚动条 */
    scroll?: {
        x?: boolean | number | string;
        y?: boolean | number | string;
    };
    /** 总条数 */
    total?: number;
    /** 默认的每页条数 */
    public default_page_size?: number;
    public clear_all_select?: boolean;
    /** 默认的总页数 */
    public total_pages?: number;
    /** 是否显示页脚 */
    public show_footer?: boolean;
    /** 显示数据源 */
    public data_source?: any[];
    /** 显示列名数据源 */
    public columns_data_source?: ColumnProps<any>[];
    /** 行选择事件 */
    public on_row_selection?: (selectedRows: any) => void;
    /** 分页改变回调事件 */
    public page_on_click?: (page: any) => void;
    /** 改变分页数量回调事件 */
    public show_size_change?: (current: number, pageSize: number) => void;
    /** 删除按钮事件 */
    public on_click_del?: (content: any) => void;
    /** 其他功能按钮按钮 */
    public other_label_type?: LabelType[];
    /** 自定义图标点击回调事件 */
    public on_icon_click?: (row: string, content: any) => void;
    /** 是否收起功能按钮 none:需要隐藏按钮；inline/undefined:不要隐藏 */
    public is_hidden?: 'none' | 'inline';
    /** 是否显示分页 */
    public is_pagination?: boolean;
    /** 表格数据的key */
    public rowKey?: string;
    constructor() {
        super();
    }
}
export interface LabelType {
    /** 标签类型 */
    type?: 'icon' | 'button' | 'link';
    /** 标签参数(对应标签内部的参数) */
    label_parameter?: any;
    /** 显示文字 */
    label_text?: string;
    /** 获取回调的唯一标识码 */
    label_key?: string;
}