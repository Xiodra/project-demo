import { BaseReactElementState, BaseReactElement, reactControl, BaseReactElementControl } from "pao-aop-client";

import React from "react";

import { addon } from "pao-aop";
import { DatePicker, List } from "antd-mobile";

/**
 * 组件：时间选择器控件状态
 */
export interface NTDatePickerState extends BaseReactElementState {
    /** 开始时间 */
    start_date?: Date;
    /** 结束时间 */
    end_date?: Date;
}

/**
 * 组件：时间选择器控件
 * 控制时间选择器控件
 */
export class NTDatePicker extends BaseReactElement<NTDatePickerControl, NTDatePickerState> {
    constructor(props: NTDatePickerControl) {
        super(props);
        this.state = {
            start_date: new Date(Date.now()),
            end_date: new Date(Date.now())
        };
    }
    /** 
     * 时间选择回调
     */
    onChange = (start_date: any) => {
        if (this.props.data_on_click) {
            this.props.data_on_click(start_date);
            this.setState({
                start_date: start_date
            });
        }
    }
    render() {
        return (
            <div>
                <DatePicker mode="date" title="选择日期" extra="Optional" value={this.state.start_date} onChange={this.onChange}>
                    <List.Item arrow="horizontal">选择日期</List.Item>
                </DatePicker>
            </div>
        );
    }
}

/**
 * 控件：时间选择器控件
 * 控制时间选择器控件
 */
@addon('NTDatePicker', '时间选择器控件', '控制时间选择器控件')
@reactControl(NTDatePicker)
export class NTDatePickerControl extends BaseReactElementControl {
    /** 时间回调 */
    public data_on_click?: (start_date: any) => void;
    constructor() {
        super();
    }
}