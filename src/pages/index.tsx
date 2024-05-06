'use client'

import { fetchPostedData } from "@/api/fetch";
import { searchPostedData } from "@/api/search";
import Search from "@/components/searchButton";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import React from "react";

const { Header, Content, Sider } = Layout;

export default function Home() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [init, setInit] = useState(true);
  const [posted, setPosted] = useState([]);
  const [searchPosted, setSearchPosted] = useState([]);
  const [clickUpdate, setClickUpdate] = useState(false);
  const [loading, setLoading] = useState(false); // ローディング状態を管理する
  const [count, setCount] = useState(0);
  const [data, setData] = useState();

  const onClickUpdate = () => {
    setClickUpdate(!clickUpdate)
  }

  const onClickTest = () => {
    console.log(posted.data[0].children.data[0].media_url)
  }

  const onClickNext = () => {
    setCount(count+1)
    setData(posted[count].children.data[0].media_url)
  }

  const handleSearch = async(keyword: string) => {
    const searchData = async () => {
      try {
        setLoading(true);
        const data = await searchPostedData(keyword);
        console.log(data);
        setPosted(data);
        setData(data[0].children.data[0].media_url)
        setInit(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally{
        setLoading(false);
      }
    };
    searchData();
    // console.log(`検索キーワード: ${searchPosted.data[0].id}`);
  };

  const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
  }));
  
  const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
      const key = String(index + 1);
  
      return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,
  
        children: new Array(4).fill(null).map((_, j) => {
          const subKey = index * 4 + j + 1;
          return {
            key: subKey,
            label: `option${subKey}`,
          };
        }),
      };
    },
  );


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await fetchPostedData();
  //       setPosted(data);
  //       setData(data.data[0].children.data[0].media_url)
  //       setLoading(false); // fetchが完了したらローディング状態を解除
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [clickUpdate])

  return (
    <>
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items2}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {loading ? ( // ローディング中の場合
        <p>Loading...</p>
      ) : ( // ローディング中でない場合
        <div>
          { init? '' : <img src={data} alt='instagramImage' /> }
          <button onClick={onClickUpdate}>更新</button>
          <button onClick={onClickNext}>次へ</button>
          <button onClick={onClickTest}>test</button>
          <Search onSearch={handleSearch} />
        </div>
        
      )}
          </Content>
        </Layout>
      </Layout>
    </Layout>
    </>
  );
}
