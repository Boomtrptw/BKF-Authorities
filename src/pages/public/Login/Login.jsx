import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
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

  const handleShowPassword = (field) => {
    setIsShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const onSubmit = async (data) => {
    try {
      const apiUrl = `${apiAdUrl}?username=${data.username}&password=${data.password}`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
   
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
   
      const user_login = await response.json();
   
      const user_data = user_login;

      if (user_data.resultstatus === true) {
        setAuthUser(user_data);
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
        <div className="d-flex flex-column gap-15 mt-25">
          <button type="submit" className="login-button-primary">
            Sign In
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
