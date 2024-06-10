'use client'

import { searchPostedData } from "@/api/search";
import { useState } from "react";
import { Layout, Modal } from 'antd';
import React from "react";
import SearchField from "@/components/views/SearchForm";
import { SearchTable } from "@/components/views/SearchTable";
import SearchDetail from "@/components/views/SearchDetail";

export default function Home() {

  const [posted, setPosted] = useState([]);
  const [loading, setLoading] = useState(false); // ローディング状態を管理する
  const [modalData, setModalData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSelectRow = async(value: any) => {
    try {
      setModalData(value);
    } catch(error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsModalOpen(true);
    }
  }

  const handleSearch = async(value: any) => {
    const searchData = async () => {
      try {
        setLoading(true);
        const data = await searchPostedData(value);
        console.log(data);
        setPosted(data);
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
        <SearchTable posted={posted} onSelectRow={handleSelectRow} loading={loading}/>
      </Layout>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <SearchDetail data={modalData}/>
      </Modal>
    </>
  );
}
