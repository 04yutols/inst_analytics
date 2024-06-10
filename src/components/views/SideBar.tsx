import { Menu, MenuProps } from "antd";
import React from "react";
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import Link from "next/link";

export const SideBar = () =>{
    const labelList = ['投稿分析','投稿詳細分析','アカウント分析']
    const hrefList = ['/','/detail','/myself']
    const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
        (icon, index) => {
          const key = String(index + 1);
      
          return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: <Link href={hrefList[index]} replace>{labelList[index]}</Link>,
          };
        },
      );
      return(
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
          />
      );
}