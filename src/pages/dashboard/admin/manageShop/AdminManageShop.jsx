import { Helmet } from "react-helmet-async";
import useFetchSecure from "../../../../hooks/useFetchSecure";
import Title from "../../../../components/shared/Title";
import ManageShopFrom from "./ManageShopFrom";

const AdminManageShop = () => {
  const { data: shopData } = useFetchSecure(`/api/shop`, "allShopData");

  return (
    <>
      <Helmet>
        <title>Manage Shop - Invento Wave</title>
      </Helmet>
      <div className="">
        <Title title={"Manage Shop"} />
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
