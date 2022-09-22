/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from 'react';
import "./index.css"
import { Form, Input, Button, Checkbox, Rate, Space } from 'antd';
import { projectAdd, projectDetails, projectEdit } from '../../api/project';
import { errorToast, successToast } from '../../utils/toast';
import { getQuery } from '../../utils/operationUrl';

const projectTypeOptions = [
    { value: 'node', label: 'node' },
    { value: 'web', label: 'web' },
    { value: 'react', label: 'react' },
    { value: 'vue', label: 'vue' },
    { value: 'vue3+ts', label: 'vue3+ts' },
    { value: 'npm', label: 'npm' },
]
const projectLevel = {
    1: '公开项目，一般如官网等',
    2: '一般项目，一般对外开放客户的管理后台',
    3: '普通项目，一般指应用场景最多的略有核心的项目',
    4: '核心项目，一般基础建设平台，万物的基础',
    5: '机密项目,一般指最核心的项目,除了你自己和老天爷，谁也不告诉！'
}
const ProjectAdd = ({ history = () => { }, isEdit }) => {
    const [form] = Form.useForm()
    const onFinish = (values) => {
        const projectRequest = isEdit ? projectEdit : projectAdd
        projectRequest({
            ...values,
            type:values?.type.join(','),
            item_key:isEdit ?getQuery().item_key : ''
        })
        .then(res=>{
            if(res.code != 0){
                errorToast(res?.msg)
            }else{
                successToast('保存成功')
                history.push('/project/list')
            }
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    useEffect(() => {
        if(isEdit){
            projectDetails({item_key:getQuery().item_key}).then(res=>{
                if(res.code != 0){
                    errorToast(res?.msg)
                    return
                }
                form.setFieldsValue({...res?.data, type:res?.data?.type.split(',')})
            })
        }
    },[])
    return (
        <>
            <div style={{ textAlign: 'left', fontSize: '20px', marginBottom: '50px' }}>
                <Button type="primary">{isEdit ? '项目编辑' : '项目新增'}</Button>
            </div>
            <Form
                name="basic"
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                initialValues={{}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                style={{ textAlign: 'left' }}
            >
                <Form.Item
                    label="项目名称"
                    name="name"
                    wrapperCol={{ span: 10 }}
                    rules={[{ required: true, message: '项目名称必填！' }]}
                >
                    <Input placeholder="项目真实名称，如：build_project" />
                </Form.Item>

                <Form.Item
                    label="项目备注名"
                    name="remark_name"
                    wrapperCol={{ span: 12 }}
                >
                    <Input placeholder="项目备注名，便于快速识别，选填" />
                </Form.Item>
                <Form.Item
                    required
                    label="项目级别"
                    wrapperCol={{ span: 14 }}
                    shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                >
                    {({ getFieldValue }) => (
                        <Space>
                            <Form.Item
                                noStyle
                                name="level"
                                rules={[{ required: true, message: '项目级别必填！' }]}
                            >
                                <Rate />
                            </Form.Item>
                            <span style={{ margin: 'auto 20px 0', color: `rgb(250,17,0,${0.5 + getFieldValue('level') / 10})` }}>{projectLevel[getFieldValue('level')]}</span>
                        </Space>
                    )}
                </Form.Item>

                <Form.Item
                    label="项目类型"
                    name="type"
                    wrapperCol={{ span: 12 }}
                    rules={[{ required: true, message: '项目名称必填！' }]}
                >
                    <Checkbox.Group
                        style={{ textAlign: 'left' }}
                        options={projectTypeOptions}
                    />
                </Form.Item>
                <Form.Item
                    label="远程仓库ssh地址"
                    name="origin_ssh_url"
                    wrapperCol={{ span: 14 }}
                    rules={[{ required: true, message: '远程仓库ssh地址必填！' }]}
                >
                    <Input placeholder="ssh地址，例如：git@github.com:jian521ymn/build_platform.git" />
                </Form.Item>
                <Form.Item
                    label="项目每日发布次数"
                    name="release_num"
                    wrapperCol={{ span: 12 }}
                    rules={[{ required: true, message: '项目每日发布次数必填！' }]}
                >
                    <Input placeholder="项目最多每日发布次数，-1为不限，0为限制发布，大于0则按照指定次数" />
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