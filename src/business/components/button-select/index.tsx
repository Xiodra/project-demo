// @ts-nocheck
import { BaseReactElementState, reactControl, BaseReactElementControl, BaseReactElement } from "pao-aop-client";
import React from "react";
import { addon } from "pao-aop";
import './index.less';
// import { Button } from "antd";

/**
 * 组件：按钮选择器组件状态
 */
export interface NTButtonSelectState extends BaseReactElementState {
    // 选择的值数组
    valueList: any[];
    // 所有value
    allValue?: any[];
    // 是否选择全部
    isALL?: boolean;
}
/**
 * 组件：按钮选择器
 */
export class NTButtonSelect extends BaseReactElement<NTButtonSelectControl, NTButtonSelectState> {
    constructor(props: NTButtonSelectControl) {
        super(props);
        this.state = {
            valueList: this.props.default_value ? this.props.default_value : [],
            allValue: [],
            isALL: false
        };
        if (this.props.default_value) {
            this.props.onChange(this.state.valueList);
        }
    }
    /** 值改变事件 */
    onChange = (value: any) => {
        let list = this.state.valueList;
        if (value.indexOf('--') > -1) {
            if (value === '--allBtn') {
                this.setState(
                    {
                        valueList: []
                    },
                    () => {
                        this.setValue();
                    });
                return;
            } else {
                if (this.props.is_single) {
                    let val = value.split('--')[1];
                    let single_list = [];
                    single_list.push(val);
                    this.setState(
                        {
                            valueList: single_list
                        },
                        () => {
                            this.setValue();
                        });
                } else {
                    let val = value.split('--')[1];
                    let index = list.indexOf(val);
                    if (index > -1) {
                        list.splice(index, 1);
                    }
                    this.setState(
                        {
                            valueList: list
                        },
                        () => {
                            this.setValue();
                        });
                }
            }
        } else {
            if (value === 'allBtn') {
                this.setState(
                    {
                        valueList: this.state.allValue!.slice()
                    },
                    () => {

                        this.setValue();

                    });

                return;

            } else {
                if (this.props.is_single) {
                    let single_list = [];
                    single_list.push(value);
                    this.setState(
                        {
                            valueList: single_list
                        },
                        () => {
                            this.setValue();
                        });
                } else {
                    list.push(value);
                    this.setState(
                        {
                            valueList: list
                        },
                        () => {
                            this.setValue();
                        });
                }
            }
        }

    }
    /** 设置值 */
    setValue = () => {
        this.setState({ isALL: this.state.valueList.length === this.state.allValue!.length ? true : false });
        this.props.onChange(this.state.valueList);
    }
    /**
     * 获取所有value
     */
    allValues = (value: any) => {
        if (!value) {
            return;
        }
        let allValue = this.state.allValue!;
        allValue.push(value);
        this.setState({
            allValue
        });
    }
    render() {
        const childrenWithProps = React.Children.map(this.props.children, child => React.cloneElement(
            // @ts-ignore
            child,
            {
                onChange: this.onChange,
                returnValue: this.allValues,
                isAll: this.state.isALL,
                valueList: this.state.valueList
            }
        ));
        return (
            <div className='default-button-select'>
                {childrenWithProps}
            </div>
        );
    }
}

/**
 * 控件：按钮选择器控件
 * 
 */
@addon('NTButtonSelect', '按钮选择器', '按钮选择器')
@reactControl(NTButtonSelect)
export class NTButtonSelectControl extends BaseReactElementControl {
    /** 
     * 选择事件
     */
    public onChange?: any;
    /** 是否显示全部按钮 */
    public all_btn?: boolean;
    /** 是否单选 */
    public is_single?: boolean;
    /** 初始选中值(并返回选中value数组) */
    public default_value?: string[];
    constructor() {
        super();
    }
}