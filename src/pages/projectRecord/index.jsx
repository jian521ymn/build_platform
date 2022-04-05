/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Dropdown, Card, Tag, Table, Form, Input } from 'antd';
import { errorToast } from '../../utils/toast';
import { LoadingOutlined } from '@ant-design/icons';
import "./index.css"
import { projectRecord } from '../../api/project';

const PROJECT_TYPE = {
    node: 'lime',
    web: 'purple',
    react: 'red',
    vue: 'blue',
    js: 'gold',
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
const columns = [
    {
        title: '项目名称',
        dataIndex: 'name',
        align:'center',
        key: 'name',
    },
    {
        title: '项目备注',
        dataIndex: 'remark_name',
        align:'center',
        key: 'remark_name',
    },
    {
        title: '发布时间',
        dataIndex: 'operating_time',
        align:'center',
        key: 'operating_time',
    },
    {
        title: '发布人',
        dataIndex: 'operator',
        align:'center',
        key: 'operator',
    },
    {
        title: '发布状态',
        dataIndex: 'status',
        align:'center',
        key: 'status',
        render:(text,record)=>{
            const newStatus =record?.status
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
            return <Tag color={PROJECT_STATUS_TYPE[status]}>{PROJECT_STATUS[status]}{status === 'loading' && <LoadingOutlined />}</Tag>
        }
    },
    
];

const ProjectRecord = ({ history = () => { } }) => {
    const [form] = Form.useForm();
    const [search, setSrarch] = useState({page_num:1,page_size:10,name:'',remark_name:''});
    const [data,setData] =useState([]);
    useEffect(()=>{
        projectRecord(search).then(res=>{
            const data=res?.data || {}
            if(res.code !==0){
                errorToast(res?.msg)
                return
            }
            setData({...data})
        })
    },[JSON.stringify(search)])
    return (
        <Row gutter={0}>
            <Col span={24}>
            <Form
                name="basic"
                form={form}
                // labelCol={{ span: 4 }}
                // wrapperCol={{ span: 16 }}
                layout="inline"
                initialValues={{}}
                onFinish={()=>{}}
                onFinishFailed={()=>{}}
                autoComplete="off"
                style={{ textAlign: 'left' }}
            >
                <Form.Item
                    label="项目名称"
                    name="name"
                >
                    <Input style={{minWidth:'300px'}} placeholder="项目真实名称，如：build_project" />
                </Form.Item>

                <Form.Item
                    label="项目备注名"
                    name="remark_name"
                >
                    <Input style={{minWidth:'300px'}} placeholder="项目备注名，便于快速识别" />
                </Form.Item>
            </Form>
            <br />
            <Col span={4} offset={20}>
                <Button
                    type="primary"
                    onClick={()=>{
                        console.log(form.getFieldValue());
                        setSrarch(form.getFieldValue())
                    }}
                >
                    搜索
                </Button>
            </Col>
            <br />
            </Col>
            <Col span={24}>
                <Table 
                    bordered
                    dataSource={data?.list} 
                    columns={columns} 
                />;
            </Col>
        </Row>
    );
}

export default ProjectRecord;