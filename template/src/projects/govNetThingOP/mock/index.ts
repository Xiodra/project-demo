/*
 * 版权：Copyright (c) 2018 红网
 * 
 * 创建日期：Wednesday November 14th 2018
 * 创建者：胡燕龙(huyl) - y.dragon.hu@hotmail.com
 * 
 * 修改日期: Wednesday, 14th November 2018 4:53:20 pm
 * 修改者: 胡燕龙(huyl) - y.dragon.hu@hotmail.com
 * 
 * 说明
 * 		1、Mock测试数据
 *      2、Mock数据返回格式必须如：{result:data}
 */

import { mock } from "mockjs";
import { startMock } from "pao-aop-client";
import { HomeObject } from "src/models/home";

const dev = process.env.NODE_ENV === 'development';

if (dev) {
    startMock('http://localhost:3000/remoteCall', (serviceName, _) => {
        if (serviceName === "HomeService") {
            return home();
        }
        return null;
    });
}

function home() {
    const home = new HomeObject();
    home.title = "我是测试主页";
    return mock({ result: home });
}