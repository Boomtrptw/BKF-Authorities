import { useGlobalContext } from "../../../context/GlobalContext";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import clsx from "clsx";

const Layout = () => {
  const { showLayoutBackdrop } = useGlobalContext();
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <Header setSearchText={setSearchText} />
      <div className="layout-container">
        <div className="main-container">
          <Outlet context={{ searchText }} />
          <Footer />
        </div>
      </div>
      <div
        className={clsx("layout-backdrop", { open: showLayoutBackdrop })}
      ></div>
    </>
  );
};

export default Layout;
