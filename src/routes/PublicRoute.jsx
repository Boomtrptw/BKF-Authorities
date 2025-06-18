import { Routes, Route } from "react-router-dom";
import { LoginLayout, Login } from "../pages/public/Login/index";
import PrivateRoute from "./PrivateRoute";

const PublicRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginLayout />}>
        <Route index element={<Login />} />
      </Route>
      {PrivateRoute()}
    </Routes>
  );
};

export default PublicRoute;
