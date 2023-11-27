import { Link } from "react-router-dom";
import Title from "../../../components/shared/Title";
import useAuth from "../../../hooks/useAuth";
import useFetchSecure from "../../../hooks/useFetchSecure";
import { Helmet } from "react-helmet-async";

const SalesCollection = () => {
  const { user } = useAuth();

  const { data: productData, refetch } = useFetchSecure(
    `api/product/${user?.email}`,
    `"productsData",
    ${user?.email}`
  );
  refetch();

  return (
    <>
      <Helmet>
        <title>Sales Collection - Invento Wave</title>
      </Helmet>
      <div>
        <Title title={"Sales Collection"} />
        <div className="flex justify-around items-center mt-10">
          <h3 className="text-lg font-medium text-black/80">
            Total Product :{" "}
            <span className="badge badge-lg bg-sky-500 text-white">
              {productData?.length}
            </span>
          </h3>

          {/* TODO : ==================== */}
          <input type="text" name="" id="" />
        </div>
        <div className="overflow-x-auto mt-10 mb-20 ">
          <table className="table text-center">
            <thead>
              <tr>
                <th></th>
                <th>Products Image</th>
                <th>Products Name</th>
                <th>Products Quantity</th>
                <th>Products Code</th>
                <th>Discount</th>
                <th>Selling Price</th>
                <th>Sold to Customer</th>
              </tr>
            </thead>
            <tbody>
              {productData?.map((data, index) => (
                <tr key={data._id} className="hover">
                  <th>{index + 1}</th>
                  <td className="flex items-center justify-center">
                    <img
                      className="w-44 h-32 rounded-md object-cover"
                      src={data?.productImage}
                      alt=""
                    />
                  </td>
                  <td className="font-medium">{data?.productName}</td>
                  <td className={data.productQuantity === 0 && "text-red-600"}>
                    {data?.productQuantity}
                  </td>
                  <td className="font-medium">{data?.productCode}</td>
                  <td className="font-medium">{data?.discountPercent}%</td>
                  <td className="font-medium">${data?.sellingPrice}</td>
                  <td>
                    {data?.productQuantity > 0 ? (
                      <Link
                        to={`/dashboard/sales-Collection/checkout/${data._id}`}
                        className="btn rounded-md "
                      >
                        Sold
                      </Link>
                    ) : (
                      <button disabled className="btn rounded-md">
                        Sold Out
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SalesCollection;
