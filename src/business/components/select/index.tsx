import { BaseReactElementState, BaseReactElement, BaseReactElementControl, reactControl } from "pao-aop-client";
import React from "react";
import { addon } from "pao-aop";
import { Select } from "antd";
const Option = Select.Option;
/**
 * 组件：选择器状态
 */
export interface NTSelectState extends BaseReactElementState {
    value: string;
}

/**
 * 组件：选择器
 * 描述
 */
export class NTSelect extends BaseReactElement<NTSelectControl, NTSelectState> {
    static getDerivedStateFromProps(nextProps: any) {
        // Should be a controlled component.
        if ('value' in nextProps) {
            return {
                ...(nextProps.value || {}),
            };
        }
        return null;
    }
    constructor(props: any) {
        super(props);
        this.state = {
            value: ''
        };
    }

    render() {
        let { width, data, defaultValue, onChange, value, labelInValue, placeholder } = this.props;
        return (
            <Select id="area" placeholder={placeholder} labelInValue={labelInValue} style={{ width: width ? width : '100%' }} onChange={onChange} defaultValue={defaultValue} value={value} getPopupContainer={() => document.getElementById('area')!}>
                {
                    data ?
                        data!.map((item, idx) => {
                            return (
                                <Option value={item.id} key={idx + ''}>{item.value}</Option>
                            );
                        })
                        : ''
                }
            </Select>
        );
    }
}
/**
 * 控件：选择器控制器
 * 描述
 */
@addon('NTSelect', '选择器控件', '选择器控件')
@reactControl(NTSelect)
export class NTSelectControl extends BaseReactElementControl {
    /** 选择器长度 */
    public width?: string;
    /** 选择器数据源 */
    public data: any[];
    /** 选择器默认值 */
    public defaultValue?: string | string[];
    /** 选择器切换值触发方法 */
    public onChange?: (e: any) => void;
    /** 选择器的值 */
    public value?: any;
    /** 回调是否返回对象 */
    public labelInValue?: boolean = false;
    /** 选择框默认文字 */
    placeholder?: string;
    constructor() {
        super();
    }

}