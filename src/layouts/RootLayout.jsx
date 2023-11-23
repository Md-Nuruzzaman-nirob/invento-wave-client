import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

const RootLayout = () => {
  return (
    <div className="">
      <Navbar />
      <Outlet />
      <div className="h-screen"></div>
    </div>
  );
};

export default RootLayout;
