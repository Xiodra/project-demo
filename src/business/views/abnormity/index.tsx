import React from "react";
import { reactControl, ReactViewState, ReactView, ReactViewControl, } from "pao-aop-client";
import { addon } from "pao-aop";
import './index.less';
import { Button } from "antd";

/**
 * 组件：异常页面状态
 */
export interface AbnormityViewState extends ReactViewState {
}

/**
 * 组件：异常页面组件
 * 描述：异常页面组件
 */
export class AbnormityView extends ReactView<AbnormityViewControl, AbnormityViewState> {
    constructor(props: AbnormityViewControl) {
        super(props);
    }
    componentDidMount() {

    }
    return_btn = () => {
        this.props.return_btn!;
        this.props.history!.push('/securitySettings');
    }
    render() {
        return (
            <div style={{ margin: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80%', minHeight: '500px' }}>
                    <div style={{ zoom: 1, paddingRight: '88px' }}>
                        <div style={{ display: 'inline-block', width: '230.5px', height: '265px', backgroundImage: 'url(' + require('./wq.svg') + ')' }} />
                    </div>
                    <div>
                        <div style={{ marginBottom: ' 16px', color: 'rgba(0,0,0,.45)', fontSize: '20px', lineHeight: '28px' }}>
                            抱歉，你无权权限访问此页面！
                        </div>
                        <Button type='primary' onClick={this.return_btn!}>返回安全设置</Button>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * 控件：异常页面组件制器
 * 描述 异常页面组件
 */
@addon('Abnormity', '异常页面', '异常页面组件')
@reactControl(AbnormityView, true)
export class AbnormityViewControl extends ReactViewControl {
    /** 返回按钮 */
    public return_btn?: () => void;
    constructor() {
        super();
    }
}