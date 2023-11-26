import Title from "../../../../components/shared/Title";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";
import useFetchSecure from "../../../../hooks/useFetchSecure";
import useAuth from "../../../../hooks/useAuth";

const stripePubKey = import.meta.env.VITE_PAYMENT_PK_KEY;
const stripePromise = loadStripe(stripePubKey);
const CheckOut = () => {
  const { user } = useAuth();
  const { id } = useParams();

  const {
    data: productData,
    isPending,
    isLoading,
  } = useFetchSecure(`api/product/single/${id}`, "productsData");

  console.log(productData);

  return (
    <div className="mb-10">
      <Title title={"Check Out"} />
      <div className="flex justify-center mt-10 sm:w-3/5  2xl:w-1/3 mx-auto">
        <div className="card shadow-md bg-base-100 rounded-md p-5 sm:p-10">
          <figure className="">
            <img
              className="rounded-md"
              src={productData?.productImage}
              alt="Shoes"
            />
          </figure>
          <div className="card-body p-0 pt-5">
            <div className="flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-semibold">
                {productData?.productName}
              </h2>
              <h3 className=" lg:text-lg font-bold">
                ${productData?.sellingPrice}
              </h3>
            </div>
            <div className="flex justify-between items-center text-xs sm:text-sm lg:text-base">
              <h2>
                From :{" "}
                <span className="text-black ">{productData?.shopName}</span>
              </h2>
              <h3>
                Discount :{" "}
                <span className="text-red-500 font-semibold">
                  {productData?.discountPercent}%
                </span>
              </h3>
            </div>

            <div className="flex justify-between items-center text-xs sm:text-sm lg:text-base">
              <h2>
                Location :{" "}
                <span className="text-black">
                  {productData?.productLocation}
                </span>
              </h2>
              <h3>
                Code :{" "}
                <span className="text-sky-500 font-semibold">
                  {productData?.productCode}
                </span>
              </h3>
            </div>

            <div className="w-full">
              <h3 className="text-center font-semibold my-5">
                Payment Information
              </h3>
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  user={user}
                  productData={productData}
                  isLoading={isLoading}
                  isPending={isPending}
                />
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
