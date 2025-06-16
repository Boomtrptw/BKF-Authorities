import Logo from "../../../assets/images/logo-vri.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="copyright">
        <div className="company-logo">
          <img alt="" src={Logo} /> 
        </div>
        Copyright &copy; 2025 VR INTELLIGENCE CO., LTD.
      </div>
      <div>
        iMES - Intelligence Manufacturing Execution System
      </div>
    </div>
  )
}

export default Footer;