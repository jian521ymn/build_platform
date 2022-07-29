import React, { useEffect, useState } from 'react';
import { Badge, Calendar } from 'antd';
import "./index.css"
import 'moment/locale/zh-cn';


const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const ProductCalendar = () => {
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
    console.log(value.date(),'value');
    return (
      <ul className="events">
        {[{}].map((item) => (
          <li key={item.content}>
            <Badge status='success' text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  return <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />;
};

export default ProductCalendar;