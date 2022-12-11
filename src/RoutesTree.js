import React from "react";
import { Routes, Route } from "react-router-dom";

import ArticleList from "./components/ArticleList";
import DashBoard from "./components/DashBoard";
import Login from "./components/Login";
import Article from "./components/Article";

const RoutesTree = () => {
  return (
    <Routes>
      <Route path="/" element={<ArticleList />} />
      <Route path="/arttcle/:title" element={<Article />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default RoutesTree;
