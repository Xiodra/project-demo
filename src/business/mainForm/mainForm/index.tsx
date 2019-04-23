import { reactControl, ReactMainFormControl, ReactMainForm, ReactMainFormState, LinkObject, CookieUtil, } from "pao-aop-client";
import React, { CSSProperties } from "react";
import { addon } from "pao-aop";
import { Layout, Menu, Icon, Avatar, Input, Badge } from "antd";
import './index.less';
// import SubMenu from "antd/lib/menu/SubMenu";
const { Header, Sider, Content } = Layout;

/** 状态：主窗体 */
export interface MainFormState extends ReactMainFormState {
    allowClear: boolean; // 允许清除
    defaultSelectedKeys: any[]; // 默认打开的key
    defaultOpenKeys: any; // 默认选中的项
    selectedKeys: any[]; // 选中的项
}

/** 组件：主窗体 */
export class MainForm extends ReactMainForm<MainFormControl, MainFormState> {
    /** 主窗体 */
    constructor(props: MainFormControl) {
        super(props);
        this.state = {
            allowClear: true,
            defaultSelectedKeys: ['consoleCoordinate'],
            defaultOpenKeys: '',
            selectedKeys: [],
        };
    }
    componentWillMount() {
        let selectedKeys = CookieUtil.read("selectedKeys");
        let defaultOpenKeys = CookieUtil.read("defaultOpenKeys");
        if (selectedKeys !== undefined) {
            this.setState(
                {
                    selectedKeys: [selectedKeys],
                    defaultOpenKeys: [defaultOpenKeys]
                }

            );
        }

    }
    // 菜单点击事件
    handleClick = (e: any) => {
        CookieUtil.save("selectedKeys", e.key);
        CookieUtil.save("defaultOpenKeys", e.keyPath[1]);
        console.log('sss', e.keyPath[1]);
        this.setState(
            {
                selectedKeys: [e.key],
                defaultOpenKeys: e.keyPath[1]
            },
            () => {
                this.props.history!.push(e.key);
            });
    }
    // 设置点击事件
    personSetting = () => {
        CookieUtil.save("selectedKeys", 4);
        CookieUtil.save("defaultOpenKeys", "personalSettings");
        setTimeout(
            () => {
                window.location.href = "/personalSettings";
            },
            500
        );

    }
    render() {
        const { view, mainMenus, history } = this.props;
        return (
            <Layout style={styles.container}>
                <Sider>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={this.state.defaultSelectedKeys}
                        defaultOpenKeys={this.state.defaultOpenKeys}
                        selectedKeys={this.state.selectedKeys}
                        onClick={this.handleClick}
                        style={{ height: '100%', borderRight: 0, }}
                    >
                        <div style={{ width: '100%', alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: 20, }}>
                            <Avatar size={64} icon="user" />
                        </div>
                        {
                            mainMenus!.map((item, idx) => {
                                return (
                                    <Menu.ItemGroup key={item.key} title={<span><Icon style={{ marginRight: '10px' }} type={item.icon} />{item.title}</span>}>
                                        {
                                            item.childrenComponent.map((citem: any, cidx: any) => {
                                                return (
                                                    <Menu.Item key={citem.key} >{citem.title}</Menu.Item>
                                                );
                                            })
                                        }
                                    </Menu.ItemGroup>
                                );
                            })
                        }
                    </Menu>
                </Sider>
                <Layout style={{ clear: 'both' }}>
                    <Header style={{ background: 'white', borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: 'rgb(170, 170, 170, 0.5)', position: 'absolute', top: 0, zIndex: 10000000, width: '100%', heigth: '100%' }}>
                        <div style={{ height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%' }}>
                            <div style={{ height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                <span onClick={() => { history!.go(-1); }}><Avatar src={require('./img/back.png')} style={{ marginBottom: 5 }} /></span>
                                <Input style={{ marginLeft: 20, borderRadius: 20 }} suffix={<Icon type="search" />} />
                            </div>
                            <div style={{ height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>

                                <span style={{ marginRight: 24 }}>
                                    <Badge count={3}><Avatar shape="square" icon="bell" /></Badge>
                                </span>
                                <span style={{ marginRight: 24 }} onClick={this.personSetting}>
                                    <Avatar shape="square" icon="setting" />
                                </span>
                                <span style={{ marginRight: 24 }} onClick={() => { window.location.href = "/signout"; }}>
                                    <Avatar shape="square" icon="logout" />
                                </span>
                            </div>
                        </div>
                    </Header>
                    <Content style={{ paddingLeft: 0, paddingRight: 10, paddingTop: 65 }}>
                        {
                            view
                        }
                    </Content>
                </Layout>
            </Layout >);
    }
}

/**
 * 控件：主窗体控制器
 * @description 用于带头部窗体
 */
@addon('MainForm', '主窗体', '用于主窗体')
@reactControl(MainForm, true)
export class MainFormControl extends ReactMainFormControl {
    /*
     *
     * 主窗体控制器
     * @param title 应用标题
     * @param mainMenus 主菜单
     * @param toolButtons 工具条
     * 
     */
    constructor(
        public title?: string,
        public mainMenus?: any[],
        public toolButtons?: LinkObject[],
    ) {
        super();
    }
}

/** 样式 */
const styles: { [name: string]: CSSProperties } = {
    container: { height: '100%', width: '100%', top: 0 },
    content: { overflow: 'auto', flex: 1, display: 'flex', flexDirection: 'column', height: '100%', }
};