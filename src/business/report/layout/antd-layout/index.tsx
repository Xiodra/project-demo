/*
 * 版权：Copyright (c) 2018 红网
 * 
 * 创建日期：Thursday November 22nd 2018
 * 创建者：胡燕龙(huyl) - y.dragon.hu@hotmail.com
 * 
 * 修改日期: Thursday, 22nd November 2018 1:18:57 am
 * 修改者: 胡燕龙(huyl) - y.dragon.hu@hotmail.com
 * 
 * 说明
 * 		1、使用Antd的Layout、Grid组件实现的用于布局控件
 */
import { addon } from "pao-aop";
import { BaseReactElement, BaseReactElementState, reactControl, BaseReactElementControl } from "pao-aop-client";
/**
 * 组件：Antd布局控件状态
 */
export interface AntdLayoutState extends BaseReactElementState {
}

/**
 * 组件：Antd布局控件
 * 描述
 */
export class AntdLayout extends BaseReactElement<AntdLayoutControl, AntdLayoutState> {

}

/**
 * 控件：Antd布局控件控制器
 * 描述
 */
@addon('AntdLayout', 'Antd布局控件', '描述')
@reactControl(AntdLayout)
export class AntdLayoutControl extends BaseReactElementControl {
    constructor() {
        super();
    }
}