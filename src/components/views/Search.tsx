import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip, Input, theme, Form, Row, Col } from 'antd';
import { Content } from 'antd/es/layout/layout';

const FormItem = Form.Item;

interface SearchProps {
  onSearch: (keyword: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = React.useState('');

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleSearch = () => {
    onSearch(keyword);
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
    <Form
        className="ant-advanced-search-form"
        onSubmit={handleSearch}
      >
        <Row gutter={40}>{this.getFields()}</Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">Search</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              Clear
            </Button>
          </Col>
        </Row>
      </Form>
    <Flex>
      <Input type="text" value={keyword} onChange={handleChange} />
      <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
        検索
      </Button>
    </Flex>
    </Content>
  );
};

export default Search;
