import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { RotatingLines } from "react-loader-spinner";
import useAuth from "../hooks/useAuth";
import useFetchSecure from "../hooks/useFetchSecure";

const RootLayout = () => {
  const { loader, user } = useAuth();
  const { refetch, isLoading } = useFetchSecure(
    `api/user/${user?.email}`,
    user?.email
  );
  refetch();

  if (loader || isLoading) {
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
    <div className="font-Karla overflow-hidden">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
