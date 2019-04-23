import React from "react";
import { BaseReactElementState, BaseReactElement, reactControl, BaseReactElementControl } from "pao-aop-client";
import { addon } from "pao-aop";
import { Tooltip, Icon, Avatar } from "antd";
/**
 * 组件：二维码提示控件
 */
export interface NTTooltipState extends BaseReactElementState {
}

/**
 * 组件：二维码提示控件
 */
export class NTTooltip extends BaseReactElement<NTTooltipControl, NTTooltipState> {
    render() {
        let { onClick, url } = this.props;
        url = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547639976636&di=3ccbd2843e444f250c2c8d5b18fece7f&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01d5cd554408620000019ae9f3f800.jpg%401280w_1l_2o_100sh.jpg";
        console.log(url);
        return (
            <div>
                <Tooltip placement="bottomLeft" title={<Avatar size="large" src={url} />} arrowPointAtCenter={true}>
                    <span onClick={onClick}>
                        <Icon type="qrcode" />
                    </span>
                </Tooltip>
            </div>
        );
    }
}

/**
 * 控件：二维码提示控件控制器
 * @description 二维码提示控件
 * @author 作者
 */
@addon('Tooltip', '二维码提示控件', '二维码提示控件')
@reactControl(NTTooltip)
export class NTTooltipControl extends BaseReactElementControl {
    // 点击二维码事件回调
    public onClick: any;
    // 二维码大图地址
    public url: string;
    constructor() {
        super();
    }
}