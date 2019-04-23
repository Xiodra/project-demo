/*
 * 版权：Copyright (c) 2018 红网
 * 
 * 创建日期：Wednesday November 28th 2018
 * 创建者：杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 修改日期: Thursday, 29th November 2018 10:48:40 am
 * 修改者: 杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 说明
 * 		1、实现ECharts数据显示器用户详细信息图表模块功能
 */

import React from "react";
import { addon } from "pao-aop";
import { reactControl, BaseReactElementControl } from "pao-aop-client";
import './index.less';
import { Row, Tag, Tooltip } from "antd";
import NTCol from "src/business/style-components/col";

/**
 * 组件：用户详细信息组件状态
 */
export class DetailState {
}

/**
 * 组件：用户详细信息组件
 * 描述
 */
export class Detail extends React.Component<DetailControl, DetailState> {
    constructor(props: DetailControl) {
        super(props);
    }
    /** 打开图片页面 */
    open_picture = (url: string) => {
        console.log(url);
        window.open(url, "_blank", "scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes");
    }
    render() {
        const { detail, columns, type } = this.props;
        let className = type === 'dl-horizontal' ? 'dl-horizontal' : 'popular';
        let doms;
        if (className === 'dl-horizontal') {
            doms = columns!.map(({ title, fieldName }: ColumnConfig, index: number) => {
                return (
                    <div key={index}>
                        <dt>{title!}</dt>
                        {
                            detail ?
                                <dd>{detail[fieldName!]}</dd> : <dd />
                        }
                    </div>
                );
            });
        } else {
            doms = columns!.map(({ title, fieldName, type }: ColumnConfig, index: number) => {
                return (
                    <NTCol.NTSituationTenCol key={index}>
                        <dt>
                            {/* <Tooltip placement="bottomLeft" title={title!}> */}
                            <span>{title!}</span>
                            {/* </Tooltip> */}
                        </dt>
                        {
                            detail ?
                                <dd>
                                    {
                                        type && type === 'img' && detail[fieldName!] instanceof Array ?
                                            // <img src={detail[fieldName!]} />
                                            detail[fieldName!]!.map((row: string, index: number) => {
                                                return (
                                                    <Tag key={index} onClick={e => { this.open_picture(row); }}>点击查看</Tag>
                                                );
                                            })
                                            :
                                            <Tooltip placement="bottomLeft" title={detail[fieldName!]}>
                                                {detail[fieldName!] ?
                                                    <span>{detail[fieldName!]}</span>
                                                    : <span>&nbsp;</span>
                                                }
                                            </Tooltip>
                                    }
                                </dd>
                                : <dd />
                        }
                    </NTCol.NTSituationTenCol>

                    // <Col key={index} xs={24} sm={24} md={12} lg={8} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>

                    // </Col>
                );
            });
        }
        return (
            <dl className={className === 'dl-horizontal' ? 'dl-horizontal' : ''}>
                {
                    className === 'dl-horizontal' ? doms
                        :
                        <Row>
                            {
                                doms
                            }
                        </Row>
                }
            </dl>
        );
    }
}

/**
 * 标题和字段名字配置
 */
export interface ColumnConfig {
    /** 标题 */
    title?: string;
    /** 字段名 */
    fieldName?: any;
    /** 显示标签类型  img的时候fieldName需要传入url的数组 */
    type?: 'img';
}

/**
 * 控件：用户详细信息显示组件控制器
 * 控制显示用户详细信息组件
 */
@addon('detail', '用户详细信息显示组件控制器', '控制显示用户详细信息组件')
@reactControl(Detail)
export class DetailControl extends BaseReactElementControl {
    /**
     * 用户详细信息显示组件控制器
     * @param columns 字段显示中文配置列表
     * @param detail 用户详细信息数据字段
     * @param type 显示类型
     */
    constructor(public columns?: ColumnConfig[], public detail?: any, public type?: string) {
        super();
    }
}