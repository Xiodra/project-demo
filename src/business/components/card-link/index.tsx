import { BaseReactElementState, reactControl, BaseReactElementControl, BaseReactElement } from "pao-aop-client";
import React from "react";
import { addon } from "pao-aop";
import { Card } from "antd";

/**
 * 组件：卡片链接组件状态
 */
export interface NTCardLinkState extends BaseReactElementState {
}

/**
 * 组件：卡片链接
 */
export class NTCardLink extends BaseReactElement<NTCardLinkControl, NTCardLinkState> {
    render() {
        let { href, title, children, card_size } = this.props;
        let cardWidth = '', cardHeight = '';
        switch (card_size) {
            case 'large':
                cardWidth = '450px';
                cardHeight = '210px';
                break;
            case 'default':
                cardWidth = '380px';
                cardHeight = '158px';
                break;
            case 'small':
                cardWidth = '300px';
                cardHeight = '128px';
                break;
            default:
                cardWidth = '380px';
                cardHeight = '158px';
                break;
        }
        return (
            <div onClick={() => { if (href) { this.props.history!.push(href!); } }} style={{ height: cardHeight, width: cardWidth, display: 'inline-block', }}>
                <Card title={title}>
                    {children}
                </Card>
            </div>
        );
    }
}

/**
 * 控件：卡片链接控件
 * 
 */
@addon('NTCardLink', '卡片链接控件', '控制卡片链接')
@reactControl(NTCardLink)
export class NTCardLinkControl extends BaseReactElementControl {
    /** 跳转链接 */
    public href?: string;
    /**
     * 卡片头部
     */
    public title?: string;
    /**
     * 大小
     */
    public card_size?: 'large' | 'default' | 'small' = 'default';
    constructor() {
        super();
    }
}