import { NullablePromise, DataList } from "pao-aop";

/** 账户角色 */
export interface AccountRole {
    /** ID */
    id?: string;
    /** 账户ID */
    account_id?: string;
    /** 角色ID */
    role_id?: string;

}
/** 账户 */
export interface Account {
    /** ID */
    id?: string;
    /** 账号 */
    account?: string;
    /** 手机 */
    mobile?: string;
    /** 邮箱 */
    email?: string;
    /** QQ */
    qq?: string;
    /** 微信 */
    wechat?: string;
    /** 说明/备注 */
    comment?: string;
}

/** 账户服务接口 */
export class IAccountService {
    /** 获取账户列表 */
    get_account_list?(condition?: {}, page?: number, count?: number): NullablePromise<DataList<Account> | undefined> {
        return undefined;
    }
    /** 增加/修改账户 */
    update_account?(Account: {}): NullablePromise<boolean | undefined> {
        return undefined;
    }
    /** 删除账户 */
    delete_account?(permission: string): NullablePromise<boolean | undefined> {
        return undefined;
    }
    /** 根据ID获取账户 */
    get_account?(id: string): NullablePromise<AccountRole | undefined> {
        return undefined;
    }
}