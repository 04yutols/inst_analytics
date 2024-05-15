import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip, Input, theme, Form, Row, Col, Space, Typography, Select } from 'antd';
import { Content } from 'antd/es/layout/layout';
const { Option } = Select;

const FormItem = Form.Item;

interface SearchProps {
  onSearch: (value: any) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = React.useState('');

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleSearch = (value: any) => {
    onSearch(value);
  };

  return (
    <Content
            style={{
              padding: 24,
              marginTop: 10,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
    {/* <Flex>
      <Input type="text" value={keyword} onChange={handleChange} />
      <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
        検索
      </Button>
    </Flex> */}
    <Form
    name="complex-form"
    onFinish={handleSearch}
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
  >
    <Form.Item label="ハッシュタグ">
      <Space>
        <Form.Item
          name="tag"
          noStyle
          rules={[{ required: true, message: 'ハッシュタグは必須です。' }]}
        >
          <Input style={{ width: 160 }} placeholder="ラーメン" />
        </Form.Item>
      </Space>
    </Form.Item>
    <Form.Item label="投稿順">
      <Space.Compact>
        <Form.Item
          name='dataType'
          noStyle
          rules={[{ required: true, message: '投稿順は必須です。' }]}
        >
          <Select placeholder="Select province">
            <Option value="recent">最新順</Option>
            <Option value="top">人気順</Option>
          </Select>
        </Form.Item>
      </Space.Compact>
    </Form.Item>
    <Form.Item label="ソート順" style={{ marginBottom: 0 }}>
      <Form.Item
        name="sort"
        rules={[{ required: true }]}
        style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
      >
          <Select placeholder="いいね順">
            <Option value="recent">いいね順</Option>
            <Option value="top">コメント順</Option>
          </Select>
      </Form.Item>
    </Form.Item>
    <Form.Item label=" " colon={false}>
      <Button type="primary" htmlType="submit"　icon={<SearchOutlined />}>
        検索
      </Button>
    </Form.Item>
  </Form>
    </Content>
  );
};

export default Search;
