import Title from "../../../../components/shared/Title";
import { PiNotePencilFill } from "react-icons/pi";
import { AiTwotoneDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import useFetchSecure from "../../../../hooks/useFetchSecure";
import useSecureAPI from "../../../../hooks/useSecureAPI";
import Swal from "sweetalert2";

const ManageProduct = () => {
  const { user } = useAuth();
  const axiosSecure = useSecureAPI();

  const { data: productData, refetch } = useFetchSecure(
    `api/product/${user?.email}`,
    "productsData"
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
    <div className="">
      <Title title={"Manage Products"} />
      <div className="flex justify-around items-center mt-10">
        <h3 className="text-lg font-medium text-black/80">
          Total Product :{" "}
          <span className="badge badge-lg bg-sky-500 text-white">
            {productData?.length}
          </span>
        </h3>
        <Link to={"/dashboard/add-product"} className="btn">
          Add Your Product
        </Link>
      </div>
      <div className="overflow-x-auto mt-10 ">
        <table className="table text-center">
          <thead>
            <tr>
              <th></th>
              <th>Products Image</th>
              <th>Products Name</th>
              <th>Products Quantity</th>
              <th>Sale Count</th>
              <th>Update Products</th>
              <th>Delete Products</th>
            </tr>
          </thead>
          <tbody>
            {productData?.map((data, index) => (
              <tr key={data._id} className="hover">
                <th>{index + 1}</th>
                <td className="flex items-center justify-center">
                  <img
                    className="w-32 h-32 rounded-md"
                    src={data?.productImage}
                    alt=""
                  />
                </td>
                <td className="text-lg font-medium">{data?.productName}</td>
                <td className="text-lg font-medium">{data?.productQuantity}</td>
                <td className="text-lg font-medium">{data?.sellCount}</td>
                <td>
                  <Link
                    to={`/dashboard/update-product/${data._id}`}
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
  );
};

export default ManageProduct;
