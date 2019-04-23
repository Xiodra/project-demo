import { BaseReactElementState, BaseReactElement, BaseReactElementControl, reactControl } from "pao-aop-client";
import React from "react";
import { addon } from "pao-aop";
import { Button } from "antd";
/**
 * 组件：相册状态
 */
export interface NTAlbumState extends BaseReactElementState {
}

/**
 * 组件：相册
 * 描述
 */
export class NTAlbum extends BaseReactElement<NTAlbumControl, NTAlbumState> {
    render() {
        return (
            <div>
                <Button onClick={() => { window.postMessage('erweima', ''); }} style={{ margin: 5 }}>选择照片</Button>
            </div>
        );
    }
}

/**
 * 控件：相册控制器
 * 描述
 */
@addon('NTAlbum', '名称', '描述')
@reactControl(NTAlbum)
export class NTAlbumControl extends BaseReactElementControl {
    constructor() {
        super();
    }
}