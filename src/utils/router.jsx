// /* eslint-disable import/prefer-default-export */
// import React from 'react';

import SiderDemo from "../pages/meanLayout";
import ProjectBuild from "../pages/projectBuild";
import ProjectList from "../pages/projectList";
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import ProjectRecord from "../pages/projectRecord";


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
                Icons:''
            },
            {
                breadcrumbName:'项目发布记录',
                path: '/project/record',
                component: ProjectRecord,
                Icons:''
            },
        ]
    },
    {
        breadcrumbName:'权限配置',
        path: '/projectList1',
        component: ProjectList,
        Icons:'',
        children: [
            {
                breadcrumbName:'新增',
                path: '/projectList1/list',
                component: ProjectList,
                Icons:''
            },
        ]
    },
    
];
export default router;
