import React, { useEffect, useState } from 'react';
import { Badge, Calendar } from 'antd';
import "./index.css"
import moment from 'moment';
import 'moment/locale/zh-cn';
import { productRecord } from '../../api/product';
import dayjs from 'dayjs';


const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const ProductCalendar = () => {
  const [value, setValue] = useState(moment());
  const [data, setData] = useState({});
  useEffect(() => {
    productRecord({date:dayjs().format("YYYYMM")}).then(res=>{
      const obj =res?.data?.list.reduce((prev, next) => {
          const key =Number(next.date)
          prev[key] = {...(prev[key]||{}),[next.product_id]:next.product_name}
          return prev
      },{})
      setData(obj)
      console.log(obj,'obj');
    })
  },[])
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>测试</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value) => {
    const date = data[dayjs(value).format("YYYYMMDD")] || {}
    const list = Object.keys(date)
    return (
      <ul className="events">
        {list.map((item) => (
          <li key={item.content}>
            <Badge status='success' text={date[item] + '--完成'} />
          </li>
        ))}
      </ul>
    );
  };

  return <Calendar 
    value={value} 
    dateCellRender={dateCellRender} 
    // monthCellRender={monthCellRender} 
    onChange={(val)=>{
      console.log(val.month(),value.month(),val.year(),value.year());
      if(val.month() !== value.month() || val.year() !== value.year()){

      }
      setValue(val)

    }}
    />;
};

export default ProductCalendar;