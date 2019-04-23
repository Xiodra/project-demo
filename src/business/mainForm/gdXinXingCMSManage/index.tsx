// import { reactControl, ReactMainFormState, ReactMainForm, ReactMainFormControl, LinkObject, CookieUtil } from "pao-aop-client";
// import React from "react";
// import { addon, Role, Permission, PermissionState } from "pao-aop";
// import { Layout, Menu } from "antd";
// import "./index.less";
// import { NavLink } from "react-router-dom";
// /**
//  * 组件：官网后台主窗体组件状态
//  */
// export interface GDXinXingCMSManageState extends ReactMainFormState {
//     /**
//      * 目前选中的标签的key值
//      */
//     currentKey: string;
// }

// /** Cookie关键字：用户角色 */
// export const COOKIE_KEY_USER_ROLE = "__user_role__";

// /** Cookie关键字：当前用户 */
// export const COOKIE_KEY_CURRENT_USER = "__current_user__";

// /**
//  * 组件：官网后台主窗体组件
//  * 描述
//  */
// export class GDXinXingCMSManage extends ReactMainForm<GDXinXingCMSManageControl, GDXinXingCMSManageState> {
//     is_permission(permission: Permission): any {
//         let roleList = (CookieUtil.read<Role[]>(COOKIE_KEY_USER_ROLE))[0];
//         let is_permission = false;
//         for (const p of roleList.permission) {
//             if (p.permission === permission.permission && p.permission_state === PermissionState.grant) {
//                 is_permission = true;
//                 break;
//             }
//         }
//         return is_permission;
//     }

//     render() {
//         const { view, main_meun, logo_url } = this.props;
//         const {
//             Header, Content, Sider
//         } = Layout;

//         /** pc端页面 */
//         const webFrom = (
//             <Layout className="nt-main-form-back-ground">
//                 <Sider
//                     breakpoint="lg"
//                     collapsedWidth="0"
//                 >
//                     <img className="logo" src={logo_url} />
//                     <Menu theme="dark" mode="inline" selectedKeys={[this.state.currentKey]}>
//                         {
//                             main_meun!.map((button: any) => {
//                                 const { title, key, childLinkObjects } = button;
//                                 let isNull = true;

//                                 let toolsMenu =
//                                     childLinkObjects && childLinkObjects.length > 0 ?
//                                         childLinkObjects.map((e: LinkObject, i: any) => {
//                                             if (this.is_permission(e.permission!)) {
//                                                 isNull = false;
//                                                 return (
//                                                     <Menu.Item key={e.key}>
//                                                         <NavLink activeClassName="ant-menu-item-selected" to={e.link!}>
//                                                             <span className="nav-text">
//                                                                 <img src={e.icon} style={{ width: "28px", height: "28px", marginRight: "8px" }} alt="" />
//                                                                 {e.title}
//                                                             </span>
//                                                         </NavLink>
//                                                     </Menu.Item>
//                                                 );
//                                             } else {
//                                                 return null;
//                                             }
//                                         }
//                                         )
//                                         : null;
//                                 return (
//                                     !isNull ? (
//                                         <Menu.ItemGroup key={key} title={title}>
//                                             {toolsMenu}
//                                         </Menu.ItemGroup>
//                                     )
//                                         :
//                                         null
//                                 );
//                             })
//                         }
//                     </Menu>
//                 </Sider>
//                 <Layout>
//                     <Header className="header" style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
//                         <img src={require("src/projects/xinXingCMS/style/img/manage/icon_out.png")} alt="" />
//                     </Header>
//                     <Content>
//                         <div className="content">
//                             {view}
//                         </div>
//                     </Content>
//                 </Layout>
//             </Layout>
//         );
//         return (
//             webFrom
//         );
//     }
// }

// /**
//  * 控件：“官网后台主窗体组件”控制器
//  * 描述
//  */
// @addon('GDXinXingCMSManage', '官网后台主窗体组件', '官网后台主窗体组件结构')
// @reactControl(GDXinXingCMSManage, true)
// export class GDXinXingCMSManageControl extends ReactMainFormControl {
//     /**
//      * 官网后台主窗体组件
//      * @param main_meun 工具按钮
//      * @param  
//      */
//     constructor(
//         public main_meun?: LinkObject[],
//         public logo_url?: string
//     ) {
//         super();
//     }
// }