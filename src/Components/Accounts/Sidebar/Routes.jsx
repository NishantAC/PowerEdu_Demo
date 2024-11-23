import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AccountsHome from "../Home/AccountsHome";
import Layout from "./Layout";

function AppRoutes() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="*" element={<Navigate to="/accounts" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default AppRoutes;