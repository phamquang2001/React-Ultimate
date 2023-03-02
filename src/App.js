import "./App.scss";
import Header from "./Component/Header/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="header-content">
        <Header />
      </div>
      <div className="body-content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
