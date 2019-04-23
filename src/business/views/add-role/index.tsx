
import { ReactViewState, ReactView, reactControl, ReactViewControl } from "pao-aop-client";
import React from "react";
import { addon, Ref, getObject, Permission, Role, IPermissionService, IRoleService } from "pao-aop";
import AddRoleForm from "src/business/components/add-role";
import { message } from "antd";

/** 状态：新增角色视图 */
export interface AddRoleViewState extends ReactViewState {
    /** 权限列表 */
    permission_list?: Permission[];
    /** 角色信息 */
    role?: Role;
}
/**
 * 获取的权限
 */
let permissionList: any[] = [];
/** 组件：新增角色视图 */
export class AddRoleView extends ReactView<AddRoleViewControl, AddRoleViewState> {
    constructor(props: AddRoleViewControl) {
        super(props);
    }
    /** 初始化服务 */
    permissionService?() {
        return getObject(this.props.permissionService_Fac!);
    }
    roleService?() {
        return getObject(this.props.roleService_Fac!);
    }
    componentDidMount() {
        let id = this.props.match!.params.key;
        permissionList = this.props.permission_list!;
        if (id) {
            /** 获取角色 */
            this.roleService!()!.get_role!(id)!
                .then((data1: any) => {
                    console.info(data1);
                    this.setState({
                        role: data1[0],
                        permission_list: data1[0].permission,
                    });
                })
                .catch(error => {
                    // debugger;
                    console.log(error);
                });
        } else {
            // 获取权限列表
            this.permissionService!()!.get_permission_list!()!
                .then((data: any) => {
                    this.setState({
                        permission_list: data,
                    });
                })
                .catch(error => {
                    // debugger;
                    console.log(error);
                });
        }
    }
    handleSubmit = (err: any, values: any) => {
        console.info(values);
        if (values.role_name === '') {
            message.info('角色名称不能为空');
            return;
        }
        if (permissionList) {
            values.permission = permissionList;
        }
        this.roleService!()!.update_role!(values)!
            .then((data: any) => {
                if (data === 'Success') {
                    message.info('保存成功');
                    this.props.history!.push('/rolePermission');
                } else {
                    message.info(data);
                }
            })
            .catch(error => {
                // debugger;
                console.log(error);
            });

    }
    /**
     * 权限选择
     * @param values 返回值
     */
    permission_select(values: any) {
        permissionList = values;
    }
    render() {
        const redeirect = this.props.isPermission ? this.props.isPermission!(this.props.permission!) : undefined;
        if (redeirect) {
            return redeirect;
        }
        return (
            <AddRoleForm
                handleSubmit={this.handleSubmit}
                permission={this.state.permission_list}
                role={this.state.role}
                permission_select={this.permission_select}
                return_btn={() => { this.props.history!.push('/rolePermission'); }}
            />
        );
    }
}

/**
 * 控件：新增角色视图控制器
 * @description 新增角色视图
 */
@addon('AddRoleView', '新增角色视图', '新增角色视图')
@reactControl(AddRoleView, true)
export class AddRoleViewControl extends ReactViewControl {
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
    /** 权限列表 */
    public permission_list?: any[];
}