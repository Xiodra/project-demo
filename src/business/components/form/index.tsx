import { addon } from "pao-aop";
import { BaseReactElementControl } from "pao-aop-client";
import { WrappedFormUtils } from "antd/lib/form/Form";

/**
 * 控件：基础表单
 */
@addon('BaseFormControl', '基础表单', '基础表单控件')
export class BaseFormControl extends BaseReactElementControl {
    /** 
     * 表单
     * @description 由Form组件定义，无须赋值，组件可以直接访问，但组件必须通过Form.create()方法定义
     */
    form: WrappedFormUtils;
}