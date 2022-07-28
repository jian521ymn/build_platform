import { EditOutlined, DeleteOutlined, SendOutlined } from '@ant-design/icons';
import { Avatar, Card, Tooltip, Link } from 'antd';
import { flow } from 'lodash';
import React, { useState, useEffect } from 'react';
import http from '../../api/http';
import { errorToast } from '../../utils/toast';
import ProductConfirm from './components/ProductConfirm';
import './index.css'

const { Meta } = Card;
const TooltipIcon = ({ children, title }) => {
  return <Tooltip title={title}>
    <span>{children}</span>
  </Tooltip>
}

const ProductCard = ({ src, title, description }) => (
  <Card
    style={{ width: 250 }}
    hoverable
    cover={
      <img
        alt="example"
        src={src}
      />
    }
    actions={[
      <TooltipIcon title="发布"><SendOutlined /></TooltipIcon>,
      <TooltipIcon title="编辑"><EditOutlined key="edit" /></TooltipIcon>,
      <TooltipIcon title="删除"><DeleteOutlined /></TooltipIcon>
    ]}
  >
    <Meta
      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
      title={title}
      description={description}
    />
  </Card>
);
const ProductList = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    http.get(`/api/product/list`).then(res => {
      if (res.code === 0 && Array.isArray(res?.data)) {
        setData(res?.data)
        return
      }
      errorToast(res?.msg || '列表查询失败')
    })
  }, [])
  return (
    <div className="list">
      {data?.map(item => {
        const { product_name, product_url, product_desc } = item || {};
        return <div className="card">
          <ProductCard title={product_name} description={product_desc} src={product_url} />
        </div>
      })}
        <ProductConfirm title="商品新增" />
    </div>
  );
}

export default ProductList;