import ReactDOM from "react-dom";
import React from "react";
export const utils = {
    // 初始化函数
    /**
     *
     * @param fullview 全屏试图控制器
     * @param initListViewArry 全屏视图数组
     *  @param timer 定时时间
     */
    newInstall: function (fullview: any, initListViewArry: any[], timer: any) {
        fullview.viewArray = initListViewArry;
        fullview.viewLen = initListViewArry.length;
        fullview.timelen = timer;
        let div = document.createElement('div');
        document.body.appendChild(div);
        ReactDOM.render(React.createElement(fullview), div);
        return {
            destroy() {
                ReactDOM.unmountComponentAtNode(div);
                document.body.removeChild(div);
            },
        };
    },
    /**
     * 全屏函数
     */
    fullScreen: function () {
        let el = document.documentElement as any;
        if (el.requestFullscreen !== undefined) {
            el.requestFullscreen();
        } else if (el.mozRequestFullScreen !== undefined) {
            el.mozRequestFullScreen();
        } else if (el.webkitRequestFullscreen !== undefined) {
            el.webkitRequestFullscreen();
        } else if (el.msRequestFullscreen !== undefined) {
            el.msRequestFullscreen();
        } else {
            return;
        }
    },
    /**
     * 退出全屏函数
     */
    exitScreen: function () {
        let cfs = document as any;
        if (cfs.exitFullscreen) {
            cfs.exitFullscreen();
        } else if (cfs.webkitCancelFullScreen) {
            cfs.webkitCancelFullScreen();
        } else {
            cfs.msExitFullscreen();
        }
    },
    /**
     * 全局组件下一步按钮
     * @param thiz 当前对象
     * @param callback 完成回调函数
     */
    next: function (thiz: any, callback?: any) {
        let nextPage: number = (thiz.state.currentNum + 1) === (thiz.state.arryLenght) ? thiz.state.currentNum : thiz.state.currentNum + 1;
        console.log('33', nextPage);
        thiz.setState(
            {
                currentNum: nextPage
            },
            () => {
                window['eventEmitter'].emit("msg", thiz.state.currentNum);
            }
        );
        callback;
    },
    /**
     * 全局组件上一步按钮
     * @param thiz 当前对象
     * @param callback 完成回调函数
     */
    back: function (thiz: any, callback?: any) {
        console.log('thiz.state.currentNum', thiz.state.currentNum);
        thiz.setState(
            {
                currentNum: (thiz.state.currentNum - 1) < 0 ? 0 : (thiz.state.currentNum - 1)
            },
            () => {
                window['eventEmitter'].emit("msg", thiz.state.currentNum);
            });
        callback;
    },
    /**
     * 执行动画函数
     * @param animation 开始动画
     * @param callback  执行后回调
     */
    startAnimation: function (animationstart: any, callback?: any) {
        animationstart;
        callback;
    },
    /**
     * t停止动画
     * @param animationstop 停止动画
     * @param callback 停止回调
     */
    stopAnimation: function (animationstop: any, callback?: any) {
        animationstop;
        callback;
    }
};
export default utils;