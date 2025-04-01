import { HashRouter, Route, Routes } from "react-router-dom";
import HomeLayout from "./components/home-layout";
import MinkUiForm from "./pages/mink-ui";
import AntdForm from "./pages/antd";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route path={"mink-ui"} element={<MinkUiForm />} />
          <Route path={"antd"} element={<AntdForm />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
