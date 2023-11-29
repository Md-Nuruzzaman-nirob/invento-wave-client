import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import useAuth from "../hooks/useAuth";
import useFetchSecure from "../hooks/useFetchSecure";
import { HashLoader } from "react-spinners";

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
        <HashLoader color="#0ea5e9" />
      </p>
    );
  }
  return (
    <div className="font-Fira overflow-hidden">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
