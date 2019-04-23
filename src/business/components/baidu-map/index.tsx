import { reactControl, BaseReactElementControl } from "pao-aop-client";

import React from "react";

import { addon } from "pao-aop";
import './index.less';
import { NTInput } from "../input/index";
import { Cascader, Row } from "antd";
import NTCol from "src/business/style-components/col";
import NTDivStyle from "src/business/style-components/div-style";
let options = [{
    value: '浙江',
    label: '浙江',
    children: [{
        value: '杭州',
        label: '杭州',
        children: [{
            value: '西湖',
            label: '西湖',
        }],
    }],
}, {
    value: '江苏',
    label: '江苏',
    children: [{
        value: '南京',
        label: '南京',
        children: [{
            value: '中华门',
            label: '中华门',
        }],
    }],
}];
export interface pointPro {
    lat?: string; // 经度
    lng?: string; // 纬度
}
/**
 * 组件：百度地图组件状态
 */
export interface BaiduMapState {
    lat?: string; // 经度
    lng?: string; // 纬度
    addressVal: any[]; // 省市区的值
    checkRepeat: boolean; // 防止连续触发
    addressDetails: string; // 详细地址的值
}

/**
 * 组件：百度地图组件
 */
export class BaiduMap extends React.Component<BaiduMapControl, BaiduMapState> {
    // 自定义控件取值常量
    static getDerivedStateFromProps(nextProps: any) {
        // Should be a controlled component.
        if ('value' in nextProps) {
            return {
                ...(nextProps.value || {}),
            };
        }
        return null;
    }
    constructor(props: any) {
        super(props);
        const value = props.value || {};
        this.state = {
            lat: value.lat || '',
            lng: value.lng || '',
            addressVal: value.addressVal || [],
            checkRepeat: true,
            addressDetails: value.addressDetails || ''
        };
    }
    // 省市区onchange触发
    onChangeAddress(e: any) {
        console.log(e);
        this.setState({ addressVal: e });
        this.triggerChange({ e });
    }
    // 详细地址onchange触发
    addressDetail(e: any) {
        let thiz = this;
        if (!(this.state.addressVal.length > 0)) {
            alert("请先选择省市区");
            return;
        }
        this.setState({ addressDetails: e.target.value });
        this.triggerChange({ e });
        // 根据地址在地图上描点
        window['geoc'].getPoint(
            e.target.value,
            function (point: any) {
                if (point) {
                    window['map'].clearOverlays(); // 清空地图上的描点
                    window['map'].centerAndZoom(point, 16); // 设置放大倍数
                    window['map'].addOverlay(new BMap.Marker(point)); // 描点
                    thiz.setState({
                        lat: point.lat,
                        lng: point.lng
                    });
                } else {
                    return;
                }
            },
            this.state.addressVal[1]
        );
    }
    // props onChange事件
    triggerChange = (changedValue: any) => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(Object.assign({}, this.state, changedValue, this.state));
        }
    }
    render() {
        let { pure } = this.props!;
        return (
            <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
                {
                    !pure ? <div><Row>
                        <NTCol.NTSituationOneCol>
                            <NTDivStyle.NTBaiduMapDetailedAddress>详细地址：</NTDivStyle.NTBaiduMapDetailedAddress>
                            {/* <span style={{ display: 'inline-block', float: 'left', width: '105px', textAlign: 'left', padding: '14px 0', fontWeight: 'bold' }}>详细地址：</span> */}
                            <Cascader options={options} onChange={(e) => { this.onChangeAddress(e); }} placeholder="请选择省市区" style={{ width: '50%' }} value={this.state.addressVal} />
                        </NTCol.NTSituationOneCol>
                    </Row>
                        <Row>
                            <NTCol.NTSituationTwoCol>
                                <NTInput height='small' radius='inputDefault' value={this.state.addressDetails} onChange={(e) => { this.addressDetail(e); }} placeholder="请输入详细地址" />
                            </NTCol.NTSituationTwoCol>
                            {/* <Col span={13} style={{ display: 'flex', marginLeft: '20px', alignItems: 'center', paddingLeft: 105, marginBottom: 10, marginRight: 2, position: 'relative' }}>
                                <NTInput height='small' radius='inputDefault' value={this.state.addressDetails} onChange={(e) => { this.addressDetail(e); }} placeholder="请输入详细地址" />
                            </Col> */}
                        </Row>
                        <Row>
                            <NTCol.NTSituationThreeCol>
                                {/* <div style={{ minWidth: 50 }}></div> */}
                                <NTDivStyle.NTMixWidth50px>经度：</NTDivStyle.NTMixWidth50px>
                                <NTInput height='small' radius='inputDefault' placeholder="经度" disabled={true} value={this.state.lng} />
                            </NTCol.NTSituationThreeCol>
                            <NTCol.NTSituationThreeCol>
                                {/* <div style={{ minWidth: 50 }}>纬度：</div> */}
                                <NTDivStyle.NTMixWidth50px>纬度：</NTDivStyle.NTMixWidth50px>

                                <NTInput height='small' radius='inputDefault' placeholder="纬度" disabled={true} value={this.state.lat} />
                            </NTCol.NTSituationThreeCol>
                            {/* <Col span={12} style={{ display: 'flex', justifyContent: 'row', alignItems: 'center', padding: 6 }}>
                                <div style={{ minWidth: 50 }}>经度：</div>
                                <NTInput height='small' radius='inputDefault' placeholder="经度" disabled={true} value={this.state.lng} />
                            </Col> */}
                            {/* <Col span={12} style={{ display: 'flex', justifyContent: 'row', alignItems: 'center', padding: 6 }}>
                                <div style={{ minWidth: 50 }}>纬度：</div>
                                <NTInput height='small' radius='inputDefault' placeholder="纬度" disabled={true} value={this.state.lat} />
                            </Col> */}
                        </Row>
                    </div> : <div />
                }
                <Row>
                    <NTCol.NTSituationFourCol />
                    {/* <Col span={24} id="allmap" style={{ height: '500px', width: '100%', overflow: 'hidden' }} /> */}
                </Row>
            </div>
        );
    }
    componentDidMount() {
        // 百度地图API功能
        var map1 = new BMap.Map("allmap");
        window['map'] = map1;
        let thiz = this;
        window['map'].centerAndZoom(new BMap.Point(116.404, 39.915), 10); // 中心坐标，方法倍数
        var geoc = new BMap.Geocoder();
        window['geoc'] = geoc;
        // 点击地图触发
        function showInfo(e: any) {
            window['map'].clearOverlays();
            var point = new BMap.Point(e.point.lng, e.point.lat);
            var marker = new BMap.Marker(point);  // 创建标注
            window['map'].addOverlay(marker);               // 将标注添加到地图中
            marker.setAnimation(BMAP_ANIMATION_BOUNCE); // 跳动的动画
            thiz.setState({
                lat: e.point.lat,
                lng: e.point.lng
            });
            var pt = e.point;
            geoc.getLocation(pt, function (rs: any) {
                var addComp = rs.addressComponents;
                // 组装级联控件数据源数据结构
                let cityItem = {
                    value: addComp.province,
                    label: addComp.province,
                    children: [{
                        value: addComp.city,
                        label: addComp.city,
                        children: [{
                            value: addComp.district,
                            label: addComp.district,
                        }],
                    }]
                };
                // 组装级联控件数据值数据
                let array = [];
                array.push(addComp.province);
                array.push(addComp.city);
                array.push(addComp.district);
                options.push(cityItem);
                thiz.setState({ addressVal: array, addressDetails: addComp.street + addComp.streetNumber });
                // alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
            });
        }
        window['map'].enableScrollWheelZoom(true); // 是否可以放大
        if (this.props.pointPro === undefined) {
            window['map'].addEventListener("click", showInfo);
        } else {
            let pointPro = this.props.pointPro;
            window['map'].clearOverlays();
            var point = new BMap.Point(pointPro.lng, pointPro.lat);
            window['map'].centerAndZoom(point, 16);
            var marker = new BMap.Marker(point);  // 创建标注
            window['map'].addOverlay(marker);               // 将标注添加到地图中
            marker.setAnimation(BMAP_ANIMATION_BOUNCE); // 跳动的动画
            window['map'].enableScrollWheelZoom(true);
            thiz.setState({
                lat: pointPro.lat,
                lng: pointPro.lng
            });

        }

    }
}

/**
 * 控件：百度地图组件控制器
 * @description 百度地图组件
 * @author 作者
 */
@addon('BaiduMap', '百度地图组件', '百度地图组件')
@reactControl(BaiduMap)
export class BaiduMapControl extends BaseReactElementControl {
    public pure?: boolean; // 精简版地图判断
    public pointPro?: pointPro; // 经度纬度
    // public onChange: (e: any) => void; // 自定义控件onchange
    constructor() {
        super();
    }
}