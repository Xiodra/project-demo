import { getObject, IVerifyCodeService, Ref } from "pao-aop";

/** 短信验证码 */
export class VerifyCodeApi {
    /**
     * 验证码服务
     */
    static verifyCodeService_fac?: Ref<IVerifyCodeService>;
    /** 验证码服务 */
    static get VerifyCodeService() {
        return getObject(VerifyCodeApi.verifyCodeService_fac);
    }

    /** 生成验证码 */
    static async create() {
        try {
            return await VerifyCodeApi.VerifyCodeService!.create!()!;
        } catch (error) {
            throw new Error(`验证码生成错误, 错误信息:${error}`);
        }
    }
    /** 验证 */
    static async verify(value: string) {
        try {
            await VerifyCodeApi.VerifyCodeService!.verify!(value)!;
        } catch (error) {
            throw new Error(`验证码验证错误, 错误信息:${error}`);
        }
    }
}