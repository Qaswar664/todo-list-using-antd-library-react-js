import { Popconfirm, Button, Form, Input, Space, Switch} from 'antd'
import React from 'react'

export const getColumns = ({ editRow, data1, setData, deleteUser, setEditRow,gridData, form ,search}) => {
    return (
        [
            {
                title: "ID",
                dataIndex: "id"
            },
            {
                title: "Title",
                dataIndex: "title",
                align: "center",
                filteredValue:[search],
                filterSearch: true,
                onFilter:(value,record)=>{
                    return String(record.title).toLowerCase().includes(value.toLowerCase())
                },
                editTable: true,
                render: (text, record) => {
                    if (editRow === record.id) {
                        return (
                            <Form.Item
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter your name",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        );
                    } else {
                        return <p>{text}</p>;
                    }
                }
            },
            {
                title: "Code",
                dataIndex: "code",
                align: "center",
                editTable: true,
                render: (text, record) => {
                 if (editRow === record.id) {
                        return (
                            <Form.Item
                                  name="code"
                                   rules={[
                                     {
                                        required: true,
                                        message: "Please enter your code",
                                     },
                                      ]}
                                       >
                                      <Input />
                            </Form.Item>
                        );
                    } else {
                        return <p>{text}</p>;
                    }
                }
            },
            {
                title: "Department",
                dataIndex: "department",
                align: "center",
                filteredValue:[search],
                onFilter:(value,record)=>{
                    return String(record.department).toLowerCase().includes(value.toLowerCase())
                },
                render: (text, record) => {
                    if (editRow === record.id) {
                        return (
                            <Form.Item
                                name="department"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter your department",
                                    },
                                ]}>
                                <Input />
                            </Form.Item>
                        );
                    } else {
                        return <p>{text}</p>;
                    }
                },
                
            },
            {
                title: "Branch",
                dataIndex: "branch",
                align: "center",
                editTable: true,
                render: (text, record) => {
                    if (editRow === record.id) {
                        return (
                            <Form.Item
                                name="branch"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter your branch",
                                    },
                                ]}>
                             <Input/>
                            </Form.Item>
                        );
                    } else {
                        return <p>{text}</p>;
                    }
                }
            },
            {
                title: "Status",
                dataIndex: "status",
                align: "center",
                editTable: true,
                render: (status, record) => (
                    <Switch
                        checked={status}
                        onChange={() => {
                            const tempData = data1.map((item) => {
                                if (item.id === record.id) {
                                    return {
                                        ...item,
                                        status: !item.status,
                                    }
                                }
                                return item;
                            })
                            setData(tempData);
                        }}
                    />
                ),
            },
            {
                title: "Action",
                dataIndex: "action",
                align: "center",
                render: (_, record) => (
                <Space>
                    <Popconfirm title="Are you sure want to delete?" onConfirm={() => { deleteUser(record.id) }}>
                            <Button danger type='primary'>
                                Delete
                            </Button>
                    </Popconfirm>
                       <Button
                            type="link"
                            onClick={() => {
                                setEditRow(record.id);
                                form.setFieldsValue({
                                    title: record.title,
                                    department: record.department,
                                });
                            }}>
                            Edit
                        </Button>
                        <Button type="link" htmlType="submit">
                            Save
                        </Button>
                 </Space>
                )
            }
        ]
    )
}