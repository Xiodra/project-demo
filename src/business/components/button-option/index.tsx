import { BaseReactElementState, reactControl, BaseReactElementControl, BaseReactElement } from "pao-aop-client";
import React from "react";
import { addon } from "pao-aop";
import './index.less';
// import { Button } from "antd";

/**
 * 组件：按钮选择器选项组件状态
 */
export interface NTButtonOptionState extends BaseReactElementState {
    /** 是否选中 */
    isActive?: boolean;
}

/**
 * 组件：按钮选择器选项
 */
export class NTButtonOption extends BaseReactElement<NTButtonOptionControl, NTButtonOptionState> {
    constructor(props: NTButtonOptionControl) {
        super(props);
        this.state = {
            isActive: false
        };
    }
    click = () => {
        let { onChange, allBtn, } = this.props;
        console.info(this.state.isActive);
        // 判断如果按钮是选中状态
        if (this.state.isActive) {
            if (allBtn) {
                this.setState({
                    isActive: !this.state.isActive
                });
                onChange('--allBtn');
                return;
            }
            onChange('--' + this.props.value);
        } else {
            if (allBtn) {
                this.setState(
                    {
                        isActive: !this.state.isActive
                    });

                onChange('allBtn');
                return;
            }
            onChange(this.props.value);
        }
    }
    componentDidMount() {
        let { returnValue } = this.props;
        returnValue(this.props.value);
    }
    componentWillReceiveProps() {
        let { valueList, value, allBtn, isAll } = this.props;
        if (valueList!.indexOf(value) > -1) {
            this.setState({
                isActive: true
            });
        } else {
            if (!allBtn) {
                this.setState({
                    isActive: false
                });
            }
            if (!isAll && allBtn) {
                this.setState({
                    isActive: false
                });
            }

        }
    }
    render() {
        let { text } = this.props;
        return (
            <div className={this.state.isActive || this.props.isAll ? ' button-select-active button-select botton_option' : 'button-select botton_option'} onClick={this.click} >
                {text}
            </div>
        );
    }
}

/**
 * 控件：按钮选择器控件
 * 
 */
@addon('NTButtonOption', '按钮选择器选项', '按钮选择器选项')
@reactControl(NTButtonOption)
export class NTButtonOptionControl extends BaseReactElementControl {
    /** 
     * 选择事件
     */
    public onChange?: any;

    /**
     * 文本
     */
    public text?: string;

    /**
     * 值
     */
    public value?: any;

    /**
     * 获取vallue
     */
    public returnValue?: any;

    /**
     * 是否选择全部
     */
    public isAll?: boolean;

    /** 全部按钮 */
    public allBtn?: boolean = false;

    /** 选中的值 */
    public valueList?: any[];
    constructor() {
        super();
    }
}