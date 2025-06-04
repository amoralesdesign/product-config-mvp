import { BrowserRouter, Routes, Route } from "react-router";
import { Home } from "./pages/Home";
import { MainLayout } from "./layouts/MainLayout";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};