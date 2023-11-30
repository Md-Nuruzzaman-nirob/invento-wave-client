import { PiNotePencilFill } from "react-icons/pi";
import { AiTwotoneDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import useFetchSecure from "../../../../hooks/useFetchSecure";
import useSecureAPI from "../../../../hooks/useSecureAPI";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { HashLoader } from "react-spinners";
import Button from "../../../../components/shared/Button";

const ManageProduct = () => {
  const { user } = useAuth();
  const axiosSecure = useSecureAPI();

  const { data: productData, refetch } = useFetchSecure(
    `/api/product/${user?.email}`,
    "allProductData"
  );
  const {
    data: shopData,
    isLoading,
    isPending,
  } = useFetchSecure(`/api/shop/${user?.email}`, "shopData");

  if (isLoading || isPending) {
    return (
      <p className="h-screen flex items-center justify-center">
        <HashLoader color="#0ea5e9" />
      </p>
    );
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete it?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1f61eb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/api/delete/update/${id}`).then((resData) => {
          if (resData.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your product has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Manage Product - Invento Wave</title>
      </Helmet>
      <div className="">
        <h3 className="font-semibold mb-5">Dashboard/Manage Product</h3>
        <div className="hidden sm:flex justify-around items-center mt-10">
          <h3 className="text-lg font-medium text-black/80">
            Total Product :{" "}
            <span className="badge badge-lg bg-sky-500 text-white">
              {productData?.length}
            </span>
          </h3>
          <h3 className="text-lg font-medium text-black/80">
            Product Add Limit :{" "}
            <span
              className={`badge badge-lg  text-white ${
                shopData.limit > 0 ? "bg-green-600 " : "bg-red-600"
              }`}
            >
              {shopData?.limit || 0}
            </span>
          </h3>
          {shopData?.limit > 0 && shopData?.limit !== null ? (
            <Link to={"/dashboard/manage-product/add-product"}>
              <Button> Add Your Product</Button>
            </Link>
          ) : (
            <Button disabled={shopData?.limit === null || shopData?.limit <= 0}>
              Add Your Product
            </Button>
          )}
        </div>
        <div className="text-sm flex justify-between items-center sm:hidden mt-10">
          <div className="space-y-2">
            <h3 className=" text-black/80">
              Total Product :{" "}
              <span className="badge bg-sky-500 text-white">
                {productData?.length}
              </span>
            </h3>
            <h3 className=" text-black/80">
              Product Add Limit :{" "}
              <span
                className={`badge text-white ${
                  shopData.limit > 0 ? "bg-green-600 " : "bg-red-600"
                }`}
              >
                {shopData?.limit || 0}
              </span>
            </h3>
          </div>
          {shopData?.limit > 0 && shopData?.limit !== null ? (
            <Link
              to={"/dashboard/manage-product/add-product"}
              className="btn btn-sm bg-pink-600 hover:bg-pink-700 text-white border-none font-medium"
            >
              Add Your Product
            </Link>
          ) : (
            <button
              disabled={shopData?.limit === null || shopData?.limit <= 0}
              className="btn bg-sky-500 hover:bg-sky-600 text-white border-none"
            >
              Add Your Product
            </button>
          )}
        </div>
        <div className="overflow-x-auto mt-10 mb-20">
          <table className="table text-center">
            <thead>
              <tr>
                <th></th>
                <th>Products Image</th>
                <th>Products Name</th>
                <th>Products Quantity</th>
                <th>Products Code</th>
                <th>Sale Count</th>
                <th>Update Products</th>
                <th>Delete Products</th>
              </tr>
            </thead>
            <tbody>
              {productData.length > 0 &&
                productData?.map((data, index) => (
                  <tr key={data._id} className="hover">
                    <th>{index + 1}</th>
                    <td className="flex items-center justify-center">
                      <img
                        className="w-32 h-32 rounded-md"
                        src={data?.productImage}
                        alt=""
                      />
                    </td>
                    <td>{data?.productName}</td>
                    <td
                      className={
                        data.productQuantity === 0 ? "text-red-600" : ""
                      }
                    >
                      {data?.productQuantity}
                    </td>
                    <td>{data?.productCode}</td>
                    <td
                      className={data.sellCount === 0 ? "text-yellow-500" : ""}
                    >
                      {data?.sellCount}
                    </td>
                    <td>
                      <Link
                        to={`/dashboard/manage-product/update-product/${data._id}`}
                      >
                        <Button className={"btn-md"}>
                          <PiNotePencilFill className="w-8 h-8" />
                        </Button>
                      </Link>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(data._id)}>
                        <Button className="btn-md">
                          <AiTwotoneDelete className="w-8 h-8" />
                        </Button>
                      </button>
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

export default ManageProduct;
