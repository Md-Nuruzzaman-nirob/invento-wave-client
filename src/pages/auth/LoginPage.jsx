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

const LoginPage = () => {
  const [checked, setChecked] = useState(false);

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
        className="bg-cover bg-no-repeat bg-center min-h-screen px-5"
      >
        <div className="max-w-md mx-auto flex items-center justify-between pt-16 mb-20">
          <div className="flex items-center gap-3">
            <img className="w-8 h-8" src={logo} alt="" />
            <h2 className="text-xl md:text-2xl  text-sky-500">
              Invento <span className="text-pink-600">Wave</span>
            </h2>
          </div>
          <button
            onClick={() => navigate("/")}
            className="btn btn-sm rounded-md bg-pink-600 hover:bg-pink-700 border-none text-white font-medium ml-20 px-10"
            data-aos="flip-up"
            data-aos-duration="500"
          >
            Home
          </button>
        </div>

        {/* form part */}
        <div className="flex flex-col justify-center items-center">
          {" "}
          <div className="w-full max-w-md shadow-2xl bg-base-100 rounded-md">
            <h2 className="text-center mt-8 text-lg font-bold opacity-90 uppercase">
              Login
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="px-8 pb-8 pt-2">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-Karla font-semibold text-base opacity-60">
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
                  className="w-full mt-2 px-4 py-2 border border-gray-800/30 outline-none focus:border-sky-500   font-Karla opacity-80 rounded-md"
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
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-Karla font-semibold text-base opacity-60">
                    Password
                  </span>
                </label>
                <input
                  {...register("password", {
                    required: true,
                  })}
                  type="password"
                  placeholder="Enter your password..."
                  className="w-full mt-2 px-4 py-2 border border-gray-800/30 outline-none focus:border-sky-500   font-Karla opacity-80 rounded-md"
                />
                {errors.password?.type === "required" && (
                  <span className="text-red-600">*password is required.</span>
                )}
              </div>
              <div className="my-6 flex items-center gap-2">
                <p onClick={() => setChecked(!checked)}>
                  {checked ? (
                    <RiCheckboxCircleFill className="w-6 h-6 text-sky-500" />
                  ) : (
                    <RiCheckboxBlankCircleLine className="w-6 h-6 text-sky-500" />
                  )}
                </p>
                <p
                  className={`text-sm opacity-60 font-semibold ${
                    checked ? " opacity-80" : ""
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
                <button className="btn bg-sky-500 hover:bg-sky-600 text-lg text-white rounded-md">
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="w-full max-w-md mx-auto text-center mt-10">
            <p className="flex items-center gap-2 justify-center opacity-70 font-semibold hover:underline underline-offset-4 text-pink-600">
              <CiLock className="w-5 h-5" />
              Forget Password?
            </p>
            <h3 className="mt-3 text-black/70">
              Don&apos;t have an account?{" "}
              <Link
                to={"/register"}
                className="ml-1 hover:underline font-semibold underline-offset-4 text-black/80"
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
