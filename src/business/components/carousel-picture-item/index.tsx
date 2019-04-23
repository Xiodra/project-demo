import React from "react";
import { BaseReactElementControl, reactControl } from "pao-aop-client";
import { addon } from "pao-aop";

// 样式
import './index';
import NTDivStyle from "src/business/style-components/div-style";

/**
 * 组件：图片轮播项状态
 */
export class CarouselPictureItemState {
}

/**
 * 组件：图片轮播项
 * 描述 图片轮播项组件
 */
export class CarouselPictureItem extends React.Component<CarouselPictureItemControl, CarouselPictureItemState> {
    constructor(props: CarouselPictureItemControl) {
        super(props);
    }
    render() {
        let { pc_img_url, mobile_img_url, title, titleAble, mobile, title_onclick } = this.props;
        return (
            // <div style={{ height: '100%', width: '100%' }}>
            <NTDivStyle.NTDefaultDiv>
                {
                    !mobile ?
                        // <div className="nt-carousel-picture-item" style={{ position: 'relative' }}>
                        <NTDivStyle.NTCarouselPictureItem>
                            <img style={{ height: '100%', width: "100%" }} src={pc_img_url} />
                            {
                                titleAble ?
                                    // <div style={{ position: 'absolute', bottom: '0px', left: '0', height: '100px', width: '100%', fontSize: '24px', background: 'rgba(0,0,0,0.5)', lineHeight: '100px', color: '#fff' }}></div>
                                    <NTDivStyle.NTMobileTitleAble>
                                        <span style={{ cursor: "pointer" }} onClick={title_onclick}>{title}</span>
                                    </NTDivStyle.NTMobileTitleAble>
                                    : ''
                            }
                        </NTDivStyle.NTCarouselPictureItem>
                        // </div>
                        :
                        <div>
                            {/* <div style={{ height: '72%', width: '100%' }}><img style={{ height: '100%', width: '100%' }} src={mobile_img_url} /></div> */}
                            <NTDivStyle.NTPCTitleAbleContent><img style={{ height: '100%', width: '100%' }} src={mobile_img_url} /></NTDivStyle.NTPCTitleAbleContent>
                            {
                                titleAble ?
                                    <NTDivStyle.NTPCTitleAble onClick={title_onclick}>{title}</NTDivStyle.NTPCTitleAble>
                                    // <div style={{ height: '28%', width: '100%' }} onClick={title_onclick}>{title}</div>
                                    : ''
                            }
                        </div>

                }
            </NTDivStyle.NTDefaultDiv>

            // </div>
        );
    }
}

/**
 * 控件：图片轮播控制器
 * 描述 用来控制图片轮播
 */
@addon('CarouselPictureItem', '图片轮播项', '图片轮播项')
@reactControl(CarouselPictureItem)
export class CarouselPictureItemControl extends BaseReactElementControl {
    /**
     * 图片url
     */
    pc_img_url?: string;

    /**
     * 手机版图片url
     */
    mobile_img_url?: string;

    /**
     * 标题
     */
    title?: string;
    /**
     * 是否手机
     */
    mobile?: boolean = false;
    /**
     * 是否显示标题
     */
    titleAble?: boolean = true;

    /**
     * 标题点击回调
     */
    title_onclick?: any;
    constructor() {
        super();
    }
}