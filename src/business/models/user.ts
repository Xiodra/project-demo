import { NullablePromise, Role } from "pao-aop";

/**
 * 用户
 */
export interface User {
    /** 用户id */
    id: string;
    /** 账户ID */
    account_id: string;
    /** 账户名称 */
    account?: string;
    /** 姓名 */
    name: string;
    /** 性别 */
    gender: string;
    /** 头像 */
    avatar: string;
    /** 住宅地址 */
    address: string;
    /** 户口地址 */
    register_address: string;
    /** 身份证 */
    id_code: string;
    /** 注册时间 */
    register_date: Date;
    /** 备注 */
    comment: string;
}
export class DataList<T> {
    total?: number;
    result?: T[];
}

/** 用户服务 */
export class IUserService {
    /**
     * 获取用户列表
     * @param condition 查询条件
     * @param page 页码
     * @param count 椰树
     */
    get_user_list?(condition?: {}, page?: number, count?: number): NullablePromise<DataList<User> | undefined> {
        return undefined;
    }
    /** 获取当前用户 */
    get_current_user?(): NullablePromise<User | undefined> {
        return undefined;
    }
    /** 获取当前用户角色 */
    get_current_role?(): NullablePromise<Role[] | undefined> {
        return undefined;
    }
    /**
     * 根据ID获取用户
     * @param id 用户id
     */
    get_user_by_id?(id: string): NullablePromise<User[] | undefined> {
        return undefined;
    }
    /** 修改/新增用户 */
    update?(user: {}): NullablePromise<boolean | undefined> {
        return undefined;
    }
    /** 删除用户 */
    delete?(userids: string[]): NullablePromise<boolean | undefined> {
        return undefined;
    }
    /** 重置密码 */
    reset_password?(id: string): NullablePromise<boolean | undefined> {
        return undefined;
    }
}