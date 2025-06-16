import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useGlobalContext } from "../../../context/GlobalContext";
import PasswordExpired from "./PasswordExpired";
import bgLogin from "../../../assets/images/bg-login.png";
import PhotoLogin from "../../../assets/images/photo-login.png";
import logoLogin from "../../../assets/images/logo-login.png";
import logoCompany from "../../../assets/images/logo-vri.png";
import clsx from "clsx";

const LoginLayout = () => {

  const [isPasswordExpired, setIsPasswordExpired] = useState(false);

  const { isTwoFactorRegister, isTwoFactorVerify } = useGlobalContext();

  return (
    <>
      <div className="login-page">
        <div className="login-image" style={{ backgroundImage: `url(${bgLogin})` }}>
          <img alt="" src={PhotoLogin} className="login-photo" />
          <div className="text-system">iMES - Intelligence Manufacturing Execution System</div>
        </div>
        <div className="login-container">
          <div className="login-content">
            <img alt="" src={logoLogin} className="login-logo" />
            <Outlet />
          </div>
        </div>
        <div className="login-footer">
          <div className="copyright">
            <div className="company-logo">
              <img alt="" src={logoCompany} /> 
            </div>
            Copyright &copy; 2025 VR INTELLIGENCE CO., LTD.
          </div>
          <div>
            iMES - Intelligence Manufacturing Execution System
          </div>
        </div>
      </div>
      <PasswordExpired isPasswordExpired={isPasswordExpired} setIsPasswordExpired={setIsPasswordExpired} />
      <div className={clsx("login-backdrop", { open: isPasswordExpired || isTwoFactorRegister || isTwoFactorVerify })}></div>
    </>
  )
}

export default LoginLayout;