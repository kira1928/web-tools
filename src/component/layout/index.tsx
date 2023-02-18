import React from "react";
import { HashRouter as Router, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { MonitorOutlined } from "@ant-design/icons";
import "./layout.css";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class RootLayout extends React.Component<React.PropsWithChildren> {
  render() {
    return (
      <Layout className="all-layout">
        <Header className="header small-header">
          <h3 className="logo-text">Bililive-go</h3>
        </Header>
        <Layout>
          <Router>
            <Sider
              className="side-bar"
              width={200}
              style={{ background: "#fff" }}
            >
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%", borderRight: 0 }}
                items={[
                  {
                    label: <span>工具列表</span>,
                    key: "sub1",
                    icon: <MonitorOutlined />,
                    children: [
                      {
                        key: "1",
                        label: <Link to="/file-split">文件分割</Link>,
                      },
                    ],
                  },
                ]}
              ></Menu>
            </Sider>
            <Layout className="content-padding">
              <Content
                className="inside-content-padding"
                style={{
                  background: "#fff",
                  margin: 0,
                  minHeight: 280,
                  overflow: "auto",
                }}
              >
                {this.props.children}
              </Content>
            </Layout>
          </Router>
        </Layout>
      </Layout>
    );
  }
}

export default RootLayout;
