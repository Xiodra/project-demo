import { Form, Button, Row, Col, Icon, DatePicker } from "antd";
import * as React from "react";
import { addon } from "pao-aop";
import { reactControl } from "pao-aop-client";
import { NTInput } from "src/business/components/input";
import { BaseUserInfoForm, BaseUserInfoFormControl } from "../base";
import { NTSelect } from "src/business/components/select";
import './index.less';
import { BaiduMap } from "src/business/components/baidu-map";
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

/** 组件：对象表单 */
const FormItem = Form.Item;
/** 组件：对象表单 */
export class ObjectForm extends BaseUserInfoForm<ObjectFormControl, {}> {
    state = {
        expand: false
    };
    /** 确定按钮 */
    handleSubmit = (e: any) => {
        e.preventDefault();
        const { form } = this.props;
        form!.validateFields((err: Error, values: { var: string }) => {
            console.log('value', values);
            if (this.props.form_bind_onClick) {
                this.props.form_bind_onClick(err, values);
            }
        });
    }
    handleReset = () => {
        this.props.form!.resetFields();
    }

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    }
    render() {
        const { getFieldDecorator } = this.props.form!;
        let { objectform } = this.props; // 获取传进来的对象
        let array = [];
        const count = this.state.expand ? 10 : 6;
        for (let key = 0; key < objectform.length; key++) {
            let item = objectform[key];
            // let val = Object.keys(item) + '';
            let type = item.type;
            let val: string = item.value + '';
            // let onchange = item.onChange;
            let label = item.label;
            if (type === "input") {
                array.push(
                    <Col span={8} key={key} style={{ display: key < count ? 'block' : 'none' }}>
                        <Row style={{ padding: 3 }} gutter={24} >
                            <Col span={8} style={{ paddingTop: 10 }}><div style={{ minWidth: 30, textAlign: 'right' }}>{label}</div></Col>
                            <FormItem>
                                {getFieldDecorator(val, {
                                    rules: [{
                                        required: true,
                                        // validator: this.checkPhone
                                    }],
                                })(
                                    <Col span={16} style={{ textAlign: 'center' }}>
                                        <NTInput height='small' radius='inputDefault' />
                                    </Col>
                                )}
                            </FormItem>
                        </Row>
                    </Col>
                );
            } else if (type === "select") {
                let listdata = item.datalist!;
                array.push(
                    <Col span={8} key={key} style={{ display: key < count ? 'block' : 'none' }}>
                        <Row style={{ padding: 3 }} gutter={24}>
                            <Col span={8} style={{ paddingTop: 10 }}><div style={{ minWidth: 30, textAlign: 'right' }}>{label}</div></Col>
                            <FormItem>
                                {getFieldDecorator(val, {
                                    rules: [{
                                        required: true,
                                    }],
                                })(
                                    <Col span={16}>
                                        <NTSelect defaultValue={listdata[0].value} data={listdata} onChange={(e: any) => { }} />
                                    </Col>
                                )}
                            </FormItem>
                        </Row>
                    </Col>
                );
            } else if (type === "date") {
                array.push(
                    <Col span={8} key={key} style={{ display: key < count ? 'block' : 'none' }}>
                        <Row style={{ padding: 3 }} gutter={24}>
                            <Col span={8} style={{ paddingTop: 10 }}><div style={{ minWidth: 30, textAlign: 'right' }}>{label}</div></Col>
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
                    <Col span={24} key={key} style={{ display: key < count ? 'block' : 'none', overflow: 'hidden' }}>
                        <Row style={{ padding: 3 }} gutter={24}>
                            <FormItem>
                                {getFieldDecorator(val, {
                                    rules: [{
                                        required: true,
                                    }],
                                })(
                                    <Col span={24}>
                                        <BaiduMap key={key} pure={true} pointPro={{ lat: '116.331398', lng: '39.897445' }} />
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
            <Form onSubmit={this.handleSubmit}>
                <Row gutter={24}>
                    {array}
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit">查询</Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                            清空
                           </Button>
                        <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                            Collapse <Icon type={this.state.expand ? 'up' : 'down'} />
                        </a>
                    </Col>
                </Row>

            </Form>
        );
    }
}

/**
 *
 */
@addon('ObjectForm', '对象表单', '对象表单')
@reactControl(Form.create()(ObjectForm as any))
export class ObjectFormControl extends BaseUserInfoFormControl {
    /** 确定按钮回调事件 */
    public form_bind_onClick?: (err: any, value: any) => void;
    /** 传入要生成表单的对象 */
    constructor(public objectform: ObjectData[]) {
        super();
    }
}
/** 具有表单API的组件 */
export default Form.create()(ObjectForm as any);