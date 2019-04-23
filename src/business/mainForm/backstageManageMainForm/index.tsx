import { reactControl, ReactMainFormControl, ReactMainForm, ReactMainFormState, LinkObject, CookieUtil, CommonIcon, Authentication, } from "pao-aop-client";
import React, { CSSProperties } from "react";
import { addon, Role, Permission, PermissionState } from "pao-aop";
import { Layout, Menu, Modal, } from "antd";
import './index.less';
import { NavLink } from "react-router-dom";
import { ClickParam } from "antd/lib/menu";
const { Header, Sider, Content } = Layout;

/** Cookie关键字：用户角色 */
export const COOKIE_KEY_USER_ROLE = "__user_role__";

/** Cookie关键字：当前用户 */
export const COOKIE_KEY_CURRENT_USER = "__current_user__";

/** 状态：后台管理主窗体 */
export interface BackstageMainFormState extends ReactMainFormState {
    /** 允许清除 */
    allowClear: boolean;
    /** 菜单数据源 */
    mainMenus: any;
    /** 选中key */
    current: string;
    /** 对话框显示 */
    visible: boolean;
}

/** 组件：后台管理主窗体 */
export class BackstageManageMainForm extends ReactMainForm<BackstageManageMainFormControl, BackstageMainFormState> {
    /** 主窗体 */
    constructor(props: BackstageManageMainFormControl) {
        super(props);
        this.state = {
            allowClear: true,
            mainMenus: this.props.mainMenus,
            visible: false,
            current: 'statisticalAnalysis',
        };
        if ((CookieUtil.read<Role[]>(COOKIE_KEY_USER_ROLE)) === undefined) {
            this.props.history!.push('/login');
            return;
        }
    }
    // 具体模块item判断
    is_permission(permission: Permission): any {
        if ((CookieUtil.read<Role[]>(COOKIE_KEY_USER_ROLE)) !== undefined) {
            console.log(CookieUtil.read<Role>(COOKIE_KEY_USER_ROLE));
            let rolesList = (CookieUtil.read<Role[]>(COOKIE_KEY_USER_ROLE));
            let is_permission = true;
            rolesList!.map((roleList, i) => {
                for (const p of roleList.permission) {
                    if (p.permission === permission.permission &&
                        (p["permission_state"] === PermissionState.forbid || p["permission_state"] === PermissionState.default)) {
                        is_permission = false;
                        break;
                    }
                }
            });

            return is_permission;
        }

    }
    // 模块判断
    is_module_permission(permission: Permission): any {
        if (CookieUtil.read<Role>(COOKIE_KEY_USER_ROLE) !== undefined) {
            console.log(CookieUtil.read<Role>(COOKIE_KEY_USER_ROLE));

            let roleList = CookieUtil.read<Role>(COOKIE_KEY_USER_ROLE)[0];
            let is_permission = false;
            for (const p of roleList.permission) {
                if (p.permission === permission.module && p["permission_state"] === PermissionState.grant) {
                    is_permission = true;
                    break;
                }
            }
            return is_permission;
        }
    }
    onMenuClick = (e: ClickParam) => {
        console.info(e.key);
        this.setState({
            current: e.key,
        });
        console.info(this.state.current);
    }
    handleOk = (e: any) => {
        this.setState({
            visible: false,
        });
        Authentication.logout()
            .then(data => {
                this.props.logout!();
                this.props.history!.push(this.props.logout_url!);
            })
            .catch((error) => { });
    }
    handleCancel = (e: any) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    render() {
        const { view, selectedKeys } = this.props;
        let mainMenus = this.state.mainMenus;
        let submenus = mainMenus!.map((item: any, idx: any) => {
            let isNull = true;
            let menuitem: React.ReactNode[] = item.childrenComponent.map((citem: any, cidx: any) => {
                if (this.is_permission(citem.permission)) {
                    isNull = false;
                    return <Menu.Item key={citem.link} style={{ paddingLeft: 20, }}><NavLink to={citem.link!}><CommonIcon icon={citem.icon} style={{ float: 'left', fontSize: '24px', }} />{citem.title} </NavLink></Menu.Item>;
                } else {
                    return null;
                }

            });
            return (
                !isNull ? (
                    <Menu.ItemGroup key={item.key} title={<span style={{ fontWeight: 'bold', }}>{item.title}</span>} style={{ marginTop: '30px', }}>
                        {menuitem}
                    </Menu.ItemGroup>) :
                    null
            );
        });
        console.log(this.props.match);

        return (
            <Layout style={styles.container} >
                <Header style={{ background: 'white', borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: 'rgb(170, 170, 170, 0.5)', position: 'fixed', top: 0, zIndex: 1000, heigth: '100%', display: 'flex', flex: 1, width: '100%', padding: 10, boxShadow: "0px 2px 10px 0px rgba(0,0,0,0.5)" }}>
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <div style={{ height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                            <div style={{ width: '100%', alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: 20, }}>
                                <img src={require('./img/logo@2x.png')} />
                            </div>
                            {/* <Input style={{ marginLeft: 20, borderRadius: 20 }} suffix={<Icon type="search" />} /> */}
                        </div>
                        <div style={{ height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>

                            <span style={{ marginRight: 24 }}>
                                {CookieUtil.read(COOKIE_KEY_CURRENT_USER) && CookieUtil.read(COOKIE_KEY_CURRENT_USER)[0].name}
                            </span>
                            <span style={{ marginRight: 14 }} onClick={() => { this.props.history!.push('/securitySettings'); }}>
                                <CommonIcon icon='font@pao_font_icon_set_bright' style={{ color: '#333333', fontSize: '24px', float: 'left' }} />
                            </span>
                            <span
                                style={{ marginRight: 24 }}
                                onClick={
                                    this.showModal
                                }
                            >
                                <CommonIcon icon='antd@export' style={{ color: '#333333', fontSize: '24px', float: 'left' }} />
                            </span>
                        </div>
                    </div>
                </Header>
                <Layout style={{ width: '100%', height: '100%' }}>
                    <Sider style={{ width: '100%', height: '100%', paddingTop: 64, boxShadow: "2px 0px 10px 0px rgba(0,0,0,0.5)" }}>
                        <Menu
                            theme="dark"
                            onClick={this.onMenuClick}
                            style={{ height: '100%', width: '100%' }}
                            selectedKeys={[selectedKeys!(this.props.match!.path)]}
                            mode="inline"
                        >
                            {
                                submenus
                            }
                        </Menu>
                    </Sider>
                    <Layout style={{ clear: 'both', width: '100%', height: '100%', background: 'white', display: "flex", flexDirection: "column", overflowX: "auto" }}>
                        <Content style={{ paddingTop: 65, width: '100%', height: '100%', backgroundColor: "rgba(245,245,245,1)", minWidth: "1200px" }}>
                            <div style={{ padding: this.props.padding ? this.props.padding : 0, display: "flex", flexDirection: "column", }}>
                                {view}
                            </div>
                        </Content>
                    </Layout>
                </Layout>
                <Modal
                    title="温馨提示"
                    visible={this.state.visible}
                    okText='确定'
                    cancelText='取消'
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    确定退出吗？
                </Modal>
            </Layout >);
    }
}

/**
 * 控件：后台管理主窗体控制器
 * @description 用于后台管理主窗体控制器
 */
@addon('BackstageManageMainForm', '后台管理主窗体控制器', '用于后台管理主窗体控制器')
@reactControl(BackstageManageMainForm, true)
export class BackstageManageMainFormControl extends ReactMainFormControl {
    /**
     * 后台管理主窗体控制器
     * @param title 应用标题
     * @param mainMenus 主菜单
     * @param toolButtons 工具按钮
     * @param logout 退出回调
     * @param logout_url 退出后跳转的url
     * @param padding 内容内边距
     */
    constructor(
        public title?: string,
        public mainMenus?: any[],
        public toolButtons?: LinkObject[],
        public logout?: () => void,
        public logout_url?: string,
        public padding?: string,
        public selectedKeys?: (pathname?: string) => string
    ) {
        super();
    }
}

/** 样式 */
const styles: { [name: string]: CSSProperties } = {
    container: { height: '100%', width: '100%', top: 0, display: 'flex', flex: 1, overflow: 'hidden' },
    // content: { overflow: 'auto', flex: 1, display: 'flex', flexDirection: 'column', height: '100%', }
};