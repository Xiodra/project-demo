import { BaseReactElementState, BaseReactElement, BaseReactElementControl, reactControl } from "pao-aop-client";
import React from "react";
import { addon } from "pao-aop";
import { Avatar } from 'antd';

/**
 * 组件：头像控件状态
 */
export interface NTAvatarState extends BaseReactElementState {
}

/**
 * 组件：头像控件
 * 描述：显示头像
 */
export class NTAvatar extends BaseReactElement<NTAvatarControl, NTAvatarState> {
    render() {
        let { img_url, shape, onClick } = this.props;
        return (
            <div onClick={onClick}>
                <Avatar shape={shape} src={img_url ? img_url : require('./img/avatar.png')} size={130} />
            </div>
        );
    }
}

/**
 * 控件：头像控件控制器
 * 描述 显示头像
 */
@addon('Avatar', '头像控件', '显示头像')
@reactControl(NTAvatar)
export class NTAvatarControl extends BaseReactElementControl {
    /** 图片url */
    public img_url?: string;
    /** 大小 */
    public img_size?: 'small' | 'medium' | 'large';
    /** 圆形或方形 */
    public shape?: 'square' | 'circle' | undefined = undefined;
}