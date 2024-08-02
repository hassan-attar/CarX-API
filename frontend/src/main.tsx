import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "./store/store";

const customTheme = {
  components: {},
  token: {
    colorPrimary: "blue",
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={customTheme}>
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
