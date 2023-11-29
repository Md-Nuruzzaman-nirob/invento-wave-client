import { GiPayMoney } from "react-icons/gi";
import useFetchSecure from "../../../hooks/useFetchSecure";
import useAuth from "../../../hooks/useAuth";
import Title from "../../../components/shared/Title";
import { Helmet } from "react-helmet-async";
import { HashLoader } from "react-spinners";
import { TfiMoney } from "react-icons/tfi";
import { BiBarChart } from "react-icons/bi";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";

const ShopSaleSummery = () => {
  const { user } = useAuth();

  const { data: productsData } = useFetchSecure(
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

  const salesForecast = productsData.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.soldProduct.productData.sellingPrice;
  }, 0);

  // sales
  const totalSales = productsData.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.soldPrice;
  }, 0);

  // discount
  const totalDiscount = salesForecast - totalSales;

  // invest
  const totalPayment = paymentData.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.soldPrice;
  }, 0);
  const productInvest = productsData.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.soldProduct.productData.productionCost;
  }, 0);
  const totalInvest = productInvest + totalPayment;

  // profit
  const totalProfit = totalSales - totalInvest;

  // bar chat data
  const forecastData = [salesForecast];
  const salesData = [totalSales];
  const xLabelsBarChart = ["Sales Performance Overview"];

  // bar chart 2
  const ComparisonDataOne = [totalSales];
  const ComparisonDataTwo = [totalInvest];
  const xLabelsBarChat2 = ["A Comparison of Sales and Investment"];

  // pie chart data
  const data = [
    { value: totalSales, label: "Total Sales", color: "#8892d6" },
    { value: totalDiscount, label: "Total Discount", color: "#45bbe0" },
    { value: totalInvest, label: "Total Invest", color: "#f06292" },
    { value: totalProfit, label: "Total Profit", color: "#78c350" },
  ];

  const sizing = {
    margin: { right: 0, left: 0 },
    width: 300,
    height: 300,
    legend: { hidden: true },
  };
  const getArcLabel = (params) => {
    const percent = params.value / salesForecast;
    return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <>
      <Helmet>
        <title>Sales Summery - Invento Wave</title>
      </Helmet>
      <div>
        <h3 className="font-semibold mb-5">Dashboard/Sales Summery</h3>
        <div className="grid grid-cols-1  sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <div className="flex items-center justify-between bg-[#45bbe0]   text-white rounded-md p-6 xl:py-8">
            <div className="rounded-full bg-white bg-opacity-30 p-5">
              <AiOutlineFundProjectionScreen className="w-10 h-10" />
            </div>
            <div className="space-y-3 text-right">
              <h3 className="text-2xl font-medium text-white">
                ${parseInt(salesForecast)}
              </h3>
              <p>Sales Forecast</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-white bg-[#8892d6] rounded-md p-6 xl:py-8">
            <div className="rounded-full bg-white bg-opacity-30 p-5">
              <BiBarChart className="w-10 h-10" />
            </div>
            <div className="space-y-3 text-right">
              <h3 className="text-2xl font-medium">${parseInt(totalSales)}</h3>
              <p>Total Sales</p>
            </div>
          </div>

          <div className="flex items-center justify-between  bg-[#f06292] text-white rounded-md p-6 xl:py-8">
            <div className="rounded-full bg-white bg-opacity-30 p-5">
              <GiPayMoney className="w-10 h-10" />
            </div>
            <div className="space-y-3 text-right">
              <h3 className="text-2xl font-medium">${totalInvest}</h3>
              <p>Total Invest</p>
            </div>
          </div>

          <div className="flex items-center justify-between  bg-[#78c350] text-white rounded-md p-6 xl:py-8">
            <div className="rounded-full bg-white bg-opacity-30 p-5">
              <TfiMoney className="w-10 h-10" />
            </div>
            <div className="space-y-3 text-right">
              <h3 className="text-2xl font-medium">${totalProfit}</h3>
              <p>Total Profit</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-0 mt-10">
          <div className="flex items-center justify-center">
            <BarChart
              width={500}
              height={400}
              series={[
                {
                  data: salesData,
                  label: "Total Sales",
                  id: "pvId1",
                  color: "#8892d6",
                },
                {
                  data: forecastData,
                  label: "Sales Forecast",
                  id: "uvId1",
                  color: "#45bbe0",
                },
              ]}
              xAxis={[{ data: xLabelsBarChart, scaleType: "band" }]}
            />
          </div>
          <div className="flex items-center justify-center">
            <BarChart
              width={500}
              height={400}
              series={[
                {
                  data: ComparisonDataOne,
                  label: "Total Sales",
                  id: "pvId2",
                  color: "#8892d6",
                },
                {
                  data: ComparisonDataTwo,
                  label: "Total Invest",
                  id: "uvId2",
                  color: "#f06292",
                },
              ]}
              xAxis={[{ data: xLabelsBarChat2, scaleType: "band" }]}
            />
          </div>
          <div className="flex flex-col justify-center items-center overflow-hidden">
            <PieChart
              series={[
                {
                  data,
                  arcLabel: getArcLabel,
                },
              ]}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: "white",
                  fontSize: 14,
                },
              }}
              {...sizing}
            />
            <h2 className="text-center mt-5 text-lg font-medium opacity-80">
              Based on sales forecast
            </h2>
          </div>
        </div>
        <div className="my-16">
          <Title title={"Sales History"} />
          <div className="flex justify-around items-center mt-5">
            <h3 className="text-lg font-medium text-black/80">
              Total Sales :{" "}
              <span className="badge badge-lg bg-sky-500 text-white">
                {productsData?.length}
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
                {productsData.length > 0 &&
                  productsData?.map((data, index) => (
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
