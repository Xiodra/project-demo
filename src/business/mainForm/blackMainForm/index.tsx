import React from "react";
import { addon, instanceOf } from "pao-aop";
import { BaseReactElementState, ReactMainForm, LinkObject, MenuItem, CommonIcon, ReactViewControl, reactControl, ReactMainFormControl } from "pao-aop-client";
import { Layout, Icon, Dropdown, Menu } from "antd";
import { NavBar } from "antd-mobile";
import { Link } from "react-router-dom";
import './index.less';

const { Content } = Layout;

export interface BlackBlankMainFormState extends BaseReactElementState {

}

/**
 * 组件：返回空白窗体应用
 */
export class BlackBlankMainForm extends ReactMainForm<BlackBlankMainFormControl, BlackBlankMainFormState> {
    /** 
     * 创建下拉工具按钮
     * @param linkObject 工具按钮对象
     */
    createDropdown?(linkObject: LinkObject) {
        const { key, title, icon, link, onClick, childLinkObjects, split, paramName } = linkObject, { match } = this.props;
        const linkString = split ? `${link}/${match!.params[paramName!]}` : link;
        console.info(linkString);
        if (childLinkObjects && childLinkObjects.length > 0) {
            const menu = (
                <Menu>
                    {
                        childLinkObjects.map(item => {
                            return <MenuItem key={key!} title={title} icon={icon} link={linkString} onClick={onClick} />;
                        })
                    }
                </Menu>);
            return (
                <Dropdown overlay={menu}>
                    <MenuItem key={key!} title={title} icon={icon} link={linkString} onClick={onClick} />
                </Dropdown>
            );
        } else {
            return (
                <Link key={key} to={linkString!} onClick={onClick}>
                    <CommonIcon
                        className='mobile-mainform-headerbutton mobile-mainform-header'
                        icon={icon}
                    />
                </Link>
            );
        }
    }
    render() {
        const { view, toolButtons, viewControl, black_path } = this.props;
        let toolbox: LinkObject[] = [];
        if (toolButtons && toolButtons.length > 0) {
            toolbox.push(...toolButtons);
        }
        if (instanceOf(viewControl, ReactViewControl) &&
            (viewControl as ReactViewControl).toolButtons && (viewControl! as ReactViewControl).toolButtons!.length > 0) {
            toolbox.push(...(viewControl as ReactViewControl).toolButtons!);
        }
        console.log(view!.props, view!.state);
        return (
            <Layout style={{ height: '100%' }}>
                <NavBar
                    icon={<Icon type={"left"} />}
                    onLeftClick={() => {
                        black_path ? window.location.href = black_path : window.history.back();
                    }}
                    rightContent={
                        toolbox && toolbox.length > 0 ?
                            <div>
                                {
                                    toolbox.map(button => this.createDropdown!(button))
                                }
                            </div> : null
                    }
                >
                    {
                        viewControl!.title || null
                    }
                </NavBar>
                <Content style={{ overflow: 'auto', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {
                        view
                    }
                </Content>
            </Layout>);
    }
}

/**
 * 控件：返回空白窗体应用
 */
@addon('BlackBlankMainFormControl', '返回空白窗体应用', '具有返回空白窗体应用')
@reactControl(BlackBlankMainForm, true)
export class BlackBlankMainFormControl extends ReactMainFormControl {
    /** 工具条 */
    public toolButtons?: LinkObject[];
    /** 返回路径 */
    public black_path?: string;
}