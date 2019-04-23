import * as React from "react";
import { isPhoneAvailable, addon, UserInfo, isPasswordAvailable } from "pao-aop";
import { reactControl } from "pao-aop-client";
import { BaseFormControl } from "src/business/components/form";

/**
 * 登录类型
 */
export enum LoginType {
    UserPassword = 'account',
    Mobile = 'MobileLogin',
    Voice = 'VoiceLogin',
    QQ = 'QQLogin',
    WeChat = 'WeChatLogin',
    RetrievePassword = 'RetrievePassword',
    ObjectForm = 'ObjectForm',
}

/** 验证错误消息 */
const ValidateErrorMessage = {
    phone: "请输入正确手机号码",
    password: "请输入最少6位的密码"
};

/**
 * 组件：基础用户表单
 */
export class BaseUserInfoForm<P extends BaseUserInfoFormControl, S> extends React.Component<P, S> {
    /** 手机号码校验 */
    checkPhone = (_: any, value: string, cb: any) => {
        if (!isPhoneAvailable(value)) {
            cb(ValidateErrorMessage.phone);
        }
        cb();
    }
    /** 密码校验 */
    checkPassword = (_: any, value: string, cb: any) => {
        // if (!isPasswordAvailable(value)) {
        //     cb(ValidateErrorMessage.password);
        // }
        if (!value) {
            cb('密码至少要6位');
        }
        if (value && value.length < 6) {
            cb('密码至少要6位');
        }
        cb();
    }

    /** 强密码校验 */
    checkContact = (_: any, value: string, callback: any) => {
        if (!isPasswordAvailable(value)) {
            callback("请输入最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符的密码");
        } else {
            callback();
        }
    }
}

/**
 * 控件：基础用户表单
 */
@addon('BaseUserInfoFormControl', '基础用户表单', '基础用户表单控件')
@reactControl(BaseUserInfoForm)
export class BaseUserInfoFormControl extends BaseFormControl {
    constructor(
        public onLogin?: (loginType?: LoginType, loginData?: any) => Promise<{
            code: number;
            message: string;
        }>,
        public onRegister?: (userInfo: UserInfo) => Promise<boolean>,
        public onSuccess?: (msg: {
            code: number;
            message: string;
        }) => void,
        public onSubmit?: () => void,
        public onFail?: (error?: Error) => void) {
        super();
    }
}
