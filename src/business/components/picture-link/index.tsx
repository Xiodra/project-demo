import { BaseReactElementState, BaseReactElement, reactControl, BaseReactElementControl } from "pao-aop-client";
import React from "react";
import { addon } from "pao-aop";
import { Avatar } from "antd";
import './index.less';
import NTDivStyle from "src/business/style-components/div-style";
/**
 * 组件：图片链接控件状态
 */
export interface PictureLinkState extends BaseReactElementState {
    myonmouse: any;
}

/**
 * 组件：图片链接控件
 * 图片链接控件
 */
export class PictureLink extends BaseReactElement<PictureLinkControl, PictureLinkState> {
    constructor(props: any) {
        super(props);
        this.state = {
            myonmouse: 'onmouseenter'
        };
    }
    render() {
        let { img_url, shape, url, bottomText } = this.props;
        return (
            // <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }} onMouseOver={() => { this.myOnmouseEnter(); }} className={this.state.myonmouse} onMouseOut={() => { this.onMouseLeave(); }}>
            <NTDivStyle.NTPictureLinkContent onMouseOver={() => { this.myOnmouseEnter(); }} className={this.state.myonmouse} onMouseOut={() => { this.onMouseLeave(); }}>
                {/* <a href={url} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}> */}
                <NTDivStyle.NTPictureLinkA href={url}>
                    <Avatar shape={shape} src={img_url} size={130} />
                    <div>{bottomText}</div>
                </NTDivStyle.NTPictureLinkA>

                {/* </a> */}
            </NTDivStyle.NTPictureLinkContent>

            // </div>

        );
    }
    myOnmouseEnter() {
        this.setState({ myonmouse: 'onmouseenter' });
    }

    onMouseLeave() {
        this.setState({ myonmouse: 'onmouseleave' });
    }

}

/**
 * 控件：图片链接控件控制器
 * 图片链接控件
 */
@addon('PictureLink', '图片链接控件', '图片链接控件')
@reactControl(PictureLink)
export class PictureLinkControl extends BaseReactElementControl {
    /** 图片url */
    public img_url?: string;
    /** 大小 */
    public img_size?: 'small' | 'medium' | 'large';
    /** 圆形或方形 */
    public shape?: 'square' | 'circle' | undefined = undefined;
    /** 图片链接地址 */
    public url?: string;
    /** 图片底下文字 */
    public bottomText?: string;
    constructor() {
        super();
    }
}