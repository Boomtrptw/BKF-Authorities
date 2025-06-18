import { Route } from "react-router-dom";
import { Dashboard } from "../pages/private/Dashboard/Dashboard";
import Layout from "../components/common/Layout/Layout";
import ProtectedRoute from "../routes/ProtectedRoute";

const PrivateRoute = () => {
  return (
    <Route element={<Layout />}>
      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Route>
  );
};

export default PrivateRoute;
