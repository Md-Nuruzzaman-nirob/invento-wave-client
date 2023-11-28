import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PropTypes from "prop-types";
import { RotatingLines } from "react-loader-spinner";
import useFetchSecure from "../hooks/useFetchSecure";

const AdminRoute = ({ children }) => {
  const { user, loader } = useAuth();
  const { data, refetch, isLoading, isPending } = useFetchSecure(
    `api/user/${user?.email}`,
    user?.email
  );
  refetch();

  if (loader || isLoading || isPending) {
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

  if (data.role !== "System-Admin") {
    return <Navigate to={"/error/unauthorized"} />;
  }
  if (!user?.email) {
    return <Navigate to={"/login"}></Navigate>;
  }

  return children;
};

AdminRoute.propTypes = {
  children: PropTypes.node,
};

export default AdminRoute;
