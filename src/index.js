import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import User from "./Component/User/User";
import Admin from "./Component/Admin/Admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Component/Home/Home";
import ManageUser from "./Component/Admin/Content/ManageUser";

import Login from "./Component/User/Login";
import { ToastContainer } from "react-toastify";
import SignUp from "./Component/User/SignUp";
import { Provider } from "react-redux";
import { store, persistor } from "./Component/redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import ListQuiz from "./Component/User/ListQuiz";
import DetailQuiz from "./Component/User/DetailQuiz";
import ErrorPage from "./Component/Home/ErrorPage";
import ManageQuiz from "./Component/Admin/Quiz/ManageQuiz";
import QuestionsAnswer from "./Component/Admin/Question/QuestionsAnswer";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />}></Route>
            <Route path="/user" element={<ListQuiz />}></Route>
          </Route>
          <Route path="/quiz/:id" element={<DetailQuiz />}></Route>
          <Route path="/admin" element={<Admin />}>
            {/* <Route index element={<Dashboard />}></Route> */}
            <Route path="admin-user" element={<ManageUser />}></Route>
            <Route path="admin-quiz" element={<ManageQuiz />}></Route>
            <Route path="admin-question" element={<QuestionsAnswer />}></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
