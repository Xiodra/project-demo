/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 项目: 红网（Red Web）
 * 
 * 创建日期: Mon, 2018-04-02 10:19:54 am
 * 作者: 胡燕龙（huyl） (y.dragon.hu@hotmail.com)
 * 
 * 说明: 
 * 1. 表格字段编辑器控件
 * 2. 数据源绑定
 * 3. 默认值
 * 4. 当前用户
 * 
 * 版权: Copyright © 2017 - 2018
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
import * as React from 'react';
import { Select } from 'antd';
import { addon, IDataQueryer, DataEvent, EventAddon } from 'pao-aop';
import { BaseReactElementControl, reactControl } from 'pao-aop-client';

/** 编辑器接口 */
export interface IEditor {
    /** 事件：值改变 */
    onDataChange?: (value: any) => void;
    /** 重加载 */
    reload?: () => void;
}

/**
 * 控件：基础编辑器
 */
@addon('BaseEditorControl', '基础编辑器', '所有编辑器控件的基类')
export class BaseEditorControl extends BaseReactElementControl implements IEditor {
    /** 默认值 */
    defaultValue?: any;
    /** 事件：值改变 */
    onDataChange?: (value: any) => void;
    /** 数据源 */
    dataSource?: IDataQueryer;
    /** 设置数据源 */
    setDataSource(dataSource?: IDataQueryer) {
        this.dataSource = dataSource;
        return this;
    }
}

/** 列配置 */
export class ColumnOption {
    /**
     * 列配置
     * @param title 列表题
     * @param dataIndex 数据字段
     * @param editor 编辑器
     * @param primary 主键
     * @param show 是否显示
     * @param editable 可编辑
     * @description 默认列配置显示，可编辑
     */
    constructor(
        public title?: string,
        public dataIndex?: string,
        public editor?: BaseEditorControl,
        public primary?: boolean,
        public show?: boolean,
        public editable?: boolean) {
        this.primary = typeof primary === 'undefined' ? true : primary;
        this.show = typeof show === 'undefined' ? true : show;
        this.editable = typeof editable === 'undefined' ? true : editable;
    }
}

/**
 * 选择器模式
 */
export enum SelectMode {
    /** 单选 */
    Single,
    /** 多选 */
    Multiple
}

export interface SelectState {
    /** 
     * 当前值
     * @description 单选为字符串，多选时字符串数组
     */
    value?: string | string[];
    /** 选项数据 */
    data?: any[];
}

/**
 * 组件：选择编辑器控件
 */
export class SelectEditor extends React.Component<SelectEditorControl, SelectState> {
    constructor(props: SelectEditorControl) {
        super(props);
        const { defaultValue } = props, data: any[] = [];
        this.state = { value: defaultValue, data };
    }
    /** 事件：加载前 */
    componentWillMount() {
        const { dataSource, defaultOptions } = this.props;
        // 存在数据源时初始化数据接收事件
        if (dataSource) {
            (dataSource as EventAddon).addEventHandler!(
                DataEvent.DataReceive,
                (_: any, data: any[]) => {
                    this.setState({ data });
                });
        }
        // 存在默认选项数据时设置数据到状态
        if (defaultOptions) {
            this.setState({ data: defaultOptions });
        }
    }
    /** 事件：加载后 */
    componentDidMount() {
        if (this.props.dataSource) {
            this.props.dataSource.query!({});
        }
    }
    /** 生成选择项 */
    generateOption(data?: any[]) {
        const { displayMember, valueMember } = this.props, { Option } = Select, children = [];
        if (data && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                const obj = data[i];
                if (displayMember && valueMember && obj[displayMember] && obj[valueMember]) {
                    const key = obj[valueMember], label = obj[displayMember];
                    children.push(<Option key={key}>{label}</Option>);
                }
            }
        }
        return children.length > 0 ? children : null;
    }
    render() {
        const { onDataChange, placeholder, mode } = this.props;
        const children = this.generateOption(this.state.data);
        return (
            <Select
                mode={mode === SelectMode.Single ? "default" : mode === SelectMode.Multiple ? "multiple" : "default"}
                defaultValue={this.state.value}
                placeholder={placeholder}
                onChange={(value) => onDataChange!(value)}
                getPopupContainer={(trigger) => {
                    return trigger!.parentElement!;
                }}
            >
                {children}
            </Select>
        );
    }
}

/**
 * 控件：选择编辑器控件
 */
@addon('SelectEditorControl', '选择编辑器控件', '选择编辑器控件，支持单选及多选模式')
@reactControl(SelectEditor)
export class SelectEditorControl extends BaseEditorControl {
    /**
     * 选择编辑器控件
     * @param displayMember 显示成员字段 
     * @param valueMember 值成员字段
     * @param defaultOptions 默认选项
     * @param placeholder 占位提示信息
     * @param mode 模式，默认单选模式
     */
    constructor(
        public displayMember?: string,
        public valueMember?: string,
        public defaultOptions?: { [valueMember: string]: any }[],
        public placeholder: string = "请选择...",
        public mode: SelectMode = SelectMode.Single) {
        super();
    }
}