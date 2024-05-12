'use client'

import { fetchPostedData } from "@/api/fetch";
import { searchPostedData } from "@/api/search";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { MenuProps, TableColumnsType, TableProps } from 'antd';
import { Breadcrumb, Layout, Menu, Spin, theme, Table } from 'antd';
import React from "react";
import SearchField from "@/components/views/SearchForm";
import { SearchTable } from "@/components/views/SearchTable";

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
        <SearchField onSearch={handleSearch} />
      {/* {loading ? ( // ローディング中の場合
        <Spin tip="Loading" size="large">
          {content}
        </Spin>
      ) : ( // ローディング中でない場合
        <div>
          { init? '' : <img src={data} alt='instagramImage' /> }
        </div>
      )} */}
        <SearchTable/>
      </Layout>
    </>
  );
}
