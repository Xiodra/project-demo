import { reactControl } from "pao-aop-client";
import React from "react";
import { addon } from "pao-aop";
import { Row, Col } from 'antd';
import { DisplayerState, BaseDisplayer, BaseDisplayerControl } from "src/business/report";

/**
 * 组件：多屏显示状态
 */
export interface DoubleScreenState extends DisplayerState {
}

/**
 * 组件：多屏显示组件
 */
export class DoubleScreenConsumption extends BaseDisplayer<DoubleScreenControls, DoubleScreenState> {
    /**
     * datas:存放所有数据数组
     */
    public dataList: any[] = [];

    // 拼接后完成的所有数据
    public complete: any[] = [];

    constructor(props: DoubleScreenControls) {
        super(props);
        this.state = {
            data: []
        };
    }

    /**
     * 组件：多屏屏显示组件设置数据
     * @param data 待设置数据
     */
    onSetData(dataView: DataView, data?: any) {
        this.dataList.push(data[0]);
        // 判断数据是否全部过来
        if (this.dataList.length === this.props.screen!.length) {
            for (let varlue in this.props.screen!) {
                if (varlue) {
                    for (let sdata in this.dataList) {
                        if (sdata) {
                            for (let key in this.dataList[sdata]) {
                                if (this.props.screen![varlue].fieldName === key) {
                                    let objs = { title: '', company: '', vals: '' };
                                    objs.title = this.props.screen![varlue].title;
                                    objs.company = this.props.screen![varlue].company;
                                    objs.vals = this.dataList[sdata][key];
                                    this.complete.push(objs);
                                }
                            }
                        }
                    }
                }

            }
            this.setState({
                data: this.complete
            });
        }
    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', color: '#ffffff' }}>
                {
                    this.state!.data!.map(function (value: any, key: any) {
                        return (
                            <div style={{ flex: '1' }} key={key}>
                                <div style={{ textAlign: 'center', paddingTop: '10px' }}><span className="screen-title">{value.title}</span></div>
                                <Row type="flex" justify="end" align="middle">
                                    <Col span={24} style={{ textAlign: 'center', marginTop: '5px', marginBottom: '10px' }}><span className="screen-company">{value.company}</span></Col>
                                </Row>
                                <Row type="flex" justify="center" align="middle">
                                    {value.vals.toString().padStart(8, '0').split('').map(function (values: any, keys: any) {
                                        return <Col style={{ marginLeft: '10px' }} className="screen-content" span={2} key={keys}>{values}</Col>;
                                    })}
                                </Row>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

/**
 * ScreenConfig 显示器配置接口
 */
export interface ScreenConfig {
    /** 
     * 显示器标题
     */
    title: string;
    /** 
     * 显示器单位
     */
    company: string;
    /** 
     * 数据字段
     */
    fieldName: string;
}
/**
 * 控件：多屏屏显示组件控制器
 * 描述：用来控制显示：多屏屏显示组件
 */
@addon('DoubleScreenConsumption', '多屏显示组件控制器', '控制显示多屏屏显示组件')
@reactControl(DoubleScreenConsumption)
export class DoubleScreenControls extends BaseDisplayerControl {
    /**
     * 控件：多屏屏显示组件控制器
     * @param screen 显示器数据数组
     */
    constructor(public screen?: ScreenConfig[]) {
        super();
    }
}