import { Link } from "react-router-dom";
import gif from "../../assets/jaconda-17.gif";

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <img src={gif} alt="" />
      <h3 className="text-5xl text-center font-semibold">
        sorry, page not found !!!
      </h3>
      <Link
        to={"/"}
        className="btn btn-sm h-10 px-5 rounded-md mt-10  bg-pink-600 hover:bg-pink-700 border-none text-white"
      >
        Go Home
      </Link>
    </div>
  );
};

export default ErrorPage;
