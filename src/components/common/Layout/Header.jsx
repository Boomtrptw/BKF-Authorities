import { useState } from "react";
import { useGlobalContext } from "../../../context/GlobalContext";
import { MdArrowDropDown } from "react-icons/md";
import Logo from "../../../assets/images/logo-vri.png";
import IconSearch from "../../../assets/icons/icon-search.png";
import { useNavigate } from "react-router-dom";
import { removeAuthUser, getAuthUser } from "../../../context/authCookie";

const Header = ({ setSearchText }) => {
  const navigate = useNavigate();
  const [showInput, setShowInput] = useState(false);

  const { showSidebarMenu, setShowSidebarMenu } = useGlobalContext();

  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdownName) => {
    if (openDropdown === dropdownName) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(dropdownName);
    }
  };

  const user = getAuthUser();

  const handleLogout = () => {
    removeAuthUser();
    navigate("/");
  };

  const handleClick = () => {
    setShowInput((prev) => !prev);
    if (showInput) {
      setSearchText("");
    }
  };

  return (
    <div className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="company-logo">
            <img alt="" src={Logo} />
          </div>
          <h1>iMES Intelligence Manufacturing Execution System</h1>
          <div
            className="menu-toggle"
            onClick={() => setShowSidebarMenu(!showSidebarMenu)}
          >
          </div>
        </div>
        <div className="header-right">
          {showInput && (
            <input
              type="text"
              style={{
                borderRadius: "3px",
                padding: "5px",
                width: "200px",
                height: "30px",
                border: "none",
                outline: "none",
              }}
              placeholder="Search..."
              onChange={(e) => setSearchText(e.target.value)}
            />
          )}
          <img
            src={IconSearch}
            alt="Search"
            onClick={handleClick}
            style={{ cursor: "pointer" }}
          />
          <div className="dropdown dropdown-header">
            <div
              className="header-user cursor-pointer"
              onClick={() => toggleDropdown("userMenu")}
            >
              <div
                className="user-photo"
                style={{ width: "45px", height: "45px", overflow: "hidden" }}
              >
                <img
                  style={{ width: "100%", height: "auto" }}
                  alt=""
                  src={user?.photo}
                />
              </div>
              <div className="user-info">
                <p className="text-white text-sm font-semibold mb-2">
                  {user?.firstname} {user?.lastname}
                </p>
                <p className="text-white text-xs mb-0">
                  {user?.departmentname}
                </p>
              </div>
              <MdArrowDropDown className="text-white text-2xl" />
            </div>
            {openDropdown === "userMenu" && (
              <ul className="dropdown-content user-content">
                <li>
                  <span
                    className="text-red"
                    onClick={handleLogout}
                    style={{ cursor: "pointer" }}
                  >
                    Logout
                  </span>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
