import { BaseReactElementState, BaseReactElement, reactControl, BaseReactElementControl, CommonIcon } from "pao-aop-client";

import React from "react";

import { addon } from "pao-aop";
import { NTInput } from "../input/index";
import NTRow from "src/business/style-components/row";
import NTCol from "src/business/style-components/col";

/**
 * 组件：对象字段列表控件状态
 */
export interface ObjectFieldListState extends BaseReactElementState {
    /** 组件集合 */
    // comps?: any;
    /** 组件值的集合 */
    comps_value?: any;
}

/**
 * 组件：对象字段列表控件
 */
export class ObjectFieldList extends BaseReactElement<ObjectFieldListControl, ObjectFieldListState> {
    static getDerivedStateFromProps(nextProps: any, state: any) {
        // Should be a controlled component.
        if ('value' in nextProps && state.comps_value.length === 1) {
            return {
                comps_value: [...(nextProps.value || [{ [nextProps.before_key!]: '', [nextProps.after_key!]: '' }])]
            };
        }
        return null;
    }
    constructor(props: ObjectFieldListControl) {
        super(props);
        this.state = {
            // comps: this.props.value ? this.props.value : [Date.now()],
            comps_value: this.props.value ? this.props.value : [{ [this.props.before_key!]: '', [this.props.after_key!]: '' }]
        };
    }
    /** 内容变更方法 */
    handleTitleChange = (e: any) => {
        const title = e.target.value;
        let comps_value = this.state.comps_value;
        // if (!('value' in this.props)) {
        let contents = comps_value![e.target.name][this.props.after_key!];
        comps_value![e.target.name] = { [this.props.before_key!]: title, [this.props.after_key!]: contents };
        this.setState({
            comps_value: comps_value
        });
        // }
        this.triggerChange(comps_value);
    }
    /** 事件回调 */
    handleContentsChange = (e: any) => {
        const contents = e.target.value;
        let comps_value = this.state.comps_value;
        // if (!('value' in this.props)) {
        let title = comps_value![e.target.name][this.props.before_key!];
        comps_value![e.target.name] = { [this.props.before_key!]: title, [this.props.after_key!]: contents };
        this.setState({
            comps_value: comps_value
        });
        // }
        this.triggerChange(comps_value);
    }
    /** 事件回调 */
    triggerChange = (changedValue: any) => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(changedValue);
        }
    }
    /** 操作行按钮方法 */
    onClickHandle = (index: number) => {
        if (index === 0) {
            this.setState({
                // comps: this.state.comps!.concat([Date.now()]),
                comps_value: this.state.comps_value!.concat([{ [this.props.before_key!]: '', [this.props.after_key!]: '' }])
            });
        } else {
            // let comps = this.state.comps;
            // comps!.splice(index, 1);
            let comps_value = this.state.comps_value;
            comps_value!.splice(index, 1);
            this.setState({
                // comps: comps,
                comps_value: comps_value
            });
            this.triggerChange(comps_value);
        }
    }
    render() {
        let { befor_placeholder, after_placeholder } = this.props;
        const { comps_value } = this.state;
        return (
            <div>
                {comps_value!.map((row: any, index: number) => {
                    return (
                        <div key={index}>
                            {/* <Row type="flex" gutter={24} style={{ flex: 1, marginLeft: 0, marginRight: 0, marginBottom: 12 }}> */}
                            <NTRow.NTSmartRow>
                                {/* <Col xl={6} lg={6} md={6} sm={24} xs={24} style={{ display: 'flex' }}> */}
                                <NTCol.NTSituationThirteenCol>
                                    <NTInput
                                        height='small'
                                        radius='inputDefault'
                                        placeholder={befor_placeholder}
                                        default_value={comps_value ? comps_value[index][this.props.before_key!] : ''}
                                        value={comps_value ? comps_value[index][this.props.before_key!] : ''}
                                        name={index.toString()}
                                        onChange={this.handleTitleChange}
                                    />
                                </NTCol.NTSituationThirteenCol>

                                {/* </Col> */}
                                {/* <Col xl={16} lg={16} md={16} sm={24} xs={24} style={{ display: 'flex' }}> */}
                                <NTCol.NTSituationFourteenCol>
                                    <NTInput
                                        height='small'
                                        radius='inputDefault'
                                        placeholder={after_placeholder}
                                        default_value={comps_value ? comps_value[index][this.props.after_key!] : ''}
                                        value={comps_value ? comps_value[index][this.props.after_key!] : ''}
                                        name={index.toString()}
                                        onChange={this.handleContentsChange}
                                    />
                                </NTCol.NTSituationFourteenCol>

                                {/* </Col> */}
                                {/* <Col xl={2} lg={2} md={2} sm={24} xs={24} style={{ display: 'flex', flex: 1, justifyContent: 'start', alignItems: 'center' }}> */}
                                <NTCol.NTSituationTwelveCol>
                                    <CommonIcon icon={index === 0 ? 'antd@plus-circle' : 'antd@delete'} style={{ width: '20px', marginLeft: '0px', paddingTop: '7px' }} onClick={() => this.onClickHandle(index)} />
                                </NTCol.NTSituationTwelveCol>

                                {/* </Col> */}
                                {/* </Row> */}
                            </NTRow.NTSmartRow>
                        </div>
                    );
                })}
            </div>
        );
    }
}

/**
 * 控件：对象字段列表控件
 * @description 控制对象字段列表控件
 * @author yzy
 */
@addon('ObjectFieldList', '对象字段列表控件', '控制对象字段列表控件')
@reactControl(ObjectFieldList)
export class ObjectFieldListControl extends BaseReactElementControl {
    /** 前置输入框提示语 */
    befor_placeholder?: string;
    /** 后置输入框提示语 */
    after_placeholder?: string;
    /** 前置输入框字段名 */
    before_key?: string;
    /** 后置输入框字段名 */
    after_key?: string;
    constructor() {
        super();
    }
}