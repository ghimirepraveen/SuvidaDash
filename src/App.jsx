import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import "./App.css";

import AuthenticatedRoutes from "./router/AuthenticatedRoutes";
import Organization from "./pages/OrganizationAll";
import Service from "./pages/ServiceAll";
import ServiceDetails from "./pages/serviceDetail";
import OrganizationDetailsPage from "./pages/organizationDetails";
import NameService from "./pages/ServiceNameAll";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/organization/requested"
          element={
            <AuthenticatedRoutes>
              <Organization dataSource="requested" />
            </AuthenticatedRoutes>
          }
        />
        <Route
          path="/organization/all"
          element={
            <AuthenticatedRoutes>
              <Organization />
            </AuthenticatedRoutes>
          }
        />
        <Route
          path="/service/requested"
          element={
            <AuthenticatedRoutes>
              <Service dataSource="requested" />
            </AuthenticatedRoutes>
          }
        />
        <Route
          path="/service/all"
          element={
            <AuthenticatedRoutes>
              <Service />
            </AuthenticatedRoutes>
          }
        />
        <Route
          path="/service-name"
          element={
            <AuthenticatedRoutes>
              <NameService />
            </AuthenticatedRoutes>
          }
        />

        <Route
          path="/organization/:id"
          element={
            <AuthenticatedRoutes>
              <OrganizationDetailsPage />
            </AuthenticatedRoutes>
          }
        />
        <Route
          path="/service/:id"
          element={
            <AuthenticatedRoutes>
              <ServiceDetails />
            </AuthenticatedRoutes>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
