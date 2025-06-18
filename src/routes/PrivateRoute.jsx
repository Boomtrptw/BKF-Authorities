import { Route } from "react-router-dom";
import { Dashboard } from "../pages/private/Dashboard/Dashboard";
import Layout from "../components/common/Layout/Layout";

const PrivateRoute = () => {
  return (
    <Route element={<Layout />}>
      <Route path="dashboard" element={<Dashboard />} />
    </Route> 
  );
  
};

export default PrivateRoute;