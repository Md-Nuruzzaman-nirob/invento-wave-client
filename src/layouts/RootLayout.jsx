import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const RootLayout = () => {
  return (
    <div className="font-Karla">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
