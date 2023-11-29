import bg from "../../assets/login-bg-light.png";
import logo from "../../assets/invento-wave-logo.png";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
} from "react-icons/ri";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiLock } from "react-icons/ci";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import SocialLoginPage from "./SocialLoginPage";
import Button from "../../components/shared/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const [checked, setChecked] = useState(false);
  const [passShow, setPassShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;

    const toastId = toast.loading("Progress...");
    loginUser(email, password)
      .then(() => {
        toast.success("Register Successful!!!", { id: toastId });
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        toast.error(error.message.slice(10), { id: toastId });
      });
  };

  return (
    <>
      <Helmet>
        <title>Login - Invento Wave</title>
      </Helmet>
      <div
        style={{
          backgroundImage: `url(${bg})`,
        }}
        className="bg-cover bg-no-repeat bg-center min-h-screen px-5 font-Fira"
      >
        <div className="max-w-md mx-auto flex items-center justify-between pt-16 mb-20">
          <Link to={"/"} className="flex items-center gap-3">
            <img className="w-10 h-10" src={logo} alt="" />
            <h2 className="text-2xl font-semibold text-pink-600">
              Invento Wave
            </h2>
          </Link>
          <Button onClick={() => navigate("/")} className={"px-10"}>
            Home
          </Button>
        </div>

        {/* form part */}
        <div className="flex flex-col justify-center items-center">
          {" "}
          <div className="w-full max-w-md shadow-2xl bg-base-100 rounded-md">
            <h2 className="text-center mt-8 text-xl font-bold opacity-90 uppercase">
              Login
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="px-8 pb-8 pt-2">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium opacity-70">
                    Email
                  </span>
                </label>
                <input
                  {...register("email", {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  })}
                  type="email"
                  placeholder="Enter your email..."
                  className="w-full mt-2 px-4 py-2 border border-gray-800/10 outline-none focus:border-pink-600 rounded-md text-sm"
                />
                {errors.email?.type === "required" && (
                  <span className="text-red-600">*email is required.</span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="text-red-600">
                    *enter a valid email address.
                  </span>
                )}
              </div>
              <div className="relative">
                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text font-medium opacity-70">
                      Password
                    </span>
                  </label>
                  <input
                    {...register("password", {
                      required: true,
                    })}
                    type={passShow ? "text" : "password"}
                    placeholder="Enter your password..."
                    className="w-full mt-2 px-4 py-2 border border-gray-800/10 outline-none focus:border-pink-600 rounded-md text-sm"
                  />
                  {errors.password?.type === "required" && (
                    <span className="text-red-600">*password is required.</span>
                  )}
                </div>
                <p
                  onClick={() => setPassShow(!passShow)}
                  className="absolute right-3 top-[53px]"
                >
                  {passShow ? (
                    <FaEye className="w-5 h-5" />
                  ) : (
                    <FaEyeSlash className="w-5 h-5" />
                  )}
                </p>
              </div>
              <div className="my-6 flex items-center gap-2">
                <p onClick={() => setChecked(!checked)}>
                  {checked ? (
                    <RiCheckboxCircleFill className="w-6 h-6 text-pink-600" />
                  ) : (
                    <RiCheckboxBlankCircleLine className="w-6 h-6 text-pink-600" />
                  )}
                </p>
                <p
                  className={`text-sm opacity-60 ${
                    checked ? " opacity-100" : ""
                  }`}
                >
                  Remember Me
                </p>
              </div>
              <div
                className="form-control"
                data-aos="flip-up"
                data-aos-duration="500"
              >
                <button className="btn bg-pink-600 hover:bg-pink-700 text-lg text-white rounded-md font-normal">
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="w-full max-w-md mx-auto text-center mt-8">
            <p className="flex items-center gap-2 justify-center hover:underline underline-offset-4 text-pink-600/90 text-sm">
              <CiLock className="w-5 h-5" />
              Forget Password?
            </p>
            <h3 className="mt-3 text-black text-sm">
              Don&apos;t have an account?{" "}
              <Link
                to={"/register"}
                className="ml-2 text-black hover:underline font-medium underline-offset-4"
              >
                Register
              </Link>
            </h3>
            <SocialLoginPage />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
