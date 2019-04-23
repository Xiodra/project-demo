import { addon, BaseAddon, NullablePromise } from "pao-aop";

/**
 * 插件：指纹检测
 * @description 指纹检测
 */
@addon('NativeCamera', '原生指纹设备', '原生指纹设备')
export class NativeTouch extends BaseAddon {
    // 指纹检测
    checkTouchId?(): NullablePromise<Boolean> {
        return undefined;
    }

}