import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column, Pie } from '@ant-design/plots';

type Props = {}

interface InputForm {
  password: string
  confirmPwd: string
}

const MarkColumn = (props: Props) => {
  const data = [
    {
      type: '0',
      sales: 38,
    },
    {
      type: '1',
      sales: 52,
    },
    {
      type: '2',
      sales: 61,
    },
    {
      type: '3',
      sales: 145,
    },
    {
      type: '4',
      sales: 48,
    },
    {
      type: '5',
      sales: 38,
    },
    {
      type: '6',
      sales: 38,
    },
    {
      type: '7',
      sales: 38,
    },
    {
      type: '8',
      sales: 38,
    }, {
      type: '9',
      sales: 38,
    }, {
      type: '10',
      sales: 38,
    },
  ];
  const config = {
    data,
    xField: 'type',
    yField: 'sales',
    columnWidthRatio: 0.8,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Mark',
      },
      sales: {
        alias: 'Total',
      },
    },
    title: "Mark Column"
  };
  return (
    <>
      <Column {...config} />
    </>
  );
}

export default MarkColumn
