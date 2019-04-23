/*
 * 版权：Copyright (c) 2019 红网
 * 
 * 创建日期：Thursday January 3rd 2019
 * 创建者：杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 修改日期: Thursday, 3rd January 2019 10:54:19 am
 * 修改者: 杨子毅(yangziyi) - gzhhyangzy@126.com
 * 
 * 说明
 * 		1、富文本编辑器控件
 */

import React from "react";

import { addon } from "pao-aop";

import { reactControl, BaseReactElementControl } from "pao-aop-client";
// 引入编辑器组件
import BraftEditor from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';
import NTDivStyle from "src/business/style-components/div-style";

/**
 * 组件：富文本编辑器控件状态
 */
export class NTBraftEditorState {
    /** 实时文本内容 */
    text_contents?: any;
}

/**
 * 组件：富文本编辑器控件
 */
export class NTBraftEditor extends React.Component<NTBraftEditorControl, NTBraftEditorState> {
    constructor(props: NTBraftEditorControl) {
        super(props);
        this.state = {
            text_contents: BraftEditor.createEditorState(this.props.value)
        };
    }

    /** 内容修改后回调事件 */
    handleEditorChange = (text_contents: any) => {
        this.setState({ text_contents });
        console.log("触发富文本onchang事件");
        this.props.onChange && this.props.onChange(
            text_contents.toHTML() === "<p></p>" ?
                undefined
                :
                text_contents.toHTML()
        );
    }

    render() {
        // console.log(this.state.text_contents.toHTML()); // toHTML()后是一个标准的html标签字符串
        return (
            <div className="my-component">
                {/* <div style={{ border: '1px solid #AAAAAA', flex: '10' }}> */}
                <NTDivStyle.NTRichTextEditorContent>
                    <BraftEditor
                        defaultValue={BraftEditor.createEditorState(this.props.value)}
                        onChange={this.handleEditorChange}
                    />
                </NTDivStyle.NTRichTextEditorContent>

                {/* </div> */}
            </div>
        );
    }
}

/**
 * 控件：富文本编辑器控件
 * 控制富文本编辑器控件
 */
@addon('NTBraftEditorControl', '富文本编辑器控件', '控制富文本编辑器控件')
@reactControl(NTBraftEditor)
export class NTBraftEditorControl extends BaseReactElementControl {
    /** 传入文本内容 */
    // public value?: string;
    constructor() {
        super();
    }
}