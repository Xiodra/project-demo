import React from "react";
import { BaseReactElementControl, reactControl, MobileUtility } from "pao-aop-client";
import { addon } from "pao-aop";
import { Carousel } from "antd";

import "./index.less";

/**
 * 组件：图片轮播状态
 */
export class CarouselPictureState {
}

/**
 * 组件：图片轮播
 * 描述 图片轮播组件
 */
export class CarouselPicture extends React.Component<CarouselPictureControl, CarouselPictureState> {
    constructor(props: CarouselPictureControl) {
        super(props);
    }
    render() {
        return (
            <div className={MobileUtility.isMobile ? "nt-carousel-moblie" : "nt-carousel"}>
                <Carousel autoplay={true} draggable={true} arrows={true} pauseOnHover={false} accessibility={true} autoplaySpeed={6000} >
                    {this.props.children}
                </Carousel>
            </div>

        );
    }
}

/**
 * 控件：图片轮播控制器
 * 描述 用来控制图片轮播
 */
@addon('CarouselPicture', '图片轮播', '图片轮播')
@reactControl(CarouselPicture)
export class CarouselPictureControl extends BaseReactElementControl {

    constructor() {
        super();
    }
}