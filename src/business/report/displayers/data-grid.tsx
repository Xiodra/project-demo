/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 项目: 红网（Red Web）
 * 
 * 创建日期: Wed, 2018-03-28 4:02:23 pm
 * 作者: 胡燕龙（huyl） (y.dragon.hu@hotmail.com)
 * 
 * 说明: 
 * 1. 组件：表格显示控件
 * 2. 可以支持编辑，分页，排序等复杂用户操作
 * 3. 使用Antd组件封装
 *  
 * 版权: Copyright © 2017 - 2018
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Table, Popconfirm, Button } from 'antd';
import { BaseDisplayerControl, BaseDisplayer } from '..';
import { ColumnOption } from '../editors';
import { addon } from 'pao-aop';
import { IEditable, EditEventArgs, EditableEvent, ChangeEventArgs } from '../events';
import { reactControl } from 'pao-aop-client';

/**
 * 可编辑列
 * @param props 
 */
export function EditableCell(
    props: { editable: boolean, value: string, columnOption: ColumnOption, onDataChange: (value: string) => void }) {
    if (props.columnOption.editor) {
        props.columnOption.editor.defaultValue = props.value;
        props.columnOption.editor.onDataChange = (value: any) => props.onDataChange(value);
    }
    let editElement = props.columnOption.editor ? props.columnOption.editor.createElement!() : null;
    return (
        <div>
            {
                props.editable && props.columnOption.editor ? editElement : props.value
            }
        </div>);
}

/**
 * 组件：基础表格
 */
export class BaseGrid extends BaseDisplayer<BaseGridDisplayerControl, any> {
    dom?: Element | Text | any;
    /** 当前列配置 */
    columns?: ColumnOption[];
    /** 缓存数据 */
    cacheData?: any[];
    constructor(props: BaseGridDisplayerControl) {
        super(props);
        this.columns = this.generateColumnOptions();
        this.state = {
            data: props.data,
            columns: this.columns
        };
        // 设置缓存数据
        this.cacheData = props.data ? props.data.map(item => ({ ...item })) : [];
    }
    resize(height?: number, width?: number) {
        this.setState({ height });
    }
    /** 生成列配置 */
    generateColumnOptions() {
        let columns = [];
        const { isEditable, columnOptions } = this.props;
        // 根据列配置生成当前列配置
        if (columnOptions && columnOptions.length > 0) {
            let primary = columnOptions.filter((item: ColumnOption) => item.primary)[0];
            for (let index = 0; index < columnOptions.length; index++) {
                const columnOption = columnOptions[index], col: any = {};
                if (columnOption.show) {
                    col.title = columnOption.title;
                    col.dataIndex = columnOption.dataIndex;
                    col.render = (text: string, record: any) =>
                        this.renderColumns(text, record, record[primary.dataIndex!], columnOption);
                    columns.push(col);
                }
            }
            // 是否支持编辑
            if (isEditable) {
                let option = {
                    title: '操作',
                    dataIndex: '操作',
                    render: (text: string, record: any) => {
                        const { editable } = record;
                        return (
                            <div className="editable-row-operations">
                                {
                                    editable ?
                                        <Button.Group>
                                            <Button onClick={() => this.save(record[primary.dataIndex!])}>保存</Button>
                                            <Popconfirm okText="确认" cancelText="取消" title="是否取消?" onConfirm={() => this.cancel(record[primary.dataIndex!])}>
                                                <Button>取消</Button>
                                            </Popconfirm>
                                        </Button.Group> :
                                        <Button onClick={() => this.edit(record[primary.dataIndex!])}>编辑</Button>
                                }
                            </div>
                        );
                    }
                };
                columns.push(option);
            }
        }
        return columns;
    }
    /** 渲染列 */
    renderColumns(text: string, record: any, key: string, columnOption: ColumnOption) {
        return (
            <EditableCell
                editable={record.editable}
                value={text}
                columnOption={columnOption}
                onDataChange={value => this.handleChange(value, key, columnOption.dataIndex!)}
            />
        );
    }
    /** 处理数据改变 */
    handleChange(value: string, key: string, column: string) {
        // 当前数据闭包处理
        const newData = [...this.state.data];
        let primary = this.props.columnOptions!.filter((item: ColumnOption) => item.primary)[0];
        // 当前修改列数据
        const target = newData.filter(item => key === item[primary.dataIndex!])[0];
        if (target) {
            target[column] = value;
            this.setState({ data: newData });
        }
    }
    /**
     * 编辑
     * @param key 编辑行唯一ID
     */
    edit(key: string) {
        const newData = [...this.state.data];
        let primary = this.props.columnOptions!.filter((item: ColumnOption) => item.primary)[0];
        const target = newData.filter(item => key === item[primary.dataIndex!])[0];
        if (target) {
            target.editable = true;
            this.setState({ data: newData });
        }
    }
    /**
     * 保存
     * @param key 保存行唯一ID
     */
    save(key: string) {
        const newData = [...this.state.data];
        let primary = this.props.columnOptions!.filter((item: ColumnOption) => item.primary)[0];
        const target = newData.filter(item => key === item[primary.dataIndex!])[0];
        if (target) {
            delete target.editable;
            this.setState({ data: newData });
            this.cacheData = newData.map(item => ({ ...item }));
        }
    }
    /**
     * 取消
     * @param key 取消编辑行唯一ID
     */
    cancel(key: string) {
        const newData = [...this.state.data];
        let primary = this.props.columnOptions!.filter((item: ColumnOption) => item.primary)[0];
        const target = newData.filter(item => key === item[primary.dataIndex!])[0];
        if (target) {
            Object.assign(target, this.cacheData!.filter(item => key === item[primary.dataIndex!])[0]);
            delete target.editable;
            this.setState({ data: newData });
        }
    }
    render() {
        const { data, columns } = this.state, { columnOptions } = this.props;
        // 主键字段
        const primaryCol = columnOptions!.filter((item: ColumnOption) => item.primary)[0];
        return (
            <Table
                ref={(ref: any) => this.dom = ReactDOM.findDOMNode(ref!)}
                bordered={true}
                dataSource={data}
                columns={columns}
                scroll={{ x: true, y: this.state.height - 108 }}
                rowKey={primaryCol.dataIndex}
                pagination={{
                    pageSize: 500
                }}
            />);
    }
}

/**
 * 控件：基础表格控件
 */
@addon("BaseGridControl", "基础表格控件", "用于数据展示的表格控件，支持编辑等复杂操作")
@reactControl(BaseGrid)
export class BaseGridDisplayerControl extends BaseDisplayerControl implements IEditable {
    /**
     * 基础表格控件
     * @param config 配置
     * @param isEditable 支持编辑，默认true
     */
    constructor(
        public columnOptions?: ColumnOption[],
        public isEditable: boolean = true) {
        super();
    }
    /** 事件：改变编辑状态 */
    onChangeEditState?= (args: EditEventArgs) => {
        this.fire!(EditableEvent.ChangeEditState, this, args);
    }
    /** 事件：数据改变 */
    onDataChange?= (args: ChangeEventArgs) => {
        this.fire!(EditableEvent.Change, this, args);
    }
}