import { RotatingLines } from "react-loader-spinner";
import useAuth from "../hooks/useAuth";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loader } = useAuth();
  const location = useLocation();

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

  if (!user?.email) {
    return <Navigate to={"/login"} state={location.pathname}></Navigate>;
  }
  return children;
};
PrivateRoute.propTypes = {
  children: PropTypes.node,
};
export default PrivateRoute;
