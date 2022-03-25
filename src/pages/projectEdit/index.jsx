/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import "./index.css"
import { Form, Input, Button, Checkbox } from 'antd';

const projectTypeOptions =[
    {value:'node', label:'node'},
    {value:'web', label:'web'},
    {value:'react', label:'react'},
    {value:'vue', label:'vue'},
    {value:'js', label:'js'},
    {value:'npm', label:'npm'},
]

const ProjectAdd = ({ history = () => { } }) => {

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <div style={{textAlign: 'left', fontSize:'20px',marginBottom:'50px'}}>
                <Button type="primary">项目新增</Button>
            </div>
            <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="项目名称"
                name="name"
                wrapperCol={{span: 10 }}
                rules={[{ required: true, message: '项目名称必填！' }]}
            >
                <Input placeholder="项目真实名称，如：build_project" />
            </Form.Item>

            <Form.Item
                label="项目备注名"
                name="remark_name"
                wrapperCol={{span: 12 }}
            >
                <Input placeholder="项目备注名，便于快速识别，选填" />
            </Form.Item>
            <Form.Item
                label="项目类型"
                name="type"
                wrapperCol={{ span: 12 }}
                rules={[{ required: true, message: '项目名称必填！' }]}
            >
                <div style={{textAlign: 'left'}}>
                    <Checkbox.Group options={projectTypeOptions} />
                </div>
            </Form.Item>
            <Form.Item
                label="远程仓库ssh地址"
                name="origin_ssh_url"
                wrapperCol={{ span: 14 }}
                rules={[{ required: true, message: '远程仓库ssh地址必填！' }]}
            >
                <Input placeholder="ssh地址，例如：git@github.com:jian521ymn/build_platform.git" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 4 }}>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </Form.Item>
        </Form>
        </>
    );
}

export default ProjectAdd;