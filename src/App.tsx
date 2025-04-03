import { HashRouter, Route, Routes } from "react-router-dom";
import HomeLayout from "./components/home-layout";
import MinkForm from "./pages/mink-ui";
import AntdForm from "./pages/antd";
import MinkResetForm from "./pages/mink-ui-reset";
import AntdResetForm from "./pages/antd-reset";
import MinkPreserveForm from "./pages/mink-ui-preserve";
import AntdPreserveForm from "./pages/antd-preserve";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route path={"mink-ui"} element={<MinkForm />} />
          <Route path={"antd"} element={<AntdForm />} />
          <Route path={"mink-ui-reset"} element={<MinkResetForm />} />
          <Route path={"antd-reset"} element={<AntdResetForm />} />
          <Route path={"mink-ui-preserve"} element={<MinkPreserveForm />} />
          <Route path={"antd-preserve"} element={<AntdPreserveForm />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
