import { EditOutlined, DeleteOutlined, SendOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import { Avatar, Card, Tooltip, Modal, DatePicker } from 'antd';
import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';
import { productDelete, productList, recordCreate } from '../../api/product';
import { errorToast, successToast } from '../../utils/toast';
import ProductConfirm from './components/ProductConfirm';
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import './index.css'

const { Meta } = Card;
const TooltipIcon = ({ children, title }) => {
  return <Tooltip title={title}>
    <span>{children}</span>
  </Tooltip>
}

const ProductList = () => {
  const [data, setData] = useState([])
  const [type, setType] = useState('')
  const [id, setId] = useState('')
  const [update, setUpdate] = useState(0)
  useEffect(() => {
    productList().then(res => {
      if (res.code === 0 && Array.isArray(res?.data)) {
        setData(res?.data)
        return
      }
      errorToast(res?.msg || '列表查询失败')
    })
  }, [update])
  const ProductCard = ({ src, title, description,id }) => (
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
        <TooltipIcon title="发布">
          <SendOutlined onClick={()=>{
            let value = moment()
             Modal.confirm({
              title: '选择视频发布日期',
              icon: <ExclamationCircleOutlined />,
              content: (
                <div style={{padding:10}}>
                    <DatePicker 
                        style={{width:'100%'}}
                        defaultValue={value} 
                        allowClear={false} 
                        locale={locale} 
                        onChange={(val)=>{value=val}} 
                    />
                </div>
              ),
              onOk() {
                return new Promise((resolve, reject) => {
                  recordCreate({product_id: id,product_name: title, date:dayjs(value).format('YYYYMMDD')}).then((res) =>{
                    if(res.code !== 0){
                      errorToast(res?.msg)
                      reject()
                      return
                    }
                    resolve()
                    successToast(title+'，完成视频拍摄！')
                    setUpdate(val=>val+1)
                })
                }).catch(() => console.log('Oops errors!'));
              },
              onCancel() {},
            });
           
            
          }} />
          </TooltipIcon>,
        <TooltipIcon title="编辑">
          <EditOutlined key="edit" onClick={()=>{
            setId(id);
            setType('edit')
            
          }} />
          </TooltipIcon>,
        <TooltipIcon title="删除" >
          <DeleteOutlined onClick={()=>productDelete({id}).then(res=>{
            if(res.code !== 0) {
              errorToast(res?.msg)
              return
            }
            successToast('删除成功！')
            setUpdate(val=>val+1)
          })} />
          </TooltipIcon>
      ]}
    >
      <Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title={title}
        description={description?.length >9 ? description.slice(0,9) : description}
      />
    </Card>
  );
  return (
    <div className="list">
      {data?.map(item => {
        const { product_name, product_url, product_desc, id } = item || {};
        return <div className="card">
          <ProductCard title={product_name} description={product_desc} src={product_url} id={id} />
        </div>
      })}
        <ProductConfirm title="商品新增" type={type} setType={setType} id={id} setUpdate={()=>setUpdate(val=>val+1)}  />
    </div>
  );
}

export default ProductList;