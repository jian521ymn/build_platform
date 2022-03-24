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

const ProjectList = ({ history = () => { } }) => {
    const [list, setList] = useState([{}])
    useEffect(() => {
        http.get('/api/build_project/list').then(res => {
            if (res.code !== 0) {
                errorToast(res.msg || '未知错误');
                return
            }
            setList(res?.data)
        })
    }, [])
    return (
        <Row gutter={0}>
            {list.map((item) => {
                const { type=[], name, remark_name, origin_ssh_url, operator, operating_time, status, item_key } = item || {}
                return (
                    <Col span={8} key={item_key} style={{ padding: '10px' }}>
                        <Card
                            title={<div>
                                {remark_name ? `${remark_name}(${name})` : `${name}`}
                            </div>
                            }
                            hoverable
                            style={{ textAlign: 'left', color: '#666666', background: "#f7f7f7" }}
                        >
                            <p>项目类型：{(Array.isArray(type)? type:[type]).map(color=><Tag color={PROJECT_TYPE[color]}>{color}</Tag>)}</p>
                            <p>最近操作人：{operator}</p>
                            <p>最近操作时间：{operating_time}</p>
                            <p>最近发布状态：<Tag color={PROJECT_STATUS_TYPE[status]}>{PROJECT_STATUS[status]}{status === 'loading' && <LoadingOutlined />}</Tag></p>
                        </Card>
                    </Col>
                )
            })}
        </Row>
    );
}

export default ProjectList;