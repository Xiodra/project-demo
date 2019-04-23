import React from "react";
import { BaseReactElementState, BaseReactElement, BaseReactElementControl, reactControl, IconText } from "pao-aop-client";
import { addon } from "pao-aop";
import { InLineBlockContainer } from "src/business/style-components/inline-block-container";

/**
 * 组件：图标按钮状态
 */
export interface NTIconButtonState extends BaseReactElementState {

}
/**
 * 组件：图标按钮
 * 描述 带一个图标的按钮
 */
export class NTIconButton extends BaseReactElement<NTIconButtonControl, NTIconButtonState> {
    render() {
        let { icon, font_text, direction, space, icon_size, font_size, onClick } = this.props;
        let fontSize = '', iconSize = '';
        switch (font_size) {
            case 'small':
                fontSize = '12px';
                break;
            case 'large':
                fontSize = '16px';
                break;
            default:
                fontSize = '14px';
                break;
        }
        switch (icon_size) {
            case 'small':
                iconSize = '20px';
                break;
            case 'large':
                iconSize = '36px';
                break;
            default:
                iconSize = '24px';
                break;
        }
        return (
            // <div onClick={onClick} style={{ display: 'inline-block', padding: '5px', textAlign: 'center' }}>
            <InLineBlockContainer onClick={onClick}>
                <IconText icon={icon} title={font_text} direction={direction === undefined ? 'vert' : direction} space={space} icon_size={iconSize} font_size={fontSize} />
            </InLineBlockContainer>
        );
    }
}

/**
 * 控件：图标按钮控制器
 * 描述 设置图标属性样式
 */
@addon('IconBotton', '图标按钮控制器', '设置图标属性样式')
@reactControl(NTIconButton)
export class NTIconButtonControl extends BaseReactElementControl {
    /** 图标 */
    icon?: string;
    /** 文字 */
    font_text?: string;
    /** 方向 */
    direction?: 'horz' | 'vert';
    /**
     * 图标和文字之间的间距
     */
    space?: string;
    /**
     * 图标大小
     */
    icon_size?: 'small' | 'large' | undefined;
    /**
     * 字体大小
     */
    font_size?: 'small' | 'large' | undefined;
}