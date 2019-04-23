import { RecallFunctionList, addon, ProxyFactory, log, getConstructorName } from "pao-aop";

/**
 * 原生设备消息
 */
class NativeDeviceMessage {
    /** 设备 */
    public device?: string;
    /** 方法 */
    public method?: string;
    /** 参数或返回数据 */
    public data?: any;
}

/**
 * 原生设备工具类
 */
export class NativeDeviceUtility {
    /** 是否监听 */
    static isListener?: false;
    /** 回调函数列表 */
    static recallFunctionList?: RecallFunctionList = new RecallFunctionList();
    /** 错误前缀 */
    static errorPrefix = "error=>";
    /** 监听 */
    static listener?() {
        if (!NativeDeviceUtility.isListener) {
            document.addEventListener(
                'message',
                ({ data }: any) => NativeDeviceUtility.onReceiveMessage!(data));
        }
    }
    /** 接收消息 */
    static onReceiveMessage?(message: string) {
        const { device, method, data } = JSON.parse(message) as NativeDeviceMessage;
        // 处理错误
        if (typeof data === 'string' && data.startsWith(NativeDeviceUtility.errorPrefix)) {
            const error = new Error(data.substring(NativeDeviceUtility.errorPrefix.length - 1));
            NativeDeviceUtility.recallFunctionList!.rejectAll!(error);
            return;
        }
        // 方法回调ID = 设备.方法名
        NativeDeviceUtility.recallFunctionList!.recallFunction!(`${device}.${method}`, data);
    }
    /**
     * 发送消息
     * @param message 消息
     * @param returnFunctionID 消息命令
     * @param timeout 超时
     * @param timeoutCheckBreak 发送前的检查函数
     * @returns 命令范湖Promise
     */
    static postMessage?<T>(
        message: string,
        returnFunctionID: any = undefined,
        timeout: number = 3000,
        timeoutCheckBreak: number = 100): Promise<T> {
        log(`NativeDeviceUtility`, `Web->React-Native ===> ${message}\nreturnFunctionID ===>  ${returnFunctionID}`);
        window.postMessage(message, '');
        return this.recallFunctionList!.createRecallFunction(
            returnFunctionID,
            timeout,
            timeoutCheckBreak);
    }
}

/**
 * 名称:原生设备调用工厂
 * @description 用户手机原生设备的交互代理
 * @author huyl
 */
@addon('NativeDeviceFactory', '原生设备调用工厂', '用户手机原生设备的交互代理')
export class NativeDeviceFactory extends ProxyFactory {
    /** 代理方法 */
    proxyMethod?(methodName: string, args: any): any {
        let message = new NativeDeviceMessage();
        message.device = `${getConstructorName(this.destObject!)}`;
        message.method = methodName;
        message.data = args;
        const functionID = `${message.device}.${message.method}`;
        return NativeDeviceUtility.postMessage!(JSON.stringify(message), functionID);
    }
}