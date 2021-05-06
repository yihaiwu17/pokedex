import React, { useState, useEffect } from "react";
import { List, Input, Card, Row, Col, Tag, Layout, Menu, BackTop } from "antd";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import styled from "styled-components";

const LogoDiv = styled.div`
  display: flex;
  float: left;
  width: 150px;
  height: 31px;
  margin: 16px;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  letter-spacing: 5px;
  color: #fff;
  text-shadow: 5px 1px 5px;
  box-shadow: 5px 1px 5px;
  background: rgba(255, 255, 255, 0.25);
`;

const { Header, Content, Footer } = Layout;

export default function HeaderBar(props) {
  return (
    <>
      <Layout>
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "white",
            fontSize: "20px",
            alignItems: "center",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <LogoDiv>Pokedex</LogoDiv>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/">Pokedex </Link>
            </Menu.Item>

            <Menu.Item key="2">
              <Link to="/home">Home</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/about">About</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content
          style={{
            background: "#fff",
            margin: "0px auto",
            maxWidth:'65%',
            minHeight: "auto",
          }}
        >
            {props.children}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          pokemon task by Philip Wu
        </Footer>
      </Layout>
    </>
  );
}
