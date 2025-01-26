import React from "react";
import logo from "./logo.svg";
import "./App.css";
import 'simple-notify/dist/simple-notify.css'

import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { ConfigProvider, theme } from "antd";

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#ffdd09",
          colorBgContainer: "#1C2437",
          colorBgBase: "#1C2437",
        },
      }}
    >
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
