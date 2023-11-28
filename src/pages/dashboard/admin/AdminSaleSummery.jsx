import { FcSalesPerformance } from "react-icons/fc";
import Title from "../../../components/shared/Title";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import useFetchSecure from "../../../hooks/useFetchSecure";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SaleSummeryForm from "./SaleSummeryForm";

const AdminSaleSummery = () => {
  const products = useLoaderData();

  const { data: incomeData } = useFetchSecure(
    `/api/payments`,
    "TotalIncomeData"
  );
  const { data: usersData } = useFetchSecure(`/api/users`, "allUsersData");

  const totalIncome = incomeData.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.soldPrice;
  }, 0);

  return (
    <>
      <Helmet>
        <title>Sales Summery - Invento Wave</title>
      </Helmet>
      <div className="">
        <Title title={"Sales Summery"} className={"mb-5"} />
        <div className="grid grid-cols-1  sm:grid-cols-3 gap-8 xl:gap-16 ">
          <div className="flex items-center justify-evenly bg-white rounded-md py-5">
            <div>
              <FaMoneyBillTrendUp className="w-10 lg:w-12 2xl:w-16 h-10 lg:h-12 2xl:h-16" />
            </div>
            <div className="lg:space-y-3">
              <h3 className="text-xl xl:text-3xl font-bold text-sky-500">
                {incomeData.length}
              </h3>
              <p className="text-sm xl:text-lg font-semibold">Total Sales</p>
            </div>
          </div>

          <div className="flex items-center justify-evenly bg-white rounded-md py-5">
            <div>
              <MdOutlineProductionQuantityLimits className="w-10 lg:w-12 2xl:w-16 h-10 lg:h-12 2xl:h-16" />
            </div>
            <div className="lg:space-y-3">
              <h3 className="text-xl xl:text-3xl font-bold text-red-600">
                {products.length}
              </h3>
              <p className="text-sm xl:text-lg font-semibold">Total Product</p>
            </div>
          </div>

          <div className="flex items-center justify-evenly bg-white rounded-md py-5">
            <div>
              <FcSalesPerformance className="w-10 lg:w-12 2xl:w-16 h-10 lg:h-12 2xl:h-16" />
            </div>
            <div className="lg:space-y-3">
              <h3 className="text-xl xl:text-3xl font-bold text-green-600">
                ${totalIncome}
              </h3>
              <p className="text-sm xl:text-lg font-semibold">Total Income</p>
            </div>
          </div>
        </div>
        <div className="my-16">
          <Title title={"User History"} />
          <div className="flex justify-around items-center mt-5">
            <h3 className="text-lg font-medium text-black/80">
              All Users :{" "}
              <span className="badge badge-lg bg-sky-500 text-white">
                {usersData?.length}
              </span>
            </h3>
          </div>
          <div className="overflow-x-auto mt-10 ">
            <table className="table text-center">
              <thead>
                <tr>
                  <th></th>
                  <th>User Name</th>
                  <th>User Email</th>
                  <th>Shop Name</th>
                  <th>Role</th>
                  <th>Send Email</th>
                </tr>
              </thead>
              <tbody>
                {usersData.length > 0 &&
                  usersData?.map((data, index) => (
                    <SaleSummeryForm key={index} index={index} data={data} />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSaleSummery;
