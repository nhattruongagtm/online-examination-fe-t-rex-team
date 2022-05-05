import { Button, Modal } from 'antd'
import Table from 'antd/lib/table/Table'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { fetchClass } from '../../../api/demoApi'
import { Class, TestStudent } from '../../../models/class'
import { InputForm, LoginResponse } from '../../../pages/Login/Login'
import { IRoute } from '../router'
import AddClass from './AddClass'
import qs from 'query-string'
import { useDispatch, useSelector } from 'react-redux'
import { loadClassList } from '../../../slice/classSlice'
import { RootState } from '../../../store'

type Props = {}
export interface IParam {
  subjectID: string
}
export interface IClass {
  classes: {
    classID: number
    className: string
    u: TestStudent[]
  }
}
const ClassList = (props: Props) => {
  const [classes, setClasses] = useState<Class[]>([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const classList = useSelector((state: RootState) => state.classList.classList)
  const param = useLocation()
  const id = Number(qs.parse(param.search).subjectID)
  console.log(id)



  const [visible, setVisible] = useState(false)

  const user = JSON.parse(
    localStorage.getItem('e-exam') as string
  ) as LoginResponse

  useEffect(() => {
    fetchClass.fetchData(id).then(
      (response) => {
        console.log(response)
        dispatch(loadClassList(response))

      },
      (error) => {
        console.log(error)
      }
    )
  }, [])

  const columnss = [
    {
      title: 'Class ID',
      dataIndex: 'classID',
      key: 'classID',
      render: (text: string) => <>{text}</>,
    },
    {
      title: 'Class',
      dataIndex: 'className',
      key: 'className',
    }, {
      title: 'List Student',
      dataIndex: 'u',
      key: 'u',
    },
  ]
  const columns = [
    {
      title: 'Class ID',
      dataIndex: 'classID',
      key: 'classID',
      render: (text: string) => <>{text}</>,
    },
    {
      title: 'Class',
      dataIndex: 'className',
      key: 'className',
    },
    // {
    //   title: 'List Student',
    //   dataIndex: 'u',
    //   key: 'u',
    //   render: (users: any) => <div>{console.log("in render:", users) 
    //   }here</div>,
    // },
    {
      title: '',
      dataIndex: 'classID',
      key: 'classID',
      render: (text: string, record: Class) => (
        <Button
          onClick={() => navigate(`${IRoute.STUDENT_LIST}?classID=${record.classID}&&className=${record.className}`)}
        >
          List of Student
        </Button>
      ),
    },
  ]

  return (
    <>
      <Button
        style={{ float: 'right', margin: '0 4.5rem 1.5rem 0' }}
        onClick={() => setVisible(true)}
      >
        Add class
      </Button>
      <Modal
        okButtonProps={{ style: { display: 'none' } }}
        title="Add class"
        centered
        visible={visible}
        onCancel={() => setVisible(false)}
        width={700}
      >
        <AddClass subjectID={id}></AddClass>
      </Modal>
      <Table
        columns={user && user.type === 0 ? columnss : columns}
        dataSource={classList}
      />
    </>
  )
}

export default ClassList
