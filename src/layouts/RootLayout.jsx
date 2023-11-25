import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { RotatingLines } from "react-loader-spinner";
import useAuth from "../hooks/useAuth";

const RootLayout = () => {
  const { loader } = useAuth();

  if (loader) {
    return (
      <p className="h-screen flex items-center justify-center">
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
          color="#BB8506"
        />
      </p>
    );
  }
  return (
    <div className="font-Karla">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
