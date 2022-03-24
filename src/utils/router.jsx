// /* eslint-disable import/prefer-default-export */
// import React from 'react';

import SiderDemo from "../pages/meanLayout";
import ProjectList from "../pages/projectList";


 const router = [
    {
        breadcrumbName:'项目列表',
        path: '/home/projectList',
        component: ProjectList,
        Icons:''
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
