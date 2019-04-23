import { NullablePromise } from "pao-aop";

/**
 * 名称:主页
 * @description 主页原型
 * @author huyl
 */
export class HomeObject {
    /** 标题 */
    title?: string;
}

/**
 * 名称:主页服务
 * @description 主页服务
 * @author huyl
 */
export class IHomeService {
    /** 主页 */
    home?(): NullablePromise<HomeObject> {
        return undefined;
    }
}