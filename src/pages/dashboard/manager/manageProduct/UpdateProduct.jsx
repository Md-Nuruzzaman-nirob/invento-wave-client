import { useForm } from "react-hook-form";
import Title from "../../../../components/shared/Title";
import { useState } from "react";
import useSecureAPI from "../../../../hooks/useSecureAPI";
import useFetchSecure from "../../../../hooks/useFetchSecure";
import usePublicAPI from "../../../../hooks/usePublicAPI";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

//   date related variable
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();
const date = `${day} ${month} ${year}`;

const UpdateProduct = () => {
  const [description, setDescription] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const axiosSecure = useSecureAPI();
  const axiosPublic = usePublicAPI();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: productData } = useFetchSecure(
    `/api/product/id/${id}`,
    `'product',${id}`
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
        productName: data?.productName || productData?.productName,
        productQuantity:
          parseInt(data?.productQuantity) || productData?.productQuantity,
        productionCost:
          parseInt(data.productionCost) || productData?.productionCost,
        profitMarginPercent:
          parseInt(data?.profitMargin) || productData?.profitMarginPercent,
        discountPercent:
          parseInt(data?.discount) || productData?.discountPercent,
        productImage: res?.data?.data?.image?.url || productData?.productImage,
        productCode: data?.productCode || productData?.productCode,
        productLocation: data.productLocation || productData?.productLocation,
        description: description || productData?.description,
        sellingPrice: Math.round(sellingPrice) || productData?.sellingPrice,
        lastUpdate: date,
      };
      axiosSecure
        .patch(`/api/product/update/${id}`, productInfo)
        .then((resData) => {
          if (resData.data.modifiedCount > 0) {
            reset();
            toast.success(
              "Your product has been updated successfully. 🌟 Happy selling!!!",
              { id: toastId, duration: 4000 }
            );
            navigate("/dashboard/manage-product");
          }
        });
    }
  };
  return (
    <div>
      <Title title={"Update Your Product"} />
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
                // required: true,
                minLength: 4,
                maxLength: 40,
              })}
              className="w-full mt-2 px-4 py-2 border  outline-none focus:border-sky-500 text-sm opacity-80 rounded-md"
              placeholder="Enter product name..."
              type="text"
              defaultValue={productData?.productName}
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
                // required: true,
              })}
              className="w-full mt-2 px-4 py-2 border  outline-none focus:border-sky-500 text-sm opacity-80 rounded-md"
              placeholder="Enter product quantity..."
              type="text"
              defaultValue={productData?.productQuantity}
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
                // required: true,
              })}
              className="w-full mt-2 px-4 py-2 border  outline-none focus:border-sky-500 text-sm opacity-80 rounded-md"
              placeholder="Enter product location..."
              type="text"
              defaultValue={productData?.productLocation}
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
                // required: true,
              })}
              className="w-full mt-2 px-4 py-2 border  outline-none focus:border-sky-500 text-sm opacity-80 rounded-md"
              placeholder="Enter production cost..."
              type="text"
              defaultValue={productData?.productionCost}
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
                // required: true,
              })}
              className="w-full mt-2 px-4 py-2 border  outline-none focus:border-sky-500 text-sm opacity-80 rounded-md"
              placeholder="Enter profit margin..."
              type="text"
              defaultValue={productData?.profitMarginPercent}
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
              {...register("discount", {
                // required: true,
              })}
              className="w-full mt-2 px-4 py-2 border  outline-none focus:border-sky-500 text-sm opacity-80 rounded-md"
              placeholder="Enter discount..."
              type="text"
              defaultValue={productData?.discountPercent}
            />
            {errors.discount?.type === "required" && (
              <span className="text-red-600">*discount is required.</span>
            )}
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
              defaultValue={productData?.productCode}
            />
          </div>
        </div>
        {errors.productCode?.type === "required" && (
          <span className="text-red-600">*product code is required.</span>
        )}
        {errors.productImage?.type === "required" && (
          <span className="text-red-600">*product image is required.</span>
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
            defaultValue={productData?.description}
          ></textarea>
        </div>
        <div className="text-center mt-12">
          <input
            className="btn bg-sky-500 hover:bg-sky-600 text-base text-white rounded-md border-transparent hover:border-transparent"
            type="submit"
            value="Update Product"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
