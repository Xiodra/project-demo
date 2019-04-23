
import { ReactViewState, ReactView, reactControl, ReactViewControl } from "pao-aop-client";
import React from "react";
import { addon, Ref, getObject, IPermissionService, IRoleService, Permission, } from "pao-aop";
import { NTOperationTable } from "src/business/components/operation-table";
import { message } from "antd";
import SignFrameLayout, { InputType } from "src/business/components/sign-frame-layout";
import './index.less';
import { Container } from "src/business/style-components/container";

/** 状态：角色权限视图 */
export interface RolePermissionViewState extends ReactViewState {
    /** 列表数据源 */
    data_source?: any[];
    /** 当前第几页 */
    page?: number;
    /** 当前每页数 */
    pageSize?: number;
    /** 数据总条数 */
    total_data?: number;
    /** 角色 */
    role_name?: string;
    /** 角色列表 */
    role_list?: any[];
}
/** 组件：角色权限视图 */
export class RolePermissionView extends ReactView<RolePermissionViewControl, RolePermissionViewState> {
    private columns_data_source = [{
        title: '角色名称',
        dataIndex: 'role_name',
        key: 'role_name',
    }, {
        title: '权限范围',
        dataIndex: 'permission',
        key: 'permission',
    }, {
        title: '说明',
        dataIndex: 'comment',
        key: 'comment',
    }];
    constructor(props: RolePermissionViewControl) {
        super(props);
    }
    /** 查询按钮 */
    queryBtn = (e: any, val: any) => {
        this.roleService!()!.get_role_list!({ 'role_name': val.role_name }, 1, 10)!
            .then((data: any) => {
                let toles: any[] = [];
                if (data.result) {
                    data.result.map(function (item: any) {
                        let permissionList: any[] = [];
                        item.permission.map(function (value: any) {
                            if (value.permission_state === 'grant') {
                                permissionList.push(value.module_name + value.per_name);
                            }

                        });
                        item.permission = permissionList.join('、');
                        toles.push(item);
                    });
                }
                this.setState({
                    role_list: toles,
                    total_data: data.total
                });
            })
            .catch(error => {
                // debugger;
                console.log(error);
            });
    }
    /** 重置按钮 */
    resetBtn = () => {
        alert('重置操作');
    }
    /** 新建角色按钮 */
    addRolw = () => {
        // alert('新建角色');
        this.props.history!.push('/add-role');

    }
    /** 自定义图标按钮回调事件 */
    onIconClick = (type: string, contents: any) => {
        if ('icon_edit' === type) {
            console.log('自定义按钮edit返回值：', contents);
            this.props.history!.push('/add-role/' + contents.id);
        }
    }
    /** 删除按钮回调事件 */
    onClickDel = (contents: any) => {
        // console.log("删除按钮返回值", contents);
        // 删除角色
        this.roleService!()!.delete_role!(contents.id)!
            .then((data: any) => {
                if (data === 'Success') {
                    this.handleDelete(contents.id);
                    message.info('删除成功');
                } else {
                    message.info('删除失败');
                }
            })
            .catch(error => {
                // debugger;
                console.log(error);
            });

    }
    handleDelete = (key: any) => {
        const dataSource = [...this.state.role_list!];
        this.setState({ role_list: dataSource.filter(item => item.id !== key) });
    }
    /** 行点击回调事件 */
    // onRowClick = (record: any, index: number) => {
    // }
    /** 分页回调事件 */
    pageOnCick = (contents: any) => {
        console.log('page:', contents);
        this.setState({
            page: contents
        });
    }
    /** 改变分页数量回调事件 */
    showSizeChange = (current: number, pageSize: number) => {
        console.log('current: ' + current + 'pageSize: ' + pageSize);
        this.setState({
            pageSize: pageSize
        });
    }
    /** 角色名称输入框回调 */
    roleNameChange = (event: any) => {
        this.setState({
            role_name: event.target.value
        });
    }
    /** 初始化服务 */
    permissionService?() {
        return getObject(this.props.permissionService_Fac!);
    }
    roleService?() {
        return getObject(this.props.roleService_Fac!);
    }
    componentWillMount() {

    }
    componentDidMount() {
        // 获取角色列表
        this.roleService!()!.get_role_list!({}, 1, 10)!
            .then((data: any) => {
                let toles: any[] = [];
                if (data.result) {
                    data.result.map(function (item: any) {
                        let permissionList: any[] = [];
                        item.permission.map(function (value: any) {
                            if (value.permission_state === 'grant') {
                                permissionList.push(value.module_name + value.per_name);
                            }

                        });
                        item.permission = permissionList.join('、');
                        toles.push(item);
                    });
                }
                this.setState({
                    role_list: toles,
                    total_data: data.total
                });
            })
            .catch(error => {
                // debugger;
                console.log(error);
            });
    }
    render() {

        const redeirect = this.props.isPermission ? this.props.isPermission!(this.props.permission!) : undefined;
        if (redeirect) {
            return redeirect;
        }
        let role_permission = {
            type_show: false,
            edit_form_items_props: [
                {
                    type: InputType.input,
                    label: "角色名称",
                    decorator_id: "role_name"
                },
            ],
            btn_props: [{
                label: '新增角色',
                btn_method: this.addRolw,
                icon: 'plus'
            }],
            showTable: (
                <NTOperationTable
                    data_source={this.state.role_list}
                    columns_data_source={this.columns_data_source}
                    on_click_del={this.onClickDel}
                    // onClick={this.onRowClick}
                    on_icon_click={this.onIconClick}
                    other_label_type={[{ type: 'icon', label_key: 'icon_edit', label_parameter: { icon: 'antd@edit' } }]}
                    table_size='middle'
                    showHeader={true}
                    bordered={false}
                    total={this.state.total_data}
                    default_page_size={10}
                    total_pages={Math.ceil((this.state.total_data ? this.state.total_data : 0) / 10)}
                    show_footer={true}
                    page_on_click={this.pageOnCick}
                    show_size_change={this.showSizeChange}
                    rowKey='id'
                />),
            search_cb: this.queryBtn,
        };
        return (
            (
                <Container className={'role'}>
                    <SignFrameLayout {...role_permission} />
                </Container>
            )
        );
    }
}

/**
 * 控件：角色权限视图控制器
 * @description 角色权限视图
 */
@addon('RolePermissionView', '角色权限视图', '角色权限视图')
@reactControl(RolePermissionView, true)
export class RolePermissionViewControl extends ReactViewControl {
    /**
     * 权限服务接口
     */
    public permissionService_Fac?: Ref<IPermissionService>;
    /** 角色服务 */
    public roleService_Fac?: Ref<IRoleService>;
    /** 视图权限 */
    public permission?: Permission;
    /** 权限判断方法 */
    public isPermission?: (permission: Permission) => React.ReactNode | undefined;

}