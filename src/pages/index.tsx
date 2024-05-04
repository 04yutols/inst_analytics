'use client'

import { fetchPostedData } from "@/api/fetch";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [posted, setPosted] = useState([]);
  const [clickUpdate, setClickUpdate] = useState(false);
  const [loading, setLoading] = useState(true); // ローディング状態を管理する
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
    setData(posted.data[count].children.data[0].media_url)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPostedData();
        setPosted(data);
        setData(data.data[0].children.data[0].media_url)
        setLoading(false); // fetchが完了したらローディング状態を解除
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [clickUpdate])

  return (
    <>
      {loading ? ( // ローディング中の場合
        <p>Loading...</p>
      ) : ( // ローディング中でない場合
        <div>
          <img src={data} alt='instagramImage' />
          <button onClick={onClickUpdate}>更新</button>
          <button onClick={onClickNext}>次へ</button>
          <button onClick={onClickTest}>test</button>
        </div>
      )}
    </>
  );
}
