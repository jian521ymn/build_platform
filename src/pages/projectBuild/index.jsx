/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Steps } from 'antd';
import { projectAdd, projectBranch, projectBuild, projectDetails, projectEdit } from '../../api/project';
import { errorToast, successToast } from '../../utils/toast';
import { getQuery } from '../../utils/operationUrl';
import "./index.css"
import { LoadingOutlined } from '@ant-design/icons';

const { Step } = Steps;
const PROJECT_TYPE = {
    node: 'lime',
    web: 'purple',
    react: 'red',
    vue: 'blue',
    js: 'gold',
    npm: 'magenta',
}
const BUILD_STATUS = [
    {title: 'Git',description: '拉取分支代码', status: ''},
    {title: 'Yarn',description: '下载依赖包', status: ''},
    {title: 'Build',description: '打包代码中', status: ''},
    {title: 'Update',description: '更新中', status: ''},
    {title: 'Success',description: '发布完成！', status: ''},
]
const PROJECT_STATUS_TYPE = {
    fail: '#f50',
    success: '#87d068',
    loading: '#108ee9'
}
// 获取项目基本信息
const getprojectDetails = (form, setOptions) => {
    projectDetails({ item_key: getQuery().item_key }).then(res => {
        const { code, data } = res || {}
        if (code != 0) {
            errorToast(res?.msg)
            return
        }
        form.setFieldsValue({ ...data, type: data?.type.split(',') })
        getBranch(setOptions, data?.name)
    })
}
// 获取分支信息
const getBranch = (setOptions, name) => {
    projectBranch({ name }).then(res => {
        if (res.code != 0) {
            errorToast(res?.msg)
            return
        }
        setOptions(res?.data)
    })
}
const ProjectBuild = ({ history = () => { }, isEdit }) => {
    const [form] = Form.useForm()
    const [options, setOptions] = useState([])
    const [step, setStep] = useState(null)
    const onFinish = ({name,origin_ssh_url,branch}) => {
        setStep(0);
        projectBuild({name,origin_ssh_url,branch,item_key:getQuery().item_key}).then(res=>{
            if (res.code != 0) {
                errorToast(res?.msg)
                return
            }
            setStep(res.data?.step)
        })

    };
    const onFinishFailed = () => { }
    useEffect(() => {
        if (!getQuery().item_key) return
        getprojectDetails(form, setOptions)
    }, [])
    return (
        <>
            <div style={{ textAlign: 'left', fontSize: '20px', marginBottom: '50px' }}>
                <Button type="primary">项目发布1</Button>
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
                >
                    <Input disabled placeholder="项目真实名称，如：build_project" />
                </Form.Item>

                <Form.Item
                    label="项目远程仓库地址"
                    name="origin_ssh_url"
                    wrapperCol={{ span: 12 }}
                >
                    <Input disabled placeholder="项目备注名，便于快速识别，选填" />
                </Form.Item>
                <Form.Item
                    label="项目发布分支"
                    name="branch"
                    wrapperCol={{ span: 8 }}
                    rules={[{ required: true, message: '项目分支必填！' }]}
                >
                    <Select
                        showSearch
                        placeholder="请选择发布分支"
                        optionFilterProp="children"
                        options={options}
                        onSearch={(text) => {
                            setOptions((value => {
                                return value.filter(item => JSON.stringify(item).includes(text))
                            }))
                        }}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 4 }}>
                    <Button type="primary" htmlType="submit" disabled={step != null}>
                        发布
                    </Button>
                </Form.Item>
            </Form>
           {step !== null && <div style={{padding:'20px 50px 60px',border:'1px solid #f5f5f5'}}>
                <h3 style={{paddingBottom:'30px'}}>发布进度</h3>
                <Steps current={step} options={['Git']}>
                    {BUILD_STATUS.map((item,index)=>{
                        return (
                            <Step 
                                title={item.title}
                                status={item.status} 
                                description={item.description}
                                icon={step === index && <LoadingOutlined />} 
                            />
                        )
                    })}
                </Steps>
            </div>}
        </>
    );
}

export default ProjectBuild;