import { addon, BaseAddon, NullablePromise } from "pao-aop";

/**
 * 插件：手机信息
 * @description 手机信息
 */
@addon('NativePhoneInfo', '手机信息', '手机信息')
export class NativePhone extends BaseAddon {
    /** 查询手机当前地理信息  */
    getPhoneInfo?(msg?: string): NullablePromise<PhoneInfo> {
        return undefined;
    }
    /** 设置手机竖屏显示 */
    setVerticalScreen?(): NullablePromise<string> {
        return undefined;
    }
    /** 设置手机横屏显示 */
    setHorizontalScreen?(): NullablePromise<string> {
        return undefined;
    }
}
/**
 * 手机地理信息返回数据
 */
export class PhoneInfo {
    /** 速度 */
    speed?: string;
    /** 经度 */
    longitude?: string;
    /** 纬度 */
    latitude?: string;
    /** 准确度 */
    accuracy?: string;
    /** 方向 */
    heading?: string;
    /** 海拔高度 */
    altitude?: string;
    /** 海拔准确度 */
    altitudeAccuracy?: string;
    /** 时间戳 */
    timestamp?: string;
    /** 手机Id */
    deviceId?: string;
    /** 手机名 */
    deviceName?: string;
    /** 手机出场日期 */
    firstInstallTime?: number;
    /** imie码 */
    imei?: string;
}
