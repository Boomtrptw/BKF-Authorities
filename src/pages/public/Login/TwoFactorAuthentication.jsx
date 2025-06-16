import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../context/GlobalContext";
import QRCodeImg from "../../../assets/images/qrcode.png";
// import QRCode from "qrcode";

const TwoFactorAuthentication = () => {

  const navigate = useNavigate();

  const { register, handleSubmit} = useForm();

  const { showAlertWarning, showAlertAfterConfirm, setIsTwoFactorRegister } = useGlobalContext();
  
  // const [authUrl, setAuthUrl] = useState("");
  // const [secret, setSecret] = useState("");
  // const [qrCodeUrl, setQrCodeUrl] = useState("");
  
  // useEffect(() => {
  //   getGenerateSecret();
  // }, []);

  // useEffect(() => {
  //   if (authUrl) {
  //     QRCode.toDataURL(authUrl).then(setQrCodeUrl);
  //   }
  // }, [authUrl]);

  // const getGenerateSecret = async () => {
  //   try {
  //     const url = process.env.REACT_APP_URL_API + "/auth/2fa/generate-secret";
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ user_id }),
  //     });
  //     const dataResponse = await response.json();
  //     setAuthUrl(dataResponse.auth_url);
  //     setSecret(dataResponse.secret)
  //   } 
  //   catch (error) {
  //     return;
  //   }
  // }

  const onSubmit = async (data) => {
    console.log(data);
    try {
      // const url = process.env.REACT_APP_URL_API + "/auth/2fa/verify-otp";
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
      //   showAlertWarning("warning", dataResponse.detail);
      // }
      showAlertAfterConfirm(
        "Success!",
        "Verify Successfully",
        () => {
          setIsTwoFactorRegister(false);
          navigate("dashboard");
        }
      );
    } 
    catch (error) {
      return;
    }
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="popup-generate-code">  
        <div className="content-header">
          <h2>Two-Factor Authentication (2FA)</h2>
        </div>
        <div className="content-body">
          <div>
            <h3>Configuring Google Authenticator or Authy</h3>
            <ul>
              <li>Install Google Authenticator (IOS - Android) or Authy (IOS - Android).</li>
              <li>In the authenticator app, select "+" icon.</li>
              <li>Select "Scan a barcode (or QR code)" and use the phone's camera to scan this barcode.</li>
            </ul>
          </div>
          <div>
            <h3>Scan QR Code</h3>
            {/* <img alt="qrcode url" src={qrCodeUrl} className="qrcode-url" /> */}
            <img alt="qrcode url" src={QRCodeImg} className="qrcode-url" />
          </div>
          <div>
            <h3>Or Enter Code Into Your App</h3>
            {/* <p>SecretKey: {secret} (Base32 encoded)</p> */}
            <p>SecretKey: (Base32 encoded)</p>
          </div>
          <div>
            <h3>Verify Code</h3>
            <p className="mg-b5">For changing the setting, please verify the authentication code:</p>
            <input 
              type="text" 
              placeholder="Authentication Code" 
              className="input-verify"
              { ...register("token", {
                pattern: {
                  value: /^[0-9]+$/,
                },
              })}
            />
          </div>
          <div className="group-button">
            <button type="submit" className="button button-verify">Verify &amp; Activate</button>
          </div>    
        </div>
      </div>
    </form>
  )
}

export default TwoFactorAuthentication;