import { BaseReactElementState, BaseReactElement, reactControl, BaseReactElementControl } from "pao-aop-client";

import React from "react";

import { addon } from "pao-aop";
import { NTButton } from "../button/index";

/**
 * 组件：胎压详情页面报表布局控件状态
 */
export interface ShowHideLayoutState extends BaseReactElementState {
    /** 内容是否显示 */
    display?: 'none' | 'block';
    /** 按钮是否显示 */
    bt_display?: 'none' | 'block';
}

/**
 * 组件：胎压详情页面报表布局控件
 * 控制胎压详情页面报表布局
 */
export class ShowHideLayout extends BaseReactElement<ShowHideLayoutControl, ShowHideLayoutState> {
    constructor(props: ShowHideLayoutControl) {
        super(props);
        this.state = {
            display: 'none',
            bt_display: 'block'
        };
    }
    /** 关上隐藏的内容 */
    onchange = () => {
        if (this.state.display === 'block') {
            this.setState(
                {
                    display: 'none',
                    bt_display: 'block',
                }
            );
        } else {
            this.setState(
                {
                    display: 'block',
                    bt_display: 'none',
                }
            );
        }

    }
    render() {
        let { title_name, close_name, content_control } = this.props;
        return (
            <div style={{ width: '100%' }}>
                <div style={{ display: this.state.bt_display }} >
                    <NTButton radius='radius50' name={title_name} onClick={this.onchange} />
                </div>
                <div style={{ display: this.state.display, width: '100%', background: '#ffffff' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '600px' }}>
                        <div style={{ flex: 1, display: 'flex', position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', fontSize: '20px', fontWeight: 'bold' }}>{title_name}</div>
                            <div style={{ position: 'absolute', bottom: '10%', right: '5%', fontSize: '12px', fontWeight: 'bold' }} onClick={this.onchange}>{close_name}</div>
                        </div>
                        <div style={{ flex: 9, display: 'flex', position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
                            {content_control!.createElement!()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * 控件：胎压详情页面报表布局控件
 * 控制胎压详情页面报表布局
 */
@addon('ShowHideLayout', '胎压详情页面报表布局控件', '控制胎压详情页面报表布局')
@reactControl(ShowHideLayout)
export class ShowHideLayoutControl extends BaseReactElementControl {
    /** 标题显示文本 */
    public title_name?: string;
    /** 收起显示文本 */
    public close_name?: string;
    /** 显示内容控件 */
    public content_control?: BaseReactElementControl;
    constructor() {
        super();
    }
}