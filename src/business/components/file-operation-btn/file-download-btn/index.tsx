import React from "react";
import { addon } from "pao-aop";
import { reactControl, BaseReactElementControl } from "pao-aop-client";
import { Button } from "antd";
export class FileDownloadBtnState {
    /** 下载的地址 */
    filename?: string;
    /** 下载的地址中携带的参数 */
    content?: string;

}
export class FileDownloadBtn extends React.Component<FileDownloadBtnControl, FileDownloadBtnState> {
    constructor(props: FileDownloadBtnControl) {
        super(props);
        this.state = { filename: props.filename, content: props.content };
    }
    render() {
        return (
            <div>
                <Button onClick={() => { this.downloadfile(this.state.content, this.state.filename); }}>下载</Button>
            </div>

        );
    }
    downloadfile(content: any, filename: any) {
        // 创建隐藏的可下载链接
        var eleLink = document.createElement('a');
        eleLink.download = filename;
        eleLink.style.display = 'none';
        // 字符内容转变成blob地址
        var blob = new Blob([content]);
        eleLink.href = URL.createObjectURL(blob);
        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();
        // 然后移除
        document.body.removeChild(eleLink);
    }

}
/**
 * 控件：下载控制器
 * 下载
 */
@addon('FileDownloadBtn', '下载', '下载')
@reactControl(FileDownloadBtn)
export class FileDownloadBtnControl extends BaseReactElementControl {
    public filename: string;
    public content: string;
    constructor() {
        super();
    }
}