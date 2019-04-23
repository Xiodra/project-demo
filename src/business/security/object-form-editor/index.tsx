import { Form, Row, Col, DatePicker, Cascader } from "antd";
import * as React from "react";
import { addon } from "pao-aop";
import { reactControl } from "pao-aop-client";
import { NTInput } from "src/business/components/input";
import { NTSelect } from "src/business/components/select";
import './index.less';
import { BaiduMap } from "src/business/components/baidu-map";
import { BaseFormControl } from "src/business/components/form";
export interface ObjectData {
    // 对象表单每一项的类型
    type: string;
    // 对象表单每一项的标题名称
    label: string;
    // 对象表单每一项的id
    value: string;
    // 对象表单每一项的改变触发的回调
    onChange: () => void;
    // 对象表单select项的option值
    datalist?: any[];
}
let options = [{
    value: '浙江',
    label: '浙江',
    children: [{
        value: '杭州',
        label: '杭州',
        children: [{
            value: '西湖',
            label: '西湖',
        }],
    }],
}, {
    value: '江苏',
    label: '江苏',
    children: [{
        value: '南京',
        label: '南京',
        children: [{
            value: '中华门',
            label: '中华门',
        }],
    }],
}];
/** 组件：对象表单 */
const FormItem = Form.Item;
/** 组件：对象表单 */
export class ObjectFromEditor extends React.Component<ObjectFromEditorControl, {}> {
    state = {
        expand: false,
        checkSubmit: false,
        value: '',
        selectValue: ''
    };
    constructor(props: any) {
        super(props);
        this.props.propsForm(this.props.form);
        console.log('yy', this.props.form);
    }

    /** 确定按钮 */
    handleSubmit = () => {
        // e.preventDefault();
        const { form } = this.props;
        form!.validateFields((err: Error, values: { var: string }) => {
            console.log('value', values);
            if (this.props.form_bind_onClick) {
                this.props.onClick(err, values);
            }
        });
    }
    handleReset = () => {
        this.props.form!.resetFields();
    }
    onchange = (e: any): void => {
        console.log('e--', e);
        this.setState({ value: e });
    }

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    }
    checkVal(rule: any, value: any, callback: any) {
        console.log('val---', value);
    }
    componentDidMount() {

    }
    render() {
        const { getFieldDecorator } = this.props.form!;
        let { ObjectFromEditor } = this.props; // 获取传进来的对象
        let array = [];
        for (let key = 0; key < ObjectFromEditor.length; key++) {
            let item = ObjectFromEditor[key];
            // let val = Object.keys(item) + '';
            let type = item.type;
            let val: string = item.value + '';
            // let onchange = item.onChange;
            let label = item.label;
            if (type === "input") {
                array.push(
                    <Col span={24} key={key + val} style={{ textAlign: 'left' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center', justifyItems: 'center' }}>
                            <div style={{ textAlign: 'right', height: 35, paddingRight: 5, minWidth: 150 }}>{label}</div>
                            <FormItem>
                                {getFieldDecorator(val, {
                                    rules: [{
                                        required: true,
                                        // validator: this.checkPhone
                                    }],
                                })(
                                    <div style={{ maxWidth: 200, display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center', justifyItems: 'center' }}>
                                        <NTInput height='small' radius='inputDefault' style={{ textAlign: "left" }} />
                                    </div>
                                )}
                            </FormItem>
                        </div>
                    </Col>
                );
            } else if (type === "select") {
                let listdata = item.datalist!;
                array.push(
                    <Col span={24} key={key + val} style={{ textAlign: 'left' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center', justifyItems: 'center' }}>
                            <div style={{ textAlign: 'right', height: 35, paddingRight: 5, width: 150 }}>{label}</div>
                            <FormItem>
                                {getFieldDecorator(val, {
                                    rules: [{
                                        required: true,
                                    }],
                                })(
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center', justifyItems: 'center' }}>
                                        <NTSelect defaultValue={listdata[0].value} data={listdata} onChange={this.onchange} value={this.state.value} />
                                    </div>
                                )}
                            </FormItem>
                        </div>
                    </Col>
                );
            } else if (type === "date") {
                array.push(
                    <Col span={24} key={key + val} style={{ textAlign: 'left' }}>
                        <Row style={{ padding: 3 }} gutter={24}>
                            <Col span={5} style={{ paddingTop: 10 }}><div style={{ minWidth: 30, textAlign: 'right' }}>{label}</div></Col>
                            <FormItem >
                                {getFieldDecorator(val, {
                                    rules: [{
                                        required: true,
                                    }],
                                })(
                                    <Col span={16}>
                                        <DatePicker key={key} />
                                    </Col>
                                )}
                            </FormItem>
                        </Row>
                    </Col>
                );
            } else if (type === "baiduMap") {
                array.push(
                    <Col span={24} key={key + val} style={{ overflow: 'hidden' }}>
                        <Row style={{ padding: 3 }} gutter={24}>
                            <FormItem>
                                {getFieldDecorator(val, {
                                    rules: [{
                                        required: true,
                                    }],
                                })(
                                    <Col span={24}>
                                        <BaiduMap key={key} />
                                    </Col>
                                )}
                            </FormItem>
                        </Row>
                    </Col>
                );
            } else if (type === "address") {
                array.push(
                    <Col span={24} key={key + val} style={{ overflow: 'hidden' }}>
                        <Row style={{ padding: 3 }} gutter={24}>
                            <FormItem>
                                {getFieldDecorator(val, {
                                    rules: [{
                                        required: true,
                                    }],
                                })(
                                    <Col span={24}>
                                        <Row style={{ padding: 3 }} gutter={24}>
                                            <Col span={5} style={{ paddingTop: 10 }}><div style={{ minWidth: 30, textAlign: 'right' }}>{label}</div></Col>
                                            <Col span={16}>
                                                <Cascader options={options} placeholder="请选择省市区" style={{ width: '50%' }} />
                                            </Col>
                                        </Row>
                                        <Row style={{ padding: 3 }} gutter={24}>
                                            <Col span={24} offset={5} style={{ maxWidth: 500 }}>
                                                <NTInput height='small' radius='inputDefault' onChange={(e) => { }} placeholder="请输入详细地址" />
                                            </Col>
                                        </Row>
                                    </Col>
                                )}
                            </FormItem>
                        </Row>
                    </Col>
                );
            } else {

            }
        }
        return (
            <Row gutter={24} style={{}}>
                {array}
            </Row>
        );
    }
}

/**
 *
 */
@addon('ObjectFromEditor', '对象表单', '对象表单')
@reactControl(Form.create<ObjectFromEditorControl>()(ObjectFromEditor))
export class ObjectFromEditorControl extends BaseFormControl {
    /** 确定按钮回调事件 */
    public form_bind_onClick?: (err: any, value: any) => void;
    public propsForm: (e: any) => void;
    /**
     * 
     * @param ObjectFromEditor 
     * 
     */
    constructor(public ObjectFromEditor: ObjectData[]) {
        super();
    }
}
/** 具有表单API的组件 */
export default Form.create<ObjectFromEditorControl>()(ObjectFromEditor);