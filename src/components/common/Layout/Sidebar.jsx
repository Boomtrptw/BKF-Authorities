// import { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { useGlobalContext } from "../../../context/GlobalContext";
// import { menuItems } from "../../../data/menu";
// import { IoMdHome, IoMdArrowDropdown, IoIosClose } from "react-icons/io";
// import { BsDot } from "react-icons/bs";
// import clsx from "clsx";

// const Sidebar = () => {

//   const location = useLocation();
//   const currentPath = location.pathname;

//   const { showSidebarMenu, setShowLayoutBackdrop } = useGlobalContext();

//   const [selectMenu, setSelectMenu] = useState(null);
//   const [activeMenuKey, setActiveMenuKey] = useState(null);
//   const [activeSubIndex, setActiveSubIndex] = useState(null);
//   const [openSelectMenu, setOpenSelectMenu] = useState(false);
//   const [closeSelectMenu, setCloseSelectMenu] = useState(false);

//   useEffect(() => {
//     if (currentPath === "/dashboard") {
//       setActiveMenuKey("DASHBOARD");
//       return;
//     }
//     const matched = menuItems.find((menu) =>
//       menu.subMenu.some(sub =>
//         sub.subMenu.some(child => child.link && currentPath.startsWith(child.link))
//       )
//     );
//     if (matched) {
//       setActiveMenuKey(matched.code);
//     }
//   }, [currentPath]);

//   useEffect(() => {
//     if (selectMenu) {
//       const timer = setTimeout(() => setOpenSelectMenu(true), 100);
//       return () => clearTimeout(timer);
//     }
//   }, [selectMenu]);

//   const handleCloseMenu = () => {
//     setOpenSelectMenu(false);
//     setCloseSelectMenu(true);
//     setShowLayoutBackdrop(false);
//     setTimeout(() => {
//       setSelectMenu(null);
//       setCloseSelectMenu(false);
//     }, 300);
//   };

//   const handleCodeClick = (code) => {
//     const matchedMenu = menuItems.find((menu) => menu.code === code);
//     if (matchedMenu) {
//       setSelectMenu(matchedMenu);
//       setActiveSubIndex(null); 
//       setShowLayoutBackdrop(true);
//     }
//   };

//   const handleSubMenuClick = (idx) => {
//     setActiveSubIndex(activeSubIndex === idx ? null : idx);
//   };

//   return (
//     <>
//       <div className={clsx("sidebar sidebar-toggle", { "mobile-toggle": showSidebarMenu })}>
//         <div className="sidebar-menu">
//           <ul className="nav-menu">
//           <li className={clsx("nav-menu-item menu-main", { active: currentPath === "/dashboard" })}>
//               <div className="menu-name">MAIN MENU</div>
//               <Link to="/dashboard">
//                 <div className="menu-icon">  
//                   <IoMdHome />  
//                 </div>
//               </Link>
//             </li>
//             { menuItems.map((item,index) => (
//               <li 
//                 key={index} 
//                 className={clsx("nav-menu-item", { active: activeMenuKey === item.code })}
//                 onClick={() => handleCodeClick(item.code)}
//               >
//                 <div className="menu-label">
//                   <div className="menu-item">
//                     <div className="menu-icon">
//                       <img alt="" src={item.icon} className="icon-default" />
//                       <img alt="" src={item.iconActive} className="icon-active" />
//                     </div>
//                     <div className="menu-code">{item.code}</div>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       { (selectMenu || closeSelectMenu) && (
//         <div className={clsx("sidebar sidebar-active", { open: openSelectMenu })}>
//           <div className="sidebar-menu">
//             <div className="menu-module">
//               <div className="module-name">
//                 <img alt="" src={selectMenu.icon} />
//                 <div className="menu-name">{selectMenu.name}</div>
//               </div>
//               <IoIosClose onClick={handleCloseMenu} />
//             </div>
//             <ul className="nav-menu">
//               {selectMenu.subMenu.map((subItem, subIndex) => (
//                 <li
//                   key={`${selectMenu.key}-sub-${subIndex}`}
//                   className={clsx("nav-menu-item", { active: activeSubIndex === subIndex })}
//                 >
//                   {subItem.subMenu.length > 0 ? (
//                     <>
//                       <div className="menu-label" onClick={() => handleSubMenuClick(subIndex)}>
//                         <div className="menu-item">
//                           <BsDot className="text-base" />
//                           <div className="menu-name">{subItem.name}</div>
//                         </div>
//                         <IoMdArrowDropdown
//                           className="arrow-menu"
//                           style={{
//                             transform: activeSubIndex === subIndex ? "rotate(180deg)" : "rotate(0deg)",
//                             transition: "transform 0.3s ease",
//                           }}
//                         />
//                       </div>
//                       {activeSubIndex === subIndex && (
//                         <ul className="submenu">
//                           {subItem.subMenu.map((childItem, childIndex) => (
//                             <li key={childIndex}>
//                               <div className="submenu-label">
//                                 <Link to={childItem.link} onClick={handleCloseMenu}>
//                                   <BsDot className="text-base" />
//                                   <div className="submenu-name">{childItem.name}</div>
//                                 </Link>
//                               </div>
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </>
//                   ) : (
//                     <div className="menu-label">
//                       <Link to={subItem.link} onClick={handleCloseMenu}>
//                         <div className="menu-item">
//                           <BsDot className="text-base" />
//                           <div className="menu-name">{subItem.name}</div>
//                         </div>
//                       </Link>
//                     </div>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </>
//   )
  
// }

// export default Sidebar;