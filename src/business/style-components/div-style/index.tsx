// import { BaseReactElementControl } from "pao-aop-client";
import React from "react";
import { ConfigConsumer, ConfigConsumerProps } from "antd/lib/config-provider";
import { BaseReactElementControl } from "pao-aop-client";
import './index.less';

export class BasicDivStyleProps extends BaseReactElementControl {
    mode?:
        "paddind30px" |
        "role_bottom" |
        "margin_rigth_10px" |
        "baidu_map_detailed_address" |
        "min_width_50px" |
        "nt-carousel-picture-item" |
        "mobile_title_able" |
        "pc_title_able" |
        "pc_title_able_content" |
        "count_down_content" |
        "count_down_content_inside" |
        "picture_link_content" |
        "picture_link_a" |
        "rich_text_editor_content" |
        "default";
    prefixCls?: string;
    href?: string;
}

export interface GenetorProps {
    mode?:
    "paddind30px" |
    "role_bottom" |
    "margin_rigth_10px" |
    "baidu_map_detailed_address" |
    "min_width_50px" |
    "nt-carousel-picture-item" |
    "mobile_title_able" |
    "pc_title_able" |
    "pc_title_able_content" |
    "count_down_content" |
    "count_down_content_inside" |
    "picture_link_content" |
    "picture_link_a" |
    "rich_text_editor_content" |
    "default";
    suffixCls?: string;
    href?: string;
}

interface BasicPropsWithTagName extends BasicDivStyleProps {
    tagName?: "div";
}

export class BasicDivStyle extends React.Component<BasicDivStyleProps, {}> {
    render() {
        switch (this.props.mode) {
            case "paddind30px":
            case "role_bottom":
            case "margin_rigth_10px":
            case "min_width_50px":
            case "nt-carousel-picture-item":
            case "mobile_title_able":
            case "pc_title_able":
            case "pc_title_able_content":
            case "count_down_content_inside":
            case "rich_text_editor_content":
                return <div className={this.props.prefixCls} {...this.props}>{this.props.children}</div>;
            case "baidu_map_detailed_address":
                return <span className={this.props.prefixCls}>{this.props.children}</span>;
            case "count_down_content":
                return <div className={this.props.prefixCls + " " + this.props.className}>{this.props.children}</div>;
            case "picture_link_content":
                return <div className={this.props.prefixCls + " " + this.props.className} {...this.props}>{this.props.children}</div>;
            case "picture_link_a":
                return <a className={this.props.prefixCls} {...this.props}>{this.props.children}</a>;
            default:
                return <div className="default">{this.props.children}</div>;
        }
    }
}

function generator({ mode, suffixCls }: GenetorProps) {
    return (BasicComponent: React.ComponentClass<BasicPropsWithTagName>): any => {
        return class Adapter extends React.Component<BasicDivStyleProps, any> {
            NTPadding30px: any;
            NTRoleBottom: any;
            NTMarginRight10px: any;
            NTBaiduMapDetailedAddress: any;
            NTCarouselPictureItem: any;
            NTMobileTitleAble: any;
            NTPCTitleAble: any;
            NTPCTitleAbleContent: any;
            NTCountDownContent: any;
            NTCountDownContentInside: any;
            NTPictureLinkContent: any;
            NTPictureLinkA: any;
            NTRichTextEditorContent: any;
            NTDefaultDiv: any;
            renderComponent = ({ getPrefixCls }: ConfigConsumerProps) => {
                return <BasicComponent prefixCls={suffixCls} mode={mode} tagName={"div"} {...this.props} />;
            }

            render() {
                return <ConfigConsumer>{this.renderComponent}</ConfigConsumer>;
            }
        };
    };
}

const NTDivStyle: React.ComponentClass<BasicDivStyleProps> & {
    NTPadding30px: React.ComponentClass<BasicDivStyleProps>;
    NTRoleBottom: React.ComponentClass<BasicDivStyleProps>;
    NTMarginRight10px: React.ComponentClass<BasicDivStyleProps>;
    NTBaiduMapDetailedAddress: React.ComponentClass<BasicDivStyleProps>;
    NTMixWidth50px: React.ComponentClass<BasicDivStyleProps>;
    NTCarouselPictureItem: React.ComponentClass<BasicDivStyleProps>;
    NTMobileTitleAble: React.ComponentClass<BasicDivStyleProps>;
    NTDefaultDiv: React.ComponentClass<BasicDivStyleProps>;
    NTPCTitleAble: React.ComponentClass<BasicDivStyleProps>;
    NTPCTitleAbleContent: React.ComponentClass<BasicDivStyleProps>;
    NTCountDownContent: React.ComponentClass<BasicDivStyleProps>;
    NTCountDownContentInside: React.ComponentClass<BasicDivStyleProps>;
    NTPictureLinkContent: React.ComponentClass<BasicDivStyleProps>;
    NTPictureLinkA: React.ComponentClass<BasicDivStyleProps>;
    NTRichTextEditorContent: React.ComponentClass<BasicDivStyleProps>;

} = generator({})(BasicDivStyle);
const NTDefaultDiv = generator({
    mode: "default",
    suffixCls: "default"
})(BasicDivStyle);
const NTPadding30px = generator({
    mode: "paddind30px",
    suffixCls: "paddind30px"
})(BasicDivStyle);
const NTRoleBottom = generator({
    mode: "role_bottom",
    suffixCls: "role_bottom"
})(BasicDivStyle);
const NTMarginRight10px = generator({
    mode: "margin_rigth_10px",
    suffixCls: "margin_rigth_10px"
})(BasicDivStyle);
const NTBaiduMapDetailedAddress = generator({
    mode: "baidu_map_detailed_address",
    suffixCls: "baidu_map_detailed_address"
})(BasicDivStyle);
const NTMixWidth50px = generator({
    mode: "min_width_50px",
    suffixCls: "min_width_50px"
})(BasicDivStyle);
const NTCarouselPictureItem = generator({
    mode: "nt-carousel-picture-item",
    suffixCls: "nt-carousel-picture-item"
})(BasicDivStyle);
const NTMobileTitleAble = generator({
    mode: "mobile_title_able",
    suffixCls: "mobile_title_able"
})(BasicDivStyle);
const NTPCTitleAble = generator({
    mode: "pc_title_able",
    suffixCls: "pc_title_able"
})(BasicDivStyle);
const NTPCTitleAbleContent = generator({
    mode: "pc_title_able_content",
    suffixCls: "pc_title_able_content"
})(BasicDivStyle);
const NTCountDownContent = generator({
    mode: "count_down_content",
    suffixCls: "count_down_content"
})(BasicDivStyle);
const NTCountDownContentInside = generator({
    mode: "count_down_content_inside",
    suffixCls: "count_down_content_inside"
})(BasicDivStyle);
const NTPictureLinkContent = generator({
    mode: "picture_link_content",
    suffixCls: "picture_link_content"
})(BasicDivStyle);
const NTPictureLinkA = generator({
    mode: "picture_link_a",
    suffixCls: "picture_link_a",
})(BasicDivStyle);
const NTRichTextEditorContent = generator({
    mode: "rich_text_editor_content",
    suffixCls: "rich_text_editor_content",
})(BasicDivStyle);
NTDivStyle.NTDefaultDiv = NTDefaultDiv;
NTDivStyle.NTPadding30px = NTPadding30px;
NTDivStyle.NTPadding30px = NTPadding30px;
NTDivStyle.NTRoleBottom = NTRoleBottom;
NTDivStyle.NTMarginRight10px = NTMarginRight10px;
NTDivStyle.NTBaiduMapDetailedAddress = NTBaiduMapDetailedAddress;
NTDivStyle.NTMixWidth50px = NTMixWidth50px;
NTDivStyle.NTCarouselPictureItem = NTCarouselPictureItem;
NTDivStyle.NTMobileTitleAble = NTMobileTitleAble;
NTDivStyle.NTPCTitleAble = NTPCTitleAble;
NTDivStyle.NTPCTitleAbleContent = NTPCTitleAbleContent;
NTDivStyle.NTCountDownContent = NTCountDownContent;
NTDivStyle.NTCountDownContentInside = NTCountDownContentInside;
NTDivStyle.NTPictureLinkContent = NTPictureLinkContent;
NTDivStyle.NTPictureLinkA = NTPictureLinkA;
NTDivStyle.NTRichTextEditorContent = NTRichTextEditorContent;

export default NTDivStyle;