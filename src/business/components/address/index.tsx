import { BaseReactElementState, BaseReactElement, reactControl, BaseReactElementControl } from "pao-aop-client";
import React from "react";
import './index.less';
import { addon } from "pao-aop";
import { Select, Row, Col } from 'antd';
import { NTInput } from "../input/index";
import NTCol from "src/business/style-components/col";
const China = require('./data.json');
const Data: any[] = China.data;
const Option = Select.Option;

/**
 * 地址
 */
export interface AddressObject {
    /** 省 */
    province?: string;
    /** 市 */
    city?: string;
    /** 区 */
    area?: string;
    /** 地址 */
    detail?: string;
}

/**
 * 组件：地址组件状态
 */
export interface AddressState extends BaseReactElementState {
    /** 省 */
    province?: string;
    /** 市 */
    city?: string;
    /** 区 */
    area?: string;
    /** 地址 */
    detail?: string;
}
/**
 * 组件：地址组件
 */
export class Address extends BaseReactElement<AddressControl, AddressState> {
    static getDerivedStateFromProps(nextProps: any, state: any) {
        // Should be a controlled component.
        if ('value' in nextProps) {
            return { ...(nextProps.value || {}) };
        }
        return null;
    }
    constructor(props: AddressControl) {
        super(props);
        const value = this.props.value || {};
        this.state = { ...value };
    }
    handleProvinceChange = (value: string) => {
        this.setState({ province: value });
        this.triggerChange({ province: value, city: '', area: '', detail: '' });
    }
    onSecondCityChange = (value: string) => {
        this.setState({ city: value });
        this.triggerChange({ city: value, area: '', detail: '' });
    }
    onThirdCityChange = (value: string) => {
        this.setState({ area: value });
        this.triggerChange({ area: value, detail: '' });
    }
    /** 事件回调 */
    triggerChange = (changedValue: any) => {
        const onChange = this.props.onChange, { isMobile, ...rest } = this.state;
        if (onChange) {
            onChange(Object.assign({}, rest, changedValue));
        }
    }
    /** 内容变更方法 */
    handleTitleChange = (e: React.ChangeEvent<{ value: string }>) => {
        this.setState({ detail: e.target.value });
        this.triggerChange({ detail: e.target.value });
    }
    render() {

        let { province, city, area, detail } = this.state;

        return (
            <Row>
                <Col span={8}>
                    <Select
                        value={province}
                        style={{ width: '100%' }}
                        onChange={this.handleProvinceChange}
                        placeholder="请选择省级"
                    >
                        {
                            Data.map((provinceItem: any, index: any) => {
                                console.log('ee', this.state.province);
                                return <Option key={provinceItem.name}>{provinceItem.name}</Option>;
                            })
                        }
                    </Select>
                </Col>
                {/* <Col span={8} style={{ paddingLeft: 10 }}> */}
                <NTCol.NTSituationSixteenCol>
                    <Select
                        // value={Data[this.state.provinceId].sub[this.state.cityId].name}
                        value={city}
                        style={{ width: '100%' }}
                        onChange={this.onSecondCityChange}
                        placeholder="请选择市级"
                    >
                        {
                            province ?
                                Data.map((provinceItem: any, index: any) => {
                                    if (provinceItem.name === province) {
                                        return provinceItem.sub.map((cityItem: any) => {
                                            return <Option key={cityItem.name}>{cityItem.name}</Option>;
                                        });
                                    }
                                }) :
                                null
                        }
                    </Select>
                </NTCol.NTSituationSixteenCol>

                {/* </Col> */}
                {/* <Col span={8} style={{ paddingLeft: 10 }}> */}
                <NTCol.NTSituationSixteenCol>
                    <Select
                        value={area}
                        style={{ width: '100%' }}
                        onChange={this.onThirdCityChange}
                        placeholder="请选择区级"
                    >
                        {
                            province && city ?
                                Data.map((provinceItem: any, index: any) => {
                                    if (provinceItem.name === province) {
                                        return provinceItem.sub.map((cityItem: any) => {
                                            if (cityItem.name === city) {
                                                return cityItem.sub.map((areaItem: any) => {
                                                    return <Option key={areaItem.name}>{areaItem.name}</Option>;
                                                });
                                            }
                                        });
                                    }
                                }) :
                                null
                        }
                    </Select>
                </NTCol.NTSituationSixteenCol>

                {/* </Col> */}
                {/* <Col span={24} style={{ marginTop: 12 }}> */}
                <NTCol.NTSituationSeventeenCol>
                    <NTInput value={detail} placeholder="请输入详细地址，精确到门牌号" height="small" radius="inputDefault" onChange={this.handleTitleChange} />
                </NTCol.NTSituationSeventeenCol>
                {/* </Col> */}
            </Row>
        );
    }
}

/**
 * 控件：地址组件控制器
 * @description 描述
 * @author 作者
 */
@addon('Address', '地址组件控制器', '地址组件控制器')
@reactControl(Address)
export class AddressControl extends BaseReactElementControl {

}