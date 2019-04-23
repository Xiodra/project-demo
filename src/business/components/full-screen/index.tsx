import { BaseReactElementState, BaseReactElement, reactControl, BaseReactElementControl, CookieUtil } from "pao-aop-client";
import React from "react";
import PropTypes from 'prop-types';
import { addon } from "pao-aop";
import { Button, Avatar } from "antd";
import './index.less';
import { EventEmitter } from "events";
import utils from "./utils/index";
/**
 * 组件：全局按钮控件状态
 */
export interface FullScreenBtnState extends BaseReactElementState {
    mainIcon: string;
    isShow: string;
    checkShow: boolean;
    timer: number;
    showFull: boolean;
    routerArry: any[];
    currentNum: number;
    arryLenght: number;
    timing: number;
    checkTime: boolean;
    checkAnimation: boolean;
}
/**
 * 组件：全局按钮控件
 */
export class FullScreenBtn extends BaseReactElement<FullScreenBtnControl, FullScreenBtnState> {
    static propTypes: { tip: PropTypes.Requireable<string>; };
    // 视图数组
    static viewArray: any[];
    // 视图长度
    static viewLen: number;
    // 定时时长
    static timelen: any;
    // 时间定时器
    timerID?: any;
    constructor(props: any) {
        super(props);
        this.state = {
            mainIcon: '+', // 按钮图标显示
            isShow: 'isShow', // 文字图标控制切换
            checkShow: false, // 用于点击判断
            timer: 60, // 定时时间
            showFull: false, // 用于全屏切换判断
            routerArry: [], // 页面数组
            currentNum: 1, // 当前页码
            arryLenght: 0, // 全屏页面数组长度
            timing: 0,  // 倒计时时间
            checkTime: true, // 倒计时判断标志
            checkAnimation: true // 动画判断标志
        };
    }
    render() {
        return this.retContent();
    }
    // 鼠标移动位置函数
    dragFunc(id: any) {
        var Drag: any = document.getElementById(id);
        Drag.onmousedown = function (event: any) {
            var ev = event || window.event;
            event.stopPropagation();
            var disX = ev.clientX - Drag.offsetLeft;
            var disY = ev.clientY - Drag.offsetTop;
            document.onmousemove = function (event) {
                var ev = event || window.event;
                Drag.style.left = ev.clientX - disX + "px";
                Drag.style.top = ev.clientY - disY + "px";
                Drag.style.cursor = "move";
                CookieUtil.save("btn_left", ev.clientX - disX + "px");
                CookieUtil.save("btn_right", ev.clientY - disY + "px");
            };
        };
        Drag.onmouseup = function () {
            document.onmousemove = null;
            this.style.cursor = "default";
        };
    }
    // 视图返回函数
    retContent() {
        return (
            <div>
                {
                    this.state.showFull ? <div style={{ position: 'fixed', width: 150, height: 150, zIndex: 1000000000, right: 20, top: 20, padding: 20, borderWidth: 1, borderStyle: 'solid', borderRadius: 8, background: 'rgba(14,200,255,0.1)', filter: 'alpha(Opacity=60)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} id="idOuterDiv">
                        <div onClick={() => { this.checkAnimation(); this.setState({ checkAnimation: !this.state.checkAnimation }); }} style={{ opacity: 1 }}>
                            {
                                this.state.checkAnimation ? <Avatar src={require("./slices/open_animation@2x.png")} shape={'square'} /> :
                                    <Avatar src={require("./slices/close_animation@2x.png")} shape={'square'} />}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                            <div onClick={() => { utils.back(this); }} style={{ margin: 3 }}><Avatar src={require("./slices/previous_page@2x.png")} shape={'square'} /></div>
                            <div onClick={() => { }} style={{ margin: 10 }}>{this.state.timing}</div>
                            <div onClick={() => { utils.next(this); }} style={{ margin: 3 }}><Avatar src={require("./slices/next_page@2x.png")} shape={'square'} /></div>
                        </div>
                        <div onClick={() => { this.timeIn(this.state.checkTime); this.setState({ checkTime: !this.state.checkTime }); }}>
                            {
                                this.state.checkTime ? <Avatar src={require("./slices/open_carousel@2x.png")} shape={'square'} /> :
                                    <Avatar src={require("./slices/pause_carousel@2x.png")} shape={'square'} />}
                        </div>
                    </div> :
                        <div>
                            <Button style={{ position: 'absolute', top: 20, right: 20, zIndex: 10000 }} onClick={() => { utils.fullScreen(); }}>{this.state.showFull ? '取消全屏' : '全屏'}</Button>
                        </div>}
            </div>

        );
    }
    // 动画函数
    checkAnimation() {
        if (this.state.checkAnimation) {
            utils.startAnimation(() => { });
        } else {
            utils.stopAnimation(() => { });
        }

    }
    // 倒计时函数
    timeIn(tf: boolean): any {
        let thiz = this;
        if (this.timerID !== undefined) {
            clearInterval(this.timerID);
        }
        this.timerID =
            setInterval(
                () => {
                    let itime = thiz.state.timing;
                    itime--;
                    if (itime === 0) {
                        itime = thiz.state.timer;
                        thiz.setState({
                            timing: itime
                        });
                        if ((thiz.state.currentNum + 1) === thiz.state.arryLenght) {
                            thiz.setState({ currentNum: 0 }, () => {
                                window['eventEmitter'].emit("msg", 0);
                            });

                        } else {
                            thiz.setState({ currentNum: thiz.state.currentNum + 1 });
                            window['eventEmitter'].emit("msg", thiz.state.currentNum);
                        }
                    } else {
                        thiz.setState({
                            timing: itime
                        });
                    }
                },
                1000);
        if (tf) {
            this.timerID;
        } else {
            clearInterval(this.timerID);
        }
    }
    // 按钮点击时间
    onClick() {
        this.setState({
            checkShow: !this.state.checkShow,
            mainIcon: this.state.checkShow ? '+' : '-',
            isShow: this.state.checkShow ? 'isShow' : 'showBtn'
        });
    }
    componentWillMount() {

    }
    componentDidUpdate() {
        if (this.state.showFull) {
            this.dragFunc("idOuterDiv");
            if (CookieUtil.read("btn_left") !== undefined) {
                var Drag: any = document.getElementById("idOuterDiv");
                Drag.style.left = CookieUtil.read("btn_left");
                Drag.style.top = CookieUtil.read("btn_right");
            }
        }
    }
    componentDidMount() {
        window['eventEmitter'] = new EventEmitter();
        this.fullScreenChange();
        let len: number = FullScreenBtn.viewLen;
        let array: any = FullScreenBtn.viewArray;
        this.setState({
            routerArry: array,
            arryLenght: len,
            timing: FullScreenBtn.timelen,
            timer: FullScreenBtn.timelen
        });
    }
    // 全屏切换函数监听
    fullScreenChange() {
        let thiz = this;
        document.addEventListener
            (
                "fullscreenchange",
                function () {
                    thiz.setState({ showFull: !thiz.state.showFull });
                },
            );

        document.addEventListener(
            "mozfullscreenchange",
            function () {
                thiz.setState({ showFull: !thiz.state.showFull });
            },
        );

        document.addEventListener(
            "webkitfullscreenchange",
            function () {
                thiz.setState({ showFull: !thiz.state.showFull });
            },
        );

        document.addEventListener(
            "msfullscreenchange",
            function () {
                thiz.setState({ showFull: !thiz.state.showFull });
            },
        );
    }
}

/**
 * 控件：全局按钮控件控制器
 * @description 全局按钮控件
 * @author luoyongxin
 */
@addon('FullScreenBtn', '全局按钮控件', '全局按钮控件')
@reactControl(FullScreenBtn)
export class FullScreenBtnControl extends BaseReactElementControl {

}