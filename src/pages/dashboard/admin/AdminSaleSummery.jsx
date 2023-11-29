import Title from "../../../components/shared/Title";
import useFetchSecure from "../../../hooks/useFetchSecure";
import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SaleSummeryForm from "./SaleSummeryForm";
import { HashLoader } from "react-spinners";
import { BiBarChart } from "react-icons/bi";
import { GiPayMoney } from "react-icons/gi";
import { TfiMoney } from "react-icons/tfi";

const AdminSaleSummery = () => {
  const products = useLoaderData();

  const { data: incomeData } = useFetchSecure(
    `/api/payments`,
    "TotalIncomeData"
  );
  const {
    data: usersData,
    isLoading,
    isPending,
  } = useFetchSecure(`/api/users`, "allUsersData");

  if (isLoading || isPending) {
    return (
      <p className="h-screen flex items-center justify-center">
        <HashLoader color="#0ea5e9" />
      </p>
    );
  }

  const totalIncome = incomeData.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.soldPrice;
  }, 0);

  return (
    <>
      <Helmet>
        <title>Sales Summery - Invento Wave</title>
      </Helmet>
      <div className="">
        <h3 className="font-semibold mb-5">Dashboard/Sales Summery</h3>
        <div className="grid grid-cols-1  lg:grid-cols-3 gap-5 xl:gap-20">
          <div className="flex items-center justify-between bg-[#8892d6] text-white rounded-md px-6 xl:px-10 py-6 xl:py-8">
            <div className="rounded-full bg-white bg-opacity-30 p-5">
              <BiBarChart className="w-10 h-10" />
            </div>
            <div className="space-y-3 text-right">
              <h3 className="text-3xl font-medium text-white">
                {incomeData.length}
              </h3>
              <p>Total Sales</p>
            </div>
          </div>

          <div className="flex items-center justify-between bg-[#45bbe0] text-white rounded-md px-6 xl:px-10 py-6 xl:py-8">
            <div className="rounded-full bg-white bg-opacity-30 p-5">
              <GiPayMoney className="w-10 h-10" />
            </div>
            <div className="space-y-3 text-right">
              <h3 className="text-3xl font-medium">{products.length}</h3>
              <p>Total Product</p>
            </div>
          </div>

          <div className="flex items-center justify-between bg-[#f06292] text-white rounded-md px-6 xl:px-10 py-6 xl:py-8">
            <div className="rounded-full bg-white bg-opacity-30 p-5">
              <TfiMoney className="w-10 h-10" />
            </div>
            <div className="space-y-3 text-right">
              <h3 className="text-3xl font-medium">${totalIncome}</h3>
              <p>Total Income</p>
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
