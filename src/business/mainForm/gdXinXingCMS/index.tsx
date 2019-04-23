import { reactControl, ReactMainFormState, ReactMainForm, ReactMainFormControl, LinkObject, MobileUtility } from "pao-aop-client";
import React from "react";
import { addon } from "pao-aop";
import { Layout, Menu, Drawer } from "antd";

import "./index.less";
import { NavLink } from "react-router-dom";
/**
 * 组件：官网主窗体控件状态
 */
export interface GDXinXingCMSState extends ReactMainFormState {
    /**
     * 目前所选中的标签
     */
    current: string;
    /**
     * 手机端抽屉菜单是否可见
     */
    visible: boolean;
    current_title: string;
}

/**
 * 组件：官网主窗体控件
 * 描述
 */
export class GDXinXingCMS extends ReactMainForm<GDXinXingCMSControl, GDXinXingCMSState> {
    constructor(props: any) {
        super(props);
        this.state = {
            current: "",
            current_title: "首页",
            visible: false
        };
    }

    update = (text: string) => {
        this.setState({
            current_title: text
        });
    }

    handleClick = (e: any) => {
        // RouterTitle.getInstance().setTitle(e);
    }

    showDrawer = () => {
        this.setState({
            visible: true
        });
    }

    onClose = () => {
        this.setState({
            visible: false,
        });
    }

    render() {
        const { view, mainMenu, pc_logo_url, mobile_logo_url, more_icon_url, get_titlt_fn } = this.props;
        const {
            Header, Content,
        } = Layout;

        const { visible } = this.state;

        const webFrom = (
            <Layout className="nt-main-form">
                <Header className="header">
                    <div className="logo" >
                        <img src={pc_logo_url} alt="" />
                    </div>
                    <Menu
                        selectedKeys={[this.state.current]}
                        mode="horizontal"
                        style={{ borderBottom: "0", display: "flex", alignItems: "center" }}
                    >
                        {
                            mainMenu!.map((e, i) => (
                                <Menu.Item key={e.key}>
                                    <NavLink activeClassName="nt-main-form-link-active" key={e.key} to={e.link!}>
                                        <span className="nav-page-font" >{e.title}</span>
                                    </NavLink>
                                </Menu.Item>)
                            )
                        }
                    </Menu>
                </Header>
                <Content>
                    {view}
                </Content>
            </Layout>
        );

        const mobileForm = (
            <Layout className="nt-main-form-mobile">
                <Header className="header">
                    <div className="logo" >
                        <img src={mobile_logo_url} alt="" />
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <span style={{ paddingRight: "12px" }}>{get_titlt_fn!(this.props.match!.path)}</span>
                        <img className="more-logo" src={more_icon_url} alt="" onClick={this.showDrawer} />
                    </div>
                    {/* <Icon type="bars" /> */}
                    <Drawer
                        placement="right"
                        closable={false}
                        onClose={this.onClose}
                        visible={visible}
                        className="nt-main-form-drawer"
                    >
                        <Menu
                            // onClick={this.handleClick}
                            selectedKeys={[this.state.current]}
                            mode="inline"
                        >
                            {
                                mainMenu!.map((e, i) => (
                                    <Menu.Item key={e.key} onClick={() => this.handleClick(e.title)}>
                                        <NavLink key={e.key} to={e.link!}>
                                            <span className="nav-page-font" >{e.title}</span>
                                        </NavLink>
                                    </Menu.Item>)
                                )
                            }
                        </Menu>
                    </Drawer>
                </Header>
                <Content>
                    {view}
                </Content>
            </Layout>
        );
        return (
            MobileUtility.isMobile ? mobileForm : webFrom
        );
    }
}

/**
 * 控件：“官网主窗体组件”控制器
 * 描述
 */
@addon('GDXinXingCMS', '官网主窗体控件', '官网主窗体控件结构')
@reactControl(GDXinXingCMS, true)
export class GDXinXingCMSControl extends ReactMainFormControl {
    /**
     * 官网主窗体控件
     * @param mainMenu 工具按钮
     * @param  
     */
    constructor(
        public mainMenu?: LinkObject[],
        public pc_logo_url?: string,
        public mobile_logo_url?: string,
        public more_icon_url?: string,
        public get_titlt_fn?: Function
    ) {
        super();
    }
}