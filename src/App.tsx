import { Routes, Route } from "react-router-dom";
import ServiceRequest from "./common/service-request";
import AdminDashboard from "./common/admin-dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ServiceRequest />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
