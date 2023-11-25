import { Helmet } from "react-helmet-async";
import DashboardNavbar from "../components/common/DashboardNavbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const DashboardLayout = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <>
      <Helmet>
        <title>Dashboard - Invento Wave</title>
      </Helmet>
      <div className="flex min-h-screen relative">
        <button
          onClick={() => setToggleMenu(!toggleMenu)}
          className="lg:hidden fixed bottom-10 right-10 btn btn-circle btn-lg z-50"
        >
          click
        </button>
        <div
          className={`lg:hidden fixed top-0 left-0 h-screen w-2/3 sm:w-2/5   bg-white transition-transform transform ${
            toggleMenu ? "translate-x-0" : "-translate-x-full"
          } duration-500 ease-in-out z-50`}
        >
          <DashboardNavbar />
        </div>
        <div className="hidden lg:block lg:flex-[2] xl:flex-[1] bg-w">
          <DashboardNavbar />
        </div>
        <div className="w-full lg:flex-[6] xl:flex-[4] bg-[#dee2e6] px-5 xl:px-10 pt-10">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
