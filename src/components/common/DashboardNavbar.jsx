import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/invento-wave-logo.png";
import useAuth from "../../hooks/useAuth";
import { TiHome } from "react-icons/ti";
import { IoIosLogOut } from "react-icons/io";
import { FaUser } from "react-icons/fa";

const DashboardNavbar = () => {
  const { user, logout } = useAuth();
  const admin = false;

  const userNavLink = admin ? (
    <>
      <NavLink
        to="/dashboard/manage-shop"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "text-pink-600 underline underline-offset-8"
            : "opacity-80 font-medium hover:text-pink-600"
        }
      >
        Manage Shop
      </NavLink>
      <NavLink
        to="/dashboard/manage-user"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "text-pink-600 underline underline-offset-8"
            : "opacity-80 font-medium hover:text-pink-600"
        }
      >
        Manage User
      </NavLink>
      <NavLink
        to="/dashboard/admin-sale-summery"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "text-pink-600 underline underline-offset-8"
            : "opacity-80 font-medium hover:text-pink-600"
        }
      >
        Sale-Summary
      </NavLink>
    </>
  ) : (
    <>
      <NavLink
        to="/dashboard/manage-product"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "text-pink-600 underline underline-offset-8"
            : "opacity-80 font-medium hover:text-pink-600"
        }
      >
        Manage Product
      </NavLink>
      <NavLink
        to="/dashboard/sales-Collection"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "text-pink-600 underline underline-offset-8"
            : "opacity-80 font-medium hover:text-pink-600"
        }
      >
        Sales Collection
      </NavLink>
      <NavLink
        to="/dashboard/shop-sale-summery"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "text-pink-600 underline underline-offset-8"
            : "opacity-80 font-medium hover:text-pink-600"
        }
      >
        Sales Summary
      </NavLink>
      <NavLink
        to="/dashboard/subscription"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "text-pink-600 underline underline-offset-8"
            : "opacity-80 font-medium hover:text-pink-600"
        }
      >
        Subscription & Payment
      </NavLink>
    </>
  );

  return (
    <div className="flex flex-col justify-between gap-10 px-10">
      <div className="flex flex-col justify-center items-center  mt-10">
        <Link to={"/"} className="flex justify-center items-center gap-3">
          <img className="w-7 h-7" src={logo} alt="" />
          <h2 className="text-base xl:text-lg uppercase font-semibold text-sky-500">
            Invento <span className="text-pink-600">Wave</span>
          </h2>
        </Link>
        {user?.photoURL ? (
          <img
            className="w-20 h-20 rounded-full mt-3"
            src={user?.photoURL}
            alt=""
          />
        ) : (
          <p className="w-20 h-20  overflow-hidden rounded-full mt-3">
            <FaUser className="w-full h-full text-sky-500" />
          </p>
        )}
        <h3 className="font-semibold opacity-80 mt-3">{user?.displayName}</h3>
        <h3 className="text-sm font-medium opacity-80">{user?.email}</h3>
        <div className="flex mt-3">
          <Link to={"/"} className="btn btn-sm font-medium text-xs">
            <TiHome className="w-4 h-4" />
          </Link>
          <div className="divider divider-horizontal w-[1px]"></div>
          <button
            onClick={() => logout()}
            className="btn btn-sm font-medium text-xs"
          >
            <IoIosLogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
      <hr />
      <div>
        <ul className="flex flex-col gap-5 xl:text-lg">{userNavLink}</ul>
      </div>
    </div>
  );
};

export default DashboardNavbar;
