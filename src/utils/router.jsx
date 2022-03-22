// /* eslint-disable import/prefer-default-export */
// import React from 'react';

import SiderDemo from "../pages/meanLayout";


 const router = [
    {
        path: '/home',
        component: SiderDemo,
    },
    // {
    //     breadcrumbName:'首页',
    //     path: '/home',
    //     component: Home,
    //     routes: [
    //         {
    //             breadcrumbName:'用户列表',
    //             path: '/home/user/list',
    //             component: User,
    //         },
    //         {
    //             breadcrumbName:'用户详情',
    //             path: '/home/user/detail',
    //             component: Detail,
    //         },
    //       ]
    // },
];
export default router;