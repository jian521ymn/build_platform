/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb, Row, Col, Dropdown, Card, Tag } from 'antd';
import http from '../../api/http';
import { errorToast } from '../../utils/toast';
import { LoadingOutlined } from '@ant-design/icons';
import "./index.css"

const PROJECT_TYPE ={
    node: 'lime',
    web:'purple',
    react:'red',
    vue:'blue',
    js:'gold',
    npm:'magenta',
}
const PROJECT_STATUS ={
    fail: '发布失败',
    success:'发布成功',
    loading:'发布中'
}
const PROJECT_STATUS_TYPE ={
    fail:'#f50',
    success:'#87d068',
    loading:'#108ee9'
}

const ProjectBuild = ({ history = () => { } }) => {
    return (
       <div>2233333332</div>
    );
}

export default ProjectBuild;