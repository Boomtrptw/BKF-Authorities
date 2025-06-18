import { useGlobalContext } from "../../../context/GlobalContext";
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import clsx from "clsx";
import { Dashboard } from "../../../pages/private/Dashboard/Dashboard";

const Layout = () => {
  const { showLayoutBackdrop } = useGlobalContext();
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <Header setSearchText={setSearchText} />
      <div className="layout-container">
        <div className="main-container">
          <Dashboard searchText={searchText} />
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
