import React, { useEffect, useState } from 'react';
import { Badge, Calendar } from 'antd';
import "./index.css"
import 'moment/locale/zh-cn';

const getListData = (value) => {
  let listData;

  switch (value.date()) {
    case 8:
      listData = [
        {
          type: 'warning',
          content: '长虹1胶枪已拍摄',
        },
        {
          type: 'success',
          content: '长虹2胶枪已拍摄',
        },
      ];
      break;

    case 10:
      listData = [
        {
          type: 'warning',
          content: '长虹3胶枪已拍摄',
        },
        {
          type: 'success',
          content: '长虹4胶枪已拍摄',
        },
        {
          type: 'error',
          content: '长虹5胶枪已拍摄',
        },
      ];
      break;

    case 15:
      listData = [
        {
          type: 'warning',
          content: '长虹胶枪已拍摄',
        },
        {
          type: 'success',
          content: 'This is very long usual event。。....',
        },
        {
          type: 'error',
          content: 'This is error event 1.',
        },
        {
          type: 'error',
          content: 'This is error event 2.',
        },
        {
          type: 'error',
          content: 'This is error event 3.',
        },
        {
          type: 'error',
          content: 'This is error event 4.',
        },
      ];
      break;

    default:
  }

  return listData || [];
};

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
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  return <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />;
};

export default ProductCalendar;