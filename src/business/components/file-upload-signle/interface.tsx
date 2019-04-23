import { UploadFile, UploadProps, UploadListType } from "antd/lib/upload/interface";
import React from "react";
import { Icon, Button } from "antd";

/** 上传组件类型 */
export type UploadType = "preview" | "file_list";

/** 当需要展示上传的文件列表时，所必要的信息 */
export type __FILE_INFO__ = Pick<UploadFile, "name" | "url" | "size" | "uid" | "type">;

/** 上传组件属性 */
class IFileUploadProps {
    /** 
     * 用于给this.state赋值
     */
    protected stateInfo?: string | __FILE_INFO__[];
    /**
     * 上传文件信息
     */
    protected uploadFileInfo?: UploadFile;
    /**
     * 当表单提交时，用于存储表单提交的信息
     */
    protected submitInfo?: __FILE_INFO__[];
}

/** 上传组件接口 */
export interface IFileUpload {
    /**
     * 当上传组件状态为done时的回调
     */
    uploadDoneCb?: (file: UploadFile) => void;

    /**
     * 当上传组件状态为uploading时的回调
     */
    uploadingCb?: () => void;

    /**
     * 当自定义表单调用onchang时，所需要赋予this.props.onChang的值
     */
    getOnchangeVal: () => string | __FILE_INFO__[];

    /**
     * 获取上传组件所需的组件属性
     * 即<Upload {...props} />
     */
    getUploadProps: () => UploadProps;

    /**
     * 获取上传组件所需被渲染的元素
     */
    getUploadRender: () => JSX.Element;

    /**
     * 获取需要被赋予this.state的值
     */
    getStateInfo: () => string | __FILE_INFO__[];
}

/**
 * 单文件上传组件
 *
 * @class FileUploadSingle
 * @extends {IFileUploadProps}
 * @implements {IFileUpload}
 */
class FileUploadSingle extends IFileUploadProps implements IFileUpload {
    private loading: boolean = false;

    constructor(stateInfo: string) {
        super();
        this.stateInfo = stateInfo;
    }

    private getBase64(img: any, callback: Function) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    private setPreviewImg = (file: any) => {
        this.getBase64(file.originFileObj, (previewImgUrl: string) =>
            this.stateInfo = previewImgUrl
        );
    }

    private uploadButton = () => (
        <div>
            <Icon type={this.loading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">上传图片</div>
        </div>
    )

    uploadingCb = () => {
        this.loading = true;
    }

    uploadDoneCb = (info: UploadFile) => {
        this.setPreviewImg(info);
        this.uploadFileInfo = info;
        this.loading = false;
        this.stateInfo = info.response.url;
    }

    getStateInfo = () => {
        return this.stateInfo as string;
    }

    getOnchangeVal = () => {
        return this.uploadFileInfo!.response.url;
    }

    getUploadProps = () => {
        return {
            listType: "picture-card" as UploadListType,
            className: "nt-file-upload-signle",
            showUploadList: false
        } as UploadProps;
    }

    getUploadRender = () => {
        return this.stateInfo ? <img src={this.stateInfo as string} alt="" /> : this.uploadButton();
    }
}

/**
 * 多文件上传组件(带文件列表)
 *
 * @class FileListUpload
 * @extends {IFileUploadProps}
 * @implements {IFileUpload}
 */
class FileListUpload extends IFileUploadProps implements IFileUpload {
    constructor(stateInfo: __FILE_INFO__[]) {
        super();
        this.stateInfo = stateInfo;
        this.submitInfo = [];
    }

    uploadDoneCb = (info: UploadFile) => {
        this.uploadFileInfo = info;
        this.submitInfo!.push({
            name: info.name,
            url: info.response.url,
            size: info.size,
            uid: info.uid,
            type: info.type
        });
    }

    uploadingCb = () => {
        console.log("no cb");
    }

    getStateInfo = () => {
        return this.stateInfo as __FILE_INFO__[];
    }

    getOnchangeVal = () => {
        return this.submitInfo!;
    }

    getUploadProps = () => {
        return {
            defaultFileList: this.stateInfo as __FILE_INFO__[]
        };
    }

    getUploadRender = () => {
        return (
            <Button>
                <Icon type="upload" />单击上传
            </Button>
        );
    }
}

/**
 * 上传组件类简单工厂
 *
 * @export
 * @class UploadFac
 */
export class UploadFac {
    static CreateUpload(type: UploadType, stateInfo: string | __FILE_INFO__[]): IFileUpload | never {
        switch (type) {
            case "preview":
                return new FileUploadSingle(stateInfo as string);
            case "file_list":
                return new FileListUpload(stateInfo as __FILE_INFO__[]);
            default:
                throw "null";
        }
    }
}
