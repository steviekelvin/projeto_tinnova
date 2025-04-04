import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import CreatePage from "../pages/create/CreatePage";
import UpdatePage from "../pages/update/UpdatePage";
import Menu from "../components/menu/Menu";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/update" element={<UpdatePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
