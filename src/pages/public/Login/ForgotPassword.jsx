import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../context/GlobalContext";
import clsx from "clsx";

const ForgotPassword = () => {

  const navigate = useNavigate();

  const { showAlertConfirm, showAlertAfterConfirm } = useGlobalContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    showAlertConfirm(
      "Confirmation",
      "The system will be send a reset password email",
      () => {
        showAlertAfterConfirm(
          "Send!",
          "Email has been send.",
          () => {
            navigate("/");
          }
        );
      }
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="d-flex flex-column gap-10 mb-20 w-full">
        <h2 className="login-title">Forgot Password</h2>
      </div>
      <div>
        <label className="login-label">E-mail</label>
        <input 
          type="email"
          name="email"
          placeholder="e-mail" 
          className={clsx("login-input-text", { "input-error": errors.email })}
          { ...register("email", { required: true }) }
        />
      </div>
      <div className="d-flex gap-10 mt-25">
        <button type="submit" className="login-button-primary">Submit</button>
        <Link to="/" className="login-button-secondary">Back</Link>
      </div>
    </form>
  )
}

export default ForgotPassword;