/*
 * 版权: Copyright (c) 2018 red
 *
 * 文件: govNetThingApp.tsx
 * 创建日期: Sunday September 30th 2018
 * 作者: huyl
 * 说明:
 * 1、政务物联网应用
 */
import { addon, Ref, ISecurityService, } from "pao-aop";
import { ReactApplication, AppReactRouterControl, updateTheme } from "pao-aop-client";
import { theme_default } from "../style/theme/index";

export let mainApplication: GovNetThingOPApplication;

/**
 * 控件：政务物联网运维APP应用
 */
@addon('GovNetThingOPApplication', '政务物联网运维APP应用', '政务物联网运维APP应用')
export class GovNetThingOPApplication extends ReactApplication {
    /**
     * 物联网应用
     * @param mainForm 应用主窗体
     * @param userService_Fac 用户服务
     */
    constructor(
        public router?: Ref<AppReactRouterControl>,
        userService_Fac?: Ref<ISecurityService>) {
        super(router, userService_Fac);
    }

    run?() {
        super.run!();
        mainApplication = this;
        updateTheme(theme_default);
    }
}