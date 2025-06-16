// import { useLocation } from "react-router-dom";
// import { menuItems } from "../../../data/menu";
// import clsx from "clsx";

// const cleanLabel = (name) => name?.replace(/^\[[^\]]+\]\s*/, "") || "";

// const findBreadcrumbs = (menus, pathname, trail = []) => {
//   for (const menu of menus) {
//     if (menu.link && menu.link === pathname) {
//       return [...trail, { label: cleanLabel(menu.name), path: menu.link }];
//     }
//     if (menu.link && menu.link !== "/" && pathname.startsWith(menu.link)) {
//       return [...trail, { label: cleanLabel(menu.name), path: menu.link }];
//     }
//     if (menu.subMenu && menu.subMenu.length > 0) {
//       const newTrail = menu.name
//         ? [...trail, { label: cleanLabel(menu.name), path: menu.link || "" }]
//         : trail;
//       const result = findBreadcrumbs(menu.subMenu, pathname, newTrail);
//       if (result) return result;
//     }
//   }
//   return null;
// };

// const Breadcrumb = () => {
//   const location = useLocation();
//   const pathname = location.pathname;

//   if (pathname === "/dashboard") {
//     return (
//       <div className="breadcrumb">
//         <span className="active">Dashboard</span>
//       </div>
//     );
//   }

//   const crumbs = findBreadcrumbs(menuItems, pathname);

//   if (!crumbs) return null;

//   const fullBreadcrumb = [
//     { label: "Dashboard", path: "/dashboard" },
//     ...crumbs.filter(c => c.path !== "/dashboard"),
//   ];

//   return (
//     <div className="breadcrumb">
//       {fullBreadcrumb.map((crumb, index) => {
//         const isLast = index === fullBreadcrumb.length - 1;
//         return (
//           <span key={index}>
//             {index > 0 && <span className="mx-4">/</span>}
//             <span className={clsx({ active: isLast })}>{crumb.label}</span>
//           </span>
//         );
//       })}
//     </div>
//   );
// };

// export default Breadcrumb;