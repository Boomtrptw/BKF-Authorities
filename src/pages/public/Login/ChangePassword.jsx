import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../context/GlobalContext";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { TbPointFilled } from "react-icons/tb";
import { IoCheckmark, IoClose } from "react-icons/io5";
import clsx from "clsx";

const ChangePassword = () => {

  const navigate = useNavigate();

  const location = useLocation();
  const passwordExpired = location.pathname.includes("password-expired");

  const { showAlertConfirm, showAlertAfterConfirm } = useGlobalContext();

  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors, isSubmitted  },
  } = useForm()

  const [isShowPassword, setIsShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [isPasswordExpired, setIsPasswordExpired] = useState(false);

  useEffect(() => {
    clearErrors();
    if (passwordExpired) {
      setIsPasswordExpired(true);
    }
  },[])

  const newPassword  = watch("newPassword") || "";
  const confirmPassword = watch("confirmPassword") || "";
  const passwordLength = newPassword .length;
  const isPasswordEmpty = passwordLength === 0;
  const isPasswordInvalid = passwordLength < 8 || passwordLength > 12;
  const hasNumber = /\d/.test(newPassword );
  const hasCapitalLetter = /[A-Z]/.test(newPassword );
  const hasLowercaseLetter = /[a-z]/.test(newPassword );
  const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword );
  const passwordsMatch = newPassword === confirmPassword;

  const validatePassword = (value) => {
    if (!value) return false;
    if (value.length < 8 || value.length > 12) return false;
    if (!/[0-9]/.test(value)) return false;
    if (!/[A-Z]/.test(value)) return false;
    if (!/[a-z]/.test(value)) return false;
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) return false;
    return true;
  };

  const handleShowPassword = (field) => {
    setIsShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const onSubmit = (data) => {
    showAlertConfirm(
      "Are you sure?",
      "The data will be updated to your database.",
      () => {
        showAlertAfterConfirm(
          "Updated!",
          "Data has been completely updated.",
          () => {
            navigate("/");
          }
        );
      }
    );
  }

  const renderPasswordCondition = (condition, isEmpty, isSubmitted, label) => {
    const showInitial = isEmpty && !isSubmitted;
    const showError = !condition || (isSubmitted && isEmpty);
  
    let className = "";
    if (isSubmitted && isEmpty) {
      className = "text-error";
    } else if (!isEmpty) {
      className = condition ? "text-success" : "text-error";
    }
  
    return (
      <li className={`password-condition ${className}`}>
        {showInitial ? (
          <TbPointFilled />
        ) : showError ? (
          <IoClose className="text-error" />
        ) : (
          <IoCheckmark className="text-success" />
        )}
        {label}
      </li>
    );
  }

  return (  
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="d-flex flex-column gap-10 mb-20 w-full">
        <h2 className="login-title">Change Password</h2>
      </div>
      <div>
        <label className="login-label">E-mail</label>
        <input 
          type="text"
          name="username"
          placeholder="e-mail or username"
          disabled={isPasswordExpired}
          defaultValue={isPasswordExpired ? "Pongsakorn.B@vri.co.th" : ""}
          className={clsx("login-input-text", { "input-error": errors.username })}
          { ...register("username", { required: true }) }
        ></input>
      </div>
      <div className="mt-10">
        <label className="login-label">Old Password</label>
        <div className="position-relative">
          <input 
            type={isShowPassword.oldPassword ? "text" : "password"}
            name="oldPassword" 
            placeholder="old password"
            className={clsx("login-input-text pr-7", { "input-error": errors.oldPassword })}
            { ...register("oldPassword", { required: true }) }
          ></input>
          {isShowPassword.oldPassword ? (
            <IoMdEye className="password-icon" onClick={() => handleShowPassword("oldPassword")} />
          ) : (
            <IoMdEyeOff className="password-icon" onClick={() => handleShowPassword("oldPassword")} />
          )}
        </div>
      </div>
      <div className="mt-10">
        <label className="login-label">New Password</label>
        <div className="position-relative">
          <input 
            type={isShowPassword.newPassword ? "text" : "password"}
            name="newPassword" 
            placeholder="new password" 
            className={clsx("login-input-text pr-7", { "input-error": errors.newPassword })}
            { ...register("newPassword", { 
              required: true, 
              validate: validatePassword
            })}
          ></input>
          {isShowPassword.newPassword ? (
            <IoMdEye className="password-icon" onClick={() => handleShowPassword("newPassword")} />
          ) : (
            <IoMdEyeOff className="password-icon" onClick={() => handleShowPassword("newPassword")} />
          )}
        </div>
      </div>
      <div className="mt-10">
        <label className="login-label">Confirm Password</label>
        <div className="position-relative">
          <input 
            type={isShowPassword.confirmPassword ? "text" : "password"}
            name="confirmPassword" 
            placeholder="confirm password"
            className={clsx("login-input-text pr-7", { "input-error": errors.confirmPassword })}
            { ...register("confirmPassword", { 
              required: true,
              validate: (value) => value === watch("newPassword") || "Passwords must match",
            })}
          ></input>
          {isShowPassword.confirmPassword ? (
            <IoMdEye className="password-icon" onClick={() => handleShowPassword("confirmPassword")} />
          ) : (
            <IoMdEyeOff className="password-icon" onClick={() => handleShowPassword("confirmPassword")} />
          )}
        </div>
      </div>
      <ul className="my-8 pl-8">
        {renderPasswordCondition(!isPasswordInvalid, isPasswordEmpty, isSubmitted, "8 to 12 Character Passwords")}
        {renderPasswordCondition(hasNumber, isPasswordEmpty, isSubmitted, "Require a number in the password")}
        {renderPasswordCondition(hasCapitalLetter, isPasswordEmpty, isSubmitted, "Require a capital letter in the password")}
        {renderPasswordCondition(hasLowercaseLetter, isPasswordEmpty, isSubmitted, "Require a lower case letter in the password")}
        {renderPasswordCondition(hasSpecialCharacter, isPasswordEmpty, isSubmitted, "Require a symbol in the password")}
        {renderPasswordCondition(passwordsMatch, confirmPassword.length === 0, isSubmitted, "Passwords must match")}
      </ul>
      <div className="d-flex gap-10 mt-25">
        <button className="login-button-primary">Submit</button>
        <Link to="/" className="login-button-secondary">Back</Link>
      </div>
    </form> 
  )
}

export default ChangePassword;