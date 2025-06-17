import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import axios from "axios";
import { useGlobalContext } from "../../../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { setAuthUser, apiAdUrl } from "../../../context/authCookie";

const Login = () => {
  const navigate = useNavigate();
  const { showAlertWarning, showAlertAfterConfirm } = useGlobalContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isShowPassword, setIsShowPassword] = useState({
    password: false,
  });
  // const isVerifyAuthentication = true;

  const handleShowPassword = (field) => {
    setIsShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.get(
        `${apiAdUrl}?username=${data.username}&password=${data.password}`
      );

      if (response.data.resultstatus === true) {
        setAuthUser(response.data);
        showAlertAfterConfirm("Success!", "", () => {
          navigate("/dashboard");
        });
      } else {
        showAlertWarning("warning", "Email or password is incorrect");
      }
    } catch (error) {
      showAlertWarning("warning", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex flex-column gap-10 mb-20 w-full">
          <h2 className="login-title">SIGN IN</h2>
          <p className="login-sub-title">
            Welcome back? Please enter your details.
          </p>
        </div>
        <div>
          <label className="login-label">E-mail</label>
          <input
            type="text"
            name="username"
            placeholder="Username or email"
            className={clsx("login-input-text", {
              "input-error": errors.username,
            })}
            {...register("username", { required: true })}
          />
        </div>
        <div className="mt-15">
          <label className="login-label">Password</label>
          <div className="position-relative">
            <input
              type={isShowPassword.password ? "text" : "password"}
              name="password"
              placeholder="Please specify password"
              className={clsx("login-input-text pr-7", {
                "input-error": errors.password,
              })}
              {...register("password", { required: true })}
            />
            {isShowPassword.password ? (
              <IoMdEye
                className="password-icon"
                onClick={() => handleShowPassword("password")}
              />
            ) : (
              <IoMdEyeOff
                className="password-icon"
                onClick={() => handleShowPassword("password")}
              />
            )}
          </div>
        </div>
        <div className="mt-5 d-flex justify-content-between">
          <Link
            to="change-password"
            className="text-yellow text-xs text-decoration-none"
          >
            Change Password
          </Link>
          <Link
            to="forgot-password"
            className="text-yellow text-xs text-decoration-none"
          >
            Forgot your Password?
          </Link>
        </div>
        <div className="d-flex flex-column gap-15 mt-25">
          <button type="submit" className="login-button-primary">
            Sign In
          </button>
        </div>
      </form>
      {/* { isTwoFactorRegister && <TwoFactorAuthentication /> } */}
      {/* { isTwoFactorVerify && <VerifyAuthentication /> } */}
    </>
  );
};

export default Login;
