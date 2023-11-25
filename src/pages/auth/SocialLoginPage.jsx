import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import usePublicAPI from "../../hooks/usePublicAPI";

const SocialLoginPage = () => {
  const { googleLogin, githubLogin } = useAuth();
  const axiosPublic = usePublicAPI();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSocialLogin = async (login, social) => {
    const toastId = toast.loading("Progress...");
    try {
      const res = await login();

      const userInfo = {
        name: res?.user?.displayName,
        email: res?.user?.email,
        image: res?.user?.photoURL,
        role: "user",
      };
      axiosPublic
        .post(`/api/user/create/${res?.user?.email}`, userInfo)
        .then((res) => {
          if (res.data.insertedId) {
            toast.success(`${social} login Successful!!!`, { id: toastId });
            navigate(location?.state ? location.state : "/");
          } else if (res.data.message) {
            toast.success(`${social} login Successful!!!`, { id: toastId });
            navigate(location?.state ? location.state : "/");
          }
        });
    } catch (error) {
      toast.error(error.message.slice(10), { id: toastId });
    }
  };
  return (
    <>
      <div className="divider font-semibold text-xs lg:text-sm text-white/80">
        Or Login With
      </div>
      <div className="w-full flex items-center gap-4">
        <button
          onClick={() => handleSocialLogin(googleLogin, "Google")}
          className="flex-1 btn btn-md border-transparent bg-white font-bold font-Montserrat rounded-md"
        >
          <FcGoogle></FcGoogle> Google
        </button>
        <button
          onClick={() => handleSocialLogin(githubLogin, "Github")}
          className="flex-1 btn btn-md border-transparent bg-white font-bold font-Montserrat rounded-md"
        >
          <FaGithub /> Github
        </button>
      </div>
    </>
  );
};

export default SocialLoginPage;
