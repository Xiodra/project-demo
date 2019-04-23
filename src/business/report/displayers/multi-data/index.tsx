import { addon } from "pao-aop";
import { DisplayerState, BaseDisplayer, BaseDisplayerControl } from "src/business/report";
import { reactControl } from "pao-aop-client";
import { BaseLayoutControl } from "../../layout/base";

/**
 * 组件：多数据显示状态
 */
export interface MultiDataDisplayState extends DisplayerState {
}
/**
 * 组件：多数据显示组建
 * 描述 用于显示多个数据视图
 */
export class MultiDataDisplay extends BaseDisplayer<MultiDataDisplayControl, MultiDataDisplayState> {
    constructor(props: MultiDataDisplayControl) {
        super(props);
    }
    onSetData(dataView: DataView, data: any) {
        this.props.displays!.map((displayer) => {
            this.props.corresponding![displayer.id!].map((dataObj: any) => {
                if (dataView['id'] === dataObj) {
                    displayer.onSetData!(dataView, data);
                }
            });
        });
    }
    render() {
        this.props.layout!.childControls = this.props.displays;
        return (
            this.props.layout!.createElement!()
        );
    }
}

/**
 * 控件：多数据显示控制器
 * 描述: 用来控制显示的视图
 */
@addon('MultiDataScreen', '多数据显示器', '多数据显示器')
@reactControl(MultiDataDisplay)
export class MultiDataDisplayControl extends BaseDisplayerControl {
    /**
     * 控件：多数据显示控制器
     * @param corresponding 对应的数据视图和数据源id
     * @param displays 视图列表列表
     * @param layout 布局控件
     */
    constructor(public corresponding?: object, public displays?: BaseDisplayerControl[], public layout?: BaseLayoutControl) {
        super();
    }
}