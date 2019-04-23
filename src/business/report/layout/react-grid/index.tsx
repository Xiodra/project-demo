/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 项目: 红网（Red Web）
 * 
 * 创建日期: Wed, 2018-03-21 6:15:26 pm
 * 作者: 胡燕龙（huyl） (y.dragon.hu@hotmail.com)
 * 
 * 说明: 
 * 1. 布局控件实现，支持拖拽，大小重置，自适应，布局配置信息保存的
 * 
 * 版权: Copyright © 2017 - 2018
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { addon, log } from 'pao-aop';
import { Responsive, WidthProvider, Layouts, Layout } from 'react-grid-layout';
import { LayoutableEvent, ResizeEvent, ResizeEventArgs, IResizeable, ILayoutable } from '../../../report/events';
import { BaseLayoutControl } from '../base';
import { BaseReactElementControl, reactControl } from 'pao-aop-client';

/** 布局组件子项key前缀 */
const LayoutItem_Pre = "layout_",
    /** 布局组件子项样式名称 */
    LayoutItem_Class = "react-grid-item",
    /** 布局组件替换区域样式 */
    LayoutPlaceholder_Class = "react-grid-item react-grid-placeholder",
    Attr_Data_Key = "data-key";

/**
 * 状态：React栅格布局
 */
export interface LayoutState {
    /**
     * 静止状态
     */
    static?: boolean;
    /** 
     * 布局配置
     */
    layouts?: Layouts;
    items?: JSX.Element[];
}

/**
 * 组件：React栅格布局
 */
export class ReactGridLayout extends React.Component<ReactGridLayoutControl, LayoutState> {
    /** 当前dom元素实例 */
    dom?: Element | Text | any;
    /** 当前布局 */
    currentLayouts?: Layouts;
    constructor(props: ReactGridLayoutControl) {
        super(props);
    }
    /** 事件：加载前 */
    componentWillMount() {
        // 修改布局时，需要设置布局控件可以调整状态或者
        this.props.clearEventHandler!(ResizeEvent.Resize);
        this.props.clearEventHandler!(LayoutableEvent.ChangeLayouts);
        this.props.addEventHandler!(
            LayoutableEvent.ChangeLayouts,
            (sender: any, change: boolean) => {
                const layouts = this.state.layouts;
                this.setState({
                    static: change,
                    layouts: !change ? this.currentLayouts : layouts
                });
                // 保存布局时，重置大小
                setTimeout(
                    () => {
                        this.resize!();
                    },
                    500);
            });
        this.currentLayouts = this.props.layouts;
        this.setState({ static: false, layouts: this.props.layouts, items: this.generateLayoutItems!() });
    }
    componentDidMount() {
        $(window).resize(() => {
            this.resize!();
        });
        this.resize!();
    }
    /**
     * 生成Layout的子组件项
     */
    generateLayoutItems() {
        return this.props.childControls!.map((item: BaseReactElementControl, index: number) => {
            if ((item as any).onResize) {
                log("ReactGridLayout", "addEventHandler Resize");
                this.props.addEventHandler!(
                    ResizeEvent.Resize,
                    (sender: any, args: ResizeEventArgs) => {
                        (item as any).onResize(args);
                    });
            }
            return <div key={`${LayoutItem_Pre}${item.id}`} data-key={item.id}>{item.createElement!()}</div>;
        });
    }
    /** 事件：布局改变事件 */
    onLayoutChange?= (currentLayout: Layout[], allLayouts: Layouts) => {
        // 当布局处于不可调整状态时，触发处理布局信息保存事件
        if (this.props.handleLayoutChange) {
            this.currentLayouts = allLayouts;
            this.props.handleLayoutChange(allLayouts);
        }
    }
    /** 重置大小 */
    resize() {
        if (this.dom) {
            const itemsDom = (this.dom as Element).getElementsByClassName(LayoutItem_Class);
            for (let index = 0; index < itemsDom.length; index++) {
                const element = itemsDom[index];
                const id = element.getAttribute(Attr_Data_Key)!,
                    height = $(element).outerHeight(true),
                    width = $(element).outerWidth(true);
                this.props.onResize!({ id, height, width });
                log("ReactGridLayout", `Resize w:${width} h:${height}`);
            }
            log("ReactGridLayout", "resize");
        }
    }
    /**
     * 事件：重置大小
     */
    onResize?= (
        layout: Layout[],
        oldItem: Layout,
        newItem: Layout,
        placeholder: Layout,
        event: MouseEvent,
        element: HTMLElement) => {
        // 大小发生改变的控件ID
        const id = oldItem.i!.replace(LayoutItem_Pre, '');
        if (this.dom) {
            const changeElement = (this.dom as Element).getElementsByClassName(LayoutPlaceholder_Class);
            const height = changeElement[0].clientHeight, width = changeElement[0].clientWidth;
            this.props.fire!(ResizeEvent.Resize, this, { id, height, width });
        }
    }
    /** 渲染 */
    render() {
        const ResponsiveReactGridLayout = WidthProvider(Responsive);
        let layouts: Layouts = {};
        Object.keys(this.state.layouts!).forEach(key => {
            let ls: Layout[] = this.state.layouts![key];
            for (let index = 0; index < ls.length; index++) {
                let layout: Layout = ls[index];
                // 已经绑定id的布局
                layout.i = layout.i || `${LayoutItem_Pre}${this.props.childControls![index].id}`;
            }
            layouts[key] = ls;
        });
        return (
            <ResponsiveReactGridLayout
                ref={ref => this.dom = ReactDOM.findDOMNode(ref!)}
                layouts={layouts}
                breakpoints={this.props.breakpoints}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                isDraggable={this.state.static}
                isResizable={this.state.static}
                onResizeStop={this.onResize}
                onLayoutChange={this.onLayoutChange}
            >
                {this.state.items}
            </ResponsiveReactGridLayout>
        );
    }
}

/**
 * 控件：React栅格布局
 */
@addon('BaseLayoutControl', 'React栅格布局', '用于内容布局的控件，支持自定义布局，内容拖拽，大小改变等')
@reactControl(ReactGridLayout)
export class ReactGridLayoutControl extends BaseLayoutControl implements IResizeable, ILayoutable {
    /**
     * 基础布局控件
     * @param layouts 布局信息，默认对应栅格 lg: 12, md: 10, sm: 6, xs: 4, xxs: 2
     * @param breakpoints 尺寸节点信息，默认对应屏幕宽度尺寸 lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0
     * @param childControls 内容控件
     */
    constructor(
        public layouts: Layouts,
        public breakpoints?: { [P: string]: number },
        childControls?: BaseReactElementControl[]) {
        super(childControls);
    }
    /** 事件：处理布局信息 */
    handleLayoutChange?= (layouts: Layouts) => {
        this.fire!(LayoutableEvent.HandleLayout, this, layouts);
    }
    /** 事件：调整布局 */
    onChangeLayouts?= (change: boolean) => {
        this.fire!(LayoutableEvent.ChangeLayouts, this, change);
    }
    /** 事件：重置大小 */
    onResize?= (args: ResizeEventArgs) => {
        this.fire!(ResizeEvent.Resize, this, args);
    }
}