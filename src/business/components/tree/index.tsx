import { BaseReactElementState, BaseReactElement, reactControl, BaseReactElementControl } from "pao-aop-client";

import React from "react";

import { addon } from "pao-aop";
import { Tree } from "antd";
const { TreeNode } = Tree;
export interface itemVal {
    key: string;
    title: string;
    children?: itemVal[];
}
/**
 * 组件：树形组件状态
 */
export class NTTreeState implements BaseReactElementState {
}

/**
 * 组件：树形组件
 */
export class NTTree extends BaseReactElement<NTTreeControl, NTTreeState> {
    onSelect = (selectedKeys: any, info: any) => {
        console.log('selected', selectedKeys, info);
    }

    onCheck = (checkedKeys: any, info: any) => {
        console.log('onCheck', checkedKeys, info);
    }

    render() {
        let { onSelect, onCheck, data, defaultExpandedKeys, defaultSelectedKeys, defaultCheckedKeys } = this.props;
        // 递归每一个tree的children,返回树节点试图
        let loop: any = (data: any[]) => data.map((item: itemVal) => {
            if (item.children && item.children.length) {
                return <TreeNode key={item.key} title={item.title}>{loop(item.children)}</TreeNode>;
            }
            return <TreeNode key={item.key} title={item.title} />;
        });
        return (
            <div>
                <Tree
                    checkable={true}
                    defaultExpandedKeys={defaultExpandedKeys}
                    defaultSelectedKeys={defaultSelectedKeys}
                    defaultCheckedKeys={defaultCheckedKeys}
                    onSelect={onSelect}
                    onCheck={onCheck}
                >
                    {loop(data)}
                </Tree>
            </div>
        );
    }
}

/**
 * 控件：树形组件控制器
 * @description 描述
 * @author lyx
 */
@addon('NTTree', '树形组件', '树形组件')
@reactControl(NTTree)
export class NTTreeControl extends BaseReactElementControl {
    // 数据源
    data?: itemVal[];
    // 点击每一项前面的选择框时候事件
    onSelect?: () => void;
    // 点击每一项时候事件
    onCheck?: () => void;
    // 默认展开的key项
    defaultExpandedKeys?: any[];
    // 默认选择框选中的项
    defaultSelectedKeys?: any[];
    // 默认点击了的项
    defaultCheckedKeys?: any[];
    constructor() {
        super();
    }
}