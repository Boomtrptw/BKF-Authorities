import { Routes, Route } from "react-router-dom";
import { LoginLayout, Login, ForgotPassword, ChangePassword } from "../pages/public/Login/index";
import PrivateRoute from "./PrivateRoute";

const PublicRoute = () => {

  return (
    <Routes>
      <Route path="/" element={<LoginLayout />}>
        <Route index element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="change-password" element={<ChangePassword />} />
        <Route path="password-expired" element={<ChangePassword />} />
      </Route>
      { PrivateRoute() }
    </Routes>
  )
}

export default PublicRoute;