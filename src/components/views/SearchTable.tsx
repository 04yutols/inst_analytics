import { Table, TableColumnsType, TableProps, theme } from "antd";
import { Content } from "antd/es/layout/layout";

export const SearchTable =() =>{
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    interface DataType {
        key: React.Key;
        name: string;
        age: number;
        address: string;
      }
      
      const columns: TableColumnsType<DataType> = [
        {
          title: 'Name',
          dataIndex: 'name',
          filters: [
            {
              text: 'Joe',
              value: 'Joe',
            },
            {
              text: 'Category 1',
              value: 'Category 1',
              children: [
                {
                  text: 'Yellow',
                  value: 'Yellow',
                },
                {
                  text: 'Pink',
                  value: 'Pink',
                },
              ],
            },
            {
              text: 'Category 2',
              value: 'Category 2',
              children: [
                {
                  text: 'Green',
                  value: 'Green',
                },
                {
                  text: 'Black',
                  value: 'Black',
                },
              ],
            },
          ],
          filterMode: 'tree',
          filterSearch: true,
          onFilter: (value, record) => record.name.includes(value as string),
          width: '30%',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          sorter: (a, b) => a.age - b.age,
        },
        {
          title: 'Address',
          dataIndex: 'address',
          filters: [
            {
              text: 'London',
              value: 'London',
            },
            {
              text: 'New York',
              value: 'New York',
            },
          ],
          onFilter: (value, record) => record.address.startsWith(value as string),
          filterSearch: true,
          width: '40%',
        },
      ];
      
      const data1: DataType[] = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sydney No. 1 Lake Park',
        },
        {
          key: '4',
          name: 'Jim Red',
          age: 32,
          address: 'London No. 2 Lake Park',
        },
      ];
      
      const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };
      return(
        <Content
            style={{
              padding: 24,
              marginTop: 10,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}>
        <Table columns={columns} dataSource={data1} onChange={onChange} />
        </Content>
      );
}