/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Tag, Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import http from '../../api/http';
import { errorToast, successToast } from '../../utils/toast';
import { LoadingOutlined } from '@ant-design/icons';
import "./index.css"
import { projectDelete, projectList } from '../../api/project';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
const PROJECT_TYPE = {
    node: 'lime',
    web: 'purple',
    react: 'red',
    vue: 'blue',
    // js:'gold',
    npm: 'magenta',
}
const PROJECT_STATUS = {
    fail: '发布失败',
    success: '发布成功',
    loading: '发布中'
}
const PROJECT_STATUS_TYPE = {
    fail: '#f50',
    success: '#87d068',
    loading: '#108ee9'
}
const btnStyle = {
    type: "primary",
    size: "small",
    danger: true,
    ghost: true
}

const deleteProject = (item_key, update) => {
    confirm({
        okText: "确认",
        cancelText: "取消",
        title: '确定要删除项目，一旦删除项目将不可恢复?',
        icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
        onOk() {
            return projectDelete({ item_key }).then(res => {
                if (res.code != 0) {
                    errorToast(res?.msg)
                } else {
                    successToast('删除成功')
                    update()
                }
            })
        },
        onCancel() {
            console.log('Cancel');
        },
    });

}

const ProjectList = ({ history = () => { } }) => {
    const [list, setList] = useState([]);
    const [num, setNum] = useState(0);
    useEffect(() => {
        projectList().then(res => {
            if (res.code !== 0) {
                errorToast(res.msg || '未知错误');
                return
            }
            setList(res?.data?.map(item=>({
                ...item,
                type:item?.type?.split(',')
            })))
        })
    }, [num])
    const update = () => {
        setNum(val => val + 1)
    }
    return (
        <Row gutter={0}>
            <Col span={24} style={{ textAlign: 'left', fontSize: '20px' }}>
                <Button type="primary">项目列表</Button>
            </Col>
            {list.map((item) => {
                const { type = [], name, remark_name, branch, operator, operating_time, status:newStatus, item_key } = item || {}
                const status_ =(status)=>{
                    if([1,2,3,4].includes(status)){
                        return 'loading'
                    }
                    if([5].includes(status)){
                        return 'success'
                    }
                    return 'fail'
                }
                const status = status_(newStatus)
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
                            <p>项目类型：{(Array.isArray(type) ? type : [type]).map(color => <Tag color={PROJECT_TYPE[color]}>{color}</Tag>)}</p>
                            <p>最近操作人：{operator}</p>
                            <p>最近发布分支：{branch || '-'}</p>
                            <p>最近操作时间：{operating_time}</p>
                            <p>最近发布状态：<Tag color={PROJECT_STATUS_TYPE[status]}>{PROJECT_STATUS[status]}{status === 'loading' && <LoadingOutlined />}</Tag></p>
                            <p>操作：
                                <span className="card-btn">
                                    <Button {...btnStyle} onClick={() =>history.push(`/project/edit?item_key=${item_key}`)}>编辑</Button>
                                    <Button {...btnStyle} onClick={() => deleteProject(item_key, update)}>删除</Button>
                                    <Button {...btnStyle} onClick={() =>history.push(`/project/build?item_key=${item_key}`)}>去发布</Button>
                                    <Button {...btnStyle} onClick={() =>history.push(`/project/record?name=${name}`)}>部署记录</Button>
                                </span>
                            </p>

                        </Card>
                    </Col>
                )
            })}
            <Link className="fiexed-additem" to="/project/add">
                项目新增
            </Link>
        </Row>
    );
}

export default ProjectList;