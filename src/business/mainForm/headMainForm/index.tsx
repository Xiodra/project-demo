import { reactControl, ReactMainFormControl, ReactMainForm, ReactMainFormState, } from "pao-aop-client";
import React, { CSSProperties } from "react";
import { addon } from "pao-aop";
import { Layout, } from "antd";
import './index.less';
const { Content } = Layout;

/** 状态：带头部应用窗体 */
export interface HeadMainFormState extends ReactMainFormState {
}

/** 组件：带头部应用窗体 */
export class HeadMainForm extends ReactMainForm<HeadMainFormControl, HeadMainFormState> {
    /** 带头部应用窗体 */
    constructor(props: HeadMainFormControl) {
        super(props);
    }
    render() {
        const { view, logo_path, title } = this.props;
        return (
            <Layout style={styles.container}>
                <div className={'head_main_form_head'}>
                    <div className={'show_or_no'}>
                        <div style={{ display: 'inline-block', height: '60px', lineHeight: '50px', padding: '0 20px', borderRight: '1px solid rgba(170, 170, 170, 1)', color: 'rgba(16, 16, 16, 1)', fontSize: '32px', float: 'left', }}>
                            {
                                logo_path ?
                                    <img src={logo_path} style={{ height: '46px' }} />
                                    : '广东鑫兴科技logo'
                            }
                        </div>
                        <div style={{ display: 'inline-block', height: '60px', lineHeight: '60px', padding: '0 20px', color: 'rgba(16, 16, 16, 1)', float: 'left', fontSize: '28px', }}>
                            {
                                title
                            }
                        </div>
                    </div>
                </div>
                <div style={{ position: 'absolute', top: '100px', bottom: '0', width: '100%', }}>
                    <div style={{ display: 'inline-block', height: '100%', width: '100%' }}><img src={require('./loginBg.jpg')} style={{ height: '100%', width: '100%' }} /></div>
                    <div style={{ display: 'inline-block', position: 'absolute', top: '0', left: '0', height: '100%', width: '100%' }}>
                        <Content style={styles.content}>
                            {
                                view
                            }
                        </Content>
                    </div>

                </div>
            </Layout>);
    }
}

/**
 * 控件：带头部应用窗体控制器
 * @description 用于带头部窗体
 */
@addon('HeadMainForm', '带头部应用窗体', '用于带头部的窗体')
@reactControl(HeadMainForm, true)
export class HeadMainFormControl extends ReactMainFormControl {
    /**
     * 带头部窗体
     * @param logo_path logo图片
     * @param title 标题
     */
    constructor(
        public logo_path?: string,
        public title?: string,
    ) {
        super();
    }
}

/** 样式 */
const styles: { [name: string]: CSSProperties } = {
    container: { position: 'fixed', height: '100%', width: '100%', top: 0 },
    content: { overflow: 'auto', flex: 1, display: 'flex', flexDirection: 'column', height: '100%', background: '#ffffff' }
};