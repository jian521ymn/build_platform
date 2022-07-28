// /* eslint-disable import/prefer-default-export */
// import React from 'react';

import SiderDemo from "../pages/meanLayout";
import ProjectBuild from "../pages/projectBuild";
import ProjectList from "../pages/projectList";
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import ProjectRecord from "../pages/projectRecord";
import ProjectAdd from "../pages/projectEdit";
import ProductCalendar from "../pages/productCalendar";
import ProductList from "../pages/productList";


 const router = [
    {
        breadcrumbName:'项目管理',
        path: '/project',
        component: <Redirect from="/project" to='/project/list' />,
        Icons:'',
        children:[
            {
                breadcrumbName:'项目列表',
                path: '/project/list',
                component:ProjectList,
                Icons:''
            },
            {
                breadcrumbName:'项目发布',
                path: '/project/build',
                component: ProjectBuild,
                Icons:'',
                unShow:true,
            },
            {
                breadcrumbName:'部署记录',
                path: '/project/record',
                component: ProjectRecord,
                Icons:''
            },
            {
                breadcrumbName:'项目新增',
                path: '/project/add',
                component: ProjectAdd,
                Icons:'',
                unShow:true,
            },
            {
                breadcrumbName:'项目编辑',
                path: '/project/edit',
                component: ProjectAdd,
                unShow:true,
                Icons:'',
                props:{isEdit:true}
            },
        ]
    },
    {
        breadcrumbName:'商品配置',
        path: '/shop',
        component: <Redirect from="/shop" to='/shop/list' />,
        Icons:'',
        children:[
            {
                breadcrumbName:'商品列表',
                path: '/shop/list',
                component:ProductList,
                Icons:''
            },
            {
                breadcrumbName:'商品日历',
                path: '/shop/calender',
                component: ProductCalendar,
                Icons:'',
            },
        ]
    }
    
];
export default router;
