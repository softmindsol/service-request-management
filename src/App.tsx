import { Routes, Route } from "react-router-dom";
import AdminDashboard from "@/pages/admin-dashboard";
import ServiceRequest from "@/pages/service-request";
import AuthForm from "@/pages/AuthForm";
import AnsweredOrdersPage from "@/pages/AnsweredOrdersPage";
import OrderPage from "./pages/OrderPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EmailVerification from "./pages/VerifyEmail";

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Login Route */}
      <Route path="/service-request" element={<ServiceRequest />} />
      <Route path="/auth-form" element={<AuthForm />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/order-status" element={<OrderPage />} />
      <Route path="/verify-email/:token" element={<EmailVerification />} />

      <Route path="/answered-order" element={<AnsweredOrdersPage />} />

    </Routes>
  );
}

export default App;
