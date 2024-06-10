'use client'
import { SideBar } from "@/components/views/SideBar"
import { TopMenu } from "@/components/views/TopMenu"
import { Layout, theme } from "antd"
import Sider from "antd/es/layout/Sider"
import { Content, Header } from "antd/es/layout/layout"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <html lang="ja">
      <body>
      <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <TopMenu/>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <SideBar/>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content>
          {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
    </body>
    </html>
  )
}
