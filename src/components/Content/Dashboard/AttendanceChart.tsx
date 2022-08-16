import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Pie, measureTextWidth } from '@ant-design/plots'
import { Row, Col, Card } from 'antd'
import { fetchStudent } from '../../../api/student'
import { User } from '../../../models/user'

type Props = {}

interface InputForm {
  password: string
  confirmPwd: string
}

const AttendanceChart = (props: Props) => {
  const data = [
    {
      type: 'Attend',
      value: 27,
    },
    {
      type: 'Incident',
      value: 25,
    },
  ]
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: 'Attendance',
      },
    },
  }
  return <Pie {...config} />
}

export default AttendanceChart
