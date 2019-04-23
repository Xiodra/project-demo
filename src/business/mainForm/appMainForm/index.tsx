/*
 * 版权：Copyright (c) 2019 红网
 * 
 * 创建日期：Wednesday January 30th 2019
 * 创建者：胡燕龙(huyl) - y.dragon.hu@hotmail.com
 * 
 * 修改日期: Wednesday, 30th January 2019 10:33:03 am
 * 修改者: 胡燕龙(huyl) - y.dragon.hu@hotmail.com
 * 
 * 说明
 * 		1、
 */
import { reactControl, ReactMainFormControl, ReactMainForm, ReactMainFormState, LinkObject, CommonIcon, MenuItem } from "pao-aop-client";
import React, { CSSProperties } from "react";
import { addon } from "pao-aop";
import { NavBar, Icon, TabBar } from "antd-mobile";
import { Layout, Menu, Dropdown } from "antd";
import { Link } from "react-router-dom";
import './index.less';
const { Content } = Layout;

/** 状态：手机应用窗体 */
export interface AppMainFormState extends ReactMainFormState {
    title?: string;
}

/** 组件：手机应用窗体 */
export class AppMainForm extends ReactMainForm<AppMainFormControl, AppMainFormState> {
    /** 手机应用窗体 */
    constructor(props: AppMainFormControl) {
        super(props);
    }
    /** 创建下拉菜单工具 */
    createDropdown(linkObject: LinkObject) {
        const { key, title, icon, link, onClick, childLinkObjects } = linkObject;
        const menu = (
            <Menu>
                {
                    childLinkObjects!.map(item => {
                        return <MenuItem key={key!} title={title} icon={icon} link={link} onClick={onClick} />;
                    })
                }
            </Menu>);
        return (
            <Dropdown overlay={menu}>
                <MenuItem key={key!} title={title} icon={icon} link={link} onClick={onClick} />
            </Dropdown>
        );
    }
    /** 获取标题根据路由 */
    getTitleByRoute() {
        const { location, mainMenus } = this.props;
        const { pathname } = location!;
        let linkObject = mainMenus!.find(item => {
            if (item.link === pathname) {
                return true;
            }
            return false;
        });
        if (linkObject) {
            return linkObject.title;
        }
        return this.props.title;
    }
    render() {
        const { mainMenus, toolButtons, location, history, view } = this.props;
        const { pathname } = location!;
        return (
            <Layout style={styles.container}>
                <NavBar
                    icon={<Icon type={"search"} />}
                    rightContent={
                        toolButtons ?
                            <div>
                                {
                                    toolButtons.map(button => {
                                        const { key, icon, link, childLinkObjects } = button;
                                        const tool =
                                            childLinkObjects && childLinkObjects.length > 0 ?
                                                this.createDropdown(button) :
                                                <Link key={key} to={link!} >
                                                    <CommonIcon
                                                        className='mobile-mainform-headerbutton mobile-mainform-header'
                                                        icon={icon}
                                                    />
                                                </Link>;
                                        return tool;
                                    })
                                }
                            </div> : null
                    }
                >
                    {
                        this.getTitleByRoute()
                    }
                </NavBar>
                <TabBar>
                    {
                        mainMenus!.map(menu => {
                            return (
                                <TabBar.Item
                                    icon={<CommonIcon icon={menu.icon} />}
                                    selectedIcon={<CommonIcon icon={menu.icon} />}
                                    title={menu.title!}
                                    key={menu.title!}
                                    selected={menu.link === pathname}
                                    onPress={() => {
                                        history!.push(menu.link!);
                                    }}
                                >
                                    <Content style={styles.content}>
                                        {
                                            view
                                        }
                                    </Content>
                                </TabBar.Item>
                            );
                        })
                    }
                </TabBar>
            </Layout>);
    }
}

/**
 * 控件：手机应用窗体控制器
 * @description 用于手机应用的主窗体
 */
@addon('AppMainForm', '手机应用窗体', '用于手机应用的主窗体')
@reactControl(AppMainForm, true)
export class AppMainFormControl extends ReactMainFormControl {
    /**
     * 手机应用窗体控制器
     * @param title 应用标题
     * @param mainMenus 主菜单
     * @param toolButtons 工具条
     */
    constructor(
        public title?: string,
        public mainMenus?: LinkObject[],
        public toolButtons?: LinkObject[]) {
        super();
    }
}

/** 样式 */
const styles: { [name: string]: CSSProperties } = {
    container: { position: 'fixed', height: '100%', width: '100%', top: 0 },
    content: { overflow: 'auto', flex: 1, display: 'flex', flexDirection: 'column' }
};