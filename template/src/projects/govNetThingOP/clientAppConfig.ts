/*
 * 版权：Copyright (c) 2019 红网
 * 
 * 创建日期：Tuesday April 23rd 2019
 * 创建者：胡燕龙(huyl) - y.dragon.hu@hotmail.com
 * 
 * 修改日期: Tuesday, 23rd April 2019 10:26:24 am
 * 修改者: 胡燕龙(huyl) - y.dragon.hu@hotmail.com
 * 
 * 说明
 * 		1、政务物联网运维APP配置
 */
import { GovNetThingOPApplication } from './app';
import './mock';
import { AppMainFormControl } from 'src/business/mainForm/appMainForm';
import { AppReactRouterControl, AjaxJsonRpcFactory } from 'pao-aop-client';
import { createObject } from 'pao-aop';
import { HomeViewControl } from './views/index';
import { IHomeService } from 'src/models/home';

const remote = {
    url: 'http://localhost:3000/remoteCall',
    home: 'HomeService'
};

const path = {
    index: "/",
    home: "/home",
    detail: "/detail",
    device: "/device",
    circle: "/circle",
    user: "/user",
    scan: "/scan",
};

const mainFormID = 'main';

const mainForm = new AppMainFormControl(
    "政务物联网运维",
    [
        { key: "home", title: "首页", icon: "antd@home", link: path.home },
        { key: "device", title: "设备", icon: "font@nt-device-list", link: path.device },
        { key: "circle", title: "圈子", icon: "font@nt-circle", link: path.circle },
        { key: "mine", title: "我的", icon: "antd@user", link: path.user }
    ],
    [
        { key: "scan", icon: "antd@scan", link: "/scan" }
    ]
);

const router = new AppReactRouterControl(
    {
        [mainFormID]: mainForm,
    },
    [
        {
            path: path.index,
            redirect: "home",
            exact: true
        },
        {
            path: path.home,
            mainFormID: mainFormID,
            targetObject: createObject(
                HomeViewControl, {
                    homeService_Fac: new AjaxJsonRpcFactory(IHomeService, remote.url, remote.home),
                })
        },
    ]
);

export let defaultObject = new GovNetThingOPApplication(
    router
);

export default defaultObject;