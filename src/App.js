import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

import ArticleList from "./components/ArticleList";
import DashBoard from "./components/DashBoard";
import Login from "./components/Login";
import Article from "./components/Article";
import UserProvider from "./providers/UserProvider";
import { logOut } from "./services/firebase";

import Nav from "react-bootstrap/Nav";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <UserProvider>
        <Nav
          className="justify-content-center"
          activeKey="/"
          onSelect={(selectedKey) => {
            if (selectedKey === "signout") logOut();
          }}
        >
          <Nav.Item>
            <Nav.Link href="/search">Search</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/dashboard">Dashbaord</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="signout">Sign Out</Nav.Link>
          </Nav.Item>
        </Nav>
        <Routes>
          <Route path="/search" element={<ArticleList />} />
          <Route path="/article/:title" element={<Article />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
