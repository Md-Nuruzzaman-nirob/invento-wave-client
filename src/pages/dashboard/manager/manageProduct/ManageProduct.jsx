import Title from "../../../../components/shared/Title";
import { PiNotePencilFill } from "react-icons/pi";
import { AiTwotoneDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import useFetchSecure from "../../../../hooks/useFetchSecure";
import useSecureAPI from "../../../../hooks/useSecureAPI";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const ManageProduct = () => {
  const { user } = useAuth();
  const axiosSecure = useSecureAPI();

  const { data: productData, refetch } = useFetchSecure(
    `/api/product/${user?.email}`,
    "productsData"
  );
  const { data: shopData } = useFetchSecure(
    `/api/shop/${user?.email}`,
    "shopData"
  );

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
        axiosSecure.delete(`/api/product/update/${id}`).then((resData) => {
          if (resData.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your product has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Manage Products - Invento Wave</title>
      </Helmet>
      <div className="">
        <Title title={"Manage Products"} />
        <div className="flex justify-around items-center mt-10">
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
          {shopData?.limit > 0 ? (
            <Link
              to={"/dashboard/manage-product/add-product"}
              className="btn btn-sm bg-sky-500 hover:bg-sky-600 text-white border-none font-medium"
            >
              Add Your Product
            </Link>
          ) : (
            <button
              disabled={shopData?.limit}
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
                      className={data.productQuantity === 0 && "text-red-600"}
                    >
                      {data?.productQuantity}
                    </td>
                    <td>{data?.productCode}</td>
                    <td className={data.sellCount === 0 && "text-yellow-500"}>
                      {data?.sellCount}
                    </td>
                    <td>
                      <Link
                        to={`/dashboard/manage-product/update-product/${data._id}`}
                        className="btn rounded-md"
                      >
                        <PiNotePencilFill className="w-8 h-8" />
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(data._id)}
                        className="btn rounded-md"
                      >
                        <AiTwotoneDelete className="w-8 h-8" />
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
