import { reactControl, BaseReactElementControl } from "pao-aop-client";
import React from "react";
import { addon } from "pao-aop";

// 样式
import './index.less';
import { Form, Row, Col, DatePicker, Input, InputNumber, Checkbox, Upload, Button } from "antd";
import { NTInput } from "src/business/components/input";
import { WrappedFormUtils, GetFieldDecoratorOptions, FormProps } from "antd/lib/form/Form";
import { NTButton } from "src/business/components/button";
import { FileUploadBtn } from "src/business/components/file-operation-btn/file-upload-btn";
import { NTSelect } from "src/business/components/select";
import { CustomProperties } from "src/business/components/custom-properties";
import { ColProps } from "antd/lib/col";
import { ObjectFieldList } from "src/business/components/object-field-list";
import { FieldList } from "src/business/components/field-list";
import { Address } from "src/business/components/address";
import { NTBraftEditor } from "../rich-text-editor/index";
import { FileUploadSingle } from "../file-upload-signle/index";
import { FormItemProps } from "antd/lib/form";
import { TitleBox } from "../title-box/index";
import TextArea from "antd/lib/input/TextArea";
import { EditBaseFrame } from "src/business/style-components/edit-base-form";
import { MaginContainer } from "src/business/style-components/margin-container/inde";

/** 多个输入框在同一行时的属性 */
type oneRowInputsProps = {
    /**
     * 表单项主题（嵌套在border上）
     */
    title?: string;
    /**
     * 是否有边框
     */
    border?: boolean;

    /**
     * 同一行的输入框属性
     */
    inputs_props?: InputProp[];
};

/** 输入框基本属性 */
export type InputProp = {
    /**
     * 输入框（包括label）所占栅格（Row中Col的span属性值），如果不赋值，默认为24，即占一行
     */
    col_span?: number;
    /**
     * 表单组项件类型
     */
    type?: InputType;
    /**
     * 表单项组件标签
     */
    label?: string;
    /**
     * 表单项（Form.Item）布局
     */
    layout?: {
        wrapperCol?: ColProps;
        labelCol?: ColProps;
    };
    /**
     * getFieldDecorator（id, option）中的option可选项
     */
    field_decorator_option?: GetFieldDecoratorOptions;
    /**
     * 表单项修饰id（getFieldDecorator的id）
     */
    decorator_id?: string;
    /**
     * 表单项属性
     */
    form_item_props?: FormItemProps;
    /**
     * 表单所用组件的基本属性
     */
    option?: any;
    /**
     * 多个表单项在同一行时，使用该属性放置同一行的表单项
     */
    one_row_inputs?: oneRowInputsProps;
};

export interface IFormProps {
    /**
     * 卡片标题
     */
    title?: string;

    /**
     * 是否需要卡片包裹
     */
    need_card?: boolean;

    /**
     * 是否有其他子组件项
     */
    childrens?: any;

    /**
     * 卡片内的输入框基本属性
     */
    input_props: InputProp[];
}

/**
 * 表单类型，用到新类型需要在此处增加，并且在枚举类型InputType中要有相应的枚举字符串存在，如upload，需要在InputType中增加"upload"
 */
const RENDER_JSX = {
    /**
     * 复选框
     */
    checkbox: (option: any) => <Checkbox {...option} />,
    /**
     * 只允许上传单个文件的组件
     */
    upload_single: (option: any) => <FileUploadSingle {...option} />,
    /**
     * 富文本编辑器
     */
    nt_rich_text: (option: any) => <NTBraftEditor {...option} />,
    /**
     * 上传组件
     */
    upload: (option: any) => <FileUploadBtn list_type={"picture-card"} contents={"plus"} {...option} />,
    /**
     * antd官方原生上传组件
     */
    antd_upload: (option: any) => <Upload {...option} />,
    /**
     * 输入框组件
     */
    input: (option: any) => <NTInput height="small" radius='inputDefault' {...option} />,
    /**
     * antd原生输入框组件
     */
    antd_input: (option: any) => <Input {...option} />,
    /**
     * antd原生数字输入框组件
     */
    antd_input_number: (option: any) => <InputNumber {...option} />,
    /**
     * 内容不可编辑的输入框组件
     */
    input_uneditable: (option: any) => <NTInput disabled={true} height="small" radius='inputDefault' {...option} />,
    /**
     * select组件
     */
    select: (option: any) => <NTSelect {...option} />,
    /**
     * 自定义类目属性
     */
    customProperties: (option: any) => <CustomProperties {...option} />,
    /**
     * 日期
     */
    date: (option: any) => <DatePicker {...option} />,
    /**
     * 图片
     */
    img: (option: any) => <img {...option} />,
    /**
     * 对象字段列表
     */
    objectFieldList: (option: any) => <ObjectFieldList {...option} />,
    /**
     * 字段列表
     */
    fieldList: (option: any) => <FieldList {...option} />,
    /**
     * 地址组件
     */
    address: (option: any) => <Address {...option} />,
    /**
     * 多行文本输入框
     */
    text_area: (option: any) => <TextArea {...option} />
};

/**
 * @param upload 上传组件
 * @param input 输入框组件
 * @param select select组件
 * @param input_uneditable 内容不可编辑的输入框组件
 * @param customProperties 自定义类目组件
 * @param img 图片
 * @param date 日期
 * @param objectFieldList 对象字段列表
 * @param fieldList 字段列表
 * @param address 地址组件
 * @param antd_input antd原生输入框组件
 * @param antd_input_number antd原生数字输入框组件
 * @param nt_rich_text 富文本编辑器 
 * @param checkbox 复选框
 * @param antd_upload antd官方原生上传组件
 * @param text_area antd多文本输入框
 */
export enum InputType {
    "upload",
    "input",
    "select",
    "input_uneditable",
    "customProperties",
    "img",
    "date",
    "objectFieldList",
    "fieldList",
    "address",
    "antd_input",
    "antd_input_number",
    "nt_rich_text",
    "checkbox",
    "antd_upload",
    "upload_single",
    "text_area"
}

/**
 * 组件：“表单生成器”状态
 */
export class FormCreatorState {
}

/**
 * 组件：表单生成器
 * 描述 表单生成器控件
 */
export class FormCreator extends React.Component<FormCreatorControl, FormCreatorState> {
    /**
     * 提交按钮回调
     */
    private handleSubmit = (e: any, submit_props?: any) => {
        e.preventDefault();
        let { form } = this.props;
        form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
            if (!err) {
                submit_props ? submit_props.cb(err, values) : null;
            }
        });
    }

    /**
     * 重置按钮回调
     */
    private handleResetBtnClick = (e: any, reset_btn_cb?: Function) => {
        e.preventDefault();
        this.props.form.resetFields();
        reset_btn_cb ? reset_btn_cb() : null;
    }

    /**
     * 其他按钮回调
     */
    private handleOthreBtnClick = (e: any, other_btn_propps_cb?: Function) => {
        e.preventDefault();
        other_btn_propps_cb ? other_btn_propps_cb() : null;
    }

    private getColFormItem = (input_prop: InputProp, key: any) => {
        const { getFieldDecorator } = this.props.form!;

        return (
            <Col span={input_prop.col_span ? input_prop.col_span : 24} key={key} >
                <Form.Item
                    label={input_prop.label}
                    {...input_prop.layout}
                    {...input_prop.form_item_props}
                >
                    {input_prop.decorator_id ?
                        getFieldDecorator<any>(input_prop.decorator_id!, input_prop.field_decorator_option)(
                            RENDER_JSX[InputType[input_prop.type!]](input_prop.option)
                        )
                        :
                        RENDER_JSX[InputType[input_prop.type!]](input_prop.option)
                    }
                </Form.Item>
            </Col>
        );
    }

    render() {
        let { form_items_props, form_props, className, submit_btn_propps, reset_btn, other_btn_propps, form_item_layout, row_btn_props } = this.props;
        return (
            <Form className={`nt-form-creator ${className}`} {...form_item_layout} {...form_props} onSubmit={(event) => this.handleSubmit(event, submit_btn_propps)}>
                {
                    form_items_props && form_items_props.length > 0 ?
                        form_items_props.map((e, i) =>
                            (
                                <EditBaseFrame title={e.title} key={i} need_card={e.need_card}>
                                    <Row gutter={30}>
                                        {
                                            e ? e.input_props.map((input_prop, i) =>
                                                // 有多个col会在一行
                                                input_prop.one_row_inputs ?
                                                    <Col span={24} key={i}>
                                                        <TitleBox title={input_prop.one_row_inputs.title} borrder={input_prop.one_row_inputs.border}>
                                                            {/* <Row style={{ position: "relative" }}>
                                                            <div className="inputs-title">{input_prop.one_row_inputs.title}</div>
                                                            <Row type={"flex"} key={i} gutter={30} style={input_prop.one_row_inputs.border ? { border: "1px solid #CCC", padding: "24px" } : undefined}> */}
                                                            {
                                                                input_prop.one_row_inputs.inputs_props!.map((one_row_input_props, i) =>
                                                                    this.getColFormItem(one_row_input_props, i)
                                                                )
                                                            }
                                                            {/* </Row>
                                                        </Row> */}
                                                        </TitleBox>
                                                    </Col>
                                                    :
                                                    this.getColFormItem(input_prop, i)
                                            )
                                                : null
                                        }
                                    </Row>
                                    {
                                        e.childrens
                                    }
                                </EditBaseFrame>
                            )
                        )
                        : null
                }
                <Row type={"flex"}  {...row_btn_props}>

                    {
                        submit_btn_propps ?
                            // <span style={{ marginLeft: "15px", marginTop: 10 }}>
                            <MaginContainer>
                                <NTButton name={submit_btn_propps.text} htmlType={"submit"} {...submit_btn_propps.btn_other_props} />
                            </MaginContainer>
                            // </span>
                            :
                            null
                    }
                    {
                        reset_btn ?
                            //  <span style={{ marginLeft: "15px", marginTop: 10 }}>
                            <MaginContainer>
                                <NTButton name={reset_btn.text} onClick={(event: any) => this.handleResetBtnClick(event, reset_btn!.cb)} {...reset_btn.btn_other_props} />
                            </MaginContainer>
                            //   </span>
                            // <Button key={i} value={other_btn.text} onClick={(event: any) => this.handleOthreBtnClick(event, other_btn!.cb)} />
                            : null
                    }
                    {
                        other_btn_propps ?
                            other_btn_propps.map((other_btn, i) =>
                                (
                                    // <span key={i} style={{ marginLeft: "15px", marginTop: 10 }}>
                                    <MaginContainer>
                                        {/* <NTButton name={other_btn.text} onClick={(event: any) => this.handleOthreBtnClick(event, other_btn!.cb)} {...other_btn.btn_other_props} /> */}
                                        <Button key={i} value={other_btn.text} onClick={(event: any) => this.handleOthreBtnClick(event, other_btn!.cb)} >{other_btn.text}</Button>
                                    </MaginContainer>
                                    // </span>
                                )
                            )
                            : null
                    }
                </Row>
            </Form>
        );
    }
}

/**
 * 控件：“表单生成器”控制器
 * 描述 表单生成器控制器
 */
@addon('FormCreator', '表单生成器', '表单生成器结构')
@reactControl(Form.create<FormCreatorControl>()(FormCreator))
export class FormCreatorControl extends BaseReactElementControl {
    /**
     * 表单
     * @description 由Form组件定义，无须赋值，组件可以直接访问，但组件必须通过Form.create()方法定义
     */
    form: WrappedFormUtils;

    /**
     * 表单布局
     */
    form_item_layout?: {
        wrapperCol?: ColProps;
        labelCol?: ColProps;
    };

    /**
     * 样式混杂表单必须配此项（即有一行一个输入框，也有一行两个输入框的混合表单）
     * 表单其他属性布局
     */
    form_props?: FormProps;

    /**
     * 样式混杂表单必须配此项（即有一行一个输入框，一行两个输入框的混合表单）
     * @param "mix-form-with-fixed-title" label固定为10em
     * @param "mix-form-without-fixed-title" label靠内容（字数）撑开
     */
    className?: "mix-form-with-fixed-title" | "mix-form-without-fixed-title";

    /**
     * 表单基本属性数组（一个form_items_props里面多个卡片，每个卡片下n个输入框）
     * demo：（实际页面demo）
     *     [title1]
     *     label1: [输入框]
     *     label2: [日期框]
     * 
     *     [title2]
     *     label3: [上传框]
     *     label4: [日期框]
     *     label5: [输入框]
     */
    form_items_props: IFormProps[];

    /**
     * 所有按钮，提交（submit_btn_propps）以及（other_btn_propps）都被包在<Row></Row>中，该属性则用在Row上
     * 即<Row {...row_btn_props}></Row>
     */
    row_btn_props?: any;

    // /**
    //  * 是否自定义校验表单，若为true，则需要自己提交回调中校验表单提交的内容
    //  */
    // enable_custom_check?: boolean;

    /**
     * 该表单提交按钮属性
     */
    submit_btn_propps?: {
        /**
         * 提交按钮文本
         */
        text: string;

        /**
         * 按钮其他属性
         */
        btn_other_props?: any;

        /**
         * 提交按钮回调
         */
        cb: Function
    };

    /**
     * 是否需要重置按钮
     */
    reset_btn?: {
        /**
         * 重置按钮文本
         */
        text: string;

        /**
         * 按钮其他属性
         */
        btn_other_props?: any;

        /**
         * 重置按钮回调
         */
        cb: Function
    };

    /**
     * 其他按钮属性（与提交按钮并列）
     */
    other_btn_propps?: {
        /**
         * 按钮文本
         */
        text?: string;
        /**
         * 按钮其他属性
         */
        btn_other_props?: any;
        /**
         * 按钮回调
         */
        cb?: Function
    }[];

    constructor() {
        super();
    }
}
export default Form.create<FormCreatorControl>()(FormCreator);
