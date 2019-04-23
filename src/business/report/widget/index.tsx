/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 项目: 红网（Red Web）
 * 
 * 创建日期: Wed, 2018-03-21 6:15:26 pm
 * 作者: 胡燕龙（huyl） (y.dragon.hu@hotmail.com)
 * 
 * 说明: 
 * 1. 容器功能组件实现
 * 2. 卡片式组件实现
 * 
 * 版权: Copyright © 2017 - 2018
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Card, Skeleton } from 'antd';
import { ResizeEvent, ResizeEventArgs, IResizeable } from '../../report/events';
import { addon, log } from 'pao-aop';
import { reactControl, BaseReactElementControl, CommonIcon } from 'pao-aop-client';
import './index.less';

/**
 * 状态：基础容器控件（卡片式）
 */
export interface CommontContainerState {
    /** 加载中 */
    loading?: boolean;
    /** 标题元素 */
    titleElement?: JSX.Element;
    /** 工具条元素 */
    optionElement?: JSX.Element;
    /** 内容元素 */
    contentElement?: JSX.Element;
}

/**
 * 组件：基础容器控件（卡片式）
 */
export class CommonContainer extends React.Component<CommonContainerControl, CommontContainerState> {
    dom?: Element | Text | any;
    constructor(props: CommonContainerControl) {
        super(props);
        this.state = {
            loading: true
        };
    }
    /** 事件：加载前 */
    componentWillMount() {
        const { clearEventHandler, addEventHandler, control, containerTitle, options } = this.props;
        {
            // 事件清空及初始化
            clearEventHandler!(ResizeEvent.Resize);
            addEventHandler!(ResizeEvent.Resize, (sender: any, args: ResizeEventArgs) => {
                if ((this.props.control! as any).onResize && this.props.control!.id === args.id) {
                    const headerDom = (this.dom as Element).getElementsByClassName("ant-card-head")[0],
                        bodyDom = (this.dom as Element).getElementsByClassName("ant-card-body")[0];
                    // 计算内容区域大小
                    // 高度 = 总 - 头部 - border - marging - padding
                    // 宽度 = 总 - border - marging - padding 
                    const header = this.props.title ? $(headerDom).outerHeight(true) : 0,
                        h = $(bodyDom).outerHeight(true)! - $(bodyDom).height()!,
                        w = $(bodyDom).outerWidth(true)! - $(bodyDom).width()!;
                    args.height = args.height! - h - header!;
                    args.width = args.width! - w;
                    log("Widget", `Resize w:${args.width} h:${args.height}`);
                    (control! as any).onResize(args);
                }
            });
        }
        {
            // 设置卡片容器标题，工具条，内容等元素
            const
                titleElement = containerTitle ? containerTitle.createElement!() : null,
                optionElement = options ? options.createElement!() : null,
                contentElement = control ? control.createElement!() : <Skeleton />;
            this.setState({ titleElement, optionElement, contentElement });
        }
    }
    /** 事件：加载完成 */
    componentDidMount() {
        this.setState({
            loading: false
        });
    }
    render() {
        return (
            <Card
                ref={ref => this.dom = ReactDOM.findDOMNode(ref!)}
                title={this.state.titleElement}
                extra={this.state.optionElement}
                style={{ height: '100%', width: '100%' }}
                className={"common-container"}
            >
                {this.state.contentElement}
            </Card>
        );
    }
}

/**
 * 控件：基础容器控件（卡片式）
 */
@addon('CommonContainerControl', '基础容器控件', '最基础的卡片容器，可承载文字、列表、图片、段落')
@reactControl(CommonContainer)
export class CommonContainerControl extends BaseReactElementControl implements IResizeable {
    /**
     * 基础容器控件
     * @param title 容器标题
     * @param control 容器内容控件
     * @param options 容器操作
     */
    constructor(
        public containerTitle?: BaseReactElementControl,
        public control?: BaseReactElementControl,
        public options?: BaseReactElementControl) {
        super();
    }
    /** 事件：重置大小 */
    onResize?= (args: ResizeEventArgs) => {
        this.fire!(ResizeEvent.Resize, this, args);
    }
}

/**
 * 组件：基础标题控件
 * @param props 
 */
export function CommonTitle(props: CommonTitleControl) {
    const icon = <CommonIcon icon={props.icon} />;
    return <span>{icon}{props.title}</span>;
}

/**
 * 控件：基础标题控件
 */
@addon('CommonTitleControl', '基础标题控件', '包含图标及标题的控件')
@reactControl(CommonTitle)
export class CommonTitleControl extends BaseReactElementControl {

    /**
     * 基础标题控件
     * @param title 标题
     * @param icon 图标
     */
    constructor(
        public title?: string,
        public icon?: string) {
        super();
    }
}