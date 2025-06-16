import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../context/GlobalContext";

const VerifyAuthentication = () => {

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const { showAlertWarning, showAlertAfterConfirm, setIsTwoFactorVerify } = useGlobalContext();

  const onSubmit = async (data) => {
    try {
      // const url = process.env.REACT_APP_URL_API + "/auth/2fa/validate-otp";
      // const response = await fetch(url, {
      //   method: "POST",
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ user_id, otp_code: data.token }),
      // });
      // const dataResponse = await response.json();
      // if (dataResponse.status === true) {
      //   showAlertAfterConfirm(
      //     "Success!",
      //     dataResponse.message,
      //     async () => {
      //       await createCookieLogin(userDetailForCookie);  
      //     }
      //   );
      // }
      // else {
      //   showAlertWarning("warning", dataResponse.message);
      // }
      showAlertAfterConfirm(
        "Success!",
        "Verify Successfully",
        () => {
          setIsTwoFactorVerify(false);
          navigate("dashboard");
        }
      );
    } 
    catch (error) {
      return;
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="popup-authentication">
          <h2>Two-Factor<br />Authentication</h2>
          <p>Open the two-step verification app on your mobile device to get your verification code.</p>
          <input 
            type="text" 
            className="input-verify" 
            placeholder="Authentication Code"
            { ...register("token", {
              pattern: {
                value: /^[0-9]+$/,
              },
            })}
          />
          <button type="submit">Authenticate</button>
        </div>
      </form>
    </>
  )
}

export default VerifyAuthentication;