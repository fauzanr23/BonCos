import "toastify-js/src/toastify.css";
import { Routes, Route } from "react-router";
import Categories from "./views/Categories";
import Login from "./views/login";
import AddUser from "./views/AddUser";
import CuisineDetail from "./views/detail";
import HomePage from "./views/Home";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/register" element={<AddUser />} />
          <Route path="/cuisines/:id" element={<CuisineDetail />} />
        </Route>
      </Routes>
  )
}

export default App
