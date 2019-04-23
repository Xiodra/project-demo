/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 项目: 红网（Red Web）
 * 
 * 创建日期: Wed, 2018-03-21 6:15:26 pm
 * 作者: 胡燕龙（huyl） (y.dragon.hu@hotmail.com)
 * 
 * 说明: 
 * 1. 智能报表框架实现
 * 2. 数据源绑定
 * 3. 模块控件与模块容器绑定
 * 4. 自适应等
 * 5. 智能报表对应的样式名称有
 *    1）头部：report-header
 *    2）头部标题：report-header-title
 *    3）头部工具条：report-header-toolbox
 * 
 * 版权: Copyright © 2017 - 2018
 * *n * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

import * as React from 'react';
import { addon, DataView, EventHandler, EventFunction, log, DataEvent, BaseAddon, IDataQueryer } from 'pao-aop';
import { ResizeEvent, ResizeEventArgs, IResizeable, LayoutableEvent } from './events';
import { Layouts } from 'react-grid-layout';
import { BaseEditorControl } from './editors';
import { Form, Row, Col, Button } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { BaseLayoutControl } from './layout';
import { reactControl, BaseReactElementControl, CommonToolboxControl, createReactNode } from 'pao-aop-client';
import { CommonTitleControl, CommonContainerControl } from './widget/index';

const { Item: FormItem } = Form;

/**
 * 报表数据视图
 * @author huyl
 */
@addon('ReportDataView', '报表数据视图', '关联报表数据源的数据视图')
export class ReportDataView extends DataView {
    /**
     * 报表数据视图
     * @param id 唯一ID
     * @param filter 数据过滤器
     * @param dataSourceID 数据源ID
     */
    constructor(
        public id?: string,
        public filter?: string,
        public dataSourceID?: string) {
        super(id, filter);
    }
}

/**
 * 状态：基础报表模块
 * @author huyl
 */
export interface ReportModuleState {
    /** 编辑状态 */
    edit?: boolean;
    /** 当前数据 */
    data?: any[];
}

/**
 * 基础报表模块
 * @author huyl
 */
export class BaseReportModule<P extends BaseReportModuleControl, S extends ReportModuleState> extends React.Component<P, S> {
    componentWillMount() {
        this.props.clearEventHandler!(ResizeEvent.Resize);
        this.props.addEventHandler!(
            ResizeEvent.Resize,
            (sender: any, args: ResizeEventArgs) => {
                if (args.id === this.props.id) {
                    this.onResize!(args);
                }
            });
    }
    /** 重置大小 */
    onResize(args: ResizeEventArgs) {
        // TODO: 派生类实现
    }
}

/**
 * 控件：基础报表模块
 * @author huyl
 */
@addon('BaseReportModuleControl', '基础报表模块', '可以插入到智能报表的模块')
@reactControl(BaseReportModule)
export class BaseReportModuleControl extends BaseReactElementControl implements IResizeable {
    /**
     * 基础报表模块
     * @param id 唯一标识
     * @param title 标题
     * @param icon 图标：base64
     * @param tools 自定义操作
     */
    constructor(
        public id?: string,
        public title?: string,
        public icon?: string,
        public dataViews?: ReportDataView[],
        public tools?: CommonToolboxControl,
        public titleable?: boolean) {
        super(id);
        if (typeof titleable === 'undefined') {
            this.titleable = true;
        }
        this.icon = icon ? icon : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAPdEVYdFRpdGxlAENoYXJ0O0JhcvfAgcwAAAKdSURBVDhPhZJdSJNhFMenTs2J5kd2URdFSVmRkZaxSi3XKjXdUAtLUpuZJohfaZo1UaeILaVSQuzDsszNVBLxg9bmNF3L5semFXXjRReRUSFUlsm/97xbsITYA4fD75zz/7/P+zwPx8ayY8KeCQdLJv53AfhvMMte2mbUSNuncVFhHGDYYUnfpgG3uG0Kw+8XUaQ0UYG7pG/TwLGw1YiON79R8HCSCo5/e4ZTIurbNshtHodiegHZ98ao4MwEl+qWbMfRFoRYC+iQ6MBogLJTZpMBzRM/kXHrJQ3wTCnR2tepYpgk0Vp2TieLsTbgVrQc0FYphJA9ENAAL63xBRoN80ht0NOA2yuJCIuqdkwnR5l3pCsXWxs4yVrC8O5TJ8ru72MFknodrut+ILluhHj5VFIkFprkmDoZQbyMRNb/5FxyNxi6GTku3dlLA+4JV4dwRfsN8bWDxB6mEwcxf6MUk/FCYhfOWI1Ia6wVw3A5irbsWnQzCOq3JTjfsIP9YpxciwrVHGKrNcSe47H78V2ejzFxqNlgojoSmOnAaOUhVpBbvw3dphxkXfNnBaIqFYp7viKq8gmxl+HIHsyVpGM0nE/M4+hlAmC8AsPSECp4ZNT4QaGXIF2+kRWEl/Xj3OPPOFzWR+ytFwbiS14CngsCiF05Qxf4WBzJhzqP3bKnpHItbmuPIql8DSsQSHuQ+WgWYUxmeMVwqD9m08R4FrzVbKDK3o5fmjPoPbuFCl4JpatR1x+B49JVrEFIcTfSWj8iuLCb2Gdw92Z8SBRigL/JbNCZ4ve06/QGKBN91UzBLa7QR32saCVi8r2J3XflKDX8gi4EZSk1DC/vC1yv0ez0RW/AOmL2Gp2YcLFken30XHmWzF7tEiaRqzlz7P8ApRy0yvJecX4AAAAASUVORK5CYII=';
    }
    /** 事件：重置大小 */
    onResize?= (args: ResizeEventArgs) => {
        this.fire!(ResizeEvent.Resize, this, args);
    }
}

/** 查询参数 */
export type QueryParameters = {
    [paramKey: string]: any;
};

/**
 * 数据查询器模块接口
 * @author huyl
 */
export interface IDataQueryerModule {
    /**
     * 查询的数据源ID
     * @description 为空时查询所有的数据源，不为空时指定数据源
     */
    dataSourceIDList?: string[] | undefined;
    /** 查询 */
    query?: () => void;
    /** 获取查询参数 */
    getQueryParams?: () => QueryParameters;
    /** 查询回调 */
    onQuery?: (dataSourceID: string, params?: QueryParameters) => void;
}

/**
 * 数据显示器模块接口
 * @author huyl
 */
export interface IDataDisplayerModule {
    /** 事件：数据改变 */
    onSetData?: (dataView: DataView, data: any[]) => void;
}

/** 
 * 判断显示器模块
 * @author huyl
 */
export function isDataDisplayer(module: BaseReportModuleControl): module is IDataDisplayerModule {
    return (module as IDataDisplayerModule).onSetData !== undefined;
}

/**
 * 判断数据查询器模块
 * @author huyl
 */
export function isDataQueryer(module: BaseReportModuleControl): module is IDataQueryerModule {
    return (module as IDataQueryerModule).query !== undefined;
}

/**
 * 状态：智能报表
 * @author huyl
 */
export interface SmartReportState {
    layout?: boolean;
}

/** 智能报表消息池 */
export class SmartReportMessagePool {
    /** 事件池 */
    private eventPool?: EventHandler;
    /** 智能报表消息池 */
    constructor() {
        if (!this.eventPool) {
            this.eventPool = new EventHandler();
        }
    }
    /**
     * 订阅消息
     * @param key 订阅的消息
     * @param callback 回调
     */
    subscribe<T>(key: string, callback: EventFunction<T>) {
        this.eventPool!.addEventHandler!(key, callback);
    }
    /**
     * 发送消息
     * @param key 待发送的消息
     * @param sender 发送者
     * @param eventArgs 事件参数
     */
    send<T>(key: string, sender: any, eventArgs: T) {
        this.eventPool!.fire!(key, sender, eventArgs);
    }
}

/**
 * 组件：智能报表
 * @author huyl
 */
export class SmartReport<
    P extends SmartReportControl = SmartReportControl,
    S extends SmartReportState = SmartReportState> extends React.PureComponent<P, S> {
    /** 当前布局信息 */
    currentLayouts?: Layouts;
    /** 自动查询开关 */
    private autoQueryable?: any;
    constructor(props: P) {
        super(props);
        // 该处不能初始化状态
        // 确保消息池已经初始化
        if (!props.messagePool) {
            props.messagePool = new SmartReportMessagePool();
        }
    }
    /**
     * 事件：加载前
     */
    componentWillMount() {
        const { layout, modules, title } = this.props;
        this.handleClear!();
        // TODO:
        // 1. 初始化布局,如从服务端获取布局信息或者本地布局信息等
        // 2. 初始化数据变化事件
        // 3. 其他初始化
        // 4. 加载画面
        // 开始布局控件初始化
        {
            layout!.childControls = [];
            layout!.title = title!;
        }
        // 开始模块控件初始化
        {
            // 容器的唯一ID绑定模块的唯一ID
            for (let i = 0; i < modules!.length; i++) {
                let module = modules![i];
                // 判断显示器模块时进行数据视图初始化
                if (isDataDisplayer(module)) {
                    this.initDisplayerModuleViews!(module);
                }
                // 判断查询模块时进行查询模块初始化
                if (isDataQueryer(module)) {
                    this.initDataQueryerModule!(module);
                }
                let control = this.initModuleContainer!(module);
                layout!.childControls!.push(control);
            }
        }
        log("SmartReport", "componentWillMount");
    }
    componentDidMount() {
        // 开启自动查询
        this.openAutoQuery!();
        window.addEventListener('resize', () => {
            // 容器的唯一ID绑定模块的唯一ID
            for (let i = 0; i < this.props.modules!.length; i++) {
                let module = this.props.modules![i];
                module!.onResize!({ id: module.id! });
            }
        });
        log("SmartReport", "componentDidMount");
    }
    handleClear() {
        // 开始布局控件卸载
        const { layout, dataSources, modules } = this.props;
        {
            layout!.childControls = [];
        }
        {
            if (dataSources && dataSources.length > 0) {
                for (let i = 0; i < dataSources.length; i++) {
                    const dataSource = dataSources[i];
                    (dataSource as any).clearEventHandler(DataEvent.DataReceive);
                }
            }
            if (modules && modules.length > 0) {
                for (const module of modules!) {
                    const { dataViews } = module;
                    for (const dataView of dataViews!) {
                        dataView!.clearEventHandler!(DataEvent.DataReceive);
                    }
                }
            }
        }
    }
    /**
     * 初始化模块容器
     * @param module 待初始化模块
     */
    initModuleContainer(module: BaseReportModuleControl) {
        let title = module.titleable ? new CommonTitleControl(module.title, module.icon) : undefined;
        let control = new CommonContainerControl(title!, module, module.tools);
        control.id = module.id;
        return control;
    }
    /**
     * 初始化模块数据视图
     * @param module 待初始化模块
     */
    initDisplayerModuleViews(module: BaseReportModuleControl) {
        const { dataSources } = this.props, { dataViews } = module;
        if (dataViews && dataViews.length > 0) {
            for (let i = 0; i < dataViews.length; i++) {
                const dataView = dataViews[i];
                const dataSource = dataSources!.filter(item => (item as BaseAddon).id === dataView.dataSourceID);
                if (dataSource) {
                    // 对应的数据源ID唯一
                    dataView.dataReceiver = dataSource[0];
                    // 数据视图初始化
                    dataView.init!();
                }
            }
        }
    }
    /** 初始化数据查询模块 */
    initDataQueryerModule(module: BaseReportModuleControl) {
        if (isDataQueryer(module)) {
            let { dataSources } = this.props,
                { dataSourceIDList } = module,
                searchAll = false;
            if (!dataSourceIDList || dataSourceIDList.length === 0) { searchAll = true; }
            module.onQuery = (dataSourceID: string, params: QueryParameters) => {
                if (searchAll) {
                    this.query(params);
                } else {
                    const dataSource = dataSources!.filter(item => (item as BaseAddon).id === dataSourceID);
                    if (dataSource) {
                        dataSource![0].query!(params);
                    }
                }
            };
        }
    }
    /** 查询 */
    query(params?: QueryParameters) {
        log("SmartReport", "query");
        const { dataSources } = this.props;
        for (let index = 0; index < dataSources!.length; index++) {
            const dataSource = dataSources![index];
            dataSource.query!(params)
                .catch(error => {
                    console.log(error.message);
                });
        }
    }
    /** 开启自动查询 */
    openAutoQuery() {
        const { autoQuery, defaultParams } = this.props;
        if (autoQuery) {
            switch (autoQuery) {
                case 0:
                    break;
                case 1:
                    this.query!(defaultParams);
                    break;
                default:
                    this.query!(defaultParams);
                    this.autoQueryable = setInterval(() => this.query!(defaultParams), autoQuery);
                    break;
            }
        }
    }
    /** 取消自动查询 */
    cancleAutoQuery() {
        clearInterval(this.autoQueryable);
    }
    /** 渲染 */
    render() {
        return this.props.layout!.createElement!();
    }
}

/** 
 * 报表模块事件
 * @author huyl
 */
export enum ReportModuleEvent {
    /** 设置数据 */
    SetData = "SetData"
}

/**
 * 控件：智能报表控制器
 * @author huyl
 */
@addon('SmartReportControl', '智能报表控制器', '整合了数据源和数据显示器的报表')
@reactControl(SmartReport)
export class SmartReportControl extends BaseReactElementControl {
    /** 消息池 */
    messagePool?: SmartReportMessagePool;
    /** 默认参数 */
    defaultParams?: { [key: string]: any };
    /**
     * 智能报表控制器
     * @param title 标题
     * @param dataSources 数据源列表
     * @param modules 模块列表
     * @param layout 布局控件
     * @param autoQurey 自动查询
     * @description 自动查询,0:不开启，1:开启，>=5000:大于5秒开启间隔自动查询
     */
    constructor(
        public title?: string,
        public dataSources?: IDataQueryer[],
        public modules?: BaseReportModuleControl[],
        public layout?: BaseLayoutControl,
        public autoQuery?: number) {
        super();
        this.messagePool = new SmartReportMessagePool();
    }
    onChangeLayout?= (change: boolean) => {
        this.fire!(LayoutableEvent.ChangeLayouts, this, change);
    }
}

/**
 * 显示器状态
 * @author huyl
 */
export interface DisplayerState {
    /** 显示器数据 */
    data: any[];
    /** 显示器高度 */
    height?: number;
}

/**
 * 组件：基础数据显示器控件
 * @author huyl
 */
export class BaseDisplayer<P extends BaseDisplayerControl, S extends DisplayerState> extends React.Component<P, S> {
    componentWillMount() {
        this.clearEvent!();
        this.props.addEventHandler!(
            ResizeEvent.Resize,
            (sender: any, args: ResizeEventArgs) => {
                log("BaseDisplayer", "Resize");
                this.resize!(args.height, args.width);
            });
        this.props.addEventHandler!(
            ReportModuleEvent.SetData,
            (sender: any, data: any) => this.onSetData(sender, data)
        );
    }
    clearEvent() {
        // 先清除事件再添加
        this.props.clearEventHandler!(ResizeEvent.Resize);
        this.props.clearEventHandler!(ReportModuleEvent.SetData);
    }
    /**
     * 重置大小
     * @param height 高度
     * @param width 宽度
     */
    resize(height?: number, width?: number) {
        // TODO: 派生类实现各自的重置大小方法
    }
    /**
     * 设置数据
     * @param data 待设置数据
     */
    onSetData(dataView: DataView, data?: any) {
        // TODO: 派生类实现各自的重置大小方法
    }
}

/**
 * 控件：基础数据显示器控件
 * @author huyl
 */
@addon('BaseDisplayerControl', '基础数据显示器控件', '所有数据显示器控件的基类，定义重置大小，数据变化等事件')
@reactControl(BaseDisplayer)
export class BaseDisplayerControl extends BaseReactElementControl implements IResizeable, IDataDisplayerModule {
    /** 数据 */
    data?: any[];
    /** 事件：数据改变 */
    onSetData?= (dataView: DataView, data: any[]) => {
        this.fire!(ReportModuleEvent.SetData, dataView, data);
    }
    /** 事件：重置大小 */
    onResize?= (args: ResizeEventArgs) => {
        this.fire!(ResizeEvent.Resize, this, args);
    }
}

/**
 * 组件：基础数据查询器控件
 */
export class BaseDataQueryerModule<P extends BaseDataQueryerModuleControl, S> extends React.Component<P, S> {
    componentWillMount() {
        this.clearEvent!();
        this.props.addEventHandler!(
            ResizeEvent.Resize,
            (sender: any, args: ResizeEventArgs) => {
                log("BaseDisplayer", "Resize");
                this.resize!(args.height, args.width);
            });
    }
    clearEvent() {
        // 先清除事件再添加
        this.props.clearEventHandler!(ResizeEvent.Resize);
        this.props.clearEventHandler!(ReportModuleEvent.SetData);
    }
    // 重置大小
    resize(height?: number, width?: number) {
        // TODO: 派生类实现各自的重置大小方法
    }
}

/**
 * 控件：基础数据查询器控件
 */
@addon('BaseDataQueryerModuleControl', '基础数据查询器控件', '所有数据查询器控件的基类，定义重置大小，字段初始化等')
@reactControl(BaseDataQueryerModule)
export class BaseDataQueryerModuleControl extends BaseReportModuleControl implements IDataQueryerModule {
    /**
     * 查询的数据源ID
     * @description 为空时查询所有的数据源，不为空时指定数据源
     */
    dataSourceIDList?: string[] | undefined;
    /** 获取查询参数 */
    getQueryParams?: () => QueryParameters;
    /** 查询回调 */
    onQuery?: (dataSourceID: string | undefined, params?: QueryParameters) => void;
    /**
     * 基础数据查询器控件
     * @param fieldsEditorList 字段编辑器列表
     */
    constructor(
        id?: string,
        title?: string,
        icon?: string,
        dataViews?: ReportDataView[],
        tools?: CommonToolboxControl,
        titleable?: boolean,
        public fieldsEditorList?: { [fieldKey: string]: BaseEditorControl }) {
        super(id, title, icon, dataViews, tools, titleable);
    }
    /** 事件：重置大小 */
    onResize?= (args: ResizeEventArgs) => {
        this.fire!(ResizeEvent.Resize, this, args);
    }
    /** 查询 */
    query?= () => {
        // TODO: 派生类实现
    }
}

/**
 * 组件：基础显示器报表模块
 * @author huyl
 */
export class DataDisplayerModule extends BaseReportModule<DataDisplayerModuleControl, any> {
    /** 事件：加载前 */
    componentWillMount() {
        super.componentWillMount();
        const { dataViews, onSetData, displayer } = this.props;
        if (dataViews && dataViews.length > 0 && onSetData) {
            // 数据达到事件初始化
            for (let i = 0; i < dataViews.length; i++) {
                const dataView = dataViews[i];
                // 数据视图数据到达事件绑定
                dataView.addEventHandler!(
                    DataEvent.DataReceive,
                    (sender: DataView, data: any[]) => {
                        // 事件发送者为当前控件，不是当前组件
                        onSetData(sender, data);
                    });

            }
        }
        // 添加事件前必须清空事件
        this.props.addEventHandler!(
            ReportModuleEvent.SetData,
            (sender: any, data: any) => {
                if (displayer && displayer.onSetData) {
                    displayer.onSetData(sender, data);
                }
            });
    }
    /** 重置大小 */
    onResize(args: ResizeEventArgs) {
        // TODO: 派生类实现
        if (args.id === this.props.id && this.props.displayer!.onResize) {
            this.props.displayer!.onResize!(args);
        }
    }
    render() {
        return this.props.displayer!.createElement!();
    }
}

/**
 * 控件：基础数据显示器模块
 * @author huyl
 */
@addon('BaseDisplayerModule', '基础数据显示器模块', '所有数据显示器的基类')
@reactControl(DataDisplayerModule)
export class DataDisplayerModuleControl extends BaseReportModuleControl implements IDataDisplayerModule {
    /** 显示器 */
    displayer?: BaseDisplayerControl;
    /** 事件：数据改变 */
    onSetData?= (dataView: DataView, data: any[]) => {
        this.fire!(ReportModuleEvent.SetData, dataView, data);
    }
    /** 设置显示器 */
    setDisplayer?(displayer: BaseDisplayerControl) {
        if (displayer) {
            this.displayer = displayer;
        }
        return this;
    }
}

/**
 * 组件：通用数据查询模块
 */
export class CommonDataQueryerModule extends BaseDataQueryerModule<CommonDataQueryerModuleControl, {}> {
    handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        this.props.form!.validateFields((err, values: QueryParameters) => {
            const { dataSourceIDList, onQuery } = this.props;
            if (!dataSourceIDList || dataSourceIDList.length === 0) {
                onQuery && onQuery(undefined, values);
            } else {
                dataSourceIDList.forEach(dataSourceID => {
                    onQuery && onQuery(dataSourceID, values);
                });
            }
        });
    }

    render() {
        const { form, fieldsEditorList } = this.props,
            { getFieldDecorator } = form!;
        let fieldsElement = null;
        if (fieldsEditorList) {
            fieldsElement = (
                <Row gutter={24}>
                    {
                        Object.keys(fieldsEditorList!).map((fieldsKey: string, _: number) => {
                            return (
                                <Col span={24} key={fieldsKey}>
                                    <FormItem>
                                        {getFieldDecorator(fieldsKey, {})(
                                            createReactNode(fieldsEditorList![fieldsKey])
                                        )}
                                    </FormItem>
                                </Col>
                            );
                        })
                    }
                </Row>
            );
        }
        return (
            <Form
                className="ant-advanced-search-form"
                onSubmit={this.handleSubmit}
            >
                {fieldsElement}
                <Row>
                    <Col span={24} style={{ textAlign: 'center' }}>
                        <Button type="primary" htmlType="submit">查询</Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

/**
 * 控件：通用数据查询模块
 */
@addon('CommonDataQueryerModuleControl', '通用数据查询模块', '字段编辑器简单排列的查询器模块')
@reactControl(Form.create()(CommonDataQueryerModule as any))
export class CommonDataQueryerModuleControl extends BaseDataQueryerModuleControl {
    /** 
     * 表单工具
     * @description 该工具在表单组件经过Form.Create()(element)创建有实现，表单组件必须且一定需要使用Form.Create()(element)方法导出
     */
    form?: WrappedFormUtils | undefined;
}