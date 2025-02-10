import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  ProductOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh", overflow: "hidden" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(collapsed) => setCollapsed(collapsed)}
        width="250px"
        style={{ position: "fixed", left: 0, height: "100vh", zIndex: 1 }}
      >
        {!collapsed && (
          <div
            className="logo"
            style={{ padding: "16px", textAlign: "center", color: "gray" }}
          >
            <h2>Suvida</h2>
          </div>
        )}
        <Menu theme="dark" mode="inline" style={{ fontSize: "20px" }}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>

          <SubMenu
            key="organization"
            icon={<BankOutlined />}
            title="Organization"
          >
            <Menu.Item key="organization-all">
              <Link to="/organization/all">All</Link>
            </Menu.Item>
            <Menu.Item key="organization-requested">
              <Link to="/organization/requested">Requested</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="service" icon={<UserOutlined />} title="Service">
            <Menu.Item key="service-all">
              <Link to="/service/all">All</Link>
            </Menu.Item>
            <Menu.Item key="service-requested">
              <Link to="/service/requested">Requested</Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="servicename" icon={<ProductOutlined />}>
            <Link to="/servicename">ServiceName</Link>
          </Menu.Item>

          <Menu.Item key="order" icon={<ProductOutlined />}>
            <Link to="/order">Order</Link>
          </Menu.Item>

          <Menu.Item key="booking" icon={<ProductOutlined />}>
            <Link to="/booking">Booking</Link>
          </Menu.Item>

          {/* <Menu.Item key="settings" icon={<SettingOutlined />}>
            <Link to="/settings">Settings</Link>
          </Menu.Item> */}
          <Menu.Item key="5" icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 250 }}>
        <Header
          style={{
            background: "#fff",
            padding: 0,
            position: "fixed",
            width: "100%",
            zIndex: 1,
          }}
        />
        <Content
          style={{
            margin: "16px",
            padding: "16px",
            marginTop: 64,
            overflowY: "auto",
            height: "calc(100vh - 80px)",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
