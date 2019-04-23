// import { BaseReactElementControl } from "pao-aop-client";
import React from "react";
import { Row } from "antd";
import { ConfigConsumer, ConfigConsumerProps } from "antd/lib/config-provider";
import { BaseReactElementControl } from "pao-aop-client";
import './index.less';

export class BasicRowProps extends BaseReactElementControl {
    mode?: "smart" | "column" | "bottom" | "default";
    prefixCls?: string;
}

export interface GenetorProps {
    mode?: "smart" | "column" | "bottom" | "default";
    suffixCls?: string;
}

interface BasicPropsWithTagName extends BasicRowProps {
    tagName?: "div";
}

export class BasicRow extends React.Component<BasicRowProps, {}> {
    render() {
        switch (this.props.mode) {
            case "smart":
                return <Row type="flex" gutter={24} className={this.props.prefixCls}>{this.props.children}</Row>;
            case "column":
                return <Row type="flex" gutter={24} className={this.props.prefixCls}>{this.props.children}</Row>;
            case "bottom":
                return <Row type="flex" gutter={24} className={this.props.prefixCls}>{this.props.children}</Row>;
            default:
                return <Row type="flex" gutter={24} className="default">{this.props.children}</Row>;
        }
    }
}

function generator({ mode, suffixCls }: GenetorProps) {
    return (BasicComponent: React.ComponentClass<BasicPropsWithTagName>): any => {
        return class Adapter extends React.Component<BasicRowProps, any> {
            NTSmartRow: any;
            NTLargeRow: any;
            NTDefaultRow: any;
            NTColumnRow: any;
            NTBottomRow: any;

            renderComponent = ({ getPrefixCls }: ConfigConsumerProps) => {
                // const { prefixCls: customizePrefixCls } = this.props;
                // const prefixCls = getPrefixCls(suffixCls!, customizePrefixCls);

                return <BasicComponent prefixCls={suffixCls} mode={mode} tagName={"div"} {...this.props} />;
            }

            render() {
                return <ConfigConsumer>{this.renderComponent}</ConfigConsumer>;
            }
        };
    };
}

const NTRow: React.ComponentClass<BasicRowProps> & {
    NTSmartRow: React.ComponentClass<BasicRowProps>;
    NTDefaultRow: React.ComponentClass<BasicRowProps>;
    NTColumnRow: React.ComponentClass<BasicRowProps>;
    NTBottomRow: React.ComponentClass<BasicRowProps>;
} = generator({})(BasicRow);

const NTSmartRow = generator({
    mode: "smart",
    suffixCls: "smart"
})(BasicRow);

const NTColumnRow = generator({
    mode: "column",
    suffixCls: "column"
})(BasicRow);

const NTBottomRow = generator({
    mode: "bottom",
    suffixCls: "bottom"
})(BasicRow);

const NTDefaultRow = generator({})(BasicRow);

NTRow.NTSmartRow = NTSmartRow;
NTRow.NTDefaultRow = NTDefaultRow;
NTRow.NTColumnRow = NTColumnRow;
NTRow.NTBottomRow = NTBottomRow;

export default NTRow;