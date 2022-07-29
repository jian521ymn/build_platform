import React, { useState } from 'react';
import { Button, Form, Input, Select,Modal } from 'antd';
import ImageUpload from './imageUpload';
import http from '../../../api/http';
import { errorToast } from '../../../utils/toast';

const { Option } = Select;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};

const ProductConfirm = ({ title }) => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [form] = Form.useForm();
    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        form.submit()
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };
   

    const onGenderChange = (value) => {
        switch (value) {
            case 'male':
                form.setFieldsValue({ note: 'Hi, man!' });
                return;
            case 'female':
                form.setFieldsValue({ note: 'Hi, lady!' });
                return;
            case 'other':
                form.setFieldsValue({ note: 'Hi there!' });
        }
    };

    const onFinish = (values) => {
        console.log(values);
    };
    return (
        <>
            <div className="fiexed-additem" onClick={showModal}>
                {title}
            </div>
            <Modal
                title={title}
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Form {...layout} form={form} name="control-hooks" onFinish={(val)=>{
                    setConfirmLoading(true);
                    http.post('/api/product/add',{...val}).then(res=>{
                        if(res.code !== 0) {
                            errorToast(res?.msg || '新增失败');
                            return
                        }
                        setConfirmLoading(false);
                        setVisible(false)
                    })
                    console.log(val)
                }}>
                    <Form.Item name="product_name" label="商品名称" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="product_desc" label="商品介绍" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="product_url" label="商品图片" rules={[{ required: true }]}>
                        <ImageUpload onChange={(url)=>form.setFieldValue('product_url',url)} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ProductConfirm;