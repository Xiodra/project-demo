import React from "react";
import { reactControl, ReactViewControl, ReactView, ReactViewState } from "pao-aop-client";
import { addon } from "pao-aop";
import AccountRegisterForm from "src/business/security/register";
import './index.less';
import { Container } from "src/business/style-components/container";
/**
 * 组件：注册页面状态
 */
export interface RegisterState extends ReactViewState {
}

/**
 * 组件：注册页面组件
 * 描述：显示注册页面
 */
export class Register extends ReactView<RegisterControl, RegisterState> {
    componentDidMount() {
        /** 解决手机输入法挡住输入框问题 */
        window.addEventListener("resize", function () {
            if (document.activeElement!.tagName === "INPUT" ||
                document.activeElement!.tagName === "TEXTAREA") {
                window.setTimeout(
                    function () {
                        // @ts-ignore
                        document.activeElement!.scrollIntoViewIfNeeded();
                    },
                    0
                );
            }
        });

    }
    render() {
        return (
            <Container>
                <AccountRegisterForm />
            </Container>
        );
    }
}

/**
 * 控件：注册页面组件制器
 * 描述 显示注册页面组件
 */
@addon('Register', '注册页面', '注册页面')
@reactControl(Register)
export class RegisterControl extends ReactViewControl {
    constructor() {
        super();
    }
}