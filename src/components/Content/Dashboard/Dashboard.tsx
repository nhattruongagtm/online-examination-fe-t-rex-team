import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie, measureTextWidth } from '@ant-design/plots';
import { Row, Col, Card, Button, Dropdown, Menu, message, Space, Table, Select } from 'antd';
import { fetchStudent } from '../../../api/student';
import { subjectApi } from '../../../api/subject';
import { User } from '../../../models/user';
import { Subject } from '../../../models/subject';
import { Class } from '../../../models/class';
import AttendanceChart from './AttendanceChart';
import ClassifyChart from './ClassifyChart';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { fetchSubject } from '../../../api/demoApi';
import { useDispatch } from 'react-redux';
import { loadSubjectList } from '../../../slice/subjectSlice';
import useUser from '../../../hook/useUser';

type Props = {}

interface InputForm {
    password: string
    confirmPwd: string
}
const { Option } = Select;
const Dashboard = (props: Props) => {
    //state for api
    const [students, setStudents] = useState<User[]>([])
    const [subject, setSubject] = useState<Subject[]>([])
    const [classes, setClasses] = useState<Class[]>([])
    const dispatch = useDispatch()
    const [u] = useUser()


    const [bordered, setBordered] = useState(true);
    const [xScroll, setXScroll] = useState(undefined);
    const [tableLayout, setTableLayout] = useState(undefined);
    const scroll = {};
    const tableProps = { bordered, scroll, xScroll, tableLayout };

    //student
    useEffect(() => {
        fetchStudent.getAllStudent().then(
            (response) => {
                console.log(response)
                setStudents(response)
            },
            (error) => {
                console.log(error)
            }
        )
    }, [])

    // subject
    useEffect(() => {
        subjectApi.getAllSubject().then(
            (responses) => {
                console.log(responses)
                setSubject(responses)
            },
            (error) => {
                console.log(error)
            }
        )
    }, [])

    useEffect(() => {
        subjectApi.getAllClass(1).then(
            (responses) => {
                console.log(responses)
                setClasses(responses)
            },
            (error) => {
                console.log(error)
            }
        )
    }, [])

    const handleMenuClick = () => {
        message.info('Click on menu item.');
        console.log('click',);
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            {subject.map((s) => (
                <Menu.Item key={s.id}>
                    {s.id} - {s.name}
                </Menu.Item>
            ))}
        </Menu>
    );

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a: any, b: any) => a.id - b.id,
            render: (text: any) => <>{text}</>,
        },
        {
            title: 'Class',
            dataIndex: 'url',
            key: 'url',
            filters: [
                {
                    text: 'Agile',
                    value: 'Joe',
                },
                {
                    text: 'CMMI',
                    value: 'Category 1',
                },
                {
                    text: 'CSDL',
                    value: 'Category 2',
                },
                {
                    text: 'UI',
                    value: 'Category 2',
                },
                {
                    text: 'LTNC',
                    value: 'Category 2',
                },
                {
                    text: 'TKHDT',
                    value: 'Category 2',
                },
                {
                    text: 'JDHNC',
                    value: 'Category 2',
                },
                {
                    text: 'CTMT',
                    value: 'Category 2',
                },
            ],
            // filterMode: 'tree',
            filterSearch: true,
            onFilter: (value: any, record: any) => record.address.startsWith(value),
            // width: '30%',
        },
        {
            title: 'Name',
            dataIndex: 'fullName',
            key: 'fullName',

        },

        {
            title: 'Mark',
            dataIndex: 'gender',
            key: 'gender',
            sorter: (a: any, b: any) => a.releaseDate - b.releaseDate,
        },
        {
            title: 'Time',
            dataIndex: 'slug',
            key: 'create',

        },
    ]

    const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <div>
            <div className="site-card-wrapper">
                <Row gutter={12}>
                    <Col span={4} style={{}}>
                        <Card title="Students Count" bordered={true}>
                            {students.length}
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card title="Excellent" bordered={false}>
                            1
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card title="Good" bordered={false}>
                            1
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card title="Average" bordered={false}>
                            23
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card title="Below Average" bordered={false}>
                            1
                        </Card>
                    </Col>
                </Row>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div className='attendance'>
                    <AttendanceChart />
                </div>
                <div className='classify'>
                    <ClassifyChart />
                </div>
                {/* <div className='classification'><Pie data={classification} {...config} /></div> */}
            </div>
            <div className='filter'>
                <Select
                    placeholder="Select subject"
                    style={{
                        width: 250,
                    }}
                // onChange={handleProvinceChange}
                >
                    {subject.map((sub, index) => (
                        <Option key={index}>{sub.name}</Option>
                    ))}
                </Select>
                <Select
                    placeholder="Select class"
                    style={{
                        width: 250,
                    }}
                // onChange={handleProvinceChange}
                >
                    {classes.map((classes, index) => (
                        <Option key={index}>{classes.className}</Option>
                    ))}
                </Select>
            </div>
            <div className="table">
                <Table className={"table"}
                    {...tableProps}
                    size={'small'}
                    scroll={scroll}
                    columns={columns}
                    dataSource={students}
                />
            </div>
        </div>
    );
}

export default Dashboard
