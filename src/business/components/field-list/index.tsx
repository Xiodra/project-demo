import { BaseReactElementState, BaseReactElement, reactControl, BaseReactElementControl, CommonIcon } from "pao-aop-client";

import React from "react";

import { addon } from "pao-aop";
import { NTInput } from "../input/index";
import NTRow from "src/business/style-components/row";
import NTCol from "src/business/style-components/col";

/**
 * 组件：字段列表控件状态
 */
export interface FieldListState extends BaseReactElementState {
    /** 组件集合 */
    // comps?: any;
    /** 组件值的集合 */
    comps_value?: any;
}

/**
 * 组件：字段列表控件
 */
export class FieldList extends BaseReactElement<FieldListControl, FieldListState> {
    static getDerivedStateFromProps(nextProps: any, state: any) {
        // Should be a controlled component.
        if ('value' in nextProps && state.comps_value.length === 1) {
            return {
                comps_value: [...(nextProps.value || [{ [nextProps.before_key!]: '' }])]
            };
        }
        return null;
    }
    constructor(props: FieldListControl) {
        super(props);
        this.state = {
            // comps: this.props.value ? this.props.value : [Date.now()],
            comps_value: this.props.value ? this.props.value : [{ [this.props.before_key!]: '' }]
        };
    }
    // componentWillMount() {
    //     // 有初始化值时，先把value赋值到comps_value数组
    //     this.setState({
    //         comps_value: this.props.value
    //     });
    // }
    /** 内容变更方法 */
    handleTitleChange = (e: any) => {
        const title = e.target.value;
        let comps_value = this.state.comps_value;
        // if (!('value' in this.props)) {
        comps_value![e.target.name] = { [this.props.before_key!]: title };
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
            // onChange(Object.assign({}, this.state, changedValue));
            onChange(changedValue);
        }
    }
    /** 操作行按钮方法 */
    onClickHandle = (index: number) => {
        console.log('this');
        if (index === 0) {
            this.setState({
                // comps: this.state.comps!.concat([Date.now()]),
                comps_value: this.state.comps_value!.concat([{ [this.props.before_key!]: '' }])
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
        let { befor_placeholder } = this.props;
        const { comps_value } = this.state;
        return (
            <div>
                {comps_value!.map((row: any, index: number) => {
                    return (
                        <div key={index}>
                            {/* <Row type="flex" gutter={24} style={{ flex: 1, marginLeft: 0, marginRight: 0, marginBottom: 12 }}> */}
                            <NTRow.NTSmartRow>
                                {/* <Col xl={22} lg={22} md={22} sm={24} xs={24} style={{ display: 'flex' }}> */}
                                <NTCol.NTSituationElevenCol>
                                    <NTInput
                                        height='small'
                                        radius='inputDefault'
                                        placeholder={befor_placeholder}
                                        default_value={comps_value ? comps_value[index][this.props.before_key!] : ''}
                                        value={comps_value ? comps_value[index][this.props.before_key!] : ''}
                                        name={index.toString()}
                                        onChange={this.handleTitleChange}
                                    />
                                </NTCol.NTSituationElevenCol>
                                {/* </Col> */}
                                {/* <Col xl={2} lg={2} md={2} sm={24} xs={24} style={{ display: 'flex', flex: 1, justifyContent: 'start', alignItems: 'center' }}> */}
                                <NTCol.NTSituationElevenCol>
                                    <CommonIcon icon={index === 0 ? 'antd@plus-circle' : 'antd@delete'} style={{ width: '20px', marginLeft: '0px', paddingTop: '7px' }} onClick={() => this.onClickHandle(index)} />
                                </NTCol.NTSituationElevenCol>

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
 * 控件：字段列表控件
 * @description 控制字段列表控件
 * @author yzy
 */
@addon('FieldList', '字段列表控件', '控制字段列表控件')
@reactControl(FieldList)
export class FieldListControl extends BaseReactElementControl {
    /** 前置输入框提示语 */
    befor_placeholder?: string;
    /** 前置输入框字段名 */
    before_key?: string;
    constructor() {
        super();
    }
}