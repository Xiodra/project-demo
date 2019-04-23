import React from "react";
import { addon } from "pao-aop";
import { reactControl, BaseReactElementControl } from "pao-aop-client";
import { Layout, Row, Col, Skeleton } from "antd";
import './index.less';
import { HeadLeftRight } from "src/business/style-components/head-left-right";
import { AnalysisContentBorder } from "src/business/style-components/analysis-content-border";
import { BaseLayoutControl } from "../base";
const { Header, Content } = Layout;
let moment = require('moment');
/**
 * 组件：分析图布局控件
 */
export class AnalysisChartLayout extends React.Component<AnalysisChartLayoutControl, { time: string }> {
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
                <Layout style={{ height: '100%', backgroundImage: 'url(' + require('../style/image/background.jpg') + ')' }}>
                    <HeadLeftRight>{this.state.time}</HeadLeftRight>
                    {
                        !title ?
                            null :
                            <Header style={{ textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0)' }} className="report-title" >

                                <span>{title!}</span>

                            </Header>
                    }
                    <Content style={{ display: 'flex' }}>
                        {
                            !childControls ?
                                null :
                                (
                                    <Row type="flex" gutter={24} style={{ flex: 1, marginLeft: 0, marginRight: 0 }}>
                                        <Col xl={9} lg={9} md={24} sm={24} xs={24} style={{ display: 'flex', flexDirection: 'column' }}>
                                            <Row type="flex" style={{ flex: 2 }}>
                                                <Col className="col-border-none" style={{ flex: 1, margin: '12px 0', minHeight: 400 }}>
                                                    {
                                                        childControls[0] ? childControls[0].createElement!() : <Skeleton />
                                                    }
                                                </Col>
                                            </Row>
                                            <Row type="flex" style={{ flex: 1 }}>
                                                <Col className="col-border-default" style={{ flex: 1, margin: '12px 0', minHeight: 200, position: 'relative' }}>
                                                    <AnalysisContentBorder>
                                                        {
                                                            childControls[1] ? childControls[1].createElement!() : <Skeleton />
                                                        }
                                                    </AnalysisContentBorder>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xl={9} lg={9} md={24} sm={24} xs={24} style={{ display: 'flex', flexDirection: 'column' }}>
                                            <Row type="flex" style={{ flex: 2 }}>
                                                <Col className="col-border-none" style={{ flex: 1, margin: '12px 0', minHeight: 400 }}>
                                                    {
                                                        childControls[2] ? childControls[2].createElement!() : <Skeleton />
                                                    }
                                                </Col>
                                            </Row>
                                            <Row type="flex" style={{ flex: 1 }}>
                                                <Col className="col-border-default" style={{ flex: 1, margin: '12px 0', minHeight: 200, position: 'relative' }}>
                                                    <AnalysisContentBorder>
                                                        {
                                                            childControls[3] ? childControls[3].createElement!() : <Skeleton />
                                                        }
                                                    </AnalysisContentBorder>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xl={6} lg={6} md={24} sm={24} xs={24} style={{ display: 'flex', flexDirection: 'column' }}>
                                            <Row type="flex" style={{ flex: 2 }}>
                                                <Col className="col-border-default" style={{ flex: 1, margin: '12px 0', minHeight: 200, position: 'relative' }}>
                                                    <AnalysisContentBorder>
                                                        {
                                                            childControls[4] ? childControls[4].createElement!() : <Skeleton />
                                                        }
                                                    </AnalysisContentBorder>
                                                </Col>
                                            </Row>
                                            <Row type="flex" style={{ flex: 1 }}>
                                                <Col className="col-border-default" style={{ flex: 1, margin: '12px 0', minHeight: 200, position: 'relative' }}>
                                                    <AnalysisContentBorder>
                                                        {
                                                            childControls[5] ? childControls[5].createElement!() : <Skeleton />
                                                        }
                                                    </AnalysisContentBorder>
                                                </Col>
                                            </Row>
                                            <Row type="flex" style={{ flex: 1 }}>
                                                <Col className="col-border-default" style={{ flex: 1, margin: '12px 0', minHeight: 200, position: 'relative' }}>
                                                    <AnalysisContentBorder>
                                                        {
                                                            childControls[6] ? childControls[6].createElement!() : <Skeleton />
                                                        }
                                                    </AnalysisContentBorder>
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
 * 控件：分析图布局控件
 */
@addon('AnalysisChartLayoutControl', '分析图布局控件', '用于数据分析图的布局控件')
@reactControl(AnalysisChartLayout)
export class AnalysisChartLayoutControl extends BaseLayoutControl {
    /**
     * 分析图布局控件
     * @param childControls 子控件列表
     */
    constructor(childControls?: BaseReactElementControl[]) {
        super(childControls);
    }
}