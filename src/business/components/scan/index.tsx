import { BaseReactElementState, BaseReactElement, BaseReactElementControl, reactControl } from "pao-aop-client";
import React from "react";
import { addon } from "pao-aop";
import { Button } from "antd";
/**
 * 组件：二维码扫描状态
 */
export interface NTScanState extends BaseReactElementState {
}

/**
 * 组件：二维码扫描
 * 描述
 */
export class NTScan extends BaseReactElement<NTScanControl, NTScanState> {

    render() {
        return (
            <div>
                <Button onClick={() => { window.postMessage('scan', ''); }} style={{ margin: 5 }}>扫描二维码</Button>
            </div>
        );
    }
    componentDidMount() {
        // document.addEventListener('message', (msg) => {
        //     let data = JSON.stringify(msg);
        //     // let data = JSON.parse(msg['data']);
        //     // if (data['id'] !== undefined && data['id'] === 'imgs') {
        //     //     this.setState({
        //     //         imgurl: data['data']['uri']
        //     //     });
        //     // } else {
        //     //     alert(JSON.stringify(data));
        //     // }
        //     alert(data);
        // });
    }
}
/**
 * 控件：二维码扫描控制器
 * 描述
 */
@addon('NTScan', '二维码扫描', '扫描二维码')
@reactControl(NTScan)
export class NTScanControl extends BaseReactElementControl {
    constructor() {
        super();
    }
}