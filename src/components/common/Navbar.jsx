import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/invento-wave-logo.png";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleProfile, setToggleProfile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScrolled = () => {
      if (window.scrollY > 150) {
        setScrolled(true);
        setToggleProfile(false);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScrolled);
    return () => {
      window.removeEventListener("scroll", handleScrolled);
    };
  }, []);

  const { user, logout } = useAuth();

  const navLink = (
    <>
      <NavLink
        to="/"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "text-pink-600 underline underline-offset-8"
            : "text-sky-400 hover:text-pink-600"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/watch-demo"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "text-pink-600 underline underline-offset-8"
            : "text-sky-400 hover:text-pink-600"
        }
      >
        Watch Demo
      </NavLink>
      <NavLink
        to="/create-store"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "text-pink-600 underline underline-offset-8"
            : "text-sky-400 hover:text-pink-600"
        }
      >
        Create Store
      </NavLink>
      <NavLink
        to="/dashboard"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "text-pink-600 underline underline-offset-8"
            : "text-sky-400 hover:text-pink-600"
        }
      >
        Dashboard
      </NavLink>
    </>
  );

  return (
    <nav
      className={`fixed z-50 w-full text-white ${
        scrolled
          ? "bg-white py-4 transition-all duration-700 ease-in-out"
          : "bg-transparent py-6 transition-all duration-700 ease-in-out"
      }`}
    >
      <div className="max-w-7xl mx-5 md:mx-10 xl:mx-auto flex justify-between items-center">
        {/* logo + name */}
        <div className="flex items-center gap-3">
          <img className="w-8 h-8" src={logo} alt="" />
          <h2 className="text-xl md:text-2xl font-semibold text-sky-400">
            Invento <span className="text-pink-600">Wave</span>
          </h2>
        </div>

        {/* navLink */}
        <div className="hidden lg:flex items-center gap-8 text-lg font-bold">
          {navLink}
        </div>

        {/* auth */}
        <div className="hidden lg:flex items-center gap-8">
          {user?.email ? (
            <div className="relative">
              {user?.photoURL ? (
                <button
                  onClick={() => setToggleProfile(!toggleProfile)}
                  className="btn btn-circle overflow-hidden border-2 border-none hover:border-none bg-transparent"
                >
                  <img className="w-full h-full" src={user.photoURL} alt="" />
                </button>
              ) : (
                <button
                  onClick={() => setToggleProfile(!toggleProfile)}
                  className={`btn btn-circle border-2 ${
                    toggleProfile
                      ? "bg-white border-transparent hover:bg-white hover:border-transparent"
                      : "border-sky-400 bg-transparent hover:border-sky-500 hover:bg-transparent"
                  }`}
                >
                  <FaUser className="w-6 h-6 text-sky-400" />
                </button>
              )}
              {toggleProfile && (
                <div className="w-52 absolute top-16 right-0 bg-white text-black rounded-md p-3 space-y-3">
                  <h2 className="btn btn-sm w-full text-base justify-start rounded-md">
                    {user?.displayName}
                  </h2>
                  <h2 className="btn btn-sm w-full text-base justify-start rounded-md">
                    {user?.email}
                  </h2>
                  <button
                    onClick={() => logout()}
                    className="btn btn-sm w-full text-base rounded-md"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {" "}
              <Link
                to={"/login"}
                className="text-lg text-sky-400 font-bold border border-transparent hover:border hover:border-sky-400 px-3 rounded-md"
              >
                Login
              </Link>
              <Link
                to={"/register"}
                className="btn btn-sm rounded-md bg-pink-600 border-none text-white hover:bg-pink-700"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <div className="lg:hidden">
          <label
            className={`btn btn-square swap swap-rotate  bg-transparent hover:bg-transparent  rounded-md  ${
              scrolled
                ? "border-[#35b8e0] text-[#35b8e0] transition-colors duration-700 ease-in-out"
                : "text-white transition-colors duration-700 ease-in-out"
            }`}
          >
            {/* this hidden checkbox controls the state */}
            <input onClick={() => setToggleMenu(!toggleMenu)} type="checkbox" />

            {/* hamburger icon */}
            <svg
              className="swap-off fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>

            {/* close icon */}
            <svg
              className="swap-on fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
            </svg>
          </label>
        </div>
      </div>

      {toggleMenu && (
        <div className="flex flex-col gap-6 mx-5 md:mx-10 pt-5 pb-10 text-xl text-blue-500">
          {navLink}
          {user?.email ? (
            <></>
          ) : (
            <>
              {" "}
              <Link to={"/login"} className="btn btn-sm rounded-md">
                Login
              </Link>
              <Link to={"/register"} className="btn btn-sm rounded-md">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
