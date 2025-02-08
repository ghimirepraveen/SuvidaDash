import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import "./App.css";

import AuthenticatedRoutes from "./router/AuthenticatedRoutes";
import Organization from "./pages/OrganizationAll";
import Service from "./pages/ServiceAll";
import ServiceDetails from "./pages/serviceDetail";
import OrganizationDetailsPage from "./pages/organizationDetails";
import NameService from "./pages/ServiceNameAll";
import Dashboard from "./pages/dasboard";
import Booking from "./pages/bookingAll";
import BookingDetails from "./pages/bookingDetails";
import Order from "./pages/orderAll";
import OrderDetails from "./pages/orderDetails";
import PageNotFound from "./pages/NotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <AuthenticatedRoutes>
              <Dashboard />
            </AuthenticatedRoutes>
          }
        />

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
          path="/servicename"
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

        <Route
          path="/booking"
          element={
            <AuthenticatedRoutes>
              <Booking />
            </AuthenticatedRoutes>
          }
        />
        <Route
          path="/booking/:id"
          element={
            <AuthenticatedRoutes>
              <BookingDetails />
            </AuthenticatedRoutes>
          }
        />
        <Route
          path="/order"
          element={
            <AuthenticatedRoutes>
              <Order />
            </AuthenticatedRoutes>
          }
        />
        <Route
          path="/order/:id"
          element={
            <AuthenticatedRoutes>
              <OrderDetails />
            </AuthenticatedRoutes>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
