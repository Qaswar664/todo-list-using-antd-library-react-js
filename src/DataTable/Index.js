import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { Table, Button, Form, Input, Modal ,Col } from 'antd'
import { getColumns } from '../getcolumns';
const usersUrl = 'http://localhost:3000/users';

function DataTable() {
    const [gridData, setGridData] = useState([])
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState("")
    const [data1, setData] = React.useState(false);
    const [department, setDepartment] = useState("")
    const [editRow, setEditRow] = useState(null)
    const [search, setSearch] = useState("")
    const [searchText,setSearchText]=useState("")
    let [filteredData]=useState()
 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns = useMemo(() => getColumns
        ({ editRow, data1, setData, deleteUser, setEditRow, form, search, gridData }), [])

    useEffect(() => {
        const tempData = gridData.map((item) => {
            return {
                ...item,
                status: false,
            }
        })
        
        setData(tempData);
        // console.log('Use Effect');
        if(search){
        // console.log('Use Effect search');
        const filteredEvents = gridData.filter(({ title }) => {
            title = title.toLowerCase();
            return title.includes(search);
          });
          setGridData(filteredEvents);
          // console.log(filteredEvents);
            return;
        }
        if(search){
            // console.log('Use Effect search');
            const filteredEvents = gridData.filter(({ department }) => {
                department = department.toLowerCase();
                return department.includes(search);
              });
              setGridData(filteredEvents);
              // console.log(filteredEvents);
                return;
            }
        GetAllData()

    }, [search])
    // console.log('our data',gridData);

    const data = gridData.map((item, index) => (
        {
            key: index,
            id: item.id,
            title: item.title,
            code: item.code,
            department: item.department,
            branch: item.branch,
            status: item.status
        }
    ))
    // console.log('data',data);
    const Update = (e) => {
        console.log('update form data', e);
    }

    const GetAllData = async () => {
        console.log("All data Invoked");
        setLoading(true)
        const response = await axios.get(`${usersUrl}`)
        setGridData(response.data)
        setLoading(false)
    }

    function deleteUser(id) {
        fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE'
        }).then((result) => {
            result.json().then((response) => {
                console.warn(response);
                GetAllData()
            })
        })
    }
    const onChange = (value) => {
        setDepartment(value);
        console.log(`selected ${value}`);
    };
    const onSearch = (value) => {
        console.log('search:', value);
    };
    // Add data using form
    const onFinish = (e) => {
        console.log('form data', e);
        fetch("http://localhost:3000/users", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(e)
        }).then((result) => {
            result.json().then((response) => {
                console.warn("response", response);
                GetAllData();
            })
        })
    }
    const Edit = async (values) => {
        const updatedDataSource = [...gridData];
        let data = await axios.put(`${usersUrl}/${editRow}`, values)
        console.log(data);
        setEditRow(null);
        GetAllData();
    };



    return (
        <div style={{ margin: "5px", background: "#f5f5f5", width: '100%' }}>
            <div style={{ margin: '10px' }}>
                <Col span={24} >
                    <h1 style={{ marginTop: '10px' }}>Section</h1>
                    <Button onClick={showModal}
                        style={{ float: 'right', backgroundColor: '#1890ff', color: 'white' }}
                    >Add section</Button>
                    <p style={{ letterSpacing: '2px' }}>Dashboard /
                        <span style={{ fontSize: "20px", color: '#40a9ff', marginLeft: '4px' }}>Section</span>
                    </p>
                    <div>
                    </div>
                </Col>
            </div>

            {/* Add new data */}
            <Modal
                title="Add new data"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null} >
                <div>
                    <Form onFinish={onFinish}>
                        <Form.Item name='title'>
                            <Input placeholder='Title' />
                        </Form.Item>
                        <Form.Item name='code'>
                            <Input placeholder='Code' />
                        </Form.Item>
                        <Form.Item name='department'>
                            <Input placeholder='Department' />
                        </Form.Item>
                        <Form.Item name='branch'>
                            <Input placeholder='Branch' />
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' htmlType='submit'>Add</Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
            <div>

                <Input.Search style={{ width: "15%", margin: 10 }} placeholder='Title' name='title'
                    onSearch={(value) => {
                        console.log('searched value', search);
                        setSearch(value)
                           
                    }}
                    onChange={(e)=>{
                        setSearch(e.target.value)
                        
                    }
                    } 
                  
                />
                    <Input.Search style={{ width: "15%", margin: 10 }} placeholder='department' name='department'
                    onSearch={(value) => {
                        console.log('searched value', search);
                        setSearch(value)
                           
                    }}
                    onChange={(e)=>{
                        setSearch(e.target.value)
                        
                    }
                    } 
                  
                />
                <Button onChange={onSearch} type='primary' style={{ width: "8%", margin: 10, textAlign: 'center', borderRadius: 15 }}>
                    Search
                </Button>
                <Button style={{ width: "8%", margin: 10, borderRadius: 15, backgroundColor: '#ffffff', color: '#1890ff' }}>
                    Reset
                </Button>

            </div>

            <Form onFinish={Edit} form={form}>
                <Table
                    columns={columns}
                    dataSource={data}
                    rowSelection={true}
                    bordered />
            </Form>
            

        </div>
    )
}

export default DataTable