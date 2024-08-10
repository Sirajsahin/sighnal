import Router from "@/app/routes/router";
import { store } from "@/app_redux/stores/root_store";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router />
  </Provider>
  // </React.StrictMode>
);
