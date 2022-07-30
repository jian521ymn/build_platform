import React, { useState } from 'react';
import { Button, Form, Input, Select,Modal } from 'antd';
import ImageUpload from './imageUpload';
import http from '../../../api/http';
import { errorToast } from '../../../utils/toast';
import { productAdd, productDetails, productEdit } from '../../../api/product';
import { useEffect } from 'react';

const { Option } = Select;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};

const ProductConfirm = ({ title,id,type='', setType,setUpdate }) => {
    const [visible, setVisible] = useState(false);
    const [product_url, setProduct_url] = useState('');
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
        setType('')
    };
    useEffect(()=>{
        if(type){
            setVisible(true);
        }
        if(type !== 'edit')return;
        productDetails({id}).then(res=>{
            if(res.code !== 0 && Array.isArray(res?.data)) {
                errorToast(res?.msg);
                return
            }
            setProduct_url(res?.data?.product_url)
            form.setFieldsValue({...res?.data})
        })
    },[type])
    return (
        <>
            <div className="fiexed-additem" onClick={()=>{
                setType('add');
                form.setFieldsValue({product_name:'',product_desc:'',product_url:''})
                }}>
                {title}
            </div>
            <Modal
                title={type === 'add' ? '新增商品' : '编辑商品'}
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Form {...layout} form={form} name="control-hooks" onFinish={(val)=>{
                    setConfirmLoading(true);
                    const productAddOrEdit = type === 'add' ? productAdd : productEdit
                    productAddOrEdit(type === 'add' ? {...val} : {...val,id: form.getFieldValue('id')}).then(res=>{
                        setConfirmLoading(false);
                        if(res.code !== 0) {
                            errorToast(res?.msg || '操作异常');
                            return
                        }
                        setType('')
                        setVisible(false)
                        setUpdate()
                    })
                }}>
                    <Form.Item name="product_name" label="商品名称" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="product_desc" label="商品介绍" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="product_url" label="商品图片" rules={[{ required: true }]}>
                        <ImageUpload onChange={(url)=>form.setFieldValue('product_url',url)} product_url={type === 'edit' ? product_url :  ''} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ProductConfirm;