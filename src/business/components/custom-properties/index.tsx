import { BaseReactElementState, BaseReactElement, reactControl, BaseReactElementControl, CommonIcon } from "pao-aop-client";

import React from "react";

import { addon } from "pao-aop";
import { NTInput } from "../input/index";
import { NTSelect } from "../select/index";
import { NTButton } from "../button/index";
import { FileUploadBtn } from "../file-operation-btn/file-upload-btn/index";
import { UploadFile } from "antd/lib/upload/interface";
import TextArea from "antd/lib/input/TextArea";
import NTRow from "src/business/style-components/row";
import NTCol from "src/business/style-components/col";

const select_data = [{ id: 1, value: "普通数据" }, { id: 2, value: "多行文本" }, { id: 3, value: "图片数据" }, { id: 4, value: "URL数据" }, { id: 5, value: "邮箱数据" }, { id: 6, value: "电话数据" }, { id: 7, value: "标识码引用" }, { id: 8, value: "IP数据" }];
/**
 * 组件：自定义属性控件状态
 */
export interface CustomPropertiesState extends BaseReactElementState {
    // /** 组件集合 */
    // comps?: any;
    /** 组件值的集合 */
    comps_value?: any;
}

/**
 * 组件：自定义属性控件
 */
export class CustomProperties extends BaseReactElement<CustomPropertiesControl, CustomPropertiesState> {
    static getDerivedStateFromProps(nextProps: any, state: any) {
        // Should be a controlled component.
        if ('value' in nextProps && state.comps_value.length === 0) {
            return {
                // comps: [...(nextProps.value || [])],
                comps_value: [...(nextProps.value || [])]
            };
        }
        return null;
    }

    constructor(props: CustomPropertiesControl) {
        super(props);
        this.state = {
            // comps: this.props.value ? this.props.value : [],
            comps_value: this.props.value ? this.props.value : []
        };
    }

    /** 选择框内容变更方法 */
    selectDataChange = (e: any, index: number) => {
        const type = e;
        let comps_value = this.state.comps_value;
        // if (!('value' in this.props)) {
        let title = comps_value![index][this.props.before_key!];
        comps_value![index] = { [this.props.type_key!]: type, [this.props.before_key!]: title, [this.props.after_key!]: null };
        this.setState({
            comps_value: comps_value
        });
        // }
        this.triggerChange(comps_value);
    }
    /** 前置输入框内容变更方法 */
    handleTitleChange = (e: any) => {
        const title = e.target.value;
        let comps_value = this.state.comps_value;
        // if (!('value' in this.props)) {
        let type = comps_value![e.target.name][this.props.type_key!];
        let contents = comps_value![e.target.name][this.props.after_key!];
        comps_value![e.target.name] = { [this.props.type_key!]: type, [this.props.before_key!]: title, [this.props.after_key!]: contents };
        this.setState({
            comps_value: comps_value
        });
        // }
        this.triggerChange(comps_value);
    }
    /** 后置输入框内容变更方法 */
    handleContentsChange = (e: any) => {
        const contents = e.target.value;
        let comps_value = this.state.comps_value;
        // if (!('value' in this.props)) {
        let type = comps_value![e.target.name][this.props.type_key!];
        let title = comps_value![e.target.name][this.props.before_key!];
        comps_value![e.target.name] = { [this.props.type_key!]: type, [this.props.before_key!]: title, [this.props.after_key!]: contents };
        this.setState({
            comps_value: comps_value
        });
        // }
        this.triggerChange(comps_value);
    }
    /** 图片上传按钮内容变更方法 */
    fileUploadBtnOnChange = (e: any, index: number) => {
        // console.log('outOnchang', e);
        let comps_value = this.state.comps_value;
        // if (!('value' in this.props)) {
        let type = comps_value![index][this.props.type_key!];
        let title = comps_value![index][this.props.before_key!];
        comps_value![index] = { [this.props.type_key!]: type, [this.props.before_key!]: title, [this.props.after_key!]: e };
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
    /** 删除按钮方法 */
    onClickDel = (index: number) => {
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
    /** 上移按钮方法 */
    onClickMoveUp = (index: number) => {
        // let comps = this.state.comps;
        // let this_comp = comps![index];
        // comps!.splice(index, 1);
        // comps!.splice(index - 1, 0, this_comp);
        let comps_value = this.state.comps_value;
        let this_comp_value = comps_value![index];
        comps_value!.splice(index, 1);
        comps_value!.splice(index - 1, 0, this_comp_value);
        this.setState({
            // comps: comps,
            comps_value: comps_value
        });
        console.log('comps_value', comps_value);
    }
    /** 下移按钮方法 */
    onClickMoveDown = (index: number) => {
        // let comps = this.state.comps;
        // let this_comp = comps![index];
        // comps!.splice(index, 1);
        // comps!.splice(index + 1, 0, this_comp);
        let comps_value = this.state.comps_value;
        let this_comp_value = comps_value![index];
        comps_value!.splice(index, 1);
        comps_value!.splice(index + 1, 0, this_comp_value);
        this.setState({
            // comps: comps,
            comps_value: comps_value
        });
        console.log('comps_value', comps_value[1].value);
    }
    /** 添加类目按钮方法 */
    handleAdd = () => {
        this.setState({
            // comps: this.state.comps!.concat([Date.now()]),
            comps_value: this.state.comps_value!.concat([{ [this.props.type_key!]: 1, [this.props.before_key!]: '', [this.props.after_key!]: null }])
        });
    }
    /** 组装上传图片列表方法 */
    fileList = (index: number) => {
        let list = this.state.comps_value ? this.state.comps_value[index][this.props.after_key!] : []; //
        let arr: Array<UploadFile> = [];
        if (list) {
            for (let i = 0; i < list!.length; i++) {
                arr.push({ "uid": (i - 1).toString(), "name": "xxx.png", 'size': 1, "status": "done", "type": "draw", "url": list![i] });
            }
        }
        return arr;
    }

    render() {
        let { befor_placeholder, after_placeholder, upload_action, upload_amount, beforeUpload } = this.props;
        const { comps_value } = this.state;// comps
        // debugger;
        return (
            <div>
                {comps_value!.map((row: any, index: number) => {
                    return (
                        <div key={index}>
                            <NTRow.NTSmartRow>
                                {/* <Row type="flex" gutter={24} style={{ flex: 1, marginLeft: 0, marginRight: 0, padding: '12px 0' }}> */}
                                {/* <Col xl={6} lg={6} md={6} sm={24} xs={24} style={{ display: 'flex', padding: '0', alignItems: 'center' }}> */}
                                <NTCol.NTSituationFiveCol>
                                    <NTInput
                                        height='small'
                                        radius='inputDefault'
                                        placeholder={befor_placeholder}
                                        default_value={comps_value ? comps_value[index][this.props.before_key!] : ''}
                                        value={comps_value ? comps_value[index][this.props.before_key!] : ''}
                                        name={index.toString()}
                                        onChange={this.handleTitleChange}
                                    />
                                    <span style={{ marginLeft: '5px', fontSize: '18px', fontWeight: 'bold' }}>：</span>
                                </NTCol.NTSituationFiveCol>

                                {/* </Col> */}
                                {/* <Col xl={4} lg={4} md={4} sm={24} xs={24} style={{ display: 'flex', alignItems: 'center', width: '140px' }}> */}
                                <NTCol.NTSituationSixCol>
                                    <NTSelect
                                        defaultValue={comps_value && comps_value[index][this.props.type_key!] ? select_data[comps_value[index][this.props.type_key!] - 1].value : ''}
                                        value={comps_value && comps_value[index][this.props.type_key!] ? select_data[comps_value[index][this.props.type_key!] - 1].value : ''}
                                        data={select_data}
                                        onChange={e => { this.selectDataChange(e, index); }}
                                    />
                                </NTCol.NTSituationSixCol>

                                {/* </Col> */}
                                {/* <Col xl={11} lg={11} md={11} sm={24} xs={24} style={{ display: 'flex' }}> */}
                                <NTCol.NTSituationSeveneCol>
                                    {
                                        comps_value![index][this.props.type_key!] === 3 ?
                                            <div id={'key' + index} style={{ width: '100%' }}>
                                                <FileUploadBtn
                                                    list_type='picture-card'
                                                    contents='plus'
                                                    action={upload_action} // 以后改成真实的服务地址
                                                    value={this.state.comps_value ? this.state.comps_value[index][this.props.after_key!] : []}
                                                    // files={this.fileList(index)}
                                                    onChange={e => { this.fileUploadBtnOnChange(e, index); }}
                                                    upload_amount={upload_amount}
                                                    beforeUpload={beforeUpload}
                                                />
                                            </div>
                                            : null
                                    }
                                    {
                                        comps_value![index][this.props.type_key!] === 2 ?
                                            <TextArea
                                                placeholder={after_placeholder}
                                                autosize={{}}
                                                defaultValue={comps_value ? comps_value[index][this.props.after_key!] : ''}
                                                value={comps_value ? comps_value[index][this.props.after_key!] : ''}
                                                name={index.toString()}
                                                onChange={this.handleContentsChange}
                                            />
                                            : null
                                    }
                                    {
                                        comps_value![index][this.props.type_key!] !== 2 && comps_value![index][this.props.type_key!] !== 3 ?
                                            <NTInput
                                                height='small'
                                                radius='inputDefault'
                                                placeholder={after_placeholder}
                                                default_value={comps_value ? comps_value[index][this.props.after_key!] : ''}
                                                value={comps_value ? comps_value[index][this.props.after_key!] : ''}
                                                name={index.toString()}
                                                onChange={this.handleContentsChange}
                                            />
                                            : null
                                    }
                                </NTCol.NTSituationSeveneCol>
                                {/* </Col> */}
                                {/* <Col xl={1} lg={1} md={1} sm={24} xs={24} style={{ display: 'flex', paddingRight: '0px', paddingLeft: '0px', zIndex: 1000 }}> */}
                                <NTCol.NTSituationEightCol>
                                    <CommonIcon icon={'antd@close-circle'} style={{ width: '20px', marginLeft: '10px', paddingTop: '7px' }} onClick={() => this.onClickDel(index)} />
                                    {
                                        index > 0 ?
                                            <CommonIcon icon={'antd@arrow-up'} style={{ width: '20px', marginLeft: '10px', paddingTop: '7px' }} onClick={() => this.onClickMoveUp(index)} />
                                            : null
                                    }
                                    {
                                        index !== (comps_value!.length - 1) ?
                                            <CommonIcon icon={'antd@arrow-down'} style={{ width: '20px', marginLeft: '10px', paddingTop: '7px' }} onClick={() => this.onClickMoveDown(index)} />
                                            : null
                                    }
                                </NTCol.NTSituationEightCol>
                                {/* </Col> */}
                            </NTRow.NTSmartRow>
                        </div>
                    );
                })}
                {/* <Col xl={4} lg={4} md={4} sm={24} xs={24} style={{ display: 'flex' }}> */}
                <NTCol.NTSituationNineCol>
                    <NTButton icon='plus' name='添加类目' onClick={this.handleAdd} />
                </NTCol.NTSituationNineCol>
                {/* </Col> */}
            </div>
        );
    }
}

/**
 * 控件：自定义属性控件
 * @description 控制自定义属性控件
 * @author yzy
 */
@addon('CustomProperties', '自定义属性控件', '控制自定义属性控件')
@reactControl(CustomProperties)
export class CustomPropertiesControl extends BaseReactElementControl {
    /** 前置输入框提示语 */
    befor_placeholder?: string;
    /** 后置输入框提示语 */
    after_placeholder?: string;
    /** 类型选择框字段名 */
    type_key?: string;
    /** 前置输入框字段名 */
    before_key?: string;
    /** 后置输入框字段名 */
    after_key?: string;
    /** 上传地址服务 */
    upload_action?: string;
    /** 上传前回调方法 */
    public beforeUpload?: (file: File) => boolean;
    /** 上传文件限制数量 */
    public upload_amount?: number;
    constructor() {
        super();
    }
}