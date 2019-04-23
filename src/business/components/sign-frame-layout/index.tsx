import { reactControl, BaseReactElementControl } from "pao-aop-client";
import React from "react";
import { addon } from "pao-aop";

// 样式
import './index.less';
import { Row, Col, Form, DatePicker, Button, LocaleProvider, Dropdown, Icon } from "antd";
import { WrappedFormUtils, ValidationRule } from "antd/lib/form/Form";
import { NTButtonSelect } from "src/business/components/button-select";
import { NTButtonOption } from "src/business/components/button-option";
import { FileUploadBtn } from "src/business/components/file-operation-btn/file-upload-btn";
import { NTInput } from "src/business/components/input";
import { NTSelect } from "src/business/components/select";
import { CustomProperties } from "src/business/components/custom-properties";
import { NTButton } from "src/business/components/button";
// import moment from 'moment';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
/**
 * 组件：“标识模板”状态
 */
export interface SignFrameLayoutState {
}

/**
 * 表单类型
 */
export enum InputType { "upload", "input", "select", "preText", "customProperties", "date" }

const render_jsx = {
    upload: (option: any) => <FileUploadBtn list_type={"picture-card"} contents={"plus"} {...option} />,
    input: (option: any) => <NTInput height="small" radius='inputDefault' {...option} />,
    select: (option: any) => <NTSelect {...option} />,
    customProperties: (option: any) => <CustomProperties {...option} />,
    date: (option: any) => <DatePicker format={"YYYY-MM-DD"} {...option} />
};

/**
 * 组件：标识模板
 * 描述 标识模板控件
 */
export class SignFrameLayout extends React.Component<SignFrameLayoutControl, SignFrameLayoutState> {
    private reset = (e: any) => {
        let { reset_cb, form } = this.props;
        form.resetFields();
        reset_cb ? reset_cb(e) : null;
    }

    private handleSearch = (e: any) => {
        e.preventDefault();
        let { props } = this;
        let { search_cb } = this.props;
        props.form!.validateFields((err: any, values: any) => {
            // 查找按钮回调
            if (values.create_date) {
                values.create_date = values.create_date.format("YYYY-MM-DD");
            }
            search_cb ? search_cb(err, values) : null;
        });
    }
    private applicationTypeButtonSelect = (value: any) => {
        let { type_method } = this.props;
        if (type_method) {
            type_method(value);
        }
    }
    private getFields = () => {
        const { getFieldDecorator } = this.props.form!;
        const { edit_form_items_props } = this.props;
        let filelds = (
            <Row gutter={24}>
                {
                    edit_form_items_props ? edit_form_items_props.map((e, i) =>
                        (
                            <Col span={8} key={i}>
                                <Form.Item
                                    label={e.label}
                                >
                                    {getFieldDecorator(e.decorator_id, {
                                        /** 日期特殊处理 暂不需要初始化当天日期 */
                                        initialValue: e.default_value, // e.type === InputType.date ? moment(e.default_value) : e.default_value,
                                    })(
                                        render_jsx[InputType[e.type]](e.option)
                                    )}
                                </Form.Item>
                            </Col>
                        )
                    )
                        :
                        null
                }
                <Col span={24}>
                    <Row type="flex" style={{ flexDirection: "row-reverse" }}>
                        {/* <Button >重置</Button> */}
                        <Button style={{ marginLeft: "20px" }} onClick={this.reset} htmlType="submit"  >重置</Button>
                        <NTButton htmlType="submit" name='查询' />
                    </Row>
                </Col>
            </Row >
        );
        return filelds;
    }
    render() {
        const sign_search_input_part = this.getFields();
        let { type_props, btn_props, showTable, draw_down_btn } = this.props;
        const sign_search = (
            <LocaleProvider locale={zh_CN}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    {/* <IndustryContentFrameFrame background_color={"white"}> */}
                    {
                        this.props.type_show ?
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', paddingLeft: 24, }}>
                                <div style={{ fontWeight: 'bold' }}>{type_props!.label}:</div>
                                <NTButtonSelect onChange={this.applicationTypeButtonSelect} >
                                    <NTButtonOption text='全部' allBtn={true} />
                                    {
                                        type_props!.data.map((val: any, index: any) => {
                                            return (
                                                <NTButtonOption text={val.text} value={val.value} key={index} />
                                            );
                                        })
                                    }
                                </NTButtonSelect>
                            </div> : <div />
                    }
                    <div style={{ margin: 36, padding: 10, backgroundColor: 'white', display: 'flex', flex: 1, flexDirection: 'column' }}>
                        <Row>
                            <Form
                                className="nt-sign-manage-layout"
                                onSubmit={this.handleSearch}
                            >
                                {sign_search_input_part}
                            </Form>
                            <Row type="flex" >
                                {
                                    btn_props ?
                                        btn_props !== undefined && btn_props.map((item, idx) => {
                                            return < NTButton onClick={item.btn_method} key={idx} name={item.label} icon={item.icon!} />;
                                        }) : <span />

                                }
                                {
                                    draw_down_btn ?
                                        <Dropdown overlay={draw_down_btn.menu} disabled={draw_down_btn.enable}>
                                            {/* < NTButton name={draw_down_btn.label} icon={"antd@down"} />; */}
                                            <Button style={{ marginLeft: "8px" }} >
                                                {draw_down_btn.label} <Icon type="down" />
                                            </Button>
                                        </Dropdown>
                                        :
                                        null
                                }
                            </Row>
                        </Row>
                        {showTable}
                    </div>
                    {/* </IndustryContentFrameFrame> */}
                </div>
            </LocaleProvider>
        );

        return (
            sign_search
        );
    }
}

/**
 * 控件：“标识模板”控制器
 * 描述 标识模板控制器
 */
@addon('SignFrameLayout', '标识模板', '标识模板结构')
@reactControl(SignFrameLayout)
export class SignFrameLayoutControl extends BaseReactElementControl {
    /**
     * 表单
     * @description 由Form组件定义，无须赋值，组件可以直接访问，但组件必须通过Form.create()方法定义
     */
    form: WrappedFormUtils;

    /**
     * 搜索按钮回调
     */
    search_cb?: Function;

    /**
     * 重置按钮回调
     */
    reset_cb?: Function;

    /**
     * 类型选择
     */
    type_props?: {
        /**
         * 名称
         */
        label: string;
        /**
         * 类型数据源
         */
        data: any[];

    };
    /**
     * 判断类型选择与否
     */
    type_show?: boolean;
    /**
     * 类型选择回调事件
     */
    type_method?: Function;
    /**
     * 表格是否展示选择框
     */
    on_row_selection?: any;
    /**
     * 表格删除按钮事件
     *
     */
    on_click_del?: () => void;
    /**
     * 其他通用表格按钮
     */
    other_label_type?: any;
    /**
     * 自定义表单数据
     */
    /**
     * 表单基本属性数组
     */
    edit_form_items_props?: {
        /**
         * 表单组项件类型
         */
        type: InputType;
        /**
         * 表单项组件标签
         */
        label?: string;
        /**
         * 表单默项认值（getFieldDecorator的initialValue）
         */
        default_value?: any;
        /**
         * 表单项修饰id（getFieldDecorator的id）
         */
        decorator_id: string;
        /**
         * 表单项校验规则（getFieldDecorator的rules）
         */
        rules?: ValidationRule[];
        /**
         * 表单所用组件的基本属性
         */
        option?: any;

    }[];
    showTable?: any;

    // 按钮列表
    btn_props?: {
        label: string; // 按钮名称
        btn_method: () => void; // 回调方法
        icon?: string;
    }[];

    /** 下拉菜单按钮 */
    draw_down_btn?: {
        menu?: JSX.Element,
        cb?: Function;
        label?: string;
        enable?: boolean;
    };

    constructor() {
        super();
    }
}

export default Form.create<SignFrameLayoutControl>()(SignFrameLayout);