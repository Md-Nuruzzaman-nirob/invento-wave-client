import { Helmet } from "react-helmet-async";
import DashboardNavbar from "../components/common/DashboardNavbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Footer from "../components/common/Footer";

const DashboardLayout = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <>
      <Helmet>
        <title>Dashboard - Invento Wave</title>
      </Helmet>
      <div className="flex min-h-screen relative font-Fira">
        <div className="lg:hidden z-40">
          <label className="btn btn-square swap swap-rotate rounded-md fixed bottom-10 right-10 border-none bg-pink-600 hover:bg-pink-700 text-white">
            <input onClick={() => setToggleMenu(!toggleMenu)} type="checkbox" />

            <svg
              className="swap-off fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>
            <svg
              className="swap-on fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
            </svg>
          </label>
        </div>
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
      <Footer />
    </>
  );
};

export default DashboardLayout;
