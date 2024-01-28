import React from "react";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { Routes, Route, Link } from "react-router-dom";
import Admin from "./Admin";
import CsvImport from "./CsvImport";
import { useAppSelector } from "../app/hooks";
import { selectAuthUser } from "../features/user/authUserSlice";

const { Header, Content, Sider } = Layout;

const itemDetails = [
  {
    icon: UserOutlined,
    label: <Link to="/admin">Admin</Link>,
  },
  {
    icon: VideoCameraOutlined,
    label: <Link to="/csvimport">CsvImport</Link>,
  },
];

const items: MenuProps["items"] = itemDetails.map((detail, index) => ({
  key: String(index + 1),
  icon: React.createElement(detail.icon),
  label: detail.label,
}));

const MainDisplay: React.FC = () => {
  const authUser = useAppSelector(selectAuthUser);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Header
          style={{
            padding: 0,
            // background: colorBgContainer,
            width: "100%",
            position: "fixed",
          }}
        >
          {authUser.userName}
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              <Route path="/admin" element={<Admin />} />
              <Route path="/csvimport" element={<CsvImport />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainDisplay;
