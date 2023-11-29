import { Helmet } from "react-helmet-async";
import useFetchSecure from "../../../../hooks/useFetchSecure";
import ManageShopFrom from "./ManageShopFrom";
import { HashLoader } from "react-spinners";

const AdminManageShop = () => {
  const {
    data: shopData,
    isLoading,
    isPending,
  } = useFetchSecure(`/api/shop`, "allShopData");

  if (isLoading || isPending) {
    return (
      <p className="h-screen flex items-center justify-center">
        <HashLoader color="#0ea5e9" />
      </p>
    );
  }

  return (
    <>
      <Helmet>
        <title>Manage Shop - Invento Wave</title>
      </Helmet>
      <div className="z-20">
        <h3 className="font-semibold mb-5">Dashboard/Manage Shop</h3>
        <div className="flex justify-around items-center mt-10">
          <h3 className="text-lg font-medium text-black/80">
            Total Shop :{" "}
            <span className="badge badge-lg bg-sky-500 text-white">
              {shopData?.length}
            </span>
          </h3>
        </div>
        <div className="overflow-x-auto mt-10 mb-20">
          <table className="table text-center">
            <thead>
              <tr>
                <th></th>
                <th>Shop Logo</th>
                <th>Shop Name</th>
                <th>Shop Location</th>
                <th>Product Add Limit</th>
                <th>Send Notice</th>
              </tr>
            </thead>
            <tbody>
              {shopData.length > 0 &&
                shopData?.map((data, index) => (
                  <ManageShopFrom key={index} index={index} data={data} />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminManageShop;
