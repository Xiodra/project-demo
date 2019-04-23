import React from "react";

import { addon } from "pao-aop";

import { reactControl, BaseReactElementControl } from "pao-aop-client";
import { Icon, Upload, message, Button } from "antd";
import "./index.less";
import { UploadListType, UploadFile } from "antd/lib/upload/interface";

/** 上传组件类型 */
export type UploadType = "preview" | "file_list";

/** 上传文件必要信息字段 */
type FileInfo = Pick<UploadFile, "name" | "url" | "size" | "uid" | "type">;

/**
 * 组件：文章表单控件状态
 */
export class FileUploadSingleState {
    /** 预览url */
    previewImgUrl?: string;
    /**
     * 图片是否处于上传状态
     */
    loading?: boolean;
    /**
     * 后台返回的imgUrl
     */
    imgUrl?: FileInfo[];
}

/**
 * 组件：文章表单控件
 */
export class FileUploadSingle extends React.Component<FileUploadSingleControl, FileUploadSingleState> {
    constructor(props: FileUploadSingleControl) {
        super(props);
        this.state = {
            loading: false,
            previewImgUrl: this.props.value ? (this.props.type === "preview" ? this.props.value as string : undefined) : undefined,
            imgUrl: this.props.value ? (this.props.type === "file_list" ? this.props.value as any[] : []) : [],
        };
    }

    beforeUpload = (file: File) => {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJPG) {
            message.error('只能上传jpg/png格式的图片');
        }
        return isJPG;
    }

    /** 删除文件回调 */
    onRemove = (file: any) => {
        console.log(file);
        let index = -1;
        let fileTmp: UploadFile[] = [];
        if (file.hasOwnProperty("uid") as Object) {
            this.state.imgUrl!.map((e, i) => {
                if (file.uid === e.uid) {
                    index = i;
                    return;
                } else {
                    fileTmp.push(file);
                }
            });
        }

        if (index !== -1) {
            console.log(fileTmp);

            this.setState({
                imgUrl: fileTmp
            });

            const onChange = this.props.onChange;
            if (onChange) {
                onChange(fileTmp as any);
            }
        }
        return true;
    }

    private getBase64(img: any, callback: Function) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    private setPreviewImg = (info: any) => {
        // let {imgUrl } =this.state;
        this.getBase64(info.file.originFileObj, (previewImgUrl: string) =>
            this.setState({
                previewImgUrl: previewImgUrl,
                loading: false,
            })
        );
    }

    /** 处理上传过程的渲染元素 */
    private handleUploadChange = (info: any) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }

        if (info.file.status === 'done') {
            const onChange = this.props.onChange;

            message.info(`${info.file.name} 上传成功`);

            this.props.type === "preview" ? this.setPreviewImg(info) : null;

            let onChangeVal;
            if (this.props.type === "preview") {
                onChangeVal = info.file.response.url;
            } else {
                this.state.imgUrl!.push({
                    name: info.file.name,
                    url: info.file.response.url,
                    size: info.file.size,
                    uid: info.file.uid,
                    type: info.file.type
                });
                onChangeVal = this.state.imgUrl;
                // console.log(onChangeVal);
                // console.log(this.state.imgUrl);
            }

            if (onChange) {
                onChange(onChangeVal);
            }
        } else if (info.file.status === 'error') {
            message.error(`文件上传出现错误：${info.file.name}.`);
        }
    }

    render() {
        let { loading, previewImgUrl } = this.state;
        let { upload_url } = this.props;
        const uploadButton = (loading?: boolean) => (
            <div>
                <Icon type={loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">上传图片</div>
            </div>
        );

        /** 上传图片属性 */
        let preview_props = {
            listType: "picture-card" as UploadListType,
            className: "nt-file-upload-signle",
            showUploadList: false
        };

        /** 上传文件列表属性 */
        // let file_list_prop = {
        //     defaultFileList: {
        //         ...this.state.imgUrl,
        //         status: 'done',
        //         response: 'Server Error 500', // custom error message to show
        //         url: 'http://www.baidu.com/xxx.png',
        //     } as UploadFile
        // };

        let file_list_prop = {
            defaultFileList: this.state.imgUrl ? this.state.imgUrl : undefined
        };

        /** 图片上传样式 */
        let preview_render = previewImgUrl ? <img src={previewImgUrl} alt="" /> : uploadButton(loading);

        /** 上传文件列表样式 */
        let file_list_render = (
            <Button>
                <Icon type="upload" />单击上传
            </Button>
        );

        let props = this.props.type === "preview" ? preview_props : file_list_prop;
        let render = this.props.type === "preview" ? preview_render : file_list_render;
        return (
            <Upload
                {...props}
                onChange={this.handleUploadChange}
                beforeUpload={this.beforeUpload}
                action={upload_url}
                onRemove={this.onRemove}
            >
                {render}
            </Upload>
        );
    }
}

/**
 * 控件：文章表单控件
 * 控制文章表单控件
 */
@addon('FileUploadSingleControl', '文章表单控件', '控制文章表单控件')
@reactControl(FileUploadSingle)
export class FileUploadSingleControl extends BaseReactElementControl {
    /**
     * upload 地址
     */
    upload_url: string;

    /**
     * 上传组件类型
     * 
     * @param "preview" 预览图片类型
     * @param "file_list" 列表类型
     */
    type: UploadType;
}