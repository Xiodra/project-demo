/*
 * 版权：Copyright (c) 2018 红网
 * 
 * 创建日期：Saturday December 22nd 2018
 * 创建者：杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 修改日期: Saturday, 22nd December 2018 3:00:44 pm
 * 修改者: 杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 说明
 * 		1、实现MapBox室内地图显示模块功能
 */

import React from "react";

import { addon } from "pao-aop";

import { reactControl, BaseReactElementControl } from "pao-aop-client";

import './index.less';
/**
 * 组件：室内地图mapbox组件状态
 */
export class IndoorMapBoxState {
}

/**
 * 组件：室内地图mapbox组件控制器
 * 控制调用室内地图显示组件
 */
export class IndoorMapBox extends React.Component<IndoorMapBoxControl, IndoorMapBoxState> {
    constructor(props: IndoorMapBoxControl) {
        super(props);
    }
    componentDidMount() {
    }
    render() {
        let { longitude, latitude, is_render } = this.props;
        if (is_render) {
            setTimeout(
                function () {
                    // init mapbox-gl
                    const mapbox = new mapboxgl.Map({
                        container: 'beemap',
                    });
                    // init mapxus map
                    const map = new MapxusMap.Map({
                        map: mapbox,
                        appId: 'com.gre.app.web',
                        secret: 'khyhe4Fz/',
                        // buildingId: '209b497416464d129b9ede359284caba',
                        // floor: this.props.floor,
                    });
                    // map.renderComplete(() => {
                    //     mapbox.setZoom(19);
                    // create marker
                    // let marker = new MapxusMap.Marker(map);
                    // map.onFloorChangeListener((floor: any) => {
                    //     marker.switch(floor.floor);
                    // });
                    // let coordinates = [113.166194, 23.067571];
                    // let coordinates = [this.props.longitude,this.props.latitude];
                    // marker.create(coordinates, map.currentFloor, map.building.id);
                    // marker.create(coordinates);
                    // marker on click event 
                    // marker.onEventListener('click', (evt: any) => {
                    //     // use mapbox popup function to display
                    //     new mapboxgl.Popup()
                    //         .setLngLat(evt.lngLat)
                    //         .setHTML(
                    //             '<p>floor: ' + map.currentFloor + '</p>' +
                    //             '<p>lat: ' + evt.lngLat.lat + '</p>' +
                    //             '<p>lng: ' + evt.lngLat.lng + '</p>'
                    //         )
                    //         .addTo(mapbox);
                    // });
                    // });
                    let sourceId = "myPoint";
                    let coordinates = [longitude, latitude];
                    var layerId = sourceId + "Layer";
                    function addSource() {
                        mapbox.addSource(sourceId, {
                            type: "geojson",
                            data: {
                                type: "Feature",
                                geometry: {
                                    type: "Point",
                                    coordinates: coordinates
                                }
                            }
                        });
                    }
                    function addLayer() {
                        mapbox.addLayer({
                            id: layerId,
                            type: "circle",
                            source: sourceId,
                            paint: {
                                "circle-radius": 5,
                                "circle-color": "#007cbf",
                            }
                        });
                    }
                    // mapxus load map listener

                    map.renderComplete(function () {
                        mapbox.setZoom(15);
                        mapbox.setCenter([longitude, latitude]);
                        addSource();
                        addLayer();
                    });
                },
                100
            );
        }
        return (
            <div id="beemap" className="mapbox-map" />
        );
    }
}

/**
 * 控件：室内地图mapbox组件控制器
 * 控制调用室内地图显示组件
 */
@addon('IndoorMapBoxControl', '室内地图mapbox组件控制器', '控制调用室内地图显示组件')
@reactControl(IndoorMapBox)
export class IndoorMapBoxControl extends BaseReactElementControl {
    /** 经度 */
    longitude?: string;
    /** 纬度 */
    latitude?: string;
    /** 楼层 */
    floor?: string;
    /** 是否渲染 */
    is_render?: boolean;
    constructor() {
        super();
    }
}