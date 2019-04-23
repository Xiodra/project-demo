import React from "react";
import { addon } from "pao-aop";
import { reactControl, BaseReactElementControl } from "pao-aop-client";
import { Layout, Row, Col, Skeleton } from "antd";
import { HeadLeftRight } from "src/business/style-components/head-left-right";
import { ContentBorder } from "src/business/style-components/content-border";
import { BaseLayoutControl } from "../base";
import './index.less';
const { Header, Content } = Layout;

let moment = require('moment');
/**
 * 组件：态势图布局控件analysis-chart
 */
export class SituationChartLayout extends React.Component<SituationChartLayoutControl, { time: string }> {
    interval?: any;
    constructor(props: any) {
        super(props);
        this.state = {
            time: ''
        };
    }
    componentDidMount() {
        this.interval = setInterval(() => { this.setState({ time: moment().format('YYYY年MM月DD日 HH:mm:ss'), }); }, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render() {
        const { childControls, title } = this.props;
        return (
            <div style={{ height: '100%', width: '100%' }}>
                <Layout style={{ height: '100%', overflow: 'hidden', backgroundImage: 'url(' + require('../style/image/background.jpg') + ')' }}>
                    <HeadLeftRight>{this.state.time}</HeadLeftRight>
                    {
                        !title ?
                            null :
                            <Header style={{ textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0)' }} className="report-title">
                                <span>{title!}</span>
                            </Header>
                    }
                    <Content style={{ display: 'flex' }}>
                        {
                            !childControls ?
                                null :
                                (
                                    <Row type="flex" gutter={24} style={{ flex: 1, marginLeft: 0, marginRight: 0 }}>
                                        <Col xl={7} lg={7} md={24} sm={24} xs={24} style={{ display: 'flex', flexDirection: 'column' }}>
                                            <Row type="flex" style={{ flex: 2 }}>

                                                <Col style={{ flex: 'auto', margin: '12px 0', position: 'relative' }} className="col-border-default" >
                                                    <ContentBorder>
                                                        {
                                                            childControls[0] ? childControls[0].createElement!() : <Skeleton />
                                                        }
                                                    </ContentBorder>
                                                </Col>
                                            </Row>
                                            <Row type="flex" style={{ flex: 2 }}>
                                                <Col style={{ flex: 'auto', margin: '12px 0', position: 'relative' }} className="col-border-default" >
                                                    <ContentBorder>
                                                        {
                                                            childControls[1] ? childControls[1].createElement!() : <Skeleton />
                                                        }
                                                    </ContentBorder>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xl={11} lg={11} md={24} sm={24} xs={24} style={{ display: 'flex', flexDirection: 'column' }}>
                                            <Row type="flex" style={{ flex: 2 }}>
                                                <Col style={{ flex: 'auto', margin: '8% 0 0 0' }} className="col-border-none">
                                                    {
                                                        childControls[2] ? childControls[2].createElement!() : <Skeleton />
                                                    }
                                                </Col>
                                            </Row>
                                            <Row type="flex" style={{ flex: 1 }}>
                                                <Col style={{ flex: 'auto', margin: '12px 0' }} className="col-border-none">
                                                    {
                                                        childControls[3] ? childControls[3].createElement!() : <Skeleton />
                                                    }
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xl={6} lg={6} md={24} sm={24} xs={24} style={{ display: 'flex', flexDirection: 'column' }}>
                                            <Row type="flex" style={{ flex: 1 }}>
                                                <Col style={{ flex: 'auto', margin: '12px 0', position: 'relative' }} className="col-border-default">
                                                    <ContentBorder>
                                                        {
                                                            childControls[4] ? childControls[4].createElement!() : <Skeleton />
                                                        }
                                                    </ContentBorder>
                                                </Col>
                                            </Row>
                                            <Row type="flex" style={{ flex: 2 }}>
                                                <Col style={{ flex: 'auto', margin: '12px 0', position: 'relative' }} className="col-border-default">
                                                    <ContentBorder>
                                                        {
                                                            childControls[5] ? childControls[5].createElement!() : <Skeleton />
                                                        }
                                                    </ContentBorder>
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
 * 控件：态势图布局控件
 */
@addon('SituationChartLayoutControl', '态势图布局控件', '用于态势图的布局控件')
@reactControl(SituationChartLayout)
export class SituationChartLayoutControl extends BaseLayoutControl {
    /**
     * 控件：态势图布局控件
     * @param childControls 子控件列表
     */
    constructor(childControls?: BaseReactElementControl[]) {
        super(childControls);
    }
}