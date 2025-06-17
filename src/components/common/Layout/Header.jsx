import { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../../context/GlobalContext";
import { IoIosStar } from "react-icons/io";
import { FaBell } from "react-icons/fa6";
import { MdArrowDropDown } from "react-icons/md";
import { IoStar } from "react-icons/io5";
import { bookmark, notification } from "../../../data/header";
import Logo from "../../../assets/images/logo-vri.png";
// import UserPhoto from "../../../assets/images/user-photo.png";
import IconHamburger from "../../../assets/icons/icon-hamburger.png";
import FlagEN from "../../../assets/images/flag-en.jpg";
import FlagTH from "../../../assets/images/flag-th.jpg";
import { useNavigate } from "react-router-dom";
import { removeAuthUser, getAuthUser } from "../../../context/authCookie";

const Header = () => {
  const navigate = useNavigate();

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
            <img alt="" src={IconHamburger} />
          </div>
        </div>
        <div className="header-right">
          {/* <HiSearch className="text-white text-2xl cursor-pointer" /> */}

          <div className="dropdown dropdown-header">
            <div
              className="cursor-pointer"
              onClick={() => toggleDropdown("bookmark")}
            >
              <IoIosStar className="text-white text-2xl cursor-pointer" />
            </div>
            {openDropdown === "bookmark" && (
              <div className="dropdown-content bookmark-content">
                <div className="bookmark-head">Bookmark</div>
                <div className="bookmark-body">
                  <ul>
                    {bookmark.length > 0 &&
                      bookmark.map((item, index) => (
                        <li key={index}>
                          <Link to={item.bookmarkLink}>
                            <IoStar className="text-xs text-yellow" />
                            {item.bookmarkName}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="dropdown dropdown-header">
            <div
              className="relative cursor-pointer"
              onClick={() => toggleDropdown("notification")}
            >
              <FaBell className="text-white text-2xl cursor-pointer" />
              {notification.length > 0 && (
                <div className="notification-warning"></div>
              )}
            </div>
            {openDropdown === "notification" && (
              <div className="dropdown-content notification-content">
                <div className="notification-head">
                  Notification
                  <div className="notification-count">
                    {notification.length}
                  </div>
                </div>
                <div className="notification-body">
                  <ul>
                    {notification.length > 0 &&
                      notification.map((item, index) => (
                        <li key={index}>
                          <Link to={item.notificationLink}>
                            <div className="notification-photo">
                              <img alt="" src={item.notificationPhoto} />
                            </div>
                            <div>
                              <p className="font-bold">
                                {item.notificationUser}
                              </p>
                              <p>{item.notificationDescription}</p>
                              <small>{item.notificationDate}</small>
                            </div>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="dropdown dropdown-header">
            <div
              className="header-user cursor-pointer"
              onClick={() => toggleDropdown("userMenu")}
            >
              <div className="user-photo">
                <img alt="" src={user?.photo} />
              </div>
              <div className="user-info">
                <p className="text-white text-sm font-semibold mb-2">
                  {user?.username}
                </p>
                <p className="text-white text-xs mb-0">{user?.departmentname}</p>
              </div>
              <MdArrowDropDown className="text-white text-2xl" />
            </div>
            {openDropdown === "userMenu" && (
              <ul className="dropdown-content user-content">
                <li>
                  <Link to="">User Profile</Link>
                </li>
                <li className="no-bg">
                  <div className="menu-language">
                    Language
                    <div className="switch-language">
                      <button type="button" className="button button-language">
                        <img alt="EN" src={FlagEN} />
                      </button>
                      <button type="button" className="button button-language">
                        <img alt="TH" src={FlagTH} />
                      </button>
                    </div>
                  </div>
                </li>
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
