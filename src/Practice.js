import './App.css';

import { Layout, Space, Col, Row, Button, Form, Input, Table,Typography,Select} from 'antd';
const { Column} = Table;

const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log('search:', value);
};
const { Title, Text } = Typography;
const { Header } = Layout;
const headerStyle = {
  color: '#fff',
  height: 630,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#f0f0f0',
};
const section = {
  color: '#1890ff',
  
}
const addsection = {
  float: 'right',
  marginTop:38,
}
const formstyle ={
  width:230,

}



const columns = [
  {

    title: 'ID',
    width: 100,
    dataIndex: 'id',
    key: 'id',
    fixed: 'left',
  },
  {

    title: 'Title',
    width: 200,
    dataIndex: 'Title',
    key: 'Title',
    fixed: 'left',
  },
  {
    title: 'Code',
    width: 200,
    dataIndex: 'Code',
    key: 'Code',
    fixed: 'left',
  },
  {
    title: 'Department',
    dataIndex: 'Department',
    key: 'Department',
    width: 200,
  },
  {
    title: 'Branch',
    dataIndex: 'Branch',
    key: 'Branch',
    width: 200,
  },
  {
    title: 'Status',
    dataIndex: 'Status',
    key: 'Status',
    width: 200,
  },
  
    {
    title: 'Action',
    key: 'Action',
    fixed: 'right',
    width: 100,
  },
];

const data = [];
for (let i = 0; i < 30; i++) {
  data.push({
    key: i,
    title: `Edrward ${i}`,
    dataIndex: 32,
    // address: `London Park no. ${i}`,
  });
}


const App = () => (




  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
    size={[0, 48]}
  >
    <Layout>
      <Header style={headerStyle}>

        <Row>
          <Col span={8}>
            <Title level={2}>Section</Title>
            <Text type="secondary">Dashboard /</Text>
            <Text style={section}>Section</Text>
          </Col>

          <Col span={8}>
          
            <form style={formstyle}>
              
                <Input placeholder="input placeholder" />
              
              
                <Select
    showSearch
    placeholder="Select a person"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={(input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }
    options={[
      {
        value: 'jack',
        label: 'Jack',
      },
      {
        value: 'lucy',
        label: 'Lucy',
      },
      {
        value: 'tom',
        label: 'Tom',
      },
    ]}
  />
              
              <Form.Item>
                <Button type="primary">Submit</Button>
              </Form.Item>
            </form>
             </Col>

          <Col span={8}>
            <Button style={addsection} type="primary">Add Section</Button>
          </Col>
        </Row>
        <Row>
          <Col>
          {/* <Table className='table'>
          <Column title="ID" dataIndex="id" key="1" />
          <Column title="Title" dataIndex="Title" key="Title" />
          <Column title="Code" dataIndex="Code" key="Code" />

          <Column title="Department" dataIndex="Department" key="Department" />

          <Column title="Branch" dataIndex="Branch" key="Branch" />

          <Column title="Status" dataIndex="Status" key="Status" />
          <Column title="Action" dataIndex="Action" key="Action" />




          </Table> */}


<Table
    columns={columns}
    dataSource={data}
    
  />
          </Col>
        </Row>

      </Header>
    </Layout>
  </Space>
);
export default App;