import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./routes/Route.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { injectStoreInAxios } from "./api/axiosInstance.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router />
  </Provider>
);

// 전역 store를 axiosInstance로 강제 주입
injectStoreInAxios(store);
