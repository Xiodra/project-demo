import { addon } from "pao-aop";
import { BaseReactElementControl } from "pao-aop-client";

/**
 * 插件：基础布局控件
 * @description 基础布局控件
 */
@addon('BaseLayoutControl', '基础布局控件', '基础布局控件')
export class BaseLayoutControl extends BaseReactElementControl {
    /**
     * 插件：基础布局控件
     * @param controls 子控件列表
     */
    constructor(public childControls?: BaseReactElementControl[]) {
        super();
    }
}