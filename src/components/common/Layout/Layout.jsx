import { useGlobalContext } from "../../../context/GlobalContext";
import Header from "./Header";
import Footer from "./Footer";
import clsx from "clsx";
import { Dashboard } from "../../../pages/private/Dashboard/Dashboard";

const Layout = () => {

  const { showLayoutBackdrop } = useGlobalContext();

  return (
    <>
      <Header />
      <div className="layout-container">
        <div className="main-container">
          <Dashboard />
          <Footer />
        </div>
      </div>
      <div className={clsx("layout-backdrop", { open: showLayoutBackdrop })}></div>
    </>
  )
}

export default Layout;