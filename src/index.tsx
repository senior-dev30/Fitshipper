import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import { ConfigProvider } from "antd";
import { Router } from "react-router-dom";
import { QueryClientProvider } from "react-query";
// import zhCN from 'antd/lib/locale/zh_CN'
import history from "./utils/history";
import queryClient from "./lib/queryClient";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import theme from "../theme";

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient()}>
      <ThemeProvider theme={theme}>
        <ConfigProvider>
          <Router history={history}>
            <App />
          </Router>
        </ConfigProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
