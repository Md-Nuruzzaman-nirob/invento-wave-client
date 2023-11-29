import bg from "../../assets/login-bg-light.png";
import logo from "../../assets/invento-wave-logo.png";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
} from "react-icons/ri";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import usePublicAPI from "../../hooks/usePublicAPI";
import toast from "react-hot-toast";
import SocialLoginPage from "./SocialLoginPage";
import Button from "../../components/shared/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const RegisterPage = () => {
  const [checked, setChecked] = useState(false);
  const [checkedError, setCheckedError] = useState(false);
  const [passShow, setPassShow] = useState(false);

  const axiosPublic = usePublicAPI();
  const { createUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await axiosPublic.post(
      image_hosting_api,
      { image: data.profileImage[0] },
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );

    const name = data.name;
    const image = res?.data?.data?.image?.url;
    const email = data.email;
    const password = data.password;

    if (!checked) {
      return setCheckedError("*accept terms and conditions");
    } else {
      setCheckedError("");
    }

    const toastId = toast.loading("Progress...");

    createUser(email, password)
      .then(() => {
        // update profile
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: image,
        })
          .then(() => {
            const userInfo = {
              name,
              email,
              image,
              role: "Logged-User",
            };
            axiosPublic.post("/api/user/create", userInfo).then((res) => {
              if (res.data.insertedId) {
                toast.success("Register Successful!!!", { id: toastId });
                navigate(location?.state ? location.state : "/");
              }
            });
          })
          .catch((error) => {
            toast.error(error.message.slice(10), { id: toastId });
          });
      })
      .catch((error) => {
        toast.error(error.message.slice(10), { id: toastId });
      });
  };
  return (
    <>
      <Helmet>
        <title>Register - Invento Wave</title>
      </Helmet>
      <div
        style={{
          backgroundImage: `url(${bg})`,
        }}
        className="bg-cover bg-no-repeat bg-center min-h-screen px-5 font-Fira pb-10"
      >
        <div className="max-w-md mx-auto flex items-center justify-between pt-10 mb-10">
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
            <h2 className="text-center mt-5 sm:mt-8 text-lg font-bold opacity-90 uppercase">
              Register
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="px-5 sm:px-8 pb-5 pt-2"
            >
              <div className="form-control">
                <label>
                  <span className="font-medium opacity-70">Name</span>
                </label>
                <input
                  {...register("name", {
                    required: true,
                    minLength: 4,
                    maxLength: 20,
                  })}
                  type="text"
                  placeholder="Enter your name..."
                  className="w-full mt-2 px-4 py-2 border border-gray-800/10 outline-none focus:border-pink-600 rounded-md text-sm"
                />
                {errors.name?.type === "required" && (
                  <span className="text-red-600">*name is required.</span>
                )}
                {errors.name?.type === "minLength" && (
                  <span className="text-red-600">
                    *name must be at least 4 characters long.
                  </span>
                )}
                {errors.name?.type === "maxLength" && (
                  <span className="text-red-600">
                    *name cannot exceed 20 characters.
                  </span>
                )}
              </div>
              <div className="form-control mt-2">
                <label>
                  <span className="font-medium opacity-70">Email</span>
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
                <div className="form-control mt-2">
                  <label>
                    <span className="font-medium opacity-70">Password</span>
                  </label>
                  <input
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 36,
                      pattern:
                        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,20}$/,
                    })}
                    type={passShow ? "text" : "password"}
                    placeholder="Enter your password..."
                    className="w-full mt-2 px-4 py-2 border border-gray-800/10 outline-none focus:border-pink-600 rounded-md text-sm"
                  />
                  {errors.password?.type === "required" && (
                    <span className="text-red-600">*password is required.</span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="text-red-600">
                      *password must be at least 6 characters long.
                    </span>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <span className="text-red-600">
                      *password cannot exceed 36 characters.
                    </span>
                  )}
                  {errors.password?.type === "pattern" && (
                    <span className="text-red-600">
                      *password must have one uppercase, one lowercase, and one
                      special character.
                    </span>
                  )}
                </div>
                <p
                  onClick={() => setPassShow(!passShow)}
                  className="absolute right-3 top-[41px]"
                >
                  {passShow ? (
                    <FaEye className="w-5 h-5" />
                  ) : (
                    <FaEyeSlash className="w-5 h-5" />
                  )}
                </p>
              </div>
              <div className="mt-2">
                <label>
                  <span className="font-medium opacity-70">Profile image</span>
                </label>
                <input
                  {...register("profileImage", { required: true })}
                  type="file"
                  className="mt-2"
                />
              </div>
              {errors.profileImage?.type === "required" && (
                <span className="text-red-600">
                  *profile image is required.
                </span>
              )}
              {errors.image?.type === "required" && (
                <span className="text-red-600">*image file is required.</span>
              )}
              <div className="mt-2 sm:mt-3 flex items-center gap-2">
                <p onClick={() => setChecked(!checked)}>
                  {checked ? (
                    <RiCheckboxCircleFill className="w-6 h-6 text-pink-600" />
                  ) : (
                    <RiCheckboxBlankCircleLine className="w-6 h-6 text-pink-600" />
                  )}
                </p>
                <p
                  className={`text-sm opacity-60 font-medium ${
                    checked ? " opacity-100" : ""
                  }`}
                >
                  I accept Terms and Conditions
                </p>
              </div>
              {checkedError && (
                <span className="text-red-600">{checkedError}</span>
              )}
              <div
                className="form-control mt-4"
                data-aos="flip-up"
                data-aos-duration="500"
              >
                <button className="btn bg-pink-600 hover:bg-pink-700 text-lg text-white rounded-md font-normal">
                  Register
                </button>
              </div>
            </form>
          </div>
          <div className="w-full max-w-md mx-auto text-center mt-6 text-black text-sm">
            <h3>
              Already have account?
              <Link
                to={"/login"}
                className="ml-2 text-black hover:underline font-medium underline-offset-4"
              >
                Login
              </Link>
            </h3>
            <SocialLoginPage />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
