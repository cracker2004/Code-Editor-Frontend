import React from "react";
import { useState } from "react";
import axios from "axios";
import "../App.css";
import Header from "../Components/HomePage Components/Header";
import MainEditor from "../Components/HomePage Components/MainEditor";

const Home = () => {
  const [langname, setLangname] = useState("C")
  return (
    <div className="h-screen scrollbar">
      <Header langname={langname} />

      <MainEditor setLangname={setLangname} />
    </div>
  );
};

export default Home;
