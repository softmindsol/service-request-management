import { Routes, Route } from "react-router-dom";
import AdminDashboard from "@/pages/admin-dashboard";
import ServiceRequest from "@/pages/service-request";
import AuthForm from "@/pages/AuthForm";
import AnsweredOrdersPage from "@/pages/AnsweredOrdersPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ServiceRequest />} />
      <Route path="/auth-form" element={<AuthForm />} />
      <Route path="/admin-panel" element={<AdminDashboard />} />
      <Route path="/answered-order" element={<AnsweredOrdersPage />} />

    </Routes>
  );
}

export default App;
