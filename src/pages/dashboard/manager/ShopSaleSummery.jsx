import { GiPayMoney } from "react-icons/gi";
import useFetchSecure from "../../../hooks/useFetchSecure";
import useAuth from "../../../hooks/useAuth";
import Title from "../../../components/shared/Title";
import { Helmet } from "react-helmet-async";
import { HashLoader } from "react-spinners";
import { TfiMoney } from "react-icons/tfi";
import { BiBarChart } from "react-icons/bi";

const ShopSaleSummery = () => {
  const { user } = useAuth();

  const { data: saleData } = useFetchSecure(
    `/api/sale/${user?.email}`,
    "saleData"
  );

  const {
    data: paymentData,
    isLoading,
    isPending,
  } = useFetchSecure(`/api/payment/${user?.email}`, ["payment", user?.email]);

  if (isLoading || isPending) {
    return (
      <p className="h-screen flex items-center justify-center">
        <HashLoader color="#0ea5e9" />
      </p>
    );
  }
  const totalSale = saleData.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.soldPrice;
  }, 0);
  const totalPayment = paymentData.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.soldPrice;
  }, 0);

  const invest = saleData.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.soldProduct.productData.productionCost;
  }, 0);

  const totalInvest = invest + totalPayment;

  const totalProfit = totalSale - totalInvest;
  return (
    <>
      <Helmet>
        <title>Sales Summery - Invento Wave</title>
      </Helmet>
      <div>
        <h3 className="text-xl font-semibold mb-5">Sales Summery</h3>
        <div className="grid grid-cols-1  lg:grid-cols-3 gap-5 xl:gap-20">
          <div className="flex items-center justify-between bg-[#8892d6] text-white rounded-md px-6 xl:px-10 py-6 xl:py-8">
            <div className="rounded-full bg-white bg-opacity-30 p-5">
              <BiBarChart className="w-10 h-10" />
            </div>
            <div className="space-y-3 text-right">
              <h3 className="text-3xl font-medium text-white">
                ${parseInt(totalSale)}
              </h3>
              <p>Total Sale</p>
            </div>
          </div>

          <div className="flex items-center justify-between bg-[#45bbe0] text-white rounded-md px-6 xl:px-10 py-6 xl:py-8">
            <div className="rounded-full bg-white bg-opacity-30 p-5">
              <GiPayMoney className="w-10 h-10" />
            </div>
            <div className="space-y-3 text-right">
              <h3 className="text-3xl font-medium">${totalInvest}</h3>
              <p>Total Invest</p>
            </div>
          </div>

          <div className="flex items-center justify-between bg-[#f06292] text-white rounded-md px-6 xl:px-10 py-6 xl:py-8">
            <div className="rounded-full bg-white bg-opacity-30 p-5">
              <TfiMoney className="w-10 h-10" />
            </div>
            <div className="space-y-3 text-right">
              <h3 className="text-3xl font-medium">${totalProfit}</h3>
              <p>Total Profit</p>
            </div>
          </div>
        </div>
        <div className="my-16">
          <Title title={"Sales History"} />
          <div className="flex justify-around items-center mt-5">
            <h3 className="text-lg font-medium text-black/80">
              Total Sales :{" "}
              <span className="badge badge-lg bg-sky-500 text-white">
                {saleData?.length}
              </span>
            </h3>
          </div>
          <div className="overflow-x-auto mt-10 ">
            <table className="table text-center">
              <thead>
                <tr>
                  <th></th>
                  <th>Products Name</th>
                  <th>Selling Date</th>
                  <th>Products Code</th>
                  <th>Products Cost</th>
                  <th>Selling Price</th>
                  <th>Sold Price</th>
                  <th>Discount Price</th>
                  <th>Profit</th>
                </tr>
              </thead>
              <tbody>
                {saleData.length > 0 &&
                  saleData?.map((data, index) => (
                    <tr key={data._id} className="hover">
                      <th>{index + 1}</th>
                      <td className="text-lg font-medium">
                        {data?.soldProduct?.productData?.productName}
                      </td>
                      <td className="">
                        {data?.soldDate?.day}-{data?.soldDate?.month}-
                        {data?.soldDate?.year}
                      </td>
                      <td>{data?.soldProduct?.productData?.productCode}</td>
                      <td>${data?.soldProduct?.productData?.productionCost}</td>
                      <td>${data?.soldProduct?.productData?.sellingPrice}</td>
                      <td>${data?.soldPrice}</td>
                      <td className="text-yellow-500">
                        $
                        {data?.soldProduct?.productData?.sellingPrice -
                          data?.soldPrice}
                      </td>
                      {data?.soldPrice -
                        data?.soldProduct?.productData?.productionCost <
                      0 ? (
                        <td className="text-red-600">
                          $
                          {data?.soldPrice -
                            data?.soldProduct?.productData?.productionCost}
                        </td>
                      ) : (
                        <td className="text-green-600">
                          $
                          {data?.soldPrice -
                            data?.soldProduct?.productData?.productionCost}
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSaleSummery;
