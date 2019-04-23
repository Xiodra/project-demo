import { ReactViewControl, ReactView, ReactViewState, reactControl } from "pao-aop-client";
import React from "react";
import { addon, Ref, getObject } from "pao-aop";
import { HomeObject, IHomeService } from "src/models/home";
import { message } from "antd";

/** 状态：主页 */
export interface HomeViewState extends ReactViewState {
    home?: HomeObject;
}

/** 组件：主页 */
export class HomeView extends ReactView<HomeViewControl, HomeViewState> {
    /** 主页服务 */
    homeService?() {
        return getObject(this.props.homeService_Fac!);
    }

    constructor(props: HomeViewControl) {
        super(props);
        this.state = {
            home: new HomeObject()
        };
    }
    componentDidMount() {
        this.homeService!()!
            .home!()!
            .then(home => this.setState({ home }))
            .catch(error => {
                message.error(error.message);
            });
    }
    render() {
        return (
            <div>
                {this.state.home!.title}
            </div>);
    }
}

/**
 * 控件：主页控制器
 * @description 主页
 */
@addon('HomeView', '主页', '主页')
@reactControl(HomeView, true)
export class HomeViewControl extends ReactViewControl {
    /** 主页服务 */
    public homeService_Fac?: Ref<IHomeService>;
}