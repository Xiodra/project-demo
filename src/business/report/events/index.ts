import { Layouts } from "react-grid-layout";

/** 
 * 重置大小事件
 * @author huyl
 */
export enum ResizeEvent {
    /** 重置大小 */
    Resize = "Resize"
}

/**
 * 重置大小事件参数
 * @author huyl
 */
export interface ResizeEventArgs {
    /** 唯一ID */
    id: string;
    /** 高度 */
    height?: number;
    /** 宽度 */
    width?: number;
}

/**
 * 重置大小
 * @author huyl
 */
export interface IResizeable {
    /** 事件：重置大小 */
    onResize?: (args: ResizeEventArgs) => void;
}

/** 
 * 支持编辑事件 
 * @author huyl
 */
export enum EditableEvent {
    /** 改变编辑状态 */
    ChangeEditState = "ChangeEditState",
    /** 数据改变 */
    Change = "Change"
}

/**
 * 编辑时间参数
 * @author huyl
 */
export interface EditEventArgs {
    /** 唯一ID */
    id?: string;
    /** 是否编辑 */
    isEdit?: boolean;
}

/**
 * 数据发生了修改参数
 * @author huyl
 */
export interface ChangeEventArgs {
    /** 改变的值 */
    value: any;
}

/**
 * 支持编辑
 * @author huyl
 */
export interface IEditable {
    /** 事件：改变编辑状态 */
    onChangeEditState?: (args: EditEventArgs) => void;
    /** 事件：数据改变 */
    onDataChange?: (args: ChangeEventArgs) => void;
}

/**
 * 支持布局事件
 * @author huyl
 */
export enum LayoutableEvent {
    /** 处理布局信息 */
    HandleLayout = "HandleLayout",
    /** 调整布局 */
    ChangeLayouts = "ChangeLayouts"
}

/**
 * 支持布局
 * @author huyl
 */
export interface ILayoutable {
    /** 事件：处理布局信息 */
    handleLayoutChange?: (layouts: Layouts) => void;
    /** 事件：调整布局 */
    onChangeLayouts?: (change: boolean) => void;
}
