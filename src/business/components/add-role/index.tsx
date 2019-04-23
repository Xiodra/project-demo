import { Form, Card, Tree, Radio } from "antd";
const DirectoryTree = Tree.DirectoryTree;
const { TreeNode } = Tree;
const RadioGroup = Radio.Group;
import * as React from "react";
import { addon, newGuid, Permission } from "pao-aop";
import { reactControl } from "pao-aop-client";
import { NTInput } from "src/business/components/input";
import { NTButton } from "src/business/components/button";
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import './index.less';
import { BaseUserInfoForm, BaseUserInfoFormControl } from "src/business/security/base";
import TextArea from "antd/lib/input/TextArea";
import Input from "antd-mobile/lib/input-item/Input";
import NTDivStyle from "src/business/style-components/div-style";

const FormItem = Form.Item;
export interface AddRoleFormValues {
    /** id */
    id?: string;
    /** 角色名称 */
    role_name?: string;
    /** 角色权限 */
    permission?: Permission[];
    /** 说明 */
    comment?: string;
}
/**
 * 组件：新增角色组件
 */
export class AddRoleForm extends BaseUserInfoForm<AddRoleFormControl, {}> {
    constructor(props: AddRoleFormControl) {
        super(props);
    }

    /** 提交方法 */
    handleSubmit = (e: any) => {
        e.preventDefault();
        const { form } = this.props;
        form!.validateFields((err: Error, values: AddRoleFormValues) => {
            if (this.props.handleSubmit) {
                this.props.handleSubmit(err, values);
            }

        });
    }
    onChange = (e: any) => {
        let { permission } = this.props;
        let keys = e.target.name.split('$');
        let permissionList = permission.map((item: any) => {
            if (item.module === keys[0] && item.permission === keys[1]) {
                item.permission_state = e.target.value;
            }
            return item;
        });
        this.props.permission_select!(permissionList);
    }
    componentDidMount() {

    }
    render() {
        const { getFieldDecorator } = this.props.form!;
        const { permission, role } = this.props;
        let modeuleList: any[] = [];
        for (let item in permission!) {
            if (item) {
                if (!(modeuleList.indexOf(permission![item].module_name) > -1)) {
                    modeuleList.push(permission![item].module_name);
                }
            }
        }
        const dom = modeuleList.map((value: any) => {
            const key = newGuid();
            return (
                <TreeNode title={value} key={key} selectable={false}>
                    {
                        permission!.map((item: any) => {
                            if (item.module_name === value) {
                                let chDom =
                                    <TreeNode
                                        selectable={false}
                                        key={item.module + '_' + item.permission}
                                        title={
                                            <div style={{ display: 'inline-block' }}>
                                                <span style={{ marginRight: '10px' }}>{item.per_name}</span>
                                                <RadioGroup defaultValue={item.permission_state} name={item.module + '$' + item.permission} onChange={this.onChange} >
                                                    <Radio value={'default'}>空白</Radio>
                                                    <Radio value={'grant'}>授予</Radio>
                                                    <Radio value={'forbid'}>禁止</Radio>
                                                </RadioGroup>
                                            </div>}
                                        isLeaf={true}
                                    />;
                                return chDom;
                            } else {
                                return null;
                            }
                        })
                    }
                </TreeNode>
            );
        });
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <div>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    {/* <div style={{ padding: '30px' }}> */}
                    <NTDivStyle.NTPadding30px>
                        <Card title="角色权限" bordered={false} style={{ marginTop: '20px' }}>

                            {getFieldDecorator('id', {
                                initialValue: role ? role.id : '',
                                rules: [{
                                    required: false,
                                    message: 'id'
                                }],
                            })(
                                <Input style={{ display: 'none' }} />
                            )}
                            <Form.Item label='角色名称：'>
                                {getFieldDecorator('role_name', {
                                    initialValue: role ? role.role_name : '',
                                    rules: [{
                                        required: true,
                                        message: '请输入角色名称'
                                    }],
                                })(
                                    <NTInput height='small' radius='inputDefault' placeholder='请输入角色名称' />
                                )}
                            </Form.Item>
                            <Form.Item label='权限范围：'>
                                {getFieldDecorator('permission', {
                                    initialValue: permission,
                                    rules: [{
                                        required: true,
                                        message: '请选择角色权限'
                                    }],
                                })(
                                    <DirectoryTree multiple={true} defaultExpandAll={true}>
                                        {dom}
                                    </DirectoryTree>
                                )}
                            </Form.Item>
                            <Form.Item label='说明：'>
                                {getFieldDecorator('comment', {
                                    initialValue: role ? role.comment : [],
                                    rules: [{
                                        required: false,
                                        message: '请输入说明'
                                    }],
                                })(
                                    <TextArea rows={4} />
                                )}

                            </Form.Item>
                        </Card>
                    </NTDivStyle.NTPadding30px>

                    {/* </div> */}
                    <FormItem>
                        {/* <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '50px' }}> */}
                        <NTDivStyle.NTRoleBottom>
                            {/* <div style={{ marginRight: '10px' }}> */}
                            <NTDivStyle.NTMarginRight10px>
                                <NTButton name='保存' htmlType='submit' />
                            </NTDivStyle.NTMarginRight10px>

                            {/* </div> */}

                            <NTButton type='ghost' name='返回' htmlType='button' onClick={this.props.return_btn!} />

                        </NTDivStyle.NTRoleBottom>

                        {/* </div> */}
                    </FormItem>
                </Form>
            </div>
        );
    }
}

/**
 * 控件：新增角色
 */
@addon('AddRoleForm', '新增角色', '新增角色')
@reactControl(Form.create<AddRoleFormControl>()(AddRoleForm))
export class AddRoleFormControl extends BaseUserInfoFormControl {
    /** 提交回调 */
    public handleSubmit?: (err: Error, values: AddRoleFormValues) => void;
    /** 权限列表 */
    public permission?: any;
    /** 角色信息 */
    public role?: any;
    /** 权限设置单选按钮 */
    public permission_select?: (value: any) => void;
    /** 返回按钮 */
    return_btn?: () => void;
    constructor() {
        super();
    }
}

export default Form.create<AddRoleFormControl>()(AddRoleForm);