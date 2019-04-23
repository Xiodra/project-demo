import React from "react";
import { ConfigConsumer, ConfigConsumerProps } from "antd/lib/config-provider";
import { BaseReactElementControl } from "pao-aop-client";
import './index.less';
import { Col } from "antd";

export class BasicColProps extends BaseReactElementControl {
    mode?:
        "situation_one" |
        "situation_two" |
        "situation_three" |
        "situation_four" |
        "situation_five" |
        "situation_six" |
        "situation_seven" |
        "situation_eight" |
        "situation_nine" |
        "situation_ten" |
        "situation_eleven" |
        "situation_twelve" |
        "situation_thirteen" |
        "situation_fourteen" |
        "col-border-none" |
        "table-title" |
        "situation_sixteen" |
        "situation_seventeen" |
        "default";
    prefixCls?: string;
}

export interface GenetorProps {
    mode?:
    "situation_one" |
    "situation_two" |
    "situation_three" |
    "situation_four" |
    "situation_five" |
    "situation_six" |
    "situation_seven" |
    "situation_eight" |
    "situation_nine" |
    "situation_ten" |
    "situation_eleven" |
    "situation_twelve" |
    "situation_thirteen" |
    "situation_fourteen" |
    "col-border-none" |
    "table-title" |
    "situation_sixteen" |
    "situation_seventeen" |
    "default";
    suffixCls?: string;
}

interface BasicPropsWithTagName extends BasicColProps {
    tagName?: "div";
}

export class BasicCol extends React.Component<BasicColProps, {}> {
    render() {
        switch (this.props.mode) {
            case "situation_one":
            case "situation_four":
                return <Col span={24} className={this.props.prefixCls} {...this.props}>{this.props.children}</Col>;
            case "situation_two":
                return <Col span={13} className={this.props.prefixCls}>{this.props.children}</Col>;
            case "situation_three":
                return <Col span={12} className={this.props.prefixCls}>{this.props.children}</Col>;
            case "situation_five":
            case "situation_thirteen":
                return <Col xl={6} lg={6} md={6} sm={24} xs={24} className={this.props.prefixCls}>{this.props.children}</Col>;
            case "situation_six":
            case "situation_nine":
                return <Col xl={4} lg={4} md={4} sm={24} xs={24} className={this.props.prefixCls}>{this.props.children}</Col>;
            case "situation_seven":
                return <Col xl={11} lg={11} md={11} sm={24} xs={24} className={this.props.prefixCls}>{this.props.children}</Col>;
            case "situation_eight":
                return <Col xl={11} lg={11} md={11} sm={24} xs={24} className={this.props.prefixCls}>{this.props.children}</Col>;
            case "situation_ten":
                return <Col xs={24} sm={24} md={12} lg={8} {...this.props} className={this.props.prefixCls}>{this.props.children}</Col>;
            case "situation_eleven":
                return <Col xl={22} lg={22} md={22} sm={24} xs={24} className={this.props.prefixCls}>{this.props.children}</Col>;
            case "situation_twelve":
                return <Col xl={2} lg={2} md={2} sm={24} xs={24} className={this.props.prefixCls}>{this.props.children}</Col>;
            case "situation_fourteen":
                return <Col xl={16} lg={16} md={16} sm={24} xs={24} className={this.props.prefixCls}>{this.props.children}</Col>;
            case "col-border-none":
                return <Col className={this.props.prefixCls}>{this.props.children}</Col>;
            case "table-title":
                return <Col span={6} className={this.props.prefixCls}>{this.props.children}</Col>;
            case "situation_sixteen":
                return <Col span={8} className={this.props.prefixCls}>{this.props.children}</Col>;
            case "situation_seventeen":
                return <Col span={24} className={this.props.prefixCls}>{this.props.children}</Col>;
            default:
                return <Col className="default">{this.props.children}</Col>;
        }
    }
}

function generator({ mode, suffixCls }: GenetorProps) {
    return (BasicComponent: React.ComponentClass<BasicPropsWithTagName>): any => {
        return class Adapter extends React.Component<BasicColProps, any> {
            NTSituationOneCol: any;
            NTSituationTwoCol: any;
            NTSituationThreeCol: any;
            NTSituationFourCol: any;
            NTSituationFiveCol: any;
            NTSituationSixeCol: any;
            NTSituationSeveneCol: any;
            NTSituationEightCol: any;
            NTSituationNineCol: any;
            NTSituationTenCol: any;
            NTSituationElevenCol: any;
            NTSituationTwelveCol: any;
            NTSituationThirteenCol: any;
            NTSituationFourteenCol: any;
            NTSituationColBorderNone: any;
            NTSituationColTableTitle: any;
            NTSituationSixteenCol: any;
            NTSituationSeventeenCol: any;
            NTDefaultCol: any;

            renderComponent = ({ getPrefixCls }: ConfigConsumerProps) => {
                return <BasicComponent prefixCls={suffixCls} mode={mode} tagName={"div"} {...this.props} />;
            }

            render() {
                return <ConfigConsumer>{this.renderComponent}</ConfigConsumer>;
            }
        };
    };
}

const NTCol: React.ComponentClass<BasicColProps> & {
    NTSituationOneCol: React.ComponentClass<BasicColProps>;
    NTSituationTwoCol: React.ComponentClass<BasicColProps>;
    NTSituationThreeCol: React.ComponentClass<BasicColProps>;
    NTSituationFourCol: React.ComponentClass<BasicColProps>;
    NTSituationFiveCol: React.ComponentClass<BasicColProps>;
    NTSituationSixCol: React.ComponentClass<BasicColProps>;
    NTSituationSeveneCol: React.ComponentClass<BasicColProps>;
    NTSituationEightCol: React.ComponentClass<BasicColProps>;
    NTSituationNineCol: React.ComponentClass<BasicColProps>;
    NTSituationTenCol: React.ComponentClass<BasicColProps>;
    NTSituationElevenCol: React.ComponentClass<BasicColProps>;
    NTSituationTwelveCol: React.ComponentClass<BasicColProps>;
    NTSituationThirteenCol: React.ComponentClass<BasicColProps>;
    NTSituationFourteenCol: React.ComponentClass<BasicColProps>;
    NTSituationColBorderNone: React.ComponentClass<BasicColProps>;
    NTSituationColTableTitle: React.ComponentClass<BasicColProps>;
    NTSituationSixteenCol: React.ComponentClass<BasicColProps>;
    NTSituationSeventeenCol: React.ComponentClass<BasicColProps>;

} = generator({})(BasicCol);

const NTSituationOneCol = generator({
    mode: "situation_one",
    suffixCls: "situation_one"
})(BasicCol);

const NTSituationTwoCol = generator({
    mode: "situation_two",
    suffixCls: "situation_two"
})(BasicCol);
const NTSituationThreeCol = generator({
    mode: "situation_three",
    suffixCls: "situation_three"
})(BasicCol);
const NTSituationFourCol = generator({
    mode: "situation_four",
    suffixCls: "situation_four"
})(BasicCol);
const NTSituationFiveCol = generator({
    mode: "situation_five",
    suffixCls: "situation_five"
})(BasicCol);
const NTSituationSixCol = generator({
    mode: "situation_six",
    suffixCls: "situation_six"
})(BasicCol);
const NTSituationSeveneCol = generator({
    mode: "situation_seven",
    suffixCls: "situation_seven"
})(BasicCol);
const NTSituationEightCol = generator({
    mode: "situation_eight",
    suffixCls: "situation_eight"
})(BasicCol);
const NTSituationNineCol = generator({
    mode: "situation_nine",
    suffixCls: "situation_nine"
})(BasicCol);
const NTSituationTenCol = generator({
    mode: "situation_ten",
    suffixCls: "situation_ten"
})(BasicCol);
const NTSituationElevenCol = generator({
    mode: "situation_eleven",
    suffixCls: "situation_eleven"
})(BasicCol);
const NTSituationTwelveCol = generator({
    mode: "situation_twelve",
    suffixCls: "situation_twelve"
})(BasicCol);
const NTSituationThirteenCol = generator({
    mode: "situation_thirteen",
    suffixCls: "situation_thirteen"
})(BasicCol);
const NTSituationFourteenCol = generator({
    mode: "situation_fourteen",
    suffixCls: "situation_fourteen"
})(BasicCol);
const NTSituationColBorderNone = generator({
    mode: "col-border-none",
    suffixCls: "col-border-none"
})(BasicCol);
const NTSituationColTableTitle = generator({
    mode: "table-title",
    suffixCls: "table-title"
})(BasicCol);
const NTSituationSixteenCol = generator({
    mode: "situation_sixteen",
    suffixCls: "situation_sixteen"
})(BasicCol);
const NTSituationSeventeenCol = generator({
    mode: "situation_seventeen",
    suffixCls: "situation_seventeen"
})(BasicCol);

NTCol.NTSituationOneCol = NTSituationOneCol;
NTCol.NTSituationTwoCol = NTSituationTwoCol;
NTCol.NTSituationThreeCol = NTSituationThreeCol;
NTCol.NTSituationFourCol = NTSituationFourCol;
NTCol.NTSituationFiveCol = NTSituationFiveCol;
NTCol.NTSituationSixCol = NTSituationSixCol;
NTCol.NTSituationSeveneCol = NTSituationSeveneCol;
NTCol.NTSituationEightCol = NTSituationEightCol;
NTCol.NTSituationNineCol = NTSituationNineCol;
NTCol.NTSituationTenCol = NTSituationTenCol;
NTCol.NTSituationElevenCol = NTSituationElevenCol;
NTCol.NTSituationTwelveCol = NTSituationTwelveCol;
NTCol.NTSituationThirteenCol = NTSituationThirteenCol;
NTCol.NTSituationFourteenCol = NTSituationFourteenCol;
NTCol.NTSituationColBorderNone = NTSituationColBorderNone;
NTCol.NTSituationColTableTitle = NTSituationColTableTitle;
NTCol.NTSituationSixteenCol = NTSituationSixteenCol;
NTCol.NTSituationSeventeenCol = NTSituationSeventeenCol;
export default NTCol;