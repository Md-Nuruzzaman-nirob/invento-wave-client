import { Link } from "react-router-dom";
import gif from "../../assets/jaconda-17.gif";

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <img src={gif} alt="" />
      <h3 className="text-3xl text-center">page not found</h3>
      <Link to={"/"} className="btn rounded-md mt-10">
        Go Home
      </Link>
    </div>
  );
};

export default ErrorPage;
