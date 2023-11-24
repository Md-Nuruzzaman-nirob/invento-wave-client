import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const SocialLoginPage = () => {
  const { googleLogin, githubLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSocialLogin = async (login) => {
    try {
      await login();
      toast.success("Register Successful!");
      navigate(location?.state ? location.state : "/");
    } catch (error) {
      toast.error(error.message.slice(10));
    }
  };
  return (
    <>
      <div className="divider font-semibold text-xs lg:text-sm text-white/80">
        Or Login With
      </div>
      <div className="w-full flex items-center gap-4">
        <button
          onClick={() => handleSocialLogin(googleLogin)}
          className="flex-1 btn btn-sm md:btn-md border-transparent bg-white font-bold font-Montserrat rounded-md"
        >
          <FcGoogle></FcGoogle> Google
        </button>
        <button
          onClick={() => handleSocialLogin(githubLogin)}
          className="flex-1 btn btn-sm md:btn-md border-transparent bg-white font-bold font-Montserrat rounded-md"
        >
          <FaGithub /> Github
        </button>
      </div>
    </>
  );
};

export default SocialLoginPage;
