import "./App.css";
import { Route, Routes } from "react-router-dom";
import NotFound from "pages/NotFound";
import Todo from "pages/Todo";
import Login from "pages/Login";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/signin"} element={<Login />} />
        <Route path={"/signup"} element={<Login />} />
        <Route path={"/todo"} element={<Todo />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
