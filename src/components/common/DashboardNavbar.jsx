import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/invento-wave-logo.png";
import useAuth from "../../hooks/useAuth";
import { TiHome } from "react-icons/ti";
import { IoIosLogOut } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import useFetchSecure from "../../hooks/useFetchSecure";
import { BsCollectionFill } from "react-icons/bs";
import { GiProfit } from "react-icons/gi";
import { MdPayment } from "react-icons/md";
import { MdManageHistory } from "react-icons/md";

const DashboardNavbar = () => {
  const { user, logout } = useAuth();

  const { data, refetch, isLoading, isPending } = useFetchSecure(
    `api/user/${user?.email}`,
    user?.email
  );
  refetch();

  if (isLoading || isPending) {
    return;
  }

  const userNavLink =
    data?.role === "System-Admin" ? (
      <>
        <NavLink
          to="/dashboard/manage-shop"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "text-pink-600 underline underline-offset-8 btn border-none"
              : "text-sky-400 opacity-80 hover:text-pink-600 btn border-none"
          }
        >
          <MdManageHistory /> Manage Shop
        </NavLink>
        <NavLink
          to="/dashboard/admin-sale-summery"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "text-pink-600 underline underline-offset-8 btn border-none"
              : "text-sky-400 opacity-80 hover:text-pink-600 btn border-none"
          }
        >
          <GiProfit />
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
              ? "text-pink-600 underline underline-offset-8 btn border-none"
              : "text-sky-400 opacity-80 hover:text-pink-600 btn border-none"
          }
        >
          <MdManageHistory /> Manage Product
        </NavLink>
        <NavLink
          to="/dashboard/sales-Collection"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "text-pink-600 underline underline-offset-8 btn border-none"
              : "text-sky-400 opacity-80 hover:text-pink-600 btn border-none"
          }
        >
          <BsCollectionFill />
          Sales Collection
        </NavLink>
        <NavLink
          to="/dashboard/shop-sale-summery"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "text-pink-600 underline underline-offset-8 btn border-none"
              : "text-sky-400 opacity-80 hover:text-pink-600 btn border-none"
          }
        >
          <GiProfit /> Sales Summary
        </NavLink>
        <NavLink
          to="/dashboard/subscription"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "text-pink-600 underline underline-offset-8 btn border-none"
              : "text-sky-400 opacity-80 hover:text-pink-600 btn border-none"
          }
        >
          <MdPayment /> Subscription
        </NavLink>
      </>
    );

  return (
    <div className="flex flex-col justify-between gap-10 px-5 sm:px-10">
      <div className="flex flex-col justify-center items-center  mt-10">
        <Link to={"/"} className="flex justify-center items-center gap-3">
          <img className="w-7 h-7" src={logo} alt="" />
          <h2 className="text-lg xl:text-lg uppercase font-semibold text-sky-500">
            Invento <span className="text-pink-600">Wave</span>
          </h2>
        </Link>
        {user?.photoURL ? (
          <img
            className="w-28 h-28 rounded-full mt-5"
            src={user?.photoURL}
            alt=""
          />
        ) : (
          <p className="w-20 h-20  overflow-hidden rounded-full mt-3">
            <FaUser className="w-full h-full text-sky-500" />
          </p>
        )}
        <h3 className="font-semibold opacity-80 mt-3 mb-1">
          {user?.displayName}
        </h3>
        <h3 className="text-sm font-medium opacity-80 mb-2">{user?.email}</h3>
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
        <ul className="flex flex-col gap-5">{userNavLink}</ul>
      </div>
    </div>
  );
};

export default DashboardNavbar;
