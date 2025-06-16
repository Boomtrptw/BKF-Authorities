import { Link } from "react-router-dom";
import { IoIosWarning } from "react-icons/io";
import clsx from "clsx";

const PasswordExpired = ({isPasswordExpired, setIsPasswordExpired}) => {
  return (
    <div className={clsx("modal-password-expired", { open: isPasswordExpired })}>
      <div className="modal-header">
        <IoIosWarning />
      </div>
      <div className="modal-body">
        <h2>Password expired</h2>
        <p>
          “ Password expired
          <br />
          Please change new password ” 
        </p>
        <Link to="password-expired" className="login-button-primary" onClick={() => setIsPasswordExpired(!isPasswordExpired)}>Change Password</Link>
      </div>
    </div> 
  )
}

export default PasswordExpired;