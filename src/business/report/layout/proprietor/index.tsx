import React from "react";
import { addon } from "pao-aop";
import { reactControl, BaseReactElementControl } from "pao-aop-client";
import { Layout, Row, Col, Skeleton } from "antd";
import './index.less';
import { ProprietorHeac } from "src/business/style-components/proprietor-head";
import { BaseLayoutControl } from "../base";
let moment = require('moment');
const { Header, Content } = Layout;
/**
 * 组件：住户报表布局控件
 */
export class ProprietorChartLayout extends React.Component<ProprietorChartLayoutControl, { time: string }> {
    constructor(props: any) {
        super(props);
        this.state = {
            time: ''
        };
    }
    componentDidMount() {
        setInterval(() => { this.setState({ time: moment().format('YYYY年MM月DD日 HH:mm:ss'), }); }, 1000);
    }
    render() {
        const { childControls, title } = this.props;
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <Layout style={{ height: '100%', backgroundImage: 'url(' + require('../style/image/background_03.jpg') + ')', backgroundRepeat: 'no-repeat', backgroundSize: '100%' }}>
                    <ProprietorHeac>{this.state.time}</ProprietorHeac>
                    {
                        !title ?
                            null :
                            <Header style={{ textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0)' }} className="report-title">
                                <div style={{ marginTop: '3.5%', display: 'inline-block', lineHeight: '14px' }}>{title!}</div>
                            </Header>
                    }
                    <Content style={{ display: 'flex' }} className="layout">
                        {
                            !childControls ?
                                null :
                                (
                                    <Row type="flex" gutter={24} style={{ flex: 1, marginLeft: 0, marginRight: 0 }}>
                                        <Col xl={16} lg={16} md={24} sm={24} xs={24} style={{ display: 'flex', flexDirection: 'column' }} className="chart-border-right-dashed" >
                                            <Row type="flex" style={{ flex: 2 }} >
                                                <Col style={{ flex: 'auto', margin: '12px 0', position: 'relative' }} className="col-border-none">
                                                    <img src={require('../style/image/change.png')} style={{ position: 'absolute', bottom: ' 23px', paddingRight: '90px', width: '8%', left: '29.8%' }} />
                                                    <a href={"/indoorMap"} target="_blank" style={{ position: 'absolute', bottom: ' 18px', paddingRight: '10px', width: '42%', fontSize: '24px', textAlign: 'right', color: '#12D3FF', fontFamily: 'zcool-gdh', zIndex: 100, textDecoration: 'none' }}>切换室内地图</a>
                                                    {
                                                        childControls[0] ? childControls[0].createElement!() : <Skeleton />
                                                    }
                                                </Col>
                                            </Row>

                                            <Row type="flex" style={{ flex: 1 }} className="chart-border-top-dashed">
                                                <Col style={{ flex: 'auto', margin: '12px 12px 12px 0', position: 'relative' }} className="col-border-none chart-border-right-dashed">
                                                    <div style={{ position: 'absolute', top: ' 50px', width: '100%', fontSize: '24px', textAlign: 'center', color: '#12D3FF', fontFamily: 'zcool-gdh' }}>月度</div>
                                                    {
                                                        childControls[1] ? childControls[1].createElement!() : <Skeleton />
                                                    }
                                                </Col>
                                                <Col style={{ flex: 'auto', margin: '12px 0px 12px 12px' }} className="col-border-none">
                                                    {
                                                        childControls[2] ? childControls[2].createElement!() : <Skeleton />
                                                    }
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xl={8} lg={8} md={24} sm={24} xs={24} style={{ display: 'flex', flexDirection: 'column' }} >
                                            <Row type="flex" style={{ flex: 2 }}>
                                                <Col style={{ flex: 'auto', margin: '12px 0' }} className="col-border-none">
                                                    {
                                                        childControls[3] ? childControls[3].createElement!() : <Skeleton />
                                                    }
                                                </Col>
                                            </Row>
                                            <Row type="flex" style={{ flex: 3 }} className="chart-border-top-dashed">
                                                <Col style={{ flex: 'auto', margin: '12px 0' }} className="col-border-none">
                                                    {
                                                        childControls[4] ? childControls[4].createElement!() : <Skeleton />
                                                    }
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                )
                        }
                    </Content>
                </Layout>
            </div>
        );
    }
}

/**
 * 控件：住户报表布局控件
 */
@addon('ProprietorChartLayoutControl', '住户报表布局控件', '用于住户报表的布局控件')
@reactControl(ProprietorChartLayout)
export class ProprietorChartLayoutControl extends BaseLayoutControl {
    /**
     * 控件：住户报表布局控件
     * @param childControls 子控件列表
     */
    constructor(childControls?: BaseReactElementControl[]) {
        super(childControls);
    }
}