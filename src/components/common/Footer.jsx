import logo from "../../assets/invento-wave-logo.png";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="h-[250px] flex items-center justify-center bg-[#323a46] text-white font-Fira">
      <div className="">
        {/* logo part */}
        <Link to={"/"} className="flex items-center justify-center gap-2">
          <img className="w-7 h-7" src={logo} alt="" />
          <h2 className="text-xl font-medium text-pink-600">Invento Wave</h2>
        </Link>

        {/* menu part*/}
        <div className="flex items-center justify-center gap-5 my-5">
          <FaFacebook className="p-2 w-9 h-9 border-2 rounded-full opacity-60 hover:opacity-100 transition duration-300" />
          <FaXTwitter className="p-2 w-9 h-9 border-2 rounded-full opacity-60 hover:opacity-100 transition duration-300" />
          <FaInstagram className="p-2 w-9 h-9 border-2 rounded-full opacity-60 hover:opacity-100 transition duration-300" />
          <FaGoogle className="p-2 w-9 h-9 border-2 rounded-full opacity-60 hover:opacity-100 transition duration-300" />
          <FaGooglePlay className="p-2 w-9 h-9 border-2 rounded-full opacity-60 hover:opacity-100 transition duration-300" />
        </div>
        <div className="text-center text-sm opacity-60">
          <p>Copyright © 2023 - All right reserved by Invento Wave</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
