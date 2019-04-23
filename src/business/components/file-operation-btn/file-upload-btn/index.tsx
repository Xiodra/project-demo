
import React from "react";
import { addon } from "pao-aop";
import { reactControl, BaseReactElementControl } from "pao-aop-client";
import { Upload, message, Icon, Button, Modal, } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
// import { ontpys } from "src/projects/industryInternetSign/app/util-tool";
export class FileUploadBtnState {
    /** 上传地址 */
    action?: string;
    fileList: string[];
    /** 是否预览图片 */
    previewVisible?: boolean;
    /** 预览图片数据源 */
    previewImage?: string;
}
export class FileUploadBtn extends React.Component<FileUploadBtnControl, FileUploadBtnState> {
    constructor(props: FileUploadBtnControl) {
        super(props);
        this.state = {
            action: props.action,
            fileList: props.value || []
        };
    }
    /** 预览图片方法 */
    handlePreview = (file: UploadFile) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    /** 预览返回方法回调 */
    handleCancel = () => this.setState({ previewVisible: false });

    /** 上传前回调方法 */
    beforeUpload = (file: File) => {
        return true;
    }

    /** 组装图片列表方法 */
    fileList = (value: string[]): Array<UploadFile> => {
        let list = value ? value : [];
        let arr: Array<UploadFile> = [];
        if (list) {
            for (let i = 0; i < list!.length; i++) {
                arr.push({ "uid": (i - 1).toString(), "name": "xxx.png", 'size': 1, "status": "done", "type": "draw", "url": list![i], "thumbUrl": list[i] });
            }
        }
        return arr;
    }
    this_onchange = (info: any) => {
        console.log(info);
        let picture: any[] = [];
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            const onChange = this.props.onChange;
            if (onChange) {
                if (info) {
                    for (let i = 0; i < info.fileList.length; i++) {
                        info.fileList[i].response ?
                            picture.push('/' + info.fileList[i].response.url)
                            :
                            picture.push(info.fileList[i].thumbUrl);
                    }
                }
                console.log('piture', picture);
                this.setState({
                    fileList: picture
                });
                onChange(picture);
            }
        } else if (info.file.status === 'removed') {
            message.success(`${info.file.name} file removed successfully`);
            const onChange = this.props.onChange;
            if (onChange) {
                if (info) {
                    for (let i = 0; i < info.fileList.length; i++) {
                        info.fileList[i].response ?
                            picture.push('/' + info.fileList[i].response.url)
                            :
                            picture.push(info.fileList[i].thumbUrl);
                    }
                }
                this.setState({
                    fileList: picture
                });
                onChange(picture);
            }
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        } else {
            console.log('在这里');
        }

    }
    render() {
        let { action, list_type, contents, value, upload_amount } = this.props;
        const { previewVisible, previewImage, fileList } = this.state;
        let params = {
            name: 'file',
            action: action,
            listType: list_type ? list_type : 'text',
            headers: {
                authorization: 'authorization-text',
            }
        };
        const uploadButton = (
            contents === 'plus' ?
                <div><Icon type='plus' /><div >上传</div></div>
                : <Button> <Icon type="upload" /> 上传 </Button>

        );
        let defaultFileList = this.fileList(value!);
        return (
            <div key={Math.random().toString()}>
                <Upload
                    id={'key' + value}
                    {...params}
                    defaultFileList={defaultFileList}
                    onChange={this.this_onchange}
                    beforeUpload={this.props.beforeUpload ? this.props.beforeUpload! : this.beforeUpload}
                    onPreview={this.handlePreview}
                >
                    {upload_amount && (fileList.length >= upload_amount! || (fileList.length === 0 && defaultFileList.length >= upload_amount)) ? null : uploadButton}

                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }

}
/**
 * 控件：上传控制器
 * 上传
 */
@addon('FileUploadBtn', '上传', '上传')
@reactControl(FileUploadBtn)
export class FileUploadBtnControl extends BaseReactElementControl {
    public action?: string;
    /** 上传列表的内建样式 */
    public list_type?: 'text' | 'picture' | 'picture-card';
    /** 显示内容样式 plus | button */
    public contents?: 'plus' | 'button';
    /** 图片初始化集合 */
    public value?: string[];
    // /** 图片集合 */
    // public files?: Array<UploadFile>;
    /** 变更回调事件 */
    public onChange?: (info: any) => void;
    /** 上传前回调方法 */
    public beforeUpload?: (file: File) => boolean;
    /** 上传文件限制数量 */
    public upload_amount?: number;
    constructor() {
        super();
    }
}