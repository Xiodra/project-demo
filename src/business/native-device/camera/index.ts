import { addon, BaseAddon, NullablePromise } from "pao-aop";

/**
 * 插件：手机摄像头
 * @description 手机摄像头
 */
@addon('NativeCamera', '原生相机设备', '原生相机设备')
export class NativeCamera extends BaseAddon {
    // 摄像头扫描
    scan?(): NullablePromise<any> {
        return undefined;
    }
    selectOrTake?(msg?: string): NullablePromise<string> {
        return undefined;
    }
}