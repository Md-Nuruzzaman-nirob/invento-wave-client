import { FcSalesPerformance } from "react-icons/fc";
import { FcMoneyTransfer } from "react-icons/fc";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import useFetchSecure from "../../../hooks/useFetchSecure";
import useAuth from "../../../hooks/useAuth";
import Title from "../../../components/shared/Title";
import { Helmet } from "react-helmet-async";

const ShopSaleSummery = () => {
  const { user } = useAuth();

  const { data: saleData } = useFetchSecure(
    `/api/sale/${user?.email}`,
    "saleData"
  );

  const { data: paymentData } = useFetchSecure(`/api/payment/${user?.email}`, [
    "payment",
    user?.email,
  ]);
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
      <div className="">
        <Title title={"Sales Summery"} className={"mb-5"} />
        <div className="grid grid-cols-1  sm:grid-cols-3 gap-8 xl:gap-16 ">
          <div className="flex items-center justify-evenly bg-white rounded-md py-5">
            <div>
              <FaMoneyBillTrendUp className="w-10 lg:w-12 2xl:w-16 h-10 lg:h-12 2xl:h-16" />
            </div>
            <div className="lg:space-y-3">
              <h3 className="text-xl xl:text-3xl font-bold text-sky-500">
                ${parseInt(totalSale)}
              </h3>
              <p className="text-sm xl:text-base font-semibold">Total Sale</p>
            </div>
          </div>

          <div className="flex items-center justify-evenly bg-white rounded-md py-5">
            <div>
              <FcMoneyTransfer className="w-10 lg:w-12 2xl:w-16 h-10 lg:h-12 2xl:h-16" />
            </div>
            <div className="lg:space-y-3">
              <h3 className="text-xl xl:text-3xl font-bold text-red-600">
                ${totalInvest}
              </h3>
              <p className="text-sm xl:text-base font-semibold">
                Total Invest + Purchase
              </p>
            </div>
          </div>

          <div className="flex items-center justify-evenly bg-white rounded-md py-5">
            <div>
              <FcSalesPerformance className="w-10 lg:w-12 2xl:w-16 h-10 lg:h-12 2xl:h-16" />
            </div>
            <div className="lg:space-y-3">
              <h3 className="text-xl xl:text-3xl font-bold text-green-600">
                ${totalProfit}
              </h3>
              <p className="text-sm xl:text-base font-semibold">Total Profit</p>
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
