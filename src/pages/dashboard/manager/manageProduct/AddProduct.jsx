import { useForm } from "react-hook-form";
import Title from "../../../../components/shared/Title";
import { useState } from "react";
import useSecureAPI from "../../../../hooks/useSecureAPI";
import useFetchSecure from "../../../../hooks/useFetchSecure";
import useAuth from "../../../../hooks/useAuth";
import usePublicAPI from "../../../../hooks/usePublicAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

//   date related variable
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();
const date = `${day} ${month} ${year}`;

const AddProduct = () => {
  const [description, setDescription] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const axiosSecure = useSecureAPI();
  const axiosPublic = usePublicAPI();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: shopData } = useFetchSecure(
    `/api/shop/${user?.email}`,
    user?.email
  );

  const onSubmit = async (data) => {
    const toastId = toast.loading("Progress...");

    const res = await axiosPublic.post(
      image_hosting_api,
      { image: data.productImage[0] },
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );

    if (res.data.success) {
      // total sell price calculation
      const taxAmount = (parseInt(data?.productionCost) * 7.5) / 100;
      const profitAmount =
        (parseInt(data?.productionCost) * parseInt(data?.profitMargin)) / 100;
      const sellingPrice =
        parseInt(data?.productionCost) + taxAmount + profitAmount;

      const productInfo = {
        productName: data?.productName,
        productQuantity: parseInt(data?.productQuantity),
        productionCost: parseInt(data.productionCost),
        profitMarginPercent: parseInt(data?.profitMargin),
        discountPercent: parseInt(data?.discount) || 0,
        sellingPrice: Math.round(sellingPrice),
        sellCount: 0,
        productImage: res?.data?.data?.image?.url,
        productCode: data?.productCode,
        addedDate: date,
        productLocation: data.productLocation,
        description,
        shopEmail: shopData?.email,
        shopId: shopData?._id,
        shopName: shopData?.shopName,
        shopLogo: shopData?.shopLogo,
      };
      axiosSecure.post("/api/product/create", productInfo).then((resData) => {
        if (resData.data.insertedId) {
          reset();
          toast.success(
            "Your product has been added successfully. 🌟 Happy selling!!!",
            { id: toastId, duration: 4000 }
          );
          navigate("/dashboard/manage-product");
        }
      });
    }
  };
  return (
    <div>
      <Title title={"Add Your Product"} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="sm:w-3/4 sm:mx-auto pb-20 overflow-hidden mt-10 lg:mt-20"
      >
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex-1">
            <label className="font-medium opacity-80" htmlFor="">
              Product Name
            </label>
            <input
              {...register("productName", {
                required: true,
                minLength: 4,
                maxLength: 40,
              })}
              className="w-full mt-2 px-4 py-2 border  outline-none focus:border-sky-500 text-sm opacity-80 rounded-md"
              placeholder="Enter product name..."
              type="text"
            />
            {errors.productName?.type === "required" && (
              <span className="text-red-600">*product name is required.</span>
            )}
            {errors.productName?.type === "minLength" && (
              <span className="text-red-600">
                *product name must be at least 4 characters long.
              </span>
            )}
            {errors.productName?.type === "maxLength" && (
              <span className="text-red-600">
                *product name cannot exceed 40 characters.
              </span>
            )}
          </div>

          <div className="flex-1">
            <label className="font-medium opacity-80" htmlFor="">
              Product Quantity
            </label>
            <input
              {...register("productQuantity", {
                required: true,
              })}
              className="w-full mt-2 px-4 py-2 border  outline-none focus:border-sky-500 text-sm opacity-80 rounded-md"
              type="text"
              placeholder="Enter product quantity.."
            />
            {errors.productQuantity?.type === "required" && (
              <span className="text-red-600">
                *product quantity is required.
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-5 mt-5">
          <div className="flex-1">
            <label className="font-medium opacity-80" htmlFor="">
              Product Location
            </label>
            <input
              {...register("productLocation", {
                required: true,
              })}
              className="w-full mt-2 px-4 py-2 border  outline-none focus:border-sky-500 text-sm opacity-80 rounded-md"
              placeholder="Enter product location..."
              type="text"
            />
            {errors.productLocation?.type === "required" && (
              <span className="text-red-600">
                *product location is required.
              </span>
            )}
          </div>

          <div className="flex-1">
            <label className="font-medium opacity-80" htmlFor="">
              Production Cost (amount)
            </label>
            <input
              {...register("productionCost", {
                required: true,
              })}
              className="w-full mt-2 px-4 py-2 border  outline-none focus:border-sky-500 text-sm opacity-80 rounded-md"
              placeholder="Enter production cost..."
              type="text"
            />
            {errors.productionCost?.type === "required" && (
              <span className="text-red-600">
                *production cost is required.
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-5 mt-5">
          <div className="flex-1">
            <label className="font-medium opacity-80" htmlFor="">
              Profit Margin (%)
            </label>
            <input
              {...register("profitMargin", {
                required: true,
              })}
              className="w-full mt-2 px-4 py-2 border  outline-none focus:border-sky-500 text-sm opacity-80 rounded-md"
              placeholder="Enter profit margin..."
              type="text"
            />
            {errors.profitMargin?.type === "required" && (
              <span className="text-red-600">*profit margin is required.</span>
            )}
          </div>

          <div className="flex-1">
            <label className="font-medium opacity-80" htmlFor="">
              Discount (%)
            </label>
            <input
              {...register("discount")}
              className="w-full mt-2 px-4 py-2 border  outline-none focus:border-sky-500 text-sm opacity-80 rounded-md"
              placeholder="Enter discount..."
              type="text"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-5 mt-5">
          <div className="flex-1 mt-10">
            <label className="font-medium opacity-80 mr-5" htmlFor="textAria">
              Product Image
            </label>
            <input
              {...register("productImage", {
                required: true,
              })}
              className="px-4 py-2 text-sm"
              type="file"
            />
          </div>

          <div className="flex-1">
            <label className="font-medium opacity-80" htmlFor="">
              Product Code
            </label>
            <input
              {...register("productCode")}
              className="w-full mt-2 px-4 py-2 border  outline-none focus:border-sky-500 text-sm opacity-80 rounded-md"
              placeholder="Enter product code..."
              type="text"
            />
          </div>
        </div>
        {errors.productCode?.type === "required" && (
          <span className="text-red-600">*product code is required.</span>
        )}
        <div className="flex flex-col w-full mt-10">
          <label className="font-medium opacity-80" htmlFor="textAria">
            Product Description
          </label>
          <textarea
            onBlur={(e) => setDescription(e.target.value)}
            name=""
            id="textAria"
            cols="30"
            rows="4"
            className="w-full mt-2 px-3 py-2 border  outline-none focus:border-sky-500 text-sm opacity-80 rounded-md"
            placeholder="Enter your message..."
            required
          ></textarea>
        </div>
        <div className="text-center mt-12">
          <input
            className="btn bg-sky-500 hover:bg-sky-600 text-base text-white rounded-md border-transparent hover:border-transparent"
            type="submit"
            value="Add Product"
          />
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
