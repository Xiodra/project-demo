import { BaseReactElement, reactControl, BaseReactElementControl } from "pao-aop-client";
import React from "react";
import { addon } from "pao-aop";
import { Row, Col } from "antd";
import FormItem from "antd/lib/form/FormItem";
import './index.less';

/*
 * 版权：Copyright (c) 2019 红网
 * 
 * 创建日期：Tuesday January 22nd 2019
 * 创建者：杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 修改日期: Tuesday, 22nd January 2019 10:02:05 am
 * 修改者: 杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 说明
 * 		1、行布局（一行）布局控件
 */

/**
 * 组件：行布局（一行）布局控件
 */
export class RowLayout extends BaseReactElement<RowLayoutControl> {
    render() {
        const { children } = this.props;
        return (
            <Row type="flex" gutter={24} style={{ flex: 1, marginLeft: 0, marginRight: 0, padding: '12px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'self-start', marginBottom: '23px', marginLeft: '3%', width: '115px', paddingTop: 5 }}>
                    {children![0]}
                </div>
                <Col xl={8} lg={8} md={24} sm={24} xs={24} style={{ display: 'flex' }}>
                    <FormItem style={{ width: '100%' }} className='text-input'>
                        {children![1]}
                    </FormItem>
                </Col>
            </Row>
        );
    }
}

/**
 * 控件：行布局（一行）布局控件
 * @description 控制一行中一个标题一个内容的显示的布局
 * @author 作者
 */
@addon('RowLayout', '行布局（一行）布局控件', '控制一行中一个标题一个内容的显示的布局')
@reactControl(RowLayout)
export class RowLayoutControl extends BaseReactElementControl {
    constructor() {
        super();
    }
}

/**
 * 组件：行布局（一行）布局控件
 */
export class RowDoubleColLayout extends BaseReactElement<RowDoubleColLayoutControl> {
    render() {
        const { children } = this.props;
        return (
            <Row type="flex" gutter={24} style={{ flex: 1, marginLeft: 0, marginRight: 0, padding: '12px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '23px', marginLeft: '3%', width: '115px' }}>
                    {children![0]}
                </div>
                <Col xl={8} lg={8} md={24} sm={24} xs={24} style={{ display: 'flex' }}>
                    <FormItem style={{ width: '100%' }} >
                        {children![1]}
                    </FormItem>
                </Col>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '23px', marginLeft: '3%', width: '115px' }}>
                    {children![2]}
                </div>
                <Col xl={8} lg={8} md={24} sm={24} xs={24} style={{ display: 'flex' }}>
                    <FormItem style={{ width: '100%' }} className='text-input'>
                        {children![3]}
                    </FormItem>
                </Col>
            </Row>
        );
    }
}

/**
 * 控件：行布局（一行）布局控件
 * @description 控制一行中两个标题和两个内容的显示的布局
 * @author 作者
 */
@addon('RowDoubleColLayout', '行布局（一行）布局控件', '控制一行中两个标题和两个内容的显示的布局')
@reactControl(RowDoubleColLayout)
export class RowDoubleColLayoutControl extends BaseReactElementControl {
    constructor() {
        super();
    }
}

/**
 * 组件：行布局（一行中一个标题两个内容）布局控件
 */
export class RowDoubleValueColLayout extends BaseReactElement<RowDoubleValueColLayoutControl> {
    render() {
        const { children } = this.props;
        return (
            <Row type="flex" gutter={24} style={{ flex: 1, marginLeft: 0, marginRight: 0, padding: '12px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'self-start', marginBottom: '23px', marginLeft: '3%', width: '115px', paddingTop: 5 }}>
                    {children![0]}
                </div>
                <Col xl={4} lg={4} md={24} sm={24} xs={24} style={{ display: 'flex' }}>
                    <FormItem style={{ width: '100%' }} className='text-input'>
                        {children![1]}
                    </FormItem>
                </Col>
                <Col xl={4} lg={4} md={24} sm={24} xs={24} style={{ display: 'flex' }}>
                    <FormItem style={{ width: '100%' }} className='text-input'>
                        {children![2]}
                    </FormItem>
                </Col>
            </Row>
        );
    }
}

/**
 * 控件：行布局（一行中一个标题两个内容）布局控件
 * @description 控制一行中一个标题两个内容的显示的布局
 * @author 作者
 */
@addon('RowDoubleValueColLayout', '行布局（一行中一个标题两个内容）布局控件', '控制一行中一个标题两个内容的显示的布局')
@reactControl(RowDoubleValueColLayout)
export class RowDoubleValueColLayoutControl extends BaseReactElementControl {
    constructor() {
        super();
    }
}