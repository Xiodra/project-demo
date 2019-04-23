/*
 * 版权：Copyright (c) 2018 红网
 * 
 * 创建日期：Wednesday November 28th 2018
 * 创建者：杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 修改日期: Thursday, 29th November 2018 10:46:20 am
 * 修改者: 杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 说明
 * 		1、实现ECharts数据显示器图表模块功能
 */
import React from "react";
import { addon } from "pao-aop";
import { reactControl } from "pao-aop-client";
import { DetailControl } from "src/business/components/detail";
import { echartsMapControl } from "src/business/components/echarts-map";
import { Row, Col } from "antd";
import { IndoorMapBoxControl } from "src/business/components/indoor-map-box";
import { DisplayerState, BaseDisplayer, BaseDisplayerControl } from "src/business/report";

/**
 * 组件：地图详情组件状态
 */
export interface MapDetailState extends DisplayerState {
    /** 经度 */
    longitude?: string;
    /** 纬度 */
    latitude?: string;
    /** 楼层 */
    floor?: string;
    /** 用户详细信息数据 */
    detail?: any;
    /** 循环次数 */
    render_number?: number;
}

/**
 * 组件：地图详情组件
 */
export class MapDetail extends BaseDisplayer<MapDetailControl, MapDetailState> {
    constructor(props: MapDetailControl) {
        super(props);
        this.state = { data: [] };
    }

    render() {
        // 放成一左一右的布局(响应布局)
        const { mapControl, detailControl } = this.props;
        detailControl!.detail = this.state.detail;
        if (mapControl instanceof IndoorMapBoxControl && this.state.longitude && this.state.latitude && this.state.render_number === 1) {
            (mapControl as IndoorMapBoxControl).longitude = this.state.longitude;
            (mapControl as IndoorMapBoxControl).latitude = this.state.latitude;
            (mapControl as IndoorMapBoxControl).floor = 'F9'; // this.state.floor;
            (mapControl as IndoorMapBoxControl).is_render = true;
            this.setState({
                render_number: this.state.render_number + 1
            });
        } else {
            (mapControl as IndoorMapBoxControl).is_render = false;
        }

        return (
            <Row type='flex' style={{ height: '100%' }}>
                <Col xs={10} sm={10} md={10} lg={10} xl={10}>{mapControl!.createElement!()}</Col>
                <Col xs={14} sm={14} md={14} lg={14} xl={14}>{detailControl!.createElement!()}</Col>
            </Row>
        );
    }

    onSetData(dataView: DataView, data?: any) {
        const { longitudeFieldName, latitudeFieldName, floorFieldName } = this.props;
        const { [longitudeFieldName!]: longitude, [latitudeFieldName!]: latitude, [floorFieldName!]: floor, ...rest } = data[0];

        if (this.props.mapControl! instanceof echartsMapControl) {
            (this.props.mapControl! as echartsMapControl).change!(longitude, latitude);
        }
        this.setState({
            longitude: longitude,
            latitude: latitude,
            floor: floor,
            detail: rest,
            render_number: 1
        });
    }
}

/**
 * 控件：地图详情显示组件控制器
 * 控制显示地图详情组件
 */
@addon('MapDetailControl', '地图详情显示组件控制器', '控制显示地图详情组件')
@reactControl(MapDetail)
export class MapDetailControl extends BaseDisplayerControl {
    /**
     * 经度字段名称
     */
    longitudeFieldName?: string;
    /** 
     * 纬度字段名称
     */
    latitudeFieldName?: string;
    /** 
     * 楼层字段名称
     */
    floorFieldName?: string;
    /**
     * 地图详情显示组件控制器
     * @param mapControl 单点图显示组件控制器
     * @param detailControl 用户详细信息显示组件控制器
     */
    constructor(public mapControl?: echartsMapControl | IndoorMapBoxControl, public detailControl?: DetailControl) {
        super();
    }
}
