import { addon, BaseAddon, NullablePromise } from "pao-aop";

/**
 * 插件：手机通信录
 * @description 手机通信录
 */
@addon('NativeContact', '手机通信录', '手机通信录')
export class NativeContact extends BaseAddon {
    /** 查询手机通信录列表信息  */
    getContactList?(msg?: string): NullablePromise<ContactItem[]> {
        return undefined;
    }
}
/**
 * 
 * 通信录返回item值
 */
export class ContactItem {
    // 公司名称
    company?: string;
    // 部门名称
    department?: string;
    // 邮箱地址
    emailAddresses?: EmailAddressesItem[];
    // 姓氏
    familyName?: string;
    // 名字
    givenName?: string;
    hasThumbnail?: boolean;
    // 工作名字
    jobTitle?: string;
    // 中间名字
    middleName?: string;
    // 笔记
    note?: string;
    // 电话名称
    phoneNumbers?: PhoneNumbersItem[];
    // postal地址
    postalAddresses?: any[];
    // 称谓
    prefix?: string;
    // rawContactId
    rawContactId?: string;
    // record记录id
    recordID?: string;
    // 后缀
    suffix?: any;
    // 缩略地址
    thumbnailPath?: string;
    // url地址
    urlAddresses?: any[];
}
// 邮箱地址选项
export interface EmailAddressesItem {
    email?: string; // 邮箱
    id?: string; // id
    label?: string; // 名称
}
// 电话名称选项
export interface PhoneNumbersItem {
    id?: string; // id
    label?: string; // 名称
    number?: string; // 电话号码
}
