/*
 * 版权：Copyright (c) 2019 红网
 * 
 * 创建日期：Monday January 15th 2019
 * 创建者：陈旭霖(chenxulin) - 376473979@qq.com
 * 
 * 说明
 * 		1、公共变量文件
 */

/**
 * antd官网grid栅格系统，一行分为24分，GRID_COL值为11，意为一行占用11分，具体参考：https://ant.design/components/grid-cn/
 * 在 首页|关于|新闻中心|产品服务|合作伙伴|人才招纳|联系方式 等页面使用
 */
export const GRID_COL = 12; // 布局的栅格化系统，参照antd官网栅格化

/**
 * 搜索栏表单标签与输入框的栅格占比常量
 */
export const SEARCH_FORM_ITEM_LAYOUT = {
    /**
     * 表单label栅格数
     */
    labelCol: {
        xs: { span: 3 },
        sm: { span: 3 },
        md: { span: 3 },
        lg: { span: 3 }
    },
    /**
     * 表单输入框栅格数
     */
    wrapperCol: {
        xs: { span: 21 },
        sm: { span: 21 },
        md: { span: 21 },
        lg: { span: 21 }
    },
};

/**
 * 普通表单标签与输入框的栅格占比常量
 */
export const FORM_ITEM_LAYOUT = {
    /**
     * 表单label栅格数
     */
    labelCol: {
        xs: { span: 3 },
        sm: { span: 3 },
        md: { span: 3 },
        lg: { span: 3 }
    },
    /**
     * 表单输入框栅格数
     */
    wrapperCol: {
        xs: { span: 17 },
        sm: { span: 17 },
        md: { span: 17 },
        lg: { span: 17 }
    },
};