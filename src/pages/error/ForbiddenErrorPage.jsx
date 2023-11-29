import { Link } from "react-router-dom";
import image from "../../assets/403 Error Forbidden-amico.svg";

const ForbiddenErrorPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <img className="w-[500px]" src={image} alt="" />
      <h3 className="text-3xl text-center">Forbidden Access</h3>
      <Link
        to={"/"}
        className="btn rounded-md mt-10  bg-pink-600 hover:bg-pink-700 border-none text-white"
      >
        Go Home
      </Link>
    </div>
  );
};

export default ForbiddenErrorPage;
